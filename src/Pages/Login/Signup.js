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
  Center,
} from '@mantine/core';
//import { useForm } from '@mantine/form';
import { useNavigate, useNavigationType } from 'react-router-dom';
import { showNotification, updateNotification } from '@mantine/notifications';
import { useState, useEffect } from 'react';
import { useForm } from '@mantine/form';

const Signup = () => {
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  const form = useForm({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      password: (value) =>
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(value)
          ? null
          : 'Password must contain 8 characters, 1 letter and 1 number',
      confirmPassword: (value, values) =>
        value !== values.password ? 'Passwords did not match' : null,
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
            highlight="Register!"
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
            Welcome, Please Register!
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
                label="Name"
                placeholder="Enter your name"
                {...form.getInputProps('name')}
              />
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
              <PasswordInput
                required
                mt="sm"
                label="Confirm password"
                placeholder="Confirm password"
                {...form.getInputProps('confirmPassword')}
              />

              <Button
                fullWidth
                Button
                variant="gradient"
                gradient={{ from: 'red', to: 'orange', deg: 35 }}
                type="submit"
                px="xl"
                my="xl"
              >
                Signup
              </Button>
            </form>
            <Text component="h1" size="sm">
              Already have an account?{' '}
              <Highlight
                className="cursor-pointer	"
                size="sm"
                align=""
                component="span"
                onClick={() => {
                  navigate('/login');
                }}
                highlight="Login"
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
                Login
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
export default Signup;
