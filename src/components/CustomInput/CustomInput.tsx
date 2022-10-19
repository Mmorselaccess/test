import { memo, useEffect, useState } from 'react';
import { TextField, Typography, InputAdornment } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Form } from 'antd';

import { CustomInputType } from '../../type';

const useStyles = makeStyles({
  root: {
    marginTop: 1,
    marginBottom: 1,
    backgroundColor: '#ffffff',
    borderRadius: 1,
    '& .MuiInputBase-root': {
      alignItems: 'baseline',
    },
  },
});

const CustomInput = ({
  value,
  onChange,
  multiline,
  id,
  placeholder,
}: CustomInputType) => {
  const classes = useStyles();
  const { status } = Form.Item.useStatus();
  const { getFieldError } = Form.useFormInstance();

  const [placeHolder, setPlaceHolder] = useState<string>('');

  useEffect(() => {
    setPlaceHolder(placeholder);
  }, [placeholder]);

  useEffect(() => {
    if (getFieldError(id)) {
      const error = getFieldError(id)[0];
      setPlaceHolder(error);
    }
  });

  return (
    <TextField
      fullWidth
      size='small'
      classes={{ root: classes.root }}
      value={value}
      onChange={onChange}
      error={status === 'error'}
      multiline={multiline}
      rows={6}
      id={id}
      placeholder={placeHolder}
      InputProps={{
        endAdornment: value ? (
          <InputAdornment position='end'>
            <Typography sx={{ color: 'rgba(0, 0, 0, 0.30)' }}>
              {placeHolder}
            </Typography>
          </InputAdornment>
        ) : null,
      }}
    />
  );
};

export default memo(CustomInput);
