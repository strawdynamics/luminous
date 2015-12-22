import Lightbox from '../src/js/Lightbox';

describe('Lightbox', () => {
  it('throws if no arguments are passed', () => {
    expect(() => {
      new Lightbox;
    }).toThrowError(Error, 'Missing parameter')
  });

  it('throws if a required argument is missing', () => {
    expect(() => {
      new Lightbox('test');
    }).toThrowError(Error, 'Missing parameter')
  });

  it('does not throw if all required arguments are passed', () => {
    expect(() => {
      new Lightbox('test', 460);
    }).not.toThrowError()
  });
});
