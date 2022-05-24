import { useEffect, useState } from 'react';
const { REACT_APP_BASE_URL: BASE_URL } = process.env;

const useToken = (user) => {
  const [token, setToken] = useState('');

  useEffect(() => {
    const userInfo = { name: user.displayName, email: user.email, role: '' };
    console.log(userInfo);
    if (user.email) {
      fetch(`${BASE_URL}/user/${user.email}`, {
        method: 'PUT',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(userInfo),
      })
        .then((res) => res.json())
        .then((data) => {
          const accessToken = data.token;
          localStorage.setItem('accessToken', accessToken);
          setToken(accessToken);
        });
    }
  }, [user]);
  return [token];
};

export default useToken;
