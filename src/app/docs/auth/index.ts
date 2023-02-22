import { login } from './login';
import register from './register';

interface PathConfig {
  [key: string]: {
    [key: string]: any;
  };
}

const authPaths: PathConfig = {
  '/login': {
    ...login,
  },
  '/register': {
    ...register,
  }
};

export default { authPaths };