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
      <div className="grid grid-rows-9 h-screen ">
        <Head>
          <title>Online test</title>
        </Head>

        <div className="font-serif px-10 py-7 text-2xl text-center font-semibold row-span-1 bg-gray-100 ">
          Welcome to the Online Test
        </div>

        <div className="container mx-auto h-full row-span-6">
          <div className="pt-20">
            <p className="font-serif pb-10 text-lg">
              Hi There! <br /> <br />
              These are the instructions to read before starting with the test -
            </p>
            <br />
            <div className="mx-auto px-5 space-y-4">
              <li>
                <span> &nbsp; &nbsp; &nbsp; </span>There are{' '}
                <strong>9 quantitative aptitude questions</strong> you will have
                to answer -{' '}
                <span className="underline">
                  1st question is a qualifying one
                </span>
              </li>
              <li>
                <span> &nbsp; &nbsp; &nbsp; </span>The questions are of{' '}
                <strong> numeric entry types</strong>, where you will have to
                write the answers in the box
              </li>
              <li>
                <span> &nbsp; &nbsp; &nbsp; </span>You have total{' '}
                <strong>18 mins</strong> of time to answer them
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
            className=" px-5 py-2 bg-sky-800 hover:bg-blue-700 text-white rounded-lg shadow-2xl"
            onClick={() => router.push('/info-page')}
          >
            Proceed to Next Page
          </button>
        </div>
      </div>
    </div>
  );
}
