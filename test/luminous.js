import Luminous from '../src/js/Luminous';

beforeEach(function() {
  let anchor = document.createElement('a');
  anchor.href = 'https://images.unsplash.com/photo-1442606440995-d0be22c5f90f?crop=entropy&fit=crop&fm=jpg&h=1200&ixjsv=2.1.0&ixlib=rb-0.3.5&q=80&w=1300';
  anchor.classList.add('test-anchor')

  document.body.appendChild(anchor);
});

afterEach(function() {
  let anchor = document.querySelector('.test-anchor')

  document.body.removeChild(anchor);
});

describe('Core', () => {
  it('exposes `Luminous` on `window`', () => {
    expect(window.Luminous).toBeDefined();
  });

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
});

describe('Configuration', () => {
  it('sets up settings object when no options are passed', () => {
    let anchor = document.querySelector('.test-anchor');
    let lum = new Luminous(anchor);
    expect(lum.settings).toBeDefined();
  });

  it('sets up proper setting defaults when no options are passed', () => {
    let anchor = document.querySelector('.test-anchor');
    let lum = new Luminous(anchor);
    expect(lum.settings.namespace).toBe('luminous');
  });

  it('accepts custom settings', () => {
    let anchor = document.querySelector('.test-anchor');
    let lum = new Luminous(anchor, {namespace: 'not the default'});
    expect(lum.settings.namespace).toBe('not the default');
  });

  it('leaves settings defaults in place when custom settings are passed', () => {
    let anchor = document.querySelector('.test-anchor');
    let lum = new Luminous(anchor, {namespace: 'not the default'});
    expect(lum.settings.openTrigger).toBe('click');
  });
});
