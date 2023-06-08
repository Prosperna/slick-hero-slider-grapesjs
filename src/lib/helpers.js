export const newSlideTrait = (slideName, slideNum) => ({
  type: "select",
  label: `Slide ${slideNum}`,
  name: slideName,
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
});
export const onChangeSlideTemplate = ({ model, el, slideName, selectedTemplate, slideNum, editor }) => {
  const slideIndex = slideNum - 1;
  if (selectedTemplate === "removeSlide") {
    model.removeTrait(slideName);
    el.slick.removeSlide(slideIndex);
  }
  if (selectedTemplate === "heroImagePlacementLeft" || selectedTemplate === "heroImagePlacementRight") {
    console.log({ model, el });
    model.get("components").each((child) => {
      console.log({ child });
      if (slideName === child.attributes.attributes.id) {
        child.get("components").each((grandchild) => {
          console.log({ grandchild });
          grandchild.setAttributes({ style: "display: grid; grid-template-columns: repeat(2, 1fr)" });
          grandchild.get("components").each((greatGrandChild) => {
            console.log({ greatGrandChild });
            const greatGrandChildClasses = greatGrandChild.getClasses();
            if (
              selectedTemplate === "heroImagePlacementRight" &&
              greatGrandChildClasses.includes("content-left")
            ) {
              greatGrandChild.setAttributes({
                style: "display: none;",
              });
            }
            if (
              selectedTemplate === "heroImagePlacementLeft" &&
              greatGrandChildClasses.includes("content-right")
            ) {
              greatGrandChild.setAttributes({
                style: "display: none;",
              });
            }
            if (
              selectedTemplate === "heroImagePlacementLeft" &&
              greatGrandChildClasses.includes("content-left")
            ) {
              greatGrandChild.setAttributes({
                style: "padding: 1rem; display: flex; align-items: center; justify-content: center;",
              });
            }
            if (
              selectedTemplate === "heroImagePlacementRight" &&
              greatGrandChildClasses.includes("content-right")
            ) {
              greatGrandChild.setAttributes({
                style: "padding: 1rem; display: flex; align-items: center; justify-content: center;",
              });
            }
          });
        });
      }
    });
  }
  // model.setAttributes({ style: "background: red;" });
};
