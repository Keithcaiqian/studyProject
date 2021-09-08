import { routerRedux } from 'dva/router';
export default {
    state:null,
    reducers:{
        setLogin(state,{payload}){
            return payload
        }
    },
    effects:{
        *login({ payload },{ put }){
            const { loginId , loginPwd } = payload;
            if( loginId === 'admin' && loginPwd == 123 ){
                yield put({type:'setLogin',payload:loginId});
                localStorage.setItem('loginId',loginId)
                return true
            }else{
                return false
            } 
        },
        *loginOut(action,{ put }){
            localStorage.removeItem('loginId');
            yield put({type:'setLogin',payload:null})
        }
    },
    subscriptions: {
        syncLocalstorage({ dispatch }) {
            //同步本地存储
            var loginId = localStorage.getItem("loginId");
            if (loginId) {
                //已经登录过了
                dispatch({ type: "setLoginUser", payload: loginId });
            }else{
                dispatch(routerRedux.push('/login'))
            }
        }
    },
}