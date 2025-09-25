import { AxiosError } from 'axios';
import { toast } from 'sonner';

export const handleAxiosError = async (error: AxiosError): Promise<void> => {
  const { response, code, message: errorMessage } = error;

  if (!response) {
    // console.error('Network error or no response received', error.code);
    if (code === 'ECONNABORTED') {
      toast.error('Request timed out. Please try again.');
    } else if (
      code === 'ERR_NETWORK' ||
      errorMessage?.includes('Network Error')
    ) {
      //toast.error( 'Failed to establish network connection.');
    } else if (code === 'ECONNREFUSED') {
      toast.error('Unable to reach server. Please try again later.');
    } else if (code === 'ERR_INTERNET_DISCONNECTED') {
      toast.error('Internet connection lost. Please reconnect and try again.');
    } else {
      toast.error('Connection to server failed!');
    }
    return;
  }

  const status = response.status;
  const responseData = response.data as Record<string, any>;
  const message = responseData?.message || error.message || 'An error occurred';

  // 🔐 Auth/session errors
  if ([401, 403].includes(status)) {
    const isUnauthorized = status === 401;
    toast.error(
      message || (isUnauthorized ? 'Unauthorized access' : 'Session expired')
    );
    if (status === 403) {
      // router.replace('/(auth)/login');
    }
    return;
  }

  // 🛠 Server error
  if (status === 500) {
    toast.error('Server Error, try again later!');
    return;
  }

  // Validation or other errors
  if (Array.isArray(message)) {
    message.forEach((msg) => toast.error(msg));
  } else {
    toast.error(message);
  }
};

// Optional alias
export const onError = (error: AxiosError) => handleAxiosError(error);
