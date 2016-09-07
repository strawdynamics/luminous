import Lightbox from '../src/js/Lightbox';

beforeEach(function() {
  let anchor = document.createElement('a');
  anchor.href = 'http://website.com/image.png';
  anchor.classList.add('test-anchor');

  document.body.appendChild(anchor);
});

afterEach(function() {
  let anchor = document.querySelector('.test-anchor')

  document.body.removeChild(anchor);
});


describe('Lightbox', () => {
  it('throws if no arguments are passed', () => {
    expect(() => {
      new Lightbox;
    }).toThrowError(Error, 'Missing parameter');
  });

  it('throws if required arguments are missing', () => {
    expect(() => {
      new Lightbox({namespace: 'test', parentEl: document.body});
    }).toThrowError(Error, 'Missing parameter');
  });

  it('does not throw if all required arguments are passed', () => {
    expect(() => {
      let triggerEl = document.querySelector('.test-anchor');

      new Lightbox({namespace: 'test', parentEl: document.body, triggerEl: triggerEl, sourceAttribute: 'href', caption: null});
    }).not.toThrowError();
  });

  it('throws if passed `parentEl` is not a DOM element', () => {
    expect(() => {
      let triggerEl = document.querySelector('.test-anchor');

      new Lightbox({namespace: 'test', parentEl: '.not-an-element', triggerEl: triggerEl, sourceAttribute: 'href', caption: null});
    }).toThrowError(TypeError, '`new Lightbox` requires a DOM element passed as `parentEl`.');
  });

  it('assigns the correct class to its element', () => {
    let triggerEl = document.querySelector('.test-anchor');

    let lightbox = new Lightbox({namespace: 'test-namespace', parentEl: document.body, triggerEl: triggerEl, sourceAttribute: 'href', caption: null});
    lightbox.open();
    lightbox.close();

    expect(document.body.querySelector('.test-namespace-lightbox')).not.toBeNull();
  });

  it('appends its element to the specified `appendToEl`', () => {
    let demoDiv = document.createElement('div');
    demoDiv.classList.add('demo-div');
    document.body.appendChild(demoDiv);

    let triggerEl = document.querySelector('.test-anchor');

    let lightbox = new Lightbox({namespace: 'lum', parentEl: demoDiv, triggerEl: triggerEl, sourceAttribute: 'href', caption: null});
    lightbox.open();
    lightbox.close();

    expect(document.body.querySelector('.demo-div > .lum-lightbox')).not.toBeNull();
  });

  it('cleans up its element when destroyed', () => {
    let triggerEl = document.querySelector('.test-anchor');

    let lightbox = new Lightbox({namespace: 'to-destroy', parentEl: document.body, triggerEl: triggerEl, sourceAttribute: 'href', caption: null});
    lightbox.open();
    lightbox.close();
    lightbox.destroy();

    expect(document.body.querySelector('.to-destroy-lightbox')).toBeNull();
  });

  it('adds the `imgix-fluid` param if configured', () => {
    let triggerEl = document.querySelector('.test-anchor');

    let lightbox = new Lightbox({namespace: 'fluid', parentEl: document.body, triggerEl: triggerEl, sourceAttribute: 'href', caption: null, includeImgixJSClass: true});
    lightbox.open();
    lightbox.close();

    expect(lightbox.el.querySelector('.imgix-fluid')).not.toBeNull()
  });
});
