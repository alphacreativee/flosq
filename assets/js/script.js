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
  if ($(".loading").length < 1) return;
  gsap.registerPlugin(ScrollTrigger);

  const tl = gsap.timeline({ defaults: { ease: "none" } });
  gsap.to(".dots", {
    x: (index, target) => {
      const logo = document.querySelector(".loading-overlay");
      const logoRect = logo.getBoundingClientRect();
      const dotRect = target.getBoundingClientRect();

      // Lấy giá trị transform của logo
      const logoTransform = getComputedStyle(logo).transform;
      console.log(logoTransform);

      let translateX = 0;

      if (logoTransform !== "none") {
        const matrix = new DOMMatrixReadOnly(logoTransform);
        translateX = matrix.m41; // Lấy giá trị translateX
      }

      return (
        logoRect.left +
        logoRect.width / 2 -
        dotRect.left -
        dotRect.width / 2 -
        translateX
      );
    },
    y: (index, target) => {
      const logo = document.querySelector(".loading-overlay");
      const logoRect = logo.getBoundingClientRect();
      const dotRect = target.getBoundingClientRect();

      return (
        logoRect.top + logoRect.height / 2 - dotRect.top - dotRect.height / 2
      );
    },
    duration: 1,
    ease: "power2.inOut",
    stagger: 0.1,
    onComplete: function () {
      gsap.to(".dots", {
        scale: 1,
        transformOrigin: "center",
      });
    },
  });

  gsap.fromTo(".loading-overlay", { opacity: 0 }, { opacity: 1, duration: 1 });
  gsap.fromTo(
    ".loading-overlay-white",
    { opacity: 0 },
    { opacity: 1, duration: 1 },
    "+=0.2"
  );
  tl.to(".loading-image", { opacity: 1, scale: 1, duration: 1 })
    .to(".loading-overlay", { scale: 200, opacity: 1, duration: 1 }, "+=0.5")
    .to(".loading", { opacity: 0, ease: "expo.inOut", duration: 1 }, "+=0.7");
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

  const items = document.querySelectorAll(".modal, [data-cursor-text]");
  var cursorDot = document.querySelector(".magic-cursor .cursor");
  var cursorText = document.querySelector(".magic-cursor .cursor .text");

  items.forEach((item) => {
    item.addEventListener("mouseenter", () => {
      let text = "";
      if (item.classList.contains("modal")) {
        text = "Đóng";
      } else {
        text = item.getAttribute("data-cursor-text");
      }

      // const text = item.getAttribute("data-cursor-text");
      cursorText.innerHTML = `<span class="b2-regular color-white">${text}</span>`;
      cursorDot.classList.add("show-text");
    });

    item.addEventListener("mouseleave", () => {
      cursorText.innerHTML = "";
      cursorDot.classList.remove("show-text");
    });
  });

  const itemsContent = document.querySelectorAll(".modal-dialog");
  itemsContent.forEach((item) => {
    item.addEventListener("mouseenter", () => {
      console.log("â");
      cursorDot.classList.remove("show-text");
    });
    item.addEventListener("mouseleave", () => {
      cursorText.innerHTML = `<span class="b2-regular color-white">Đóng</span>`;
      cursorDot.classList.add("show-text");
    });
  });
}

