import react, { useState } from 'react';

export default function SignIn(props) {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");

    function logIn(e) {
        e.preventDefault();
        props.signIn(userName, password).then((response) => {
            //console.log(response.data);
            props.setToken(response.data);
        }).catch((err) => { console.error(err); });
    };
    function handleUserNameChange(e) {
        setUserName(e.target.value)
        e.preventDefault();
    }
    function handlePasswordChange(e) {
        setPassword(e.target.value)
        e.preventDefault();
    }

    return (
        <div>
            <form onSubmit={logIn}>
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
