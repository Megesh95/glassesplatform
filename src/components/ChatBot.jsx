import React, { useState, useEffect, useRef } from "react";
import "./ChatBot.css";
import arrow from "../assets/ChatBot_pics/image.png";
import chaticon from "../assets/ChatBot_pics/chat.png";
import logo from "../assets/ChatBot_pics/glasses.png";
import avatar1 from "../assets/ChatBot_pics/avatar1.png";
import avatar2 from "../assets/ChatBot_pics/avatar2.png";
import avatar3 from "../assets/ChatBot_pics/avatar3.png";
import back from "../assets/ChatBot_pics/back.png";
import bgimage from "../assets/ChatBot_pics/Backgroundimage.jpg";
import paperpin from "../assets/ChatBot_pics/paperpin.png";

function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [showMute, setShowMute] = useState(false);
  const [messages, setMessages] = useState([]);
  const [startNewConversation, setStartNewConversation] = useState(false);
  const [inputText, setInputText] = useState("");

  const chatPopupRef = useRef(null);

  const now = new Date();
  const formattedTime = now.toLocaleDateString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  const options = ["Buy Eyewear", "Locate Nearby Store", "Query about my order"];

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        isOpen &&
        chatPopupRef.current &&
        !chatPopupRef.current.contains(event.target)
      ) {
        setIsOpen(false);
        setStartNewConversation(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  function chatPopUpHeader() {
    return (
      <div className="chatHeader">
        <img className="logo" src={logo} alt="logo" />
        <h1>Welcome to V-Tech</h1>
        <p>How can we help you?</p>
        <div className="menuIcon" onClick={() => setShowMute(!showMute)}>⋮</div>
        {showMute && (
          <div className="muteDropdown">
            <span>🔇 Mute</span>
            <label className="switch">
              <input type="checkbox" />
              <span className="slider round"></span>
            </label>
          </div>
        )}
      </div>
    );
  }

  function chatIcon() {
    return (
      <div className="chatToggle" onClick={() => setIsOpen(!isOpen)}>
        <img
          className={`chatIcon ${isOpen ? "opened" : "closed"}`}
          src={isOpen ? arrow : chaticon}
          alt="chat toggle"
        />
      </div>
    );
  }

  function floatingNewConversationCard() {
    return (
      <div className="floatingCard">
        <h3>Start a conversation with our team of experts now!</h3>
        <div className="avatars">
          <img src={avatar1} alt="avatar1" />
          <img src={avatar2} alt="avatar2" />
          <img src={avatar3} alt="avatar3" />
        </div>
        <button
          className="startBtn"
          onClick={() => setStartNewConversation(true)}
        >
          New Conversation
        </button>
      </div>
    );
  }

  function newChatHeader() {
    return (
      <div className="newHeader fade-slide-in">
        <div
          className="backiconclass"
          onClick={() => setStartNewConversation(false)}
        >
          <img className="back" src={back} alt="back arrow" />
        </div>
        <img className="logo1" src={logo} alt="logo" />
        <div className="headerText">
          <span className="name">V-Tech Assistant</span>
          <span className="subtitle">I am here to help you!</span>
        </div>
      </div>
    );
  }

  function handleOptionClick(index) {
    const optionText = options[index];
    const time = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    const userMsg = { type: "user", text: optionText, time };
    const botMsg = {
      type: "bot",
      text: `You selected "${optionText}". How else can I assist you? Provide your phone number`,
      time,
    };

    setMessages((prev) => [...prev, userMsg]);
    setTimeout(() => {
      setMessages((prev) => [...prev, botMsg]);
    }, 1000);
  }

  function chatBody() {
    return (
      <div
        className="chatBody fade-slide-in"
        style={{
          backgroundImage: `url(${bgimage})`,
          backgroundRepeat: "repeat",
          backgroundSize: "contain",
          backgroundColor: "#f9f9f9",
        }}
      >
        <div className="chatMessages">
          <div className="botMessage">
            Hello! Welcome to V-Tech, India’s largest online tech support team.
            How can I help you today?
          </div>
          <div className="options">
            {options.map((option, idx) => (
              <button
                key={idx}
                className="optionButton"
                onClick={() => handleOptionClick(idx)}
              >
                {option}
              </button>
            ))}
          </div>
          <div className="time">
            <p style={{ fontSize: "11px" }}>{formattedTime}</p>
          </div>
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={msg.type === "user" ? "userMessage" : "botresponse"}
            >
              {msg.text}
              <span className="timestamp">{msg.time}</span>
            </div>
          ))}
        </div>

        <div className="chatInputBar">
          <label className="attachmentIcon">
            <input
              type="file"
              onChange={(e) =>
                console.log("File selected successfully:", e.target.files[0])
              }
            />
            <img
              src={paperpin}
              alt="Attach"
              style={{ width: "18px", height: "18px" }}
            />
          </label>
          <input
            type="text"
            placeholder="Type a message..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
          <button
            onClick={() => {
              if (inputText.trim() === "") return;

              const currentTime = new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              });

              const userMsg = {
                type: "user",
                text: inputText,
                time: currentTime,
              };

              const botMsg = {
                type: "bot",
                text: "Thanks for your message! How else can I assist you?",
                time: currentTime,
              };

              setMessages((prev) => [...prev, userMsg]);
              setInputText("");

              setTimeout(() => {
                setMessages((prev) => [...prev, botMsg]);
              }, 1000);
            }}
          >
            ➤
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      {chatIcon()}
      {isOpen && (
        <div className="chatPopup" ref={chatPopupRef}>
          {!startNewConversation ? (
            <>
              {chatPopUpHeader()}
              {floatingNewConversationCard()}
            </>
          ) : (
            <>
              {newChatHeader()}
              {chatBody()}
            </>
          )}
        </div>
      )}
    </>
  );
}

export default ChatBot;
