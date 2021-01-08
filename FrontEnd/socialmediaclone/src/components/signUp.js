import react, {useState} from 'react';

export default function SignUp(props) {
    const [ email, setEmail ] = useState("");
    const [ userName, setUserName ] = useState("");
    const [ password, setPassword ] = useState("");

    function logIn(e) {
        e.preventDefault();
        props.signUp(userName, email, password).then((response) => {
           props.signIn(userName, password).then((response) => {
            props.setToken(response);
           }).catch((error) => {console.error({signUpSignIn: error})});
        }).catch((err) => {console.error({signUp: err});});
    };
    function handleEmailChange(e){
        setEmail(e.target.value)
        e.preventDefault();
    }
    function handleUserNameChange(e){
        setUserName(e.target.value)
        e.preventDefault();
    }
    function handlePasswordChange(e){
        setPassword(e.target.value)
        e.preventDefault();
    }

    return (
        <div>
            <form onSubmit={logIn}>
                <label>
                    Email:
                            <input type="text" value={email} onChange={handleEmailChange} />
                </label>
                <label>
                    UserName:
                            <input type="text" value={userName} onChange={handleUserNameChange} />
                </label>
                <label>
                    Password:
                            <input type="text" value={password} onChange={handlePasswordChange} />
                </label>
                <input type="submit" value="Submit" />
            </form>
        </div>
    )
}
