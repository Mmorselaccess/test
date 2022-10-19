import { memo } from 'react';
import { Typography } from '@mui/material';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import CancelIcon from '@mui/icons-material/Cancel';

import { StatusRequestType } from '../../type';

const StatusMessage = ({ status }: StatusRequestType) => {
  const isError = status === 'error';
  return (
    <Typography
      color={isError ? 'red' : 'green'}
      sx={{ ml: 3, display: 'flex', alignItems: 'center' }}
    >
      {isError ? (
        <CancelIcon sx={{ mr: 1 }} color='error' />
      ) : (
        <TaskAltIcon sx={{ mr: 1 }} />
      )}
      {status}
    </Typography>
  );
};

export default memo(StatusMessage);
