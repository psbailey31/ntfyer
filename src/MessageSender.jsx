// src/MessageSender.jsx
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import EmojiPicker from 'emoji-picker-react';

const MessageSender = () => {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [topic, setTopic] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [status, setStatus] = useState(null);
  const [topics, setTopics] = useState([]);

  // Load topics from localStorage on component mount
  useEffect(() => {
    const savedTopics = JSON.parse(localStorage.getItem('topics')) || [];
    setTopics(savedTopics);
    if (savedTopics.length > 0) {
      setTopic(savedTopics[0]); // Set the initial topic to the first saved topic
    }
  }, []);

  // Handle saving a new topic
  const saveTopicToLocalStorage = (newTopic) => {
    if (!topics.includes(newTopic)) {
      const updatedTopics = [...topics, newTopic];
      setTopics(updatedTopics);
      localStorage.setItem('topics', JSON.stringify(updatedTopics));
    }
  };

  const handleSendMessage = async () => {
    if (!message || !topic || !title) {
      setStatus("Please fill in all fields.");
      return;
    }

    try {
      await axios.post(`https://ntfy.sh/${topic}`, `${title}: ${message}`, {
        headers: { 'Content-Type': 'text/plain' },
      });
      setStatus("Message sent successfully!");
      setTitle('');
      setMessage('');
      saveTopicToLocalStorage(topic); // Save the topic to localStorage
    } catch (error) {
      setStatus("Error sending message. Please try again.");
      console.error(error);
    }
  };

  const handleEmojiClick = (emoji) => {
    setMessage((prevMessage) => prevMessage + emoji.emoji);
    setShowEmojiPicker(false);
  };

  const renderEmojiPicker = () => {
    return ReactDOM.createPortal(
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
        <div className="bg-white rounded-lg shadow-lg p-2">
          <EmojiPicker onEmojiClick={handleEmojiClick} />
          <button
            onClick={() => setShowEmojiPicker(false)}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
          >
            ✕
          </button>
        </div>
      </div>,
      document.body
    );
  };

  return (
    <div className="relative bg-gradient-to-br from-white to-gray-50 p-6 sm:p-8 rounded-xl shadow-2xl overflow-hidden max-w-lg w-full mx-auto sm:mt-10 mt-6">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-300 via-purple-300 to-pink-300 opacity-30 mix-blend-multiply rounded-xl"></div>
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center relative z-10">
        Send a Message
      </h2>

      <div className="relative z-10 mb-4">
        {topics.length > 0 ? (
          <select
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="p-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none bg-white bg-opacity-80 placeholder-gray-500 transition shadow-sm"
          >
            {topics.map((savedTopic, index) => (
              <option key={index} value={savedTopic}>
                {savedTopic}
              </option>
            ))}
          </select>
        ) : (
          <input
            type="text"
            placeholder="Enter topic"
            className="p-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none bg-white bg-opacity-80 placeholder-gray-500 transition shadow-sm"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />
        )}
      </div>

      <div className="relative z-10 mb-4">
        <input
          type="text"
          placeholder="Enter title"
          className="p-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none bg-white bg-opacity-80 placeholder-gray-500 transition shadow-sm"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="relative z-10 mb-4">
        <textarea
          placeholder="Enter your message"
          className="p-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none bg-white bg-opacity-80 placeholder-gray-500 transition shadow-sm resize-none h-32"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <button
          type="button"
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          className="absolute top-3 right-3 text-2xl"
        >
          😊
        </button>
      </div>

      <button
        onClick={handleSendMessage}
        className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg shadow-lg hover:from-blue-600 hover:to-purple-700 transition duration-300 ease-in-out transform hover:scale-105"
      >
        Send Message
      </button>

      {status && (
        <p className="mt-4 text-center text-gray-800 font-medium relative z-10">
          {status}
        </p>
      )}

      {showEmojiPicker && renderEmojiPicker()}
    </div>
  );
};

export default MessageSender;
