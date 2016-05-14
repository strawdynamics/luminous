import Luminous from '../src/js/Luminous';

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

describe('Core', () => {
  it('throws if no arguments are passed', () => {
    expect(() => {
      new Luminous;
    }).toThrowError(TypeError, '`new Luminous` requires a DOM element as its first argument.')
  });

  it('throws if the first argument is not a DOM element', () => {
    expect(() => {
      new Luminous('.some-selector');
    }).toThrowError(TypeError, '`new Luminous` requires a DOM element as its first argument.')
  });

  it('returns an instance of `Luminous` when correctly instantiated', () => {
    let anchor = document.querySelector('.test-anchor');
    let lum = new Luminous(anchor);

    expect(lum.constructor).toBe(Luminous);
  });

  it('executes the `onOpen` callback when present', () => {
    let called = false;
    function openCallback() {
      called = true;
    }

    let anchor = document.querySelector('.test-anchor');
    let lum = new Luminous(anchor, {onOpen: openCallback});

    lum.open();
    expect(called).toBe(true);
  });

  it('executes the `onClose` callback when present', () => {
    let called = false;
    function closeCallback() {
      called = true;
    }

    let anchor = document.querySelector('.test-anchor');
    let lum = new Luminous(anchor, {onClose: closeCallback});

    lum.open();
    lum.close();
    expect(called).toBe(true);
  });
});

describe('Configuration', () => {
  it('sets up settings object when no options are passed', () => {
    let anchor = document.querySelector('.test-anchor');
    let lum = new Luminous(anchor);

    expect(lum.settings).toBeDefined();
  });

  it('applies proper setting defaults when no options are passed', () => {
    let anchor = document.querySelector('.test-anchor');
    let lum = new Luminous(anchor);

    expect(lum.settings.sourceAttribute).toBe('href');
  });

  it('accepts custom settings', () => {
    let anchor = document.querySelector('.test-anchor');
    let lum = new Luminous(anchor, {namespace: 'not-the-default'});

    expect(lum.settings.namespace).toBe('not-the-default');
  });

  it('leaves settings defaults in place when custom settings are passed', () => {
    let anchor = document.querySelector('.test-anchor');
    let lum = new Luminous(anchor, {namespace: 'it-does-not-matter'});

    expect(lum.settings.openTrigger).toBe('click');
  });
});

describe('#destroy', () => {
  it('does not throw if the Lightbox instance has never been `#open`ed', () => {
    let anchor = document.querySelector('.test-anchor');
    let lum = new Luminous(anchor);

    expect(function() {
      lum.destroy();
    }).not.toThrow();
  });
});
