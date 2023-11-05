import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Figure from 'react-bootstrap/Figure';
import VoteImage from '../icons/package.svg';
import LikeImage from '../icons/thumbs-up.svg';
import DislikeImage from '../icons/thumbs-down.svg';
import { useState, useEffect } from "react";
import axios from 'axios'

import styles from '../pages/css/single.css'

function SingleQuestion() {
    const question = JSON.parse(sessionStorage.getItem('question'));
    const [wienerballs, setWienerBalls] = useState();
    const [quePic, setQuePic] = useState();

    // handles question deleting
    const handleDelete = async () => {
        try {
            await axios.delete('http://localhost:5001/api/deleteQuestion/' + question.id);
            axios.delete('http://localhost:5001/api/deleteComments/' + question.title);
            sessionStorage.removeItem('question')
            console.log("question and all comments deleted");
            window.location = "/question";
        } catch (error) {
            console.log(error);
        }
    }

    // gets the image of the question
    useEffect(() => {
        axios.get('http://localhost:5001/api/singleQuestion/' + question.id)
            .then(res => {
                let data = res.data;
                setWienerBalls(data);
                console.log(JSON.stringify(data.image));

                setQuePic("http://localhost:5001/questionImages/" + data.image)

            })
            .catch(err => console.log(err))
    }, [question.id])

    return (
        <Card style={{marginLeft: "10%", marginRight: "10%", marginTop: "3%"}}>
            <Card.Header>{question.name}</Card.Header>
            <Card.Body>
                <div className={styles.cardLeft}>
                    <Figure>
                        <div className="left">
                            <Figure.Caption style={{ display: "inline", padding: "5px" }} >{question.votes.likes}</Figure.Caption>
                            <Figure.Image style={{ display: "inline" }} alt="votes icon" width="20px" height="20px" src={VoteImage} />
                        </div>
                        <div className="left">
                            <Figure.Caption style={{ display: "inline", padding: "5px" }}>{question.votes.total}</Figure.Caption>
                            <Figure.Image style={{ display: "inline"}} alt="likes icon" width="20px" height="20px" src={LikeImage} />
                        </div>
                        <div className="left">
                            <Figure.Caption style={{ display: "inline", padding: "5px" }} >{question.votes.likes}</Figure.Caption>
                            <Figure.Image style={{ display: "inline" }} alt="dislikes icon" width="20px" height="20px" src={DislikeImage} />
                        </div>
                    </Figure>
                </div>
                {sessionStorage.getItem('permissions') === 'true' && (
                        <Button variant="danger" style={{marginTop: "1%", float: "right"}} onClick={handleDelete}>Delete Question</Button>
                    )}
                <div className={styles.cardRight}>
                    <Card.Title style={{fontWeight: "bold", fontSize: '30px'}}>{question.title}</Card.Title>
                    <Card.Text value="question description">
                        {question.question}
                    </Card.Text>
                    {/* the image */}
                    <img src={quePic} alt="question image" style={{ width: "50%", marginTop: "2%", marginLeft: "25%" }} />
                </div>
            </Card.Body>


        </Card >
    );
}

export default SingleQuestion;