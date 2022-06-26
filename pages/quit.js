import React from 'react';
import { useEffect } from 'react';

function quit() {
  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.href = 'https://app.prolific.co/';
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="container m-auto my-60 py-10  bg-red-100">
      <div className="text-3xl text-center">
        You have quit the test. Redirecting to your Prolific account...
      </div>
    </div>
  );
}

export default quit;
