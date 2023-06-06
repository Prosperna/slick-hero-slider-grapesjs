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
  if (typeof this == undefined) {
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
          // {
          //   name: "addNewSlideButton",
          //   type: "addNewSlideButton",
          //   changeProp: 1,
          // },
          {
            name: "addNewSlideButton",
            full: true,
            label: "",
            type: "button",
            text: "Add new slide",
            noLabel: true,
            changeProp: 1,
            command: (_, sender) => {
              const model = sender.target;
              const el = sender.target.view.el;
              const currentSlides = el.children[3].children;
              const currentNumberOfSlides = currentSlides.length;
              const newSlidesLength = currentNumberOfSlides + 1;
              const newTrait = {
                type: "select",
                label: `Slide ${newSlidesLength}`,
                name: `slide${newSlidesLength}`,
                options: [
                  {
                    value: "defaultTemplate",
                    name: "Default Template",
                  },
                  {
                    value: "heroImagePlacementLeft",
                    name: "With Hero Image on Left",
                  },
                  {
                    value: "heroImagePlacementRight",
                    name: "WIth Hero Image on Right",
                  },
                  { value: "removeSlide", name: "Remove slide" },
                ],
                changeProp: 1,
              };

              model.addTrait(newTrait);

              el.slick.addSlide(
                /*html*/
                `<div class="slick-slide" id="slide${currentNumberOfSlides}">
                    <div class="hero-slide slide-wrapper basic-hero__wrapper">
                      <div class="d-flex align-items-center justify-content-center">
                        <h2 class="display-3 fw-semibold">Heading</h2>
                      </div>
                      <div class="d-flex align-items-center justify-content-center">
                        <h4 class="display-5 fw-semibold">Subheading</h4>
                      </div>
                      <div class="d-flex align-items-center justify-content-center description">
                        <p class="lead mb-4">Description</p>
                      </div>
                      <div class="d-flex justify-content-center align-items-center">
                        <a href="#" class="btn btn-primary btn-lg px-4 gap-3">Hover me</a>
                      </div>
                    </div>
                  </div>
                  `
              );
            },
          },
          {
            type: "select",
            label: `Hide Slide Indicators`,
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
        ],
        script,
        classContainer: options.classContainer,
        "script-props": ["classContainer", "traits"],
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
        const onChangeSlideTemplate = (slideName, selectedTemplate, slideNum) => {
          const slideIndex = slideNum - 1;
          if (selectedTemplate === "removeSlide") {
            model.removeTrait(slideName);
            el.slick.removeSlide(slideIndex);
          }
          const slide = document.querySelector(`#${slideName}`);
          const components = editor.getSelected("components");
          console.log({ slide, slideName, el, model, components });
        };

        const currentNumberOfSlides = el.children.length;

        if (currentNumberOfSlides > 0) {
          for (let slideNum = 1; slideNum <= currentNumberOfSlides; slideNum++) {
            const slideTraitName = `slide${slideNum}`;
            const event = `change:${slideTraitName}`;
            // (<any>$(".slide-show")).not(".slick-initialized").slick("slickRemove", slideNum - 1);
            const newTrait = {
              type: "select",
              label: `Slide ${slideNum}`,
              name: slideTraitName,
              options: [
                {
                  value: "heroImagePlacementLeft",
                  name: "With Hero Image on Left",
                },
                {
                  value: "heroImagePlacementRight",
                  name: "WIth Hero Image on Right",
                },
                { value: "removeSlide", name: "Remove slide" },
              ],
              changeProp: 1,
            };
            model.addTrait(newTrait);
            model.on(event, () => {
              const selectedTemplate = model.get(slideTraitName);
              onChangeSlideTemplate(slideTraitName, selectedTemplate, slideNum);
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
      },
    }),
  });
};
