import { preloadImages } from "../libs/utils.js";
let lenis;
Splitting();
function handlePageVisibilityAndFavicon() {
  const originalTitle = document.title;
  let faviconInterval;

  // Xử lý thay đổi tiêu đề khi tab/cửa sổ thay đổi trạng thái hiển thị
  $(document).on("visibilitychange", function () {
    if (document.hidden) {
      document.title = "Flos.Q !";
    } else {
      document.title = originalTitle;
    }
  });

  function changeFavicon(src) {
    let link = document.querySelector("link[rel~='icon']");
    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      link.type = "image/svg+xml"; // Thêm MIME type cho SVG
      document.head.appendChild(link);
    }
    link.href = `${src}?v=${new Date().getTime()}`; // Thêm timestamp để tránh cache
  }

  $(window).focus(function () {
    clearInterval(faviconInterval);
    const hostname = window.location.origin;
    changeFavicon("./assets/images/utilize/favicon_red.svg");
  });

  $(window).blur(function () {
    const hostname = window.location.origin;

    const favicons = [
      `${hostname}/flosq/assets/images/utilize/favicon_red.svg`,
      `${hostname}/flosq/assets/images/utilize/favicon_black.svg`
    ];
    let faviconIndex = 0;
    faviconInterval = setInterval(function () {
      changeFavicon(favicons[faviconIndex]);
      faviconIndex = (faviconIndex + 1) % favicons.length; //
    }, 200);
  });
}

function loading() {
  gsap.registerPlugin(ScrollTrigger);

  const tl = gsap.timeline({ defaults: { ease: "none" } });

  gsap.fromTo(
    ".loading-overlay",
    { opacity: 0 },
    { opacity: 1, duration: 1, ease: "none" }
  );

  // Animation
  tl.to(".loading-image", { opacity: 1, scale: 1, duration: 1 }).to(
    ".loading-overlay",
    { scale: 200, duration: 1, opacity: 1 },
    "+=0.25"
  );
}

function textQuote() {
  gsap.config({ trialWarn: false });
  console.clear();
  gsap.registerPlugin(ScrollTrigger, SplitType);

  const split = new SplitType(".quote-wrapper .text span", { type: "chars" });

  split.lines.forEach((target) => {
    gsap.to(target, {
      backgroundPositionX: 0,
      ease: "none",
      scrollTrigger: {
        trigger: target,
        markers: false,
        scrub: 1,
        start: "top center",
        end: "bottom center"
      }
    });
  });
}

function ourProjects() {
  if (!$("section.section-projects").length) return;

  const itemProjects = $("section.section-projects .item");

  itemProjects.mousemove(function (e) {
    let offset = $(this).offset();
    let x = e.pageX - offset.left;
    let y = e.pageY - offset.top;

    $(this).css("--x", x + "px");
    $(this).css("--y", y + "px");
  });
}

const init = () => {
  handlePageVisibilityAndFavicon();
  setTimeout(() => {
    loading();
    textQuote();
    ourProjects();
  }, 1000);
};
preloadImages("img").then(() => {
  // Once images are preloaded, remove the 'loading' indicator/class from the body

  init();
});
$(window).on("beforeunload", function () {
  $(window).scrollTop(0);
});
