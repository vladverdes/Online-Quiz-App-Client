import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getQuestionById, updateQuestion } from "../../utils/QuizService"
import { Link } from "react-router-dom"

const UpdateQuestion = () => {
    const [question, setQuestion] = useState("")
    const [choices, setChoices] = useState([""])
    const [correctAnswears, setCorrectAnswears] = useState([""])
    const [isLoading, setIsLoading] = useState(true)

    const { id } = useParams()

 useEffect(() =>(
    fetchQuestion()
 ),[])

    const fetchQuestion = async () => {
        try {
            const questionToUpdate = await getQuestionById(id)
            if (questionToUpdate) {
                setQuestion(questionToUpdate.question)
                setChoices(questionToUpdate.choices)
                setCorrectAnswears(questionToUpdate.correctAnswears)
            }
            setIsLoading(false)
        } catch (error) {
            console.error(error)
        }
    }

    const handleQuestionChange = (e) => {
        setQuestion(e.target.value)
    }

    const handleChoiceChange = (index, e) => {
        const updatedChoices = [...choices]
        updatedChoices[index] = e.target.value
        setChoices(updatedChoices)
    }

    const handleCorrectAnswearsChange = (e) => {
        setCorrectAnswears(e.target.value)
    }

    const handleQuestionUpdate = async (e) => {
        e.preventDefault()
        try {
            const updatedQuestion = { 
                question, 
                choices, 
                correctAnswears: correctAnswears.toString().split(",").map((answear) => answear.trim())
            }
            await updateQuestion(id,updatedQuestion)
            /*navigate to*/
        } catch (error) {
            console.error(error)
        }
    }

    if(isLoading){
        return <p>Loading...</p>
    }

return (
    <section className="container">
        <h4 className="mt-5" style={{color:"GrayText"}}>
            Update quiz question 
        </h4>
        <div className="col-md-8">
            <form onSubmit={handleQuestionUpdate}>
                <div className="form-group">
                    <label className="text-info">
                        Question:
                    </label>
                    <textarea className="form-control" rows={4} value={question} onChange={handleQuestionChange}/>
                </div>
                <div className="form-group">
                    <label className="text-info">
                        Choices:
                    </label>
                    {choices.map((choice,index) => (
                        <input className="form-control " type="text" key={index} value={choice} onChange={(e) =>handleChoiceChange(index,e)}/>
                    ))}
                </div>
                <div className="form-group">
                    <label className="text-info">
                        Correct Answear(s):
                    </label>
                    <input className="form-control " type="text" value={correctAnswears} onChange={handleCorrectAnswearsChange}/>
                </div>
                <div className="btn-group">
                    <button className="btn btn-sm btn-outline-warning" type="submit">
                        Update Question
                    </button>
                    <Link to={"/all-quizzes"} className="btn btn-outline-primary ml-2">
                        Back to all questions
                    </Link>
                </div>
            </form>
        </div>

    </section>
)
}
export default UpdateQuestion