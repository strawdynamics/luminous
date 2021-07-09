const pkg = require('../package.json');
const year = new Date().getFullYear();

const banner = `Luminous v${pkg.version}
Copyright 2015-${year}, Zebrafish Labs
Licensed under BSD-2 (https://github.com/imgix/luminous/blob/main/LICENSE.md)`;

module.exports = banner;
