import React from "react";
import BasicNav from '../components/navbar';
import './css/profile.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import PreviousQuestions from "../components/previousQuestions";
import Footer from "../components/footer";

function Profile() {
    const [imageName, setImageName] = useState("Name of file")
    const [userImage, setUserImage] = useState()

    const [userPic, setUserPic] = useState("../assets/user.png")

    const userMail = sessionStorage.getItem("username")
    const [userData, setUserData] = useState();
    const [showConfirm, setShowConfirm] = useState(false);

    const [showModal, setShowModal] = useState(false);
    const [editData, setEditData] = useState({
        firstName: '',
        lastName: '',
        email: ''
    });

    // gets the image of the user
    useEffect(() => {
        if (userMail) {
            axios.get('http://localhost:5001/api/singleUser/' + userMail)
                .then(res => {
                    let data = res.data;
                    setUserData(data);
                    console.log(JSON.stringify(data.profilePic));

                    setUserPic("http://localhost:5001/userImages/" + data.profilePic)

                })
                .catch(err => console.log(err))
        }
    }, [userMail])

    const getImage = (e) => {
        let imagefile = e.target.files[0];
        setUserImage(imagefile);

        let value = e.target.value;
        let imageName = value.substring(12);
        setImageName(imageName);

        let reader = new FileReader();
        reader.onload = () => {
            let output = document.getElementById('imgPrev');
            output.src = reader.result;
        }

        reader.readAsDataURL(e.target.files[0]);
    }

    // Image upload handling
    const changeImg = (e) => {
        e.preventDefault();

        const payloadData = new FormData();
        // const fileName = userImage.name; // Extract the file name

        let payload = {
            name: userData.name,
            title: userData.title,
            question: userData.question,
            tags: {
                tagOne: userData.tagOne,
                tagTwo: userData.tagTwo,
                tagThree: userData.tagThree
            },
            votes: {
                total: userData.total,
                likes: userData.likes,
                dislikes: userData.dislikes
            }
        }

        payloadData.append("information", JSON.stringify(payload));
        payloadData.append('image', userImage); // Append the file with the name to FormData

        axios.put("http://localhost:5001/api/users/profilePic/" + userMail, payloadData)
            .then((res) => {
                if (res) {
                    console.log("Item Added");
                    window.location = "/profile";
                }
            })
            .catch(err => console.log(err))
    }

    const handleEdit = () => {
        setShowModal(true);
        setEditData({
            firstName: userData?.firstName,
            lastName: userData?.lastName,
            email: userData?.email
        });
    }

    const handleInputChange = (event) => {
        setEditData({
            ...editData,
            [event.target.name]: event.target.value
        });
    }

    // edit the users info
    const handleSave = () => {
        axios.put(`http://localhost:5001/api/updateUser/${userMail}`, editData)
            .then(res => {
                setUserData(res.data);
                setShowModal(false);
            })
            .catch(err => console.log(err));
    };

    // Delete account
    let navigate = useNavigate();

    const handleDeleteAccount = () => {
        setShowConfirm(true);
    };

    const confirmDeleteAccount = () => {
        axios.delete(`http://localhost:5001/api/deleteUser/${userMail}`)
            .then((response) => {
                console.log("User account deletedcessfully");
                navigate('/login');
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <div id="daBigOne" style={{position: "relative"}}>

            <BasicNav />

            {/* Profile front end provided by bootdey for free use */}
            {/* Code was still tweaked and edited by us of course */}

            <div className="container" id="bababooie" >
                <div className="main-body">
                    <h1> Your profile: </h1>
                    <div className="row gutters-sm">
                        <div className="col-md-4 mb-3">
                            <div className="cardEspesiale">
                                <div className="card-body">
                                    <div className="d-flex flex-column align-items-center text-center">
                                        <img
                                            src={userPic}
                                            alt="User" className="rounded-circle" width="150" height="150px" style={{ marginTop: "5%" }} />
                                        <div className="mt-3">
                                            <h4>
                                                {userData?.firstName}
                                            </h4>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-8">
                            <div className="card mb-3">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <h6 className="mb-0">Name</h6>
                                        </div>
                                        <div className="col-sm-9 text-secondary">
                                            {userData?.firstName}
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <h6 className="mb-0">Surname</h6>
                                        </div>
                                        <div className="col-sm-9 text-secondary">
                                            {userData?.lastName}
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <h6 className="mb-0">Email</h6>
                                        </div>
                                        <div className="col-sm-9 text-secondary">
                                            {userData?.email}
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-sm-12">
                                            <Form onSubmit={changeImg} style={{ marginTop: "2%", marginLeft: "auto", marginRight: "auto" }}>
                                                <Form.Group controlId="formFile" className="mb-3" style={{ display: "inline-block", width: "100%" }}>
                                                    <Form.Control type="file" style={{ marginBottom: "2%" }} onChange={getImage} />
                                                    <div>
                                                        <p>{imageName}</p>
                                                    </div>
                                                    <div>
                                                        <img id="imgPrev" style={{ backgroundColor: "lightgrey", height: "200px", width: "200px", float: "left" }} />
                                                    </div>
                                                </Form.Group >
                                                <Button variant="primary" type="submit" style={{ color: "black", width: "100%", marginTop: "2%", marginBottom: "2%", backgroundColor: "#FDF5BF" }}>
                                                    Upload image
                                                </Button>
                                            </Form>
                                            <Button onClick={handleEdit} variant="warning" type="submit" style={{ color: "black", width: "100%", marginTop: "2%", marginBottom: "2%", backgroundColor: "#FDF5BF" }}>
                                                Edit Info
                                            </Button>
                                            <Modal show={showModal} onHide={() => setShowModal(false)}>
                                                <Modal.Header closeButton>
                                                    <Modal.Title>Edit Info</Modal.Title>
                                                </Modal.Header>
                                                <Modal.Body>
                                                    <Form>
                                                        <Form.Group>
                                                            <Form.Label>First Name</Form.Label>
                                                            <Form.Control type="text" name="firstName" value={editData.firstName} onChange={handleInputChange} />
                                                        </Form.Group>
                                                        <Form.Group>
                                                            <Form.Label>Last Name</Form.Label>
                                                            <Form.Control type="text" name="lastName" value={editData.lastName} onChange={handleInputChange} />
                                                        </Form.Group>
                                                        <Form.Group>
                                                            <Form.Label>Email</Form.Label>
                                                            <Form.Control type="email" name="email" value={editData.email} onChange={handleInputChange} />
                                                        </Form.Group>
                                                    </Form>
                                                </Modal.Body>
                                                <Modal.Footer>
                                                    <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
                                                    <Button variant="primary" onClick={handleSave}>Save Changes</Button>
                                                </Modal.Footer>
                                            </Modal>

                                            <Button onClick={handleDeleteAccount} variant="warning" type="submit" style={{ color: "black", width: "100%", marginTop: "2%", marginBottom: "2%", backgroundColor: "#FDF5BF" }}>
                                                Delete Account
                                            </Button>

                                            <Modal show={showConfirm} onHide={() => setShowConfirm(false)}>
                                                <Modal.Header closeButton>
                                                    <Modal.Title>Confirm Account Deletion</Modal.Title>
                                                </Modal.Header>
                                                <Modal.Body>Are you sure you want to delete your account?</Modal.Body>
                                                <Modal.Footer>
                                                    <Button variant="secondary" onClick={() => setShowConfirm(false)}>
                                                        Cancel
                                                    </Button>
                                                    <Button variant="danger" onClick={confirmDeleteAccount} >
                                                        Delete Account
                                                    </Button>
                                                </Modal.Footer>
                                            </Modal>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div style={{position: "relative"}}>
                {/* previously asked questions */}
                <PreviousQuestions />
            </div>

            <Footer style={{marginTop: "50%"}}/>

            

        </div>
    )
}

export default Profile