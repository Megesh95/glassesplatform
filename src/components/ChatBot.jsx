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
import MicIcon from '@mui/icons-material/Mic';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import { Box, IconButton, Tooltip } from '@mui/material';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import ThumbDownAltOutlinedIcon from '@mui/icons-material/ThumbDownAltOutlined';
import ReportProblemOutlinedIcon from '@mui/icons-material/ReportProblemOutlined';


function ChatBot({cart}) {
  const [feedbackMap, setFeedbackMap] = useState({});
  const [showOptions, setShowOptions] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [disable, setDisable] = useState(true);
  const [showMute, setShowMute] = useState(false);
  const [messages, setMessages] = useState([]);
  const [startNewConversation, setStartNewConversation] = useState(false);
  const [inputText, setInputText] = useState("");
  const inputRef = useRef(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [expectingPhone, setExpectingPhone] = useState(false);
  const chatPopupRef = useRef(null);
  const chatMessagesEndRef = useRef(null);
  const now = new Date();
  const formattedTime = now.toLocaleDateString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
  const [expectingOrderId, setExpectingOrderId] = useState(false);
  const [expectingOrderEmail, setExpectingOrderEmail] = useState(false);
  const [conversationHistory, setConversationHistory] = useState([ ]);
const [isListening, setIsListening] = useState(false);
const options = ["Buy Eyewear", "Locate Nearby Store", "Track my order", "My Cart", "FAQ's"];
const recognitionRef = useRef(null);
const [showRiseUpMenu, setShowRiseUpMenu] = useState(false);
const [orderEmail, setOrderEmail] = useState("");
const [orderId, setOrderId] = useState("");
const faqs = [
  { question: "What is V-Lens?", answer: "V-Lens is an eyewear platform offering affordable and stylish glasses." },
  { question: "How can I track my order?", answer: "Use the 'Track my order' option in the chatbot and provide your email and order ID." },
  { question: "How do I cancel an order?", answer: "Please contact our support team to initiate an order cancellation." },
  { question: "Do you offer home eye checkups?", answer: "Yes, we offer home eye checkups in selected cities." },
];

useEffect(() => {
  if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-IN';
    recognition.interimResults = false;
    recognition.continuous = false;

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInputText((prev) => prev + " " + transcript);
    };

    recognitionRef.current = recognition;
  }
}, []);

const handleVoiceInput = () => {
  if (recognitionRef.current) {
    if (!isListening) recognitionRef.current.start();
    else recognitionRef.current.stop();
  }
};
const mockOrder = {
  id: "VL2024001234",
  email: "example@gmail.com",
  status: "delivered",
  orderDate: "June 20, 2025",
  estimatedDelivery: "June 28, 2025",
  trackingNumber: "VL1234567890",
  items: [
    {
      name: "Blue Frame Glasses",
      quantity: 1,
      price: 2999,
      image: "/images/glasses1.jpg",
    },
  ],
  shippingAddress: {
    name: "Yogesh Kumar",
    address: "123 Main Street",
    city: "Chennai",
    pincode: "600001",
    phone: "9876543210",
  },
  timeline: [
    { status: "Order Placed", date: "June 20", time: "10:00 AM", description: "Order received", completed: true },
    { status: "Processing", date: "June 21", time: "12:00 PM", description: "Preparing order", completed: true },
    { status: "Shipped", date: "June 23", time: "03:00 PM", description: "Out for shipping", completed: true },
    { status: "Delivered", date: "June 28", time: "10:00 AM", description: "Delivered", completed: true },
  ],
};


function getOptionsMessage() {
  return (<div className="options">
            {options.map((option, idx) => (
              <button
                key={idx}
                className="optionButton"
                onClick={() => handleOptionClick(idx)}
              >
                {option}
              </button>
            ))}
          </div>);
}
function startNewConversationHandler() {
  if (messages.length > 0) {
    const firstUserMsg = messages.find(msg => msg.type === "user");
    const summaryTitle = firstUserMsg?.text?.slice(0, 20) || "Conversation";

    const newHistoryItem = {
      id: "#" + Math.floor(100000000 + Math.random() * 900000000),
      title: summaryTitle,
      avatar: [avatar1, avatar2, avatar3][Math.floor(Math.random() * 3)],
      timeAgo: "Just now",
      sortIndex: Date.now(),
    };

    setConversationHistory(prev => [newHistoryItem, ...prev]);
  }

  setStartNewConversation(true);
  setMessages([]);
  setInputText("");
}


  // const options = ["Buy Eyewear", "Locate Nearby Store", "My Cart"];

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

  function floatingNewConversationCard(conversationHistory) {
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
          onClick={startNewConversationHandler}
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
            style={{cursor:"pointer"}}
            onClick={() => {setMessages([]);
              setShowDropdown(false);
            }}
          >
            New conversation
          </div>
        )}
      </div>

      <div className="backiconclass" onClick={() => setStartNewConversation(false)}>
        <div>
          <KeyboardBackspaceIcon />
        </div>
      </div>

      <img className="logo1" src={logo} alt="logo" />
      <div className="headerText">
        <span className="name">V-Lens Assistant</span>
        <span className="subtitle">I am here to help you!</span>
      </div>
    </div>
  );
}

