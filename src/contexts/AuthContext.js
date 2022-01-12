import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { auth } from '../firebase';

//In order to see the data we are getting back from google we need to react context



const AuthContext = React.createContext();
//this is the function that will export our contexts
//we are creating the auth context here
//then passing it into the use Context react hook
//this will give us access to the populated AuthContext when we call this function within our files
export const useAuth = () => useContext(AuthContext);

//manage the users data
export const AuthProvider = ({ children }) => {
    const[loading, setLoading] = useState(true);
    const [user,setUser] = useState(null);
    //history will be a react hook to navigate somwhere
    const history = useHistory();

    //a funciton that takes in a callback function
    //and takes in a 2nd param called a dependecy array/list 
    //when things mentioned in the dependcy list change that this callback will be called
    //SO WE want to call this when the User obj chngs and the history changes(renavigate)
    useEffect(() => {
        //.onauthstatechange is whenever the stat changes
        //grabbin user from firebase authentication
        auth.onAuthStateChanged((user) => {
            //this callback function gives us the user data
            setUser(user);
            setLoading(false);
            if(user) history.push('/chats');//renavitgate to chat app
        })
    }, [user, history]);

    //when working with auth context u need to have 1 value object and it has user property
    const value = { user };

    //if not loading then show children
    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )

}