import throwIfMissing from './util/throwIfMissing';

export default class Lightbox {
  constructor(
    namespace = throwIfMissing(),
    minContentWidth = throwIfMissing()
  ) {
    this.namespace = namespace;
    this.minContentWidth = minContentWidth;
  }
}
