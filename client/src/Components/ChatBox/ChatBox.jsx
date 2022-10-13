import React, { useState, useEffect, useRef } from "react";
import "./ChatBox.css";
import { getUser } from "../../api/UserRequest";
import { addMessage, getMessages } from "../../api/MessageRequests";
import { format } from "timeago.js";
import InputEmoji from "react-input-emoji";

const ChatBox = ({ chat, currentUser, setSendMessage, recieveMessage }) => {
  const [userData, setUserData] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const handleChange = (newMessage) => {
    setNewMessage(newMessage);
  };

  // fetching data for header
  useEffect(() => {
    const userId = chat?.members?.find((id) => id !== currentUser);
    const getUserData = async () => {
      try {
        const { data } = await getUser(userId);
        setUserData(data);
      } catch (error) {
        console.log(error);
      }
    };
    if (chat !== null) getUserData();
  }, [chat, currentUser]);

  // fetching data for messages
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        console.log(chat._id);
        const { data } = await getMessages(chat._id);
        setMessages(data);

        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    if (chat !== null) fetchMessages();
  }, [chat]);

  //Always scroll to last message
  useEffect(() => {
    scroll.current?.scrollIntoView({ behaivor: "smooth" });
  }, [messages]);

  // Send Message
  const handleSend = async (e) => {
    e.preventDefault();
    const message = {
      senderId: currentUser,
      text: newMessage,
      chatId: chat._id,
    };

    const receiverId = chat.members.find((id) => id !== currentUser);
    // send message to socket server
    setSendMessage({ ...message, receiverId });

    // send message to database
    try {
      console.log(message);
      const { data } = await addMessage(message);
      setMessages([...messages, data]);
      setNewMessage("");
    } catch (error) {
      console.log(error);
    }
  };

  // Receive Message from parent component
  useEffect(() => {
    console.log("Message Arrived: ", recieveMessage);
    if (recieveMessage !== null && recieveMessage.chatId === chat._id) {
      setMessages([...messages, recieveMessage]);
    }
  }, [recieveMessage]);

  const scroll = useRef();
  const imageRef = useRef();

  return (
    <>
      <div className="ChatBox-container">
        {chat ? (
          <>
            <div className="chat-header">
              <div className="follower">
                <div>
                  <div className="online-dot"></div>
                  <img
                    src={
                      userData?.profilePicture
                        ? process.env.REACT_APP_PUBLIC_FOLDER +
                          userData.profilePicture
                        : process.env.REACT_APP_PUBLIC_FOLDER +
                          "avatar/defaultProfile.png"
                    }
                    alt="Profile"
                    style={{ width: "50px", height: "50px" }}
                    className="follwerImage"
                  />
                  <div className="name" style={{ fontSize: "0.9rem" }}>
                    <span>
                      {userData?.firstname}
                      {userData?.lastname}
                    </span>
                  </div>
                </div>
              </div>
              <hr
                style={{
                  width: "85%",
                  border: "0.1px solid #ececec",
                  marginTop: "20px",
                }}
              />
            </div>
            {/* chatbox Messages */}
            <div className="chat-body">
              {messages.map((message, id) => (
                <div
                  ref={scroll}
                  key={id}
                  className={
                    message.senderId === currentUser ? "message own" : "message"
                  }
                >
                  <span>{message.text}</span>
                  <span>{format(message.createdAt)}</span>
                </div>
              ))}
            </div>
            {/* chat-sender */}
            <div className="chat-sender">
              <div onClick={() => imageRef.current.click()}>+</div>
              <InputEmoji value={newMessage} onChange={handleChange} />
              <div className="send-button button" onClick={handleSend}>
                Send
              </div>
              <input
                type="file"
                name=""
                id=""
                style={{ display: "none" }}
                ref={imageRef}
              />
            </div>
          </>
        ) : (
          <span className="chatbox-empty-message">
            Tap on a Chat to start Conversation...
          </span>
        )}
      </div>
    </>
  );
};

export default ChatBox;

// import React, { useEffect, useState } from "react";
// import { useRef } from "react";
// import { addMessage, getMessages } from "../../api/MessageRequests";
// import { getUser } from "../../api/UserRequest";
// import "./ChatBox.css";
// import { format } from "timeago.js";
// import InputEmoji from "react-input-emoji";

