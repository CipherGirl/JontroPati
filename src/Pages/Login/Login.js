import {
  TextInput,
  Checkbox,
  Button,
  Group,
  Box,
  Divider,
  PasswordInput,
  Text,
  Highlight,
  LoadingOverlay,
  Transition,
} from '@mantine/core';
//import { useForm } from '@mantine/form';
import { useNavigate, useNavigationType } from 'react-router-dom';
import { showNotification, updateNotification } from '@mantine/notifications';
import { useEffect, useState } from 'react';
import { useForm } from '@mantine/form';

const Login = () => {
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      password: (value) =>
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(value)
          ? null
          : 'Password must contain 8 characters, 1 letter and 1 number',
    },
  });
  const navigate = useNavigate();

  // Note that position: relative is required
  return (
    <Transition
      mounted={mounted}
      transition="fade"
      duration={400}
      timingFunction="ease"
    >
      {(styles) => (
        <div className="m-auto" style={styles}>
          <Highlight
            style={{
              fontSize: '1.5rem',
              textAlign: 'center',
              margin: '20px 0px',
            }}
            highlight="Login!"
            highlightStyles={(theme) => ({
              backgroundImage: theme.fn.linearGradient(
                45,
                theme.colors.yellow[5],
                theme.colors.orange[8]
              ),
              fontWeight: 700,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            })}
          >
            Welcome, Please Login!
          </Highlight>
          <div className="w-full md:w-96 mx-auto relative">
            <LoadingOverlay visible={visible} />
            <form
              className="min-w-64 flex flex-col gap-3"
              onSubmit={form.onSubmit((values) => {
                setVisible((v) => !v);
                console.log(values);
              })}
            >
              <TextInput
                required
                label="Email"
                placeholder="Enter your email"
                {...form.getInputProps('email')}
              />

              <PasswordInput
                required
                label="Password"
                placeholder="Password"
                {...form.getInputProps('password')}
              />
              <Text component="h1" size="sm">
                Forgot password?{' '}
                <Highlight
                  className="cursor-pointer"
                  size="sm"
                  align=""
                  component="span"
                  onClick={() => {
                    console.log('Reset');
                  }}
                  highlight="Click here to reset password"
                  highlightStyles={(theme) => ({
                    backgroundImage: theme.fn.linearGradient(
                      45,
                      theme.colors.yellow[5],
                      theme.colors.orange[8]
                    ),
                    fontWeight: 700,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  })}
                >
                  Click here to reset password
                </Highlight>
              </Text>

              <Button
                fullWidth
                Button
                variant="gradient"
                gradient={{ from: 'red', to: 'orange', deg: 35 }}
                type="submit"
                px="xl"
                my="xl"
              >
                Login
              </Button>
            </form>

            <Text component="h1" size="sm">
              New to{'  '}
              <Highlight
                component="span"
                highlight="Pati"
                weight={900}
                highlightStyles={(theme) => ({
                  backgroundImage: theme.fn.linearGradient(45, '#f4900c'),
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                })}
              >
                JontroPati
              </Highlight>
              {'? '}
              <Highlight
                className="cursor-pointer	"
                size="sm"
                align=""
                component="span"
                onClick={() => {
                  navigate('/signup');
                }}
                highlight="Create New Account"
                highlightStyles={(theme) => ({
                  backgroundImage: theme.fn.linearGradient(
                    45,
                    theme.colors.yellow[5],
                    theme.colors.orange[8]
                  ),
                  fontWeight: 700,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                })}
              >
                Create New Account
              </Highlight>
            </Text>
            <Divider size={2} my="xl" />
            <Button
              mb="xl"
              fullWidth
              variant="outline"
              color="orange"
              onClick={() => {
                setVisible((v) => !v);
                console.log('Signup using Google CLicked');
              }}
            >
              <img src="/google.svg" className="w-8 mr-10" />
              <h3 className="ml-2 mr-10">Signing With Google</h3>
            </Button>
          </div>
        </div>
      )}
    </Transition>
  );
};
export default Login;
