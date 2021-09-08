import {constructProxy} from "./proxy.js";
import {mount} from './mount.js';

let uid = 0;

export function initMixin(Kue) {
    Kue.prototype._init = function (options) {
        const vm = this; //vm就是new后实例对象
        vm.uid = uid ++;
        vm._isVue = true;
        // 初始化data
        if (options && options.data) {
            vm._data = constructProxy(vm, options.data, "");
        }
        // 初始化created方法
        // 初始化methods方法
        // 初始化computed
        // 初始化el并挂载
        if(options && options.el){
            let rootDom = document.getElementById(options.el);
            mount(vm,rootDom);
        }
    }
}