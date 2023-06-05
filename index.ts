import grapesjs, { Editor } from "grapesjs";
// import loadComponents from "./components";
import loadBlocks from "./src/blocks";
// import loadTraits from "./traits";
import { HeroOptions } from "./types";

interface LocalOptions {
  [key: string]: any;
}

export default grapesjs.plugins.add("hero-slick-slider", (editor: Editor, options: HeroOptions) => {
  let localOptions = {
    label: "Hero",
    name: "hero",
    category: "Elements",
    classContainer: "slick-slider",
  } as LocalOptions;

  for (let name in localOptions) {
    if (!(name in options)) {
      options[name as keyof HeroOptions] = localOptions[name];
    }
  }
  loadBlocks(editor, options);
  // loadComponents(editor, options);
  // loadTraits(editor, options);
});
