import React from 'react';
import {nanoid} from 'nanoid';
import StartPage from './components/StartPage';
import Question from './components/Question'

function App() {

  const [fetchQuestions, setFetchQuestions] = React.useState([])
  const [allQuestions, setAllQuestions] = React.useState([])
  const [formData, setFormData] = React.useState({})

  React.useEffect(()=>{
      fetch("https://opentdb.com/api.php?amount=5")
      .then(response => response.json())
      .then(data => setFetchQuestions(data.results))
  },[])

  React.useEffect(()=>{
    setId()
  },[fetchQuestions])

  const setId = function (){
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

  React.useEffect(()=>{
    formCreation()
  },[allQuestions])

  function formCreation(){
    if(allQuestions.length !=0){
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

    function handleChange(e) {
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

    
    function handleSubmission(e){
      e.preventDefault()
      let counter = 0
      for (const property in formData) {
        for (let i = 0; i < allQuestions.length; i++) {
          const element = allQuestions[i];
          if(element.id == property){
            if(element.correct_answer == formData[property]){
              counter++
            }
          }
        }
      }
      console.log(counter)
      return counter
    }

  const question = allQuestions.map(item => {
    return (
      <Question 
        {...item}
        key={item.id}
        onChange={handleChange}
        formData = {formData}
      />
    )
  })        

  return (
    <div className="App">
      <form>
        {question}
        <button onClick={handleSubmission}>Submit</button>
        { && <p>{counter}</p>}
      </form>
    </div>
  );
}

export default App;
{/* <StartPage /> */}