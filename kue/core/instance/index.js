import {initMixin} from "./init.js";
import {renderMixin} from "./render.js";

function Kue(options) {
    this._init(options);

    this._render();
}

initMixin(Kue);
renderMixin(Kue);

export default Kue;
