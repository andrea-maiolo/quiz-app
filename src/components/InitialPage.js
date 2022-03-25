import React from 'react';

function InitialPage(props){
    return(
        <div className="initial-page">
            <h1 id="initialTitle">Quiz time!</h1>
            <p id="initialDescription">This is a project created in react. Enjoy the quiz!</p>
            <button id="initialButton" onClick={props.handleDisplay}>Start quiz</button>
        </div>
    )
}


export default InitialPage;