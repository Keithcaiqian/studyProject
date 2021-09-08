import { searchStudents } from '@/services/student'
import { routerRedux } from 'dva/router';

export default {
    state:{
        condition:{
            key: "", //关键词查询
            sex: -1, //性别
            page: 1, //第几页
            limit: 10  //页容量
        },
        result:{
            total:0, //学生总数
            list:[]  //学生列表
        }
    },
    reducers:{
        changeCondition(state,{payload}){
            return {
                ...state,
                condition:{
                    ...state.condition,
                    ...payload
                }
            }
        },
        setStudent(state,{payload}){
            return {
                ...state,
                result:payload
            }
        }
    },
    effects:{
        *setCondition({payload},{ put,select }){
            //改变地址
            let condition = yield select(state => state.students.condition)
            condition = {
                ...condition,
                ...payload
            }
            yield put(routerRedux.push(`?page=${condition.page}&limit=${condition.limit}&key=${condition.key}&sex=${condition.sex}`))
        },
        *getStudent(action,{ call,put,select }){
            const condition = yield select(state => state.students.condition)
            const res = yield call(searchStudents,condition)
            yield put({
                type:'setStudent',
                payload:{
                    total:res.cont,
                    list:res.datas
                }
            })
        }
    },
    subscriptions:{
        listenUrl({ history,dispatch }){
            history.listen((newLocation) => {
                if (newLocation.pathname !== "/student") {
                    return;
                }
                const query = newLocation.query;
                query.limit && (query.limit = +query.limit)
                query.page && (query.page = +query.page)
                query.sex && (query.sex = +query.sex)
                dispatch({
                    type: "changeCondition",
                    payload: query
                })
                dispatch({
                    type: "getStudent"
                })
            })
        }
    }
}