function ourProjects() {
  if (
    !$("section.section-projects").length &&
    !$("section.section-members").length
  )
    return;

  const itemProjects = $(
    "section.section-projects .item, section.section-members .item"
  );

  console.log(itemProjects);

  itemProjects.mousemove(function (e) {
    let offset = $(this).offset();
    let x = e.pageX - offset.left;
    let y = e.pageY - offset.top;

    $(this).css("--x", x + "px");
    $(this).css("--y", y + "px");
  });

  if ($("section.section-projects").length) {
    // filter
    gsap.registerPlugin(ScrollTrigger);
    gsap.to(".projects-list", {
      ease: "none",
      scrollTrigger: {
        trigger: ".projects-list",
        // markers: true,
        scrub: 1,
        start: "top bottom",
        end: "bottom bottom",
        onUpdate: function (self) {
          if (
            self.progress >= 0.2 &&
            !document
              .querySelector(".section-projects")
              .classList.contains("on-active")
          ) {
            document
              .querySelector(".section-projects")
              .classList.add("on-active");
          } else if (self.progress <= 0 || self.progress >= 1) {
            document
              .querySelector(".section-projects")
              .classList.remove("on-active");
          }
        },
      },
    });

    // gsap.to(".section-projects", {
    //   ease: "none",
    //   scrollTrigger: {
    //     trigger: ".section-projects",
    //     markers: true,
    //     scrub: 1,
    //     start: "-64px top",
    //     end: "bottom bottom",
    //     onEnter: () => {
    //       document.querySelector(".section-projects").classList.add("touch");
    //     }
    //   }
    // });

    let tl = gsap.timeline({ paused: true });
    tl.from(
      ".projects-filter .menu-item",
      {
        opacity: 0,
        y: 20,
        stagger: 0.1,
        duration: 0.5,
        ease: "none",
      },
      "-=0.3"
    );

    $(".projects-filter .filter-item").on("click", function () {
      let thisFilterProject = $(this);

      // $(".projects-filter .filter-item .sub-menu").removeClass("open");
      thisFilterProject.siblings().find(".sub-menu").removeClass("open");
      thisFilterProject.find(".sub-menu").toggleClass("open");

      let thisListItem = thisFilterProject.find(".menu-item");

      if (thisFilterProject.find(".sub-menu").hasClass("open")) {
        tl.restart();
      } else {
        tl.reverse();
      }
    });

    // filter item on click
    $(".projects-filter .menu-item").on("click", function () {
      let thisItem = $(this);

      let dataFilter = thisItem.data("filter");
      let dataFilterValue = thisItem.data("filter-value");
      let dataFilterText = thisItem.text();

      thisItem.closest(".filter-item").find("span").text(dataFilterText);
      updateLayout(dataFilter, dataFilterValue);
    });

    function updateLayout(dataFilter, dataFilterValue) {
      $(".section-projects .projects-list .item").addClass("opacity");
      $(
        `.section-projects .projects-list .item[data-filter='${dataFilter}'][data-filter-value='${dataFilterValue}']`
      ).removeClass("opacity");

      if (dataFilterValue == "all") {
        $(
          `.section-projects .projects-list .item[data-filter='${dataFilter}']`
        ).removeClass("opacity");
      }
    }
  }
}

function ourMembers() {
  if (!$("section.section-members").length) return;

  let memberItems = $("section.section-members .item .item-wrapper");
  memberItems.on("click", function () {
    let thisItem = $(this);

    // clear class open
    $("section.section-members .item").removeClass("open");
    $("section.section-members ul").removeClass("open");

    // add class open
    thisItem.closest(".item").addClass("open");
    thisItem.closest("ul").addClass("open");
  });

  // close item
  let itemContentShow = $("section.section-members .item-content-show");
  itemContentShow.on("click", function () {
    let thisContentShow = $(this);
    console.log("click");

    thisContentShow.closest(".item.open").removeClass("open");
    thisContentShow.closest("ul.open").removeClass("open");
  });
}

function bannerBall() {
  let yPercent = -115;
  gsap.set(".hero__ball", { yPercent: yPercent });
  let yBasic = $(".hero").hasClass("without-home") ? 0 : 60;
  gsap.to(".hero__ball", {
    yPercent: 40,
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "+=100%",
      scrub: true,
      pin: true,
      // pinSpacing: true,
      // markers: true,

      onUpdate: (self) => {
        if (self.progress > 0.26) {
          $(".hero__content").addClass("change");
          $(".hero__ball").addClass("change");
        } else {
          $(".hero__content").removeClass("change");
          $(".hero__ball").removeClass("change");
        }
      },
    },
  });
}

