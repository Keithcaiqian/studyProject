import VNode from "../vdom/vnode.js";
import {prepareRender} from "./render.js";
import {vmodel} from './grammer/vmodel.js';
import {vforInit} from './grammer/vfor.js';
import {mergeAttr} from "../util/ObjectUtil.js";

export function initMount(Due) {
    
    Due.prototype.$mount = function (el) {
        let vm = this;
        let rootDom = document.getElementById(el);
        mount(this, rootDom);
    }
    
}

export function mount(vm, el) {
    // 挂载虚拟dom树
    vm._vnode = constructVNode(vm, el, null);
    // 预渲染
    prepareRender(vm, vm._vnode);
}

function constructVNode(vm, elm, parent){ //深度优先搜索
    let vnode = analysisAttr(vm, elm, parent);//是否是虚拟节点
    if(vnode == null){
        let children = [];
        let text = getNodeText(elm);
        let data = null;
        let nodeType = elm.nodeType;
        let tag = elm.nodeName;
        let key = null;
        vnode = new VNode(tag, elm, children, text, data, parent, nodeType, key);//elm, children, text, data, vnode
        if (elm.nodeType == 1 && elm.getAttribute("env")) { //是标签且有env属性
            vnode.env = mergeAttr(vnode.env, JSON.parse(elm.getAttribute("env")));
        } else {
            vnode.env = mergeAttr(vnode.env, parent ? parent.env : {});
        }
    }

    let child = vnode.elm.childNodes; 
    for (let i = 0; i < child.length; i++) {
        let childNodes = constructVNode(vm,child[i],vnode);
        if(childNodes instanceof VNode){ //返回单一节点的时候
            vnode.children.push(childNodes);
        }else{ //返回数组  ，v-for的时候
            vnode.children = vnode.children.concat(childNodes);
        }
    }
    return vnode;
}

// 获取节点内容
function getNodeText(elm){
    if (elm.nodeType == 3) { // 文本节点
        return elm.nodeValue;
    } else {
        return "";
    }
}

function analysisAttr(vm, elm, parent) {
    if (elm.nodeType == 1) {
        let attrNames = elm.getAttributeNames(); //获取所有元素的属性名字
        if (attrNames.indexOf("v-for") > -1) {
            return vforInit(vm, elm.getAttribute("v-for"), elm, parent);
        }
        if (attrNames.indexOf("v-model") > -1) {
            return vmodel(vm, elm, elm.getAttribute("v-model"));
        }
    }
}