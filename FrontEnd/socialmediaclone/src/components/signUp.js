const { useState } = require('react');

function SignUp(props) {
    const { email, setEmail } = useState(null);
    const { userName, setUserName } = useState(null);
    const { password, setPassword } = useState(null);

    function logIn(e) {
        props.signIn(userName, email, password).then((response) => {
            props.setToken(response);
        });
        e.preventDefault();
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
module.exports = SignUp;