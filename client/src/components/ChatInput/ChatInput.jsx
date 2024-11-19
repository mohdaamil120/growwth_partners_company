

// import React, { useState, useContext } from "react";
// import axios from "axios";
// import { ChatContext } from "../context/ChatContext";
// import { FaFileUpload } from "react-icons/fa";

// const ChatInput = () => {
//   const [input, setInput] = useState("");
//   const [loading, setLoading] = useState(false);
//   const { addMessage, activeThread } = useContext(ChatContext);

//   const handleFileUpload = async (event) => {
//     const file = event.target.files[0];
//     if (!file) return;
//     // console.log("file",file)
//     const formData = new FormData();
//     formData.append("file", file);
//     // console.log("formData",formData)
//     try {
//       const response = await axios.post("http://localhost:8080/api/upload", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       const { data } = response.data;
//       // console.log("data",data)
//       // console.log("JSON.stringify(data) ",JSON.stringify(data) )
//       addMessage(activeThread, { role: "assistant", content: JSON.stringify(data) });
//     } catch (error) {
//       console.error("Error uploading file:", error);
//       addMessage(activeThread, { role: "assistant", content: "Error processing the file." });
//     }
//   };

//   const sendMessage = async () => {
//     if (!input.trim()) {
//       console.error("Message is required!");
//       return;
//     }

//     addMessage(activeThread, { role: "user", content: input });
//     setInput("");
//     setLoading(true);

//     try {
//       const response = await axios.post("http://localhost:8080/api/chat", {
//         message: input,
//         threadId: activeThread,
//         newThread: !activeThread,
//       });

//       const { assistantResponse } = response.data;
//       addMessage(activeThread, { role: "assistant");, content: assistantResponse });
//     } catch (error) {
//       console.error("Error sending message:", error);
//     } finally {
//       setLoading(false
//     }
//   };

//   return (
//     <div className="chat-input" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
//       {/* File Upload */}
//       <label
//         htmlFor="file-upload"
//         style={{
//           display: "flex",
//           alignItems: "center",
//           cursor: "pointer",
//           padding: "5px 10px",
//           backgroundColor: "#f33c3c",
//           borderRadius: "5px",
//         }}
//       >
//         <FaFileUpload style={{ fontSize: "20px", marginRight: "5px" }} />
//         <span>Upload</span>
//       </label>
//       <input
//         id="file-upload"
//         type="file"
//         onChange={handleFileUpload}
//         style={{ display: "none" }}
//       />

//       {/* Text Input */}
//       <input
//         type="text"
//         value={input}
//         onChange={(e) => setInput(e.target.value)}
//         placeholder="Ask a financial question..."
//         style={{ flex: "1", padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
//       />

//       {/* Send Button */}
//       <button onClick={sendMessage} style={{ padding: "10px", borderRadius: "5px" }}>
//         {loading ? "Sending..." : "Send"}
//       </button>
//     </div>
//   );
// };

// export default ChatInput;













import React, { useState, useContext } from "react";
import axios from "axios";
import { ChatContext } from "../../context/ChatContext";
import { FaPaperclip } from "react-icons/fa";
import "./ChatInput.css";

const ChatInput = () => {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const { addMessage, activeThread } = useContext(ChatContext);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("http://localhost:8080/api/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const { data } = response.data;
       console.log("data",data)
      console.log("JSON.stringify(data) ",JSON.stringify(data) )
      console.log("activeThread", activeThread)
      addMessage(activeThread, { role: "assistant", content: JSON.stringify(data) });
    } catch (error) {
      console.error("Error uploading file:", error);
      addMessage(activeThread, { role: "assistant", content: "Error processing the file." });
    }
  };

  const sendMessage = async () => {
    if (!input.trim()) {
      console.error("Message is required!");
      return;
    }
    //  console.log("input from line 157 in chatinput",input)
    //  console.log("activeThread line 161", activeThread)
     addMessage(activeThread, { role: "user", content: input });
     setInput("");
     setLoading(true);
     
    //  console.log("activeThread from line 162 in chatinput",activeThread)
    try {
      // console.log("input from line 164 in chatinput",input)
      // // console.log("threadId from line 165 in chatinput",threadId)
      // console.log("activeThread from line 166 in chatinput",activeThread)
      const response = await axios.post("http://localhost:8080/api/chat", {
        message: input,
        threadId: activeThread,
        newThread: !activeThread,
      });

      const { assistantResponse } = response.data;
      console.log("activeThrad line 178",activeThread)
      console.log("assistantResponse line 179",assistantResponse)
      addMessage(activeThread, { role: "assistant", content: assistantResponse });
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chat-input">
      <label htmlFor="file-upload" className="file-upload-button">
        <FaPaperclip />
      </label>
      <input
        id="file-upload"
        type="file"
        onChange={handleFileUpload}
        style={{ display: "none" }}
      />
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ask a financial question..."
        className="text-input"
      />
      <button onClick={sendMessage} className="send-button">
        {loading ? "..." : "Send"}
      </button>
    </div>
  );
};

export default ChatInput;
