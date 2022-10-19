import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: process.env.REACT_APP_GRAPHQL_API,
  documents: ['src/**/*.tsx', 'src/**/*.ts'],
  generates: {
    './src/api/codegen.ts': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-react-apollo',
      ],
      config: {
        withHooks: true,
      },
    },
  },
};

export default config;
