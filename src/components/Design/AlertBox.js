import { Box } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useEffect, useState } from 'react';

const AlertBox = ({ severity, message, onClose }) => {
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    if (message) {
      setShowAlert(true);
      const timer = setTimeout(() => {
        setShowAlert(false);
        onClose();  // Notify parent to clear message
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [message, onClose]);

  const handleClose = () => {
    setShowAlert(false);
    onClose();  // Notify parent to clear message
  };

  return (
    showAlert && (
      <Box>
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          open={showAlert}
          onClose={handleClose}
          autoHideDuration={2000}
          sx={{
            marginTop: {
              xs: '60px', // Extra-small screens
              sm: '60px', // Small screens
              md: '60px', // Medium screens and up
            }, 
          }}
        >
          <Alert onClose={handleClose} severity={severity} variant="filled" >
            {message}
          </Alert>
        </Snackbar>
      </Box>
    )
  );
};

export default AlertBox;
