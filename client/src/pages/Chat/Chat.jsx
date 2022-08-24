import React, { useEffect, useState } from "react";
import LogoSearch from "../../Components/LogoSearch/LogoSearch";
import "./Chat.css";
import { useSelector } from "react-redux";
import { userChats } from "../../api/ChatRequest";
import Conversation from "../../Components/Conversation/Conversation";

const Chat = () => {
  const { user } = useSelector((state) => state.authReducer.authData);
  console.log(user);
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const getChats = async () => {
      try {
        const { data } = await userChats(user._id);
        setChats(data);
        console.log(data);
      } catch (error) {}
    };
    getChats();
  }, [user]);
  return (
    <div className="Chat">
      {/* Left Side */}
      <div className="Left-side-chat">
        <LogoSearch />
        <div className="Chat-container">
          <h2>Chats</h2>
          <div className="Chat-list">
            {chats.map((chat, id) => (
              <div key={id}>
                <Conversation data={chat} currentUserId={user._id} />
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Right Side */}
      <div className="Right-side-chat">
        <div className="Right-side">Right-side</div>
      </div>
    </div>
  );
};

export default Chat;
