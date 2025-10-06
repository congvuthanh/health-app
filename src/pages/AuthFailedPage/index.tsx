import { routePath } from 'routes/path';
import {
  Container,
  Content,
  Description,
  LoginLink,
  Title,
} from './index.styles';

function AuthFailedPage() {
  return (
    <Container>
      <Content>
        <Title>ログインが必要です</Title>
        <Description>
          ログインページは
          <LoginLink to={routePath.TopPage}>こちら</LoginLink>
        </Description>
      </Content>
    </Container>
  );
}

export default AuthFailedPage;
