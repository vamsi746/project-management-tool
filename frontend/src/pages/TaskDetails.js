import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';

function TaskDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTask();
  }, [id]);

  const fetchTask = async () => {
    try {
      const res = await axiosInstance.get(`/tasks/${id}`);
      setTask(res.data);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch task', error);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return;

    try {
      await axiosInstance.post(`/tasks/${id}/comments`, {
        text: comment,
        user: 'You' // Replace with actual logged-in user if available
      });
      setComment('');
      fetchTask(); // Refresh task comments
    } catch (error) {
      console.error('Error adding comment', error);
    }
  };

  const handleDelete = async () => {
    const confirm = window.confirm('Are you sure you want to delete this task?');
    if (!confirm) return;

    try {
      await axiosInstance.delete(`/tasks/${id}`);
      alert('Task deleted successfully');
      navigate('/'); // Redirect to home or task list
    } catch (error) {
      console.error('Error deleting task:', error);
      alert('Failed to delete task');
    }
  };

  if (loading) return <p>Loading task...</p>;
  if (!task) return <p>Task not found.</p>;

  return (
    <div style={{ padding: '20px' }}>
      <h2>{task.title}</h2>
      <p>{task.description}</p>
      <p><strong>Due Date:</strong> {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'N/A'}</p>
      <p><strong>Priority:</strong> {task.priority}</p>
      <p><strong>Status:</strong> {task.status}</p>
      <p><strong>Assignee:</strong> {task.assignee || 'Not assigned'}</p>
      <p><strong>Team:</strong> {task.team?.length > 0 ? task.team.join(', ') : 'No team assigned'}</p>

      <button onClick={handleDelete} style={{ backgroundColor: 'red', color: 'white', padding: '8px 12px', border: 'none', marginBottom: '20px' }}>
        Delete Task
      </button>

      <h3>Comments</h3>
      {(!task.comments || task.comments.length === 0) ? (
        <p>No comments yet.</p>
      ) : (
        <ul>
          {task.comments.map((c, i) => (
            <li key={i}>
              <strong>{c.user}:</strong> {c.text} <em>({new Date(c.timestamp).toLocaleString()})</em>
            </li>
          ))}
        </ul>
      )}

      <form onSubmit={handleCommentSubmit} style={{ marginTop: '1rem' }}>
        <input
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Add a comment"
          style={{ padding: '8px', width: '300px' }}
        />
        <button type="submit" style={{ marginLeft: '10px' }}>Add</button>
      </form>
    </div>
  );
}

export default TaskDetails;
