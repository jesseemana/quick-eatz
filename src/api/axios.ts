import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL as string;
const PROD_URL = import.meta.env.VITE_API_PROD_URL as string;
const environment = import.meta.env.VITE_ENVIRONMENT as string;

const axios_instance = axios.create({
  baseURL: environment === 'development' ? BASE_URL : PROD_URL,
});

const handleErrors = (error: unknown) => {
  let statusCode = 500;
  let errorObject = '{}';
  let errorMessage = 'An unknown error occurred';
    
  if (axios.isAxiosError(error) && error.response) {
    statusCode = error.response.status;
    try {
      const data = error.response.data as { message?: string; error?: string; };
      errorMessage = data.message || data.error || errorMessage;
      errorObject = JSON.stringify(data);
    } catch {
      errorMessage = 'Failed to parse error response';
    }
  }

  return { errorMessage, statusCode, errorObject, };
}

export { axios_instance, handleErrors }
