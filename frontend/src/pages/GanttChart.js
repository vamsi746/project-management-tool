import React, { useState, useEffect } from 'react';
import axiosInstance from '../utils/axiosInstance'; // ✅ Make sure path is correct
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
      const res = await axiosInstance.get('/tasks'); // ✅ central instance
      const formattedTasks = res.data
        .filter(task => task.createdAt && task.dueDate)
        .map(task => {
          const start = new Date(task.createdAt);
          const end = new Date(task.dueDate);
          if (isNaN(start) || isNaN(end)) return null;

          return {
            id: task._id,
            name: task.title || 'Untitled',
            start,
            end,
            type: 'task',
            progress: 0,
            isDisabled: false,
            styles: {
              progressColor: '#6aa1e3',
              progressSelectedColor: '#406fb5'
            }
          };
        })
        .filter(Boolean); // remove null entries

      setTasks(formattedTasks);
    } catch (error) {
      console.error('Error fetching Gantt chart data:', error);
    }
  };

  const handleViewChange = (e) => {
    const mode = e.target.value;
    setViewMode(mode);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ marginBottom: '1rem' }}>Gantt Chart</h2>

      <div style={{ marginBottom: '10px' }}>
        <label style={{ marginRight: '8px' }}>Select View Mode:</label>
        <select value={viewMode} onChange={handleViewChange}>
          <option value={ViewMode.Hour}>Hour</option>
          <option value={ViewMode.Day}>Day</option>
          <option value={ViewMode.Week}>Week</option>
          <option value={ViewMode.Month}>Month</option>
        </select>
      </div>

      {tasks.length > 0 ? (
        <div style={{ overflowX: 'auto' }}>
          <Gantt tasks={tasks} viewMode={viewMode} />
        </div>
      ) : (
        <p>No tasks with valid start and end dates.</p>
      )}
    </div>
  );
}

export default GanttChart;
