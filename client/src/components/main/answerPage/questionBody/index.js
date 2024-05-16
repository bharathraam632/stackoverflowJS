import "./index.css";
import React from "react";
import {handleHyperlink} from "../../../../tool";
import UpvoteDownvote from "./upvoteDownvote";
import Author from "../../Author";
import ReportButton from "./reprtBtn";

// Component for the Question's Body
const QuestionBody = ({qid, views, text, askby, meta, handleUserProfile,handleQuestions}) => {
    return (
        <div id="questionBody" className="questionBody right_padding">
            <div className={"vote"}><UpvoteDownvote qid={qid}/></div>
            <div className="bold_title answer_question_view">{views} views</div>
            <div className="answer_question_text">{handleHyperlink(text)}</div>
            <br/>
            <p><ReportButton style={{marginTop: 50}} qid={qid} handleQuestions={handleQuestions}/></p>
            <div className="answer_question_right">
                <Author username={askby} handleUserProfile={handleUserProfile}/>
                <div className="answer_question_meta">asked {meta}</div>
            </div>
        </div>
    );
};

export default QuestionBody;
