import React, {useEffect, useState} from 'react';
import {BsArrowDownCircle, BsArrowDownCircleFill, BsArrowUpCircle, BsArrowUpCircleFill} from "react-icons/bs";
import {useAuthContext} from "../../../../../hooks/useAuthContext";
import {downvoteQuestion, getQuestionStatus, upvoteQuestion} from "../../../../../services/questionService";

const UpvoteDownvote = ({qid}) => {
    const [vote, setVote] = useState(0);
    const [status, setStatus] = useState(0)
    const {user} = useAuthContext()

    useEffect(() => {
        async function fetchData() {
            let response = await UpvoteDownvote.getQuestionStatus(qid, user.userName)
            setVote(response.totalVotes)
            setStatus(response.voteStatus)
        }

        fetchData()
    }, [])

    const handleUpvote = async () => {
        let response = await UpvoteDownvote.upvoteQuestion(qid, user.userName)
        setVote(response.totalVotes)
        setStatus(response.voteStatus)
    };

    const handleDownvote = async () => {
        let response = await UpvoteDownvote.downvoteQuestion(qid, user.userName)
        setVote(response.totalVotes)
        setStatus(response.voteStatus)
    };

    return (
        <div>

            {status !== 1 && <BsArrowUpCircle id={"upvote"} onClick={handleUpvote}/>}
            {status === 1 && <BsArrowUpCircleFill id={"upvote"} onClick={handleUpvote}/>}

            <h3 id={"numVote"}>{vote}</h3>

            {status !== -1 && <BsArrowDownCircle id={"downVote"} onClick={handleDownvote}/>}
            {status === -1 && <BsArrowDownCircleFill id={"downVote"} onClick={handleDownvote}/>}

        </div>
    );
};

UpvoteDownvote.downvoteQuestion = downvoteQuestion
UpvoteDownvote.upvoteQuestion = upvoteQuestion
UpvoteDownvote.getQuestionStatus = getQuestionStatus
export default UpvoteDownvote;