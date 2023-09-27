import React from "react";
import './Message.css';
const Message = ({ handleSubmit, text, setText, setFile }) => {
  return (
    <div className="footer">
    <footer class="py-4 bg-dark fixed-bottom">
      <div class="container">
      <form className="message_form" onSubmit={handleSubmit}>
        <p class="m-0 text-center text-white row">
          <div className="col">  
          <input className="file-input" onChange={(e) => setFile(e.target.files[0])} type="file"/>
          </div>
          <div className="col">
          <input className="text-input" type="text" placeholder="Enter message" value={text} onChange={(e) => setText(e.target.value)}/>
          </div>
          <div className="col">
          <button className="button-input">Send</button>
          </div>
        </p>
        </form>

      </div>
    </footer>
  </div>
  );
};

export default Message
