import { useEffect, useRef, useState } from "react";
import "./App.css";
import { IoMdSend } from "react-icons/io";
import axios from "axios";

function App() {
  const [text, setText] = useState("");
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  const sendData = async (inputText) => {
    try {
      setLoading(true);
      const res = await axios.post(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyBPw_hAIRhQDx-wkg01334YI2Dp-C7hkiE",
        {
          contents: [
            {
              parts: [
                {
                  text: inputText,
                },
              ],
            },
          ],
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const responseText =
        res.data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response.";
      setResult((prev) => [...prev, { user: inputText, bot: responseText }]);
    } catch (err) {
      console.error(err);
      setResult((prev) => [
        ...prev,
        { user: inputText, bot: "Something went wrong. Please try again." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (text.trim()) {
      sendData(text);
      setText("");
    }
  };

  // Auto-scroll to bottom on new message
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [result]);

  return (
    <div className="bg-zinc-900 min-h-screen grid grid-cols-1 md:grid-cols-5 text-white">
      {/* Sidebar */}
      <aside className="md:col-span-1 bg-zinc-800 p-6">
        <h2 className="text-2xl font-semibold mb-6">Ask Sachin!</h2>
        {/* <p className="text-sm text-gray-400">AI BOT is here!</p> */}
      </aside>

      {/* Main Content */}
      <main className="md:col-span-4 flex flex-col">
        {/* Header */}
        <header className="h-16 bg-zinc-800 flex items-center px-6 shadow-md">
          <h1 className="text-xl font-bold">Developer: ssharma Phase: Testing Build 0.0.1 </h1>
        </header>

        {/* Chat Area */}
        <section className="flex-1 flex flex-col justify-between p-4 md:p-6 space-y-4">
          {/* Chat History */}
          <div className="flex-1 bg-zinc-700 rounded-xl p-4 overflow-y-auto space-y-4">
            {result.map((msg, index) => (
              <div key={index} className="space-y-2">
                <div className="text-right">
                  <div className="inline-block bg-blue-600 px-4 py-2 rounded-xl text-sm">
                    {msg.user}
                  </div>
                </div>
                <div className="text-left">
                  <div className="inline-block bg-green-600 px-4 py-2 rounded-xl text-sm">
                    {msg.bot}
                  </div>
                </div>
              </div>
            ))}
            {loading && (
              <div className="text-left">
                <div className="inline-block bg-gray-500 px-4 py-2 rounded-xl text-sm animate-pulse">
                  Thinking...
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Input */}
          <form
            onSubmit={handleSend}
            className="bg-zinc-800 w-full md:w-2/3 mx-auto rounded-2xl border border-gray-500 p-4 shadow-lg flex items-center space-x-4"
          >
            <input
              type="text"
              value={text}
              placeholder="Ask me anything..."
              className="flex-1 bg-transparent outline-none text-white placeholder-gray-300"
              onChange={(e) => setText(e.target.value)}
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-zinc-600 hover:bg-zinc-700 text-white px-4 py-2 rounded-xl transition disabled:opacity-50"
            >
              <IoMdSend size={20} />
            </button>
          </form>
        </section>
      </main>
    </div>
  );
}

export default App;
