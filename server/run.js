/**
 * Created at 18/4/22
 * @Autor fozero
 * @Github https://github.com/fozero
 */
// start.js
require("babel-core/register")(
    {
        presets: ['stage-3','es2015']
    }
);

require("babel-polyfill");

require("./app.js");