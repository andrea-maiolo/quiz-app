import React from 'react';

function Question(props) {  
    let decodedCategory = (decodeURI(props.category)).split('\%')[0]
    let decodedQuestion = decodeURI(props.question)
    decodedQuestion = decodedQuestion.replace("%3F", "?")
    decodedQuestion = decodedQuestion.replace("%3A", ":")
    decodedQuestion = decodedQuestion.replace("%2C", ",")
    let decodedCorrect = decodeURI(props.correct_answer)
    let decodedIncorrect = decodeURI(props.incorrect_answers)
    let answersArray = decodedIncorrect.split(",")
    let randomIndex = Math.floor(Math.random() * answersArray.length)
    answersArray.splice(randomIndex,0, decodedCorrect)
     
 
    console.log(props.formData[props.id]) 
    return(
        <div className="singleQuestion">
            <h3>Category: {decodedCategory}</h3>
            <p>Difficulty: {props.difficulty}</p>
            <p>Question: {decodedQuestion}</p>
                <input 
                    type="radio"
                    id={answersArray[0]}
                    value={answersArray[0]}
                    name={props.id}
                    checked={props.formData[props.id] === props.id}
                    onChange={props.onChange}
                />
                <label htmlFor={answersArray[0]}>{answersArray[0]}</label>
                <br/>
                <input 
                    type="radio"
                    id={answersArray[1]}
                    value={answersArray[1]}
                    name={props.id}
                    // checked={formData.decodedQuestion === answersArray[1]}
                    onChange={props.onChange}
                />
                <label htmlFor={answersArray[1]}>{answersArray[1]}</label>
                <br />
                {/* third choice if exist*/}
                {answersArray[2] && <input 
                    type="radio"
                    id={answersArray[2]}
                    value={answersArray[2]}
                    name={props.id}
                    // checked={formData.decodedQuestion === answersArray[2]}
                    onChange={props.onChange}   
                />}
                {answersArray [2] && <label htmlFor={answersArray[2]}>{answersArray[2]}</label>} 
                {answersArray [2] && <br/>}
                {/* forth choice if exist*/}
                {answersArray[3] && <input 
                    type="radio"
                    id={answersArray[3]} 
                    value={answersArray[3]} 
                    name={props.id}   
                    // checked={formData.decodedQuestion === answersArray[3]}
                    onChange={props.onChange} 
                />}
                {answersArray [3] && <label htmlFor={answersArray[3]}>{answersArray[3]}</label> } 
                {answersArray [3] && <br/>} 
        </div>
    )
}

export default Question