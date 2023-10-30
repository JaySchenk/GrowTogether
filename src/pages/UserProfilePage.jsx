import { useContext, useState } from "react";
import NavbarMobile from "../components/NavbarMobile";
import { SessionContext } from "../contexts/SessionContext";
import Avatar from "/avatar.png";

const API_URL = import.meta.env.VITE_API_URL;


const UserProfilePage = () => {
  const { userId } = useContext(SessionContext);

  const [user, setUser] = useState({
    name: "",
    surname: "",
    address: {
      streetHouseNumb: "",
      city: "",
      country: "",
    },
    telephone: "",
  });

  const handleUpdateUser = () => {

  fetch(`${API_URL}/api/userUpdate/${userId}`, {
    method: 'PUT', 
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      if (response.ok) {
        return response.json(); 
      } else {
        throw new Error(`Failed to update user data: ${response.status}`);
      }
    })
    .then((data) => {
      console.log('User data updated successfully:', data);
    })
    .catch((error) => {
      console.error('Error updating user data:', error);
    });
  }

  return (
    <div className="flex items-center flex-col justify-center">
      <div className="flex flex-col justify-center gap-4 mt-10">
        <img className="h-12 w-12 rounded mt-10" src={Avatar} alt="Default avatar" />

        <p className="-mb-1">Profile Picture</p>
        <input
          className="block w-full text-sm border rounded-lg cursor-pointer text-gray-400 focus:outline-none"
          id="file_input"
          type="file"
        />
      <p className="-mb-1">Name</p>
      <input
        type="text"
        value={user.name}
        onChange={(event) => setUser({ ...user, name: event.target.value })}
        placeholder="Name"
        className="p-2  w-full border rounded-lg"
      />
      <p className="-mb-1">Surname</p>
      <input
        type="text"
        value={user.surname}
        onChange={(event) => setUser({ ...user, surname: event.target.value })}
        placeholder="Surname"
        className="p-2  w-full border rounded-lg"
      />
      <p className="-mb-1">Street, House number</p>
      <input
        type="text"
        value={user.address.streetHouseNumb}
        onChange={(event) => setUser({ ...user, address: { ...user.address, streetHouseNumb: event.target.value } })}
        placeholder="Name"
        className="p-2  w-full border rounded-lg"
      />
      <p className="-mb-1">City</p>
      <input
        type="text"
        value={user.address.city}
        onChange={(event) => setUser({ ...user, address: { ...user.address, city: event.target.value } })}
        placeholder="Name"
        className="p-2  w-full border rounded-lg"
      />
      <p className="-mb-1">Country</p>
      <input
        type="text"
        value={user.address.country}
        onChange={(event) => setUser({ ...user, address: { ...user.address, country: event.target.value } })}
        placeholder="Name"
        className="p-2  w-full border rounded-lg"
      />
      <p className="-mb-1">Phone number</p>
      <input
        type="text"
        value={user.telephone}
        onChange={(event) => setUser({ ...user, telephone: event.target.value })}
        placeholder="Name"
        className="p-2  w-full border rounded-lg"
      />
      </div>
      <button className = "bg-emerald-600 text-white p-3 rounded-full self-center mt-4" onClick={handleUpdateUser}>Submit</button> 
      <NavbarMobile />
    </div>
  );
};

export default UserProfilePage;
