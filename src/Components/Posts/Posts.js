import React, { useEffect, useState } from "react";
import { db, auth, storage } from "../../imp";
import { collection, query, where, onSnapshot, addDoc, Timestamp, orderBy,} from "firebase/firestore";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import Card from "./Card/Card";
import Message from "./Message/Message";
import Text from "./Text/Text";
import './Posts.css'
const Posts = () => {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");
  const [text, setText] = useState("");
  const [file, setFile] = useState("");
  const [sms, setSms] = useState([]);
  const [search,setSearch] = useState([]);
  const one = auth.currentUser.uid;

  useEffect(() => {
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("uid", "not-in", [one]));
    const unsub = onSnapshot(q, (querySnapshot) => {
      let users = [];
      querySnapshot.forEach((doc) => {
        users.push(doc.data());
      });
      setSearch(users);
      setUsers(users);
    });
    return () => unsub();
  });

  const selectUser = async (user) => {
    setMessage(user);
    const two = user.uid;
    const messageID = one > two ? `${one + two}` : `${two + one}`;
    const smsRef = collection(db, "messages", messageID, "text");
    const q = query(smsRef, orderBy("sentAt", "asc"));
    onSnapshot(q, (querySnapshot) => {
      let sms = [];
      querySnapshot.forEach((doc) => {
        sms.push(doc.data());
      });
      setSms(sms);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const two = message.uid;
    const messageID = one > two ? `${one + two}` : `${two + one}`;
    let url;
    if (file) {
      const fileRef = ref(
        storage,
        `file/${new Date().getTime()} - ${file.name}`
      );
      const spp = await uploadBytes(fileRef, file);
      const dlUrl = await getDownloadURL(ref(storage, spp.ref.fullPath));
      url = dlUrl;
    }
    await addDoc(collection(db, "messages", messageID, "text"), {
      text,
      from: one,
      to: two,
      sentAt: Timestamp.fromDate(new Date()),
      file: url || "",
    });
    setText("");
    setFile("");
  };
  const filterCard = e => {
    const value = e.target.value.toLowerCase();
    const filteredCard = search.filter(
      user => (`${user.specialized}`.toLowerCase().includes(value))
    )
    setUsers(filteredCard);
  }
  const filterSelected = e => {
    const selectedResult = e.target.value;
    const selectedAns = search.filter(
      user => (`${user.selected}`.toLowerCase().includes(selectedResult))
    )
    setUsers(selectedAns)
  }
  const filterOnline = e => {
    const onlineResult = e.target.value;
    const ONLINEaNS = search.filter(
      user => (`${user.isOnline}`.toLowerCase().includes(onlineResult))
    )
    setUsers(ONLINEaNS)
  }
  return (
    <div className="screen_conatiner">
     <input  className='search-box' placeholder='Type any Subject ...' onInput={filterCard}/>
            <label>Mentor</label>
            <input type="radio" name="naan" value="mentor" onInput={filterSelected}/>
            <label>Student</label>
            <input type='radio' name="naan" value="student" onInput={filterSelected}/>
            <label>Online</label>
            <input type='radio' name="naan" value="true" onInput={filterOnline}/>
    <div className="home_container row">
      <div className="posts_container col">
        {users.map((user) => (
          <Card key={user.uid} user={user} selectUser={selectUser} one={one} message={message} />
        ))}
      </div>
      <div className="messages_container col">
          
          <div className="messages_posts">
              <span><em>{message.fullName}</em></span>
            </div>
            <div className="messages">
              {sms.length
                ? sms.map((sms, i) => (
                    <Text key={i} sms={sms} one={one} />))
                : null}
            </div>
            <Message handleSubmit={handleSubmit} text={text} setText={setText} setFile={setFile}/>
      </div>
    </div></div>
  );
};

export default Posts;
