import { preloadImages } from "../libs/utils.js";
let lenis;
Splitting();
function handlePageVisibilityAndFavicon() {
  const originalTitle = document.title;
  let faviconInterval;
  let isBlinking = false; // Tránh chạy nhiều interval cùng lúc

  // Xử lý thay đổi tiêu đề khi tab/cửa sổ thay đổi trạng thái hiển thị
  document.addEventListener("visibilitychange", function () {
    if (document.hidden) {
      document.title = "Flos.Q !";
      startFaviconBlinking();
    } else {
      document.title = originalTitle;
      stopFaviconBlinking();
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
    link.href = `${src}?v=${new Date().getTime()}`;
  }

  function startFaviconBlinking() {
    if (isBlinking) return; // Tránh chạy nhiều interval

    isBlinking = true;
    const favicons = [
      "./assets/images/utilize/favicon_red.svg",
      "./assets/images/utilize/favicon_black.svg",
    ];
    let faviconIndex = 0;

    faviconInterval = setInterval(() => {
      changeFavicon(favicons[faviconIndex]);
      faviconIndex = (faviconIndex + 1) % favicons.length;
    }, 100);
  }

  function stopFaviconBlinking() {
    clearInterval(faviconInterval);
    isBlinking = false;
    changeFavicon("./assets/images/utilize/favicon_red.svg");
  }
}

function loading() {
  gsap.registerPlugin(ScrollTrigger);

  const tl = gsap.timeline({ defaults: { ease: "none" } });

  gsap.fromTo(".loading-overlay", { opacity: 0 }, { opacity: 1, duration: 1 });

  tl.to(".loading-image", { opacity: 1, scale: 1, duration: 1 })
    .to(".loading-overlay", { scale: 200, opacity: 1, duration: 1 }, "+=0.25")
    .to(".loading", { opacity: 0, ease: "expo.inOut", duration: 1 }, "+=0.4");
  // scaleY: 0, transformOrigin: "top", ease: "expo.inOut", duration: 1
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
    ease: "power2.out",
  }).from(
    ".menu__social ul li",
    {
      opacity: 0,
      y: 20,
      stagger: 0.1,
      duration: 0.6,
      ease: "power2.out",
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
      once: false,
    },
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
        end: "bottom center",
      },
    });
  });
}
function magicCursor() {
  var circle = document.querySelector(".magic-cursor");

  gsap.set(circle, {
    xPercent: -50,
    yPercent: -50,
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
      duration: 0.3,
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
function bannerBall() {
  gsap.registerPlugin(ScrollTrigger);
  let yPercent = -135;
  gsap.set(".hero__ball", { yPercent: yPercent });

  gsap.to(".hero__ball", {
    yPercent: 60,
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "+=100%",
      scrub: true,
      pin: true,
      pinSpacing: true,
      // markers: true,

      onUpdate: (self) => {
        console.log(self.progress);

        if (self.progress > 0.25) {
          $(".hero__content").addClass("change");
        } else {
          $(".hero__content").removeClass("change");
        }
      },
    },
  });
}
const init = () => {
  bannerBall();
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
