import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

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

interface TaskFormProps {
  initialData?: Task;
  onSubmit: (data: any) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ initialData, onSubmit }) => {
  const { control, handleSubmit, setValue, register, watch, formState: { errors } } = useForm({
    defaultValues: initialData ? {
      title: initialData.title,
      description: initialData.description,
      dueDate: initialData.dueDate ? new Date(initialData.dueDate) : new Date(),
      dueTime: initialData.dueTime || '', // Ensure dueTime is handled as a string
      priority: initialData.priority,
      status: initialData.status,
      image: initialData.image || '', // Set image value if exists
    } : {
      title: '',
      description: '',
      dueDate: new Date(),
      dueTime: '', // Initialize as empty string
      priority: 'low',
      status: 'pending',
      image: '', // Initialize as empty if no image
    }
  });

  useEffect(() => {
    if (initialData) {
      setValue('title', initialData.title);
      setValue('description', initialData.description);
      setValue('dueDate', initialData.dueDate ? new Date(initialData.dueDate) : new Date());
      setValue('dueTime', initialData.dueTime || '');
      setValue('priority', initialData.priority);
      setValue('status', initialData.status);
      setValue('image', initialData.image || '');
    }
  }, [initialData, setValue]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          setValue('image', reader.result as string); // Update form value
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const imageValue = watch('image'); // Watch the image field value

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-lg p-4">
      <div className="mb-4">
        <label className="block text-gray-700 mb-2" htmlFor="title">Task Name</label>
        <input
          id="title"
          {...register('title', { required: 'Title is required' })}
          className="border border-gray-300 rounded-lg p-2 w-full"
        />
        {errors.title && <span className="text-red-500">{errors.title.message}</span>}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 mb-2" htmlFor="description">Description (Optional)</label>
        <textarea
          id="description"
          {...register('description', { required: 'Description is required' })}
          className="border border-gray-300 rounded-lg p-2 w-full"
        />
        {errors.description && <span className="text-red-500">{errors.description.message}</span>}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 mb-2" htmlFor="priority">Priority</label>
        <select
          id="priority"
          {...register('priority')}
          className="border border-gray-300 rounded-lg p-2 w-full"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 mb-2" htmlFor="status">Status</label>
        <select
          id="status"
          {...register('status')}
          className="border border-gray-300 rounded-lg p-2 w-full"
        >
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 mb-2" htmlFor="image">Image (Optional)</label>
        <input
          id="image"
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="border border-gray-300 rounded-lg p-2 w-full"
        />
        <p className='text-center align-center flex flex-col items-center'>
          <img src="/upload.svg" className='w-14'/>
          Click to upload or drag and drop PNG or JPG 
        </p>
        {imageValue && (
          <img src={imageValue} alt="Task" className="mt-4 w-32 h-32 object-cover" />
        )}
      </div>

      <div className='flex gap-4'>

      <div className="mb-4">
        <label className="block text-gray-700 mb-2" htmlFor="dueDate">Due Date</label>
        <Controller
          name="dueDate"
          control={control}
          render={({ field }) => (
            <DatePicker
              selected={field.value}
              onChange={(date) => field.onChange(date)}
              className="border border-gray-300 rounded-lg p-2 w-full"
              dateFormat="yyyy/MM/dd"
            />
          )}
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 mb-2" htmlFor="dueTime">Due Time</label>
        <Controller
          name="dueTime"
          control={control}
          render={({ field }) => (
            <DatePicker
              selected={field.value ? new Date(`1970-01-01T${field.value}:00`) : null}
              onChange={(time) => field.onChange(time ? time.toISOString().split('T')[1].slice(0, 5) : '')}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={15}
              timeCaption="Time"
              dateFormat="HH:mm"
              className="border border-gray-300 rounded-lg p-2 w-full"
            />
          )}
        />
      </div>
      </div>
      <button type="submit" className="bg-[#4F35F3] text-white px-4 py-2 rounded w-full">Save</button>
    </form>
  );
};

export default TaskForm;
