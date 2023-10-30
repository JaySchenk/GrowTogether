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
      navigate("/uplant");
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
          <option value="Albania">Albania</option>
          <option value="Andorra">Andorra</option>
          <option value="Austria">Austria</option>
          <option value="Belarus">Belarus</option>
          <option value="Belgium">Belgium</option>
          <option value="Bosnia and Herzegovina">Bosnia and Herzegovina</option>
          <option value="Bulgaria">Bulgaria</option>
          <option value="Croatia">Croatia</option>
          <option value="Cyprus">Cyprus</option>
          <option value="Czech Republic">Czech Republic</option>
          <option value="Denmark">Denmark</option>
          <option value="Estonia">Estonia</option>
          <option value="Finland">Finland</option>
          <option value="France">France</option>
          <option value="Germany">Germany</option>
          <option value="Greece">Greece</option>
          <option value="Hungary">Hungary</option>
          <option value="Iceland">Iceland</option>
          <option value="Ireland">Ireland</option>
          <option value="Italy">Italy</option>
          <option value="Kazakhstan">Kazakhstan</option>
          <option value="Kosovo">Kosovo</option>
          <option value="Latvia">Latvia</option>
          <option value="Liechtenstein">Liechtenstein</option>
          <option value="Lithuania">Lithuania</option>
          <option value="Luxembourg">Luxembourg</option>
          <option value="Malta">Malta</option>
          <option value="Moldova">Moldova</option>
          <option value="Monaco">Monaco</option>
          <option value="Montenegro">Montenegro</option>
          <option value="Netherlands">Netherlands</option>
          <option value="North Macedonia">North Macedonia</option>
          <option value="Norway">Norway</option>
          <option value="Poland">Poland</option>
          <option value="Portugal">Portugal</option>
          <option value="Romania">Romania</option>
          <option value="Russia">Russia</option>
          <option value="San Marino">San Marino</option>
          <option value="Serbia">Serbia</option>
          <option value="Slovakia">Slovakia</option>
          <option value="Slovenia">Slovenia</option>
          <option value="Spain">Spain</option>
          <option value="Sweden">Sweden</option>
          <option value="Switzerland">Switzerland</option>
          <option value="Ukraine">Ukraine</option>
          <option value="United Kingdom">United Kingdom</option>
          <option value="Vatican City">Vatican City</option>
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