// const ChatBox = ({ chat, currentUser, setSendMessage, receivedMessage }) => {
//   const [userData, setUserData] = useState(null);
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState("");

//   const handleChange = (newMessage) => {
//     setNewMessage(newMessage);
//   };

//   // fetching data for header
//   useEffect(() => {
//     const userId = chat?.members?.find((id) => id !== currentUser);
//     const getUserData = async () => {
//       try {
//         const { data } = await getUser(userId);
//         setUserData(data);
//       } catch (error) {
//         console.log(error);
//       }
//     };

//     if (chat !== null) getUserData();
//   }, [chat, currentUser]);

//   // fetch messages
//   useEffect(() => {
//     const fetchMessages = async () => {
//       try {
//         const { data } = await getMessages(chat._id);
//         setMessages(data);
//       } catch (error) {
//         console.log(error);
//       }
//     };

//     if (chat !== null) fetchMessages();
//   }, [chat]);

//   // Always scroll to last Message
//   useEffect(() => {
//     scroll.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   // Send Message
//   const handleSend = async (e) => {
//     e.preventDefault();
//     const message = {
//       senderId: currentUser,
//       text: newMessage,
//       chatId: chat._id,
//     };
//     const receiverId = chat.members.find((id) => id !== currentUser);
//     // send message to socket server
//     setSendMessage({ ...message, receiverId });
//     // send message to database
//     try {
//       const { data } = await addMessage(message);
//       setMessages([...messages, data]);
//       setNewMessage("");
//     } catch {
//       console.log("error");
//     }
//   };

//   // Receive Message from parent component
//   useEffect(() => {
//     console.log("Message Arrived: ", receivedMessage);
//     if (receivedMessage !== null && receivedMessage.chatId === chat._id) {
//       setMessages([...messages, receivedMessage]);
//     }
//   }, [receivedMessage]);

//   const scroll = useRef();
//   const imageRef = useRef();
//   return (
//     <>
//       <div className="ChatBox-container">
//         {chat ? (
//           <>
//             {/* chat-header */}
//             <div className="chat-header">
//               <div className="follower">
//                 <div>
//                   <img
//                     src={
//                       userData?.profilePicture
//                         ? process.env.REACT_APP_PUBLIC_FOLDER +
//                           userData.profilePicture
//                         : process.env.REACT_APP_PUBLIC_FOLDER +
//                           "defaultProfile.png"
//                     }
//                     alt="Profile"
//                     className="followerImage"
//                     style={{ width: "50px", height: "50px" }}
//                   />
//                   <div className="name" style={{ fontSize: "0.9rem" }}>
//                     <span>
//                       {userData?.firstname} {userData?.lastname}
//                     </span>
//                   </div>
//                 </div>
//               </div>
//               <hr
//                 style={{
//                   width: "95%",
//                   border: "0.1px solid #ececec",
//                   marginTop: "20px",
//                 }}
//               />
//             </div>
//             {/* chat-body */}
//             <div className="chat-body">
//               {messages.map((message) => (
//                 <>
//                   <div
//                     ref={scroll}
//                     className={
//                       message.senderId === currentUser
//                         ? "message own"
//                         : "message"
//                     }
//                   >
//                     <span>{message.text}</span>{" "}
//                     <span>{format(message.createdAt)}</span>
//                   </div>
//                 </>
//               ))}
//             </div>
//             {/* chat-sender */}
//             <div className="chat-sender">
//               <div onClick={() => imageRef.current.click()}>+</div>
//               <InputEmoji value={newMessage} onChange={handleChange} />
//               <div className="send-button button" onClick={handleSend}>
//                 Send
//               </div>
//               <input
//                 type="file"
//                 name=""
//                 id=""
//                 style={{ display: "none" }}
//                 ref={imageRef}
//               />
//             </div>{" "}
//           </>
//         ) : (
//           <span className="chatbox-empty-message">
//             Tap on a chat to start conversation...
//           </span>
//         )}
//       </div>
//     </>
//   );
// };

// export default ChatBox;
