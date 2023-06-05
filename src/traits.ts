/* eslint-disable import/no-anonymous-default-export */
import { HeroOptions, SlickSlider } from "../types";
import { Editor } from "grapesjs";

export default (editor: Editor, options: HeroOptions) => {
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
      console.log({ props });
      // Here we can decide to use properties from the trait

      // Create a new element container and add some content
      let el = document.createElement("button");
      el.id = "addNewSlideButton";
      el.setAttribute("class", "bg-blue-500 p-4 w-full rounded-sm text-white");
      el.setAttribute("id", "addNewSlideButton");
      el.appendChild(document.createTextNode("Add a new slide"));
      // $("#addNewSlideButton").on("click", function () {
      //   (<any>$(".slick-slider")).slick(
      //     "slickAdd",
      //     /*html*/ `
      //       <div class="slick-slide" id="slide4">
      //           <div class="hero-slide slide-wrapper basic-hero__wrapper">
      //             <div class="d-flex align-items-center justify-content-center">
      //               <h2 class="display-3 fw-semibold">Heading</h2>
      //             </div>
      //             <div class="d-flex align-items-center justify-content-center">
      //               <h4 class="display-5 fw-semibold">Subheading</h4>
      //             </div>
      //             <div class="d-flex align-items-center justify-content-center description">
      //               <p class="lead mb-4">Description</p>
      //             </div>
      //             <div class="d-flex justify-content-center align-items-center">
      //               <a href="#" class="btn btn-primary btn-lg px-4 gap-3">Hover me</a>
      //             </div>
      //           </div>
      //       </div>
      //     `
      //   );
      // });
      const initializeLibrary = function () {
        (<any>$(document)).ready(function () {
          (<any>$(`.slick-slider`)).not(".slick-initialized").slick({
            arrows: true,
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            // centerMode: true,
            // variableWidth: true,
            // draggable: true,
            slidesToScroll: 1,
            prevArrow: /*html*/ `
                <button type="button" class="slick-prev">
                  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M29.2504 36.0004L31.4004 33.8504L21.5004 23.9504L31.4004 14.0504L29.2504 11.9004L17.2004 23.9504L29.2504 36.0004Z" fill="black"/>
                  </svg>          
                </button>
            `,
            nextArrow: /*html*/ `
                <button type="button" class="slick-next">
                  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18.7496 36.0004L16.5996 33.8504L26.4996 23.9504L16.5996 14.0504L18.7496 11.9004L30.7996 23.9504L18.7496 36.0004Z" fill="black"/>
                  </svg>          
                </button>
            `,
            adaptiveHeight: true,
          } as SlickSlider);
        });
      };
      const script = document.createElement("script");
      script.onload = initializeLibrary;
      script.src = "https://www.jsdelivr.com/projects/jquery.slick";
      document.body.appendChild(script);
      el.addEventListener("click", (ev: any) => {
        const model = props.trait.target;
        model.append(`<div class="slick-slide" id="slide4">
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
    </div>`);
      });

      return el;
    },
  });
};
