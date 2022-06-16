import Head from 'next/head';
import { useEffect, useState, createContext } from 'react';
import { useRouter } from 'next/router';

// export const ApplicationContext = createContext();
export default function Home() {
  const [checked, setChecked] = useState(false);
  const [id, setID] = useState('');

  const router = useRouter();

  // Proceed with test
  const checkInfo = () => {
    console.log(id);
    if (checked) {
      router.push('/trial-page');
    } else alert('Click the box to pledge and proceed');
  };

  // JSX
  return (
    <div className="">
      <div className="grid grid-rows-7 h-screen ">
        <Head>
          <title>Online test</title>
        </Head>

        <div className="font-serif px-10 py-7 text-2xl text-center font-semibold row-span-1 bg-gray-100 ">
          Welcome to the Online Test
        </div>
        {/* <div className="px-10 py-5 row-span-1 border-b-2 ">
          Enter Your Profilic ID: <span> </span>
          {(() => {
            if (id == '') {
              return (
                <>
                  <input
                    type="text"
                    onChange={(event) => setID(event.target.value)}
                    className="p-2 text-black shadow-md rounded-lg border-blue-500 border-2"
                    placeholder="Prolific ID"
                  />
                </>
              );
            } else {
              return (
                <>
                  <input
                    type="text"
                    onChange={(event) => setID(event.target.value)}
                    className="p-2 text-indigo-800 font-semibold border-gray shadow-md rounded-lg border-2"
                    placeholder="Enter your Prolific ID"
                  />
                </>
              );
            }
          })()}
        </div> */}
        {/* </div> */}
        <div class="container mx-auto px-16 pt-10 row-span-5">
          <div className="py-10">
            <div class="relative flex flex-col flex-wrap p-8 bg-opacity-75 border border-gray-300 ">
              <div class="absolute flex px-3 py-1 text-sm font-medium text-white  bg-sky-800 -top-5 rounded-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-8 h-8 my-auto"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="#FFFFFF"
                    d="M425.706 86.294A238.432 238.432 0 00256 16c-63.857 0-123.951 21.059-169.211 59.3C41.14 113.861 16 165.251 16 220c0 52.417 23.319 102.222 65.663 140.24 41.8 37.533 98.164 60.026 158.7 63.334a8.039 8.039 0 017.637 7.988v39.848a24.019 24.019 0 0024.055 24q.872 0 1.746-.064A240.009 240.009 0 00425.706 86.294zM264 240h-16a32 32 0 01-32-32v-96a32 32 0 0132-32h16a32 32 0 0132 32v96a32 32 0 01-32 32zm32 80a40 40 0 11-40-40 40 40 0 0140 40z"
                  ></path>
                </svg>
                &nbsp;&nbsp;
                <div className="my-auto">IMPORTANT INFO</div>
              </div>
              <div className="mx-auto px-5">
                <ul className=" my-10 space-y-10">
                  <li>
                    -<span className="text-blue-700"> &nbsp; BONUS: </span> If
                    you can answer{' '}
                    <strong>5 questions correctly (out of 6)</strong>,{' '}
                    <strong>you will receive a bonus (£1) </strong> along with
                    your compensation
                  </li>
                  <li>
                    -<span> &nbsp; </span>You are{' '}
                    <strong>not authorized</strong> to visit other websites or
                    take help from other people during the test.{' '}
                    <span className="underline">
                      However, you may use calculator if required
                    </span>
                  </li>
                </ul>
                <div className="space-y-8 p-3 border-2 border-black mt-16 my-auto">
                  <p className="text-sm text-gray-400">
                    Please read out the Honor Code Pledge below and{' '}
                    <strong> click the box </strong> to go to the next page
                  </p>

                  <input
                    type="checkbox"
                    id="check"
                    name="check"
                    onChange={(event) => setChecked(!checked)}
                  />
                  <label for="check" className="">
                    {' '}
                    <span className="text-green-600 text-lg">
                      Honor Code Pledge:{' '}
                    </span>{' '}
                    <strong className="text-blue-800">
                      "I affirm that I will NOT do any unauthorized activity
                      during this test, and that all work will be my own"
                    </strong>
                  </label>
                </div>
              </div>
            </div>
          </div>
          {/* <p>
            When you are ready, click the{' '}
            <span className="text-sky-600">Start Test</span> below. Good Luck!
          </p> */}
        </div>

        <div className="flex py-5 pr-4 justify-center bg-gray-100 row-span-1">
          <button
            className="px-5 py-2 bg-sky-700 hover:bg-blue-700 text-white rounded-lg shadow-2xl"
            onClick={checkInfo}
          >
            Next Page
          </button>
        </div>
      </div>
    </div>
  );
}
