import Head from 'next/head';
import { useEffect, useState, createContext } from 'react';
import { useRouter } from 'next/router';

// export const ApplicationContext = createContext();
export default function Home() {
  const [checked, setChecked] = useState(false);
  const [id, setID] = useState('');

  const router = useRouter();

  // JSX
  return (
    <div className="">
      <div className="grid grid-rows-7 h-screen ">
        <Head>
          <title>Online test</title>
        </Head>

        <div className="font-serif px-10 py-7 text-2xl text-center font-semibold row-span-1 bg-gray-100">
          Welcome to the Online Test
        </div>

        <div className="container mx-auto h-full row-span-5 flex justify-center">
          <div className="my-auto">
            <p className="font-serif pb-10 text-lg">
              &#10148; This is the first part of the study <br /> <br />
              &#10148; Below are the instructions to read before starting with
              the test -
            </p>

            <div className="mx-auto px-5 space-y-4">
              <li>
                <span> &nbsp; &nbsp; &nbsp; </span>There are{' '}
                <strong>6 quantitative aptitude questions </strong>
                to answer <span className="underline"></span>
              </li>
              <li>
                <span> &nbsp; &nbsp; &nbsp; </span>You shall write the answers
                in the box provided with each question
              </li>
              <li>
                <span> &nbsp; &nbsp; &nbsp; </span>You have total{' '}
                <strong>12 mins</strong> of time to answer them all
              </li>
              <li>
                <span> &nbsp; &nbsp; &nbsp; </span>
                <strong>You cannot go back to the previous questions</strong>
              </li>
              <li>
                <span> &nbsp; &nbsp; &nbsp; </span>You{' '}
                <strong>should not spend too much time</strong> on a single
                question
              </li>
            </div>
          </div>
        </div>
        <div className="flex py-5 pr-4 justify-end bg-gray-100 row-span-1">
          <button
            className=" px-5 bg-sky-800 hover:bg-blue-700 text-white rounded-lg shadow-2xl"
            onClick={() => router.push('/info-page')}
          >
            Proceed to Next Page
          </button>
        </div>
      </div>
    </div>
  );
}
