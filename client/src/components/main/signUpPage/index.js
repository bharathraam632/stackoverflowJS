import {useState} from "react";
import Form from "../baseComponents/form";
import Input from "../baseComponents/input";
import Textarea from "../baseComponents/textarea";
import "./index.css"
import axios from "axios";
import {useSignUp} from "../../../hooks/useSignUp";


const SignUp = ({handleQuestions}) => {
    const {signup, isLoading, error} = useSignUp()
    const [userName, setUsername] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [userFullName, setUserFullName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userPhone, setUserPhone] = useState("");
    const [userSummary, setUserSummary] = useState("");
    const [profilePicture, setProfilePicture] = useState(null);


    const [userNameErr, setUsernameErr] = useState("");
    const [userPasswordErr, setUserPasswordErr] = useState("");
    const [userFullNameErr, setUserFullNameErr] = useState("");
    const [userEmailErr, setUserEmailErr] = useState("");
    const [userPhoneErr, setUserPhoneErr] = useState("");
    const [userSummaryErr, setUserSummaryErr] = useState("");


    function isValidPhoneNumber(phoneNumber) {
        // Regular expression pattern for a valid phone number containing only digits, hyphens, and parentheses
        const phonePattern = /^[\d()-]+$/;

        // Test the phoneNumber against the pattern
        return phonePattern.test(phoneNumber);
    }

    function isValidEmail(email) {
        // Regular expression pattern for a valid email address
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // Test the email against the pattern
        return emailPattern.test(email);
    }

    const handleProfilePictureChange = (event) => {
        const file = event.target.files[0];
        setProfilePicture(file);
    };

    const validateFields = async () => {
        let isValid = true;
        if (!userName) {
            setUsernameErr("Username cannot be empty");
            isValid = false;
        }

        if (!userPassword) {
            setUserPasswordErr("Password cannot be empty");
            isValid = false;
        } else if (userPassword.length < 8) {
            setUserPasswordErr("Password length must be greater than equal to 8");
            isValid = false;
        }

        if (!userFullName) {
            setUserFullNameErr("Please provide Full Name");
            isValid = false;
        }

        if (!userEmail) {
            setUserEmailErr("Email cannot be empty");
            isValid = false;
        } else if (!isValidEmail(userEmail)) {
            setUserEmailErr("Please enter valid email");
            isValid = false;
        }

        if (!userSummary) {
            setUserSummaryErr("Please provide a brief summary about yourself.");
            isValid = false;
        } else if (userSummary.length > 300) {
            setUserSummaryErr("Summary cannot be more than 300 characters");
            isValid = false;
        }

        if (!userPhone) {
            setUserPhoneErr("Please enter phone number")
            isValid = false;
        } else if (!isValidPhoneNumber(userPhone)) {
            setUserPhoneErr("Please enter valid phone number")
            isValid = false;
        }

        return isValid
    }

    const signUp = async () => {
        if (!await validateFields()) {
            return
        }

        let image = "";
        if (profilePicture !== null) {
            const fd = new FormData();
            fd.append("image", profilePicture, profilePicture.name);
            await axios
                .post(
                    "https://api.imgbb.com/1/upload?key=057c9a9ac1bb914d95dfe4a1d47f50d5",
                    fd
                )
                .then((res) => {
                    image = res.data.data.display_url;
                });
        } else {
            image = "https://i.ibb.co/KWMwLkv/default.jpg";
        }

        const userObj = {
            userName: userName,
            userPassword: userPassword,
            userFullName: userFullName,
            userEmail: userEmail,
            userPhoneNumber: userPhone,
            userSummary: userSummary,
            userProfilePicPath: image
        };

        await signup(userObj);
        const user = localStorage.getItem("user")
        if (user) {
            handleQuestions()
        }
    };

    return (
        <>
            <h1 className="centered">SIGN UP</h1>
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
                <Input
                    title={"Full Name"}
                    hint={"Enter your Real Full Name"}
                    id={"formNameInput"}
                    val={userFullName}
                    setState={setUserFullName}
                    err={userFullNameErr}
                />
                <Input
                    title={"Email"}
                    hint={"Enter your email"}
                    id={"formEmailInput"}
                    val={userEmail}
                    setState={setUserEmail}
                    err={userEmailErr}
                />
                <Input
                    title={"Phone"}
                    hint={"Enter your phone Number"}
                    id={"formPhoneInput"}
                    val={userPhone}
                    setState={setUserPhone}
                    err={userPhoneErr}
                />

                <Textarea
                    title={"Summary"}
                    hint={"Please tell us about yourself..."}
                    id={"formSummaryInput"}
                    val={userSummary}
                    setState={setUserSummary}
                    err={userSummaryErr}
                />

                <input
                    type="file"
                    accept="image/*"
                    id={"formImageInput"}
                    onChange={handleProfilePictureChange}
                />

                <div className="btn_indicator_container">
                    <button
                        disabled={isLoading}
                        className="form_postBtn"
                        onClick={() => {
                            signUp();
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

export default SignUp;
