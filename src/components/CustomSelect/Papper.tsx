import { useState, useCallback, useContext } from 'react';
import { Box, TextField, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import { PaperType } from '../../type';
import { CustomSelectContext } from '../../Context/CustomSelectContext';
import { ApplicantIndividualCompanyRelation } from '../../api/codegen';

const Paper = ({ children, autocompleteId }: PaperType) => {
  const { addToOptions, setOpenAutocomplete } = useContext(CustomSelectContext);
  const [value, setValue] = useState<string>('');

  const addOption = useCallback(() => {
    const id = Math.random().toString(16).slice(-4);
    const option: ApplicantIndividualCompanyRelation = {
      id,
      name: value,
    };
    addToOptions(option);
    setValue('');
  }, [value]);

  return (
    <Box
      id={`paper-${autocompleteId}`}
      sx={{
        backgroundColor: ' #ffffff',
        boxShadow:
          '0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)',
        pt: 0,
        pb: 2,
        px: 2,
      }}
    >
      {children}
      <Box sx={{ display: 'flex', mt: 2 }}>
        <TextField
          value={value}
          size='small'
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setValue(event.target.value)
          }
          onClick={() => setOpenAutocomplete(true)}
        />
        <Button
          sx={{ ml: 1, px: 3 }}
          size='small'
          onClick={addOption}
          disabled={!value}
          color='primary'
          startIcon={<AddIcon fontSize='small' />}
          variant='contained'
        >
          Add
        </Button>
      </Box>
    </Box>
  );
};

export default Paper;
