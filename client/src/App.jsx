
import Sidebar from "./components/sidebar/Sidebar";
import Header from "./components/Header/Header";
import Card from "./components/Card/Card";
import ChatInput from "./components/ChatInput/ChatInput";
import { ChatProvider } from './context/ChatContext';
import { FaUser } from "react-icons/fa";
import "./App.css";
import React, { useState } from "react";
import ChatDisplay from "./components/ChatDisplay/ChatDisplay";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [messages, setMessages] = useState([]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <ChatProvider>
    <div className="app">
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <main className={`main-content ${isSidebarOpen ? "shifted" : ""}`}>
        {/* Render the header */}
        {!messages.length && <Header />}

        <div className="content-container">
          {/* Render ChatDisplay for managing chat */}
          <div className="chat_display_parent">
            <ChatDisplay setMessages={setMessages} messages={messages} />
          </div>

          {/* Conditionally show cards only when no messages are present */}
          {messages.length === 0 && (
            <div className="card-container">
               <Card
                title="Smart Investment Strategies"
                subtitle="Maximize Your Returns"
                icon="FaChartLine"
              />
              <Card
                title="Personalized Financial Planning"
                subtitle="Tailored Plans for Your Goals"
                icon="FaRobot"
              />
              <Card
                title="Real-Time Expense Tracking"
                subtitle="Stay on Top of Your Budget"
                icon="FaMapMarkedAlt"
              />
            </div>
          )}
        </div>

        <ChatInput />
      </main>

      <div className="profile-icon">
        <FaUser size={30} />
      </div>
    </div>
  </ChatProvider>

  )
}

export default App;
