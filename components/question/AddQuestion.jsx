import React, { useEffect, useState } from 'react'
import { createQuestion,getSubjects} from '../../utils/QuizService'
import { Link } from 'react-router-dom'

const AddQuestion = () => {
    const [question, setQuestionText] = useState("")
    const [questionType, setQuestionType] = useState("single")
    const [choices, setChoices] = useState([""])
    const [correctAnswears, setCorrectAnswears] = useState([""])
    const [subject, setSubject] = useState("")
    const [newSubject, setNewSubject] = useState("")
    const [subjectOptions, setSubjectOptions] = useState([""])

    useEffect(() => {
        fetchSubject()
    }, [])

    const fetchSubject = async () => {
        try {
            const subjectData = await getSubjects()
            setSubjectOptions(subjectData)
        } catch (error) {
            console.error(error)
        }
    }

    const handelAddChoices = async () => {
        const lastChoice = choices[choices.length - 1]
        const lastChoicesLetter = lastChoice ? lastChoice.charAt(0) : "A"
        const newChoiceLetter = String.fromCharCode(lastChoicesLetter.charCodeAt(0) + 1)
        const newChoice = `${newChoiceLetter}.`
        setChoices([...choices, newChoice])
    }

    const handleRemoveChoice = (index) => {
        setChoices(choices.filter((choice, i) => i !== index))
    }

    const handleChoiceChange = (index, value) => {
        setChoices(choices.map((choice, i) => (i === index ? value : choice)))
    }

    const handleCorrectAnswearChange = (index, value) => {
        setCorrectAnswears(correctAnswears.map((answear, i) => (i === index ? value : answear)))
    }

    const handleAddCorrectAnswear = () => {
        setCorrectAnswears([...correctAnswears, ""])
    }

    const handleRemoveCorrectAnswear = (index) => {
        setCorrectAnswears(correctAnswears.filter((answear, i) => i !== index))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const result = {
                question, questionType, choices, correctAnswears: correctAnswears.map((answear) => {
                    const choiceLetter = answear.charAt(0).toUpperCase()
                    const choiceIndex = choiceLetter.charCodeAt(0) - 65
                    return choiceIndex >= 0 && choiceIndex < choices.length ? choiceLetter : null
                })
                , subject
            }
            await createQuestion(result)
            setQuestionText("")
            setQuestionType("single")
            setChoices([""])
            setCorrectAnswears([""])
            setSubject("")
        } catch (error) {
            console.error(error)
        }
    }

    const handleAddSubject = () => {
        if (newSubject.trim() !== "") {
            setSubject(newSubject.trim())
            setSubjectOptions([...subjectOptions, newSubject.trim()])
            setNewSubject("")
        }
    }

    return (
		<div className="container">
			<div className="row justify-content-center">
				<div className="col-md-6  mt-5">
					<div className="card">
						<div className="card-header">
							<h5 className="card-title">Add New Questions</h5>
						</div>
						<div className="card-body">
							<form onSubmit={handleSubmit} className="p-2">
								<div className="mb-3">
									<label htmlFor="subject" className="form-label text-info">
										Select a Subject
									</label>
									<select
										id="subject"
										value={subject}
										onChange={(e) => setSubject(e.target.value)}
										className="form-control">
										<option value="">Select subject</option>
										<option value={"New"}>Add New</option>
										{subjectOptions.map((option) => (
											<option key={option} value={option}>
												{option}
											</option>
										))}
									</select>
								</div>

								{subject === "New" && (
									<div className="mb-3">
										<label htmlFor="new-subject" className="form-label text-info">
											Add New Subject
										</label>
										<input
											type="text"
											id="new-subject"
											value={newSubject}
											onChange={(event) => setNewSubject(event.target.value)}
											className="form-control"
										/>
										<button
											type="button"
											onClick={handleAddSubject}
											className="btn btn-outline-primary mt-2">
											Add Subject
										</button>
									</div>
								)}
								<div className="mb-3">
									<label htmlFor="question-text" className="form-label text-info">
										Question
									</label>
									<textarea
										className="form-control"
										rows={4}
										value={question}
										onChange={(e) => setQuestionText(e.target.value)}></textarea>
								</div>
								<div className="mb-3">
									<label htmlFor="question-type" className="form-label text-info">
										Question type
									</label>
									<select
										id="question-type"
										value={questionType}
										onChange={(event) => setQuestionType(event.target.value)}
										className="form-control">
										<option value="single">Single Answear</option>
										<option value="multiple">Multiple Answear</option>
									</select>
								</div>
								<div className="mb-3">
									<label htmlFor="choices" className="form-label text-primary">
										Choices
									</label>
									{choices.map((choice, index) => (
										<div key={index} className="input-group mb-3">
											<input
												type="text"
												value={choice}
												onChange={(e) => handleChoiceChange(index, e.target.value)}
												className="form-control"
											/>
											<button
												type="button"
												onClick={() => handleRemoveChoice(index)}
												className="btn btn-outline-danger">
												Remove
											</button>
										</div>
									))}
									<button
										type="button"
										onClick={handelAddChoices}
										className="btn btn-outline-primary">
										Add Choice
									</button>
								</div>
								{questionType === "single" && (
									<div className="mb-3">
										<label htmlFor="answear" className="form-label text-success">
											Correct Answear
										</label>
										<input
											type="text"
											className="form-control"
											id="answer"
											value={correctAnswears[0]}
											onChange={(e) => handleCorrectAnswearChange(0, e.target.value)}
										/>
									</div>
								)}
								{questionType === "multiple" && (
									<div className="mb-3">
										<label htmlFor="answer" className="form-label text-success">
											Correct Answear(s)
										</label>
										{correctAnswears.map((answear, index) => (
											<div key={index} className="d-flex mb-2">
												<input
													type="text"
													className="form-control me-2"
													value={answear}
													onChange={(e) => handleCorrectAnswearChange(index, e.target.value)}
												/>
												{index > 0 && (
													<button
														type="button"
														className="btn btn-danger"
														onClick={() => handleRemoveCorrectAnswear(index)}>
														Remove
													</button>
												)}
											</div>
										))}
										<button
											type="button"
											className="btn btn-outline-info"
											onClick={handleAddCorrectAnswear}>
											Add Correct Answear
										</button>
									</div>
								)}

								{!correctAnswears.length && <p>Please enter at least one correct answear.</p>}

								<div className="btn-group">
									<button type="submit" className="btn btn-outline-success mr-2">
										Save question
									</button>
                                    <Link to={'/all-quizzes'} type='submit' className='btn btn-outline-succes mr-2'>
                                        Back to existing questions
                                    </Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}
export default AddQuestion
