import React, { useState, useEffect } from 'react';
import axiosInstance from '../utils/axiosInstance'; // ✅ Ensure this path is correct
import { Link } from 'react-router-dom';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

const statusOptions = ['To Do', 'In Progress', 'Done'];

function KanbanBoard() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await axiosInstance.get('/tasks'); // ✅ use axiosInstance
      setTasks(res.data);
    } catch (err) {
      console.error('Error fetching tasks:', err);
    }
  };

  const handleDragEnd = async (result) => {
    const { destination, source, draggableId } = result;

    if (!destination || destination.droppableId === source.droppableId) return;

    try {
      await axiosInstance.put(`/tasks/${draggableId}`, {
        status: destination.droppableId
      });
      fetchTasks(); // Re-fetch to reflect status update
    } catch (err) {
      console.error('Error updating status:', err);
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return '#f44336';
      case 'Medium': return '#ff9800';
      case 'Low': return '#4caf50';
      default: return '#9e9e9e';
    }
  };

  return (
    <div style={{ padding: '1rem', background: '#f0f2f5', minHeight: '100vh' }}>
      <DragDropContext onDragEnd={handleDragEnd}>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px' }}>
          {statusOptions.map(status => (
            <Droppable key={status} droppableId={status}>
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  style={{
                    flex: 1,
                    padding: '1rem',
                    borderRadius: '8px',
                    background: '#ffffff',
                    boxShadow: '0 0 8px rgba(0, 0, 0, 0.1)',
                    minHeight: '500px'
                  }}
                >
                  <h3 style={{ borderBottom: '2px solid #ccc', paddingBottom: '8px' }}>{status}</h3>
                  {tasks.filter(task => task.status === status).length === 0 && (
                    <p style={{ color: '#888', fontStyle: 'italic' }}>No tasks</p>
                  )}
                  {tasks
                    .filter(task => task.status === status)
                    .map((task, index) => (
                      <Draggable key={task._id} draggableId={task._id} index={index}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={{
                              background: '#fafafa',
                              borderLeft: `6px solid ${getPriorityColor(task.priority)}`,
                              padding: '12px',
                              marginBottom: '12px',
                              borderRadius: '8px',
                              boxShadow: '0 2px 6px rgba(0, 0, 0, 0.05)',
                              ...provided.draggableProps.style
                            }}
                          >
                            <h4 style={{ margin: '0 0 6px 0' }}>{task.title}</h4>
                            <p style={{ margin: '0 0 6px 0' }}>{task.description}</p>
                            <p style={{ margin: '0 0 6px 0' }}>
                              <strong>Due:</strong> {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'Not set'}
                            </p>
                            <p style={{ margin: '0 0 8px 0' }}>
                              <span style={{
                                background: getPriorityColor(task.priority),
                                color: '#fff',
                                padding: '2px 8px',
                                borderRadius: '4px',
                                fontSize: '12px'
                              }}>
                                {task.priority || 'Not set'}
                              </span>
                            </p>
                            <div style={{ display: 'flex', gap: '8px' }}>
                              <Link to={`/edit/${task._id}`}>
                                <button style={{
                                  padding: '6px 12px',
                                  borderRadius: '4px',
                                  background: '#007bff',
                                  color: '#fff',
                                  border: 'none',
                                  cursor: 'pointer'
                                }}>Edit</button>
                              </Link>
                              <Link to={`/task/${task._id}`}>
                                <button style={{
                                  padding: '6px 12px',
                                  borderRadius: '4px',
                                  background: '#28a745',
                                  color: '#fff',
                                  border: 'none',
                                  cursor: 'pointer'
                                }}>Details</button>
                              </Link>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
}

export default KanbanBoard;
