import { showNotification, updateNotification } from '@mantine/notifications';
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { auth } from '../firebase.init';

const useFirebase = () => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const googleProvider = new GoogleAuthProvider();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  useEffect(() => {}, []);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user || {});
      setLoading(false);
    });
  }, []);

  const signUpWithEmailAndPassword = async (name, email, password) => {
    showNotification({
      id: 'load-data',
      loading: true,
      title: 'Signing up...',
      message: 'Please wait while we create a new account for you.',
      autoClose: false,
      disallowClose: true,
    });

    try {
      createUserWithEmailAndPassword(auth, email, password)
        .then(async (result) => {
          await updateUser(name);
        })
        .catch((error) => {
          if (error.message.includes('already-in-use')) {
            updateNotification({
              id: 'load-data',
              title: 'Email already in use',
              message:
                'Try logging in or reset password. Check your email again if you are a new user',
            });
          }
        });
      await sendEmailVerification(auth.currentUser);
    } catch (error) {
      showNotification({
        title: 'Cannot send verification mail',
        message: error.message,
      });
    }
  };

  const logInWithEmailAndPassword = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setUser(user);
        showNotification({
          color: 'green',
          title: 'Welcome Back to JontroPati!',
          message: 'Successfully logged in to JontroPati',
          autoClose: 4000,
        });
        // navigate(from, { replace: true });
      })
      .catch((error) => {
        const errorMessage = error.message;

        if (errorMessage.includes('wrong-password')) {
          showNotification({
            color: 'red',
            title: 'Wrong Password!',
            message:
              'Password you entered is not correct, please try again. You can reset if you forgot your password.',
          });
        } else {
          showNotification({
            color: 'red',
            title: 'Firebase Error',
            message: error.message,
          });
        }
      });
  };

  const signInUsingGoogle = () => {
    showNotification({
      id: 'load-data',
      loading: true,
      title: 'Signing with Google...',
      message: 'Please proceed to popup window to signin with Google',
      autoClose: false,
      disallowClose: true,
    });

    signInWithPopup(auth, googleProvider)
      .then((result) => {
        setUser(result.user);
        updateNotification({
          id: 'load-data',
          color: 'green',
          title: 'Welcome to JontroPati',
          message: 'Successfully signed in using Google account!',
          autoClose: 4000,
        });
        navigate(from, { replace: true });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const updateUser = (displayName) => {
    updateProfile(auth.currentUser, { displayName: displayName })
      .then(() => {
        updateNotification({
          id: 'load-data',
          color: 'green',
          title: 'Successfully registered!',
          message: 'Welcome, you are now member of JontroPati',
          autoClose: 4000,
        });

        setUser(auth.currentUser);
        navigate('/');
      })
      .catch((err) => console.log(err));
  };

  const resetPassword = (email) => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        showNotification({
          color: 'green',
          title: 'Password Reset Email Sent!',
          message:
            'A password reset link has been sent to your email, please reset your password to login.',
        });
      })
      .catch((error) => {
        showNotification({
          color: 'red',
          title: 'Firebase Error',
          message: error.message,
        });
      });
  };

  const handleSignOut = () => {
    signOut(auth).then(() => {
      navigate('/');
    });
  };

  return {
    signUpWithEmailAndPassword,
    logInWithEmailAndPassword,
    signInUsingGoogle,
    user,
    loading,
    updateUser,
    resetPassword,
    handleSignOut,
  };
};
export default useFirebase;
