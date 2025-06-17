import React, { useEffect, useState } from 'react';
import axiosInstance from '../utils/axiosInstance';
import {
  BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, Legend
} from 'recharts';

function Analytics() {
  const [statusData, setStatusData] = useState([]);
  const [priorityData, setPriorityData] = useState([]);
  const [overdueCount, setOverdueCount] = useState(0);

  useEffect(() => {
    axiosInstance.get('/tasks/analytics/summary')
      .then((res) => {
        const summary = res.data;

        // Format status data
        const formattedStatus = Object.entries(summary.status).map(([key, value]) => ({
          name: key,
          value: value
        }));
        setStatusData(formattedStatus);

        // Format priority data
        const formattedPriority = Object.entries(summary.priority).map(([key, value]) => ({
          name: key,
          value: value
        }));
        setPriorityData(formattedPriority);

        // Set overdue count
        setOverdueCount(summary.overdue);
      })
      .catch(err => console.error('Error fetching analytics:', err));
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Analytics Dashboard</h2>

      <h3>Status Distribution</h3>
      <BarChart width={600} height={300} data={statusData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Legend />
        <Bar dataKey="value" fill="#8884d8" name="Tasks" />
      </BarChart>

      <h3 style={{ marginTop: '50px' }}>Priority Distribution</h3>
      <BarChart width={600} height={300} data={priorityData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Legend />
        <Bar dataKey="value" fill="#82ca9d" name="Tasks" />
      </BarChart>

      <h3 style={{ marginTop: '50px' }}>Overdue Tasks</h3>
      <p style={{ fontSize: '18px' }}>
        <strong>Count:</strong> {overdueCount}
      </p>
    </div>
  );
}

export default Analytics;
