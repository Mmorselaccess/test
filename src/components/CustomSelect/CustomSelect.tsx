import { memo, useCallback, useEffect, useState } from 'react';
import { Autocomplete, TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Form } from 'antd';
import _sortBy from 'lodash.sortby';

import Paper from './Papper';
import LisItem from './LisItem';
import { CurrentOptionType, CustomAutocompleteType } from '../../type';
import { CustomSelectContext } from '../../Context/CustomSelectContext';
import { initValue, matchCurrentId } from '../../helpers';
import { ApplicantIndividualCompanyRelation } from '../../api/codegen';

const useStyles = makeStyles({
  popper: {
    zIndex: 100,
  },
});

const CustomSelect = ({
  id,
  multiple,
  placeholder,
  selectOptions,
}: CustomAutocompleteType<ApplicantIndividualCompanyRelation>) => {
  const classes = useStyles();
  const { status } = Form.Item.useStatus();
  const { setFieldValue, validateFields } = Form.useFormInstance();

  const [placeHolder, setPlaceHolder] = useState<string>('');
  const [openAutocomplete, setOpenAutocomplete] = useState<boolean>(false);
  const [options, setOptions] = useState<ApplicantIndividualCompanyRelation[]>(
    []
  );

  const [currentValue, setCurrentValue] = useState<
    CurrentOptionType<ApplicantIndividualCompanyRelation>
  >(initValue(multiple));

  useEffect(() => {
    setOptions(selectOptions);
  }, [selectOptions]);

  useEffect(() => {
    setPlaceHolder(placeholder);
  }, [placeholder]);

  const handlerChange = (
    _: React.SyntheticEvent,
    option:
      | ApplicantIndividualCompanyRelation
      | ApplicantIndividualCompanyRelation[]
  ) => {
    setCurrentValue(option);
    setFieldValue(id, option);
    validateFields([id])
      .then(() => {
        setPlaceHolder('');
      })
      .catch(({ errorFields }) => {
        const [error] = errorFields[0].errors;
        setPlaceHolder(error);
      });
  };

  const addToOptions = useCallback(
    (val: ApplicantIndividualCompanyRelation) => {
      setOptions((state) => [...state, val]);
      handlerChange(
        null,
        multiple
          ? [...(currentValue as ApplicantIndividualCompanyRelation[]), val]
          : val
      );
    },
    [currentValue]
  );

  const deleteOption = useCallback(
    (val: number | string) => {
      if (matchCurrentId(val, currentValue)) {
        // delete from input if it`s current option
        let options = initValue(multiple) as
          | ApplicantIndividualCompanyRelation
          | ApplicantIndividualCompanyRelation[];
        if (multiple && Array.isArray(currentValue)) {
          options = currentValue.filter(
            (item: ApplicantIndividualCompanyRelation) => item.id !== val
          );
        }
        handlerChange(null, options);
      }
      setOptions((state) => {
        state = state.reduce((newState, item) => {
          item.id !== val ? newState.push(item) : null;
          return newState;
        }, []);
        return state;
      });
    },
    [currentValue]
  );

  const clickByFormListener = (event: MouseEvent) => {
    const form = document.getElementById(id);
    const paper = document.getElementById(`paper-${id}`);

    const target = event.target as HTMLElement;

    setOpenAutocomplete(
      (paper && paper.contains(target)) || form.contains(target)
    );
  };

  const onOpen = async () => {
    await setOpenAutocomplete(true);
    document.addEventListener('click', clickByFormListener);
  };

  const onClose = () => {
    document.removeEventListener('click', clickByFormListener);
  };

  return (
    <CustomSelectContext.Provider
      value={{
        addToOptions,
        deleteOption,
        setOpenAutocomplete,
        setCurrentValue,
      }}
    >
      <Autocomplete
        id={id}
        value={currentValue}
        onChange={handlerChange}
        size='small'
        sx={{ backgroundColor: '#ffffff', borderRadius: 1 }}
        options={_sortBy(
          options,
          (option: ApplicantIndividualCompanyRelation) =>
            option.name.toLowerCase()
        )}
        onOpen={onOpen}
        onClose={onClose}
        multiple={multiple}
        getOptionLabel={(option: ApplicantIndividualCompanyRelation) =>
          option.name || ''
        }
        PaperComponent={(val) => (
          <Paper autocompleteId={id}>{val.children}</Paper>
        )}
        renderOption={(
          props: React.HTMLAttributes<HTMLLIElement>,
          option: ApplicantIndividualCompanyRelation
        ) => (option ? <LisItem option={option} {...props} /> : null)}
        classes={{ popper: classes.popper }}
        renderInput={(params) => (
          <TextField
            {...params}
            error={status === 'error'}
            placeholder={placeHolder}
            color='primary'
          />
        )}
        open={openAutocomplete}
      />
    </CustomSelectContext.Provider>
  );
};

export default memo(CustomSelect);
