import React, { useState, useEffect } from 'react';
import axiosInstance from '../utils/axiosInstance';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify'; // ✅ Import toast

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosInstance.get('/tasks')
      .then(res => {
        console.log('Fetched Tasks:', res.data);
        setTasks(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching tasks:', err);
        toast.error('❌ Failed to fetch tasks');
        setLoading(false);
      });
  }, []);

  const handleDelete = async (id) => {
    const confirm = window.confirm('Are you sure you want to delete this task?');
    if (!confirm) return;

    try {
      await axiosInstance.delete(`/tasks/${id}`);
      setTasks(tasks.filter(task => task._id !== id));
      toast.success('🗑️ Task deleted successfully!');
    } catch (err) {
      console.error('Error deleting task:', err);
      toast.error('❌ Failed to delete the task');
    }
  };

  if (loading) return <p>Loading tasks...</p>;

  return (
    <div style={{ padding: '20px' }}>
      <h2>Task List</h2>
      {tasks.length === 0 ? (
        <p>No tasks found</p>
      ) : (
        <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
          {tasks.map(task => (
            <li key={task._id} style={{ border: '1px solid #ccc', marginBottom: '1rem', padding: '10px', borderRadius: '5px' }}>
              <Link to={`/task/${task._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <h3>{task.title}</h3>
              </Link>
              <p>{task.description}</p>
              <p><strong>Status:</strong> {task.status}</p>
              <p><strong>Due Date:</strong> {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'Not set'}</p>
              <p><strong>Priority:</strong> {task.priority || 'Not set'}</p>

              <button onClick={() => handleDelete(task._id)} style={{ marginRight: '10px' }}>Delete</button>
              <Link to={`/edit/${task._id}`}>
                <button>Edit</button>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TaskList;
