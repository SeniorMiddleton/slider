var radius = 240;
var autoRotate = true;
var rotateSpeed = -100;
// var imgWidth = 110;
// var imgHeight = 170;

setTimeout(init, 800);

var odrag = document.getElementById("drag-container");
var ospin = document.getElementById("spin-container");
var aImg = ospin.getElementsByTagName("img");
var aEle = [...aImg];

/*size of images*/
ospin.style.width = 110 + "px";
ospin.style.height = 170 + "px";

var ground = document.getElementById("ground");

ground.style.width = radius + 3 + "px";
ground.style.height = radius + 3 + "px";

function init(delayTime) {
  for (let i = 0; i < aEle.length; i++) {
    aEle[i].style.transform =
      "rotateY(" +
      i * (360 / aEle.length) +
      "deg) translateZ(" +
      radius +
      "px)";
    aEle[i].style.transition = "reansform 0 0.5s";
    aEle[i].style.transitionDelay = delayTime || (aEle.length - 1) / 4 + "s";
  }
}

function applyTransform(obj) {
  if (tY > 180) tY = 180;
  if (tY < 0) tY = 0;
  obj.style.transform = "rotateX(" + -tY + "deg)rotateY(" + tX + "deg)";
}

function playSpin(yes) {
  ospin.style.animationPlayState = yes ? "running" : "paused";
}

var sX,
  sY,
  nX,
  desX = 0,
  desY = 0,
  tX = 0;
var tY = 10;

//auto spin

if (autoRotate) {
  var animationName = rotateSpeed > 0 ? "spin" : "spinRevert";
  ospin.style.animation = `${animationName}  ${Math.abs(
    rotateSpeed
  )}s infinite linear`;
}

//setup events
document.onpointerdown = function (e) {
  clearInterval(odrag.timer);
  e = e || window.event;
  var sX = e.clientX;
  sY = e.clientY;
  this.onpointermove = function (e) {
    e = e || window.event;
    var nX = e.clientX;
    nY = e.clientY;

    desX = nX - sX;
    desY = nY - sY;
    tX += desX * 0.1;
    tY += desY * 0.1;
    applyTransform(odrag);
    sX = nX;
    sY = nY;
  };

  this.onpointerup = function (e) {
    odrag.timer = setInterval(function () {
      desX *= 0.95;
      desY *= 0.95;
      tX += desX * 0.1;
      applyTransform(odrag);
      // playSpin(false);
      if (Math.abs(desX) < 0.5 && Math.abs(desY) < 0.5) {
        clearInterval(odrag.timer);
        // playSpin(true);
        if (autoRotate) playSpin(true);
      }
    }, 17);

    this.onpointermove = this.onpointerup = null;
  };
  return false;
};
document.onmousewheel = function (e) {
  e = e || window.event;
  var d = e.whelDelta / 20 || -e.detail;
  radius += d;
  init(1);
};
