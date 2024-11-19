import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

export  const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const [threads, setThreads] = useState([]);
  const [activeThread, setActiveThread] = useState(null);
  const [messages, setMessages] = useState({});
 

  // Fetch threads when the component mounts
  useEffect(() => {
    const fetchThreads = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/chat");
        setThreads(response.data.threads);
        // setActiveThread(uuidv4());
      } catch (error) {
        console.error("Error fetching threads:", error);
      }
    };
    fetchThreads();
  }, [messages]);



  // Add a new message to the active thread
  const addMessage = (threadId, message) => {
    setMessages((prev) => ({
      ...prev,
      [threadId]: [...(prev[threadId] || []), message],
    }));
  };

  // Create a new thread
  const createNewThread = async () => {
    const newThreadId = `${uuidv4()}`;
    const newThread = {
      threadId: newThreadId,
      messages: [],
    };
    setThreads((prev) => [...prev, newThread]);
    setActiveThread(newThreadId);

   
    try {
      await axios.post("http://localhost:8080/api/chat/newChat", {
        newThread: true,
        threadId: newThreadId,
      });
    } catch (error) {
      console.error("Error creating new thread:", error);
    }
  };


  return (
    <ChatContext.Provider
      value={{
        threads,
        setThreads,
        activeThread,
        messages,
        addMessage,
        createNewThread,
        setActiveThread,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};


export {ChatProvider}