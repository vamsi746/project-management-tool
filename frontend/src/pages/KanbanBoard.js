import React, { useState, useEffect } from 'react';
import axiosInstance from '../utils/axiosInstance';
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
      const res = await axiosInstance.get('/tasks');
      setTasks(res.data);
    } catch (err) {
      console.error('Error fetching tasks:', err);
    }
  };

  const handleDragEnd = async ({ destination, source, draggableId }) => {
    if (!destination || destination.droppableId === source.droppableId) return;

    try {
      await axiosInstance.put(`/tasks/${draggableId}`, {
        status: destination.droppableId,
      });
      fetchTasks();
    } catch (err) {
      console.error('Error updating status:', err);
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'border-red-500';
      case 'Medium': return 'border-yellow-500';
      case 'Low': return 'border-green-500';
      default: return 'border-gray-400';
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {statusOptions.map(status => (
            <Droppable droppableId={status} key={status}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="bg-white dark:bg-gray-800 p-4 rounded shadow min-h-[500px]"
                >
                  <h3 className="text-lg font-semibold border-b mb-3">{status}</h3>
                  {tasks.filter(t => t.status === status).length === 0 && (
                    <p className="text-sm italic text-gray-400">No tasks</p>
                  )}
                  {tasks.filter(task => task.status === status).map((task, index) => (
                    <Draggable key={task._id} draggableId={task._id} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={`bg-gray-100 dark:bg-gray-700 border-l-4 ${getPriorityColor(task.priority)} p-3 rounded mb-3`}
                        >
                          <h4 className="font-bold">{task.title}</h4>
                          <p>{task.description}</p>
                          <p className="text-sm text-gray-500 mt-1">
                            Due: {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'Not set'}
                          </p>
                          <div className="flex gap-2 mt-2">
                            <Link to={`/edit/${task._id}`}>
                              <button className="px-2 py-1 text-xs bg-blue-500 text-white rounded">Edit</button>
                            </Link>
                            <Link to={`/task/${task._id}`}>
                              <button className="px-2 py-1 text-xs bg-green-600 text-white rounded">Details</button>
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
