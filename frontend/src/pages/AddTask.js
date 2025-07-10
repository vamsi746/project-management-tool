import React, { useState } from 'react';
import axiosInstance from '../utils/axiosInstance';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function AddTask() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('');
  const [teamInput, setTeamInput] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const teamArray = teamInput
      .split(',')
      .map((member) => member.trim())
      .filter(Boolean);

    try {
      await axiosInstance.post('/tasks', {
        title,
        description,
        dueDate: dueDate ? new Date(dueDate) : null,
        priority,
        team: teamArray,
        status: 'To Do',
        comments: [],
      });

      toast.success('✅ Task added successfully!');
      navigate('/');
    } catch (err) {
      console.error('Error adding task:', err);
      setError('Failed to add task. Please try again.');
      toast.error('❌ Failed to add task.');
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <div className="p-6 rounded-xl shadow-xl backdrop-blur-md bg-white/10 dark:bg-gray-800/20 border border-gray-200 dark:border-gray-700">
        <h2 className="text-3xl font-bold mb-6 text-green-500">Add New Task</h2>

        {error && (
          <p className="mb-4 text-red-500 font-medium">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full px-4 py-2 rounded bg-white/80 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              rows={3}
              className="w-full px-4 py-2 rounded bg-white/80 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Due Date</label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full px-4 py-2 rounded bg-white/80 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Priority</label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="w-full px-4 py-2 rounded bg-white/80 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="">Select</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 font-medium">Team Members (comma separated)</label>
            <input
              type="text"
              value={teamInput}
              onChange={(e) => setTeamInput(e.target.value)}
              placeholder="e.g. Alice, Bob"
              className="w-full px-4 py-2 rounded bg-white/80 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <button
            type="submit"
            className="w-full mt-4 px-4 py-2 rounded bg-green-500 hover:bg-green-600 text-white font-medium transition"
          >
            Add Task
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddTask;
