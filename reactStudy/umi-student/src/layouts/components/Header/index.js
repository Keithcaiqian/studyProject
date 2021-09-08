import React from 'react'
import style from './index.css'

export default function index(props) {
    return (
        <div className={style.head}>
            <div className={style.left}>学生管理系统</div>
            <div className={style.right}>
                <span className={style.user}>{props.loginId}</span>
                <button onClick={props.onLoginOut} className={style.btn}>退出登录</button>
            </div>
        </div>
    )
}
