describe('Luminous Core', () => {
  it('exposes `Luminous` on `window`', () => {
    expect(window.Luminous).toBeDefined();
  });
});

describe('Luminous Configuration', () => {
  it('sets up settings object when no options are passed', () => {
    let lum = new Luminous;
    expect(lum.settings).toBeDefined();
  });

  it('sets up proper setting defaults when no options are passed', () => {
    let lum = new Luminous;
    expect(lum.settings.namespace).toBe('luminous');
  });

  it('accepts custom settings', () => {
    let lum = new Luminous({namespace: 'not the default'});
    expect(lum.settings.namespace).toBe('not the default');
  });

  it('leaves settings defaults in place when custom settings are passed', () => {
    let lum = new Luminous({namespace: 'not the default'});
    expect(lum.settings.openEvent).toBe('click');
  });
});
