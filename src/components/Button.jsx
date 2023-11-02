const Button = ({ children, name, onClick }) => {
  return (
    <button
      onClick={onClick}
      className='bg-emerald-600 hover:bg-emerald-800 text-white text-sm py-2 px-3 rounded-full m-2'
    >
      <div className='flex justify-center items-center'>
        {children && <div className='h-30 w-30'>{children}</div>}
        <p className='px-2'>{name}</p>
      </div>
    </button>
  );
};

export default Button;
