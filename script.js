const scroll = new LocomotiveScroll({
  el: document.querySelector("#wrapper"),
  smooth: true,
});

let timeout;

function firstPageAnimation() {
  let tl = gsap.timeline();

  tl.from("#navigation", {
    y: -10,
    opacity: 0,
    duration: 1.5,
    ease: Expo.easeInOut,
  })
    .to(".boundingelement", {
      y: 0,
      duration: 2,
      delay: -1,
      ease: Expo.easeInOut,
      stagger: 0.2,
    })
    .from("#hero-footer", {
      opacity: 0,
      y: -10,
      duration: 1.5,
      delay: -1,
      ease: Expo.easeInOut,
    });
}

function makeCircleShapeOval() {
  let xscale = 1;
  let yscale = 1;

  let xprev = 0;
  let yprev = 0;

  window.addEventListener("mousemove", function (dets) {
    clearTimeout(timeout);
    xprev = dets.clientX;
    yprev = dets.clientY;
    xscale = gsap.utils.clamp(0.8, 1.2, dets.clientX - xprev);
    yscale = gsap.utils.clamp(0.8, 1.2, dets.clientY - yprev);

    movingCircle(xscale, yscale);

    timeout = setTimeout(() => {
      const minicircle = document.querySelector("#minicircle");
      if (minicircle) {
        minicircle.style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(1,1)`;
      }
    }, 100);
  });
}

function movingCircle(xscale, yscale) {
  window.addEventListener("mousemove", function (dets) {
    const minicircle = document.querySelector("#minicircle");
    if (minicircle) {
      minicircle.style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(${xscale},${yscale})`;
    }
  });
}

document.querySelectorAll(".element").forEach(function (elem) {
  let rotate = 0;
  let diffrot = 0;
  const img = elem.querySelector("img");

  elem.addEventListener("mouseleave", function () {
    gsap.to(img, {
      opacity: 0,
      ease: Power3,
      duration: 0.5,
    });
  });

  elem.addEventListener("mousemove", function (dets) {
    const diff = dets.clientY - elem.getBoundingClientRect().top;
    diffrot = dets.clientX - rotate;
    rotate = dets.clientX;

    gsap.to(img, {
      opacity: 1,
      ease: Power3,
      top: diff,
      left: dets.clientX,
      rotate: gsap.utils.clamp(-20, 20, diffrot * 0.5),
    });
  });
});

makeCircleShapeOval();
firstPageAnimation();