function renderMessageWithLinks(text) {
  const parts = text.split(/(https?:\/\/[^\s]+)/g);
  return parts.map((part, index) =>
    part.match(/https?:\/\/[^\s]+/) ? (
      <a
        key={index}
        href={part}
        target="_blank"
        rel="noopener noreferrer"
        style={{ color: '#1976d2', textDecoration: 'underline' }}
      >
        {part}
      </a>
    ) : (
      part
    )
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
      setExpectingPhone(true);
      setDisable(false);
    botMsg = {
      type: "bot",
      text: "Please provide your Phone Number",
      time,
    };
  } else if (optionText === "Locate Nearby Store") {
    setDisable(true);
    botMsg = {
      type: "bot",
      text: "Please find the nearest stores by clicking here - https://stores.lenskart.com/",
      time,
    };
  } else if (optionText === "My Cart") {
    setDisable(true);
    const productList = cart?.length
    ? cart.map((item, i) => `${i + 1}. ${item.name}`).join("\n")
    : "🛒 Your cart is currently empty.";
    botMsg = {
      type: "bot",
      text: `Here’s your current order:\n${productList}`,
      time,
    };
  } else if (optionText === "Track my order") {
        setExpectingPhone(false);
    setExpectingOrderEmail(true);
    setDisable(false);
    botMsg = {
      type: "bot",
      text: "To track your order, please provide your EmailId and Order  ID.",
      time, 
    };

    
  } else if (optionText === "FAQ's") {
  setDisable(true);
  botMsg = {
    type: "bot",
    text: "Here are some frequently asked questions. Please click to view the answer:",
    time,
  };

  // Push bot message and show FAQ buttons after a delay
  setMessages((prev) => [...prev, userMsg]);
  setTimeout(() => {
    setMessages((prev) => [...prev, botMsg]);
    faqs.forEach((faq) => {
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            type: "faq-button",
            text: faq.question,
            time,
          },
        ]);
      }, 500);
    });
  }, 1000);
  return;
}
else {
    setDisable(true);
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

  let botMsg;

if (expectingOrderEmail) {
  setOrderEmail(inputText.trim());
  setExpectingOrderEmail(false);
  setExpectingOrderId(true);
  botMsg = {
    type: "bot",
    text: "Please enter your Order ID now.",
    time: currentTime,
  };
  setMessages((prev) => [...prev, userMsg]);
  setInputText("");
  setTimeout(() => setMessages((prev) => [...prev, botMsg]), 1000);
  return;
} if (expectingOrderId) {
  setOrderId(inputText.trim());
  setExpectingOrderId(false);
  if (orderEmail.includes("example")) {
    botMsg = {
      type: "bot",
      text: `✅ Order found!\n\n📦 Order ID: ${inputText}\n📬 Email: ${orderEmail}\n🗓️ Status: Delivered\n📅 Delivery Date: 28 June 2025`,
      time: currentTime,
    };
  } else {
    botMsg = {
      type: "bot",
      text: "❌ Order not found. Please check your details and try again.",
      time: currentTime,
    };
  }
    setMessages((prev) => [...prev, userMsg]);
  setInputText("");
  setTimeout(() => setMessages((prev) => [...prev, botMsg]), 1000);
  return;
}

  if (expectingPhone) {
    const phoneRegex = /^[6-9]\d{9}$/; 
    if (phoneRegex.test(inputText.trim())) {
      botMsg = {
        type: "bot",
        text: "✅ Valid phone number! Enter the OTP sent to your mobile.",
        time: currentTime,
      };
    } else {
      setShowOptions(true);
      botMsg = {
        type: "bot",
        text: "❌ Invalid phone number. Please enter a 10-digit valid number starting with 6-9.",
        time: currentTime,
      };
    }
    setExpectingPhone(false); 
  } else {
    botMsg = {
      type: "bot",
      text: "Thanks for your message! How can I assist you further?",
      time: currentTime,
    };
  }

  setMessages((prev) => [...prev, userMsg]);
  setInputText("");

  setTimeout(() => {
    setMessages((prev) => [...prev, botMsg]);
  }, 1000);
}


