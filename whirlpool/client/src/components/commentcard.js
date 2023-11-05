import Card from 'react-bootstrap/Card';
import Figure from 'react-bootstrap/Figure';
import LikeImage from '../icons/thumbs-up.svg';
import LikedImage from '../icons/thumbs-up-fill.svg';
import { useState, useEffect } from "react";
import axios from 'axios'
import Button from 'react-bootstrap/Button';

import styles from '../pages/css/single.css'

function SingleComment() {
    const question = JSON.parse(sessionStorage.getItem("question"));
    const queTitle = question.title;
    const [comments, setComments] = useState([]);
    const [isLiked, setIsLiked] = useState(false);
    const [likedCommentID, setLikedCommentID] = useState(null);
    const permissions = sessionStorage.getItem("permissions");

    // gets comments based on the currently viewed question
    useEffect(() => {
        axios.get("http://localhost:5001/api/comments/" + queTitle)
            .then((res) => {
                setComments(res.data);
            })
            .catch(err => console.log(err))
    }, [queTitle]);

    // handles the liking of comments
    const handleLike = async (commentID, commentLikes) => {
        if (!isLiked) {
            commentLikes = commentLikes + 1
            setIsLiked(true);
            setLikedCommentID(commentID);

            let payload = {
                likes: commentLikes
            };

            axios.patch('http://localhost:5001/api/updateComment/' + commentID, payload)
                .then(res => {
                    if (res) {
                        console.log("Like Updated " + commentID);
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        } else if (likedCommentID === commentID) {
            commentLikes = commentLikes - 1
            setIsLiked(false);
            setLikedCommentID(null);

            let payload = {
                likes: commentLikes
            };

            axios.patch('http://localhost:5001/api/updateComment/' + commentID, payload)
                .then(res => {
                    if (res) {
                        console.log("Like Updated " + commentID);
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    };

    // handles comment deletion
    const handleDelete = async (commentID) => {
        if (permissions === 'true') {
            try {
                await axios.delete('http://localhost:5001/api/deleteComment/' + commentID);
                // Update the state or redirect to reflect the deletion
                console.log("Comment deleted")
            } catch (error) {
                console.log(error);
            }
        }
    };

    return (
        <div className="comment">
            {comments.map((comment) => (
                <Card style={{ marginLeft: "12%", marginRight: "12%", marginBottom: "2%" }}>
                    <Card.Header>{comment.name}</Card.Header>
                    <Card.Body>
                        <div className={styles.cardLeft}>
                            <Figure>
                                <div className="left">
                                    <div style={{ width: "50px", height: "30px" }} onClick={() => handleLike(comment._id, comment.likes)}>
                                        <Figure.Caption style={{ display: "inline", padding: "10px" }}>{comment.likes}</Figure.Caption>
                                        <Figure.Image style={{ display: "inline" }} alt="likes icon" width="14px" height="14px" src={likedCommentID === comment._id ? LikedImage : LikeImage} />
                                    </div>
                                </div>
                            </Figure>
                        </div>
                        <div className={styles.cardRight}>
                            <Card.Text >
                                {comment.comment}
                            </Card.Text>
                        </div>
                        {permissions === 'true' && (
                            <Button variant="danger" onClick={() => handleDelete(comment._id)} style={{ marginTop: "2%", float: "right" }}>Delete Comment</Button>
                        )}
                    </Card.Body>
                </Card >
            ))}
        </div>
    )
}

export default SingleComment;

