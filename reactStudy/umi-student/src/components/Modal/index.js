import React from 'react';
import PropTypes from 'prop-types';
import style from './Modal.css';

export default class Modal extends React.Component{
    // 默认属性
    static defaultProps = {
        bg:'rgba(0,0,0,.3)'
    }

    // 静态检查
    static propTypes = {
        bg: PropTypes.string,
        children: PropTypes.node.isRequired,
        onClick: PropTypes.func
    }

    handleClick = (e) => {
        if(e.target.className === style.modal){
            this.props.onClick();
        }
    }

    render(){
        return (
            <div className={style.modal} 
                style={{
                    background:this.props.bg
                }}
                onClick={this.handleClick}
            >
                <div className={style.modalCenter}>
                    {this.props.children}
                </div>
            </div>
        )
    }
}
