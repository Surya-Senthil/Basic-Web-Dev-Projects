const $container = $(".container");
const $pics = $container.find(".pics");
const $pic = $pics.find(".pic");
let count = 1;

let interval;

function slide() {
  interval = setInterval(function () {
    $pics.animate({ "margin-left": "-=" + 720 }, 1000, function () {
      count++;
      if (count == $pic.length) {
        count = 1;
        $pics.css("margin-left", 0);
      }
    });
  }, 3000);
}

function pause() {
  clearInterval(interval);
}

$container.on("mouseenter", pause).on("mouseleave", slide);
slide();
