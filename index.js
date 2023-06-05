import grapesjs from "grapesjs";
import loadComponents from "./src/components";
import loadBlocks from "./src/blocks";
import loadTraits from "./src/traits";

export default (editor, options) => {
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
