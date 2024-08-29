import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Define a function to trigger success toast
const showSuccessToast = (message: string) => {
  toast.success(message);
};

// Define a function to trigger error toast
const showErrorToast = (message: string) => {
  toast.error(message);
};

export { showSuccessToast, showErrorToast };
