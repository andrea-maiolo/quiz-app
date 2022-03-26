import React from 'react';

function Question(props) {  
    return(
        <div className="singleQuestion">
            <h3 id="sqCategory">Category: {props.category}</h3>
            <p className="sqQuestion">Question: {props.question}</p>
            <div className="allInputs">
                <input 
                    className="qInput"
                    type="radio"
                    id={props.answersArray[0]}
                    value={props.answersArray[0]}
                    name={props.id}
                    checked={props.formData[props.id] == props.answersArray[0]}
                    onChange={props.onChange}
                />
                <label className="qLabel" htmlFor={props.answersArray[0]}>{props.answersArray[0]}</label>
                <br/>
                <input 
                    className="qInput"
                    type="radio"
                    id={props.answersArray[1]}
                    value={props.answersArray[1]}
                    name={props.id}
                    checked={props.formData[props.id] === props.answersArray[1]}
                    onChange={props.onChange}
                />
                <label className="qLabel" htmlFor={props.answersArray[1]}>{props.answersArray[1]}</label>
                <br />
                {/* third choice if exist*/}
                {props.answersArray[2] && <input 
                    className="qInput"
                    type="radio"
                    id={props.answersArray[2]}
                    value={props.answersArray[2]}
                    name={props.id}
                    checked={props.formData[props.id] === props.answersArray[2]}
                    onChange={props.onChange}   
                />}
                {props.answersArray [2] && <label className="qLabel" htmlFor={props.answersArray[2]}>{props.answersArray[2]}</label>} 
                {props.answersArray [2] && <br/>}
                {/* forth choice if exist*/}
                {props.answersArray[3] && <input 
                    className="qInput"
                    type="radio"
                    id={props.answersArray[3]} 
                    value={props.answersArray[3]} 
                    name={props.id}   
                    checked={props.formData[props.id] === props.answersArray[3]}
                    onChange={props.onChange} 
                />}
                {props.answersArray [3] && <label className="qLabel" htmlFor={props.answersArray[3]}>{props.answersArray[3]}</label> } 
                {props.answersArray [3] && <br/>}
            </div> 
        </div>
    )
}

export default Question