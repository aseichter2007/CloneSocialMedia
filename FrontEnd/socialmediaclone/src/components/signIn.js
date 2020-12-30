const { useState } = require('react');

function SignIn(props) {
    const { email, setEmail } = useState(null);
    const { userName, setUserName } = useState(null);
    const { password, setPassword } = useState(null);

    function logIn(e) {
        props.signIn(userName, password).then((response) => {
            props.setToken(response);
        });
        e.preventDefault();
    };
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
module.exports = SignIn;