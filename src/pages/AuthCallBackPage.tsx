import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';
import { useAuth0 } from '@auth0/auth0-react';
import useRegisterUser from '@/hooks/useRegisterUser';

const AuthCallBackPage = () => {
  const { user } = useAuth0();
  const { registerUser } = useRegisterUser();

  const navigate = useNavigate();

  const hasCreatedUser = useRef(false); // ensuring the component (useEffect) renders only once

  useEffect(() => {
    if (user && user.sub && user.email && !hasCreatedUser.current) {
      registerUser({ auth0Id: user.sub, email: user.email });
      hasCreatedUser.current = true;
    }
    navigate('/onboarding');
  }, [registerUser, user, navigate]);

  return <p>loading...</p>
}

export default AuthCallBackPage;
