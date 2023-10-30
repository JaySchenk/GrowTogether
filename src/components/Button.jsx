const Button = ({ children, name, onclick }) => {
  return (
    <button
      onClick={onclick}
      className='bg-emerald-600  hover:bg-emerald-800  text-white font-bold py-2 px-4 rounded-full ml-4'
    >
      <div className='flex justify-between items-center'>
        <div className='h-30 w-30'>{children}</div>
        <p className='px-2'>{name}</p>
      </div>
    </button>
  );
};

export default Button;
