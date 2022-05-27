import {
  Badge,
  Button,
  Loader,
  MediaQuery,
  ScrollArea,
  Table,
} from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import React from 'react';
import { useQuery } from 'react-query';
const { REACT_APP_BASE_URL: BASE_URL } = process.env;

const Users = () => {
  const {
    data: users,
    isLoading,
    refetch,
    status,
    isIdle,
  } = useQuery(['users'], () =>
    fetch(`${BASE_URL}/user/`, {
      method: 'GET',
      headers: {
        authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    }).then((res) => res.json())
  );

  const makeAdmin = (email) => {
    fetch(`${BASE_URL}/user/admin/${email}`, {
      method: 'PUT',
      headers: {
        authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify({ role: 'admin' }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));

    refetch();
    showNotification({
      color: 'green',
      title: 'Admin Added',
      message: 'User has been added as admin.',
    });
  };

  const removeAdmin = (email) => {
    fetch(`${BASE_URL}/user/admin/${email}`, {
      method: 'PUT',
      headers: {
        authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify({ role: '' }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));

    refetch();
    showNotification({
      color: 'cyan',
      title: 'Admin Removed',
      message: 'User has been removed from admin.',
    });
  };

  if (isLoading) {
    return <Loader className="" color="orange" size="xl" variant="dots" />;
  }

  return (
    <div>
      <h1>All Users</h1>
      <MediaQuery
        query="(max-width: 767px) and (min-width: 300px)"
        styles={{ width: 350 }}
      >
        <ScrollArea>
          <Table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Information</th>
                <th>Make Admin</th>
                <th>Remove Admin</th>
              </tr>
            </thead>
            <tbody>
              {users?.map((user) => (
                <tr key={user._id}>
                  <td className="font-semibold text-orange-500">{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.information}</td>

                  {!user.role ? (
                    <>
                      <td>
                        <Button
                          variant="outline"
                          color="orange"
                          size="xs"
                          onClick={() => makeAdmin(user.email)}
                        >
                          Make Admin
                        </Button>
                      </td>
                      <td>
                        <Button
                          variant="outline"
                          color="red"
                          size="xs"
                          disabled
                        >
                          Remove Admin
                        </Button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td>
                        <Badge color="orange" size="lg">
                          ADMIN
                        </Badge>
                      </td>
                      <td>
                        <Button
                          variant="outline"
                          color="red"
                          size="xs"
                          onClick={() => removeAdmin(user.email)}
                        >
                          Remove Admin
                        </Button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </Table>
        </ScrollArea>
      </MediaQuery>
      <h5 className="mt-2 md:hidden text-slate-500">
        Scroll horizontally to see more
      </h5>
    </div>
  );
};

export default Users;
