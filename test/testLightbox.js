import Lightbox from "../src/js/Lightbox";

let lightbox = null;
beforeEach(function() {
  const anchor = document.createElement("a");
  anchor.href = "http://website.com/image.png";
  anchor.classList.add("test-anchor");

  document.body.appendChild(anchor);
});

const deleteAllElementsByClassName = className => {
  const paras = document.getElementsByClassName(className);
  while (paras[0]) {
    paras[0].parentNode.removeChild(paras[0]);
  }
};
afterEach(function() {
  const anchor = document.querySelector(".test-anchor");

  if (lightbox) {
    try {
      lightbox.close();
      lightbox.destroy();
    } catch (_e) {} // eslint-disable-line no-empty
    lightbox = null;
  }
  deleteAllElementsByClassName("lum-lightbox");
  document.body.removeChild(anchor);
});

describe("Lightbox", () => {
  it("throws if no arguments are passed", () => {
    expect(() => {
      new Lightbox();
    }).toThrowError(Error, "Missing parameter");
  });

  it("throws if required arguments are missing", () => {
    expect(() => {
      new Lightbox({ namespace: "test", parentEl: document.body });
    }).toThrowError(Error, "Missing parameter");
  });

  it("does not throw if all required arguments are passed", () => {
    expect(() => {
      const triggerEl = document.querySelector(".test-anchor");

      new Lightbox({
        namespace: "test",
        parentEl: document.body,
        triggerEl: triggerEl,
        sourceAttribute: "href",
        caption: null
      });
    }).not.toThrowError();
  });

  it("throws if passed `parentEl` is not a DOM element", () => {
    expect(() => {
      const triggerEl = document.querySelector(".test-anchor");

      new Lightbox({
        namespace: "test",
        parentEl: ".not-an-element",
        triggerEl: triggerEl,
        sourceAttribute: "href",
        caption: null
      });
    }).toThrowError(
      TypeError,
      "`new Lightbox` requires a DOM element passed as `parentEl`."
    );
  });

  it("assigns the correct class to its element", () => {
    const triggerEl = document.querySelector(".test-anchor");

    lightbox = new Lightbox({
      namespace: "test-namespace",
      parentEl: document.body,
      triggerEl: triggerEl,
      sourceAttribute: "href",
      caption: null
    });
    lightbox.open();
    lightbox.close();

    expect(
      document.body.querySelector(".test-namespace-lightbox")
    ).not.toBeNull();
  });

  it("appends its element to the specified `appendToEl`", () => {
    const demoDiv = document.createElement("div");
    demoDiv.classList.add("demo-div");
    document.body.appendChild(demoDiv);

    const triggerEl = document.querySelector(".test-anchor");

    lightbox = new Lightbox({
      namespace: "lum",
      parentEl: demoDiv,
      triggerEl: triggerEl,
      sourceAttribute: "href",
      caption: null
    });
    lightbox.open();
    lightbox.close();

    expect(
      document.body.querySelector(".demo-div > .lum-lightbox")
    ).not.toBeNull();
  });

  it("cleans up its element when destroyed", () => {
    const triggerEl = document.querySelector(".test-anchor");

    lightbox = new Lightbox({
      namespace: "to-destroy",
      parentEl: document.body,
      triggerEl: triggerEl,
      sourceAttribute: "href",
      caption: null
    });
    lightbox.open();
    lightbox.close();
    lightbox.destroy();

    expect(document.body.querySelector(".to-destroy-lightbox")).toBeNull();
  });

  it("adds the `imgix-fluid` param if configured", () => {
    const triggerEl = document.querySelector(".test-anchor");

    lightbox = new Lightbox({
      namespace: "fluid",
      parentEl: document.body,
      triggerEl: triggerEl,
      sourceAttribute: "href",
      caption: null,
      includeImgixJSClass: true
    });
    lightbox.open();
    lightbox.close();

    expect(lightbox.el.querySelector(".imgix-fluid")).not.toBeNull();
  });

  describe("Close button", () => {
    it("shows a close button when the lightbox is open", () => {
      const triggerEl = document.querySelector(".test-anchor");

      lightbox = new Lightbox({
        namespace: "lum",
        parentEl: document.body,
        triggerEl: triggerEl,
        sourceAttribute: "href",
        caption: null
      });
      lightbox.open();
      // lightbox.close();

      expect(document.body.querySelector(".lum-close-button")).not.toBeNull();
    });
    it("the close button closes the lightbox", () => {
      const triggerEl = document.querySelector(".test-anchor");

      let closed = false;
      lightbox = new Lightbox({
        namespace: "lum",
        parentEl: document.body,
        triggerEl: triggerEl,
        sourceAttribute: "href",
        caption: null,
        onClose: () => {
          closed = true;
        }
      });
      lightbox.open();

      const closeButtonEl = document.body.querySelector(".lum-close-button");
      if (!closeButtonEl) {
        throw new Error("Close button doesn't exist in DOM.");
      }
      closeButtonEl.click();

      expect(closed).toBe(true);
    });
    it("the close button can be disabled", () => {
      const triggerEl = document.querySelector(".test-anchor");

      lightbox = new Lightbox({
        namespace: "lum",
        parentEl: document.body,
        triggerEl: triggerEl,
        sourceAttribute: "href",
        caption: null,
        closeButtonEnabled: false
      });
      lightbox.open();
      // lightbox.close();

      expect(document.body.querySelector(".lum-close-button")).toBeNull();
    });
  });
});
