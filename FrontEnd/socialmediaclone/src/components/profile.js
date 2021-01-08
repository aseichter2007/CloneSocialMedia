import react, { useState } from 'react';
const {acceptFriend, }
function Profile(props) {
    const [showProfile, setShowProfile] = useState(false);
    const 
    if (showProfile) {
        let renderFriends = [];
        props.user.friends.forEach(friend => {
            renderFriends.push(
                <div>
                    <img src={friend.profilePic} alt="friends profile pic" height="100" width="100" />
                    <div>Username: {friend.username}</div>
                </div>
            )
        })

        return (
            <div>
                <button onClick={()=>setShowProfile(!showProfile)}>Hide Profile</button>
                <img src={props.user.profilePic} alt="profile pic" width="300" height="300" />
                <div>UserName: {props.user.userName}</div>
                <div>First Name: {props.user.firstName}</div>
                <div>Last Name: {props.user.lastName}</div>
                <div>About Me: {props.user.aboutMe}</div>
                <div>friends:</div>
                <div>{renderFriends}</div>
            </div>
        )
    } else {
        return(
            <div>
                <button onClick={()=>setShowProfile(!showProfile)}>Show Profile</button>
            </div>
        )
    }
}
module.exports = Profile;