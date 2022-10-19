import { CurrentOptionType } from './../type';
import { ErrorFormType } from '../type';
import { ApplicantIndividualCompanyRelation } from '../api/codegen';

export const getFieldError = (id: number | string, errors: ErrorFormType[]) => {
  const field = errors?.find((error) => {
    const [fieldName] = error.name;
    return fieldName === id;
  });
  return field?.errors[0] || '';
};

export const matchCurrentId = (
  id: number | string,
  options: CurrentOptionType<ApplicantIndividualCompanyRelation>
) => {
  if (Array.isArray(options)) {
    return options.some(
      (item: ApplicantIndividualCompanyRelation) => item.id === id
    );
  }
  return options.id === id;
};

export const initValue = (multiple: boolean) => (multiple ? [] : {});
