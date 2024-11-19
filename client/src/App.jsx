
// import React from 'react';
// import ChatDisplay from './components/ChatDisplay';
// import ChatInput from './components/ChatInput';
// import Sidebar from './components/Sidebar';
// import { ChatProvider } from './context/ChatContext';
// import './App.css';

// const App = () => {


//   return (
//     <ChatProvider>
//       <div className="app-container">
//         <Sidebar/>
//         <div className="chat-container">
//           <ChatDisplay />
//           <ChatInput />
//         </div>
//       </div>
//     </ChatProvider>
//   );
// };

// export default App;
















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
          <Header />

          <div className="content-container">
            {/* { !messages.length ? (  */}
            {  false ? ( 
              <div className="card-container">
                <Card
                  title="Wanderlust Destinations 2024"
                  subtitle="Must-Visit Places"
                  icon="FaMapMarkedAlt"
                />
                <Card
                  title="SayHalo AI: What Sets Us Apart"
                  subtitle="Key Differentiators"
                  icon="FaRobot"
                />
                <Card
                  title="Design Trends on TikTok 2024"
                  subtitle="Trending Now"
                  icon="FaChartLine"
                />
              </div>
            ) : (
             <div className="chat_display_parent">
               <ChatDisplay setMessages={setMessages} messages={messages}/>
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
  );
}

export default App;
