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

// const ProfileData = (props) => {
const ProfileData = () => {
    // const [profileData, setData] = useState(props.profileData);

    // use magic to get data from mongo user data
    // useEffect(() => {
    //     const loadDataFromServer = async () => {
    //         const response = await fetch('/getProfile');
    //         const data = await response.json();
    //         setData(data.profileData);
    //     };
    //     loadDataFromServer();
    // }, [props.reloadData]);

    const profileData = {
        img: "../hosted/img/bleeter-sheep.png",
        displayName: "fluffy",
        username: "fluffyo234856"
    };

    // display data - format here
    return (
        <div id="data"
                style={{display: "grid", gridTemplateColumns: "1fr 1fr", gridTemplateRows: "1fr 1fr", gap: "15px"}}>
            <div style={{gridRow: "span 2", padding: "20px"}}>
                <img src={profileData.img} /></div>
            <div id="top-right" style={{padding: "20px"}}>
                {profileData.displayName}
            </div>
            <div id='bottom-right' style={{padding: "20px"}}>
                @{profileData.username}
            </div>
        </div>
    );
};

const PageContent = () => {
    // const [reloadData, setReloadData] = useState(false);

    return (
        <div>
            <div id='profileHeader'>
                {/* <ProfileData data={[]} reloadData={reloadData} /> */}
                <ProfileData />
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