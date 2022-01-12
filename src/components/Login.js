import React from 'react';
import { GoogleOutlined } from '@ant-design/icons';
import "firebase/app";

import { auth } from '../firebase';
import firebase from 'firebase/app';

const Login = () => {
    return (
        <div className="container p-5 .align-items-center">
            <div className="container rounded border border-3 shadow-lg p-3 mb-5 bg-body rounded .align-items-center">
                <div className=".align-items-center">
                    <h2 className=".align-items-center">ChillZone :P</h2>
                    <h3 className=".align-items-center">Chat App</h3>
                    <div className="btn btn-outline-info google .align-items-center" onClick={() => auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider())}> 
                        <GoogleOutlined /> Sign In With Google
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;