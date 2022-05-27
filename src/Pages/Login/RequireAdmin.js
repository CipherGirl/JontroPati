import { Navigate, useLocation } from 'react-router-dom';

import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import useFirebase from '../../hooks/useFireBase';
import { Center, Loader } from '@mantine/core';
import useAdmin from '../../hooks/useAdmin';

const RequireAdmin = ({ children }) => {
  const location = useLocation();
  const { user, loading, handleSignOut } = useFirebase();
  const [admin, adminLoading] = useAdmin(user);

  if (loading || adminLoading) {
    return (
      <Loader className="m-auto" color="orange" size="xl" variant="dots" />
    );
  }
  if (!user || !admin) {
    handleSignOut();
    return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
  }
  return children;
};

export default RequireAdmin;
