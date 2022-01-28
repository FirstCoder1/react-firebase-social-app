import React, { Suspense } from 'react';
import { MenuLayout, MobileMenuLayout } from './menu-layout/menu-layout';
import { Link, Switch, Route, HashRouter, BrowserRouter } from 'react-router-dom';
import { Router } from 'react-router';
import { createBrowserHistory, BrowserHistoryBuildOptions } from 'history';
import './layout.css'
import { Channels } from '../pages/channels/channels';


const baseUrl = '/';
const browHistory = {
    basename : baseUrl || undefined
}

const history = createBrowserHistory(browHistory);

export function Layout(props){

    const [ channel, setChannel ] = React.useState(null);

    return (
        <BrowserRouter>
            <div className='container'>
                <div className='desktop-sidebar'>
                    <MenuLayout {...props} setChannel={setChannel} />
                </div>
                <div className='content' style={{ width : '100%', height : '100%'}}>
                      { channel != null ?  <Channels {...props} channel={channel} />   : null } 
                </div>
            </div>
         </BrowserRouter>

    )
}