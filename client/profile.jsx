const helper = require('./helper.js');
const React = require('react');
const { useState, useEffect } = React;
const { createRoot } = require('react-dom/client');

const ChangePasswordForm = () => {
    return(
        <form
            id="signupForm"
            name="signupForm"
            onSubmit={handleSignup}
            action="/signup"
            method="POST"
            className="mainForm"
        >
            <label htmlFor="username">Username: </label>
            <input id="user" type="text" name="username" placeholder="username" />
            <label htmlFor="pass">Password: </label>
            <input id="pass" type="password" name="pass" placeholder="password" />
            <label htmlFor="pass">Password: </label>
            <input id="pass2" type="password" name="pass2" placeholder="retype password" />
            <input className="formSubmit" type="submit" value="Sign up" />
        </form>
    );
};

const ProfileData = (props) => {
    const [profileData, setData] = useState({
        img: 'assets/img/bleeter-sheep.png',
        // displayName: 'M Wazowski',
        username: 'm-wazowski'
    });

    // use magic to get data from mongo user data
    useEffect(() => {
        const loadDataFromServer = async () => {
            const response = await fetch('/getProfile');
            const data = await response.json();
            setData(data.profileData);
        };
        loadDataFromServer();
    }, [props.reloadData]);

    // test data
    // const profileData = {
    //     img: "./path",
    //     displayName: "fluffy",
    //     username: "fluffyo234856"
    // };

    // display data - format here
    return (
        <div id="data"
                style={{display: "grid", gridTemplateColumns: "1fr 1fr", gridTemplateRows: "1fr", gap: "15px", margin: "30px 0"}}>
            <div id="left" style={{placeSelf: "center end"}}>
                <img src={profileData.img} alt={`${profileData.username}'s avatar`} />
                {/* <img src="assets/img/bleeter-sheep.png" alt={`${profileData.username}'s avatar`} /> */}
            </div>
            <div id="right">
                {/* {profileData.displayName}<br/> */}
                @{profileData.username}
            </div>
        </div>
    );
};

const PageContent = () => {
    const [reloadData, setReloadData] = useState(false);

    return (
        <div>
            <div id='profileHeader'>
                <ProfileData reloadData={reloadData} />
                {/* <ProfileData /> */}
            </div>
            {/*
            <div id='changePasswordFormHolder'>
                <ChangePasswordForm triggerReload={() => setReloadData(!reloadData)} />
            </div>
            */}
            <a href="/logout">Log out</a>
        </div>
    );
};

const init = () => {
    const root = createRoot(document.getElementById('content'));
    root.render(<PageContent />);
};

window.onload = init;