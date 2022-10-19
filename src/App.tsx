import { Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { SimpleForm } from './components/Form';

const useStyles = makeStyles({
  root: {
    margin: 'auto',
    padding: 32,
    maxWidth: 600,
    backgroundColor: '#6887f53d',
    boxShadow: '0 0 10px #0000002e',
    position: 'relative',
    top: '50%',
    transform: 'translateY(-50%)',
    borderRadius: 8,
  },
});

const App = () => {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <SimpleForm />
    </Box>
  );
};

export default App;
