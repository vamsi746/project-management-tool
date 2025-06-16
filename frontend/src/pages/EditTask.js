// src/pages/EditTask.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';
import { toast } from 'react-toastify'; // ✅ Import toast

function EditTask() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('To Do');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('Medium');

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const res = await axiosInstance.get(`/tasks/${id}`);
        const task = res.data;
        setTitle(task.title);
        setDescription(task.description);
        setStatus(task.status);
        setDueDate(task.dueDate ? task.dueDate.substring(0, 10) : '');
        setPriority(task.priority || 'Medium');
      } catch (err) {
        console.error('Error fetching task:', err);
        toast.error('❌ Failed to load task');
      }
    };

    fetchTask();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.put(`/tasks/${id}`, {
        title,
        description,
        status,
        dueDate: dueDate ? new Date(dueDate) : null,
        priority,
      });
      toast.success('✅ Task updated successfully!');
      navigate('/');
    } catch (err) {
      console.error('Error updating task:', err);
      toast.error('❌ Failed to update task');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Edit Task</h2>
      <form onSubmit={handleUpdate}>
        <div>
          <label>Title:</label><br />
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Description:</label><br />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label>Status:</label><br />
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
        </div>
        <div>
          <label>Due Date:</label><br />
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>
        <div>
          <label>Priority:</label><br />
          <select value={priority} onChange={(e) => setPriority(e.target.value)}>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
        <button type="submit" style={{ marginTop: '10px' }}>Update Task</button>
      </form>
    </div>
  );
}

export default EditTask;
