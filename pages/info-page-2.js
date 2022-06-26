import Head from 'next/head';
import { useEffect, useState, createContext } from 'react';
import { useRouter } from 'next/router';

// export const ApplicationContext = createContext();
export default function Home() {
  const [trialMinutes, settrialMinutes] = useState('');
  const [trialSeconds, settrialSeconds] = useState('');
  const [checked, setChecked] = useState(false);
  const [id, setID] = useState('');

  const router = useRouter();
  // const [designNumber, setDesignNumber] = useState(0);

  // Proceed with test
  const checkInfo = () => {
    console.log(id);
    if (id == '') {
      alert('Please enter your ID');
    }
    // else if (!checked & (designNumber == 1))
    //   alert('Click the box to pledge and proceed');
    else if (isNaN(trialMinutes) | isNaN(trialSeconds)) {
      alert('Please type the number only');
      settrialMinutes('');
      settrialSeconds('');
    } else if ((trialMinutes == '1') & (trialSeconds == '40')) {
      router.push('test?id=' + id);
    } else {
      alert('You should spend 1 minute and 40 seconds on average');
      settrialMinutes('');
      settrialSeconds('');
    }
  };

  // useEffect(async () => {
  //   let response_design = await fetch('/api/add-database', {
  //     method: 'GET',
  //   });
  //   let data = await response_design.json();

  //   setDesignNumber(parseInt(data.message));
  //   console.log(data.message);
  // }, [designNumber]);

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
          Enter Your Prolific ID: <span> </span>
          {(() => {
            if (id == '') {
              return (
                <>
                  <input
                    type="text"
                    onChange={(event) => setID(event.target.value)}
                    className="p-2 text-black shadow-md rounded-lg border-teal-500 border-2"
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
        <div class=" mx-auto px-16 row-span-5">
          <div className="py-10">
            <div class="relative flex p-8  border border-gray-300 ">
              {/* <div class="absolute flex px-3 py-1 text-sm font-medium text-white  bg-sky-800 -top-5 rounded-sm">
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
              </div> */}
              <div className="mx-auto px-5 border-r-2">
                <ul className=" py-3 space-y-4 ">
                  <li>
                    &#8226;&nbsp; Number of questions: <strong>6</strong>
                  </li>
                  <li>
                    &#8226;&nbsp; Total time: <strong>10 minutes</strong>
                  </li>
                  <li>
                    &#8226;&nbsp; You{' '}
                    <span className="font-semibold">
                      should not spend too much time
                    </span>{' '}
                    on a single question
                  </li>
                </ul>
              </div>
              <div className="mx-auto px-5">
                <ul className=" py-3 space-y-4 ">
                  <li className="text-lg ">
                    "How much time on average should you spend on each
                    question?"
                  </li>
                  <li>
                    <div className="row-span-1 mt-5 text-md">
                      My Answer:&nbsp;
                      <input
                        type="text"
                        value={trialMinutes}
                        onChange={(event) => {
                          settrialMinutes(event.target.value);
                        }}
                        className="w-20 h-12 px-2 border-blue-500 border-2 shadow-md rounded-md"
                      />{' '}
                      minute{' '}
                      <input
                        type="text"
                        value={trialSeconds}
                        onChange={(event) => {
                          settrialSeconds(event.target.value);
                        }}
                        className="w-20 h-12 px-2 border-blue-500 border-2 shadow-md rounded-md"
                      />{' '}
                      seconds
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          {/* {(() => {
            if (designNumber == 1) {
              return (
                <div className="space-y-8 p-3  mx-auto">
                  <p className="text-sm text-gray-400">
                    Please read out the pledge below and{' '}
                    <strong> click the box </strong> to start with the test
                  </p>

                  <input
                    type="checkbox"
                    id="check"
                    name="check"
                    onChange={(event) => setChecked(!checked)}
                  />
                  <label for="check" className="">
                    {' '}
                    <span className=""></span>{' '}
                    <span className="">
                      "I affirm that I will not look for any help on the
                      internet during the test, and that all work will be my
                      own"
                    </span>
                  </label>
                </div>
              );
            }
          })()} */}

          <p className="mt-10 text-center">
            When you are ready, click the{' '}
            <span className="font-semibold">Start Test</span> below and the
            timer will begin. Good Luck!
          </p>
        </div>

        <div className="flex py-5 pr-4 justify-center bg-gray-100 row-span-1">
          <button
            className="px-5 py-2 bg-sky-700 hover:bg-blue-700 text-white rounded-lg shadow-2xl"
            onClick={checkInfo}
          >
            Start test
          </button>
        </div>
      </div>
    </div>
  );
}
