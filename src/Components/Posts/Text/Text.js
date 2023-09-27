import React from "react";
import './Text.css'
const Text = ({ sms, one }) => {
  // const scrollRef = useRef();
  // useEffect(() => {
  //   scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  // }, [sms]);
  return (
    <div className={`message_wrapper ${sms.from === one ? "own" : ""}`}>
      <p className={sms.from === one ? "me" : "friend"}>
        {sms.file ? <object aria-labelledby="labell" width="100%" height="100%" data={sms.file}></object> : null}
        {sms.text}
        <br />
      </p>
    </div>
  );
};

export default Text;
