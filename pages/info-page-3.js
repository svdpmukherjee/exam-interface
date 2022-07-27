import Head from 'next/head';
import { useEffect, useState, createContext } from 'react';
import { useRouter } from 'next/router';

// export const ApplicationContext = createContext();
export default function Home() {
  const [minutes, setMinutes] = useState('');

  const router = useRouter();
  const id = router.query.id;
  // Proceed with test
  const checkInfo = () => {
    if (isNaN(minutes)) {
      alert('Please type the number only');
    } else if (minutes != '2') {
      alert(
        'You should spend 2 minutes on average. Please type in the box to continue'
      );
      setMinutes('');
    } else router.push('test?id=' + id);
  };

  // JSX
  return (
    <div className="">
      <div className="grid grid-rows-7 h-screen ">
        <Head>
          <title>Online test</title>
        </Head>

        <div className="font-serif px-10 py-7 text-2xl text-center font-semibold row-span-1 bg-gray-100 ">
          Online Quantitative Aptitude Test
        </div>
        <div className="row-span-1 px-16 pt-2 pb-3 flex my-auto text-xl text-gray-500">
          Instructions
        </div>

        <div className=" px-20 row-span-4">
          <div className="flex  ">
            <div className=" px-5">
              <ul className="space-y-4">
                <br />
                {/* <li>This study has two parts:</li> */}
                <li className="font-semibold text-lg">
                  The test contains 5 questions
                </li>

                <li>
                  <span> &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;</span>&bull;
                  &nbsp;&nbsp;Questions are taken from reputed online admission
                  tests. You might find somewhat difficult to solve them within
                  the time.
                </li>
                <li>
                  <span> &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;</span>&bull;
                  &nbsp;&nbsp;You cannot go back to the previous questions.
                </li>
                <li>
                  <span> &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;</span>
                  &bull;&nbsp;&nbsp; If you answer all questions correctly, you
                  will receive a <strong>bonus (£15)</strong>.
                </li>
                <br />
                <li className="font-semibold text-lg">
                  Total time: 10 minutes
                </li>
                <li>
                  <span> &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;</span>
                  &bull;&nbsp;&nbsp; Do not spend too much time on a single
                  question
                </li>
                <li>
                  <span> &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;</span>&bull;
                  &nbsp;&nbsp;To complete 5 questions in 10 minutes, how much
                  time should you spend on average on each question?
                  <span>
                    &nbsp; &nbsp;&nbsp;
                    <input
                      type="text"
                      value={minutes}
                      onChange={(event) => {
                        setMinutes(event.target.value);
                      }}
                      className="w-32 h-8 px-2 border-blue-500 border shadow-md rounded-sm"
                      placeholder="your answer"
                    />{' '}
                    minutes{' '}
                  </span>
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
            Start Test
          </button>
        </div>
      </div>
    </div>
  );
}
