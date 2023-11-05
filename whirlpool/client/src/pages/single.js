import BasicNav from '../components/navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import SingleQuestion from '../components/questioncard';
import SingleComment from '../components/commentcard';
import NewComment from '../components/newComment';
import Footer from '../components/footer';

function Single() {
    return(
        <div>
            <BasicNav />
            <SingleQuestion />
            <h3 style={{marginTop: "5%", marginLeft: "12%", marginBottom: "1%"}}> Comments: </h3>
            <div style={{marginBottom: "6%"}} >
                <hr style={{width: "80%", marginLeft: "10%"}}></hr>
                <NewComment />
                <hr style={{width: "80%", marginLeft: "10%"}}></hr>
            </div>
            
            <SingleComment />
            {/* <Footer /> */}
        </div>
    );
}

export default Single