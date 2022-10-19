import { SyntheticEvent, useContext } from 'react';
import {
  ListItem as MaterialListItem,
  IconButton,
  Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

import { LisItemType } from '../../type';
import { CustomSelectContext } from '../../Context/CustomSelectContext';
import { ApplicantIndividualCompanyRelation } from '../../api/codegen';

const LisItem = ({
  option,
  ...props
}: LisItemType<ApplicantIndividualCompanyRelation> &
  React.HTMLAttributes<HTMLLIElement>) => {
  const { deleteOption } = useContext(CustomSelectContext);

  const deleteHandler = (event: SyntheticEvent) => {
    event.stopPropagation();
    deleteOption(option.id);
  };

  return (
    <MaterialListItem
      {...props}
      sx={{
        justifyContent: 'space-between !important',
      }}
    >
      <Typography>{option.name || ''}</Typography>
      <IconButton color='error' onClick={deleteHandler}>
        <DeleteIcon fontSize='small' />
      </IconButton>
    </MaterialListItem>
  );
};

export default LisItem;
