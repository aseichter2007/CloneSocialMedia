const { useState } = require('react');
const {createPost} = require('../Api')

function NewPost(props){
const {title, setTitle} = useState(null);
const {description, setDescription} = useState(null);
const {text, setText} = useState(null);
const {success, setSuccess} = useState(false);

function submitPost(e) {
    createPost(props.userToken).then((response) => {
        console.log(response);
        setSuccess(true);
    });
    e.preventDefault();//maybe let it refresh on success
};
function handleTitleChange(e){
    setTitle(e.target.value)
    e.preventDefault();
}
function handleDescriptionChange(e){
    setDescription(e.target.value)
    e.preventDefault();
}
function handleTextChange(e){
    setText(e.target.value)
    e.preventDefault();
}
if(!success)
{
    return (
    <div>
        <form onSubmit={submitPost}>
            <label>
                Email:
                        <input type="text" value={title} onChange={handleTitleChange} />
            </label>
            <label>
                UserName:
                        <input type="text" value={description} onChange={handleDescriptionChange} />
            </label>
            <label>
                Password:
                        <input type="text" value={text} onChange={handleTextChange} />
            </label>
            <input type="submit" value="Submit" />
        </form>
    </div>
)
} else {
    return(
        <div>
            Post Created!
        </div>
    )
}

}

}