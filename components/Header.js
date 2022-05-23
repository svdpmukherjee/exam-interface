function Header(props) {
  return (
    <>
      {props.showScore ? (
        <div className="p-10 text-3xl text-center font-serif text-sky-700 shadow-md rounded-lg">
          Thank you for taking the test!
        </div>
      ) : (
        <div className="grid grid-cols-8 font-serif px-10 py-7 text-2xl  font-semibold row-span-1 bg-gray-100 m-auto ">
          <div className="col-span-6 ">
            <p>Test Your Aptitude Skill</p>
          </div>
          <div className="col-span-2 flex justify-end p-2"></div>
          <div className="col-span-5 flex ">
            {/* <span className="text-black underline">bonus</span> is waiting for */}
            <img src="images/test_stats.png" className="w-2/3 rounded-sm" />
          </div>
        </div>
      )}
    </>
  );
}

export default Header;
