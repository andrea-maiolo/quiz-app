import React from 'react';
import {nanoid} from 'nanoid';
import InitialPage from './components/InitialPage';
import Question from './components/Question'

function App() {
  const [fetchQuestions, setFetchQuestions] = React.useState([])
  const [allQuestions, setAllQuestions] = React.useState([])
  const [formData, setFormData] = React.useState({})
  const [result, setResult] = React.useState("")

  React.useEffect(()=>{
      fetch("https://opentdb.com/api.php?amount=5")
      .then(response => response.json())
      .then(data => setFetchQuestions(data.results))
  },[])

  React.useEffect(()=>{
    formatArrayOfQuestions()
  },[fetchQuestions])

  React.useEffect(()=>{
    formCreation()
  },[allQuestions])

  const formatArrayOfQuestions = function (){
    if(fetchQuestions.length != 0 ){
      let entireArrayOfAnswers = []
      for (let i = 0; i < fetchQuestions.length; i++) {
        const q = fetchQuestions[i];
        let answersArray = [...q.incorrect_answers]
        let randomIndex = Math.floor(Math.random() * answersArray.length)
        answersArray.splice(randomIndex, 0, q.correct_answer)
        entireArrayOfAnswers.push(answersArray)
      }
      const updateQuestions = fetchQuestions.map(e=>{
        let i = fetchQuestions.indexOf(e)
        return {
          ...e,
          id: nanoid(),
          answersArray: entireArrayOfAnswers[i]
        }
      })
    setAllQuestions(updateQuestions)
    }
  }

  const formCreation = function (){
    if(allQuestions.length !==0){
      for (let i = 0; i < allQuestions.length; i++) {
        const element = allQuestions[i].id;
        setFormData(prevFormData => {
          return{
            ...prevFormData,
            [element]: ""
          }
        })
      }
    }
  }

  const handleInputOfAnswer = function(e) {
    const answer = e.target.value
    const referenceQuestion = e.target.name

    if(formData[referenceQuestion] != null){
      setFormData(prevFormData => {
        return {
          ...prevFormData,
          [referenceQuestion] : answer
          }
      })
    }
  }  

  const handleSubmission = function(e){
    e.preventDefault()
    let counter = 0
    for (const property in formData) {
      for (let i = 0; i < allQuestions.length; i++) {
        const element = allQuestions[i];
        if(element.id === property){
          if(element.correct_answer === formData[property]){
            counter++
          }
        }
      }
    }
    let myP = `You answerd ${counter}/5 correctly`
    let subButton = document.querySelector("#subButton")
    subButton.style.display="none"
    setResult(myP)
  }

  const handleDisplay = function(){
    let sP = document.querySelector(".startPage")
    sP.style.display = 'none'
    let qP = document.querySelector(".questions-page")
    qP.style.display = 'block'  
  }

  const question = allQuestions.map(item => {
    return (
      <Question 
        {...item}
        key={item.id}
        onChange={handleInputOfAnswer}
        formData = {formData}
      />
    )
  }) 

  return (
    <div className="App">
      <div className="startPage">
        <InitialPage handleDisplay={handleDisplay}/>
      </div>
      <div className="questions-page">
        <div className="questions">
          <form id="form">
            {question}
            <button id="subButton" onClick={handleSubmission}>Submit</button>
            {result !== "" &&
            <p id="finalResult">{result}</p>
            }
            {result !== "" &&
            <button id="playAgain">Play Again</button>
            }
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;