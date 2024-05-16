import {useState} from "react";
import Form from "../baseComponents/form";
import Input from "../baseComponents/input";
import "./index.css"
import {useLogIn} from "../../../hooks/useLogIn";

const LogIn = ({handleQuestions, handleSignUp}) => {
    const {login, isLoading, error} = useLogIn()
    const [userName, setUsername] = useState("");
    const [userPassword, setUserPassword] = useState("");

    const [userNameErr, setUsernameErr] = useState("");
    const [userPasswordErr, setUserPasswordErr] = useState("");


    const validate = async () => {
        let isValid = true;
        if (!userName) {
            setUsernameErr("Username cannot be empty");
            isValid = false;
        }

        if (!userPassword) {
            setUserPasswordErr("Password cannot be empty");
            isValid = false;
        }
        return isValid
    }

    const logIn = async () => {
        if (!await validate()) {
            return;
        }
        const userObj = {
            userName: userName,
            userPassword: userPassword,
        };

        await login(userObj);
        const user = localStorage.getItem("user")
        if (user) {
            handleQuestions()
        }
    };

    return (
        <>
            <h1 className="centered">LOGIN</h1>
            <Form>
                <Input
                    title={"Username"}
                    hint={"Enter a unique username"}
                    id={"formUsernameInput"}
                    val={userName}
                    setState={setUsername}
                    err={userNameErr}
                />
                <Input
                    title={"Password"}
                    hint={"Enter a strong password"}
                    id={"formPasswordInput"}
                    val={userPassword}
                    setState={setUserPassword}
                    err={userPasswordErr}
                />

                <div className="btn_indicator_container">
                    <button
                        disabled={isLoading}
                        id={"login_btn"}
                        className="form_postBtn"
                        onClick={() => {
                            logIn();
                        }}
                    >
                        LogIn
                    </button>

                    <button
                        className="form_postBtn"
                        onClick={() => {
                            handleSignUp();
                        }}
                    >
                        SignUp
                    </button>
                    <div className="mandatory_indicator">
                        * indicates mandatory fields
                    </div>
                </div>
                {error && <div className={"input_error"}>{error}</div>}
            </Form>
        </>

    );
};

export default LogIn;
