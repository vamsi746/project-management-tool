import React, { useEffect, useState } from 'react';
import axiosInstance from '../utils/axiosInstance';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function Analytics() {
  const [statusData, setStatusData] = useState([]);
  const [priorityData, setPriorityData] = useState([]);
  const [overdueCount, setOverdueCount] = useState(0);

  useEffect(() => {
    axiosInstance.get('/tasks/analytics/summary')
      .then((res) => {
        const summary = res.data;
        setStatusData(Object.entries(summary.status).map(([key, value]) => ({ name: key, value })));
        setPriorityData(Object.entries(summary.priority).map(([key, value]) => ({ name: key, value })));
        setOverdueCount(summary.overdue);
      })
      .catch((err) => console.error('Analytics fetch error:', err));
  }, []);

  return (
    <div className="min-h-screen p-6 bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white">
      <h2 className="text-2xl font-bold mb-6">📊 Analytics Dashboard</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h3 className="mb-2 font-semibold">Status Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={statusData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#60a5fa" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div>
          <h3 className="mb-2 font-semibold">Priority Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={priorityData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#34d399" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="font-semibold">🚨 Overdue Tasks</h3>
        <p className="text-lg font-bold">{overdueCount}</p>
      </div>
    </div>
  );
}

export default Analytics;
