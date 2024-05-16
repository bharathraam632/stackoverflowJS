import React from 'react';
import './index.css';

const UserProfile = ({ user }) => {
    const { userName, userEmail, userProfilePicPath, userFullName, userPhoneNumber, userSummary } = user;

    return (
        <div className="user-profile">
            <div className="profile-pic-container">
                <img id={"userPic"} src={userProfilePicPath} alt="Profile" className="profile-pic" />
            </div>
            <div className="user-details">
                <h2 id={"userFullName"}>{userFullName}</h2>
                <p id={"username"}>Username: {userName}</p>
                <p id={"userEmail"}>Email: {userEmail}</p>
                <p id={"userPhone"}>Phone: {userPhoneNumber}</p>
                <p id={"userSummary"} className="user-summary">{userSummary}</p>
            </div>
        </div>
    );
};

export default UserProfile;