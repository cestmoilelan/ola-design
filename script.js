// Fade in/out images that are scrolled in/out of view

const figure1 = document.querySelector(".figure1");
const figure2 = document.querySelector(".figure2");
const figure3 = document.querySelector(".figure3");

const windowHeight = document.documentElement.clientHeight;
const windowWidth = document.documentElement.clientWidth;

const fadeInOut = function(elem) {
  const bounding = elem.getBoundingClientRect();
  const displayHeight = bounding.bottom - bounding.top;

  if (bounding.top < 0) {
    var insideHeight = Math.max(0, Math.min(bounding.bottom, windowHeight));
  } else {
    var insideHeight = Math.max(
      0,
      Math.min(bounding.bottom, windowHeight) - bounding.top
    );
  }

  const ratioInside = insideHeight / displayHeight;
  const upperThresh = 0.85;
  const lowerThresh = 0.15;
  if (ratioInside > upperThresh) {
    var opacity = 1;
  } else if (ratioInside < lowerThresh) {
    var opacity = 0;
  } else {
    var opacity = (ratioInside - lowerThresh) / (upperThresh - lowerThresh);
  }

  figureContent = elem.querySelector(".figure-content");
  figureContent.style.opacity = opacity;
};

window.addEventListener("scroll", fadeInOut.bind(null, figure1));
window.addEventListener("scroll", fadeInOut.bind(null, figure2));
window.addEventListener("scroll", fadeInOut.bind(null, figure3));

// Change image offset according to window aspect ratio
if (document.documentElement.clientWidth >= 641) {
  const figureContent1 = document.querySelector(".figure-content1");
  const figureContent2 = document.querySelector(".figure-content2");
  const figureContent3 = document.querySelector(".figure-content3");

  const offset = ((-0.6 * windowHeight) / windowWidth) * windowHeight;
  console.log(offset);

  figureContent1.style.backgroundPosition = `left ${offset}px top 0`;
  figureContent3.style.backgroundPosition = `left ${offset}px top 0`;
}

// Give functionality to scroll-down arrow

const downButtonsDown = document.querySelectorAll(".btn-black-down, .btn-white-down");


downButtonsDown.forEach(downButton => {
  downButton.addEventListener("click", () => {
    window.scrollBy(0, windowHeight);
    downButton.style.outline = "none";
  });
});

// Force snapping to next section

window.addEventListener("wheel", slideUpDown, {passive: false});

function slideUpDown(event) {
  event.preventDefault();
  const toDown = -1+2*(event.deltaY>0);
  window.scrollBy(0, toDown*windowHeight);
}


let startY = 0;
window.addEventListener("touchstart", registerYtouch, {cancelable: true, passive: false});
window.addEventListener("touchend", slideTouch, {cancelable: true});

function registerYtouch(event) {
  startY = event.touches[0].clientY;
}
function slideTouch(event) {
  const endY = event.changedTouches[0].clientY;
  const deltaY = endY - startY;
  if(deltaY<-5){
    window.scrollBy(0, windowHeight);
  } else if(deltaY>5) {
    window.scrollBy(0, -windowHeight);
  }
}