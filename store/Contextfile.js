import React, { useState } from "react"
const AuthContext = React.createContext({
    token: '',
    isLogin: false,
    login: (token) => { },
    logout: () => { },

})
export const AuthContextProvider = (props) => {
    const inital = localStorage.getItem('token')
    const [token, settoken] = useState(inital);
    const userislogin = !!token;
    const loginHandler = (token, time) => {

        settoken(token)
        localStorage.setItem('token', token);
    };
    const logoutHandler = () => {
        settoken(null)
        localStorage.clear();
    };
    const contextvalue = {
        token: token,
        isLogin: userislogin,
        login: loginHandler,
        logout: logoutHandler
    }
    return <AuthContext.Provider value={contextvalue}>
        {props.children}
    </AuthContext.Provider>
}
export default AuthContext