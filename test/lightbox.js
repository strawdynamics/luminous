import Lightbox from '../src/js/Lightbox';

describe('Lightbox', () => {
  it('throws if no arguments are passed', () => {
    expect(() => {
      new Lightbox;
    }).toThrowError(Error, 'Missing parameter');
  });

  it('throws if a required argument is missing', () => {
    expect(() => {
      new Lightbox({namespace: 'test', parentEl: document.body});
    }).toThrowError(Error, 'Missing parameter');
  });

  it('does not throw if all required arguments are passed', () => {
    expect(() => {
      new Lightbox({namespace: 'test', parentEl: document.body, imageURL: 'http://something.com/test.png'});
    }).not.toThrowError();
  });

  it('throws if passed `parentEl` is not a DOM element', () => {
    expect(() => {
      new Lightbox({namespace: 'test', parentEl: '.not-an-element', imageURL: 'http://something.com/test.png'});
    }).toThrowError(TypeError, '`new Lightbox` requires a DOM element passed as `parentEl`.');
  });

  it('assigns the correct class to its element', () => {
    let lightbox = new Lightbox({namespace: 'test-namespace', parentEl: document.body, imageURL: 'http://something.com/test.png'});

    expect(document.body.querySelector('.test-namespace-lightbox')).not.toBeNull();
  });

  it('appends its element to the specified `appendToEl`', () => {
    let demoDiv = document.createElement('div');
    demoDiv.classList.add('demo-div');
    document.body.appendChild(demoDiv);

    let lightbox = new Lightbox({namespace: 'lum', parentEl: demoDiv, imageURL: 'http://something.com/test.png'});

    expect(document.body.querySelector('.demo-div > .lum-lightbox')).not.toBeNull();
  });

  it('cleans up its element when destroyed', () => {
    let lightbox = new Lightbox({namespace: 'to-destroy', parentEl: document.body, imageURL: 'http://something.com/test.png'});
    lightbox.destroy();

    expect(document.body.querySelector('.to-destroy-lightbox')).toBeNull();
  });

  it('adds the `imgix-fluid` param if configured', () => {
    let lightbox = new Lightbox({namespace: 'fluid', parentEl: document.body, imageURL: 'http://something.com/test.png', includeImgixJSClass: true});

    expect(lightbox.el.querySelector('.imgix-fluid')).not.toBeNull()
  });
});
