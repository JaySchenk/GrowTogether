import { useContext, useState, useEffect } from "react";
import { SessionContext } from "../contexts/SessionContext";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [streetHouseNumb, setStreetHouseNumbl] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [telephone, setTelephone] = useState("");
  const { isAuthenticated, handleLogin } = useContext(SessionContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/uprofile");
    }
  }, [isAuthenticated, navigate]);

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
        handleLogin(parsed.token);
        isAuthenticated && navigate("/uprofile");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="m-auto max-w-md flex flex-col justify-center h-[calc(100vh-100px)]">
      <h1 className="text-xl font-bold text-center">Signup</h1>
      <form className="flex flex-col gap-4 mt-8" onSubmit={handleSubmit}>
        <input
          type="text"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
          placeholder="Email"
          className="p-2 border rounded-lg"
        />
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
          placeholder="Password"
          className="p-2 border rounded-lg"
        />
        <input
          type="text"
          value={streetHouseNumb}
          onChange={(event) => setStreetHouseNumbl(event.target.value)}
          placeholder="Street name and housenumber"
          className="p-2 border rounded-lg"
        />
        <input
          type="text"
          value={postalCode}
          onChange={(event) => setPostalCode(event.target.value)}
          placeholder="Postal or Zip code"
          className="p-2 border rounded-lg"
        />
        <input
          type="text"
          value={city}
          onChange={(event) => setCity(event.target.value)}
          placeholder="City"
          className="p-2 border rounded-lg"
        />
        <select
          autoComplete="country-name"
          value={country}
          onChange={(event) => setCountry(event.target.value)}
          placeholder="Country"
          className="p-2 border rounded-lg w-full"
        >
          <option value="United States">United States</option>
          <option value="Canada">Canada</option>
          <option value="Mexico">Mexico</option>
        </select>
        <input
          type="text"
          value={telephone}
          onChange={(event) => setTelephone(event.target.value)}
          placeholder="Telephone"
          className="p-2 border rounded-lg"
        />
        <button
          type="submit"
          className="bg-emerald-600 text-white p-3 rounded-full self-center mt-4"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default SignupPage;
