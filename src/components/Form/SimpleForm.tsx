import { useState, memo } from 'react';
import { Box, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Form } from 'antd';

import {
  ErrorFormType,
  FormValueType,
  StatusType,
  TypeFieldEnum,
} from '../../type';
import {
  INIT_VALUES,
  rules,
  textFiledConfig,
  validateMessages,
} from '../../constants';
import CustomInput from '../CustomInput/CustomInput';
import { CustomSelect } from '../CustomSelect';
import StatusMessage from './StatusMessage';
import { getFieldError } from '../../helpers';
import { useCompanyDataQuery } from '../../api/codegen';

const useStyles = makeStyles({
  root: {
    '& form': {
      display: 'flex',
      flexDirection: 'column',
    },
    '& label': {
      display: 'block',
      marginBottom: 8,
    },
    '& .ant-form-item-explain-error, .ant-form-item-margin-offset': {
      display: 'none',
    },
    '& .ant-form-item-control-input ~ div': {
      display: 'none !important',
    },
  },
});

const SimpleForm = () => {
  const classes = useStyles();
  const [form] = Form.useForm<FormValueType>();

  const [errors, setErrors] = useState<ErrorFormType[]>([]);
  const [status, setStatus] = useState<StatusType>(null);

  const { data, loading } = useCompanyDataQuery();

  const onFinish = (values: FormValueType) => {
    console.log('values', values);
    new Promise((resolve) => {
      setTimeout(() => {
        resolve('Success!');
      }, 1500);
    })
      .then(() => {
        form.resetFields();
        setStatus('success');
        setErrors([]);
      })
      .then(() => {
        setTimeout(() => setStatus(null), 2000);
      });
  };

  return (
    <Box className={classes.root}>
      <Form
        form={form}
        name='control-hooks'
        onFinish={onFinish}
        initialValues={INIT_VALUES}
        validateMessages={validateMessages}
        onFinishFailed={({ errorFields }) => {
          setErrors(errorFields as ErrorFormType[]);
        }}
      >
        {textFiledConfig.map((field) => {
          const { label, name, type } = field;
          const textField = type === TypeFieldEnum.text;
          return (
            <Form.Item
              name={name}
              label={label}
              rules={[rules[type]]}
              key={name}
              style={{ marginBottom: 24 }}
              htmlFor={name}
            >
              {textField ? (
                <CustomInput
                  id={name}
                  multiline={field.multiline}
                  placeholder={getFieldError(name, errors)}
                />
              ) : (
                <CustomSelect
                  id={name}
                  multiple={field.multiple}
                  placeholder={getFieldError(name, errors) || ''}
                  selectOptions={loading ? [] : data[name].data}
                />
              )}
            </Form.Item>
          );
        })}
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 3 }}>
          <Button type='submit' variant='contained' sx={{ minWidth: 120 }}>
            Send
          </Button>
          {status && <StatusMessage status={status} />}
        </Box>
      </Form>
    </Box>
  );
};

export default memo(SimpleForm);
