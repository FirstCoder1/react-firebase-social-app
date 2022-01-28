import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useHistory, useLocation } from 'react-router';
import './menu-layout.css';
import menuIcon from '../../assets/icons/menu.png';
import { useFirestore, useFirestoreConnect } from 'react-redux-firebase';
import { useSelector } from 'react-redux';




export function MenuLayout(props) {

    const { user } = props;
    const location = useLocation();

    const [channelName, setChannelName] = useState([]);
    const fs = useFirestore();


    const channelsQuery = {
        collection: "channels",
        where: ['domain', '==', user.email.split('@')[1]]
    }


    useFirestoreConnect(() => [channelsQuery]);
    const channels = useSelector(state => state.firestore.data.channels);



    function addChannel() {
        var domain = user.email.split('@')[1];
        var data = { name: channelName, createdBy: user.displayName, email: user.email, domain };
        fs.collection("channels").add(data);
        setChannelName('');
    }


    function isActive(path) {
        if (location.pathname == path) {
            return "navigation-item-active";
        }
        else
            return "";
    }
    return (
        <div className='navigation-menu-container'>
            <div className='navigation-title'>
                CHANNELS
            </div>
            <div className='channel-form'>
                <input value={channelName} onChange={(e) => setChannelName(e.target.value)} id='channel-input' />
                <button onClick={addChannel} id='add-channel-button'>Add Channel</button>
            </div>
            <div className='navigation-list'>
                {
                    channels != null && Object.values(channels).length > 0 ?

                        Object.keys(channels).map((key) => {
                            var i = channels[key];
                            return <Link to={'/channel/' + key} onClick={() => props.setChannel({ ...i, id: key })}>
                                <div className={'navigation-item ' + isActive('/channel/' + key)}>
                                    {i.name}
                                </div>
                            </Link>
                        }) : null
                }
            </div>
        </div>
    )
}
