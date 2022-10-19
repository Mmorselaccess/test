import { gql } from '@apollo/client';

export const companyData = gql(`
  query CompanyData {
    applicantIndividualCompanyRelations {
      data {
        id
        name
      }
    }
    applicantIndividualCompanyPositions {
      data {
        id
        name
      }
    }
  }
`);
