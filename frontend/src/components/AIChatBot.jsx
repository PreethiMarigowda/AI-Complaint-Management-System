import { useState, useEffect } from "react";

function AIChatbot() {

  const [isOpen, setIsOpen] = useState(false);

  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hello 👋 I am your Complaint Assistant. Ask me anything!",
    },
  ]);

  const [input, setInput] = useState("");
  const [isListening, setIsListening] = useState(false);

  // SMART AI RESPONSE
  const getBotReply = (message) => {

    const msg = message.toLowerCase();

    // NETWORK
    if (
      msg.includes("wifi") ||
      msg.includes("internet") ||
      msg.includes("network") ||
      msg.includes("net")
    ) {
      return `
🌐 Network complaint detected.

⏳ Expected Resolution:
24-48 hours

🚨 Suggested Priority:
High

💡 Tip:
Restart your router or reconnect WiFi once.
`;
    }

    // WATER
    if (
      msg.includes("water") ||
      msg.includes("leak") ||
      msg.includes("pipe")
    ) {
      return `
🚰 Water related complaint detected.

⏳ Expected Resolution:
12-24 hours

🚨 Suggested Priority:
High

💡 Tip:
Avoid using the affected area until maintenance arrives.
`;
    }

    // ELECTRICITY
    if (
      msg.includes("electricity") ||
      msg.includes("power") ||
      msg.includes("light")
    ) {
      return `
⚡ Electricity complaint detected.

⏳ Expected Resolution:
2-6 hours

🚨 Suggested Priority:
Critical

💡 Tip:
Do not touch exposed wires.
`;
    }

    // TRANSPORT
    if (
      msg.includes("bus") ||
      msg.includes("transport")
    ) {
      return `
🚌 Transport complaint detected.

⏳ Expected Resolution:
1-3 days

🚨 Suggested Priority:
Medium
`;
    }

    // STATUS QUESTIONS
    if (msg.includes("pending")) {
      return `
🟡 Pending means your complaint is registered but not yet assigned.
`;
    }

    if (msg.includes("in progress")) {
      return `
🔵 In Progress means the maintenance team has started working.
`;
    }

    if (msg.includes("resolved")) {
      return `
🟢 Resolved means the issue has been fixed successfully.
`;
    }

    // RESOLUTION QUESTIONS
    if (
      msg.includes("when") ||
      msg.includes("how long") ||
      msg.includes("resolve")
    ) {
      return `
⏳ Most complaints are resolved within 24-72 hours depending on severity.
`;
    }

    // HELP
    if (msg.includes("help")) {
      return `
🤖 You can ask me about:

• Complaint categories
• Resolution time
• Complaint status
• Priority suggestions
• Hostel / Network / Transport issues
`;
    }

    // DEFAULT
    return `
🤖 Please provide more details about your complaint.
`;
  };

  // SEND MESSAGE
  const sendMessage = () => {

    if (!input.trim()) return;

    const userMessage = {
      sender: "user",
      text: input,
    };

    const botMessage = {
      sender: "bot",
      text: getBotReply(input),
    };

    setMessages((prev) => [
      ...prev,
      userMessage,
      botMessage,
    ]);

    setInput("");
  };

  // ENTER KEY SEND
  const handleKeyPress = (e) => {

    if (e.key === "Enter") {
      sendMessage();
    }
  };

  const handleVoice = () => {

  const SpeechRecognition =
    window.SpeechRecognition ||
    window.webkitSpeechRecognition;

  if (!SpeechRecognition) {

    alert("Speech Recognition not supported");

    return;
  }

  const recognition = new SpeechRecognition();

  recognition.lang = "en-US";

  recognition.start();

  setIsListening(true);

  recognition.onresult = (event) => {

  const transcript =
    event.results[0][0].transcript;

  setInput(transcript);

  setIsListening(false);

  // AUTO SEND MESSAGE
  setTimeout(() => {

    const userMessage = {
      sender: "user",
      text: transcript,
    };

    const botMessage = {
      sender: "bot",
      text: getBotReply(transcript),
    };

    setMessages((prev) => [
      ...prev,
      userMessage,
      botMessage,
    ]);

    setInput("");

  }, 500);
};

  recognition.onerror = () => {

    setIsListening(false);
  };

  recognition.onend = () => {

    setIsListening(false);
  };
};

  return (

    <>

      {/* FLOATING BUTTON */}
      {!isOpen && (

        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 bg-blue-500 hover:bg-blue-600 text-white w-16 h-16 rounded-full shadow-2xl text-3xl z-50"
        >
          🤖
        </button>

      )}

      {/* CHATBOX */}
      {isOpen && (

        <div className="fixed bottom-6 right-6 z-50">

          <div className="w-[380px] h-[550px] bg-[#081229] rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-blue-500">

            {/* HEADER */}
            <div className="bg-blue-600 p-4 text-white font-bold text-xl flex justify-between items-center">

              <span>
                🤖 AI Complaint Assistant
              </span>

              {/* CLOSE BUTTON */}
              <button
                onClick={() => setIsOpen(false)}
                className="text-2xl hover:text-gray-200"
              >
                ✖
              </button>

            </div>

            {/* CHAT AREA */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">

              {messages.map((msg, index) => (

                <div
                  key={index}
                  className={`max-w-[80%] p-4 rounded-2xl whitespace-pre-line ${
                    msg.sender === "user"
                      ? "bg-blue-500 ml-auto text-white"
                      : "bg-gray-700 text-white"
                  }`}
                >
                  {msg.text}
                </div>

              ))}

            </div>

            <div className="p-4 flex gap-2 bg-[#0b1730]">

  {/* INPUT */}
  <input
    type="text"
    placeholder="Ask something..."
    value={input}
    onChange={(e) => setInput(e.target.value)}
    onKeyDown={handleKeyPress}
    className="flex-1 bg-gray-800 text-white px-4 py-3 rounded-xl outline-none"
  />

  {/* MIC BUTTON */}
  <button
    onClick={handleVoice}
    className={`px-4 rounded-xl text-white ${
      isListening
        ? "bg-red-500"
        : "bg-gray-700"
    }`}
  >
    🎤
  </button>

  {/* SEND BUTTON */}
  <button
    onClick={sendMessage}
    className="bg-blue-500 hover:bg-blue-600 text-white px-5 rounded-xl"
  >
    Send
  </button>

</div>

          </div>

        </div>

      )}

    </>

  );
}

export default AIChatbot;