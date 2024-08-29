import React, { useState, useEffect } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import { getTasks, saveTask, removeTask } from './services/taskService';
import Modal from './components/Modal';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ToastContainer, toast } from 'react-toastify';

interface Task {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  dueTime?: string; // Optional due time field
  priority: 'low' | 'medium' | 'high'; // Priority field
  status: 'pending' | 'in-progress' | 'completed';
  image?: string; // Optional image field
}

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterDate, setFilterDate] = useState<Date | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchedTasks = getTasks();
    if (fetchedTasks.length === 0) {
      const initialTasks: Task[] = [
        { id: 1, title: 'Task 1', description: 'Description 1', dueDate: '2024-08-30', dueTime: '18:45', priority: 'low', status: 'pending' },
        { id: 2, title: 'Task 2', description: 'Description 2', dueDate: '2024-09-01', dueTime: '18:45', priority: 'medium', status: 'in-progress' },
      ];
      initialTasks.forEach(task => saveTask(task));
      setTasks(initialTasks);
    } else {
      setTasks(fetchedTasks);
    }
  }, []);

  const handleDrop = (taskId: number, newStatus: 'pending' | 'in-progress' | 'completed') => {
    const tasks = getTasks();
    const updatedTasks = tasks.map(task =>
      task.id === taskId ? { ...task, status: newStatus } : task
    );
    setTasks(updatedTasks);
    updatedTasks.forEach(task => saveTask(task)); // Save updated tasks
  };

  const handleOpenModal = () => {
    setEditingTask(null); // Clear the editing task
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleEdit = (id: number) => {
    setIsModalOpen(true);
    const taskToEdit = tasks.find(task => task.id === id);
    if (taskToEdit) {
      setEditingTask(taskToEdit); // Set the task to be edited
    }
  };

  const handleDelete = (id: number) => {
    removeTask(id); // Remove the task
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id)); // Update state
    toast.success('Task deleted successfully'); // Show toast notification
  };

  const handleSubmit = (data: any) => {
    const dueDate = data.dueDate instanceof Date ? data.dueDate.toISOString().split('T')[0] : new Date().toISOString().split('T')[0];
    const dueTime = data.dueTime ? new Date(`1970-01-01T${data.dueTime}:00`).toISOString().split('T')[1].slice(0, 5) : undefined;
  
    const task = {
      id: editingTask ? editingTask.id : Date.now(), // Use existing ID or generate new one
      title: data.title,
      description: data.description,
      dueDate: dueDate, // Format date as YYYY-MM-DD
      dueTime: dueTime, // Format time as HH:mm
      priority: data.priority,
      status: data.status,
      image: data.image, // Include image data
    };
  
    saveTask(task); // Save or update task
    setTasks(getTasks()); // Refresh task list
    setEditingTask(null); // Clear the editing task
    handleCloseModal();
    toast.success('Task saved successfully'); // Show toast notification
  };
  
  const today = new Date();

  // Filter tasks based on due date and search query
  const filteredTasks = tasks.filter(task => {
    const taskDueDate = new Date(task.dueDate);
    const matchesDate = !filterDate || taskDueDate >= filterDate || taskDueDate.toDateString() === today.toDateString();
    const matchesQuery = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          task.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDate && matchesQuery;
  });

  // Split filtered tasks by status
  const pendingTasks = filteredTasks.filter(task => task.status === 'pending');
  const inProgressTasks = filteredTasks.filter(task => task.status === 'in-progress');
  const completedTasks = filteredTasks.filter(task => task.status === 'completed');

  // Clear filters
  const clearFilters = () => {
    setFilterDate(null);
    setSearchQuery('');
  };

  return (
    <>
    <div className="p-8 mb-4 w-full">
      <div className="flex gap-4 mb-6 flex-col md:flex-row justify-between">
        <div className="flex gap-4">
        <button onClick={handleOpenModal} className="bg-gray-500 text-white px-4 py-2 rounded">
          +
        </button>
          <DatePicker
            selected={filterDate}
            onChange={(date: Date | null) => setFilterDate(date)}
            placeholderText="Filter by date"
            className="border border-gray-300 rounded-lg p-2"
          />
        </div>
        <div className="flex gap-4">
        <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border border-gray-300 rounded-lg p-2"
          />
        <button onClick={clearFilters} className="bg-gray-500 text-white px-4 py-2 rounded">
          Clear
        </button>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <TaskForm initialData={editingTask || undefined} onSubmit={handleSubmit} />
      </Modal>

      <div className="flex flex-col md:flex-row gap-4">
        <TaskList
          status="pending"
          tasks={pendingTasks}
          onDrop={handleDrop}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
        <TaskList
          status="in-progress"
          tasks={inProgressTasks}
          onDrop={handleDrop}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
        <TaskList
          status="completed"
          tasks={completedTasks}
          onDrop={handleDrop}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
      <ToastContainer />
    </div>
    </>
  );
};

export default App;
