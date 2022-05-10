function Header(props) {
  return (
    <>
      {props.showScore ? (
        <div className="p-10 text-3xl text-center text-sky-700 shadow-md rounded-lg">
          Thank you for taking the test! You have done a good job...
        </div>
      ) : (
        <div className="grid grid-cols-9 text-xl text-white shadow-md  bg-violet-700 font-serif">
          <div className="col-span-3 text-right my-auto ">
            <p>Current Test Statistics (% of test takers' scores) </p>
          </div>
          <div className="col-span-6 flex justify-center p-2 ">
            {/* <span className="text-black underline">bonus</span> is waiting for */}
            <img
              src="images/test_stats.png"
              className="w-5/6 shadow-lg rounded-lg"
            />
          </div>
        </div>
      )}
    </>
  );
}

export default Header;
