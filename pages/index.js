import Head from 'next/head';
import { useEffect, useState, createContext } from 'react';
import { useRouter } from 'next/router';

// export const ApplicationContext = createContext();
export default function Home() {
  const [checked, setChecked] = useState(false);
  const [id, setID] = useState('');

  const router = useRouter();
  const param = router.query.par;
  // Proceed with test
  const checkInfo = () => {
    router.push('/info-page-1');
  };

  // JSX
  return (
    <div className="">
      <div className="grid grid-rows-8 h-screen ">
        <Head>
          <title>Online test</title>
        </Head>

        <div className="font-serif px-10 py-7 text-2xl text-center font-semibold row-span-1 bg-gray-100 ">
          Welcome to the Study: Online Quantitative Aptitude Test
        </div>
        <div className="row-span-1 px-16 pt-2 pb-3 flex my-auto text-xl text-gray-500">
          Description of the study
        </div>
        <div className="row-span-1 px-20 ">
          <div className="border border-red-200 flex my-auto p-2">
            <svg
              className="text-orange-700 h-8 w-8 mx-4 my-auto"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {' '}
              <polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2" />{' '}
              <line x1="12" y1="8" x2="12" y2="12" />{' '}
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>

            <div className="my-auto text-sm">
              {' '}
              Please use a laptop or desktop to take this study.{' '}
              <span className="text-orange-600 ">
                {' '}
                Mobile and tablet are not allowed{' '}
              </span>
            </div>
          </div>
        </div>

        <div className=" px-20 row-span-4 text-sm">
          <div className="flex  ">
            <div className=" px-5">
              <ul className="space-y-4">
                <br />
                {/* <li>This study has two parts:</li> */}
                <li className="font-semibold text-lg">
                  Part 1: Quantitative aptitude test
                </li>
                <li>
                  <span> &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;</span>&bull;
                  &nbsp;&nbsp;Questions are taken from reputed online admission
                  tests.
                </li>
                <li>
                  <span> &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;</span>
                  &bull;&nbsp;&nbsp;{' '}
                  <span className="text-md">Bonus (£15)</span> if you solve all
                  questions correctly.{' '}
                </li>

                <li>
                  <span> &nbsp; &nbsp; </span>
                  <span className="grid grid-cols-5 space-x-3 ">
                    <span className="col-span-2 flex justify-end italic my-auto text-sm">
                      Sample test question:
                    </span>
                    <span className="col-span-3 px-6 py-2  text-gray-500 bg-cyan-50 shadow-sm my-auto text-md">
                      A contractor undertakes to do a job within 100 days and
                      hires 10 people to do it. After 20 days, he realizes that
                      one fourth of the work is done so he fires 2 people. In
                      how many more days will the work get over?
                    </span>
                  </span>
                </li>
                <br />
                <li className="font-semibold text-lg">
                  Part 2: Online questionnaire
                </li>
                <li>
                  <span> &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;</span>&bull;
                  &nbsp;&nbsp;After the test, you shall complete a questionnaire
                  regarding your experience.
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex py-5 pr-4 justify-center bg-gray-100 row-span-1">
          <button
            className="px-5 py-2 bg-blue-700 hover:bg-sky-700 text-white rounded-lg shadow-2xl"
            onClick={checkInfo}
          >
            Next Page
          </button>
        </div>
      </div>
    </div>
  );
}
