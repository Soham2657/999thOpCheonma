/*
FILE PURPOSE:
Loader component used when API requests are loading.
Shows a simple spinning animation.
*/

const Loader = () => {
  return (
    <div className="flex justify-center items-center py-10">
      {/* Simple spinning loader */}
      <div className="w-10 h-10 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>
    </div>
  );
};

export default Loader;
