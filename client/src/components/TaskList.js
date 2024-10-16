import React, { useEffect, useState, useCallback } from 'react';

const TaskList = ({ token, username }) => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editingTaskTitle, setEditingTaskTitle] = useState('');

  const fetchTasks = useCallback(async () => {
    const response = await fetch('http://localhost:5000/api/tasks', {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setTasks(data);
  }, [token]);

  useEffect(() => {
    console.log("Username: ", username);
    fetchTasks();
  }, [fetchTasks]);

  const addTask = async () => {
    if (!newTask) return;

    const response = await fetch('http://localhost:5000/api/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title: newTask }),
    });

    if (response.ok) {
      setNewTask('');
      fetchTasks();
    }
  };

  const toggleTaskCompletion = async (task) => {
    await fetch(`http://localhost:5000/api/tasks/${task._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ completed: !task.completed }),
    });
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/api/tasks/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchTasks();
  };

  const startEditingTask = (task) => {
    setEditingTaskId(task._id);
    setEditingTaskTitle(task.title);
  };

  const saveEditedTask = async () => {
    if (!editingTaskTitle.trim()) {
      alert('Task title cannot be empty.');
      return;
    }
  
    await fetch(`http://localhost:5000/api/tasks/${editingTaskId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title: editingTaskTitle }),
    });
    setEditingTaskId(null);
    setEditingTaskTitle('');
    fetchTasks();
  };
  

  const handleLogout = () => {
    localStorage.removeItem('token'); 
    window.location.href = '/login';
  };

  return (
    <div className="p-6 max-w-3xl mx-auto bg-cyan-50 rounded-xl shadow-md">
      <div className="flex justify-between items-center mb-8 border-b pb-4">
        <div className="text-2xl font-bold text-gray-900">
          Welcome, {username}
        </div>
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-all duration-200"
        >
          Logout
        </button>
      </div>

      <div className="mb-8">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task..."
          className="border p-3 rounded-lg w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm transition-all duration-200"
        />
        <button
          onClick={addTask}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg w-full hover:bg-blue-700 transition-all duration-200"
        >
          Add Task
        </button>
      </div>

      <div className="space-y-4">
        {tasks.map((task) => (
          <div
            key={task._id}
            className={`p-4 rounded-lg shadow-md border-l-4 transition-all duration-300 ${
              task.completed ? 'border-green-500 bg-green-50' : 'border-gray-300 bg-gray-50'
            } hover:shadow-lg`}
          >
            <div className="flex justify-between items-center" >
              {editingTaskId === task._id ? (
                <input
                  type="text"
                  value={editingTaskTitle}
                  onChange={(e) => setEditingTaskTitle(e.target.value)}
                  className="border p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
              ) : (
                <span
                  onClick={() => toggleTaskCompletion(task)}
                  className={`cursor-pointer text-lg font-medium ${
                    task.completed ? 'line-through text-gray-500' : 'text-gray-900 w-full'
                  }`}
                >
                  {task.title}
                </span>
              )}

              <div className="flex items-center space-x-2">
                {editingTaskId === task._id ? (
                  <button
                    onClick={saveEditedTask}
                    className="bg-blue-500 text-white m-1 px-3 py-1 rounded-lg hover:bg-blue-600"
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => startEditingTask(task)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded-lg hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                )}

                <button
                  onClick={() => deleteTask(task._id)}
                  className="bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskList;
