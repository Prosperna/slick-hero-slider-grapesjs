import grapesjs from "grapesjs";
import loadComponents from "./src/components.js";
import loadBlocks from "./src/blocks.js";
import loadTraits from "./src/traits.js";

export default grapesjs.plugins.add("hero-slick-slider", (editor, options) => {
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
});
