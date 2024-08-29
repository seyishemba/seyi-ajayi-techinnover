import { showSuccessToast, showErrorToast } from './toastService';
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

const LOCAL_STORAGE_KEY = 'tasks';

const getTasks = (): Task[] => {
  const tasks = localStorage.getItem(LOCAL_STORAGE_KEY);
  return tasks ? JSON.parse(tasks) : [];
};

const saveTask = (task: Task): void => {
  try {
    const tasks = getTasks();
    const existingTaskIndex = tasks.findIndex(t => t.id === task.id);
    if (existingTaskIndex > -1) {
      tasks[existingTaskIndex] = task; // Update task
      showSuccessToast('Task updated successfully!');
    } else {
      tasks.push(task); // Add new task
      showSuccessToast('Task added successfully!');
    }
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasks));
  } catch (error) {
    showErrorToast('Failed to save task.');
    console.error('Save task error:', error);
  }
};

const removeTask = (taskId: number): void => {
  try {
    const tasks = getTasks();
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedTasks));
    showSuccessToast('Task removed successfully!');
  } catch (error) {
    showErrorToast('Failed to remove task.');
    console.error('Remove task error:', error);
  }
};

export { getTasks, saveTask, removeTask };
