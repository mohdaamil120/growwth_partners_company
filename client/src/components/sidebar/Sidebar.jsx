
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
// import { v4 as uuidv4 } from "uuid";
import { FaBars } from "react-icons/fa"; // Toggle Icon
import { MdCancel } from "react-icons/md";
import { ChatContext } from "../../context/ChatContext";
import "./Sidebar.css";

const Sidebar = ({ toggleSidebar, isSidebarOpen }) => {
  const { setActiveThread, createNewThread } = useContext(ChatContext);
  const [threads, setThreads] = useState([]);

  // Fetch threads
  useEffect(() => {
    const fetchThreads = async () => {
      try {
        const response = await axios.get("https://growwth-partners-ft04.onrender.com/api/chat");
        setThreads(response.data.threads);
      } catch (error) {
        console.error("Error fetching threads:", error);
      }
    };

    fetchThreads();
  }, []);

  const handleNewChat = () => {
    createNewThread();
  };

// console.log(threads)
  return (
    <div className={`sidebar ${isSidebarOpen ? "open" : "closed"}`}>
      {/* Toggle Button */}
      {
        !isSidebarOpen ? (
          <button className="toggle-btn" onClick={toggleSidebar}>
          <FaBars size={20} />
          </button>
        ):(
          <button className="toggle-btn" onClick={toggleSidebar}>
          <MdCancel size={30} />
        </button>
        )
      }

      {/* Sidebar Content */}
      <div className="sidebar-content">
        <h3>😊SayHello</h3>
        <ul className="thread-list">
          {threads.length > 0 ? (
            threads.map((thread, i) => (
              <li
                key={thread.threadId}
                onClick={() => setActiveThread(thread.threadId)}
                className="thread-item"
              >
                {/* {`Chat ${i + 1} - ${thread.name || `Topic ${i + 1}`}`} */}
                { thread.messages[0].content}
                
              </li>
            ))
          ) : (
            <li className="no-threads">No Threads Available</li>
          )}
        </ul>

        <button onClick={handleNewChat} className="new-chat-button">
          + New Chat
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
