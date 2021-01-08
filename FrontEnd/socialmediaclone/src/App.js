import react, { useState } from 'react';
import './App.css';
import SignIn from './components/signIn';
import SignUp from './components/signUp';
import PostList from './components/postList';
import Post from './components/post';
import Profile from './components/profile';
const { signUp, signIn } = require('./Api');

function App() {
  const [userToken, setUserToken] = useState(null);
  const [signInUp, setSignInSignUp] = useState(0);
  const [onePost, setOnePost] = useState(null);
  console.log(signInUp);
  if (!userToken) {
    if (signInUp === 0) {
      return (
        <div >
          <button onClick={() => setSignInSignUp(1)}>Sign up</button>
          <button onClick={() => setSignInSignUp(2)}>Sign in</button>
        </div>
      );
    }
    if (signInUp === 1) {
      return (
        <div>
          <SignUp setToken={setUserToken} signUp={signUp} signIn={signIn}></SignUp>
        </div>
      )
    }
    if (signInUp === 2) {
      return (
        <div>
          <SignIn setToken={setUserToken} signIn={signIn}></SignIn>
        </div>
      )
    }

    //hmm. usestate isnt behaving. Oh I was destructuring it with {} instead of []
    setSignInSignUp(0);
    return (
      <div>
        required variable not initialized.
      </div>
    )
  } else {
    if (onePost) {
      return (
        <div>
          <Profile userToken={userToken} ></Profile>
          <Post userToken={userToken} id={onePost} ></Post>
        </div>
      )
    } else {
      return (
        <div>
          <Profile userToken={userToken}></Profile>
          <PostList userToken={userToken} onePost={setOnePost}></PostList>
        </div>
      )
    }
  }

}

export default App;
