const helper = require('./helper.js');
const React = require('react');
const { useState, useEffect } = React;
const { createRoot } = require('react-dom/client');

const handleDomo = (e, onDomoAdded) => {
    e.preventDefault();
    helper.hideError();

    const content = e.target.querySelector('#postContent').value;
    // const age = e.target.querySelector('#domoAge').value;
    // const level = e.target.querySelector('#domoLevel').value;

    if (!content) {
        helper.handleError('empty bleet!');
        return false;
    }

    helper.sendPost(e.target.action, { content }, onDomoAdded);
    return false;
};

// const handleLevelUp = (onLevelUp) => {
//     helper.hideError();
//     helper.sendPost('/levelup', {}, onLevelUp);
// };

const DomoForm = (props) => {
    return (
        <form
            id="domoForm"
            onSubmit={(e) => handleDomo(e, props.triggerReload)}
            name="domoForm"
            action="/maker"
            method="POST"
            className="domoForm"
        >
            {/* <label htmlFor="postContent">Name: </label> */}
            <input id="postContent" type="text" name="name" placeholder="your bleet here" />
            {/* <label htmlFor="domoAge">Age: </label>
            <input id="domoAge" type="number" min="0" name="age" /> */}
            <input className="makeDomoSubmit" type="submit" value="Bleet" />
            {/* <button
                type="button"
                className="levelUpButton"
                onClick={() => handleLevelUp(props.triggerReload)}
            >
                Level Up All Domos
            </button> */}
        </form>
    );
};

const DomoList = (props) => {
    const [domos, setDomos] = useState(props.domos);

    useEffect(() => {
        const loadDomosFromServer = async () => {
            const response = await fetch('/getDomos');
            const data = await response.json();
            setDomos(data.domos);
        };
        loadDomosFromServer();
    }, [props.reloadDomos]);

    if (domos.length === 0) {
        return (
            <div className="domoList">
                <h3 className="emptyDomo">No Bleets Yet!</h3>
            </div>
        );
    }

    const domoNodes = domos.map((domo) => {
        return (
            // TODO WATCH FOR ERROR - might be domo._id / domo.id
            <div key={domo._id} className="domo">
                <img src="/assets/img/domoface.jpeg" alt="domo face" className="domoFace" />
                <h3 className="postContent">{domo.content}</h3>
                {/* <h3 className="domoAge">Age: {domo.age}</h3>
                <h3 className="domoLevel">Level: {domo.level}</h3> */}
            </div>
        );
    });

    return (
        <div className="domoList">
            {domoNodes}
        </div>
    );
};

const App = () => {
    const [reloadDomos, setReloadDomos] = useState(false);

    return (
        <div>
            <div id="makeDomo">
                <DomoForm triggerReload={() => setReloadDomos(!reloadDomos)} />
            </div>
            <div id="domos">
                <DomoList domos={[]} reloadDomos={reloadDomos} />
            </div>
        </div>
    );
};

const init = () => {
    const root = createRoot(document.getElementById('app'));
    root.render(<App />);
};

window.onload = init;