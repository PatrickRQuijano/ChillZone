import React, { useRef, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { ChatEngine } from 'react-chat-engine';
import { auth } from '../firebase';

import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';

const Chats = () => {
    const history = useHistory();
    //get user data
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);

    //handlers
    const handleLogout = async () => {
        await auth.signOut();

        history.push('/');
    }

    const getFile = async (url) => {
        const response = await fetch(url);
        const data = await response.blob(); //blob contains image

        return new File([data], "userPhoto.jpg", { type: 'image/jpeg' })
    }

    useEffect(() => {
        if(!user) {
            history.push('/');
            return;
        }

        //if we do have a user then
        axios.get('https://api.chatengine.io/users/me', {
            headers: {
                "project-id": "24e985db-5c21-4a42-8450-3c35bb70d194",
                "user-name": user.email,
                "user-secret": user.uid,
            }
        })
        .then(() => {
            setLoading(false);
        })
        .catch(() => {
            //incase they havent logged in before
            let formdata = new FormData();
            formdata.append('email', user.email);
            formdata.append('username', user.email);
            formdata.append('secret', user.uid);

            //calling api to get image
            getFile(user.photoURL)
                .then((avatar) => {
                    formdata.append('avatar', avatar, avatar.name);
                    axios.post('https://api.chatengine.io/users/', formdata, {
                        headers: {"private-key": "e01250f1-a6a0-487c-990f-6705e51fedf2"}
                    } )
                    .then(() => setLoading(false)) //if user creation is succsful or not
                    .catch((error) => console.log(error))
                })
        })
    }, [user, history]);

    if(!user || loading) return 'Loading...';

    return (
        <div className="chats-page">
                <div className="nav-bar">
                    <div className="logo-tab">
                        ChillZone
                    </div>
                    <div onClick={handleLogout}className="btn btn-outline-danger logout-tab">
                        Logout
                    </div>
                </div>

            <ChatEngine
                height="calc(100vh - 66px)"
                projectID="24e985db-5c21-4a42-8450-3c35bb70d194"
                userName= {user.email}
                userSecret= {user.uid}
            />
        </div>
    )
}

export default Chats;