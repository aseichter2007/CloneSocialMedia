const axios = require('axios');
const apiUrl = "http://localhost:5000/api/";
const verbose = true;

async function getUserProfile(userToken, userName){
    let config = {
        headers: {
         'x-auth-token': userToken,
        }
      }
    let response = await axios.get((apiUrl+'/user/'+userName), config);
    
    
    if (verbose) {
        console.log(response)
    }
    return response;
}

async function getPosts(userToken){
    let config = {
        headers: {
         'x-auth-token': userToken,
        }
      }
    let response = await axios.get(apiUrl, config);
    
    
    if (verbose) {
        console.log(response)
    }
    return response;
}
async function getPost(id, userToken){
    let config = {
        headers: {
         'x-auth-token': userToken,
        }
      }
      let response = await axios.get((apiUrl+id), config);
      if (verbose) {
        console.log(response)
    }
    return response;
}
async function signIn(username, password){
    let payload = {username: username, password:password};
    let response = await axios.post(apiUrl, payload);
    if (verbose) {
        console.log(response)
    }
    return response;
}
async function signUp(username, email, password){
    let payload = {username: username, email: email, password:password};
    let response = await axios.post(apiUrl, payload);
    if (verbose){
        console.log(response);
    }
    return response;
}
async function addPostComment(postId ,text, userToken){
    let payload = {postId: postId, text: text}
    let config = {
        headers: {
         'x-auth-token': userToken,
        }
    }
    let response = await axios.post((apiUrl+'/post/'), payload, config);
    if (verbose){
        console.log(response);
    }
    return response;
}
async function addCommentComment(commentId ,text, userToken){
    let payload = {commenttId: commentId, text: text}
    let config = {
        headers: {
         'x-auth-token': userToken,
        }
    }
    let response = await axios.post((apiUrl +'/comment/'), payload, config);
    if (verbose){
        console.log(response);
    }
    return response;
}
async function createPost(title, description, text, userToken){
    let payload = {title: title, description: description, text: text}
    let config = {
        headers: {
         'x-auth-token': userToken,
        }
    }
    let response = await axios.post(apiUrl, payload, config);
    if (verbose){
        console.log(response);
    }
    return response;
}
async function deletePost(id, userToken){
    let config = {
        headers: {
         'x-auth-token': userToken,
        }
      }
    let response = await axios.delete(apiUrl+id, config);
    if (verbose){
        console.log(response);
    }
    return response;
}
async function addfriend(friendName, userToken){
    let payload = {friendUserName: friendName};
    let config = {
        headers: {
         'x-auth-token': userToken,
        }
    }
    let response = await axios.post((apiUrl+'/addfriend/'), payload, config)
    if (verbose){
        console.log(response);
    }
    return response;
}
async function deleteFriend(friendId, userToken){
    let payload = {friendId: friendId};

    let config = {
        headers: {
         'x-auth-token': userToken,
        }
    }
    let response = await axios.post((apiUrl+'/removefriend/'), payload, config)
    if (verbose){
        console.log(response);
    }
    return response;
}
async function acceptFriend(friendId, userToken){
    let payload = {friendId: friendId};

    let config = {
        headers: {
         'x-auth-token': userToken,
        }
      }
      let response = await axios.post((apiUrl+'/acceptfriend/'), payload, config)
      if (verbose){
          console.log(response);
      }
      return response;
}
exports.Api={
    getUserProfile,
    acceptFriend,
    deleteFriend, 
    addfriend,
    getPost,
    getPosts,
    createPost, 
    deletePost,
    signIn,
    signUp,
    addPostComment,
    addCommentComment,
}
exports.acceptFriend = acceptFriend;
exports.deleteFriend = deleteFriend;
exports.addfriend = addfriend;
exports.getPost = getPost;
exports.getPosts = getPosts;
exports.createPost = createPost;
exports.deletePost = deletePost;
exports.signIn = signIn;
exports.signUp = signUp;
exports.addPostComment = addPostComment;
exports.addCommentComment = addCommentComment;
exports.getUserProfile = getUserProfile;