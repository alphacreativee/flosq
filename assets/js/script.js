import { preloadImages } from "../libs/utils.js";
let lenis;
Splitting();
("use strict");
$ = jQuery;

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
      // console.log(logoTransform);

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
function fadeText() {
  gsap.set("[data-fade-in]", {
    opacity: 0,
    y: 20,
  });

  let tl = gsap.timeline({
    paused: true,
  });

  tl.fromTo(
    "[data-fade-in]",
    {
      opacity: 0,
      y: 20,
    },
    {
      opacity: 1,
      y: 0,
      stagger: 0.1,
      duration: 0.6,
      ease: "power2.out",
    }
  );

  ScrollTrigger.create({
    trigger: "footer",
    start: "top 80%",
    // markers: true,
    animation: tl,
    toggleActions: "play none none none",
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
    "section.section-projects .item, section.section-members .item, .services-wrapper__right .item-image"
  );

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
          } else if (self.progress < 0.2 || self.progress >= 1) {
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
    tl.from(".projects-filter .menu-item", {
      opacity: 0,
      y: 20,
      stagger: 0.1,
      duration: 0.5,
      ease: "none",
    });

    $(".projects-filter .filter-item").on("click", function () {
      let thisFilterProject = $(this);
      let thisListItem = thisFilterProject.find(".menu-item");

      thisFilterProject.siblings().find(".sub-menu").removeClass("open");
      thisFilterProject.find(".sub-menu").toggleClass("open");

      let tl = gsap.timeline({ paused: true });
      tl.fromTo(
        thisListItem,
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.5,
          ease: "none",
        }
      );

      if (thisFilterProject.find(".sub-menu").hasClass("open")) {
        tl.restart();
      } else {
        tl.reverse();
      }
    });

    // filter item on click
    $(".projects-filter .menu-item").on("click", function () {
      let thisItem = $(this);

      // Add 'active' class to the selected menu item and remove it from siblings
      thisItem.addClass("active");
      thisItem.siblings().removeClass("active");

      // Get the filter data
      let dataFilter = thisItem.data("filter");
      let dataFilterValue = thisItem.data("filter-value");
      let dataFilterText = thisItem.text();

      // console.log(dataFilter + " " + dataFilterValue);

      // Update the filter label text
      thisItem.closest(".filter-item").find("span").text(dataFilterText);

      // Call the updateLayout function to filter and reorder the projects
      updateLayout();
    });

    function updateLayout() {
      // Set default filter values
      let dataFilterProject = "all";
      let dataFilterType = "all";
      let dataFilterStatus = "all";

      // Get the selected filter values from the filter items
      let filterProject = $(
        ".projects-filter .filter-item[filter-type='project'] .menu-item.active"
      );
      dataFilterProject = filterProject.data("filter-value");

      let filterType = $(
        ".projects-filter .filter-item[filter-type='type'] .menu-item.active"
      );
      dataFilterType = filterType.data("filter-value");

      let filterStatus = $(
        ".projects-filter .filter-item[filter-type='status'] .menu-item.active"
      );
      dataFilterStatus = filterStatus.data("filter-value");

      // Filter each column independently (left and right)
      filterColumn(
        ".projects-list__left",
        dataFilterProject,
        dataFilterType,
        dataFilterStatus
      );
      filterColumn(
        ".projects-list__right",
        dataFilterProject,
        dataFilterType,
        dataFilterStatus
      );
    }

    // Function to filter and reorder items in each column
    function filterColumn(
      columnClass,
      dataFilterProject,
      dataFilterType,
      dataFilterStatus
    ) {
      let filterString = "";

      // Build the filter string based on selected filters
      if (dataFilterProject !== "all") {
        filterString += `project=${dataFilterProject},`;
      }
      if (dataFilterType !== "all") {
        filterString += `type=${dataFilterType},`;
      }
      if (dataFilterStatus !== "all") {
        filterString += `status=${dataFilterStatus},`;
      }

      // Remove the trailing comma
      filterString = filterString.slice(0, -1);

      // Filter items in the current column (ul)
      let columnItems = $(`${columnClass} .item`);

      // Hide all items by default
      columnItems.addClass("opacity");

      // Show the items that match the constructed filter string
      columnItems.each(function () {
        let item = $(this);
        let itemDataFilter = item.data("filter");

        // If the item matches the filter, remove the "opacity" class to display it
        if (itemDataFilter.includes(filterString)) {
          item.removeClass("opacity");
        }
      });

      // If "all" filters are selected, show all items
      if (
        dataFilterProject === "all" &&
        dataFilterType === "all" &&
        dataFilterStatus === "all"
      ) {
        columnItems.removeClass("opacity");
      }

      // After filtering, reorder items in the column: move active filter items to the top
      reorderItemsInColumn(columnClass);

      applyGSAPAnimation(columnClass);
    }

    // Function to reorder items in a column based on the active filter
    function reorderItemsInColumn(columnClass) {
      let items = $(`${columnClass} .item`);

      // Separate active and non-active items
      let activeItems = [];
      let inactiveItems = [];

      items.each(function () {
        let item = $(this);
        // Check if the item is visible (i.e., matches the filter)
        if (!item.hasClass("opacity")) {
          activeItems.push(item); // Item that matches the filters
        } else {
          inactiveItems.push(item); // Item that doesn't match the filters
        }
      });

      $(columnClass).empty().append(activeItems).append(inactiveItems);
    }

    function applyGSAPAnimation(columnClass) {
      // GSAP animation for opacity and translateY effect
      gsap.fromTo(
        `${columnClass} .item`,
        {
          opacity: 0,
          y: 30, // Starting position: 30px below the final position
        },
        {
          opacity: 1, // End with opacity: 1 (fully visible)
          y: 0, // End with transform: none (reset the translation)
          stagger: 0.2, // Delay for each item to appear one after another
          duration: 0.8, // Duration of the animation
          ease: "power2.out", // Smooth ease out effect
        }
      );
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

    thisContentShow.closest(".item.open").removeClass("open");
    thisContentShow.closest("ul.open").removeClass("open");
  });
}

