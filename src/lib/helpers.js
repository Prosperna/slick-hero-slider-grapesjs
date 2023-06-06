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
export const onChangeSlideTemplate = ({ model, el, slideName, selectedTemplate, slideNum, child }) => {
  const slideIndex = slideNum - 1;
  if (selectedTemplate === "removeSlide") {
    model.removeTrait(slideName);
    el.slick.removeSlide(slideIndex);
  }
  console.log({ child });
};
