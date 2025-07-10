import React, { useState, useEffect } from 'react';
import axiosInstance from '../utils/axiosInstance';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosInstance.get('/tasks')
      .then(res => {
        setTasks(res.data);
        setLoading(false);
      })
      .catch(err => {
        toast.error('Failed to fetch tasks');
        setLoading(false);
      });
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this task?')) return;

    try {
      await axiosInstance.delete(`/tasks/${id}`);
      setTasks(tasks.filter(t => t._id !== id));
      toast.success('Task deleted');
    } catch (err) {
      toast.error('Delete failed');
    }
  };

  if (loading) return <p className="text-center">Loading tasks...</p>;

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl sm:text-2xl font-bold mb-4">Task List</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {tasks.map(task => (
          <div
            key={task._id}
            className="bg-white dark:bg-gray-800 p-4 rounded shadow flex flex-col justify-between"
          >
            <Link to={`/task/${task._id}`}>
              <h3 className="font-semibold mb-2">{task.title}</h3>
            </Link>
            <p className="mb-2">{task.description}</p>
            <p><strong>Status:</strong> {task.status}</p>
            <p><strong>Due:</strong> {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'Not set'}</p>
            <p><strong>Priority:</strong> {task.priority}</p>
            <div className="flex flex-col sm:flex-row gap-2 mt-4">
              <button
                onClick={() => handleDelete(task._id)}
                className="w-full sm:w-auto bg-red-600 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
              <Link to={`/edit/${task._id}`}>
                <button className="w-full sm:w-auto bg-blue-600 text-white px-3 py-1 rounded">
                  Edit
                </button>
              </Link>
              <Link to={`/taskdetails/${task._id}`}>
                <button className="w-full sm:w-auto bg-green-600 text-white px-3 py-1 rounded">
                  Details
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TaskList;
