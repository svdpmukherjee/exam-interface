function Header(props) {
  return (
    <>
      {props.showScore ? (
        <div className="p-10 text-3xl text-center text-sky-700 shadow-md rounded-lg">
          Thank you for taking the test! You have done a good job...
        </div>
      ) : (
        <div className="grid grid-cols-9 text-3xl text-sky-700 shadow-md rounded-lg">
          <div className="col-span-6 text-right my-auto">
            <p>If you solve 10 questions correctly, you'll get a</p>
          </div>
          <div className="">
            {/* <span className="text-black underline">bonus</span> is waiting for */}
            <img src="images/bonus.jpg" className="mx-auto" />
          </div>
        </div>
      )}
    </>
  );
}

export default Header;
