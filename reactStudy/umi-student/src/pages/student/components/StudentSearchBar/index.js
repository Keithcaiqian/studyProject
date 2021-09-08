import React, { PureComponent } from 'react'

export default class StudentSearchBar extends PureComponent {

    constructor(props){
        super(props)
        this.state = {
            key:'',
            sex:-1,
            ...this.props.defaultValue
        }
    }

    handleRadioChange = e => {
        this.setState({
            sex: +e.target.value
        })
    }

    handleSearch = () => {
        //抛出事件
        if(this.props.onSearch){
            this.props.onSearch(this.state);
        }
    }

    render() {
    
        return (
            <div>
                关键字：
                <input type="text" value={this.state.key}
                    onChange={e => {
                        this.setState({
                            key: e.target.value
                        })
                    }}
                /> 
                <label>
                    <input checked={this.state.sex === -1} value={-1} onChange={this.handleRadioChange} type="radio" name='sex'/> 不限
                </label>
                <label>
                    <input checked={this.state.sex === 0} value={0} onChange={this.handleRadioChange} type="radio" name='sex'/> 男
                </label>
                <label>
                    <input checked={this.state.sex === 1} value={1} onChange={this.handleRadioChange} type="radio" name='sex'/> 女
                </label>
                <button onClick={this.handleSearch}>搜索</button>
            </div>
        )
    }
}
