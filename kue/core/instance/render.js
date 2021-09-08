import {getValue} from "../util/ObjectUtil.js";

// 通过模板，找到哪些节点用到了这个模板
let template2Vnode = new Map();
// 通过节点，找到这个节点下面有哪些模板
let vnode2Template = new Map();

export function renderMixin(Due) {
    Due.prototype._render = function () {
        renderNode(this, this._vnode);
    }
}

// data改变值的时候渲染对应的dom
export function renderData(vm, data) {
    let vnodes = template2Vnode.get(data);
    if (vnodes != null) {
        for (let i = 0 ; i < vnodes.length ; i ++) {
            renderNode(vm, vnodes[i]);
        }
    }
}

// 渲染
export function renderNode(vm, vnode) {
    if (vnode.nodeType == 3) {  //文本节点
        let templates = vnode2Template.get(vnode); //寻找哪些节点有这个文本（文本节点才有文本）
        if (templates) {
            let result = vnode.text;
            for (let i = 0 ; i < templates.length ; i ++) {
                // 当前节点的参数，可以来自于Due对象，也可以来自于父级节点
                let templateValue = getTemplateValue([vm._data, vnode.env], templates[i]);//取出模板中变量对应的值
                if (templateValue) {
                    result = result.replace("{{" + templates[i] + "}}", templateValue);
                }
            }
            vnode.elm.nodeValue = result;//渲染真实dom值
        }
    } else if (vnode.nodeType == 1 && vnode.tag == "INPUT") {
        let templates = vnode2Template.get(vnode);
        if (templates) {
            for (let i = 0 ; i < templates.length ; i ++) {
                let templateValue = getTemplateValue([vm._data, vnode.env], templates[i]);
                if (templateValue) {
                    vnode.elm.value = templateValue;
                }
            }
        }
    } else {
        for (let i = 0 ; i < vnode.children.length ; i ++) {
            renderNode(vm, vnode.children[i]);
        }
    }
}

// 预渲染
export function prepareRender (vm,vnode){
    if (vnode == null) {
        return;
    }
    if (vnode.nodeType == 3) {//如果当前是文本，则解析是否存在模板
        analysisTemplateString(vnode);
    }
    if (vnode.nodeType == 0) {
        setTemplate2Vnode("{{" + vnode.data + "}}", vnode);
        setVnode2Template("{{" + vnode.data + "}}", vnode);
    }

    analysisAttr(vm, vnode);

    for (let i = 0 ; i < vnode.children.length ; i ++) {
        prepareRender(vm, vnode.children[i]);
    }

    // console.log(template2Vnode,vnode2Template)
}

// 分析模板中的字符串
function analysisTemplateString(vnode) {
    let templateStrList = vnode.text.match(/{{[a-zA-Z0-9_.]+}}/g);
    for (let i = 0 ; templateStrList && i < templateStrList.length ; i ++) {
        setTemplate2Vnode(templateStrList[i], vnode);
        setVnode2Template(templateStrList[i], vnode);
    }
}

// 建立对应关系
function setTemplate2Vnode(template, vnode) {
    let templateSet = template2Vnode.get(getTemplateName(template));
    if (templateSet) {
        templateSet.push(vnode);
    } else {
        template2Vnode.set(getTemplateName(template), [vnode]);
    }
}
// 建立对应关系
function setVnode2Template(template, vnode) {
    let vnodeSet = vnode2Template.get(vnode);
    if (vnodeSet) {
        vnodeSet.push(getTemplateName(template));
    } else {
        vnode2Template.set(vnode, [getTemplateName(template)]);
    }
}

// 获取模板中的内容
function getTemplateName(text) {
    return text.substring(2, text.length - 2);
}

function getTemplateValue(objs, templateName) {
    for (let i = 0 ; i < objs.length ; i ++) {
        let temp = getValue(objs[i], templateName);
        if (temp != null) {
            return temp;
        }
    }
    return null;
}

// 分析v-model并建立对应的关系
function analysisAttr(vm, vnode) {
    if (vnode.nodeType != 1) {
        return;
    }
    let attrNames = vnode.elm.getAttributeNames();
    if (attrNames.indexOf("v-model") > -1) {
        setTemplate2Vnode("{{" + vnode.elm.getAttribute("v-model") + "}}", vnode);
        setVnode2Template("{{" + vnode.elm.getAttribute("v-model") + "}}", vnode);
    }
}