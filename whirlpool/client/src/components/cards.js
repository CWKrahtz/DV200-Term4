import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Figure from 'react-bootstrap/Figure';

import VoteImage from '../icons/package.svg';

import LikeImage from '../icons/thumbs-up.svg';
import LikedImage from '../icons/thumbs-up-fill.svg';

import DislikeImage from '../icons/thumbs-down.svg';
import DislikedImage from '../icons/thumbs-down-fill.svg';

import { useState } from "react";
import Axios from 'axios'

import styles from '../pages/css/landing.module.css'

const HomeQuestion = (props) => {

    const [votes, setVotes] = useState(props.total);
    const [likes, setLikes] = useState(props.likes);
    const [dislikes, setDislikes] = useState(props.dislikes);

    const [isLiked, setIsLiked] = useState(false);
    const [isDisliked, setIsDisliked] = useState(false);

    const handleLike = async () => {
        console.log("Like");
        if (!sessionStorage.getItem('username')) {
            window.location.href = '/login';
        } else if (!isLiked && !isDisliked) {

            let tempVote = votes + 1
            let tempLikes = likes + 1
            
            setVotes(tempVote);
            setLikes(tempLikes);
            setIsLiked(true);

            let payload = {
                name: props.name,
                title: props.title,
                question: props.question,
                tags: {
                    tagOne: props.tagOne,
                    tagTwo: props.tagTwo,
                    tagThree: props.tagThree
                },
                votes: {
                    total: tempVote,
                    likes: tempLikes,
                    dislikes: props.dislikes
                }
            }

            Axios.patch('http://localhost:5001/api/updateQuestion/' + props.productId, payload)
                .then(res => {
                    if (res) {
                        console.log("Like Updated " + props.productId)
                        
                    }
                })
                .catch(function (error) {
                    console.log(error);
                })
                
        } else if (isLiked && !isDisliked) {
            let tempVote = votes - 1
            let tempLikes = likes - 1
            
            setVotes(tempVote);
            setLikes(tempLikes);
            setIsLiked(false);

            let payload = {
                name: props.name,
                title: props.title,
                question: props.question,
                tags: {
                    tagOne: props.tagOne,
                    tagTwo: props.tagTwo,
                    tagThree: props.tagThree
                },
                votes: {
                    total: tempVote,
                    likes: tempLikes,
                    dislikes: props.dislikes
                }
            }

            Axios.patch('http://localhost:5001/api/updateQuestion/' + props.productId, payload)
                .then(res => {
                    if (res) {
                        console.log("Like Updated")
                    }
                })
                .catch(function (error) {
                    console.log(error);
                })
        }
    };

    const handleDislike = async () => {
        console.log("Dislike");

        if (!sessionStorage.getItem('username')) {
            window.location.href = '/login';
        } else if (!isDisliked && !isLiked) {

            let tempVote = votes + 1
            let tempDislikes = dislikes + 1

            setVotes(tempVote);
            setDislikes(tempDislikes);
            setIsDisliked(true);

            let payload = {
                name: props.name,
                title: props.name,
                question: props.question,
                tags: {
                    tagOne: props.tagOne,
                    tagTwo: props.tagTwo,
                    tagThree: props.tagThree
                },
                votes: {
                    total: tempVote,
                    likes: props.likes,
                    dislikes: tempDislikes
                }
            }

            Axios.patch('http://localhost:5001/api/updateQuestion/' + props.productId, payload)
                .then(res => {
                    if (res) {
                        console.log("Dislike Updated")
                    }
                })
                .catch(function (error) {
                    console.log(error);
                })

        } else if (isDisliked && !isLiked) {
            let tempVote = votes - 1
            let tempDislikes = dislikes - 1

            setVotes(tempVote);
            setDislikes(tempDislikes);
            setIsDisliked(true);

            let payload = {
                name: props.name,
                title: props.name,
                question: props.question,
                tags: {
                    tagOne: props.tagOne,
                    tagTwo: props.tagTwo,
                    tagThree: props.tagThree
                },
                votes: {
                    total: tempVote,
                    likes: props.likes,
                    dislikes: tempDislikes
                }
            }

            Axios.patch('http://localhost:5001/api/updateQuestion/' + props.productId, payload)
                .then(res => {
                    if (res) {
                        console.log("Dislike Updated")
                    }
                })
                .catch(function (error) {
                    console.log(error);
                })
        }
    };

    const handleSingle = () => {
        // Get the id of the question
        const question = {
            id: props.productId,
            name: props.name,
            title: props.title,
            question: props.question,
            image: props.image,
            tags: {
                tagOne: props.tagOne,
                tagTwo: props.tagTwo,
                tagThree: props.tagThree
            },
            votes: {
                total: votes,
                likes: props.likes,
                dislikes: props.dislikes
            }
        };
        console.log(question)

        // Store the question in session storage
        sessionStorage.setItem('question', JSON.stringify(question));

        // Redirect the user to the single screen
        window.location.href = '/single';
    };



    return (
        <Card style={{ margin: "2%", width: "100%" }}>
            <Card.Header style={{ backgroundColor: "white" }}>{props.name}</Card.Header>
            <Card.Body>
                <div className={styles.cardLeft}>
                    <Figure>
                        <div style={{ width: "50px", height: "30px" }}>
                            <Figure.Caption style={{ display: "inline", padding: "10px" }} >{votes}</Figure.Caption>
                            <Figure.Image style={{ display: "inline" }} alt="votes icon" width="14px" height="14px" src={VoteImage} />
                        </div>
                        <div style={{ width: "50px", height: "30px" }} onClick={() => handleLike()}>
                            <Figure.Caption style={{ display: "inline", padding: "10px" }}>{likes}</Figure.Caption>
                            <Figure.Image style={{ display: "inline" }} alt="likes icon" width="14px" height="14px" src={isLiked ? LikedImage : LikeImage} />
                        </div>
                        <div style={{ width: "50px", height: "30px" }} onClick={() => handleDislike()}>
                            <Figure.Caption style={{ display: "inline", padding: "10px" }}>{dislikes}</Figure.Caption>
                            <Figure.Image style={{ display: "inline" }} alt="dislikes icon" width="14px" height="14px" src={isDisliked ? DislikedImage : DislikeImage} />
                        </div>
                    </Figure>
                </div>
                <div className={styles.cardRight}>
                    <Card.Title>{props.title}</Card.Title>
                    <Card.Text >
                        {props.question}
                    </Card.Text>
                    <Button style={{ float: "right" }} onClick={handleSingle}>View Question</Button>
                </div>
            </Card.Body>
        </Card >
    );
}

export default HomeQuestion;