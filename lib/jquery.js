// Anonymous "self-invoking" function
export default function loadJquery() {
  var startingTime = new Date().getTime();
  // Load the script
  var script = document.createElement("script");
  script.src = "https://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js";
  script.type = "text/javascript";
  document.getElementsByTagName("head")[0].appendChild(script);

  // Poll for jQuery to come into existance
  var checkReady = function (callback) {
    if (window.jQuery) {
      callback(jQuery);
    } else {
      window.setTimeout(function () {
        checkReady(callback);
      }, 20);
    }
  };

  // Start polling...
  checkReady(function ($) {
    $(function () {
      var endingTime = new Date().getTime();
      var tookTime = endingTime - startingTime;
      console.log("jQuery is loaded, after " + tookTime + " milliseconds!");
    });
  });
}
