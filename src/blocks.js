// eslint-disable-next-line import/no-anonymous-default-export
// eslint-disable-next-line import/no-anonymous-default-exportslick-slider
import { AddMediaSvg } from "./components/AddMediaISvg.js";

export default (editor, options) => {
  const bm = editor.BlockManager;
  const style = /*css*/ `
    <style>
      .slick-slider-hero {
        min-height: calc(100vh - 5rem);
        height: 90%;
        position: relative;
        overflow: hidden;
        display: flex;
        align-items: center; 
        font-family: Roboto, Arial, sans-serif;
      }
      .slick-prev,
      .slick-next {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        color: #000;
        background-color: transparent;
        border: none;
        padding: 10px;
        cursor: pointer;
      }

      .slick-prev.slick-arrow {
        left: 5px;
        z-index: 20;
      }
      .slick-next.slick-arrow {
        right: 5px;
        z-index: 20;
      }
      .slick-slider-hero .slick-slide {
        opacity: 0;
        transition: opacity 0.3s;
      }

      .slick-slider-hero .slick-slide.slick-current {
        opacity: 1;
      }

      .slick-slider-hero .slick-dots {
        position: absolute;
        bottom: 20px;
        left: 0;
        right: 0;
        display: flex;
        justify-content: center;
        padding: 0;
      }

      .slick-slider-hero .slick-dots li {
        list-style: none;
        margin: 0 5px;
      }

      .slick-slider-hero .slick-dots li button {
        background-color: #fff;
        border: 1px solid rgba(0, 0, 0, 0.2);
        border-radius: 50%;
        width: 20px;
        height: 20px;
        cursor: pointer;
        outline: none;
        text-indent: -9999em;
      }

      .slick-slider-hero .slick-dots li.slick-active button {
        background-color: #bbb;
      }
      .slick-slide {
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .hero-template {
        height: 400px;
        width: calc(100vw - 150px);
        margin: 0 auto;
        padding-top: 1rem;
        padding-bottom: 1rem;
        /* display: grid;
        grid-template-columns: repeat(2, 1fr);
        border: 1px solid red; */
      }
      .content-left {
        display: none;
        /* padding: 1rem;
        display: flex;
        align-items: center;
        justify-content: center; */
      }

      .content-right {
        display: none;
      }
      .content-left img {
        height: 100%;
        width: 100%;
        max-height: 300px;
        max-width: 850px;
        object-fit: cover;
      }
      .content-right img {
        height: 100%;
        width: 100%;
        max-height: 300px;
        max-width: 850px;
        object-fit: cover;
      }
      
      .hero-media {
        position: relative;
        height: 350px;
        width: 350px;
        max-width: 850px;
      }
      .hero-media:not(:only-child) {
        display:none;
      }
      .hero-main {
        display: grid;
        grid-template-rows: repeat(4, 1fr);
        gap: 1rem;
        justify-items: stretch;
        align-items: stretch;
      }
      .heading {
        text-align: center;
        margin-bottom: 0;
        font-size: 40px;
        font-weight: 300;
        margin: auto 0;
      }
      .subheading {
        text-align: center;
        margin-bottom: 0;
        font-size: 20px;
        font-weight: 300;
        margin: auto 0;
      }
      .description {
        text-align: center;
        margin-bottom: 0;
        font-size: 18px;
        margin: auto 0;
      }
      .call-to-action {
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .call-to-action a {
        font-size: 18px;
      }
      .image-container {
        position: absolute;
        inset: 0px;
        width: 100%;
      }
      .image-container .image-icon  {
        width: 100%;
        height: 100%;
      }
      .image-container .image-icon:not(:only-child) {
        display: none;
        pointer-events: none;
        position: absolute;
        width: fit-content;
      }
      
    </style>
  `;

  bm.add(options.name, {
    id: "hero-slider",
    label: "Hero",
    media: /* html */ `
      <svg class="custom-blocks" width="53" height="48" viewBox="0 0 53 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="13" y="7" width="16" height="32" fill="#FFBF00"/>
        <path d="M14.8846 40.9999C14.1003 40.9999 13.4235 40.7152 12.8541 40.1458C12.2847 39.5764 12 38.8996 12 38.1153V9.88465C12 9.10035 12.2847 8.4235 12.8541 7.8541C13.4235 7.2847 14.1003 7 14.8846 7H43.1153C43.8996 7 44.5764 7.2847 45.1458 7.8541C45.7152 8.4235 45.9999 9.10035 45.9999 9.88465V38.1153C45.9999 38.8996 45.7152 39.5764 45.1458 40.1458C44.5764 40.7152 43.8996 40.9999 43.1153 40.9999H14.8846ZM14.8846 38.7307H43.1153C43.2691 38.7307 43.4102 38.6666 43.5384 38.5384C43.6666 38.4102 43.7307 38.2691 43.7307 38.1153V9.88465C43.7307 9.73078 43.6666 9.58973 43.5384 9.4615C43.4102 9.3333 43.2691 9.2692 43.1153 9.2692H14.8846C14.7308 9.2692 14.5897 9.3333 14.4615 9.4615C14.3333 9.58973 14.2692 9.73078 14.2692 9.88465V38.1153C14.2692 38.2691 14.3333 38.4102 14.4615 38.5384C14.5897 38.6666 14.7308 38.7307 14.8846 38.7307ZM18.3578 33.6115H39.846L33.3615 24.9846L27.3192 32.6884L23.2077 27.3193L18.3578 33.6115Z" fill="#5C5C5C"/>
      </svg>
    `,
    content: /* html */ ` 
      <div class="slick-slider-hero" id="slick-slider-hero">
        <div class="slick-slide" id="slick-slide00">
          <div class="hero-template">
            <div class="content-left container">
              <div class="hero-media" data-gjs-resizable="false" data-gjs-draggable="false" data-gjs-selectable="false">
                <div id="image-video-empty-state" class="image-video-empty-state" data-gjs-resizable="false" data-gjs-draggable="false" data-gjs-selectable="false" class="image-container">
                  ${AddMediaSvg}
                </div>
              </div>
            </div>
            <div class="hero-main container">
              <h2 class="display-3 fw-semibold heading container">Heading</h2>
              <h4 class="display-5 fw-semibold subheading container">Subheading</h4>
              <p class="lead description container">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut.</p>
              <div class="call-to-action container">
                <a href="#" class="btn btn-primary btn-lg px-4">Hover me</a>
              </div>
            </div>
            <div class="content-right container">
              <div class="hero-media" data-gjs-resizable="false" data-gjs-draggable="false" data-gjs-selectable="false" >
                <div class="image-container" data-gjs-resizable="false" data-gjs-draggable="false" data-gjs-selectable="false" >
                  ${AddMediaSvg}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="slick-slide" id="slick-slide01">
          <div class="hero-template">
            <div class="content-left container">
              <div class="hero-media" data-gjs-resizable="false" data-gjs-draggable="false" data-gjs-selectable="false">
                <div class="image-container" data-gjs-resizable="false" data-gjs-draggable="false" data-gjs-selectable="false">
                  ${AddMediaSvg}
                </div>
              </div>
            </div>
            <div class="hero-main container">
              <h2 class="display-3 fw-semibold heading container">Heading</h2>
              <h4 class="display-5 fw-semibold subheading container">Subheading</h4>
              <p class="lead description container">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut.</p>
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
        <div class="slick-slide" id="slick-slide02">
          <div class="hero-template">
            <div class="content-left container">
              <div class="hero-media" data-gjs-resizable="false" data-gjs-draggable="false" data-gjs-selectable="false">
                <div class="image-container" data-gjs-resizable="false" data-gjs-draggable="false" data-gjs-selectable="false">
                   ${AddMediaSvg}
                </div>
              </div>
            </div>
            <div class="hero-main container">
              <h2 class="display-3 fw-semibold heading container">Heading</h2>
              <h4 class="display-5 fw-semibold subheading container">Subheading</h4>
              <p class="lead description container">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut.</p>
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
      ${style}
    `,
    category: "Elements",
  });
};
