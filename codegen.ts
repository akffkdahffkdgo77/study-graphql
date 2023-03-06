import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
    overwrite: true,
    schema: 'http://localhost:3000/graphql',
    documents: 'src/**/*.{tsx,ts}',
    generates: {
        'src/lib/graphql/gql/': {
            preset: 'client',
            plugins: []
        }
    }
};

export default config;
