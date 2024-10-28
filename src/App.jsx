// src/App.jsx
import React from 'react';
import './index.css';
import MessageSender from './MessageSender';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center p-4">
      <div className="bg-white bg-opacity-90 backdrop-blur-lg shadow-lg rounded-lg max-w-md w-full p-6 sm:p-10">
        <h1 className="text-4xl font-bold text-gray-800 text-center mb-6">
          ntfy Messenger
        </h1>
        <p className="text-gray-600 text-center mb-8">
          Send messages easily with a custom topic and emojis. Powered by{" "}
          <a
            href="https://ntfy.sh/"
            className="text-indigo-500 font-medium hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            ntfy.sh
          </a>
        </p>
        <MessageSender />
      </div>
    </div>
  );
}

export default App;
