const {useState} = require('react');

function Profile(props){
    let renderFriends=[];
    props.user.friends.forEach(friend => {
        renderFriends.push(
            <div>
                <img src={friend.profilePic} height="100" width="100"/>
                <div>Username: {friend.username}</div>
            </div>
        )
    })

    return (
        <div>
            <img src={props.user.profilePic} width="300"height="300"/>
            <div>UserName: {props.user.userName}</div>
            <div>First Name: {props.user.firstName}</div>
            <div>Last Name: {props.user.lastName}</div>
            <div>About Me: {props.user.aboutMe}</div>
            <div>friends:</div>
            <div>{renderFriends}</div>
        </div>
    )
}
module.exports = Profile;