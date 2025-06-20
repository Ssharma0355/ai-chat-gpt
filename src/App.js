import { useEffect, useRef, useState } from "react";
import "./App.css";
import { IoMdSend } from "react-icons/io";
import axios from "axios";
import Link from "react-router-dom"
function App() {
  const [text, setText] = useState("");
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  const formatResponse = (text) => {
    let formattedText = text
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.*?)\*/g, "<em>$1</em>")
      .replace(/`(.*?)`/g, "<code>$1</code>")
      .replace(/^\d+\.\s+(.*$)/gm, "<li>$1</li>")
      .replace(/^-\s+(.*$)/gm, "<li>$1</li>")
      .replace(/([^<>])\n/g, "$1<br/>")
      .replace(/(<li>.*<\/li>)+/g, "<ul>$&</ul>")
      .replace(
        /(https?:\/\/[^\s]+)/g,
        '<a href="$1" target="_blank" rel="noopener noreferrer" class="text-blue-300 hover:underline">$1</a>'
      );

    return { __html: formattedText };
  };

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
        <h2 className="text-2xl font-semibold mb-6">Ask me - Free AI Chat!</h2>
        <span>Build 0.0.2</span>
        <a
          href="https://forms.gle/MzmSwBw8BabbkQyT6"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-2 py-2 ml-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
        >
          Feedback to developer
        </a>
      </aside>

      {/* Main Content */}
      <main className="md:col-span-4 flex flex-col">
        {/* Chat Area */}
        <section className="flex-1 flex flex-col justify-between p-4 md:p-6 space-y-4">
          {/* Chat History */}
          <div className="flex-1 bg-zinc-700 rounded-xl p-4 overflow-y-auto space-y-4">
            {result.map((msg, index) => (
              <div key={index} className="space-y-2">
                <div className="text-right">
                  <div className="inline-block bg-zinc-900 px-4 py-2 rounded-xl text-sm">
                    {msg.user}
                  </div>
                </div>
                <div className="text-left">
                  <div
                    className="inline-block bg-zinc-500 px-4 py-2 rounded-xl text-l text-left [&>ul]:list-disc [&>ul]:pl-5 [&>ul]:space-y-1 [&>code]:bg-zinc-800 [&>code]:px-1 [&>code]:rounded [&>strong]:font-bold [&>em]:italic"
                    dangerouslySetInnerHTML={formatResponse(msg.bot)}
                  />
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
