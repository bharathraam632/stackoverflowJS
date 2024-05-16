import {REACT_APP_API_URL, api} from "./config";

const QUESTION_API_URL = `${REACT_APP_API_URL}/question`;

// To get Questions by Filter
const getQuestionsByFilter = async (order = "newest", search = "") => {
    const res = await api.get(
        `${QUESTION_API_URL}/getQuestion?order=${order}&search=${search}`
    ).catch(error => {
        return {status: 500, error: error.response.data}
    });

    return res.data;
};

// To get Questions by id
const getQuestionById = async (qid) => {
    const res = await api.get(`${QUESTION_API_URL}/getQuestionById/${qid}`).catch(error => {
        return {status: 500, error: error.response.data}
    });

    return res.data;
};

// To add Questions
const addQuestion = async (q) => {
    const res = await api.post(`${QUESTION_API_URL}/addQuestion`, q).catch(error => {
        return {status: 500, error: error.response.data}
    });

    return res.data;
};

const upvoteQuestion = async (qid, userName) => {
    const res = await api.post(`${QUESTION_API_URL}/upVoteQuestion`, {qid, userName}).catch(error => {
        return {status: 500, error: error.response.data}
    });

    return res.data;
}

const downvoteQuestion = async (qid, userName) => {
    const res = await api.post(`${QUESTION_API_URL}/downVoteQuestion`, {qid, userName}).catch(error => {
        return {status: 500, error: error.response.data}
    });

    return res.data;
}

const getQuestionStatus = async (qid, userName) => {
    const res = await api.post(`${QUESTION_API_URL}/getQuestionStatus`, {qid, userName}).catch(error => {
        return {status: 500, error: error.response.data}
    });

    return res.data;
}

const reportQuestionStatus = async (qid, userName) => {
    const res = await api.post(`${QUESTION_API_URL}/reportQuestionStatus`, {qid, userName}).catch(error => {
        return {status: 500, error: error.response.data}
    });

    return res.data;
}

const reportQuestion = async (qid, userName) => {
    const res = await api.post(`${QUESTION_API_URL}/reportQuestion`, {qid, userName}).catch(error => {
        return {status: 500, error: error.response.data}
    });
    return res.data;
}

const getReportCounts = async (qid) => {
    const res = await api.post(`${QUESTION_API_URL}/getReportCounts`, {qid}).catch(error => {
        return {status: 500, error: error.response.data}
    });
    return res.data;

}

export {
    getQuestionsByFilter,
    getQuestionById,
    addQuestion,
    upvoteQuestion,
    downvoteQuestion,
    getQuestionStatus,
    reportQuestionStatus,
    reportQuestion,
    getReportCounts
};
