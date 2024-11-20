


import React, { useState, useContext } from "react";
import axios from "axios";
import { ChatContext } from "../../context/ChatContext";
import { FaPaperclip, FaTimes } from "react-icons/fa";
import "./ChatInput.css";

const ChatInput = () => {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const { addMessage, activeThread } = useContext(ChatContext);
 


  const handleFileRemove = () => {
    setSelectedFile(null);
  };


  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };



  const uploadFile = async () => {
    if (!selectedFile) {
      console.log("setSelectedFile is not here line 34 ",setSelectedFile)
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    console.log('Uploading file:', selectedFile); // Debugging
    
    try {

      const response = await axios.post("https://growwth-partners-ft04.onrender.com/api/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const { data } = response.data;
      console.log('File uploaded line 46:',data);
      addMessage(activeThread, { role: "assistant", content: JSON.stringify(data) });
      setSelectedFile(null); // Clear the file after successful upload
    } catch (error) {
      console.error("Error uploading file:", error.response?.data || error.message);
      addMessage(activeThread, { role: "assistant", content: "Error processing the file." });
    }
  };



  const sendMessage = async () => {
    if (!input.trim()) {
      console.error("Message is required!");
      return;
    }
  
     addMessage(activeThread, { role: "user", content: input });
     setInput("");
     setLoading(true);
     
    try {
 
      const response = await axios.post("https://growwth-partners-ft04.onrender.com/api/chat", {
        message: input,
        threadId: activeThread,
        newThread: !activeThread,
      });

      const { assistantResponse } = response.data;
      // console.log("activeThrad line 178",activeThread)
      // console.log("assistantResponse line 179",assistantResponse)
      addMessage(activeThread, { role: "assistant", content: assistantResponse });
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setLoading(false);
    }
  };

 
return(
  <div className="chat-input">
  {/* File Upload Section */}
  <div className="file-upload-container">
    <label htmlFor="file-upload" className="file-upload-button">
      <FaPaperclip size={25} />
    </label>
    <input
      id="file-upload"
      type="file"
      // onChange={handleFileUpload}
      onChange={(e) => setSelectedFile(e.target.files[0])}
      style={{ display: "none" }}
      
    />
    {selectedFile && (
      <div className="file-preview">
        <span className="file-name">{selectedFile.name}</span>
        <FaTimes size={20} className="remove-file-icon" onClick={handleFileRemove} />
      </div>
    )}
  </div>

  {/* Text Input Section */}
  <input
    type="text"
    value={input}
    onChange={(e) => setInput(e.target.value)}
    onKeyDown={(e) => {
      if (e.key === "Enter") {
        selectedFile ? uploadFile() : sendMessage();
      }
    }}
    placeholder={selectedFile ? selectedFile.name : "Ask a financial question..."}
    className="text-input"
  />

  {/* Send Button */}
  <button onClick={selectedFile ? uploadFile : sendMessage} className="send-button">
    {loading ? "..." : "Send"}
  </button>
</div>

  )
};

export default ChatInput;
