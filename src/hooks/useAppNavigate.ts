import {
  type NavigateFunction,
  type NavigateOptions,
  type Path,
  useNavigate,
} from 'react-router';
import { type AppPath } from 'routes/path';

type To = AppPath | Partial<Path & { pathname: AppPath }>;

interface AppNavigateFunction extends NavigateFunction {
  (to: To, options?: NavigateOptions): void;
}

export const useAppNavigate = (): AppNavigateFunction => useNavigate();
