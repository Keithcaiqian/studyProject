import React from 'react'
import style from './index.css'

export default function index({ header,aside,main }) {
    return (
        <div className={style.layout}>
            <div className={style.header}>{header}</div>
            <div className={style.body}>
                <div className={style.aside}>{aside}</div>
                <div className={style.main}>{main}</div>
            </div>
        </div>
    )
}
