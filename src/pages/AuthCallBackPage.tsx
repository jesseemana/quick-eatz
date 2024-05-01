import useRegisterUser from '@/hooks/useRegisterUser';
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';
import { useAuth0 } from '@auth0/auth0-react';

const AuthCallBackPage = () => {
  const navigate = useNavigate();

  const { user } = useAuth0();
  const { registerUser } = useRegisterUser();

  const hasCreatedUser = useRef(false); // ensuring the component (useEffect hook) renders only once

  useEffect(() => {
    if (user && user.sub && user.email && !hasCreatedUser.current) {
      registerUser({ auth0Id: user.sub, email: user.email, });
      hasCreatedUser.current = true;
    }
    navigate('/');
  }, [registerUser, user, navigate]);

  return <p>Loading...</p>
}

export default AuthCallBackPage;
