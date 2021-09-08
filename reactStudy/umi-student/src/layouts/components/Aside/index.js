import React from 'react'
import { NavLink } from 'umi';
import style from './index.css'

export default function index() {
    return (
        <ul className={style.side}>
            <li className={style.list}><NavLink exact activeClassName={style.active} to='/'>首页</NavLink></li>
            <li className={style.list}><NavLink exact activeClassName={style.active} to='/student'>学生列表页</NavLink></li>
            <li className={style.list}><NavLink exact activeClassName={style.active} to='/student/add'>添加学生页</NavLink></li>
            <li className={style.list}><NavLink exact activeClassName={style.active} to='/student/123'>编辑学生页</NavLink></li>      
        </ul>
    )
}
