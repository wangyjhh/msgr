import antfu from '@antfu/eslint-config'

export default antfu(
    {
        stylistic: {
            indent: 4,
        },
        rules: {
            'antfu/top-level-function': 'off',
            // 'no-console': 'error',
        },
        ignores: ['test/**/*'],
    },
)
