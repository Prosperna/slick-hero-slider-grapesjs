import grapesjs, { Editor } from "grapesjs";
import loadComponents from "./src/components";
import loadBlocks from "./src/blocks";
import loadTraits from "./src/traits";
import { HeroOptions } from "./types";

interface LocalOptions {
  [key: string]: any;
}

export default (editor: Editor, options: HeroOptions) => {
  const localOptions = {
    label: "Hero",
    name: "hero",
    category: "Elements",
    classContainer: "slick-slider",
  } as LocalOptions;

  for (const name in localOptions) {
    if (!(name in options)) {
      options[name as keyof HeroOptions] = localOptions[name];
    }
  }
  loadBlocks(editor, options);
  loadComponents(editor, options);
  loadTraits(editor, options);
};
