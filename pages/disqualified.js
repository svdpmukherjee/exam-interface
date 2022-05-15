import { useRouter } from 'next/router';
import { useEffect } from 'react';

function disqualified() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('https://app.prolific.co/');
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="container m-auto my-60 py-10 font-serif bg-red-100">
      <div className="text-3xl text-center">
        The Correct Answer is: <span className="text-red-500">13 Km</span>{' '}
        <br /> <br />
        You are not qualified to take part in the study
        <br /> <br />
        Thank you for your participation.
      </div>
    </div>
  );
}

export default disqualified;
