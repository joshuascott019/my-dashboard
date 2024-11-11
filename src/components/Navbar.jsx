import Clock from './Clock';

const Navbar = () => {
  return (
    <div className="bg-slate-800 text-white p-4 flex justify-between items-center shadow-lg">
      <h1 className="text-3xl font-bold">My Dashboard</h1>
      <Clock />
    </div>
  );
};

export default Navbar;
