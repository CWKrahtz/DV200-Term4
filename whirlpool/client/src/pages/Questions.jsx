import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { Button } from 'react-bootstrap';//, Modal, Form
import MyModal from '../components/createQuestionModal';

import styles from '../pages/css/Questions.module.css'

import BasicNav from '../components/navbar'
import HomeQuestion from "../components/cards";
import Group from '../components/groupbtn';
import Tagcard from '../components/tagcard';
import Footer from '../components/footer';


function Questions() {

  const [showModal, setShowModal] = useState(false);
  const [selectedTag, setSelectedTag] = useState(null);
  const [totalQuestions, setTotalQuestions] = useState(0);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const [Question, setQuestions] = useState();
  const [updateQuestions, setUpdateQuestions] = useState(false);


  //Read Questions
  useEffect(() => {
    axios.get(`http://localhost:5001/api/allQuestions?tag=${selectedTag || ''}`)
      .then(res => {
        let QuestionData = res.data;
        setTotalQuestions(QuestionData.length); // Add this line
        let renderQuestions = QuestionData.map((item) => <HomeQuestion key={item._id} productId={item._id} name={item.name} title={item.title} question={item.question} total={item.votes.total} likes={item.votes.likes} dislikes={item.votes.dislikes} tagOne={item.tags.tagOne} tagTwo={item.tags.tagTwo} tagThree={item.tags.tagThree} editRender={setUpdateQuestions} />);
        setQuestions(renderQuestions);
        setUpdateQuestions(false);
      })
      .catch(err => console.log(err))
  }, [updateQuestions, selectedTag])


  return (
    <div className={styles.flexContainer} >
      <div>
      <BasicNav />
      <MyModal showModal={showModal} handleClose={handleClose} />

      <div className={styles.main_container}>

        <div className={styles.left_panel}>

          <Tagcard setSelectedTag={setSelectedTag} />

        </div>
        <div className={styles.questions_section}>
          <div className={styles.top_container}>
            <h1 className={styles.question_heading}>Questions</h1>

            <div className={styles.groupbtn_edit}>
            <Group setSelectedTag={setSelectedTag} clearSelectedTag={() => setSelectedTag(null)} selectedTag={selectedTag} />
            </div>

            {sessionStorage.getItem("username") && (
              <Button className={styles.ask_btn} variant="primary" onClick={handleShow}>Ask Question</Button>
            )}

            <div className={styles.more_info_row}>
            <h5 className={styles.totalQ}>Total Questions: {totalQuestions}</h5> {/* Update this line */}
            </div>

          </div>
          <div className={styles.questions_group_container}>
            {Question}
          </div>
        </div>
        <div className={styles.right_panel}></div>
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  )
}

export default Questions