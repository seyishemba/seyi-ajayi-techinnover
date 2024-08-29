import React from 'react';
import { useDrop } from 'react-dnd';
import TaskCard from './TaskCard';

const ItemType = 'TASK';

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

interface TaskListProps {
  status: 'pending' | 'in-progress' | 'completed';
  tasks: Task[]; // Use the Task type here
  onDrop: (taskId: number, newStatus: 'pending' | 'in-progress' | 'completed') => void;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

const TaskList: React.FC<TaskListProps> = ({ status, tasks, onDrop, onEdit, onDelete }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemType,
    drop: (item: { id: number }) => {
      console.log(item);
      onDrop(item.id, status);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <>
     <div
     ref={drop}
     className={`p-4 border  w-full ${isOver ? 'bg-gray-100' : 'bg-[#f5f5f5]'} rounded-lg`}
     >
     <div className="flex justify-between mb-4">
     <h2 className="text-lg font-normal" style={{ fontSize: '17px' }}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
         <span className="text-lg font-normal ml-2" style={{
         background: '#e2e2e2',
         padding: '4px 8px',
         borderRadius: '5px',
         fontSize: '16px'
         }}>
         {tasks.length }
         </span>
     </h2>
     <button className="text-xl font-normal">+</button>
     </div>
      {tasks.map(task => (
        <TaskCard
          key={task.id}
          id={task.id}
          title={task.title}
          description={task.description}
          dueDate={task.dueDate}
          dueTime={task.dueTime} // Pass dueTime to TaskCard
          priority={task.priority} // Pass priority to TaskCard
          status={task.status}
          image={task.image} // Pass the image URL if available
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
    </>
  );
};

export default TaskList;
