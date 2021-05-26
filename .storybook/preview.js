import '../src/scss/main.scss';
import '../src/scss/custom.scss';
import '../src/scss/storybook.scss';

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}