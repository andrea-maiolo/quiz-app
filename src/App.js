import React from 'react';
import {nanoid} from 'nanoid';
import StartPage from './components/StartPage';
import Question from './components/Question'

function App() {

  const [fetchQuestions, setFetchQuestions] = React.useState([])
  const [allQuestions, setAllQuestions] = React.useState([])
  const [formData, setFormData] = React.useState({})

  React.useEffect(()=>{
    console.log("fetching")
      fetch("https://opentdb.com/api.php?amount=5&encode=url3986")
      .then(response => response.json())
      .then(data => setFetchQuestions(data.results))
  },[])

  React.useEffect(()=>{
    setId()
    decodeQuestion()
  },[fetchQuestions])

  function setId(){
    if(fetchQuestions.length != 0 ){
      const updateQuestions = fetchQuestions.map(question =>{
        return {
          ...question,
          id: nanoid()
        }
      })
    setAllQuestions(updateQuestions)
    console.log("questions ready")
    }
  }

  //new code

  function decodeQuestion(){
    console.log("running decoding")
    if(fetchQuestions.length != 0){
      let decodedCategory = ""
      let decodedQuestion = ""
      let decodedCorrect = "" 
      let decodedIncorrect = "" 
      let answersArray =[]
      for (let i = 0; i < fetchQuestions.length; i++) {
        const questionToDecode = fetchQuestions[i];
        decodedCategory = (decodeURI(questionToDecode.category)).split('\%')[0]
        decodedQuestion = decodeURI(questionToDecode.question)
        decodedCorrect = decodeURI(questionToDecode.correct_answer)
        decodedIncorrect =  decodeURI(questionToDecode.incorrect_answers)
        answersArray = decodedIncorrect.split(",")
        let randomIndex = Math.floor(Math.random() * answersArray.length)
        answersArray.splice(randomIndex,0, decodedCorrect)
        
          const questionsWithIdAndDecoded = fetchQuestions.map(question =>{
            return {
              ...question,
              category: decodedCategory,
              question: decodedQuestion,
            }
          })
      setAllQuestions(questionsWithIdAndDecoded)
      console.log(questionsWithIdAndDecoded)

      //all questions are the same like this
      }
    }
  }
     

     
//end new code

  React.useEffect(()=>{
    formCheck()
  },[allQuestions])

  function formCheck(){
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
            console.log(formData)
      }
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
        {/* <button onClick={handleSubmission}>Submit</button> */}
      </form>
    </div>
  );
}

export default App;
{/* <StartPage /> */}