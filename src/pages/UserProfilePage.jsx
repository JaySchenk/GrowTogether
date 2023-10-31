import { useContext, useEffect, useState } from "react";
import NavbarMobile from "../components/NavbarMobile";
import { SessionContext } from "../contexts/SessionContext";
import Avatar from "/avatar.png";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

const UserProfilePage = () => {
  const navigate = useNavigate();
  const { userId } = useContext(SessionContext);

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

  return (
    <div className='flex items-center flex-col justify-center'>
      <div className='flex flex-col justify-center gap-4 mt-10 w-1/4'>
        {user.profilePicture ? (
          <div className="flex flex-col items-center">
            <img
              alt='not found'
              width={"150px"}
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
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <img
              className='h-20 w-20 rounded mt-10 mb-4'
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
          </div>
        )}


        <p className='-mb-1'>Name</p>
        <input
          type='text'
          value={user.name}
          onChange={(event) => setUser({ ...user, name: event.target.value })}
          placeholder={user.name ? user.name : "Name"}
          className='p-2  w-full border rounded-lg'
        />
        <p className='-mb-1'>Surname</p>
        <input
          type='text'
          value={user.surname}
          onChange={(event) =>
            setUser({ ...user, surname: event.target.value })
          }
          placeholder={user.surname ? user.surname : "Surname"}
          className='p-2  w-full border rounded-lg'
        />
        <p className='-mb-1'>Street, House number</p>
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
        <p className='-mb-1'>City</p>
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
        <p className='-mb-1'>Country</p>
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
        <p className='-mb-1'>Phone number</p>
        <input
          type='text'
          value={user.telephone}
          onChange={(event) =>
            setUser({ ...user, telephone: event.target.value })
          }
          placeholder={user.telephone ? user.telephone : "Phone Number"}
          className='p-2 w-full border rounded-lg'
        />
      </div>
      <button
        className='bg-emerald-600 text-white p-3 rounded-full self-center mt-4'
        onClick={handleUpdateUser}
      >
        Submit
      </button>
      <NavbarMobile />
    </div>
  );
};

export default UserProfilePage;
