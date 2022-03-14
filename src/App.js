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

    function handleChange(e) {
      const answer = e.target.value
      const referenceQuestion = e.target.name
      console.log(answer)
      
      for(let i=0; i<allQuestions.length; i++){
        const curQ = allQuestions[i]
        if(curQ.id == referenceQuestion){
          setFormData(prevFormData => {
            return {
              ...prevFormData,
              [curQ.id]:answer
            }
          })
        }
      }
    }  

    // function handleSubmission(e){
    //   e.preventDefault()
    //   console.log(formData)
    // }

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