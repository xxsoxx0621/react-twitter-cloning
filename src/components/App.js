import {AppRouter} from "./Router";
import {useEffect, useState} from "react";
import {authService} from "../fbase";


function App() {
    // 유저를 가져와서 로그인 여부를 판단해야함
    const [init, setInit] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userObj, setUserObj] = useState(null);

    useEffect(() => {
        authService.onAuthStateChanged((user) => {
            if(user) {
                setIsLoggedIn(true);
                setUserObj(user);
            }else{
                setIsLoggedIn(false);
            }
            setInit(true);
        })
    },[])
    return (
        <>
            {init ? <AppRouter isLoggedIn={isLoggedIn} userObj={userObj}/> : "Initializing..."}
            <footer> &copy; {new Date().getFullYear()} Nwitter</footer>
        </>
    );
}

export default App;
