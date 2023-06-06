import "./node_modules/grapesjs/dist/grapes.min.js";
import loadComponents from "./src/components.js";
import loadBlocks from "./src/blocks.js";
import loadTraits from "./src/traits.js";

const heroSlickSlider = function (editor, options) {
  let localOptions = {
    label: "Hero",
    name: "hero",
    category: "Elements",
    classContainer: "slick-slider",
  };

  for (let name in localOptions) {
    if (!(name in options)) {
      options[name] = localOptions[name];
    }
  }
  loadBlocks(editor, options);
  loadComponents(editor, options);
  loadTraits(editor, options);
};
grapesjs.plugins.add("hero-slick-slider", heroSlickSlider);
