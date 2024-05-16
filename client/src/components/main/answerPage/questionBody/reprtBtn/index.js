import React, {useEffect, useState} from 'react';
import {BsFlag, BsFlagFill} from "react-icons/bs";
import {useAuthContext} from "../../../../../hooks/useAuthContext";
import {getReportCounts, reportQuestion, reportQuestionStatus} from "../../../../../services/questionService";

const ReportButton = ({qid, handleQuestions}) => {
    const [isFlagged, setIsFlagged] = useState(-1);
    const [numReports, setNumReports] = useState(0);
    const {user} = useAuthContext()

    useEffect(() => {
        async function fetchData() {
            let res = await ReportButton.reportQuestionStatus(qid, user.userName)
            setIsFlagged(res.reportStatus)
            res = await ReportButton.getReportCounts(qid);
            setNumReports(res.totalReports);
        }

        fetchData()
    }, [])

    const handleFlagPost = async () => {
        let res = await ReportButton.getReportCounts(qid)
        if (isFlagged === -1 && res.totalReports === 9) {
            await ReportButton.reportQuestion(qid, user.userName)
            handleQuestions()
            return
        }

        res = await ReportButton.reportQuestion(qid, user.userName)
        setIsFlagged(res.reportStatus)
        res = await ReportButton.getReportCounts(qid);
        setNumReports(res.totalReports);
    };

    return (
        <div className="post-report-button">
            {isFlagged === 1 && <BsFlagFill id={"filledFlag"} onClick={handleFlagPost}/>}
            {isFlagged === -1 && <BsFlag id={"flag"} onClick={handleFlagPost}/>}
            <span id={"numReports"}>{numReports}</span>
        </div>
    );
};

ReportButton.getReportCounts = getReportCounts
ReportButton.reportQuestion = reportQuestion
ReportButton.reportQuestionStatus = reportQuestionStatus
export default ReportButton;