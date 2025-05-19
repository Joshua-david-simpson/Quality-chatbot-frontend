// src/Chatbot.jsx
import { useState } from 'react';

export default function Chatbot() {
  const [messages, setMessages] = useState([
    {
      role: 'system',
      content: 'Ask a quality question based on the work instructions.',
    },
  ]);
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { role: 'user', content: input }];
    setMessages(newMessages);
    setInput('');

    const res = await fetch('http://localhost:8000/api/ask', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question: input }),
    });

    const data = await res.json();
    setMessages([...newMessages, { role: 'assistant', content: data.answer }]);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-2xl mx-auto bg-white shadow-xl rounded-2xl p-6">
        <h1 className="text-xl font-bold mb-4">Quality Instruction Chatbot</h1>
        <div className="h-96 overflow-y-scroll border p-4 rounded mb-4 bg-gray-50">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`mb-2 ${
                msg.role === 'user' ? 'text-right' : 'text-left'
              }`}
            >
              <span className="block p-2 rounded-lg inline-block max-w-xs whitespace-pre-wrap bg-blue-100">
                {msg.content}
              </span>
            </div>
          ))}
        </div>
        <div className="flex">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Type your question..."
            className="flex-grow border rounded-l-lg p-2"
          />
          <button
            onClick={sendMessage}
            className="bg-blue-500 text-white px-4 rounded-r-lg"
          >
            Ask
          </button>
        </div>
      </div>
    </div>
  );
}
