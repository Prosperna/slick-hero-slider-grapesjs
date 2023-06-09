const withMediaSlideContainerStyle = "display: grid; grid-template-columns: repeat(2, 1fr)";
const withMediaSlideContentStyle = "padding: 1rem; display: flex; justify-content: center";
const withoutMediaSlideContentStyle = "display: none;";
export const newSlideTrait = (slideName, slideNum) => ({
  type: "custom-select",
  label: `Slide ${slideNum}`,
  name: slideName,
  options: [
    {
      value: "defaultTemplate",
      name: "Default Layout",
    },
    {
      value: "heroImagePlacementLeft",
      name: "Image/Video on the left",
    },
    {
      value: "heroImagePlacementRight",
      name: "Image/Video on the right",
    },
    // { value: "removeSlide", name: "Remove slide" },
  ],
  changeProp: 1,
});
export const onChangeSlideTemplate = ({ model, el, slideName, selectedTemplate, slideNum, editor }) => {
  const slideIndex = slideNum - 1;
  if (selectedTemplate === "removeSlide") {
    model.removeTrait(slideName);
    el.slick.removeSlide(slideIndex);
  }
  if (
    selectedTemplate === "heroImagePlacementLeft" ||
    selectedTemplate === "heroImagePlacementRight" ||
    selectedTemplate === "defaultTemplate"
  ) {
    // For newly added slides, modifying it via DOM
    const slideRegex = /slick-slide\d+/;
    for (let i = 0; i < el.children.length; i++) {
      const slickSliderChildren = el.children[i];
      const slickSliderChildrenClasses = slickSliderChildren.classList;
      if (slickSliderChildrenClasses.contains("slick-list")) {
        for (let j = 0; j < slickSliderChildren.children[0].children.length; j++) {
          const slide = slickSliderChildren.children[0].children[j];
          const slideId = slide.id;
          if (slideRegex.test(slideId) && slideId === slideName) {
            const slideContainer = slide.children[0];
            if (selectedTemplate === "defaultTemplate") {
              slideContainer.style = "display: block";
            } else {
              slideContainer.style = withMediaSlideContainerStyle;
            }
            for (let k = 0; k < slide.children[0].children.length; k++) {
              const slideContent = slideContainer.children[k];
              const slideContentClasses = slideContent.classList;
              if (
                (selectedTemplate === "heroImagePlacementRight" || selectedTemplate == "defaultTemplate") &&
                slideContentClasses.contains("content-left")
              ) {
                slideContent.style = withoutMediaSlideContentStyle;
              }
              if (
                (selectedTemplate === "heroImagePlacementLeft" || selectedTemplate === "defaultTemplate") &&
                slideContentClasses.contains("content-right")
              ) {
                slideContent.style = withoutMediaSlideContentStyle;
              }
              if (
                selectedTemplate === "heroImagePlacementLeft" &&
                slideContentClasses.contains("content-left")
              ) {
                slideContent.style = withMediaSlideContentStyle;
              }
              if (
                selectedTemplate === "heroImagePlacementRight" &&
                slideContentClasses.contains("content-right")
              ) {
                slideContent.style = withMediaSlideContentStyle;
              }
            }
          }
        }
      }
    }
    // For pre-rendered slides, using the model to update the slide template
    model.get("components").each((slide) => {
      // console.log({ slideId: slide.getId(), slideName, slide, model });
      if (slideName === slide.getId()) {
        slide.get("components").each((slideContainer) => {
          if (selectedTemplate === "defaultTemplate") {
            slideContainer.setAttributes({ style: "display: block" });
          } else {
            slideContainer.setAttributes({ style: withMediaSlideContainerStyle });
          }
          slideContainer.get("components").each((slideContent) => {
            const slideContentClasses = slideContent.getClasses();
            if (
              (selectedTemplate === "heroImagePlacementRight" || selectedTemplate == "defaultTemplate") &&
              slideContentClasses.includes("content-left")
            ) {
              slideContent.setAttributes({
                style: withoutMediaSlideContentStyle,
              });
            }
            if (
              (selectedTemplate === "heroImagePlacementLeft" || selectedTemplate === "defaultTemplate") &&
              slideContentClasses.includes("content-right")
            ) {
              slideContent.setAttributes({
                style: withoutMediaSlideContentStyle,
              });
            }
            if (
              selectedTemplate === "heroImagePlacementLeft" &&
              slideContentClasses.includes("content-left")
            ) {
              slideContent.setAttributes({
                style: withMediaSlideContentStyle,
              });
            }
            if (
              selectedTemplate === "heroImagePlacementRight" &&
              slideContentClasses.includes("content-right")
            ) {
              slideContent.setAttributes({
                style: withMediaSlideContentStyle,
              });
            }
            // el.slick.refresh();
          });
        });
      }
    });
  }
  // model.setAttributes({ style: "background: red;" });
};

export const getSlideName = (slideIndex) => {
  let slideName = `slick-slide${slideIndex}`;
  if (slideIndex < 10) {
    slideName = `slick-slide0${slideIndex}`;
  }
  return slideName;
};

export const getSlideIndex = (slideName) => {
  const lastTwoDigits = slideName.slice(-2);
  return Number(lastTwoDigits);
};