function bannerBall() {
  let yPercent = -90;
  gsap.set(".hero__ball", { yPercent: yPercent });

  // gsap.fromTo(
  //   ".hero__ball",
  //   { yPercent: -130 }, // Start from 150%
  //   {
  //     yPercent: -100, // Animate to 115%
  //     duration: 0.6, // Duration of the animation
  //     ease: "power2.out", // Optional easing
  //     onComplete: () => {
  //       // Remove overflow-hidden class from the body when animation completes
  //       // document.body.classList.remove("overflow-hidden");
  //     },
  //   }
  // );

  let yBasic = $(".hero").hasClass("without-home") ? 0 : 60;
  gsap.to(".hero__ball", {
    yPercent: 40,
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "bottom top",
      scrub: true,
      pin: true,
      // pinSpacing: true,
      // markers: true,

      onUpdate: (self) => {
        if (self.progress > 0.5) {
          $(".hero__content").addClass("change");
        } else {
          $(".hero__content").removeClass("change");
        }
        if (self.progress > 0.2) {
          $(".hero__ball").addClass("change");
        } else {
          $(".hero__ball").removeClass("change");
        }
        // ScrollTrigger.refresh();
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
  if (window.innerWidth < 768) return;
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
  if (!$("section.gallery").length) return;

  const details = gsap.utils.toArray(".gallery__content:not(:first-child)");
  const photos = gsap.utils.toArray(".gallery__img:not(:first-child)");
  const itemHeight = document.querySelector(".gallery__img").offsetHeight;
  gsap.set(photos, { clipPath: "inset(100% 0% 0% 0%)" });

  const allPhotos = gsap.utils.toArray(".gallery__img");
  let pin = window.innerWidth < 768 ? ".right-mobile" : ".right-desktop";
  ScrollTrigger.create({
    trigger: ".gallery__container ",
    // start: `top bottom-=${itemHeight}`,
    start: "top 10%",
    end: "bottom bottom",
    pin: pin,
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

      if (progress >= 0.88) {
        document.querySelector(".section-services").classList.add("touch");
        document.querySelector("section.gallery").classList.remove("touch");
      } else if (progress < 0.88) {
        document.querySelector(".section-services").classList.remove("touch");
        document.querySelector("section.gallery").classList.add("touch");
      }
    },
    onComplete: () => {
      gsap.to(line, { scale: 0, ease: "none" });
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
  let pin =
    window.innerWidth < 767 ? ".section-services" : ".services-wrapper__left";
  gsap.to(".services-wrapper__right", {
    ease: "none",
    scrollTrigger: {
      trigger: ".section-services",
      start: "-46px top",
      // start: "top top",
      end: "bottom bottom",
      scrub: 1,
      pin: pin,
    },
  });

  const line =
    window.innerWidth < 767 ? $(".service-ball-mobile") : $(".service-ball");
  //

  const lineWrapper = $(".services-wrapper");
  ScrollTrigger.create({
    trigger: lineWrapper,
    start: "top 65%",
    end: "bottom 60%",
    scrub: true,
    // markers: true,
    // markers: true,
    onUpdate: (self) => {
      let progress = self.progress;
      let windowHeight =
        window.innerWidth < 767 && document.querySelector(".section-services")
          ? document.querySelector(".section-services").offsetHeight
          : window.innerHeight;
      let moveY = progress * windowHeight;
      console.log(windowHeight);

      gsap.to(line, { y: moveY, duration: 0.1, ease: "none" });

      if (progress >= 0.95) {
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
function blob() {
  if (!$(".projects-ball").length) return;

  gsap.registerPlugin(ScrollTrigger);

  const canvas = document.getElementById("canvas");
  const dpr = window.devicePixelRatio || 1;
  canvas.width = canvas.offsetWidth * dpr;
  canvas.height = canvas.offsetHeight * dpr;
  const ctx = canvas.getContext("2d");
  ctx.scale(dpr, dpr);
  const w = canvas.width / dpr;
  const h = canvas.height / dpr;

  class Blob {
    constructor(radius, pointsCount, color) {
      this.radius = radius;
      this.pointsCount = pointsCount;
      this.color = color;
      this.points = [];
      this.mouse = { x: w / 2, y: h / 2 };
      this.targetMouse = { x: w / 2, y: h / 2 };
      this.ease = 0.05;
      this.scrollOffset = 0;
      this.time = 0;
      this.initPoints();
      this.addListeners();
      this.addScrollEffect();
    }

    initPoints() {
      const angleStep = (Math.PI * 2) / this.pointsCount;
      for (let i = 0; i < this.pointsCount; i++) {
        const angle = i * angleStep;
        this.points.push({
          x: w / 2 + Math.cos(angle) * this.radius,
          y: h / 2 + Math.sin(angle) * this.radius,
          baseX: Math.cos(angle) * this.radius,
          baseY: Math.sin(angle) * this.radius,
          offsetX: 0,
          offsetY: 0,
          velocityX: 0,
          velocityY: 0,
          angle: angle,
        });
      }
    }

    addListeners() {
      canvas.addEventListener("mousemove", (e) => {
        const rect = canvas.getBoundingClientRect();
        this.targetMouse.x = e.clientX - rect.left;
        this.targetMouse.y = e.clientY - rect.top;
      });
    }

    addScrollEffect() {
      gsap.to(this, {
        scrollTrigger: {
          trigger: "body",
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
          onUpdate: (self) => {
            const progress = self.progress;
            this.scrollOffset = Math.sin(progress * Math.PI * 4) * 10; // Giảm từ 25 xuống 10
          },
        },
      });
    }

    update() {
      this.mouse.x += (this.targetMouse.x - this.mouse.x) * this.ease;
      this.mouse.y += (this.targetMouse.y - this.mouse.y) * this.ease;
      this.time += 0.05;

      this.points.forEach((point) => {
        const dx = this.mouse.x - point.x;
        const dy = this.mouse.y - point.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = 150;

        if (dist < maxDist) {
          const force = ((maxDist - dist) / maxDist) * 7;
          const angleToMouse = Math.atan2(dy, dx);
          point.velocityX += Math.cos(angleToMouse) * force * 0.03;
          point.velocityY += Math.sin(angleToMouse) * force * 0.03;
        }

        const oscillation = Math.sin(this.time + point.angle) * 2; // Giảm từ 5 xuống 2
        point.velocityX += Math.cos(point.angle) * oscillation * 0.01;
        point.velocityY += Math.sin(point.angle) * oscillation * 0.01;

        const currentRadius = Math.sqrt(
          point.offsetX * point.offsetX + point.offsetY * point.offsetY
        );
        const targetRadius = this.radius;
        const radiusDiff = targetRadius - currentRadius;
        const spring = 0.05;
        point.velocityX += Math.cos(point.angle) * radiusDiff * spring;
        point.velocityY += Math.sin(point.angle) * radiusDiff * spring;

        point.velocityX *= 0.9;
        point.velocityY *= 0.9;
        point.offsetX += point.velocityX;
        point.offsetY += point.velocityY;
        point.offsetX *= 0.95;
        point.offsetY *= 0.95;

        point.x = w / 2 + point.baseX + point.offsetX + this.scrollOffset;
        point.y = h / 2 + point.baseY + point.offsetY;

        if (Math.random() > 0.98) {
          point.velocityX += (Math.random() - 0.5) * 0.1;
          point.velocityY += (Math.random() - 0.5) * 0.1;
        }
      });
    }

    draw() {
      ctx.clearRect(0, 0, w, h);
      ctx.beginPath();
      ctx.fillStyle = this.color;

      const points = this.points;
      ctx.moveTo(points[0].x, points[0].y);

      for (let i = 0; i < this.pointsCount; i++) {
        const curr = points[i];
        const next = points[(i + 1) % this.pointsCount];
        const prev = points[i === 0 ? this.pointsCount - 1 : i - 1];

        const cp1x = curr.x + (curr.x - prev.x) * 0.25;
        const cp1y = curr.y + (curr.y - prev.y) * 0.25;
        const cp2x = next.x - (next.x - curr.x) * 0.25;
        const cp2y = next.y - (next.y - curr.y) * 0.25;

        ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, next.x, next.y);
      }

      ctx.closePath();
      ctx.fill();
    }

    animate() {
      this.update();
      this.draw();
      requestAnimationFrame(() => this.animate());
    }
  }

  const blob = new Blob(90, 180, "#e82c2a"); // Tăng pointsCount lên 180
  blob.animate();
}

function contactForm() {
  if (!$(".contact-form").length) return;

  const contactForm = $(".contact-form");
  contactForm.on("submit", function (e) {
    e.preventDefault();

    const nameField = contactForm.find("input[name='name']");
    const emailField = contactForm.find("input[name='email']");
    const phoneField = contactForm.find("input[type='tel']");
    const companyField = contactForm.find("input[type='company']");
    const messageField = $("#contact-form textarea[name='message']");

    contactForm.find(".error-message").remove();
    contactForm.find("input, textarea").removeClass("error");

    let isValid = true;

    if (!nameField.val().trim()) {
      nameField.addClass("error");
      isValid = false;
    }

    if (!emailField.val().trim()) {
      emailField.addClass("error");
      isValid = false;
    }

    if (!phoneField.val().trim()) {
      phoneField.addClass("error");
      isValid = false;
    }

    if (!isValid) {
      return;
    }

    $.ajax({
      type: "POST",
      url: ajaxUrl,
      data: {
        action: "submit_contact_form",
        name: nameField.val().trim(),
        email: emailField.val().trim(),
        phone: phoneField.val().trim(),
        company: companyField.val().trim(),
        messageNote: messageField.val().trim(),
      },
      beforeSend: function () {
        console.log("Đang gửi dữ liệu...");
        $(".contact-message").remove();
      },
      success: function (res) {
        console.log("Phản hồi từ server:", res);

        let message = "";
        if (res.success === true) {
          message =
            '<span class="contact-message" style="color: green;">' +
            res.data +
            "</span>";
          contactForm.append(message);
          contactForm[0].reset();

          setTimeout(function () {
            $(".contact-message").fadeOut("slow", function () {
              $(this).remove();
            });
          }, 5000);
        } else {
          message = `<span class="contact-message" style="color: red;">${
            res.data || "Có lỗi xảy ra, vui lòng thử lại."
          }</span>`;
          contactForm.append(message);
        }
      },
      error: function (xhr, status, error) {
        console.error("Lỗi khi gửi form:", error);
        $(".contact-message").remove();
        contactForm.append(
          '<span class="contact-message" style="color: red;">Có lỗi xảy ra, vui lòng thử lại sau.</span>'
        );
      },
    });
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
  blob();
  fadeText();
  contactForm();
  setTimeout(() => {
    ourProjects();
    loading();
    textQuote();
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
