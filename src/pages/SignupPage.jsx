import { Box, Button, PasswordInput, Text, TextInput } from '@mantine/core';
import { useState } from 'react';

const SignupPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const payload = { username, password };

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
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          required
          label='Username'
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
