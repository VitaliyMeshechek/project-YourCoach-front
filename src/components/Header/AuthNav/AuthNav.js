import {
  AuthWrapper,
  AuthLinkLogin,
  AuthLinkRegister,
  Icon,
} from './AuthNav.styled';

export const AuthNav = () => {
  return (
    <AuthWrapper>
      <AuthLinkLogin to="/login">
        Увійти
        <Icon />
      </AuthLinkLogin>
      <AuthLinkRegister to="/register">Зареєструватися</AuthLinkRegister>
    </AuthWrapper>
  );
};
