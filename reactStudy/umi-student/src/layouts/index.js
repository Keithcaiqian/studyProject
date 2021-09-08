import React from 'react'
import Layout from './components/Layout'
import HeaderContainer from './_containers/HeaderContainer'
import Aside from './components/Aside'

export default function index(props) {
    if(props.location.pathname === '/login'){
        return props.children
    }else{
        return (
            <Layout 
                header={ <HeaderContainer/> }
                aside={ <Aside/> }
                main={
                    <div>
                        {props.children}
                    </div>
                }
            />
        )
    }
}
