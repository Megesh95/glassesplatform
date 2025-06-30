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
const options = ["Buy Eyewear", "Locate Nearby Store", "Track my order", "My Cart", "FAQ's", "Chat with Agent"];
const recognitionRef = useRef(null);
const [showRiseUpMenu, setShowRiseUpMenu] = useState(false);
const [orderEmail, setOrderEmail] = useState("");
const [orderId, setOrderId] = useState("");
const [showAgentList, setShowAgentList] = useState(false);
const [selectedAgent, setSelectedAgent] = useState(null);
const [mode, setMode] = useState("bot"); // or "agent"
const [agentMessages, setAgentMessages] = useState([]);
const [agents, setAgents] = useState([
  { id: 1, name: "Agent A", status: "free" },
  { id: 2, name: "Agent B", status: "free" },
  { id: 3, name: "Agent C", status: "free" },
]);
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
if (optionText === "Chat with Agent") {
  handleOptionClickByText("Yes, connect me");
  setMessages((prev) => [...prev, userMsg]);
  return;
}

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

  

  function AgentChat({ agent, onBack, delayStart }) {
  const [agentMsgs, setAgentMsgs] = useState([]);
  const [text, setText] = useState("");
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);
  const [ready, setReady] = useState(!delayStart);

  useEffect(() => {
    if (delayStart) {
      const timeout = setTimeout(() => setReady(true), 2000);
      return () => clearTimeout(timeout);
    }
  }, [delayStart]);

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
        setText((prev) => prev + " " + transcript);
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

  const sendMessage = () => {
    if (!text.trim()) return;
    const newMsg = { from: "user", text };
    setAgentMsgs((prev) => [...prev, newMsg]);
    setText("");

    setTimeout(() => {
      setAgentMsgs((prev) => [
        ...prev,
        { from: "agent", text: "👩‍💼 Got it! Let me check that for you." },
      ]);
    }, 1500);
  };

  if (!ready) {
    return (
      <div className="chatBody fade-slide-in" style={{ backgroundColor: "#f9f9f9", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span style={{ color: "#555", fontSize: "16px" }}>Connecting you to {agent.name}...</span>
      </div>
    );
  }

  return (
    <div className="chatBody fade-slide-in" style={{ backgroundImage: `url(${bgimage})`, backgroundRepeat: "repeat", backgroundSize: "contain", backgroundColor: "#f9f9f9", height: "100%", display: "flex", flexDirection: "column" }}>

      <div className="agentHeader" style={{ display: "flex", alignItems: "center", padding: "12px", background: "#0b3d91", color: "white", fontWeight: "bold" }}>
        <span>🧑‍💼 {agent.name}</span>
        <span
          onClick={onBack}
          style={{ color: "white", marginLeft: "auto", cursor: "pointer", fontWeight: "bold" }}
        >
          ← Back to Bot
        </span>
      </div>

      <div className="agentMessages" style={{ flexGrow: 1, padding: "10px", overflowY: "auto" }}>
        {agentMsgs.map((m, i) => (
          <div
            key={i}
            style={{
              marginBottom: "8px",
              alignSelf: m.from === "user" ? "flex-end" : "flex-start",
              background: m.from === "user" ? "#4a6edb" : "#e3f2fd",
              color: m.from === "user" ? "white" : "#000",
              padding: "10px 14px",
              borderRadius: "20px",
              maxWidth: "75%",
              wordBreak: "break-word",
            }}
          >
            {m.text}
          </div>
        ))}
      </div>

      <div className="chatInputBar" style={{ display: "flex", alignItems: "center", padding: "10px", borderTop: "1px solid #ddd" }}>
        <label className="attachmentIcon" style={{ marginRight: "8px" }}>
          <input type="file" style={{ display: "none" }} />
          <img src="paperpin.png" alt="Attach" style={{ width: "20px", cursor: "pointer" }} />
        </label>

        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type your message..."
          style={{
            flex: 1,
            padding: "8px 12px",
            borderRadius: "20px",
            border: "1px solid #ccc",
            outline: "none",
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") sendMessage();
          }}
        />

        <button
          onClick={handleVoiceInput}
          style={{ background: "none", border: "none", marginLeft: "8px", cursor: "pointer" }}
        >🎤</button>

        <button
          onClick={sendMessage}
          style={{ marginLeft: "8px", background: "#4a6edb", color: "white", border: "none", borderRadius: "20px", padding: "8px 16px", cursor: "pointer" }}
        >
          Send
        </button>
      </div>
    </div>
  );
}const freeAgents = agents.filter((a) => a.status === "free");
if (freeAgents.length === 0) {
  const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  const noAgentsMsg = {
    type: "bot",
    text: "😔 Sorry, all our agents are currently busy. Please try again later or continue with the bot.",
    time,
  };
  setMessages((prev) => [...prev, noAgentsMsg]);
  return;
}

const handleAgentSelect = (agent) => {
  const updatedAgents = agents.map((a) =>
    a.id === agent.id ? { ...a, status: "busy" } : a
  );
  setAgents(updatedAgents);
  setSelectedAgent(agent);
  setMode("agent");
};

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
  if (
  inputText.toLowerCase().includes("not resolved") ||
  inputText.toLowerCase().includes("unresolved") ||
  inputText.toLowerCase().includes("not working")
) {
  const unresolvedBotMsg = {
    type: "bot",
    text: "Sorry that didn’t help. Would you like to talk to our support agent?",
    options: ["Yes, connect me", "No, it's fine"],
    time: currentTime,
  };

  setMessages((prev) => [...prev, userMsg]);
  setInputText("");
  setTimeout(() => {
    setMessages((prev) => [...prev, unresolvedBotMsg]);
  }, 1000);
  return;
}
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

  if (type === "dislike") {
    const time = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    const unresolvedBotMsg = {
      type: "bot",
      text: "Sorry that didn’t help. Would you like to talk to our support agent?",
      options: ["Yes, connect me", "No, it's fine"],
      time,
    };
    setTimeout(() => {
       setMessages((prev) => [...prev, unresolvedBotMsg]);
    }, 1000);
   
  }
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
        {getOptionsMessage()}
        <div className="time">
          <p style={{ fontSize: "11px" }}>{formattedTime}</p>
        </div>

        {messages.map((msg, idx) => {
          if (msg.agentOptions?.length > 0) {
  return (
    <Box
      key={idx}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        mb: 2,
        maxWidth: "70%",
        marginRight: "auto",
      }}
    >
      <Box
        sx={{
          p: 1.5,
          borderRadius: 2,
          bgcolor: "white",
          color: "black",
          wordBreak: "break-word",
          whiteSpace: "pre-line",
          mb: 1,
        }}
      >
        Please select an available agent:
      </Box>

      <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
        {msg.agentOptions.map((agent) => (
          <button
            key={agent.id}
            className="faqButton"
            onClick={() => {handleAgentSelect(agent);
  const time = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const selected = { ...agent, status: "busy" };
  setSelectedAgent(selected);
  setMode("agent");

  setMessages((prev) => [
    ...prev,
    { type: "user", text: agent.name, time },
  ]);

  setTimeout(() => {
    setMessages((prev) => [
      ...prev,
      {
        type: "bot",
        text: `✅ You are now connected with ${agent.name}. They will assist you shortly.`,
        time,
      },
    ]);
  }, 800);
}}
            style={{
              padding: "8px 14px",
              borderRadius: "20px",
              border: "1px solid #ccc",
              background: agent.status === "free" ? "#d4edda" : "#f8d7da",
              color: agent.status === "free" ? "#155724" : "#721c24",
              cursor: agent.status === "free" ? "pointer" : "not-allowed",
              opacity: agent.status === "free" ? 1 : 0.6,
            }}
            disabled={agent.status !== "free"}
          >
            {agent.name}
          </button>
        ))}
      </Box>
    </Box>
  );
}


          if(msg.type === 'bot' && msg.contactInfo) {
            return(  <Box
            key={idx}
    sx={{
      mt: 1,
      p: 1,
      bgcolor: '#e3f2fd',
      borderRadius: 2,
      color: '#1976d2',
      fontWeight: 'bold',
    }}
  >
    📞 Customer Care: <a href="tel:18001234567" style={{color:'#1976d2', textDecoration:'underline'}}>1800-123-4567</a><br />
    🌐 Or visit <a href="/contact" target="" rel="" style={{color:'#1976d2', textDecoration:'underline'}}>Contact Us</a> page
  </Box>);
          }

          if (msg.type === "faq-button") {
            return (
              <Box
                key={idx}
                sx={{ display: "flex", justifyContent: "center", mb: 1 }}
              >
                <button
                  className="faqButton"
                  onClick={() => {
                    const faqAnswer =
                      faqs.find((f) => f.question === msg.text)?.answer ||
                      "Sorry, I couldn't find an answer.";
                    const botResponse = {
                      type: "bot",
                      text: faqAnswer,
                      time: new Date().toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      }),
                    };
                    setMessages((prev) => [
                      ...prev,
                      {
                        type: "user",
                        text: msg.text,
                        time: msg.time,
                      },
                    ]);
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
            );
          } else if (msg.type === "bot" && msg.options?.length > 0) {
            return (
              <Box
                key={idx}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                  mb: 2,
                  maxWidth: "70%",
                  marginRight: "auto",
                }}
              >
                <Box
                  sx={{
                    p: 1.5,
                    borderRadius: 2,
                    bgcolor: "white",
                    color: "black",
                    wordBreak: "break-word",
                    whiteSpace: "pre-line",
                    width: "100%",
                    mb: 1,
                  }}
                >
                  {renderMessageWithLinks(msg.text)}
                </Box>
                <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                  {msg.options.map((optionText, optionIdx) => (
                    <button
                      key={optionIdx}
                      className="faqButton"
                      onClick={() => {
                        const time = new Date().toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        });
                    setMessages((prev) => [
                          ...prev,
                          { type: "user", text: optionText, time },
                        ]);

                        setMessages((prev) =>
                          prev.map((m, i) =>
                            i === idx ? { ...m, options: [] } : m
                          )
                        );

                        if (optionText === "Yes, connect me") {
  handleOptionClickByText("Yes, connect me");
} else if (optionText === "No, it's fine") {
  handleOptionClickByText("No, it's fine");
} else {
                          setTimeout(() => {
                            setMessages((prev) => [
                              ...prev,
                              {
                                type: "bot",
                                text: "Okay, let me know if you need anything else.",
                                time,
                              },
                            ]);
                          }, 1000);
                        }
                      }}
                      style={{
                        padding: "8px 14px",
                        borderRadius: "20px",
                        border: "1px solid #ccc",
                        background: "#f2f2f2",
                        cursor: "pointer",
                      }}
                    >
                      {optionText}
                    </button>
                  ))}
                </Box>
              </Box>
            );
          } else {
            return (
              <Box
                key={idx}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent:
                    msg.type === "user" ? "flex-end" : "flex-start",
                  alignItems: msg.type === "user" ? "flex-end" : "flex-start",
                  mb: 2,
                  maxWidth: "70%",
                  marginLeft: msg.type === "user" ? "auto" : 0,
                  marginRight: msg.type === "user" ? 0 : "auto",
                }}
              >
                <Box
                  sx={{
                    p: 1.5,
                    borderRadius: 2,
                    bgcolor: msg.type === "user" ? "#4a6edb" : "white",
                    color: msg.type === "user" ? "white" : "black",
                    wordBreak: "break-word",
                    whiteSpace: "pre-line",
                    width: "100%",
                  }}
                >
                  {msg.type === "bot"
                    ? renderMessageWithLinks(msg.text)
                    : msg.text}
                </Box>

                {msg.type === "bot" && (
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
                      <IconButton
                        size="small"
                        onClick={() => alert("Reported!")}
                      >
                        <ReportProblemOutlinedIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Box>
                )}
              </Box>
            );
          }
        })}

        <div ref={chatMessagesEndRef} />
      </div>

      {/* Rise Up Menu */}
      <div className="riseUpMenuContainer">
        <div
          className="menuButton"
          onClick={() => setShowRiseUpMenu((prev) => !prev)}
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

      {/* Input Bar */}
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
            style={{
              width: "18px",
              height: "18px",
              cursor: disable ? "not-allowed" : "pointer",
            }}
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
          className={`micIcon ${isListening ? "listening" : ""} ${
            disable ? "disabled" : ""
          }`}
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
function handleOptionClickByText(optionText) {
  const time = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  if (optionText === "Yes, connect me") {

    const freeAgents = agents.filter(agent => agent.status === "free");

    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        {
          type: "bot",
          text: "Please select an available agent:",
          time,
          agentOptions: freeAgents,
        },
      ]);
    }, 800);
    return;
  }

  if (optionText === "No, it's fine") {
    setMessages(prev => [
      ...prev,
      {
        type: "bot",
        text: "Alright! Let me know if you need any further assistance.",
        time,
      },
    ]);
    return;
  }

  const agent = agents.find(a => a.name === optionText);
  if (agent) {
    setSelectedAgent(agent); 
    setMode("agent");
  }
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
              {!selectedAgent && chatBody()}
              {mode === "agent" && selectedAgent && (
  <AgentChat
    agent={selectedAgent}
    onBack={() => {
      setMode("bot");
      setSelectedAgent(null);
    }}
    delayStart={true} 
  />
)}





            </>
          )}
        </div>
      )}
    </>
  );
}

export default ChatBot;
