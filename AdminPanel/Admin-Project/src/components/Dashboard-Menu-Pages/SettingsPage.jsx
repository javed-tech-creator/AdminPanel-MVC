import React, { useState } from "react";

const SettingsPage = () => {
  const [settings, setSettings] = useState({
    username: "JohnDoe",
    email: "johndoe@example.com",
    notifications: true,
    theme: "light",
    language: "English",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings({
      ...settings,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h2 className="text-2xl font-semibold mb-4">Settings</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-gray-700">Username</label>
          <input 
            type="text" 
            name="username" 
            value={settings.username} 
            onChange={handleChange} 
            className="w-full p-2 border rounded mt-1" 
          />
        </div>
        <div>
          <label className="block text-gray-700">Email</label>
          <input 
            type="email" 
            name="email" 
            value={settings.email} 
            onChange={handleChange} 
            className="w-full p-2 border rounded mt-1" 
          />
        </div>
        <div className="flex items-center gap-2">
          <input 
            type="checkbox" 
            name="notifications" 
            checked={settings.notifications} 
            onChange={handleChange} 
          />
          <label className="text-gray-700">Enable Notifications</label>
        </div>
        <div>
          <label className="block text-gray-700">Theme</label>
          <select 
            name="theme" 
            value={settings.theme} 
            onChange={handleChange} 
            className="w-full p-2 border rounded mt-1">
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>
        <div>
          <label className="block text-gray-700">Language</label>
          <select 
            name="language" 
            value={settings.language} 
            onChange={handleChange} 
            className="w-full p-2 border rounded mt-1">
            <option value="English">English</option>
            <option value="Spanish">Spanish</option>
            <option value="French">French</option>
          </select>
        </div>
        <button className="bg-blue-500 text-white px-4 py-2 rounded mt-4 hover:bg-blue-600">Save Changes</button>
      </div>
    </div>
  );
};

export default SettingsPage;
