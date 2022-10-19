import { ReactNode } from 'react';
import { Rule } from 'antd/es/form';

export type FormValueType = {
  textField: string;
  textFieldArea: string;
  applicantIndividualCompanyRelations: string;
  applicantIndividualCompanyPositions: string;
};

type FormValues = keyof FormValueType;

export enum TypeFieldEnum {
  text = 'text',
  select = 'select',
}

type TypeField = keyof typeof TypeFieldEnum;

export type CustomInputType = {
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  multiline?: boolean;
  id: FormValues;
  placeholder: string;
};

export type CustomAutocompleteType<T> = {
  id: FormValues;
  multiple?: boolean;
  placeholder: string;
  selectOptions: T[];
};

export type TextFieldType = {
  label: string;
  name: FormValues;
  multiline?: boolean;
  multiple?: boolean;
  type: TypeField;
};

export type RulesType = {
  [key in TypeField]: Rule;
};

export type CurrentOptionType<T> = T | T[] | Record<string, string>;

export type LisItemType<T> = {
  option: T;
};

export type PaperType = {
  children: ReactNode;
  autocompleteId: number | string;
};

export type ErrorFormType = {
  errors: string[];
  name: string[];
};

export type StatusType = 'success' | 'error' | null;

export type StatusRequestType = {
  status: StatusType;
};
