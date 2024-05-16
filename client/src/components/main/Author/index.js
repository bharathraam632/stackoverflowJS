import {findUserByUsername} from "../../../services/userService";

const Author = ({username, handleUserProfile, isQuestion = true}) => {
    const handleUser = async () => {
        const res = await findUserByUsername(username);
        if (res.status === 200) {
            handleUserProfile(res.data.user)
        }
    }

    return (
        <>
            {isQuestion && <div className="question_author" onClick={handleUser}>{username}</div>}
            {!isQuestion && <div className="answer_author" onClick={handleUser}>{username}</div>}
        </>
    )
}

export default Author;