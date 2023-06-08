import { getSlideName, newSlideTrait, onChangeSlideTemplate } from "./lib/helpers";

const script = function (props) {
  const classContainer = props.classContainer;
  const initializeLibrary = function () {
    $(`.${classContainer}`)
      .not(".slick-initialized")
      .slick({
        arrows: true,
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: /*html*/ `
            <button type="button" class="slick-prev">
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M29.2504 36.0004L31.4004 33.8504L21.5004 23.9504L31.4004 14.0504L29.2504 11.9004L17.2004 23.9504L29.2504 36.0004Z" fill="black"/>
              </svg>          
            </button>
        `,
        nextArrow: /*html*/ `
            <button type="button" class="slick-next">
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18.7496 36.0004L16.5996 33.8504L26.4996 23.9504L16.5996 14.0504L18.7496 11.9004L30.7996 23.9504L18.7496 36.0004Z" fill="black"/>
              </svg>          
            </button>
        `,
        adaptiveHeight: true,
      });
  };
  if (typeof $.fn.slick() == undefined) {
    const script = document.createElement("script");
    script.onload = initializeLibrary;
    script.src = "https://www.jsdelivr.com/projects/jquery.slick";
    document.body.appendChild(script);
  } else {
    initializeLibrary();
  }
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (editor, options) => {
  const dc = editor.DomComponents;
  const defaultType = dc.getType("default");
  const defaultView = defaultType.view;
  dc.addType(options.name, {
    model: {
      defaults: {
        traits: [
          {
            type: "select",
            label: `Slide Indicators`,
            name: "toggleSlideIndicators",
            options: [
              {
                value: "showSlideIndicators",
                name: "Show",
              },
              {
                value: "hideSlideIndicators",
                name: "Hide",
              },
            ],
            changeProp: 1,
          },
          {
            type: "select",
            label: `Arrow Controls`,
            name: "toggleSlideArrows",
            options: [
              {
                value: "showSlideArrows",
                name: "Show",
              },
              {
                value: "hideSlideArrows",
                name: "Hide",
              },
            ],
            changeProp: 1,
          },
          {
            type: "custom-button",
            name: "addNewSlideButton",
            text: "+ Add New Slide",
          },
        ],
        script,
        classContainer: options.classContainer,
        "script-props": ["classContainer", "traits"],
      },
      updated(property, value, prev) {
        const component = value.target;
        // When a slide is removed, update the slide numbers
        if (typeof value !== "string" && value?.models) {
          let count = 1;
          const slideRegex = /slick-slide\d+/;
          if (slideRegex.test(property)) {
            component.set(property, value);
          }
          value.models.map((trait, index) => {
            const attrib = trait.attributes;
            const newSlideNum = count;
            const newSlideIndex = count - 1;
            const slideTraitName = getSlideName(newSlideIndex);
            const component = value.target;
            if (slideRegex.test(attrib.name) && attrib.type === "custom-select") {
              component.getTrait(attrib.name).set({
                id: slideTraitName,
                label: `Slide ${newSlideNum}`,
                name: slideTraitName,
              });
              count++;
            }
            return trait;
          });
        }
        if (component?.get("components")) {
          let count = 0;
          component.get("components").each((slide) => {
            const slideTraitName = getSlideName(count);
            slide.setId(slideTraitName);
            count++;
          });
        }
      },
    },
    isComponent: (el) => {
      if (el.className && typeof el.className === "string" && el.className.includes(options.classContainer)) {
        return {
          type: options.name,
        };
      }
    },
    view: defaultView.extend({
      onRender({ el, model }) {
        const currentNumberOfSlides = el.children.length;
        if (currentNumberOfSlides > 0) {
          for (let slideIndex = 0; slideIndex < currentNumberOfSlides; slideIndex++) {
            const slideTraitName = getSlideName(slideIndex);
            const event = `change:${slideTraitName}`;
            const slideNum = slideIndex + 1;
            model.addTrait(newSlideTrait(slideTraitName, slideNum));
            model.set(slideTraitName, "defaultTemplate");
            model.on(event, () => {
              const selectedTemplate = model.get(slideTraitName);
              onChangeSlideTemplate({
                model,
                el,
                slideName: slideTraitName,
                selectedTemplate,
                slideNum,
              });
            });
          }
        }
        model.on("change:toggleSlideIndicators", function () {
          const toggleSlideIndicators = model.get("toggleSlideIndicators");
          if (toggleSlideIndicators === "hideSlideIndicators") {
            el.slick.slickSetOption("dots", false, true);
          } else {
            el.slick.slickSetOption("dots", true, true);
          }
        });
        model.on("change:toggleSlideArrows", function () {
          const toggleSlideArrows = model.get("toggleSlideArrows");
          if (toggleSlideArrows === "hideSlideArrows") {
            el.slick.slickSetOption("arrows", false, true);
            el.slick.slickPlay();
          } else {
            el.slick.slickSetOption("arrows", true, true);
            el.slick.slickPause();
          }
        });
      },
      // onRender({ el, model }) {},
    }),
  });
  editor.on("component:update:traits", function (model, otherprops) {
    // console.log("model on component update", { model, otherprops });
    if (typeof editor !== typeof undefined) {
      // console.log({ component: editor.getSelected() });
    }
  });
  editor.on("run:preview", function (model, otherprops) {
    editor.DomComponents.getWrapper().onAll((comp) => {
      console.log({ comp });
    });
  });
};
