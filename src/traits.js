/* eslint-disable import/no-anonymous-default-export */

export default (editor, options) => {
  const tm = editor.TraitManager;
  tm.addType("addNewSlideButton", {
    noLabel: true,
    // events: {
    //   click: function (props) {
    //     console.log("inside traits", props);
    //   },
    // },
    // getInputEl() {
    //   let button = document.createElement("button");
    //   button.id = "addNewSlide";
    //   button.setAttribute("class", "bg-blue-500 p-4 w-full rounded-sm text-white");
    //   button.setAttribute("id", "addNewSlide");
    //   button.appendChild(document.createTextNode("Add a new slide"));
    //   return button;
    // },
    createInput(props) {
      const component = editor.getSelected(); // Component selected in canvas
      const traits = component.get("traits");
      console.log({ props, traits });
      // Here we can decide to use properties from the trait

      // Create a new element container and add some content
      let el = document.createElement("button");
      el.id = "addNewSlideButton";
      el.setAttribute("class", "bg-blue-500 p-4 w-full rounded-sm text-white");
      el.setAttribute("id", "addNewSlideButton");
      el.appendChild(document.createTextNode("Add a new slide"));
      $("#addNewSlideButton").on("click", function () {
        $(".slick-slider").slick(
          "slickAdd",
          `
          <div class="slick-slide" id="slide${4}">
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
          </div>
        `
        );
      });
      return el;
    },
    events: {
      click: function (clickProps) {
        console.log({ clickProps });
      },
    },
  });
};
