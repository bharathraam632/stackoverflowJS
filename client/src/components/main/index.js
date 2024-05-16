import "./index.css";
import {useEffect, useState} from "react";
import SideBarNav from "./sideBarNav";
import QuestionPage from "./questionPage";
import TagPage from "./tagPage";
import AnswerPage from "./answerPage";
import NewQuestion from "./newQuestion";
import NewAnswer from "./newAnswer";
import {useAuthContext} from "../../hooks/useAuthContext";
import SignUp from "./signUpPage";
import LogIn from "./loginPage";
import UserProfile from "./profile";

const Main = ({search = "", title, setQuesitonPage}) => {
    const [page, setPage] = useState("home");
    const [questionOrder, setQuestionOrder] = useState("newest");
    const [qid, setQid] = useState("");
    let selected = "";
    let content = null;
    const {user} = useAuthContext()
    const [profile, setProfile] = useState(user)

    useEffect(() => {
        setPage("home");
    }, [search, user]);

    const handleQuestions = () => {
        setQuesitonPage();
        setPage("home");
    };

    const handleTags = () => {
        setPage("tag");
    };

    const handleSignUp = () => {
        setPage("signup")
    }

    const handleAnswer = (qid) => {
        setQid(qid);
        setPage("answer");
    };

    const clickTag = (tname) => {
        setQuesitonPage("[" + tname + "]", tname);
        setPage("home");
    };

    const handleUserProfile = (userProfile) => {
        setProfile(userProfile)
        setPage("profile")
    }

    const handleNewQuestion = () => {
        if (user) {
            setPage("newQuestion");
        } else {
            setPage("login")
        }
    };

    const handleNewAnswer = () => {
        setPage("newAnswer");
    };

    const getQuestionPage = (order = "newest", search = "") => {
        return (
            <QuestionPage
                title_text={title}
                order={order}
                search={search}
                setQuestionOrder={setQuestionOrder}
                clickTag={clickTag}
                handleAnswer={handleAnswer}
                handleNewQuestion={handleNewQuestion}
                handleUserProfile={handleUserProfile}
            />
        );
    };

    switch (page) {
        case "signup": {
            selected = "";
            content = <SignUp handleQuestions={handleQuestions}/>
            break;
        }
        case "login": {
            selected = "";
            content = <LogIn handleQuestions={handleQuestions} handleSignUp={handleSignUp}/>
            break;
        }
        case "home": {
            selected = "q";
            content = getQuestionPage(questionOrder.toLowerCase(), search);
            break;
        }
        case "tag": {
            selected = "t";
            content = (
                <TagPage
                    clickTag={clickTag}
                    handleNewQuestion={handleNewQuestion}
                />
            );
            break;
        }
        case "answer": {
            selected = "";
            content = (
                <AnswerPage
                    qid={qid}
                    handleNewQuestion={handleNewQuestion}
                    handleNewAnswer={handleNewAnswer}
                    handleUserProfile={handleUserProfile}
                    handleQuestions={handleQuestions}
                />
            );
            break;
        }
        case "newQuestion": {
            selected = "";
            content = <NewQuestion handleQuestions={handleQuestions}/>;
            break;
        }
        case "newAnswer": {
            selected = "";
            content = <NewAnswer qid={qid} handleAnswer={handleAnswer}/>;
            break;
        }
        case "profile": {
            selected = "";
            content = <UserProfile user={profile}/>
            break;
        }
        default:
            selected = "q";
            content = getQuestionPage();
            break;
    }

    return (
        <div id="main" className="main">
            <SideBarNav
                selected={selected}
                handleQuestions={handleQuestions}
                handleTags={handleTags}
            />
            <div id="right_main" className="right_main">
                {user && page !== "profile" &&
                <button id={"profile_button"} className={"profile-btn"} onClick={() => handleUserProfile(user)}>User Profile</button>}
                {content}
            </div>
        </div>
    );
};

export default Main;