function handleFeedback(index, type) {
  setFeedbackMap((prev) => ({ ...prev, [index]: type }));
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
          {
            getOptionsMessage()
          }
          <div className="time">
            <p style={{ fontSize: "11px" }}>{formattedTime}</p>
          </div>
          {messages.map((msg, idx) => (
  msg.type === "faq-button" ? (
    <Box
      key={idx}
      sx={{ display: 'flex', justifyContent: 'center', mb: 1 }}
    >
      <button
        className="faqButton"
        onClick={() => {
          const faqAnswer = faqs.find(f => f.question === msg.text)?.answer || "Sorry, I couldn't find an answer.";
          const botResponse = {
            type: "bot",
            text: faqAnswer,
            time: new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
          };
          setMessages((prev) => [...prev, {
            type: "user",
            text: msg.text,
            time: msg.time,
          }]);
          setTimeout(() => {
            setMessages((prev) => [...prev, botResponse]);
          }, 800);
        }}
        style={{
          padding: "8px 14px",
          borderRadius: "20px",
          border: "1px solid #ccc",
          background: "#f2f2f2",
          cursor: "pointer",
        }}
      >
        {msg.text}
      </button>
    </Box>
  ) : (
    <Box
      key={idx}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: msg.type === 'user' ? 'flex-end' : 'flex-start',
        alignItems: msg.type === 'user' ? 'flex-end' : 'flex-start',
        mb: 2,
        maxWidth: '70%',
        marginLeft: msg.type === 'user' ? 'auto' : 0,
        marginRight: msg.type === 'user' ? 0 : 'auto',
      }}
    >
      <Box
        sx={{
          p: 1.5,
          borderRadius: 2,
          bgcolor: msg.type === 'user' ? '#4a6edb' : 'white',
          color: msg.type === 'user' ? 'white' : 'black',
          wordBreak: 'break-word',
          whiteSpace: 'pre-line',
          width: '100%',
        }}
      >
        {msg.type === 'bot' ? renderMessageWithLinks(msg.text) : msg.text}
      </Box>

    {msg.type === 'bot' && (
  <Box sx={{ display: "flex", gap: 1, mt: 0.5 }}>
    <Tooltip title="Like">
      <IconButton
        size="small"
        onClick={() => handleFeedback(idx, "like")}
      >
        {feedbackMap[idx] === "like" ? (
          <ThumbUpAltIcon fontSize="small" color="primary" />
        ) : (
          <ThumbUpAltOutlinedIcon fontSize="small" />
        )}
      </IconButton>
    </Tooltip>
    <Tooltip title="Dislike">
      <IconButton
        size="small"
        onClick={() => handleFeedback(idx, "dislike")}
      >
        {feedbackMap[idx] === "dislike" ? (
          <ThumbDownAltIcon fontSize="small" color="error" />
        ) : (
          <ThumbDownAltOutlinedIcon fontSize="small" />
        )}
      </IconButton>
    </Tooltip>
    <Tooltip title="Report">
      <IconButton size="small" onClick={() => alert("Reported!")}>
        <ReportProblemOutlinedIcon fontSize="small" />
      </IconButton>
    </Tooltip>
  </Box>
)}

    </Box>
  )
))}





            <div ref={chatMessagesEndRef} />
        </div>
<div className="riseUpMenuContainer">
  <div
    className="menuButton"
    onClick={() => setShowRiseUpMenu(prev => !prev)}
    title="Menu"
  >
    ☰
  </div>

  {showRiseUpMenu && (
    <div className="riseUpMenu">
      {options.map((option, idx) => (
        <button
          key={idx}
          className="riseUpOption"
          onClick={() => {
            handleOptionClick(idx);
            setShowRiseUpMenu(false);
          }}
        >
          {option}
        </button>
      ))}
    </div>
  )}
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
              style={{ width: "18px", height: "18px", cursor: disable ? "not-allowed" : "pointer" }}
            />
          </label>
          <input
            ref={inputRef}
            type="text"
            placeholder={disable ? "Select from menu" : "Type a message..."}
            value={inputText}
            disabled={disable}
            onKeyDown={(e) => {
    if (e.key === "Enter") handleSendMessage();
  }}
            onChange={(e) => setInputText(e.target.value)}
          />
         <div
  className={`micIcon ${isListening ? 'listening' : ''} ${disable ? 'disabled' : ''}`}
  onClick={() => {
    if (!disable) handleVoiceInput();
  }}
  title={disable ? "Voice input disabled" : "Voice Input"}
  style={{ cursor: disable ? "not-allowed" : "pointer", opacity: disable ? 0.5 : 1 }}
>
  <MicIcon />
</div>

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
              {floatingNewConversationCard(conversationHistory)}
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
