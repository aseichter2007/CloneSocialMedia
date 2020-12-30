import logo from './logo.svg';
import './App.css';
const {signUp, signIn} = require('./Api');
const {useState} = require('react');
const SignIn = require('./components/signIn');
const SignUp = require('./components/signUp');
const PostList = require('./components/postList');
const Post = require('./components/post');

function App() {
  const {userToken, setUserToken} = useState(null);
  const {signInUp, setSignInSignUp} = useState(0);
  const {onePost, setOnePost} = useState(null);
  if (!userToken) {
    if(signInUp ===0) { 
       return (
        <div >
          <button onClick={()=>setSignInSignUp(1)}>Sign up</button>
          <button onClick={()=>setSignInSignUp(2)}>Sign in</button>
        </div>
      );
    }
    if(signInUp === 1){
      return (
        <div>
          <SignUp setToken={setUserToken} signUp={signUp}></SignUp>
        </div>
      )
    }
    if (signInUp === 2) {
      return(
        <div>
          <SignIn setToken={setUserToken} signIn={signIn}></SignIn>
        </div>
      )
    }
  } else {
    if(onePost){
      return(
        <div>
          <Post userToken = {userToken} id={onePost} ></Post>
        </div>
      )
   } else { 
     return(
      <div>
        <PostList userToken = {userToken} onePost={setOnePost}></PostList>
      </div>
    )}
  }
  
}

export default App;
