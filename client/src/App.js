import './App.css';
import io from "socket.io-client";
import React, {useState, useEffect} from "react";

function App() {
  const [socket] = useState(() => io(":8000"))
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const onChangeHandler = e => {
    setInput(e.target.value);
  }

  const onSubmitHandler = e => {
    e.preventDefault();
    socket.emit("chat", input);
  }

  useEffect(() => {
    console.log("Is this thing on??");
    socket.on("postChat", msg => {
      // with socket we can't do the normal setMessages([...m, msg]). Instead we need to do the following:
      setMessages(prevmsgs => {return [...prevmsgs, msg]})
    })
    return () => socket.disconnect(true);
  }, [socket])

  return (
    <div className="App">
      <form onSubmit = {onSubmitHandler}>
        <input type = "text" name = "msg" autoComplete = "off" onChange = {onChangeHandler}/>
        <input type = "submit" value = "Submit" />
      </form>
      <div className = "messages">
        {
          messages.map((msgs, i) => {
            return <p key = {i}>{msgs}</p>
          })
        }
      </div>
    </div>
  );
}

export default App;
