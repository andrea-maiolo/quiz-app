import React from 'react';
import {nanoid} from 'nanoid';
import StartPage from './components/StartPage';
import Question from './components/Question'

function App() {

  const [allQuestions, setAllQuestions] = React.useState([])

  React.useEffect(function() {
    fetch("https://opentdb.com/api.php?amount=5&encode=url3986")
      .then(res => res.json())
      .then(data => setAllQuestions(data.results))
  },[0])


  //setAllQuestions need to be used
    for(let i = 0; i < allQuestions.length; i++) {
      let questionId = nanoid()
      allQuestions[i].id = questionId
  }
  
  const [formData, setFormData] = React.useState({})


  // console.log(formData)
    function handleChange(event) {
       for(let i=0; i< allQuestions.length; i++) {
         let myCurrentObject = allQuestions[i]
         if(allQuestions[i].id == event.target.name){
           const currentAnswer = (`${allQuestions.indexOf(myCurrentObject)}`)
           formData[currentAnswer] = event.target.value
         }
       }
      //  if(event.target.name === allQuestions[0].id){
      //    formData.allQuestions[0].id = event.target.value
      //  }
       console.log(formData)
      //  console.log(formData)
      // const {name, value, type, checked} = event.target
      //   setFormData(prevFormData => {
      //       return {
      //           ...prevFormData,
      //           [name]: value
      //       }
      //   })
    }

  const question = allQuestions.map(item => {
    return (
      <Question 
        {...item}
        key={item.id}
        onChange={handleChange}
      />
    )
  })        

  return (
    <div className="App">
      <form>
        {question}
      </form>
    </div>
  );
}

export default App;
{/* <StartPage /> */}