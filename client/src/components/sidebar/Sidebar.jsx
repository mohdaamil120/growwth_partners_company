
// import React, { useContext, useEffect, useState } from "react";
// import axios from "axios";
// import { v4 as uuidv4 } from "uuid";
// import { ChatContext } from "../../context/ChatContext";

// const Sidebar = () => {
//   const { setActiveThread, createNewThread } = useContext(ChatContext); // Use createNewThread from context
//   const [threads, setThreads] = useState([]);

//   useEffect(() => {
//     const fetchThreads = async () => {
//       try {
//         const response = await axios.get("http://localhost:8080/api/chat");
//         setThreads(response.data.threads);
//       } catch (error) {
//         console.error("Error fetching threads:", error);
//       }
//     };

//     fetchThreads();
//   }, []);



// const handleNewChat = async () => {
//     createNewThread()
// }

//   return (
//     <div className="sidebar">
//       <h3>Threads</h3>
//       <ul>
//         {threads.map((thread,i) => (
//           <li key={thread.threadId} onClick={() => setActiveThread(thread.threadId)}>
//             Thread {i || "first"}
//           </li>
//         ))}
//       </ul>
//       {/* Button to create a new chat */}
//       <button onClick={handleNewChat} className="new-chat-button">
//         New Chat
//       </button>
//     </div>
//   );
// };

// export default Sidebar;







import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { FaBars } from "react-icons/fa"; // Toggle Icon
import { ChatContext } from "../../context/ChatContext";
import "./Sidebar.css";

const Sidebar = ({ toggleSidebar, isSidebarOpen }) => {
  const { setActiveThread, createNewThread } = useContext(ChatContext);
  const [threads, setThreads] = useState([]);

  // Fetch threads
  useEffect(() => {
    const fetchThreads = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/chat");
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

  return (
    <div className={`sidebar ${isSidebarOpen ? "open" : "closed"}`}>
      {/* Toggle Button */}
      <button className="toggle-btn" onClick={toggleSidebar}>
        <FaBars size={20} />
      </button>

      {/* Sidebar Content */}
      <div className="sidebar-content">
        <h3>SayHello Threads</h3>
        <ul className="thread-list">
          {threads.length > 0 ? (
            threads.map((thread, i) => (
              <li
                key={thread.threadId}
                onClick={() => setActiveThread(thread.threadId)}
                className="thread-item"
              >
                {`Chat ${i + 1} - ${thread.name || `Topic ${i + 1}`}`}
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
