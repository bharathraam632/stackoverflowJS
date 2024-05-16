import { getMetaData } from "../tool/index";

export default class Question {
    constructor({ _id, title, text, tags, asked_by, ask_date_time, answers, views }) {
        this._id = _id;
        this.title = title;
        this.text = text;
        this.tags = tags;
        this.asked_by = asked_by;
        this.ask_date_time = ask_date_time;
        this.answers = answers;
        this.views = views;
    }

    getAnswerCount() {
        return this.ansIds.length;
    }

    addAnswer(aid) {
        this.ansIds.unshift(aid);
    }

    getAnswersId() {
        return this.ansIds;
    }

    getTagsId() {
        return this.tagIds;
    }

    calculateTimeElapsed() {
        return getMetaData(this.askDate);
    }

    getQuestionViews() {
        return this.views;
    }

    addViewCount() {
        this.views++;
    }

    setNewestAnswerDate(date) {
        if (this.newAnsDate == null || this.newAnsDate < date) {
            this.newAnsDate = date;
        }
    }
}
