import react, {useState} from 'react';
const { addPostComment, addCommentComment } = require('../Api');

export default function NewComment(props) {
    const  [text, setText]  = useState(null);
    const  [ success, setSuccess ] = useState(false);
    function submitPostComment(e) {
        addPostComment(props.id, props.userToken, props.userToken).then((response) => {
            console.log(response);
            setSuccess(true);
        });
        e.preventDefault();//maybe let it refresh on success
    };
    function submitCommentComment(e) {
        addCommentComment(props.id, text, props.userToken).then((response) => {
            console.log(response);
            setSuccess(true);
        });
        e.preventDefault();//maybe let it refresh on success
    };
    function handleTextChange(e) {
        setText(e.target.value)
        e.preventDefault();
    }
    if (success) {
        return (
            <div>comment submitted</div>
        )
    } else {
        if (props.type === "post") {
            return (
                <div>
                    <form onSubmit={submitPostComment}>

                        <label>
                            Password:
                        <input type="text" value={text} onChange={handleTextChange} />
                        </label>
                        <input type="submit" value="Submit" />
                    </form>
                </div>
            )
        }
        else if (props.type === "comment") {
            return (
                <div>
                    <form onSubmit={submitCommentComment}>

                        <label>
                            Password:
                        <input type="text" value={text} onChange={handleTextChange} />
                        </label>
                        <input type="submit" value="Submit" />
                    </form>
                </div>
            )
        }
    }
}