function counterOnScroll() {
  if ($(".section-services").length < 1) return;

  $(".number").each(function () {
    const $stat = $(this);
    const patt = /(\D+)?(\d+(\.\d+)?)(\D+)?/;
    const time = 0;
    let result = patt.exec($stat.text());
    let fresh = true;
    let ticks;

    if (!result) return;

    result.shift();
    result = result.filter((res) => res != null);

    $stat.empty();

    result.forEach((res) => {
      if (isNaN(res)) {
        $stat.append(`<span>${res}</span>`);
      } else {
        for (let i = 0; i < res.length; i++) {
          $stat.append(`
            <span data-value="${res[i]}">
              <span>&nbsp;</span>
              ${Array(parseInt(res[i]) + 1)
                .join(0)
                .split(0)
                .map((x, j) => `<span>${j}</span>`)
                .join("")}
            </span>
          `);
        }
      }
    });

    ticks = $stat.find("span[data-value]");

    const activate = () => {
      const top = $stat[0].getBoundingClientRect().top;
      const offset = $(window).height() * 0.8;

      setTimeout(() => {
        fresh = false;
      }, time);

      if (top < offset) {
        setTimeout(
          () => {
            ticks.each(function () {
              const dist = parseInt($(this).attr("data-value")) + 1;
              $(this).css("transform", `translateY(-${dist * 100}%)`);
            });
          },
          fresh ? time : 0
        );
        $(window).off("scroll", activate);
      }
    };

    $(window).on("scroll", activate);
    activate();
  });
}

