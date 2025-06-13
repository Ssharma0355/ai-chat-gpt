import "./App.css";
import { IoMdSend } from "react-icons/io";


function App() {
  return (
    <div className="bg-zinc-900 h-screen grid grid-cols-5 text-white">
      {/* Sidebar */}
      <div className="col-span-1 bg-zinc-800 p-6">
        <h2 className="text-2xl font-semibold mb-6">Menu</h2>
        <ul className="space-y-4 text-left">
          <li className="hover:text-red-400 cursor-pointer">Home</li>
          <li className="hover:text-red-400 cursor-pointer">Chat</li>
          <li className="hover:text-red-400 cursor-pointer">Settings</li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="col-span-4 flex flex-col">
        {/* Navbar */}
        <div className="h-16 bg-zinc-800 flex items-center px-8 shadow-md">
          <h1 className="text-xl font-bold">AI Chat Dashboard</h1>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col justify-between p-6">
          {/* Chat History (Placeholder) */}
          <div className="flex-1 bg-zinc-700 rounded-xl p-4 overflow-y-auto">
            <p className="text-gray-300">Chat history will appear here...</p>
          </div>

          {/* Input Box */}
          <div className="mt-4">
            <div className="bg-zinc-800 w-full md:w-2/3 mx-auto text-white rounded-2xl border border-gray-500 p-4 shadow-lg flex items-center space-x-4">
              <input
                type="text"
                placeholder="Ask me anything..."
                className="flex-1 bg-transparent outline-none text-white placeholder-gray-300"
              />
              <button className="bg-zinc-600 hover:bg-zinc-700 text-white px-4 py-2 rounded-xl transition">
                <IoMdSend />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default App;
