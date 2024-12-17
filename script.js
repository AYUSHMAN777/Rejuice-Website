gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});

// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();


function cursorEffect() {
  var page1 = document.querySelector("#page1")
  var cursor = document.querySelector("#cursor")


  page1.addEventListener("mousemove", function (dets) {
    gsap.to(cursor, {
      x: dets.x,
      y: dets.y
    })
  })
  page1.addEventListener("mouseleave", function () {
    gsap.to(cursor, {
      scale: 0,
      opacity: 0
    })
  })
  page1.addEventListener("mouseenter", function () {
    gsap.to(cursor, {
      scale: 1,
      opacity: 1
    })
  })


}
cursorEffect();


function sliderAnimation() {
  var swiper = new Swiper(".mySwiper", {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    autoplay: {
      delay: 2000,
      disableOnInteraction: false,
    },
  });
}
sliderAnimation();


function gsapTimeline() {
  var t1 = gsap.timeline()
  t1.from("#loader h3", {
    x: 100,
    opacity: 0,
    duration: 1,
    stagger: 0.1

  })
  t1.to("#loader h3", {
    opacity: 0,
    x: -40,
    duration: 2,
    stagger: 0.1
  })

  t1.to("#loader", {
    opacity: 0,
  })
  t1.to("#loader", {
    display: "none"
  })
  t1.from("#page1 h1 span", {
    y: 40,
    opacity: 0,
    duration: 0.5,
    stagger: 0.1
  })

}

gsapTimeline();
var t2 = gsap.timeline()
t2.from("#page1 h2", {
  x: 70,
  opacity: 0,
  duration: 6,

})


gsap.from("#page3", {
  y: 40,
  opacity: 0,
  // duration: 1,
  // stagger:0.5, 
  // delay:1,
  scrollTrigger: {
    trigger: "#page3",
    scroller: "#main",
    markers: true,
    start:"top 65%",
    end:"top 60%",
    scrub:2
  }
})