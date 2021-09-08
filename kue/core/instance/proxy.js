import {renderData} from "./render.js"

const arrayProto = Array.prototype // 获取Array的原型
function defArrayFunc (obj, func, namespace, vm) {
    Object.defineProperty(obj, func, {
        enumerable: true,
        configurable: true,
        value: function(...args) {
            let original = arrayProto[func];
            const result = original.apply(this, args);
            console.log(func,original)
            return result;
        }
    });
}

function proxyArr(vm, arr, namespace) {
    let obj = {
        eleType: "Array",
        toString: function() {
            let result = "";
            for (let i = 0 ; i < arr.length ; i ++) {
                result += arr[i] + ", "
            }
            return result.substring(0, result.length - 2);
        },
        push() {},
        pop() {},
        shift() {},
        unshift() {}
    }
    defArrayFunc.call(vm, obj, 'push', namespace, vm);
    defArrayFunc.call(vm, obj, 'pop', namespace, vm);
    defArrayFunc.call(vm, obj, 'shift', namespace, vm);
    defArrayFunc.call(vm, obj, 'unshift', namespace, vm);
    arr.__proto__ = obj;
    return arr;
}

export function constructProxy (vm,obj,nameSpace){
    console.log(obj,nameSpace)
    let proxyObj = null;
    if(obj instanceof Array){
        proxyObj = new Array(obj.length);
        // for (let i = 0 ; i < proxyObj.length ; i ++) {
        //     if(obj[i] instanceof Object){
        //         proxyObj[i] = constructProxy(vm, obj[i], nameSpace); //代理数组的每一项(如果为对象，否则不代理)
        //     }
        // }
        proxyObj = proxyArr(vm, obj, nameSpace); //把这个数组也代理了
    }else if(obj instanceof Object){
        proxyObj = constructObjectProxy(vm,obj,nameSpace);
    }else{
        throw new Error('data数据类型错误');
    }
    return proxyObj;
}

function constructObjectProxy(vm,obj,nameSpace){
    let proxyObj = {};
    for(let prop in obj){
        Object.defineProperty(proxyObj,prop,{
            set(value){
                // console.log(`改变了${obj}的值为：`,value)
                // console.log("set:" + getNameSpace(nameSpace, prop));
                obj[prop] = value;
                renderData(vm,getNameSpace(nameSpace, prop));
            },
            get(){
                return obj[prop];
            }
        })
        console.log(proxyObj,prop)
        Object.defineProperty(vm,prop,{
            set(value){
                // console.log(`改变了${vm}的值为：`,value)
                // console.log("set:" + getNameSpace(nameSpace, prop));
                obj[prop] = value;
                renderData(vm,getNameSpace(nameSpace, prop));
            },
            get(){
                return obj[prop];
            }
        })
        if(obj[prop] instanceof Object){
            console.log(obj,obj[prop])
            proxyObj[prop] = constructProxy(vm,obj[prop], getNameSpace(nameSpace, prop));
        }
    }
    return proxyObj;
}

// 获取命名空间
function getNameSpace(nowNameSpace, nowProp) {
    // console.log(nowNameSpace,nowProp)
    if (nowNameSpace == null || nowNameSpace == "") {
        return nowProp;
    } else if (nowProp == null || nowProp == "") {
        return nowNameSpace;
    } else {
        return nowNameSpace + "." + nowProp;
    }
}