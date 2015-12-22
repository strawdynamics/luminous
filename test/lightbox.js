import Lightbox from '../src/js/Lightbox';

describe('Lightbox', () => {
  it('throws if no arguments are passed', () => {
    expect(() => {
      new Lightbox;
    }).toThrowError(Error, 'Missing parameter');
  });

  it('throws if a required argument is missing', () => {
    expect(() => {
      new Lightbox('test', 460);
    }).toThrowError(Error, 'Missing parameter');
  });

  it('does not throw if all required arguments are passed', () => {
    expect(() => {
      new Lightbox('test', 460, document.body);
    }).not.toThrowError();
  });

  it('throws if passed `appendToEl` is not a DOM element', () => {
    expect(() => {
      new Lightbox('test', 460, '.not-an-element');
    }).toThrowError(TypeError, '`new Lightbox` requires a DOM element passed as `appendToEl`.');
  });

  it('assigns the correct class to its element', () => {
    let lightbox = new Lightbox('test-namespace', 460, document.body);

    expect(document.body.querySelector('.test-namespace-lightbox')).not.toBeNull();
  });

  it('appends its element to the specified `appendToEl`', () => {
    let demoDiv = document.createElement('div');
    demoDiv.classList.add('demo-div');
    document.body.appendChild(demoDiv);

    let lightbox = new Lightbox('luminous', 460, demoDiv);

    expect(document.body.querySelector('.demo-div > .luminous-lightbox')).not.toBeNull();
  });
});
