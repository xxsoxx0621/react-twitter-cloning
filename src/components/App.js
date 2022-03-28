import {AppRouter} from "./Router";
import {useEffect, useState} from "react";
import {authService} from "../fbase";
import 'App.css';

function App() {
    // 유저를 가져와서 로그인 여부를 판단해야함
    const [init, setInit] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userObj, setUserObj] = useState(null);

    useEffect(() => {
        authService.onAuthStateChanged((user) => {
            if (user) {
                setIsLoggedIn(true);
                setUserObj({
                    displayName: user.displayName,
                    uid: user.uid,
                    updateProfile: (args) => user.updateProfile(args),
                });
            }else {
                setUserObj(null);
                setIsLoggedIn(false);
            }
            setInit(true);
        });
    }, []);

    // refreshing the user
    const refreshUser = () => {
        const user = authService.currentUser;
        setUserObj({
            displayName: user.displayName,
            uid: user.uid,
            updateProfile: (args) => user.updateProfile(args),
        });
    };
    return (
        <>
            {init ?
                <AppRouter refreshUser={refreshUser} isLoggedIn={isLoggedIn} userObj={userObj}/> : "Initializing..."}
            {/*<footer> &copy; {new Date().getFullYear()} Nwitter</footer>*/}
        </>
    );
}

export default App;
