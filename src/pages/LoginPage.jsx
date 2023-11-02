import { useContext, useState } from "react";
import { SessionContext } from "../contexts/SessionContext";
import { Link, useNavigate } from "react-router-dom";
import NavbarMobile from "../components/NavbarMobile";

const LoginPage = () => {
  const { isAuthenticated, handleLogin } = useContext(SessionContext);
  const navigate = useNavigate();

  isAuthenticated && navigate("/uplant");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const payload = { email, password };

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );
      if (response.status === 400) {
        const parsed = await response.json();
        throw new Error(parsed.message);
      }
      if (response.status === 200) {
        const parsed = await response.json();
        handleLogin(parsed.token);
        navigate("/uplant");
      }
    } catch (error) {
      console.log(error);
      setErrorMessage(error.message);
    }
  };

  return (
    <div className='m-auto max-w-md flex flex-col justify-center h-[calc(100vh-100px)]'>
      <h1 className='text-xl font-bold text-center'>Login</h1>
      <form className='flex flex-col gap-4 mt-8' onSubmit={handleSubmit}>
        <input
          type='email'
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
          placeholder='Email'
          className='p-2 border rounded-lg'
        />
        <input
          type='password'
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
          placeholder='Password'
          className='p-2 border rounded-lg'
        />
        <button
          type='submit'
          className='bg-emerald-600 text-white p-3 rounded-full self-center mt-4'
        >
          Connect
        </button>
        <p className="text-gray-400 text-center">Don’t have an account? 
        <Link to="/signup">
        <span className="text-emerald-600 underline font-medium text-center"> Sign up</span>
        </Link>
        </p>
        {errorMessage && <p className='text-red-500'>{errorMessage}</p>}
      </form>
      <NavbarMobile />
    </div>
  );
};

export default LoginPage;
