import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';
import { toast } from 'react-toastify';

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
    } catch (error) {
      console.error('Failed to fetch task', error);
      toast.error('❌ Failed to load task.');
    } finally {
      setLoading(false);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return;

    try {
      await axiosInstance.post(`/tasks/${id}/comments`, {
        text: comment,
        user: 'You'
      });
      setComment('');
      fetchTask();
      toast.success('💬 Comment added');
    } catch (error) {
      console.error('Error adding comment', error);
      toast.error('❌ Failed to add comment');
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this task?');
    if (!confirmDelete) return;

    try {
      await axiosInstance.delete(`/tasks/${id}`);
      toast.success('🗑️ Task deleted');
      navigate('/');
    } catch (error) {
      console.error('Error deleting task:', error);
      toast.error('❌ Failed to delete task');
    }
  };

  if (loading) return <p className="text-center mt-6 text-gray-600">Loading task...</p>;
  if (!task) return <p className="text-center mt-6 text-gray-600">Task not found.</p>;

  return (
    <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 p-6 rounded shadow mt-6">
      <h2 className="text-2xl font-bold mb-4">{task.title}</h2>
      <p className="mb-2">{task.description}</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4 text-sm">
        <div><strong>Due Date:</strong> {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'N/A'}</div>
        <div><strong>Priority:</strong> {task.priority || 'N/A'}</div>
        <div><strong>Status:</strong> {task.status}</div>
        <div><strong>Assignee:</strong> {task.assignee || 'Not assigned'}</div>
        <div className="sm:col-span-2"><strong>Team:</strong> {task.team?.length ? task.team.join(', ') : 'No team assigned'}</div>
      </div>

      <button
        onClick={handleDelete}
        className="mb-6 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition"
      >
        Delete Task
      </button>

      <h3 className="text-lg font-semibold mb-2">Comments</h3>
      {(!task.comments || task.comments.length === 0) ? (
        <p className="text-gray-500 mb-4">No comments yet.</p>
      ) : (
        <ul className="mb-4 space-y-2">
          {task.comments.map((c, i) => (
            <li key={i} className="bg-gray-50 dark:bg-gray-700 p-2 rounded">
              <p><strong>{c.user}:</strong> {c.text}</p>
              <p className="text-xs text-gray-500">{new Date(c.timestamp).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      )}

      <form onSubmit={handleCommentSubmit} className="flex flex-col sm:flex-row gap-2">
        <input
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Add a comment..."
          className="flex-1 border rounded px-3 py-2 dark:bg-gray-700"
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition"
        >
          Add
        </button>
      </form>
    </div>
  );
}

export default TaskDetails;
