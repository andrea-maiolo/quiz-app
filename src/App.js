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

  React.useEffect(()=>{
    decoding()
  },[allQuestions])

  const setId = function (){
    if(fetchQuestions.length != 0 ){
      const updateQuestions = fetchQuestions.map(question =>{
        return {
          ...question,
          id: nanoid()
        }
      })
    setAllQuestions(updateQuestions)
    }
  }

  //new code

  const decoding = function(){
    let entireArrayOfAnswers = []
    for (let i = 0; i < allQuestions.length; i++) {
      const q = allQuestions[i];
      let answersArray = [...q.incorrect_answers]
      let randomIndex = Math.floor(Math.random() * answersArray.length)
      answersArray.splice(randomIndex, 0, q.correct_answer)
      entireArrayOfAnswers.push(answersArray)
    }
    const newArray = allQuestions.map(e=>{
      let i = allQuestions.indexOf(e)
      return {
        ...e,
        answersArray: entireArrayOfAnswers[i]
      }
    })
    //how can you update aq if this function is dependent upen it? EFFECT  
    // (allQuestions)
  }
    
  
      
//end new code

  // React.useEffect(()=>{
  //   formCheck()
  // },[allQuestions])

  // function formCheck(){
  //   if(allQuestions.length !=0){
  //     for (let i = 0; i < allQuestions.length; i++) {
  //       const element = allQuestions[i].id;
  //       setFormData(prevFormData => {
  //         return{
  //           ...prevFormData,
  //           [element]: ""
  //         }
  //       })
  //     }
  //   }
  // }

  //   function handleChange(e) {
  //     const answer = e.target.value
  //     const referenceQuestion = e.target.name

  //     if(formData[referenceQuestion] != null){
  //       setFormData(prevFormData => {
  //             return {
  //               ...prevFormData,
  //               [referenceQuestion] : answer
  //             }
  //           })
  //           console.log(formData)
  //     }
  //   }  

  // const question = allQuestions.map(item => {
  //   return (
  //     <Question 
  //       {...item}
  //       key={item.id}
  //       onChange={handleChange}
  //       formData = {formData}
  //     />
  //   )
  // })        

  return (
    <div className="App">
      <form>
        h
        {/* {question} */}
        {/* <button onClick={handleSubmission}>Submit</button> */}
      </form>
    </div>
  );
}

export default App;
{/* <StartPage /> */}