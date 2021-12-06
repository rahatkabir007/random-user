

const Button = ({activeUser, getUser}) => {
  
    return (
        <div>
            <button onClick={getUser}>{ activeUser? "Get Another Random User" : "Get Random User"}</button>
        </div>
    );
};

export default Button;