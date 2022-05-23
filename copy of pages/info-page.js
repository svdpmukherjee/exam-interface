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
    if (id == '') {
      alert('Please enter your ID');
    } else if (checked) {
      router.push('test?id=' + id);
    } else alert('Click the box to pledge and proceed');
  };

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
        <div className="px-10 py-5 row-span-1 border-b-2 ">
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
        </div>
        {/* </div> */}
        <div class="container mx-auto px-20 row-span-5">
          <div className="py-10">
            <div class="relative flex flex-col flex-wrap p-8 bg-opacity-75 border border-gray-500 ">
              <span class="absolute px-3 py-1 text-sm font-medium text-white bg-opacity-25  bg-gradient-to-r from-blue-900 to-indigo-900 -top-4 rounded-sm">
                IMPORTANT INFO
              </span>
              <div className="mx-auto px-5 space-y-4">
                <ul className="border-b-2 py-5">
                  <li>
                    -<span className="text-blue-700"> &nbsp; BONUS: </span> If
                    you can answer <strong>6 questions correctly</strong>{' '}
                    (including 1st question),{' '}
                    <strong>you will receive a bonus (£1) </strong> along with
                    your compensation
                  </li>
                  <li>
                    -<span> &nbsp; </span>You are <strong>NOT </strong> supposed
                    to visit other websites or take help from other people
                    during the test.{' '}
                    <span className="underline">
                      However, you can use calculator if required
                    </span>
                  </li>
                  <li>
                    -<span> &nbsp; </span>If we discover you doing the above
                    mentioned unauthorized activities,
                    <strong> there would be a possible consequences </strong>
                  </li>
                </ul>

                <p className="pt-3">
                  You are asked to read out the Honor Code Pledge below and{' '}
                  <strong> click the box </strong> to start with the question
                </p>
                <input
                  type="checkbox"
                  id="check"
                  name="check"
                  onChange={(event) => setChecked(!checked)}
                />
                <label for="check" className="">
                  {' '}
                  <span className="text-blue-800">
                    Honor Code Pledge:{' '}
                  </span>{' '}
                  <strong>
                    "I affirm that I will NOT take any unauthorized help during
                    this test, and that all work will be my own"
                  </strong>
                </label>
              </div>
            </div>
          </div>
          <p>
            When you are ready, click the Start Test and the timer will begin.{' '}
            Good Luck!
          </p>
        </div>

        <div className="flex py-5 pr-4 justify-end bg-gray-100 row-span-1">
          <button
            className="px-5 py-2 bg-sky-800 hover:bg-blue-700 text-white rounded-lg shadow-2xl"
            onClick={checkInfo}
          >
            Start the test
          </button>
        </div>
      </div>
    </div>
  );
}
