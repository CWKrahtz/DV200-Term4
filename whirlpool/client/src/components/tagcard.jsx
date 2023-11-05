import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import styles from '../components/css/tagcard.module.css';
import { useState } from 'react';


function Tagcard({ setSelectedTag }) {
  const [activeButton, setActiveButton] = useState(null);

  const handleClick = (tag) => {
    if (activeButton === tag) {
      setActiveButton(null);
      setSelectedTag(null); // Clear the selected tag when the button is clicked for the second time
    } else {
      setActiveButton(tag);
      setSelectedTag(tag);
    }
  };
  return (
    <div>
    <Card>
    <Card.Header as="h6">Filter by tags:</Card.Header>
      <Card.Body>

      <Button variant="primary" className={styles.spacer} onClick={() => handleClick('HTML')}>HTML</Button> 
      <Button variant="primary" className={styles.spacer} onClick={() => handleClick('JavaScript')}>JavaScript</Button>
      <Button variant="primary" className={styles.spacer} onClick={() => handleClick('CSS')}>CSS</Button>
      <Button variant="primary" className={styles.spacer} onClick={() => handleClick('Axios')}>Axios</Button>
      <Button variant="primary" className={styles.spacer} onClick={() => handleClick('UseState')}>UseState</Button>
      <Button variant="primary" className={styles.spacer} onClick={() => handleClick('React')}>Reactjs</Button>
      <Button variant="primary" className={styles.spacer} onClick={() => handleClick('MERN')}>MERN</Button>
      <Button variant="primary" className={styles.spacer} onClick={() => handleClick('LAMP')}>LAMP</Button>
      <Button variant="primary" className={styles.spacer} onClick={() => handleClick('SQL')}>SQL</Button>
      <Button variant="primary" className={styles.spacer} onClick={() => handleClick('NoSQL')}>NoSQL</Button>
      <Button variant="primary" className={styles.spacer} onClick={() => handleClick('Kotlin')}>Kotlin</Button>
      <Button variant="primary" className={styles.spacer} onClick={() => handleClick('Xcode')}>Xcode</Button>
      <Button variant="primary" className={styles.spacer} onClick={() => handleClick('Bootstrap')}>Bootstrap</Button>


      </Card.Body>
    </Card>
    </div>
  )
}

export default Tagcard

