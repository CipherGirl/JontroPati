import { Navigate, useLocation } from 'react-router-dom';

import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import useFirebase from '../../hooks/useFireBase';
import { Center, Loader } from '@mantine/core';

const RequireAuth = ({ children }) => {
  const location = useLocation();
  const { user, loading } = useFirebase();

  if (loading) {
    return (
      <Loader className="m-auto" color="orange" size="xl" variant="dots" />
    );
  }
  if (user.email) return children;
  if (!loading) {
    return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
  }
};

export default RequireAuth;
