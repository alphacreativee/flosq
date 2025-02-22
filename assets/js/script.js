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
      "./assets/images/utilize/favicon_red.svg",
      "./assets/images/utilize/favicon_black.svg"
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
function toggleMenu() {
  let btnOpen = $(".btnOpen");
  let btnClose = $(".btnClose");

  let tl = gsap.timeline({ paused: true });

  tl.from(".menu__sub ul li", {
    opacity: 0,
    y: 20,
    stagger: 0.1,
    duration: 0.6,
    ease: "power2.out"
  }).from(
    ".menu__social ul li",
    {
      opacity: 0,
      y: 20,
      stagger: 0.1,
      duration: 0.6,
      ease: "power2.out"
    },
    "-=0.4"
  );

  btnOpen.on("click", function () {
    $(".header__menu--sub").addClass("show");
    tl.restart();
  });

  btnClose.on("click", function () {
    $(".header__menu--sub").removeClass("show");
    tl.reverse();
  });
}
function scrollHeader() {
  gsap.to(".header", {
    scrollTrigger: {
      trigger: "body",
      start: "top+=100 top",
      toggleClass: { targets: ".header", className: "scrolled" }, //
      once: false
    }
  });
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
function magicCursor() {
  var circle = document.querySelector(".magic-cursor");

  gsap.set(circle, {
    xPercent: -50,
    yPercent: -50
  });

  let mouseX = 0,
    mouseY = 0;
  let posX = 0,
    posY = 0;
  let speed = 0.1; // Điều chỉnh độ mượt (0.1 - 0.3)

  window.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function moveCircle() {
    posX += (mouseX - posX) * speed;
    posY += (mouseY - posY) * speed;

    gsap.to(circle, {
      x: posX,
      y: posY,
      ease: "power3.out",
      duration: 0.3
    });

    requestAnimationFrame(moveCircle);
  }

  moveCircle();
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
  toggleMenu();
  scrollHeader();
  magicCursor();
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
