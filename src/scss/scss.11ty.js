const path = require('path');
const sass = require('sass');
const postcss = require('postcss');

/*
 * Il n'est pas nécessaire de garder le nom de la classe.
 * On peut directement l'exporter.
 */
module.exports = class {

    data() {
        const scssDir = path.join(__dirname, '.');
        const rawFilepath = path.join(scssDir, 'styles.scss');

        const sassRenderResult = sass.renderSync({
            file: rawFilepath,
            outputStyle: "compressed",
        });

        const rawCss = sassRenderResult.css.toString();

        return {
            permalink: '/css/styles.css',
            rawFilepath: rawFilepath,
            rawCss: rawCss
        }
    }

    render({ rawCss }) {
        return postcss(require('autoprefixer')({ overrideBrowserslist: "last 5 version" }))
            .process(rawCss)
            .then((result) => result.css);
    }
}