import {setValue} from "../../util/ObjectUtil.js";

export function vmodel (vm,elm,data){
    elm.onchange = function(e){
        //vue对象的data，绑定的属性，元素的value值
        setValue(vm._data, data, elm.value);
    }
}