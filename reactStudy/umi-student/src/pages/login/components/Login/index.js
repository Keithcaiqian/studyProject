import React,{ useRef } from 'react'
import style from './index.css'

export default function index(props) {
    const loginId = useRef();
    const loginPwd = useRef();
    return (
        <div className={style.loginPage}>
            <div className={style.container}>
                <div className={style.item}>
                    <span>账号</span>
                    <input ref={loginId} type="text" />
                </div>
                <div className={style.item}>
                    <span>密码</span>
                    <input ref={loginPwd} type="password" />
                </div>
                <div className={style.item}>
                    <button onClick={() => {
                        props.login && props.login(loginId.current.value,loginPwd.current.value);
                    }} className={style.loginBtn}>登录</button>
                </div>
            </div>
        </div>
    )
}
