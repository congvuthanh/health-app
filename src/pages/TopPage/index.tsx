import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

// Components

// Hooks
import { useAuth } from 'contexts/AuthContext';
import { useAppNavigate } from 'hooks/useAppNavigate';
import { useAuthMutation } from 'hooks/useAuthMutation';

// Constants
import { routePath } from 'routes/path';

// Schema
import { loginFormSchema, type LoginFormData } from './schema';

// Styled Components
import {
  ErrorMessage,
  FormGroup,
  LoginForm,
  LoginFormContainer,
  Logo,
  MainContent,
  PageContainer,
  PasswordInput,
  SubmitButton,
} from './index.styles';

function TopPage() {
  const navigate = useAppNavigate();
  const { isAuthenticated, isLoading } = useAuth();
  const { mutate: signUp, isPending } = useAuthMutation();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema),
    mode: 'onSubmit',
  });

  // Redirect to MyPage if already authenticated
  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      navigate(routePath.MyPage);
    }
  }, [isAuthenticated, isLoading, navigate]);

  // Handle form submission
  const onSubmit = async (data: LoginFormData) => {
    // Call the authentication API
    signUp(
      { data: { password: data.password } },
      {
        onSuccess: () => {
          // Redirect to MyPage on successful authentication
          navigate(routePath.MyPage);
        },
        onError: (error: unknown) => {
          // Handle API errors
          // Check if it's a 401 error - axios errors have response.status
          const isAxiosError = (
            err: unknown
          ): err is { response?: { status?: number } } => {
            return typeof err === 'object' && err !== null && 'response' in err;
          };

          const isUnauthorized =
            isAxiosError(error) && error.response?.status === 401;

          if (isUnauthorized) {
            setError('password', {
              type: 'manual',
              message: 'パスワードが正しくありません。',
            });
          } else {
            setError('password', {
              type: 'manual',
              message: 'エラーが発生しました。もう一度お試しください。',
            });
          }
        },
      }
    );
  };

  // Show loading state while checking authentication
  if (isLoading) {
    return null;
  }

  // Don't render login form if already authenticated
  if (isAuthenticated) {
    return null;
  }

  return (
    <PageContainer>
      <MainContent>
        <Logo src="/logo.svg" alt="Health App Logo" />
        <LoginFormContainer>
          <LoginForm onSubmit={handleSubmit(onSubmit)} noValidate>
            <FormGroup>
              <PasswordInput
                type="password"
                placeholder="パスワードを入力"
                aria-label="パスワード"
                aria-invalid={errors.password ? 'true' : 'false'}
                aria-describedby={
                  errors.password ? 'password-error' : undefined
                }
                autoComplete="current-password"
                {...register('password')}
              />
              {errors.password && (
                <ErrorMessage id="password-error" role="alert">
                  {errors.password.message}
                </ErrorMessage>
              )}
            </FormGroup>
            <SubmitButton type="submit" disabled={isSubmitting || isPending}>
              {isSubmitting || isPending ? 'ログイン中...' : 'ログイン'}
            </SubmitButton>
          </LoginForm>
        </LoginFormContainer>
      </MainContent>
    </PageContainer>
  );
}

export default TopPage;
