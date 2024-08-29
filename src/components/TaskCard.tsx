import React from 'react';
import { useDrag } from 'react-dnd';
import  Tooltip from './Tooltip'

interface TaskCardProps {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  dueTime?: string; // Optional due time field
  priority: 'low' | 'medium' | 'high'; // Priority field
  status: 'pending' | 'in-progress' | 'completed';
  image?: string; // Optional image field
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

// SVG Icons
const FlagIcons = {
  completed: (
    <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M0 3C0 2.20435 0.316071 1.44129 0.87868 0.87868C1.44129 0.316071 2.20435 0 3 0H13C13.1857 0 13.3678 0.0517147 13.5257 0.149349C13.6837 0.246984 13.8114 0.386681 13.8944 0.552786C13.9775 0.718892 14.0126 0.904844 13.996 1.08981C13.9793 1.27477 13.9114 1.45143 13.8 1.6L11.25 5L13.8 8.4C13.9114 8.54857 13.9793 8.72523 13.996 8.91019C14.0126 9.09516 13.9775 9.28111 13.8944 9.44721C13.8114 9.61332 13.6837 9.75302 13.5257 9.85065C13.3678 9.94829 13.1857 10 13 10H3C2.73478 10 2.48043 10.1054 2.29289 10.2929C2.10536 10.4804 2 10.7348 2 11V14C2 14.2652 1.89464 14.5196 1.70711 14.7071C1.51957 14.8946 1.26522 15 1 15C0.734784 15 0.48043 14.8946 0.292893 14.7071C0.105357 14.5196 0 14.2652 0 14V3Z" fill="#4F9C20"/>
    </svg>
  ),
  overdue: (
    <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M5 8.34546C5 7.54981 5.31607 6.78675 5.87868 6.22414C6.44129 5.66153 7.20435 5.34546 8 5.34546H18C18.1857 5.34546 18.3678 5.39717 18.5257 5.49481C18.6837 5.59244 18.8114 5.73214 18.8944 5.89825C18.9775 6.06435 19.0126 6.2503 18.996 6.43526C18.9793 6.62023 18.9114 6.79689 18.8 6.94546L16.25 10.3455L18.8 13.7455C18.9114 13.894 18.9793 14.0707 18.996 14.2557C19.0126 14.4406 18.9775 14.6266 18.8944 14.7927C18.8114 14.9588 18.6837 15.0985 18.5257 15.1961C18.3678 15.2937 18.1857 15.3455 18 15.3455H8C7.73478 15.3455 7.48043 15.4508 7.29289 15.6384C7.10536 15.8259 7 16.0802 7 16.3455V19.3455C7 19.6107 6.89464 19.865 6.70711 20.0526C6.51957 20.2401 6.26522 20.3455 6 20.3455C5.73478 20.3455 5.48043 20.2401 5.29289 20.0526C5.10536 19.865 5 19.6107 5 19.3455V8.34546Z" fill="#F76659"/>
    </svg>
  ),
  newlyCreated: (
    <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path opacity="0.5" fill-rule="evenodd" clip-rule="evenodd" d="M5 8.12225C5 7.3266 5.31607 6.56354 5.87868 6.00093C6.44129 5.43832 7.20435 5.12225 8 5.12225H18C18.1857 5.12225 18.3678 5.17397 18.5257 5.2716C18.6837 5.36924 18.8114 5.50893 18.8944 5.67504C18.9775 5.84115 19.0126 6.0271 18.996 6.21206C18.9793 6.39702 18.9114 6.57368 18.8 6.72225L16.25 10.1223L18.8 13.5223C18.9114 13.6708 18.9793 13.8475 18.996 14.0324C19.0126 14.2174 18.9775 14.4034 18.8944 14.5695C18.8114 14.7356 18.6837 14.8753 18.5257 14.9729C18.3678 15.0705 18.1857 15.1223 18 15.1223H8C7.73478 15.1223 7.48043 15.2276 7.29289 15.4151C7.10536 15.6027 7 15.857 7 16.1223V19.1223C7 19.3875 6.89464 19.6418 6.70711 19.8294C6.51957 20.0169 6.26522 20.1223 6 20.1223C5.73478 20.1223 5.48043 20.0169 5.29289 19.8294C5.10536 19.6418 5 19.3875 5 19.1223V8.12225Z" fill="#6E7C87"/>
    </svg>
  ),
};

const ItemType = 'TASK';

const TaskCard: React.FC<TaskCardProps> = ({
  id,
  title,
  description,
  dueDate,
  dueTime,
  priority,
  status,
  image,
  onEdit,
  onDelete,
}) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemType,
    item: { id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  // Determine the flag to display
  const getStatusFlag = () => {
    const currentDate = new Date();
    const taskDueDate = new Date(dueDate);
    if (status === 'completed') {
      return FlagIcons.completed;
    }
    if (taskDueDate < currentDate) {
      return FlagIcons.overdue;
    }
    return FlagIcons.newlyCreated;
  };

  // Format due time if provided
  const formattedDueTime = dueTime ? new Date(`1970-01-01T${dueTime}:00`).toLocaleTimeString([], { timeStyle: 'short' }) : '';
    // Determine priority color
    const priorityColor = priority === 'high' ? 'bg-[#EBFAE2] text-[#4F9C20]' :
    priority === 'medium' ? 'bg-[#FDF2F2] text-[#EC5962]' :
    'bg-[#EEF3FF] text-[#3069FE]';

    // Determine status color
    const statusColor = status === 'completed' ? 'text-green-600' :
      status === 'in-progress' ? 'text-yellow-600' :
      'text-red-600';

  return (
    <>

    
    <div  
      ref={drag}
      className={`bg-white shadow-md rounded-lg p-4 mb-4 ${isDragging ? 'opacity-50' : ''}`} 
      >
      <div className="flex items-center mb-4">
        <span className={`py-1 px-2 rounded-md text-xs font-medium ${priorityColor}`}>
          {priority.toUpperCase()}
        </span>
      </div>
      <h2 className="text-xl font-bold mb-2 flex justify-between items-center mb-3">
        {title}
        <Tooltip
              tooltipContent={
              <div className="flex justify-between mt-0 flex-col text-sm">
                  <button className="text-left  text-gray-400 px-4 py-1 rounded" onClick={() => onEdit(id)}>
                  Edit
                  </button>
                  <button className="text-left text-red-500  px-4 py-1 rounded" onClick={() => onDelete(id)}>
                  Delete
                  </button>
              </div>
              }
          >
              <button className="border text-black px-3 py-3 pt-0 font-bold rounded-lg">...</button>
      </Tooltip>
      </h2>
      {image && (
        <div className="mb-6">
          <img src={image} alt="Task" className="w-full h-32 object-cover rounded-lg" />
        </div>
      )}
      <p className="text-gray-700 mb-4">{description}</p>
      <p className="text-gray-500 mb-2 flex justify-between">
        <span className="flex items-center gap-2">
        {getStatusFlag()}

          {dueDate}
        </span>
        {formattedDueTime && <span>{formattedDueTime}</span>}
      </p>
    </div>
  </>
  );
};

export default TaskCard;
