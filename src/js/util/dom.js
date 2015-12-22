// This is not really a perfect check, but works fine.
// From http://stackoverflow.com/questions/384286
const hasDOM2 = typeof HTMLElement === 'object';

export function isDOMElement(obj) {
	return (
		hasDOM2 ?
			obj instanceof HTMLElement :
			(obj && typeof obj === 'object' && obj !== null &&
				obj.nodeType === 1 && typeof obj.nodeName === 'string')
	)
}
