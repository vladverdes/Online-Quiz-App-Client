import React, { useEffect, useState } from "react"
import {useNavigate, useLocation} from "react-router-dom"

const Quiz = () =>{
    const[quizQuestions,setQuizQuestions] = useState([{id:"",correctAnswears:"",question:"",questionType:""}])
    const[selectedAnswears,setSelectedAnswears] = useState([{id:"",answear:[""]}])
    const[currentQuestionIndex,setCurrentQuestionIndex] = useState(0)
    const[totalScores,setTotalScores] = useState(0)
    const location = useLocation()
    const navigate = useNavigate()
    const{selectedSubject, selectedNumOfQuestions} = location.state
    useEffect(() => {
        fetchQuizData()
    },[])

const fetchQuizData = async() =>{
    if(selectedNumOfQuestions && selectedSubject){
        const questions = await fetchQuizForUser(selectedNumOfQuestions, selectedSubject)
        setQuizQuestions(questions)
    }
}

const handleAnswearChange = (questionId, answear) =>{
    setSelectedAnswears((prevAnswears) => {
        const existingAnswearIndex = prevAnswears.findIndex((answearObj) => answearObj.id === questionId)
        const selectedAnswear = Array.isArray(answear)
        ? answear.map((a) => a.charAt(0)) 
        : answear.charAt(0)

        if(existingAnswearIndex !== -1){
            const updatedAnswear = [...prevAnswears]
            updatedAnswear[existingAnswearIndex] = {id : questionId, answear : selectedAnswear}
            return updatedAnswear
        }else{
            const newAnswear = {id: questionId, answear : selectedAnswear}
            return [...prevAnswears,newAnswear]


        }
    })
}
    const isChecked = (questionId, choice) =>{
        const selectedAnswear = selectedAnswears.find((answear) => answear.id === questionId)
        if(!selectedAnswear){
            return false
        }
        if(Array.isArray(selectedAnswear.answear)){
            return selectedAnswear.answear.includes(choice.charAt(0))
        }
        return selectedAnswear.answear === choice.charAt(0)
    }

    const handleCheckboxChange = (questionId,choice) =>{
        selectedAnswears((prevAnswears) => {
            const existingAnswearIndex = prevAnswears.findIndex((answearObj) => answearObj.id === questionId)
            const selectedAnswear = Array.isArray(choice) ? choice.map((c) => c.charAt(0)) : choice.charAt(0)

            if(existingAnswearIndex !== -1){
                const updatedAnswears = [...prevAnswears]
                const existingAnswears = updatedAnswears[existingAnswearIndex].answear
                let newAnswear
                if(Array.isArray(existingAnswears)){
                    newAnswear = existingAnswears.includes(selectedAnswear) ? existingAnswears.filter((a) => a !== selectedAnswear)
                    :[...existingAnswears,selectedAnswear]
                }else{
                    newAnswear = [existingAnswears,selectedAnswear]
                }
                updatedAnswears[existingAnswearIndex] = {id: questionId, answear: newAnswear}
                return updatedAnswears
            }else{
                const newAnswear = {id: questionId, answear: [selectedAnswear]}
                return [...prevAnswears, newAnswear]
            } 
        })
    }

    const handleSumbit = () =>{
        let scores = 0;
        quizQuestions.forEach((question) => {
            const selectedAnswear = selectedAnswears.find((answear) => answear.id === question.id)
            if (selectedAnswear){
                const selectedOptions = Array.isArray(selectedAnswear.answear) ? selectedAnswear.answear : [selectedAnswear.answear]
                const correctOptions = Array.isArray(question.correctAnswears) ? question.correctAnswears : [question.correctAnswears]
                const isCorrect = selectedOptions.every((option) => correctOptions.includes(option))
                if(isCorrect){
                    scores++
                }            
            }

        })
        setTotalScores(scores)
        setSelectedAnswears([{id:"",answear:[""]}])
        setCurrentQuestionIndex(0)
        navigate("/quiz-result",{state:{quizQuestions, totalScores:scores}})
    }
    
    const handleNextQuestion = () =>{
        if(currentQuestionIndex < quizQuestions.length -1){
            setCurrentQuestionIndex((prevIndex) => prevIndex +1)
        }
        else{
            handleSumbit()
        }
    }

    const handlePreviousQuestion = () =>{
        if(currentQuestionIndex > 0){
            setCurrentQuestionIndex((prevIndex) => prevIndex -1)
        }
    }

    return (
    <div className="p-5">
        <h3 className="text-info">
            Question {quizQuestions.length > 0 ? currentQuestionIndex + 1 : 0} of {quizQuestions.length}
        </h3>
        <h4 className="mb-4">
            {quizQuestions[currentQuestionIndex] ?.question}
            <AnswearOptions question ={quizQuestions[currentQuestionIndex]} isChecked={isChecked} handleAnswearChange={handleAnswearChange} handleCheckboxChange={handleCheckboxChange}/> 
            <div className="mt-4">
                <button className="btn btn-sm btn-primary me-2" onClick={handlePreviousQuestion} disabled={currentQuestionIndex === 0}>
                    Previous question
                </button>
                <button className={`btn btn-info btn-sm ${currentQuestionIndex === quizQuestions.length -1} && "btn btn-warning btn-sm"`}
                disabled={!selectedAnswears.find((answear) => 
                answear.id === quizQuestions[currentQuestionIndex]?.id || answear.answear.length > 0)}
                onClick={handleNextQuestion}>
                    {currentQuestionIndex === quizQuestions.length -1 ? "Submit quiz" : "Next question"}
                </button>
            </div>
        </h4>
    </div>
    )   

}

export default Quiz