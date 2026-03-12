(function () {
  function stripThemeZoomFromSequenceImages() {
    var sequenceImages = document.querySelectorAll(".photo-sequence img");
    sequenceImages.forEach(function (img) {
      // Replace node to drop event listeners attached by theme medium-zoom.
      var replacement = img.cloneNode(true);
      replacement.classList.remove("medium-zoom-image", "medium-zoom-image--hidden", "medium-zoom-image--opened");
      if (img.parentNode) {
        img.parentNode.replaceChild(replacement, img);
      }
    });

    // Clean any stale medium-zoom state that can leave floating images.
    document.body.classList.remove("medium-zoom--opened");
    document.querySelectorAll(".medium-zoom-overlay, .medium-zoom-image--opened").forEach(function (node) {
      node.remove();
    });
  }

  stripThemeZoomFromSequenceImages();

  var lightbox = document.getElementById("gallery-lightbox");
  if (!lightbox) {
    lightbox = document.createElement("div");
    lightbox.id = "gallery-lightbox";
    lightbox.className = "gallery-lightbox";
    lightbox.setAttribute("aria-hidden", "true");
    lightbox.innerHTML =
      '<div class="gallery-lightbox__content" role="dialog" aria-modal="true" aria-label="Image preview">' +
      '  <button class="gallery-lightbox__close" type="button" aria-label="Close image">\u00D7</button>' +
      '  <img class="gallery-lightbox__image" src="" alt="" />' +
      "</div>";
    document.body.appendChild(lightbox);
  }

  var image = lightbox.querySelector(".gallery-lightbox__image");
  var closeButton = lightbox.querySelector(".gallery-lightbox__close");

  function openLightbox(src, alt) {
    image.src = src;
    image.alt = alt || "";
    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    closeButton.focus();
  }

  function closeLightbox() {
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    image.src = "";
  }

  document.addEventListener("click", function (event) {
    var trigger = event.target.closest("[data-gallery-item]");
    if (trigger) {
      event.preventDefault();
      event.stopPropagation();
      if (typeof event.stopImmediatePropagation === "function") {
        event.stopImmediatePropagation();
      }
      var src = trigger.getAttribute("data-full-src") || trigger.getAttribute("href");
      var alt = trigger.getAttribute("data-alt") || "";
      if (src) {
        openLightbox(src, alt);
      }
      return;
    }

    if (lightbox.classList.contains("is-open") && event.target.closest("#gallery-lightbox")) {
      closeLightbox();
    }
  }, true);

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && lightbox.classList.contains("is-open")) {
      closeLightbox();
    }
  });
})();
