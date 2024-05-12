import React, { useState } from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "D:/vscode/quiz-online/quiz-online-client/components/Home.jsx"
import QuizStepper from "D:/vscode/quiz-online/quiz-online-client/components/quiz/QuizStepper"
import Quiz from "D:/vscode/quiz-online/quiz-online-client/components/quiz/Quiz"
import QuizResult from "D:/vscode/quiz-online/quiz-online-client/components/quiz/QuizResult"
import GetAllQuiz from "D:/vscode/quiz-online/quiz-online-client/components/quiz/GetAllQuiz"
import AddQuestion from "D:/vscode/quiz-online/quiz-online-client/components/question/AddQuestion"
import UpdateQuestion from "D:/vscode/quiz-online/quiz-online-client/components/question/UpdateQuestion"
import Navbar from "D:/vscode/quiz-online/quiz-online-client/components/layout/NavBar"
import Admin from "D:/vscode/quiz-online/quiz-online-client/components/Admin"

function App() {
	return (
		<main className="container mt-5 mb-5">
			<Router>
				<Navbar />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/quiz-stepper" element={<QuizStepper />} />
					<Route path="/take-quiz" element={<Quiz />} />
					<Route path="/create-quiz" element={<AddQuestion />} />
					<Route path="/admin" element={<Admin />}/>
					<Route path="/update-quiz/:id" element={<UpdateQuestion />} />
					<Route path="/all-quizzes" element={<GetAllQuiz />} />
					<Route path="/quiz-result" element={<QuizResult />} />
				</Routes>
			</Router>
		</main>
	)
}

export default App