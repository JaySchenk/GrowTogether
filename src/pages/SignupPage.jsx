import { Box, Button, PasswordInput, Text, TextInput } from '@mantine/core';
import { useContext, useState } from 'react';
import { SessionContext } from '../contexts/SessionContext';
import { useNavigate } from 'react-router-dom';

const SignupPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { isAuthenticated } = useContext(SessionContext);
  const navigate = useNavigate();

  isAuthenticated && navigate('/uprofile');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const payload = { email, password };

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/signup`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        }
      );
      if (response.status === 201) {
        const parsed = await response.json();
        console.log(parsed);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Box
      sx={{
        margin: '0 auto',
        maxWidth: '400px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        height: 'calc(100vh - 100px)',
      }}
    >
      <Text align='center' size='xl' weight='bold'>
        Signup
      </Text>
      <Box
        component='form'
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          marginTop: '2rem',
        }}
        onSubmit={handleSubmit}
      >
        <TextInput
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
          label='Email'
          variant='filled'
          withAsterisk
        />
        <PasswordInput
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
          label='Password'
          variant='filled'
          withAsterisk
        />
        <Button
          type='submit'
          variant='filled'
          color='cyan'
          sx={{ marginTop: '1rem', alignSelf: 'center' }}
        >
          Register
        </Button>
      </Box>
    </Box>
  );
};

export default SignupPage;
