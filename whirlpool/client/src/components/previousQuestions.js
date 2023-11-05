import React from "react";
import { useState, useEffect } from "react";
import axios from 'axios';
import Button from 'react-bootstrap/Button';

function PreviousQuestions() {
    const firstName = sessionStorage.getItem('firstName');
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5001/api/namedQuestions/' + firstName)
            .then(response => {
                setQuestions(response.data);
            })
            .catch(err => console.log(err))
    }, []);

    const handleSingle = (id, name, title, question, tags, votes) => {
        // Get the id of the question
        const questionData = {
            id: id,
            name: name,
            title: title,
            question: question,
            tags: tags,
            votes: votes
        };
        console.log(questionData)

        // Store the question in session storage
        sessionStorage.setItem('question', JSON.stringify(questionData));

        // Redirect the user to the single screen
        window.location.href = '/single';
    };

    return(
        <div className="content questions">
            <div className="container">
                <h1> Your Questions: </h1>
                <div className="row">
                    {questions.map(question => (
                        <div className="col-lg-4">
                            <div className="text-center card-box">
                                <div className="member-card pt-2 pb-2">
                                    <div className="">
                                        <h3>{question.title}</h3>
                                        <p className="text-muted">{question.question.slice(0, 50)}...</p>
                                    </div>
                                    <div className="mt-4">
                                        <div className="row">
                                            <div className="col-4">
                                                <div className="mt-3">
                                                    <h4>{question.votes.total}</h4>
                                                    <p className="mb-0 text-muted">Total votes</p>
                                                </div>
                                            </div>
                                            <div className="col-4">
                                                <div className="mt-3">
                                                    <h4>{question.votes.likes}</h4>
                                                    <p className="mb-0 text-muted">Likes</p>
                                                </div>
                                            </div>
                                            <div className="col-4">
                                                <div className="mt-3">
                                                    <h4>{question.votes.dislikes}</h4>
                                                    <p className="mb-0 text-muted">Dislikes</p>
                                                </div>
                                            </div>
                                            <Button style={{ float: "right" }} onClick={() => handleSingle(question.id, question.name, question.title, question.question, question.tags, question.votes)}>View Question</Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default PreviousQuestions