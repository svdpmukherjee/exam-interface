function Header(props) {
  return (
    <>
      {props.showScore ? (
        <div className="p-10 text-3xl text-center text-sky-700 shadow-md rounded-lg">
          Thank you for taking the test! You have done a good job...
        </div>
      ) : (
        <div className="p-10 text-3xl text-center text-sky-700 shadow-md rounded-lg">
          If you solve 80% of questions correctly, a bonus is waiting for you!
        </div>
      )}
    </>
  );
}

export default Header;