function itemParalax() {
  gsap.registerPlugin(ScrollTrigger);

  gsap.utils.toArray(".js-parallax").forEach((wrap) => {
    const y = wrap.getAttribute("data-y") || 100;

    gsap.fromTo(
      wrap,
      {
        y: y,
      },
      {
        y: 0,
        scrollTrigger: {
          trigger: wrap,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
          ease: "power4",
          delay: 0.2,
          // markers: true
        },
      }
    );
  });
}
function gallery() {
  // gsap.registerPlugin(ScrollTrigger);

  const details = gsap.utils.toArray(".gallery__content:not(:first-child)");
  const photos = gsap.utils.toArray(".gallery__img:not(:first-child)");
  const itemHeight = document.querySelector(".gallery__img").offsetHeight;
  gsap.set(photos, { clipPath: "inset(100% 0% 0% 0%)" });

  const allPhotos = gsap.utils.toArray(".gallery__img");
  ScrollTrigger.create({
    trigger: ".gallery__container ",
    // start: `top bottom-=${itemHeight}`,
    start: "top 10%",
    end: "bottom bottom",
    pin: ".right",
    markers: true,
  });

  details.forEach((detail, index) => {
    let headline = detail.querySelector("h2");
    let animation = gsap
      .timeline()
      .to(photos[index], {
        clipPath: "inset(0% 0% 0% 0%)",
        duration: 2.5,
      })
      .set(allPhotos[index], { autoAlpha: 0 });
    ScrollTrigger.create({
      trigger: headline,
      start: "top 70%",
      end: "top 30%",
      animation: animation,
      scrub: true,
      // markers: true,
      onEnter: () => {
        headline.classList.add("active");
      },
      onLeaveBack: () => {
        headline.classList.remove("active");
      },
    });
  });

  const line = $(".section-line");
  const lineWrapper = $(".gallery__container");

  // Định vị ban đầu của vòng tròn
  gsap.set(line, {
    transformOrigin: "center center",
    xPercent: -50,
    yPercent: -50,
    y: 0,
  });

  // Animation di chuyển vòng tròn khi cuộn
  ScrollTrigger.create({
    trigger: lineWrapper,
    start: "top top",
    end: "bottom top",
    scrub: true,
    // markers: true,
    onUpdate: (self) => {
      let progress = self.progress;
      let moveY = progress * window.innerHeight;

      gsap.to(line, { y: moveY, duration: 0.1, ease: "none" });
    },
  });
}
function scrollBall() {
  gsap.registerPlugin(MotionPathPlugin, ScrollTrigger);
  let tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".section-projects",
      start: "top 10%",
      end: "bottom top",
      scrub: 2,
      // markers: true,
      invalidateOnRefresh: true,
    },
  });
  tl.fromTo(
    ".projects-ball",
    { x: 0, y: 0 },
    {
      ease: "none",
      motionPath: {
        path: [
          { x: "50vw", y: "100vh" },
          { x: "25vw", y: "150vh" },
          { x: "5vw", y: "200vh" },
          { x: "0vw", y: "300vh" },
        ],
      },
    }
  );
  // tl.to(".projects-ball", { top: "30%", left: "60%", ease: "power1.inOut" })
  //   .to(".projects-ball", { top: "50%", left: "30%", ease: "power1.inOut" })
  //   .to(".projects-ball", { top: "70%", left: "10%", ease: "power1.inOut" })
  //   .to(".projects-ball", { top: "90%", left: "20%", ease: "power1.inOut" });
}
function sectionServices() {
  if ($(".services-wrapper__left").length < 1) return;
  gsap.to(".services-wrapper__right", {
    ease: "none",
    scrollTrigger: {
      trigger: ".section-services",
      start: "-64px top",
      end: "bottom bottom",
      scrub: 1,
      pin: ".services-wrapper__left",
      // markers: true
    },
  });

  // Animation di chuyển vòng tròn khi cuộn
  const line = $(".service-ball");
  const lineWrapper = $(".services-wrapper");
  ScrollTrigger.create({
    trigger: lineWrapper,
    start: "top top",
    end: "bottom top",
    scrub: true,
    // markers: true,
    onUpdate: (self) => {
      let progress = self.progress;
      let moveY = progress * window.innerHeight;

      gsap.to(line, { y: moveY, duration: 0.1, ease: "none" });

      if (progress >= 0.93) {
        document
          .querySelector(".section-projects, .section-members")
          .classList.add("touch");
      }
    },
  });
}
function swiperLogo() {
  if ($(".swiper__logo").length < 1) return;
  var swiper = new Swiper(".swiper__logo", {
    slidesPerView: 3,
    loop: true,
    spaceBetween: 30,

    speed: 2000,
    autoplay: {
      delay: 0,
      disableOnInteraction: true,
      pauseOnMouseEnter: true,
    },
    breakpoints: {
      767: {
        slidesPerView: 6,
      },
    },
  });
}
function toggleDropdown() {
  const $dropdowns = jQuery(".dropdown-custom");

  $dropdowns.each(function () {
    const $dropdown = jQuery(this);
    const $btnDropdown = $dropdown.find(".dropdown-custom__btn");
    const $dropdownMenu = $dropdown.find(".dropdown-custom__menu");
    const $dropdownItems = $dropdown.find(".dropdown-custom__item");
    const $textDropdown = $dropdown.find(".dropdown-custom__text");

    $btnDropdown.on("click", function (e) {
      e.stopPropagation();
      closeAllDropdowns($dropdown);
      $dropdownMenu.toggleClass("dropdown--active");
      // jQuery(".language__head").toggleClass("--active");
      // jQuery(".destination-head").toggleClass("--active");

      const clickYPosition = e.clientY;
      const viewportHeight = jQuery(window).height();

      if (clickYPosition > viewportHeight / 2) {
        $dropdownMenu.removeClass("dropdown-up");
      } else {
        $dropdownMenu.addClass("dropdown-up");
      }
    });

    jQuery(document).on("click", function () {
      closeAllDropdowns();
      // jQuery(".language__head").removeClass("--active");
      // jQuery(".destination-head").removeClass("--active");
    });

    $dropdownItems.on("click", function (e) {
      e.stopPropagation();
      const $item = jQuery(this);
      const tmp = $textDropdown.text();
      $textDropdown.text($item.text());
      if ($item.hasClass("language__item")) {
        $item.text(tmp);
      }
      closeAllDropdowns();
    });

    function closeAllDropdowns(exception) {
      $dropdowns.each(function () {
        const $menu = jQuery(this).find(".dropdown-custom__menu");
        if (!exception || !jQuery(this).is(exception)) {
          $menu.removeClass("dropdown--active");
          // jQuery(".language__head").removeClass("--active");
          // jQuery(".destination-head").removeClass("--active");
        }
      });
    }
  });
}
const init = () => {
  bannerBall();
  toggleDropdown();
  scrollBall();
  swiperLogo();
  handlePageVisibilityAndFavicon();
  toggleMenu();
  scrollHeader();
  gallery();
  magicCursor();
  counterOnScroll();
  setTimeout(() => {
    loading();
    textQuote();
    ourProjects();
    ourMembers();
    sectionServices();
    itemParalax();
  }, 1000);
};
preloadImages("img").then(() => {
  // Once images are preloaded, remove the 'loading' indicator/class from the body

  init();
});
$(window).on("beforeunload", function () {
  $(window).scrollTop(0);
});
