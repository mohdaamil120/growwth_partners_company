
import React, { useContext, useEffect, useRef, useState } from "react";
import { ChatContext } from "../../context/ChatContext"; // Assuming you have a context for chat
// import "../App.css";
import "./ChatDisplay.css";
import axios from "axios";

const ChatDisplay = ({setMessages , messages}) => {
  const { activeThread, setActiveThread, threads } = useContext(ChatContext); 
  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]); // Trigger scroll when messages change
  // const [messages, setMessages] = useState([]); // Local state for storing messages of active thread

  // Fetch threads when component mounts
  useEffect(() => {
    const fetchThreads = async () => {
      try {
        const response = await axios.get("https://growwth-partners-ft04.onrender.com/api/chat");
        // Store threads in context or local state
        // setActiveThread(response.data.threads);
        console.log(response.data.threads)
        setActiveThread(activeThread);
      } catch (error) {
        console.error("Error fetching threads:", error);
      }
    };

    fetchThreads();
  }, []);

  // Log active thread whenever it changes
  useEffect(() => {
    if (activeThread) {
      // Find the thread from the threads list where threadId matches activeThread
      const selectedThread = threads.find((thread) => thread.threadId === activeThread);
      if (selectedThread) {
        setMessages(selectedThread.messages); // Set messages for the active thread
      }
    }
  }, [activeThread,messages ,threads]);

  // Check if messages for the active thread are available
  if (!messages.length) {
    return <div className="no-messages">No messages to display</div>;
  }

  return (
    <div className="chat-display chat-messages" ref={chatContainerRef}>
      {messages.map((msg, index) => (
        <div
          key={index}
          className={`chat-message ${msg.role === "user" ? "user-message" : "assistant-message"}`}
        >
          {msg.content}
        </div>
      ))}
    </div>
  );
};

export default ChatDisplay;
