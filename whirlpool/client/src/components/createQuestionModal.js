import React, { useState, useEffect } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios'

const MyModal = ({ showModal, handleClose }) => {
  const [imageName, setImageName] = useState("Name of file")
  const [questionImage, setQuestionImage] = useState()

  const [formData, setFormData] = useState({
    title: '',
    question: '',
    tag1: '',
    tag2: '',
    tag3: '',
    image: null,
    imagePreview: null // Add a new state variable for image preview
  });

  let qname = sessionStorage.getItem('username')
  const [productImage, setProductImage] = useState()

  const handleFormChange = (e, field) => {
    setFormData({
      ...formData,
      [field]: e.target.value,
    });
  };

  
   // Handle form submission
  const handleFormSubmit = (e) => {
    e.preventDefault();
   
    console.log(formData); // Replace with your logic to handle the form data

    const payloadData = new FormData(); // Create a new FormData object

    let payload ={
      name: qname,
      title: formData['title'],
      question: formData['question'],
      tags: {
        tagOne: formData['tag1'],
        tagTwo: formData['tag2'],
        tagThree: formData['tag3']
      },
      votes: {
        total: 0, // Initialize total votes to 0
        likes: 0,
        dislikes: 0
      }
    }
    
    payloadData.append("information", JSON.stringify(payload));
    payloadData.append("image", questionImage); // Append the image file to the payload

    axios.post("http://localhost:5001/api/newQuestion", payloadData)
      .then((res) => {
        if (res) {
          console.log("Question Added");
          window.location = "/question";
        }
      })
      .catch(err => console.log(err))

    handleClose(); // Close the modal after submission if needed
  };

  // the select values for when selecting tags
  const tagOptions = [
    'HTML',
    'Javascript',
    'CSS',
    'Axios',
    'UseState',
    'Reactjs',
    'MERN',
    'LAMP',
    'SQL',
    'NoSQL',
    'Kotlin',
    'Xcode',
  ];

  // modal form display uploaded image function
  const getImage = (e) => {
    let imagefile = e.target.files[0];
    setQuestionImage(imagefile);

    let value = e.target.value;
    let imageName = value.substring(12);
    setImageName(imageName);

    setFormData({
      ...formData,
      image: imagefile, // Update the image field in formData state with the selected file
      imagePreview: URL.createObjectURL(imagefile), // Create a preview URL for the selected image
    });
  };

  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Create a New Question</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleFormSubmit}>
          <Form.Group controlId="formTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter the title of your question"
              value={formData.title}
              onChange={(e) => handleFormChange(e, 'title')}
            />
          </Form.Group>

          <Form.Group controlId="formQuestion">
            <Form.Label style={{ marginTop: "3%" }}>Question</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Type out your question"
              value={formData.question}
              onChange={(e) => handleFormChange(e, 'question')}
            />
          </Form.Group>

          <Form.Group controlId="formFile" className="mb-3" style={{ display: "inline-block", width: "100%", marginTop: "4%" }}>
            <Form.Control type="file" style={{ marginBottom: "2%" }} onChange={getImage} />
            <div>
              <p>{formData.image ? formData.image.name : ''}</p>
            </div>
            <div>
              {formData.imagePreview && ( // Render the image preview if it exists
                <img src={formData.imagePreview} alt="Preview" style={{ backgroundColor: "lightgrey", height: "200px", width: "200px", float: "left" }} />
              )}
            </div>
          </Form.Group>

          {[1, 2, 3].map((tagNum) => (
            <Form.Group key={tagNum} controlId={`formTag${tagNum}`}>
              <Form.Label style={{ marginTop: "3%" }}>{`Tag ${tagNum}`}</Form.Label>
              <Form.Control
                as="select"
                value={formData[`tag${tagNum}`]}
                onChange={(e) => handleFormChange(e, `tag${tagNum}`)}
              >
                <option value="">Select Tag</option>
                {tagOptions.map((tag) => (
                  <option key={tag} value={tag}>
                    {tag}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          ))}

          <Button variant="primary" type="submit" style={{ marginTop: "5%" }}>
            Post Question
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default MyModal;
