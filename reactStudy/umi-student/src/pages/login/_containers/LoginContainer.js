import Login from '../components/Login'
import { connect } from 'umi';
import { routerRedux } from 'dva/router';
const mapDispatchToProps = dispatch => ({
    async login(loginId,loginPwd){
        let res = await dispatch({type:'loginUser/login',payload:{
            loginId,
            loginPwd
        }});

        if(res){
            dispatch(routerRedux.push('/'))
        }else{
            alert('账号密码错误')
        }
    }
})

export default connect(null,mapDispatchToProps)(Login);
