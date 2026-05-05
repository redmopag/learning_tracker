import antfu from '@antfu/eslint-config'

export default antfu(
  {
    ignores: ['.pnpm-store'],
    isInEditor: true,

    formatters: {
      html: true,
      css: true,
      markdown: true,
    },

    stylistic: {
      indent: 2,
      semi: false,
      quotes: 'single',
    },

    markdown: true,

    javascript: {
      overrides: {
        'unused-imports/no-unused-vars': ['error', {
          args: 'after-used',
          argsIgnorePattern: '^_',
          ignoreRestSiblings: false,
          vars: 'all',
          varsIgnorePattern: '^_',
        }],
      },
    },

    typescript: {
      overrides: {
        'ts/no-non-null-assertion': 'error',
      },
    },
    
    react: true,
  },
)
