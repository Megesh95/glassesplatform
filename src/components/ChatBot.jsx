import React, { useState, useEffect, useRef} from "react";
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
  const [isOpen, setIsOpen] = useState(false); //to open the chat-bot
  const [showMute, setShowMute] = useState(false); //mute option on right corner of chat-window
  const [messages, setMessages] = useState([]); // a single default bot response and custome user input are being stored in message state variable
  const [startNewConversation, setStartNewConversation] = useState(false); //start new conversation button
  const [inputText, setInputText] = useState(""); // to store user input
  const now = new Date();
  const formattedTime = now.toLocaleDateString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
  const options = [
    "Buy Eyewear",
    "Locate Nearby Store",
    "Query about my order",
  ];

  const chatPopupRef = useRef(null);
  useEffect(() => {
  function handleClickOutside(event) {
    if (isOpen && chatPopupRef.current && !chatPopupRef.current.contains(event.target)) {
      setIsOpen(false); // close chat
      setStartNewConversation(false); // reset conversation state
    }
  }

  document.addEventListener("mousedown", handleClickOutside);
}, [isOpen]);

  // const [conversationsList, setConverstaionsList] = useState([      //to show history in front of chatwindow  when it is opened
  //   {
  //     id: "1234",
  //     name: "bot",
  //     message: "bot-message",
  //     time: "time",
  //   },
  //   {
  //     id: "5678",
  //     name: "bot",
  //     message: "bot-message",
  //     time: "time",
  //   },
  // ]);
  // console.log(formattedTime)

  function chatPopUpHeader() {
    //the first header before starting converstaion
    return (
      <>
        <div className="chatHeader">
          <img className="logo" src={logo} alt="logo" />
          <h1>Welcome to V-Tech</h1>
          <p>How can we help you?</p>
          <div className="menuIcon" onClick={() => setShowMute(!showMute)}>
            {" "}
            {/* mute option*/}⋮
          </div>
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
      </>
    );
  }

  function chatIcon() {
    // small circular chat icon at bottom right corner of our view port
    return (
      <>
        <div className="chatToggle" onClick={() => setIsOpen(!isOpen)}>
          {" "}
          {/*before open message icon will be visible and after isopen is set , arrow icone will be visible */}
          <img
            className={`chatIcon ${isOpen ? "opened" : "closed"}`}
            src={isOpen ? arrow : chaticon}
            alt="chat toggle"
          />
        </div>
      </>
    );
  }

  // function conversationList() {
  //   return (
  //     <div className="conversationList">
  //       <h3>Your Conversations</h3>
  //       {conversationsList.map((convo, i) => {
  //         <div className="conversationItem" key={i}>
  //           <div className="conversationText">
  //             <div>
  //               <strong>{convo.name}</strong>
  //               <span className="conversationId">{convo.id}</span>
  //             </div>
  //             <div className="preview">{convo.preview}</div>
  //             <div className="timeAgo">{convo.timeAgo}</div>
  //           </div>
  //           <span className="arrow">➤</span>
  //         </div>;
  //       })}
  //       {floatingNewConversationCard()}
  //     </div>
  //   );
  // }

  //window that carries the new conversation button floation over a small part of the  chat header
  function floatingNewConversationCard() {
    return (
      <>
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
      </>
    );
  }

  //when new conversatoin button is pressed , the new chat window with this new header opens.
  function newChatHeader() {
    return (
      <>
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
      </>
    );
  }

  //when new conversation is set , a chat with bot message and 3 options listed will be shown
  function handleOptionClick(index) {
    //index of the option clicked is beign passed as argument
    const optionText = options[index];
    const time = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    //default bot message for evry user response / message
    const userMsg = { type: "user", text: optionText, time };
    const botMsg = {
      type: "bot",
      text: `You selected "${optionText}". How else can I assist you? Provide your phone number `,
      time,
    };
    //updating the message state with new user message , and adding the bot response with a delay of one seconds
    setMessages((prev) => [...prev, userMsg]);

    setTimeout(() => {
      setMessages((prev) => [...prev, botMsg]);
    }, 1000);
  }

  //the chatbody that displays the conversation between user and bot with time and date.
  function chatBody() {
    return (
      <div
        className="chatBody fade-slide-in" //fade css
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
            <button
              className="optionButton"
              onClick={() => handleOptionClick(0)} //sends index as argument to handleoptionclick function
            >
              {options[0]}
            </button>
            <button
              className="optionButton"
              onClick={() => handleOptionClick(1)}
            >
              {options[1]}
            </button>
            <button
              className="optionButton"
              onClick={() => handleOptionClick(2)}
            >
              {options[2]}
            </button>
          </div>
          <div className="time">
            <p style={{ fontSize: "11px" }}>{formattedTime}</p>{" "}
            {/*to display the time */}
          </div>

          {/*displaying the contents stored in message variable */}
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

        {/*input text bar with file attaching paper pin img */}
        <div className={`chatInputBar`}>
          <label className="attachmentIcon">
            <input
              type="file"
              onChange={(e) =>
                console.log("File selected Sucessfully:", e.target.files[0])
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
            onChange={(e) => setInputText(e.target.value)} //stores and displays user's typing
          />

          <button
            onClick={() => {
              if (inputText.trim() === "") return; //if nothing types returns

              const userMsg = {
                type: "user",
                text: inputText,
                time: new Date().toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                }),
              };

              const botMsg = {
                type: "bot",
                text: "Thanks for your message! How else can I assist you?",
                time: new Date().toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                }),
              };

              setMessages((prev) => [...prev, userMsg]);

              setTimeout(() => {
                setMessages((prev) => [...prev, botMsg]);
              }, 1000);

              setInputText("");
            }}
            className="sendBtn"
          >
            Send
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="chatWrapper">
       <div className={`chatPopup ${isOpen ? "open" : ""}`} ref={chatPopupRef}>
          {isOpen && !startNewConversation && chatPopUpHeader()}
          {isOpen && !startNewConversation && floatingNewConversationCard()}
          {isOpen && startNewConversation && newChatHeader()}
          {isOpen && startNewConversation && chatBody()}
        </div>
      </div>
      {chatIcon()} {/*always show chat icon */}
    </>
  );
}

export default ChatBot;
