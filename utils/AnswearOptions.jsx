import React from "react"

const AnswearOptions = ({question, isChecked, handleAnswearChange, handleCheckboxChange}) =>{

    if(!question){
        return <div> No questions available </div>
    }

    const {id, questionType, choices} = question

    if(questionType === "single"){
        return (
        <div>
            {choices.sort().map((choice,index) =>(
                <div key={choice} className="form-check mb-3">
                    <input 
                    className="form-check-input" 
                    id={choice} 
                    value={choice} 
                    type="radio" 
                    checked={isChecked(question.id,choice)} 
                    onChange={() => handleAnswearChange(id,choice)}/>
                <label className="form-check-label ms-2 ">
                    {choice}
                </label>
                </div>
             ))}
        </div>
        ) 
    }else if(questionType === "multiple"){
        return (
            <div>
                <p>
                    Select all that apply:
                </p>
                {choices.sort().map((choice,index) =>(
                <div key={choice} className="form-check mb-3">
                    <input 
                    className="form-check-input" 
                    id={choice} 
                    value={choice} 
                    type="checkbox"
                    name={question.id} 
                    checked={isChecked(question.id,choice)} 
                    onChange={() => handleCheckboxChange(id,choice)}/>
                <label className="form-check-label ms-2 ">
                    {choice}
                </label>
                </div>
             ))}
            </div>
        )
    }else{
        return null
    }
}

export default AnswearOptions