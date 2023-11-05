import Card from 'react-bootstrap/Card';
import { Button, Form } from 'react-bootstrap';
import styles from '../pages/css/single.css'
import { useState } from 'react';
import axios from 'axios'

function NewComment() {
    const firstName = sessionStorage.getItem("firstName");
    const question = JSON.parse(sessionStorage.getItem("question"));
    const queTitle = question.title;
    const [comment, setComment] = useState();

    const handleSubmit = (e) =>{
        if (firstName === "") {

            window.location = "/login";

        } else {
            e.preventDefault();

            const payload ={
                questionTitle: queTitle,
                name: firstName,
                comment: comment,
                likes: 0
            }

            console.log(payload)
            axios.post("http://localhost:5001/api/newComment/", payload)
            .then((res) => {
                if (res) {
                console.log("Comment posted");
                window.location = "/single"
                }
            })
            .catch(err => console.log(err))
        };
    }

    return (
        <div className="comment">
        <Card style={{marginLeft: "12%", marginRight: "12%"}}>
            <Card.Header>{firstName}</Card.Header>
            <Card.Body className="left">
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formComment">
                        <Form.Control type='text' placeholder='Leave a comment...' onChange={e => setComment(e.target.value)} style={{width: "90%", height: "70px", marginLeft: "5%", marginTop: "2%", marginBottom: "2%"}} />
                    </Form.Group>
                    <Button variant="primary" type="submit" style={{width: "70%", marginLeft: "15%", marginBottom: "2%"}}>
                        Submit
                    </Button>
                </Form>
            </Card.Body>


        </Card >
        </div>
    );
}

export default NewComment;