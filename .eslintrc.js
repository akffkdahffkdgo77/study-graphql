module.exports = {
    env: {
        node: true, // node 환경
        jest: true, // jest를 사용한다면 true
        browser: true, // document, window를 사용하려면 true
        es2021: true // ECMASCRIPT 버젼 설정
    },
    parser: '@typescript-eslint/parser',
    extends: [
        'react-app', // eslint-config-react-app
        'airbnb', // eslint-config-airbnb
        'prettier', // eslint-config-prettier, prettier와 충돌나는 ESLint 설정들 비활성화
        'plugin:import/typescript',
        'plugin:react/recommended', // eslint-plugin-react에서 추천하는 ESLint 설정
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended', // eslint-plugin-prettier, eslint-config-prettier 설정 적용하려면 필수
        'plugin:react/jsx-runtime'
    ],
    plugins: ['prettier', '@typescript-eslint'],
    parserOptions: {
        ecmaVersion: 12,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true
        }
    },
    ignorePatterns: ['node_modules/', 'serviceWorker.ts', 'setupTests.ts'],
    settings: {
        'import/resolver': {
            node: {
                paths: ['src'],
                extensions: ['.js', '.jsx', '.ts', '.tsx']
            }
        },
        react: {
            version: 'detect' // Tells eslint-plugin-react to automatically detect the version of React to use
        }
    },
    rules: {
        'import/no-extraneous-dependencies': 'off',
        'import/prefer-default-export': 'off',
        'react/jsx-filename-extension': ['warn', { extensions: ['.ts', '.tsx'] }],
        'import/extensions': ['error', 'ignorePackages', { js: 'never', jsx: 'never', ts: 'never', tsx: 'never', '': 'never' }],
        'import/order': [
            'error',
            {
                groups: ['builtin', 'external', 'internal', ['parent', 'sibling'], 'index', 'object', 'type'],
                pathGroups: [
                    {
                        pattern: 'react',
                        group: 'external',
                        position: 'before'
                    },
                    {
                        pattern: '*.+(css|scss)',
                        patternOptions: {
                            dot: true,
                            nocomment: true,
                            matchBase: true
                        },
                        group: 'object',
                        position: 'after'
                    }
                ],
                pathGroupsExcludedImportTypes: ['react'],
                'newlines-between': 'always',
                alphabetize: {
                    order: 'asc' /* sort in ascending order. Options: ['ignore', 'asc', 'desc'] */,
                    caseInsensitive: true /* ignore case. Options: [true, false] */
                },
                warnOnUnassignedImports: true
            }
        ]
    }
};
