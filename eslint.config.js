import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import { globalIgnores } from 'eslint/config';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommendedTypeChecked, // để bật các quy tắc được khuyến nghị cho TypeScript
      tseslint.configs.strictTypeChecked, // để bật các quy tắc nghiêm ngặt cho TypeScript, không đổi thứ tự
      reactHooks.configs['recommended-latest'], // để bật các quy tắc được khuyến nghị cho React Hooks
      reactRefresh.configs.vite, // để bật các quy tắc cho React Refresh
    ],
    languageOptions: {
      ecmaVersion: 2020, // là phiên bản ECMAScript mà dự án đang sử dụng
      globals: globals.browser, // để xác định các biến toàn cục cho môi trường trình duyệt
      parserOptions: {
        project: ['./tsconfig.app.json'], // để bật type-aware linting, type-aware linting là quá trình ESLint sử dụng thông tin kiểu từ TypeScript để cải thiện khả năng phát hiện lỗi
        tsconfigRootDir: import.meta.dirname, // để xác định thư mục gốc của tsconfig
      },
    },
    rules: {
      'react-refresh/only-export-components': 'off', // để tắt quy tắc chỉ xuất các thành phần
      'no-unused-vars': ['error', { args: 'all', argsIgnorePattern: '^_' }], // để tắt quy tắc không sử dụng biến cho các tham số bắt đầu bằng dấu gạch dưới
      'no-implicit-coercion': 'error', // để tắt quy tắc ép kiểu ngầm
      eqeqeq: ['error', 'always'], // để yêu cầu sử dụng toán tử so sánh nghiêm ngặt
    },
  },
]);
