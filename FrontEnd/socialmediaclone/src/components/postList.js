import react, {useState} from 'react';
const {getPosts}= require('../Api');

function RenderPosts(posts, onePost) {
    let renderPosts=[];
    posts.forEach(post => {
        renderPosts.push(
            <div>
                <div>Title: {post.title}</div>
                <div>Description: {post.description}</div>
                <div>text: {post.text}</div>
                <button onClick={()=>onePost(post._id)}>View Post</button>
            </div>
        )
    })
    return renderPosts;
}
export default function PostList(props) {
    const [posts, setPosts] = useState(null);
    getPosts(props.userToken).then(response=>{
        setPosts(response);
    });
  
    
    if (!posts) {
        return(
            <div>
                Loading...
            </div>
        )
    } else {
        let renderPosts=RenderPosts(posts, props.onePost);
        return(
            <div>
                {renderPosts}
            </div>
        )
    }
}
