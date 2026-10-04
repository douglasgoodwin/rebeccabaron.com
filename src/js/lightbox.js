// Minimal dependency-free lightbox for the film galleries.
(function () {
  var imgs = Array.prototype.slice.call(document.querySelectorAll("#gallery img"));
  if (!imgs.length) return;

  var box = document.createElement("div");
  box.className = "lightbox";
  box.hidden = true;
  box.innerHTML =
    '<button class="lb-close" aria-label="Close">×</button>' +
    '<button class="lb-prev" aria-label="Previous">‹</button>' +
    '<img class="lb-img" alt="">' +
    '<button class="lb-next" aria-label="Next">›</button>';
  document.body.appendChild(box);

  var lbImg = box.querySelector(".lb-img");
  var cur = 0;

  function show(i) {
    cur = (i + imgs.length) % imgs.length;
    lbImg.src = imgs[cur].src;
    lbImg.alt = imgs[cur].alt;
    box.hidden = false;
    document.body.style.overflow = "hidden";
  }
  function hide() {
    box.hidden = true;
    document.body.style.overflow = "";
  }

  imgs.forEach(function (im, i) {
    im.addEventListener("click", function () { show(i); });
  });
  box.querySelector(".lb-close").addEventListener("click", hide);
  box.querySelector(".lb-prev").addEventListener("click", function (e) {
    e.stopPropagation(); show(cur - 1);
  });
  box.querySelector(".lb-next").addEventListener("click", function (e) {
    e.stopPropagation(); show(cur + 1);
  });
  lbImg.addEventListener("click", function (e) {
    e.stopPropagation(); show(cur + 1);
  });
  box.addEventListener("click", hide);
  document.addEventListener("keydown", function (e) {
    if (box.hidden) return;
    if (e.key === "Escape") hide();
    else if (e.key === "ArrowLeft") show(cur - 1);
    else if (e.key === "ArrowRight") show(cur + 1);
  });
})();
