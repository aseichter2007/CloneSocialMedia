const { useState } = require('react');
const {getPost} = require('../Api');
const NewComment = require('./newComment');

function renderComments(comments,userToken, level = 0){
    let renderedComments = [];
    comments.forEach(comment => {
        let subcomments = renderComments(comment.subcomments, userToken,  (level + 1));//maybe
        renderedComments.push(
            <div>
                <div>{comment.text}</div>
                <div>{subcomments}</div>
                <NewComment id={comment._id} userToken = {userToken} type="comment"></NewComment>
            </div>
        )
    
    })
    return renderedComments;
}
function Post(props){
    const{post, setPost}= useState(null);
    getPost(props.id).then(response =>{
        setPost(response)
    })
    if(!post){
        return(
            <div>
                loading post...
            </div>
        )
    }else{
        let renderedComments= renderComments(post, props.userToken)
        return (
            <div>
                <div>Title: {post.title}</div>np
                <div>Description: {post.description}</div>
                <div>Text: {post.text}</div>
                <NewComment id={post._id} userToken = {props.userToken} type="post"></NewComment>
                <div>{renderedComments}</div>
            </div>
        )
    }

}
module.exports = Post;