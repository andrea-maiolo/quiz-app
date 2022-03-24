import React from 'react';

function InitialPage(props){
    return(
        <div className="initial-page">
            <h1>Quiz time!</h1>
            <p>This is a project created in react. Enjoy the quiz!</p>
            <button onClick={props.handleDisplay}>Start quiz</button>
        </div>
    )
}


export default InitialPage;