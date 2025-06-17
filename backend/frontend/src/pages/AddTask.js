// src/pages/AddTask.js
import React, { useState } from 'react';
import axiosInstance from '../utils/axiosInstance';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'; // ✅ Import toast

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
      const response = await axiosInstance.post('/tasks', {
        title,
        description,
        dueDate: dueDate ? new Date(dueDate) : null,
        priority,
        team: teamArray,
        status: 'To Do',
        comments: []
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
    <div style={{ padding: '20px' }}>
      <h2>Add Task</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title: </label><br />
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div>
          <label>Description: </label><br />
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
        </div>
        <div>
          <label>Due Date: </label><br />
          <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
        </div>
        <div>
          <label>Priority: </label><br />
          <select value={priority} onChange={(e) => setPriority(e.target.value)}>
            <option value="">Select</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
        <div>
          <label>Team Members (comma separated): </label><br />
          <input
            type="text"
            value={teamInput}
            onChange={(e) => setTeamInput(e.target.value)}
            placeholder="e.g. Alice, Bob"
          />
        </div>
        <button type="submit" style={{ marginTop: '10px' }}>Add Task</button>
      </form>
    </div>
  );
}

export default AddTask;
