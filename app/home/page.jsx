"use client";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faPencilAlt,
  faCheck,
  faTimes,
  faCopy,
} from "@fortawesome/free-solid-svg-icons";
import { GoogleGenerativeAI } from "@google/generative-ai";

const AIModelUI = () => {
  const [Search, setSearch] = useState("");
  const [displayText, setDisplayText] = useState("");
  const [promptText, setPromptText] = useState("");
  const [isEditing, setIsEditing] = useState(false); // Track edit mode
  const [editPrompt, setEditPrompt] = useState(""); // Store edited prompt
  const [isCopied, setIsCopied] = useState(false);

  const handleInputChange = (event) => {
    setSearch(event.target.value);
  };

  const handleEditClick = () => {
    setEditPrompt(promptText); // Load existing prompt into edit field
    setIsEditing(true);
  };

  const handleSaveEdit = () => {
    setDisplayText("");
    setPromptText(editPrompt); // Update prompt
    setSearch(editPrompt);

    const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const resp = async () => {
      const prompt = editPrompt;
      const result = await model.generateContent(prompt);
      const response = result.response.text();

      let words = response.split(" ");

      let index = 0;
      const interval = setInterval(() => {
        if (index < words.length) {
          setDisplayText((prev) => prev + " " + words[index]);
          index++;
        } else {
          clearInterval(interval);
        }
      }, 500);

      return () => clearInterval(interval);
    };

    resp();

    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handleSearchClick = () => {
    setDisplayText("");
    setSearch("");
    setPromptText(Search);

    const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const resp = async () => {
      const prompt = Search;
      const result = await model.generateContent(prompt);
      const response = result.response.text();

      let words = response.split(" ");

      let index = 0;
      const interval = setInterval(() => {
        if (index < words.length) {
          setDisplayText((prev) => prev + " " + words[index]);
          index++;
        } else {
          clearInterval(interval);
        }
      }, 500);

      return () => clearInterval(interval);
    };

    resp();
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(displayText);
    setIsCopied(true);

    // Reset tick icon after 2 seconds
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 p-4">
      <div className="w-full max-w-md bg-gray-800 rounded-2xl shadow-lg p-6 text-white">
        <h2 className="text-2xl font-semibold text-center mb-4">
          {" "}
          My AI Model
        </h2>
        <div className="relative flex items-center gap-2">
          <input
            type="text"
            value={Search}
            onChange={handleInputChange}
            placeholder="How can I help you?"
            className="w-full p-3 pr-10 bg-gray-700 rounded-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSearchClick}
            className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition duration-300"
          >
            <FontAwesomeIcon icon={faSearch} className="text-white text-sm" />
          </button>
        </div>
      </div>

      {/* Prompt & Response */}
      {promptText && (
        <div className="mt-4 w-full max-w-md h-[25rem] flex flex-col">
          {/* User Prompt */}
          <div className="bg-blue-700 text-white p-3 rounded-t-lg shadow-md text-center font-semibold flex items-center justify-between px-4">
            {isEditing ? (
              <input
                type="text"
                value={editPrompt}
                onChange={(e) => setEditPrompt(e.target.value)}
                className="bg-transparent border-b-2 border-white text-white focus:outline-none w-full"
              />
            ) : (
              <span>{promptText}</span>
            )}

            {/* Icons for edit, save, and cancel */}
            {isEditing ? (
              <div className="flex gap-2">
                <button
                  onClick={handleSaveEdit}
                  className="text-green-300 hover:text-green-500"
                >
                  <FontAwesomeIcon icon={faCheck} />
                </button>
                <button
                  onClick={handleCancelEdit}
                  className="text-red-300 hover:text-red-500"
                >
                  <FontAwesomeIcon icon={faTimes} />
                </button>
              </div>
            ) : (
              <button
                onClick={handleEditClick}
                className="text-gray-200 hover:text-white"
              >
                <FontAwesomeIcon icon={faPencilAlt} />
              </button>
            )}
          </div>

          {/* AI Response with Full Height & Internal Scroll */}
          <div className="bg-gray-800 text-white p-4 rounded-b-lg shadow-md animate-fade-in flex-grow overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-900 relative">
            <span>{displayText}</span>

            {/* Copy Button */}
            <button
              onClick={handleCopy}
              className="bottom-4 right-4 bg-gray-700 text-white p-3 rounded-lg hover:bg-gray-600 transition flex items-center gap-2 shadow-md mt-4"
            >
              <FontAwesomeIcon icon={isCopied ? faCheck : faCopy} />
              <span className="text-sm">{isCopied ? "Copied!" : "Copy"}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIModelUI;
