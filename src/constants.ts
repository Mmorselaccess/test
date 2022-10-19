import { FormValueType, RulesType, TextFieldType, TypeFieldEnum } from './type';

export const INIT_VALUES: FormValueType = {
  textField: '',
  textFieldArea: '',
  applicantIndividualCompanyPositions: '',
  applicantIndividualCompanyRelations: '',
};

export const textFiledConfig: TextFieldType[] = [
  {
    label: 'Company Relations',
    name: 'applicantIndividualCompanyRelations',
    multiple: true,
    type: TypeFieldEnum.select,
  },
  {
    label: 'Company Positions',
    name: 'applicantIndividualCompanyPositions',
    type: TypeFieldEnum.select,
  },
  {
    label: 'Text Field',
    name: 'textField',
    type: TypeFieldEnum.text,
  },
  {
    label: 'Area Text Field',
    name: 'textFieldArea',
    multiline: true,
    type: TypeFieldEnum.text,
  },
];

export const rules: RulesType = {
  text: {
    min: 5,
    max: 10,
    required: true,
  },
  select: {
    required: true,
  },
};

export const validateMessages = {
  required: '${label} is required!',
  string: {
    range: '${label} must be between ${min}, max ${max} characters',
  },
};
