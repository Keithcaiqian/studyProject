import React, { PureComponent } from 'react'
import style from './index.css'
export default class StudentTable extends PureComponent {


    render() {
        const trList = this.props.studentList.map(item => (
            <tr key={item.id}>
                <td>{item.sNo}</td>
                <td>{item.name}</td>
                <td>{item.sex === 1 ? '女' : '男'}</td>
                <td>{item.birth}</td>
                <td>{item.email}</td>
                <td>
                    <a href={`/students/${item.sNo}`}>详情</a>
                </td>
            </tr>
        ))
        return (
            <table className={style.studentTable}>
                <thead>
                    <tr>
                        <th>学号</th>
                        <th>姓名</th>
                        <th>性别</th>
                        <th>出生年份</th>
                        <th>邮箱</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    {trList}
                </tbody>
            </table>
        )
    }
}
