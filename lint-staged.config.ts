import type {Configuration} from 'lint-staged';

const config: Configuration = {
  '*.ts': ['xo --fix'],
  '*.json': ['prettier --write'],
  '*.md': ['markdownlint --fix', 'prettier --write'],
};

export default config;
