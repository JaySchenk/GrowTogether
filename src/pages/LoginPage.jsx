import { Box, Button, PasswordInput, Text, TextInput } from '@mantine/core'

const LoginPage = () => {
  // Add some states to control your inputs

  const handleSubmit = event => {
    event.preventDefault()
    // Send your login information to your backend
  }

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
        Login
      </Text>
      <Box
        component='form'
        sx={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '2rem' }}
        onSubmit={handleSubmit}
      >
        <TextInput label='Username' variant='filled' withAsterisk />
        <PasswordInput label='Password' variant='filled' withAsterisk />
        <Button
          type='submit'
          variant='filled'
          color='cyan'
          sx={{ marginTop: '1rem', alignSelf: 'center' }}
        >
          Connect
        </Button>
      </Box>
    </Box>
  )
}

export default LoginPage
