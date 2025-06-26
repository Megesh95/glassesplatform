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
  const [showNewConvo,setShowNewConvo] = useState(startNewConversation);
const inputRef = useRef(null);
const [showDropdown, setShowDropdown] = useState(false);
const hoverTimeoutRef = useRef(null);

  const chatPopupRef = useRef(null);
const chatMessagesEndRef = useRef(null);
  const now = new Date();
  const formattedTime = now.toLocaleDateString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
  const [conversationHistory, setConversationHistory] = useState([
  {
    id: "#106482622",
    title: "Card",
    avatar: avatar1,
    timeAgo: "3h ago",
    sortIndex: 3,
  },
  {
    id: "#106478427",
    title: "Phone number",
    avatar: avatar2,
    timeAgo: "4h ago",
    sortIndex: 2,
  },
  {
    id: "#106471129",
    title: "Store Locator",
    avatar: avatar3,
    timeAgo: "Yesterday",
    sortIndex: 1,
  },
]);



  const options = ["Buy Eyewear", "Locate Nearby Store", "Query about my order"];
useEffect(() => {
  if (isOpen && startNewConversation && inputRef.current) {
    inputRef.current.focus();
  }
}, [isOpen, startNewConversation]);
  useEffect(() => {
    
   function handleClickOutside(event) {
  if (
    chatPopupRef.current &&
    !chatPopupRef.current.contains(event.target) &&
    !event.target.closest(".chatToggle")
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

useEffect(() => {
  if (chatMessagesEndRef.current) {
    chatMessagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  }
}, [messages]);

  function chatPopUpHeader() {
    return (
      <div className="chatHeader">
        <img className="logo" src={logo} alt="logo" />
        <h1>Welcome to V-Lens</h1>
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
      <div
  className="chatToggle"
  onClick={(e) => {
    e.stopPropagation();
    setIsOpen((prev) => !prev);
  }}
>
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
        <div>
        <h3>Start a conversation with our team of experts now!</h3>
        <div className="avatars">
          <img src={avatar1} alt="avatar1" />
          <img src={avatar2} alt="avatar2" />
          <img src={avatar3} alt="avatar3" />
        </div>
        <button
          className="startBtn"
          onClick={() => {setStartNewConversation(true);setMessages([]); setInputText("");}}
        >
          New Conversation
        </button>
        </div>
        <div className="conversationList">
          <h2>History</h2>
  {conversationHistory && conversationHistory
  .sort((a, b) => b.sortIndex - a.sortIndex)
  .map((convo, index) => (
    <div key={index} className="conversationItem">
      <img src={convo.avatar} alt="avatar" className="conversationAvatar" />
      <div className="conversationText">
        <div>
          <strong>{convo.title}</strong>
          <span className="conversationId">{convo.id}</span>
        </div>
        <div className="timeAgo">{convo.timeAgo}</div>
      </div>
      <div className="arrow">→</div>
    </div>
))}
</div>
      </div>
    );
  }

function newChatHeader() {
  return (
    <div className="newHeader fade-slide-in">
      <div
        className="menuHoverContainer"
      >
        <div className="menuIcon">
          <span  onClick={() => setShowDropdown((prev)=>!prev)} style={{ fontSize: "24px", cursor: "pointer" }}>⋮</span>
        </div>
        {showDropdown && (
          <div
            className="newconvoDropdown"
            onClick={() => {setMessages([]);
              setShowDropdown(false);
            }}
          >
            New conversation
          </div>
        )}
      </div>

      <div className="backiconclass" onClick={() => setStartNewConversation(false)}>
        <img className="back" src={back} alt="back arrow" />
      </div>

      <img className="logo1" src={logo} alt="logo" />
      <div className="headerText">
        <span className="name">V-Lens Assistant</span>
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
    let botMsg;

    if (optionText === "Buy Eyewear") {
    botMsg = {
      type: "bot",
      text: "Share Your Phone Number",
      time,
    };
  } else if (optionText === "Locate Nearby Store") {
    botMsg = {
      type: "bot",
      text: "Please find the nearest stores by clicking here - https://stores.lenskart.com/",
      time,
    };
  } else if (optionText === "Query about my order") {
    botMsg = {
      type: "bot",
      text: "Start exploring your new eyewear fashion by logging into V-lens 🤓 .",
      time,
    };
  } else {
    botMsg = {
      type: "bot",
      text: "Sorry, I didn't get that. Can you please select an option?",
      time,
    };
  }

    setMessages((prev) => [...prev, userMsg]);
    setTimeout(() => {
      setMessages((prev) => [...prev, botMsg]);
    }, 1000);
  }
function handleSendMessage() {
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
    text: "Sorry, I didn't get that. Can you please select an option?",
    time: currentTime,
  };

  setMessages((prev) => [...prev, userMsg]);
  setInputText("");

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
            Hello! Welcome to V-Lens, India’s largest online tech support team.
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
            <div ref={chatMessagesEndRef} />
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
            ref={inputRef}
            type="text"
            placeholder="Type a message..."
            value={inputText}
            disabled={messages.length === 0}
            onKeyDown={(e) => {
    if (e.key === "Enter") handleSendMessage();
  }}
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
        <div className={`chatPopup ${isOpen ? "open" : ""}`} ref={chatPopupRef}>
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
