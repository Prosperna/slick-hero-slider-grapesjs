
# slick-hero-slider-grapesjs
A hero slider using Slick which you can add as a plugin in your Grapesjs page builder app.

To add this to you Grapesjs page builder app, install the package using the command:

    npm install slick-hero-slider-grapesjs
or 

    yarn install slick-hero-slider-grapesjs

Go to where you initialized your Grapesjs editor and add the following:

```javascript
import heroSlider from "slick-hero-slider-grapesjs";

const editor = grapesjs.init({

  /** other configs here */

  plugins: [heroSlider],

  pluginsOpts: {
    heroSlider: {},
  },

 /** other configs here*/

  // add jquery and slick scripts and styles CDNs here
  // this is necessary to run the needed styles and logic for the slick slider
  // you can refer to their original docs here: https://kenwheeler.github.io/slick/
  // add bootstrap as well since some custom styles are using bootstrap
  canvas: {
    styles: [
      "https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css",
      "https://fonts.googleapis.com/css2?family=Roboto&display=swap",
      "https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.css",
    ],
    scripts: [
      "http://code.jquery.com/jquery-1.11.0.min.js",
      "http://code.jquery.com/jquery-migrate-1.2.1.min.js",
      "https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js",
    ],
  },
});
``` 
    


		
