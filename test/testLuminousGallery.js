import LuminousGallery from "../src/js/LuminousGallery";

const genLink = idx => `http://website.com/image-${idx}.png`;

const isChromeHeadless = /HeadlessChrome/.test(window.navigator.userAgent);

beforeEach(function() {
  for (let index = 0; index < 3; index++) {
    const anchor = document.createElement("a");
    anchor.href = genLink(index);
    anchor.classList.add("test-gallery-anchor");

    document.body.appendChild(anchor);
  }
});

afterEach(function() {
  const anchors = document.getElementsByClassName("test-gallery-anchor");
  while (anchors.length > 0) {
    anchors[0].parentNode.removeChild(anchors[0]);
  }
});

function openLuminous(index = 0) {
  const anchors = document.querySelectorAll(".test-gallery-anchor");
  const anchor = [...anchors].filter(
    anchor => anchor.href === genLink(index)
  )[0];
  if (!anchor) {
    throw new Error("Anchor not found in DOM.");
  }
  anchor.click();
}

describe("LuminousGallery", () => {
  it("should navigate right when right arrow button pressed", () => {
    new LuminousGallery(document.querySelectorAll(".test-gallery-anchor"), {
      arrowNavigation: true
    });

    openLuminous(0);

    const nextButtonEl = document.body.querySelector(".lum-next-button");
    if (!nextButtonEl) {
      throw new Error("Navigation button not found in DOM.");
    }
    nextButtonEl.click();

    expect(document.body.querySelector(".lum-img").src).toBe(genLink(1));
  });
  it("should navigate left when left arrow button pressed", () => {
    new LuminousGallery(document.querySelectorAll(".test-gallery-anchor"), {
      arrowNavigation: true
    });

    openLuminous(1);

    const prevButtonEl = document.body.querySelector(".lum-previous-button");
    if (!prevButtonEl) {
      throw new Error("Navigation button not found in DOM.");
    }
    prevButtonEl.click();

    expect(document.body.querySelector(".lum-img").src).toBe(genLink(0));
  });
  it("should navigate right when right arrow key pressed", () => {
    // Broken on CI
    if (isChromeHeadless) {
      return;
    }
    new LuminousGallery(document.querySelectorAll(".test-gallery-anchor"), {
      arrowNavigation: true
    });

    openLuminous(0);

    const event = new KeyboardEvent("keydown", { keyCode: 39 });
    window.dispatchEvent(event);

    expect(document.body.querySelector(".lum-img").src).toBe(genLink(1));
  });
  it("should navigate left when left arrow key pressed", () => {
    // Broken on CI
    if (isChromeHeadless) {
      return;
    }
    new LuminousGallery(document.querySelectorAll(".test-gallery-anchor"), {
      arrowNavigation: true
    });

    openLuminous(1);

    const event = new KeyboardEvent("keydown", { keyCode: 37 });
    window.dispatchEvent(event);

    expect(document.body.querySelector(".lum-img").src).toBe(genLink(0));
  });
});
