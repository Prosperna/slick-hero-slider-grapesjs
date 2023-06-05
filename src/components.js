import $ from "jquery";

const script = function (props) {
  const classContainer = props.classContainer;
  const initializeLibrary = function () {
    $(document).ready(function () {
      $(`.${classContainer}`)
        .not(".slick-initialized")
        .slick({
          arrows: true,
          dots: true,
          infinite: true,
          speed: 500,
          slidesToShow: 1,
          // centerMode: true,
          // variableWidth: true,
          // draggable: true,
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
          {
            name: "addNewSlideButton",
            type: "addNewSlideButton",
            changeProp: 1,
          },
          {
            name: "addNewSlideButton",
            full: true,
            label: "",
            type: "button",
            text: "Add new slide",
            noLabel: true,
            changeProp: 1,
            command: (editor, sender) => {
              const model = sender.target;
              console.log({ sender });
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
              $(".slide-show")
                .not(".slick-initialized")
                .slick(
                  "slickAdd",
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
                </div>`
                );
              // (<any>$(".slick-slider")).slick(
              //   "slickAdd",
              //   `
              // <div class="slick-slide" id="slide${currentNumberOfSlides}">
              //    <div class="hero-slide slide-wrapper basic-hero__wrapper">
              //        <div class="d-flex align-items-center justify-content-center">
              //          <h2 class="display-3 fw-semibold">Heading</h2>
              //        </div>
              //        <div class="d-flex align-items-center justify-content-center">
              //          <h4 class="display-5 fw-semibold">Subheading</h4>
              //        </div>
              //        <div class="d-flex align-items-center justify-content-center description">
              //          <p class="lead mb-4">Description</p>
              //        </div>
              //        <div class="d-flex justify-content-center align-items-center">
              //          <a href="#" class="btn btn-primary btn-lg px-4 gap-3">Hover me</a>
              //        </div>
              //    </div>
              //  </div>
              // `
              // );
              //   model.append(`
              //   <div class="slick-slide" id="slide${currentNumberOfSlides}">
              //     <div class="hero-slide slide-wrapper basic-hero__wrapper">
              //         <div class="d-flex align-items-center justify-content-center">
              //           <h2 class="display-3 fw-semibold">Heading</h2>
              //         </div>
              //         <div class="d-flex align-items-center justify-content-center">
              //           <h4 class="display-5 fw-semibold">Subheading</h4>
              //         </div>
              //         <div class="d-flex align-items-center justify-content-center description">
              //           <p class="lead mb-4">Description</p>
              //         </div>
              //         <div class="d-flex justify-content-center align-items-center">
              //           <a href="#" class="btn btn-primary btn-lg px-4 gap-3">Hover me</a>
              //         </div>
              //     </div>
              //   </div>
              // `);
              // console.log({ el });
              // (<any>$(".slick-slider")).slick(
              //   "slickAdd",
              //   `
              //     <div class="slick-slide" id="slide${newSlidesLength}">
              //       <div class="hero-slide slide-wrapper basic-hero__wrapper">
              //           <div class="d-flex align-items-center justify-content-center">
              //             <h2 class="display-3 fw-semibold">Heading</h2>
              //           </div>
              //           <div class="d-flex align-items-center justify-content-center">
              //             <h4 class="display-5 fw-semibold">Subheading</h4>
              //           </div>
              //           <div class="d-flex align-items-center justify-content-center description">
              //             <p class="lead mb-4">Description</p>
              //           </div>
              //           <div class="d-flex justify-content-center align-items-center">
              //             <a href="#" class="btn btn-primary btn-lg px-4 gap-3">Hover me</a>
              //           </div>
              //       </div>
              //     </div>
              //   `
              // );
              //   model.append(`
              //   (<any>$('.slick-slider')).slick(
              //     "slickAdd",
              //     <div class="slick-slide" id="slide${newSlidesLength}">
              //       <div class="hero-slide slide-wrapper basic-hero__wrapper">
              //           <div class="d-flex align-items-center justify-content-center">
              //             <h2 class="display-3 fw-semibold">Heading</h2>
              //           </div>
              //           <div class="d-flex align-items-center justify-content-center">
              //             <h4 class="display-5 fw-semibold">Subheading</h4>
              //           </div>
              //           <div class="d-flex align-items-center justify-content-center description">
              //             <p class="lead mb-4">Description</p>
              //           </div>
              //           <div class="d-flex justify-content-center align-items-center">
              //             <a href="#" class="btn btn-primary btn-lg px-4 gap-3">Hover me</a>
              //           </div>
              //       </div>
              //     </div>
              //   )
              // `);
              // console.log({ currentSlides, type: typeof currentSlides });
              // for (let i = 0; i < currentNumberOfSlides; i++) {
              //   const slide = currentSlides[i];
              //   console.log({ i, slide });
              //   model.append(`
              //       <div class="slick-slide" id="slide${i + 1}">
              //         <div class="hero-slide slide-wrapper basic-hero__wrapper">
              //             <div class="d-flex align-items-center justify-content-center">
              //               <h2 class="display-3 fw-semibold">Heading</h2>
              //            </div>
              //            <div class="d-flex align-items-center justify-content-center">
              //              <h4 class="display-5 fw-semibold">Subheading</h4>
              //            </div>
              //            <div class="d-flex align-items-center justify-content-center description">
              //              <p class="lead mb-4">Description</p>
              //            </div>
              //            <div class="d-flex justify-content-center align-items-center">
              //              <a href="#" class="btn btn-primary btn-lg px-4 gap-3">Hover me</a>
              //            </div>
              //        </div>
              //      </div>
              //    `);
              // }
              // currentSlides.forEach((slide, index) => {
              //   console.log({ index, slide });
              //   model.append(`
              //     <div class="slick-slide" id="slide${index + 1}">
              //       <div class="hero-slide slide-wrapper basic-hero__wrapper">
              //           <div class="d-flex align-items-center justify-content-center">
              //             <h2 class="display-3 fw-semibold">Heading</h2>
              //           </div>
              //           <div class="d-flex align-items-center justify-content-center">
              //             <h4 class="display-5 fw-semibold">Subheading</h4>
              //           </div>
              //           <div class="d-flex align-items-center justify-content-center description">
              //             <p class="lead mb-4">Description</p>
              //           </div>
              //           <div class="d-flex justify-content-center align-items-center">
              //             <a href="#" class="btn btn-primary btn-lg px-4 gap-3">Hover me</a>
              //           </div>
              //       </div>
              //     </div>
              //   `);
              // });

              // editor.getConfig().allowScripts = 1;
              // const commands = editor.Commands;
              // commands.add("my-command-id", (editor) => {
              //   console.log("This is my command");
              //   // your jQuery code here
              //   (<any>$(".slide-show")).slick(
              //     "slickAdd",
              //     `<div class="slick-slide" id="slide${newSlidesLength}">
              //         <div class="hero-slide slide-wrapper basic-hero__wrapper">
              //           <div class="d-flex align-items-center justify-content-center">
              //             <h2 class="display-3 fw-semibold">Heading</h2>
              //           </div>
              //           <div class="d-flex align-items-center justify-content-center">
              //             <h4 class="display-5 fw-semibold">Subheading</h4>
              //           </div>
              //           <div class="d-flex align-items-center justify-content-center description">
              //             <p class="lead mb-4">Description</p>
              //           </div>
              //           <div class="d-flex justify-content-center align-items-center">
              //             <a href="#" class="btn btn-primary btn-lg px-4 gap-3">Hover me</a>
              //           </div>
              //         </div>
              //     </div>`
              //   );
              // });
              // editor.runCommand("my-command-id");
              // const slideShow = document.querySelector(".slick-track");
              // console.log({ slideShow });
              // (<any>$(".addNewSlideButton")).slick(
              //   "slickAdd",
              //   /*html*/ `
              //     <div class="slick-slide" id="slide${newSlidesLength}">
              //         <div class="hero-slide slide-wrapper basic-hero__wrapper">
              //           <div class="d-flex align-items-center justify-content-center">
              //             <h2 class="display-3 fw-semibold">Heading</h2>
              //           </div>
              //           <div class="d-flex align-items-center justify-content-center">
              //             <h4 class="display-5 fw-semibold">Subheading</h4>
              //           </div>
              //           <div class="d-flex align-items-center justify-content-center description">
              //             <p class="lead mb-4">Description</p>
              //           </div>
              //           <div class="d-flex justify-content-center align-items-center">
              //             <a href="#" class="btn btn-primary btn-lg px-4 gap-3">Hover me</a>
              //           </div>
              //         </div>
              //     </div>
              //   `
              // );
              // // Define the script content with an alert statement
              // var scriptContent = `
              //   $(".slide-show").slick(
              //       "slickAdd",
              //       "
              //         <div class="slick-slide" id="slide${newSlidesLength}">
              //           <div class="hero-slide slide-wrapper basic-hero__wrapper">
              //               <div class="d-flex align-items-center justify-content-center">
              //                 <h2 class="display-3 fw-semibold">Heading</h2>
              //               </div>
              //               <div class="d-flex align-items-center justify-content-center">
              //                 <h4 class="display-5 fw-semibold">Subheading</h4>
              //               </div>
              //               <div class="d-flex align-items-center justify-content-center description">
              //                 <p class="lead mb-4">Description</p>
              //               </div>
              //               <div class="d-flex justify-content-center align-items-center">
              //                 <a href="#" class="btn btn-primary btn-lg px-4 gap-3">Hover me</a>
              //               </div>
              //           </div>
              //         </div>
              //       "
              //     )
              // `;

              // // Create a script element
              // var scriptElement = document.createElement("script");

              // // Set the script content as the innerHTML of the script element
              // scriptElement.innerHTML = scriptContent;
              // console.log({ document });
              // // Append the script element to the document to execute the script
              // document.body.append(scriptElement);

              // model.set(
              //   "script",
              //   `
              //   <script>
              //     $(".slide-show").slick(
              //       "slickAdd",
              //       "
              //         <div class="slick-slide" id="slide${newSlidesLength}">
              //           <div class="hero-slide slide-wrapper basic-hero__wrapper">
              //               <div class="d-flex align-items-center justify-content-center">
              //                 <h2 class="display-3 fw-semibold">Heading</h2>
              //               </div>
              //               <div class="d-flex align-items-center justify-content-center">
              //                 <h4 class="display-5 fw-semibold">Subheading</h4>
              //               </div>
              //               <div class="d-flex align-items-center justify-content-center description">
              //                 <p class="lead mb-4">Description</p>
              //               </div>
              //               <div class="d-flex justify-content-center align-items-center">
              //                 <a href="#" class="btn btn-primary btn-lg px-4 gap-3">Hover me</a>
              //               </div>
              //           </div>
              //         </div>
              //       "
              //     );
              //   </script>

              // `
              // );
              // model.set("script", '<script>alert("Hello, GrapesJS!");</script>');
            },
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
        console.log("default view extend");
        const onChangeSlideTemplate = (slideName, selectedTemplate) => {
          console.log({ selectedTemplate, slideName });
          if (selectedTemplate === "removeSlide") {
            model.removeTrait(slideName);
          }
        };

        const currentNumberOfSlides = el.children.length;
        console.log({ model });
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
              onChangeSlideTemplate(slideTraitName, selectedTemplate);
            });
          }
        }

        model.on("change:addNewSlideButton", (component) => {
          console.log({ component });
        });
      },
    }),
  });
};
