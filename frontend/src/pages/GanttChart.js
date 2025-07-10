import React, { useState, useEffect } from 'react';
import axiosInstance from '../utils/axiosInstance';
import { Gantt, ViewMode } from 'gantt-task-react';
import 'gantt-task-react/dist/index.css';

function GanttChart() {
  const [tasks, setTasks] = useState([]);
  const [viewMode, setViewMode] = useState(ViewMode.Day);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await axiosInstance.get('/tasks');
      const formatted = res.data
        .filter(task => task.createdAt && task.dueDate)
        .map(task => ({
          id: task._id,
          name: task.title,
          start: new Date(task.createdAt),
          end: new Date(task.dueDate),
          type: 'task',
          progress: 0,
          isDisabled: false,
          styles: {
            progressColor: '#3b82f6',
            progressSelectedColor: '#2563eb',
          },
        }));
      setTasks(formatted);
    } catch (err) {
      console.error('Gantt chart error:', err);
    }
  };

  return (
    <div className="min-h-screen p-4 bg-gray-100 dark:bg-gray-900">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">📅 Gantt Chart</h2>

      <div className="mb-4">
        <label className="mr-2 text-gray-700 dark:text-gray-300">View Mode:</label>
        <select
          value={viewMode}
          onChange={(e) => setViewMode(e.target.value)}
          className="px-3 py-1 rounded dark:bg-gray-800 border"
        >
          <option value={ViewMode.Hour}>Hour</option>
          <option value={ViewMode.Day}>Day</option>
          <option value={ViewMode.Week}>Week</option>
          <option value={ViewMode.Month}>Month</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        {tasks.length > 0 ? (
          <Gantt tasks={tasks} viewMode={viewMode} />
        ) : (
          <p className="text-gray-600">No valid tasks found.</p>
        )}
      </div>
    </div>
  );
}

export default GanttChart;
