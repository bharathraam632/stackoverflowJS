import {handleHyperlink} from "../../../../tool";
import "./index.css";
import Author from "../../Author";

// Component for the Answer Page
const Answer = ({text, ansBy, meta,handleUserProfile}) => {
    return (
        <div className="answer right_padding">
            <div id="answerText" className="answerText">
                {handleHyperlink(text)}
            </div>
            <div className="answerAuthor">
                <Author username={ansBy} isQuestion={false} handleUserProfile={handleUserProfile}/>
                <div className="answer_question_meta">{meta}</div>
            </div>
        </div>
    );
};

export default Answer;
