import React, {useState, createContext} from 'react'

export const Authcontext = createContext();

export const Authprovider = ({children}) => {

    const [isLoggedin, setIsLoggedin] = useState(false);

    const login = (token) => {
        localStorage.setItem('token', token);
        setIsLoggedin(true);
    };


    const logout = () => {
        localStorage.removeItem('token');
        setIsLoggedin(false);
    };

    return (
        <Authcontext.Provider value={{login, logout, isLoggedin}}>
            {children}
        </Authcontext.Provider>
    )
}