import React from 'react';
import NewUserPlant from "../components/NewUserPlant";

const CreatePlant = () => {
  return (
    <div className="flex items-center justify-center h-[calc(100vh-100px)]">
      <NewUserPlant type="newPlant"/>
    </div>
  );
};

export default CreatePlant;

