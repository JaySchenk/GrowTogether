import { Box, Button, PasswordInput, Text, TextInput } from "@mantine/core";
import { useState } from "react";

const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [streetHouseNumb, setStreetHouseNumbl] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [telephone, setTelephone] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const payload = {
      email,
      password,
      address: { streetHouseNumb, postalCode, city, country },
      telephone,
    };

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
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
        margin: "0 auto",
        maxWidth: "400px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        height: "calc(100vh - 100px)",
      }}
    >
      <Text align="center" size="xl" weight="bold">
        Signup
      </Text>
      <Box
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          marginTop: "2rem",
        }}
        onSubmit={handleSubmit}
      >
        <TextInput
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
          label="Email"
          variant="filled"
          withAsterisk
        />
        <PasswordInput
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
          label="Password"
          variant="filled"
          withAsterisk
        />
        <TextInput
          value={streetHouseNumb}
          onChange={(event) => setStreetHouseNumbl(event.target.value)}
          label="Street name and housenumber"
          variant="filled"
        />
        <TextInput
          value={postalCode}
          onChange={(event) => setPostalCode(event.target.value)}
          label="Postal or Zip code"
          variant="filled"
        />
        <TextInput
          value={city}
          onChange={(event) => setCity(event.target.value)}
          label="City"
          variant="filled"
        />
        <TextInput
          value={country}
          onChange={(event) => setCountry(event.target.value)}
          label="Country"
          variant="filled"
        />
        <TextInput
          value={telephone}
          onChange={(event) => setTelephone(event.target.value)}
          label="Telephone"
          variant="filled"
        />
        <Button
          type="submit"
          variant="filled"
          color="cyan"
          sx={{ marginTop: "1rem", alignSelf: "center" }}
        >
          Register
        </Button>
      </Box>
    </Box>
  );
};

export default SignupPage;
