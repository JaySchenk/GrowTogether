import { useContext, useEffect, useState } from "react";
import NavbarMobile from "../components/NavbarMobile";
import { SessionContext } from "../contexts/SessionContext";
import Avatar from "/avatar.png";
import { useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";

const API_URL = import.meta.env.VITE_API_URL;

const UserProfilePage = () => {
  const navigate = useNavigate();
  const { userId, setIsAuthenticated } = useContext(SessionContext);

  const [user, setUser] = useState({
    name: "",
    surname: "",
    profilePicture: "",
    address: {
      streetHouseNumb: "",
      city: "",
      country: "",
    },
    telephone: "",
  });

  const handleGoBack = () => {
    navigate("/uplant");
  };

  const fetchUsers = () => {
    fetch(`${API_URL}/api/getUser/${userId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setUser(data.user);
      })

      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleUpdateUser = () => {
    const form_data = new FormData();

    form_data.append("Data", JSON.stringify(user));
    form_data.append("profilePicture", user.profilePicture);

    fetch(`${API_URL}/api/userUpdate/${userId}`, {
      method: "PUT",
      body: form_data,
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(`Failed to update user data: ${response.status}`);
        }
      })
      .then((data) => {
        console.log("User data updated successfully:", data);
        handleGoBack();
      })
      .catch((error) => {
        console.error("Error updating user data:", error);
      });
  };

  function handleLogOutClick() {
    localStorage.removeItem("authToken");
    console.log("pressed");
    setIsAuthenticated(false);
    navigate("/login");
  }
  return (
    <div className='flex items-center flex-col justify-center'>
      <BackButton/> 
      <div className='flex flex-col justify-center gap-4 mt-10 m-2 mb-20'>
        {user.profilePicture ? (
          <>
            <img
              alt='not found'
              className='rounded-full self-center max-w-xs'
              style={{ width: "50%", maxWidth: "300px" }}
              src={
                user.profilePicture.path ||
                URL.createObjectURL(user.profilePicture)
              }
            />
            <button
              type='button'
              className='text-red-500 text-xs'
              onClick={() => setUser({ ...user, profilePicture: "" })}
            >
              Remove
            </button>
          </>
        ) : (
          <>
            <img
              className='h-20 w-20 rounded mt-10 self-center'
              src={Avatar}
              alt='Default avatar'
            />
            <input
              className='block w-full text-sm border rounded-lg cursor-pointer text-gray-400 focus:outline-none'
              id='image'
              name='image'
              type='file'
              value=''
              onChange={(event) => {
                setUser({ ...user, profilePicture: event.target.files[0] });
              }}
            />
          </>
        )}

        <p className='-mb-1 font-medium'>Name</p>
        <input
          type='text'
          value={user.name}
          onChange={(event) => setUser({ ...user, name: event.target.value })}
          placeholder={user.name ? user.name : "Name"}
          className='p-2  w-full border rounded-lg'
        />
        <p className='-mb-1 font-medium'>Surname</p>
        <input
          type='text'
          value={user.surname}
          onChange={(event) =>
            setUser({ ...user, surname: event.target.value })
          }
          placeholder={user.surname ? user.surname : "Surname"}
          className='p-2  w-full border rounded-lg'
        />
        <p className='-mb-1 font-medium'>Street, House number</p>
        <input
          type='text'
          value={user.address.streetHouseNumb}
          onChange={(event) =>
            setUser({
              ...user,
              address: { ...user.address, streetHouseNumb: event.target.value },
            })
          }
          placeholder={
            user.address.streetHouseNumb
              ? user.address.streetHouseNumb
              : "Street, House number"
          }
          className='p-2  w-full border rounded-lg'
        />
        <p className='-mb-1 font-medium'>City</p>
        <input
          type='text'
          value={user.address.city}
          onChange={(event) =>
            setUser({
              ...user,
              address: { ...user.address, city: event.target.value },
            })
          }
          placeholder={user.address.city ? user.address.city : "City"}
          className='p-2  w-full border rounded-lg'
        />
        <p className='-mb-1 font-medium'>Country</p>
        <input
          type='text'
          value={user.address.country}
          onChange={(event) =>
            setUser({
              ...user,
              address: { ...user.address, country: event.target.value },
            })
          }
          placeholder={user.address.country ? user.address.country : "Country"}
          className='p-2  w-full border rounded-lg'
        />
        <p className='-mb-1 font-medium'>Phone number</p>
        <input
          type='text'
          value={user.telephone}
          onChange={(event) =>
            setUser({ ...user, telephone: event.target.value })
          }
          placeholder={user.telephone ? user.telephone : "Phone Number"}
          className='p-2 w-full border rounded-lg'
        />
        <button className='bg-emerald-600 text-white p-2 rounded-full self-center mt-4 w-2/5' onClick={handleUpdateUser} name={"Submit"}>Submit</button>
        <button  className=' text-white bg-red-400 p-2 rounded-full self-center mt-4 w-2/5' name={"Log Out"} onClick={handleLogOutClick}>Log Out</button>
      </div>

      <NavbarMobile />
    </div>
  );
};

export default UserProfilePage;
