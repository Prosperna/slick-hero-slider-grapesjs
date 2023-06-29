/* eslint-disable import/no-anonymous-default-export */

import { getSlideIndex, getSlideName, newSlideTrait, onChangeSlideTemplate } from "./lib/helpers.js";
import { AddMediaSvg } from "./components/AddMediaISvg.js";

export default (editor, options) => {
  const tm = editor.TraitManager;
  tm.addType("custom-select", {
    createInput({ trait, component }) {
      const model = component;
      const el = component.view.el;
      const options = trait.get("options") || [];
      const value = trait.get("value");
      const select = document.createElement("select");
      options.forEach((opt) => {
        const option = document.createElement("option");
        option.value = opt.value;
        option.text = opt.name;
        select.add(option);
      });
      select.value = value;
      select.addEventListener("change", () => {
        trait.set("value", select.value);
      });
      const closeButton = document.createElement("button");
      closeButton.textContent = "x";
      closeButton.addEventListener("click", () => {
        model.removeTrait(trait.id);
        el.slick.removeSlide(getSlideIndex(trait.id));
      });
      const container = document.createElement("div");
      container.setAttribute("class", "flex items-center justify-center");
      container.appendChild(select);
      select.setAttribute("class", "border w-full focus:outline-none py-2 px-1");
      container.appendChild(closeButton);
      closeButton.setAttribute("class", "p-3 text-lg text-black");
      return container;
    },
    templateInput: '<div style="border: none; padding: 0; margin: 0;" data-input></div>',
  });
  tm.addType("custom-button", {
    createInput({ trait, component }) {
      const model = component;
      const el = component.view.el;

      const input = document.createElement("button");
      input.textContent = trait.get("text") || "";
      input.setAttribute("class", "bg-blue-500 p-4 w-full rounded-sm text-white");
      input.addEventListener("click", () => {
        const currentSlides = el.children[3].children;

        const currentNumberOfSlides = currentSlides.length;
        const newSlidesLength = currentNumberOfSlides + 1;
        const slideTraitName = getSlideName(currentNumberOfSlides);

        model.addTrait(newSlideTrait(slideTraitName, newSlidesLength));
        model.set(slideTraitName, "defaultTemplate");
        model.append(/*html */ `
        <div class="slick-slide" id="${getSlideName(currentNumberOfSlides)}">
          <div class="hero-template">
            <div class="content-left container">
              <div class="hero-media" data-gjs-resizable="false" data-gjs-draggable="false" data-gjs-selectable="false" >
                <div class="image-container" data-gjs-resizable="false" data-gjs-draggable="false" data-gjs-selectable="false" >
                  ${AddMediaSvg}
                </div>
              </div>
            </div>
            <div class="hero-main container">
              <h2 class="display-3 fw-semibold heading container">Heading</h2>
              <h4 class="display-5 fw-semibold subheading container">Subheading</h4>
              <p class="lead description container">Description</p>
              <div class="call-to-action container">
                <a href="#" class="btn btn-primary btn-lg px-4">Hover me</a>
              </div>
            </div>
            <div class="content-right container">
              <div class="hero-media" data-gjs-resizable="false" data-gjs-draggable="false" data-gjs-selectable="false">
                <div class="image-container" data-gjs-resizable="false" data-gjs-draggable="false" data-gjs-selectable="false">
                  ${AddMediaSvg}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      `);
        model.on(`change:${slideTraitName}`, function () {
          const selectedTemplate = model.get(slideTraitName);
          onChangeSlideTemplate({
            slideName: slideTraitName,
            selectedTemplate,
            slideNum: newSlidesLength,
            model,
            el,
            editor,
          });
        });
        el.slick.refresh();
      });
      return input;
    },
    full: true,
    noLabel: true,
    templateInput: '<div style="border: none; padding: 0; margin: 0;" data-input></div>',
  });
};
