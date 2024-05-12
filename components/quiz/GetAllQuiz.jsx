import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { deleteQuestion, getAllQuestions } from "../../utils/QuizService"
import{FaPlus} from "react-icons/fa"

const GetAllQuiz = () => {
    const [questions, setQuestions] = useState([{ id: "", question: "", correctAnswears: "", choices: [] }])
    const [isLoading, setIsLoading] = useState(true)
    const [isQuestionDeleted, setIsQuestionDeleted] = useState(false)
    const [deleteSuccesMessage, setDeleteSuccesMassage] = useState("")

    useEffect(() => {
        fetchAllQuestions()
    }, [])

    const fetchAllQuestions = async () => {
        try {
            const data = await getAllQuestions()
            setQuestions(data)
            setIsLoading(false)
        } catch (error) {
            console.error(error)
        }
    }

    const handleDelete = async (id) => {
        try {
            await deleteQuestion(id)
            setQuestions(questions.filter((question) => question.id !== id))
            setIsQuestionDeleted(true)
            setDeleteSuccesMassage("Question deleted succesfully")
        } catch (error) {
            console.error(error)
        }
        setTimeout(() => {
            setDeleteSuccesMassage("")
        }, 4000)
    }

    if (isLoading) {
        return <p>Loading...</p>
    }

    return (
        <section className="container">
            <div className="row mt-5">
                <div className="col-md-6 mb-2 md-mb-0" style={{ color: "GrayText" }}>
                    <h4>All quiz questions</h4>
                </div>
                <div className="col-md-4 d-flex justify-content-end">
                    <Link to={'/create-quiz'}>
                        <FaPlus/>Add question
                    </Link>
                    
                </div>
            </div>
            <hr />
            {isQuestionDeleted && <div className="alert alert-succes">{deleteSuccesMessage}</div>}
            {questions.map((question, index) => (
                <div>
                    <h4 style={{ color: "GrayText" }}>
                        {`${index + 1}. ${question.question}`}
                    </h4>
                    <ul>
                        {question.choices.map((choice, index) => (
                            <li key={index}>
                                {choice}
                            </li>
                        ))}
                    </ul>
                    <p className="text-succes">
                        Correct answear: {question.correctAnswears}
                    </p>
                    <div className="btn-group mb-4">
                        <Link to={`/update-quiz/${question.id}`}>
                            <button className="btn btn-sm btn-outline-warning mr-2">Edit question</button>
                        </Link>
                        <button className="btn btn-outline-danger btn-sm" onClick={() => handleDelete(question.id)}>
                            Delete Question
                        </button>

                    </div>
                </div>
            ))}
        </section>
    )
}

export default GetAllQuiz