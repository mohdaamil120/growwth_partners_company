const express = require("express");
const { OpenAI } = require("openai");
const Thread = require("../models/Thread");
const { v4: uuidv4 } = require("uuid");

const ChatRouter = express.Router();

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});


//geting all threads and  Chat routes

ChatRouter.get("/", async (req, res) => {
  try {
    const threads = await Thread.find({ userId: req.user?.id || "guest_user" }); 
    res.status(200).json({ threads });
  } catch (err) {
    res.status(500).json({ error: "Error fetching threads" });
  }
});


ChatRouter.post("/", async (req, res) => {
  const { message,  threadId } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  try {
    let thread;

    // if (newThread) {
    //   // Create a new thread (only if newThread is true)
    //   thread = new Thread({
    //     userId: req.user?.id || "guest_user", // Replace with proper user authentication logic
    //     // threadId : uuidv4(), // Unique thread ID
    //     threadId : threadId, // Unique thread ID
    //     messages: [{ role: "user", content: message }],
    //   });
    //   await thread.save();
    // } 
     if (threadId) {
      // Find the existing thread by threadId
      thread = await Thread.findOne({ threadId });
      if (!thread) {
        return res.status(404).json({ error: "Thread not found" });
      }
      // Add the new message to the existing thread
      thread.messages.push({ role: "user", content: message });
      await thread.save();
    
    } else {
      return res.status(400).json({ error: "Thread information is missing" });
    }

    const userData =  req.app.locals.userData;
    const prompt = `You are a financial assistant. The user has provided the following financial data: ${JSON.stringify(userData)}. Respond to the following message: ${message}`;
   
    // console.log("userData line 62 chatRoutes",userData)
    
    // Fetch the assistant's response 
    const assistantInstructions = [
      {
        role: "system",
        content: prompt 
      },
    ];

    const messages = assistantInstructions.concat(thread.messages);
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages,
      stream: true,
      max_tokens: 100,
    });

    let assistantResponse = "";
    for await (const chunk of response) {
      const content = chunk.choices[0]?.delta?.content || "";
      assistantResponse += content;
    }

    // Save assistant's response
    thread.messages.push({ role: "assistant", content: assistantResponse });
    await thread.save();

    // Return the assistant's response and threadId for future communication
    res.status(200).json({
      assistantResponse,
      threadId: thread.threadId, // Returning threadId so frontend can continue with the same thread
    });
  } catch (err) {
    console.error("Error communicating with OpenAI:", err.message);
    res.status(500).json({ error: "Error communicating with OpenAI" });
  }
});


ChatRouter.post("/newChat", async(req,res) => {
  const {  newThread, threadId } = req.body;

  try {
    let thread;

    if (newThread) {
      thread = new Thread({
        userId: req.user?.id || "guest_user", 
        threadId : threadId, 
        // messages: [{ role: "user", content: "hello" }],
        messages: [],
      });
      await thread.save();
      

      const assistantInstructions = [
        // {
        //   role: "system",
        //   content:
        //     "You are a financial assistant. Provide professional, concise, and formatted responses to user queries.",
        // },
      ];
  
      const messages = assistantInstructions.concat(thread.messages);
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages,
        stream: true,
        max_tokens: 10,
      });
  
      // let assistantResponse = "";
      // for await (const chunk of response) {
      //   const content = chunk.choices[0]?.delta?.content || "";
      //   assistantResponse += content;
      // }
  
      // Save assistant's response
      thread.messages.push({ role: "assistant", content: assistantResponse });
      await thread.save();
  
      // Return the assistant's response and threadId for future communication
      res.status(200).json({
        assistantResponse,
        threadId: thread.threadId, // Returning threadId so frontend can continue with the same thread
      });
 
    }

    else {
          // Fetch the assistant's response 
        const assistantInstructions = [
          {
            role: "system",
            content:
              "You are a financial assistant. Provide professional, concise, and formatted responses to user queries.",
          },
        ];

        const messages = assistantInstructions.concat(thread.messages);
        const response = await openai.chat.completions.create({
          model: "gpt-3.5-turbo",
          messages,
          stream: true,
          max_tokens: 100,
        });

        let assistantResponse = "";
        for await (const chunk of response) {
          const content = chunk.choices[0]?.delta?.content || "";
          assistantResponse += content;
        }

        // Save assistant's response
        thread.messages.push({ role: "assistant", content: assistantResponse });
        await thread.save();

        // Return the assistant's response and threadId for future communication
        res.status(200).json({
          assistantResponse,
          threadId: thread.threadId, // Returning threadId so frontend can continue with the same thread
        });
    }

  
  } catch (err) {
    console.error("Error communicating with OpenAI while new chat:", err.message);
    res.status(500).json({ error: "Error communicating with OpenAI while new chat" });
  }
})

module.exports = ChatRouter;


















