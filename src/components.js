import { newSlideTrait, onChangeSlideTemplate } from "./lib/helpers";

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
            name: "addNewSlideButton",
            full: true,
            label: "",
            type: "button",
            text: "Add new slide",
            noLabel: true,
            changeProp: 1,
            command: (editor, sender) => {
              const component = editor.getSelected();
              console.log({ component });
              const model = sender.target;
              const el = sender.target.view.el;
              const currentSlides = el.children[3].children;
              console.log({ currentSlides });
              const currentNumberOfSlides = currentSlides.length;
              const newSlidesLength = currentNumberOfSlides + 1;
              const slideTraitName = `slide${newSlidesLength}`;

              model.addTrait(newSlideTrait(slideTraitName, newSlidesLength));
              model.on(`change:slide${newSlidesLength}`, function () {
                console.log("hello");
                // const selectedTemplate = model.get(slideTraitName);
                // onChangeSlideTemplate({
                //   slideName: slideTraitName,
                //   selectedTemplate,
                //   slideNum: newSlidesLength,
                //   model,
                //   el,
                //   editor,
                // });
              });

              el.slick.addSlide(
                /*html*/
                `<div class="slick-slide" id="slide${newSlidesLength}">
                    <div class="hero-template">
                      <div class="content-left container">
                        <div class="hero-media">
                          <div class="image-container">
                            <img
                              src="https://p1-mediaserver.s3.ap-southeast-1.amazonaws.com/builder/assets/images/add-file-image.png"
                              alt="Add file"
                            />
                          </div>
                        </div>
                      </div>
                      <div class="hero-main container">
                        <h2 class="display-3 fw-semibold heading">Heading</h2>
                        <h4 class="display-5 fw-semibold subheading">Subheading</h4>
                        <p class="lead description">Description</p>
                        <div class="call-to-action">
                          <a href="#" class="btn btn-primary btn-lg px-4">Hover me</a>
                        </div>
                      </div>
                      <div class="content-right container">
                        <div class="hero-media">
                          <div class="image-container">
                            <img
                              src="https://p1-mediaserver.s3.ap-southeast-1.amazonaws.com/builder/assets/images/add-file-image.png"
                              alt="Add file"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                `
              );
              model.set(slideTraitName, "defaultTemplate");
            },
          },
          {
            type: "select",
            label: `Toggle Slide Indicators`,
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
            label: `Toggle Slide Arrows`,
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
        ],
        script,
        classContainer: options.classContainer,
        "script-props": ["classContainer", "traits"],
      },
      updated(property, value, prev) {
        // console.log({ property, value, prev });

        // When a slide is removed, update the slide numbers
        if (typeof value !== "string" && value?.models) {
          let count = 1;
          value.models.map((model, index) => {
            const attrib = model.attributes;
            if (attrib.name.includes("slide") && attrib.type === "select" && attrib.name.length < 8) {
              const newSlideNum = count;
              const slideTraitName = `slide${newSlideNum}`;
              const component = value.target;
              component.getTrait(attrib.name).set({
                id: slideTraitName,
                label: `Slide ${newSlideNum}`,
                name: slideTraitName,
              });
              count++;
            }
            return model;
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
        // for (let childNum = 0; childNum < el.children.length; childNum++) {
        //   const child = el.children[childNum];
        //   console.log({ child });
        // }
        if (currentNumberOfSlides > 0) {
          for (let slideNum = 1; slideNum <= currentNumberOfSlides; slideNum++) {
            const child = el.children[slideNum - 1];
            const slideTraitName = `slide${slideNum}`;
            const event = `change:${slideTraitName}`;
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
    }),
  });
};
