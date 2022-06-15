import Head from 'next/head';
import { useEffect, useState, createContext } from 'react';
import { useRouter } from 'next/router';

// export const ApplicationContext = createContext();
export default function Home() {
  const [checked, setChecked] = useState(false);

  const router = useRouter();

  const checkInfo = () => {
    if (checked) {
      router.push('/test-instructions');
    } else alert('We need your consent to proceed with the study');
  };
  // JSX
  return (
    <div className="">
      <div className="grid grid-rows-9 h-screen ">
        <Head>
          <title>Online test</title>
        </Head>

        <div className="font-serif px-10 py-7 text-xl text-center font-semibold row-span-1  ">
          &#128075; Hi There! Please read the details of the study carefully
          before proceeding
        </div>

        <div className="container mx-auto row-span-6 flex text-justify my-auto ">
          <div className="">
            {/* <p className="font-serif pb-10 mt-10 text-lg flex justify-center">
              &#128075; Hi There! Please read the details of the study carefully
              before proceeding &#8628;
            </p> */}

            <div className="border-2 border-green-600 p-2 rounded-2xl text-md space-y-4">
              <div className="leading-10 mx-10 px-6">
                <li>
                  {' '}
                  &nbsp; &nbsp; &nbsp;{' '}
                  <span className="bg-blue-600 text-white">
                    The entire study has 2 parts
                  </span>{' '}
                  which should take around 30 minutes in total -{' '}
                  <span className="bg-blue-600 text-white">
                    In the first part
                  </span>
                  , you shall take an{' '}
                  <span className="underline">
                    online test of some quantitative aptitude questions
                  </span>{' '}
                  in a time-bound manner.{' '}
                  <span className="bg-blue-600 text-white">
                    In the second part
                  </span>
                  , you shall{' '}
                  <span className="underline">
                    fill an online survey questionnaires up
                  </span>{' '}
                  right after the online test is submitted.
                </li>
              </div>

              <div className="leading-10 mx-10  px-6">
                <li>
                  &nbsp; &nbsp; &nbsp; Please read the instructions carefully
                  for each part of the study before proceeding with them.
                </li>
              </div>

              <div className="leading-10 mx-10  px-6">
                <li>
                  &nbsp; &nbsp; &nbsp; Please remember that we do NOT test you,{' '}
                  <span className="underline">
                    we only evaluate your experience with the online test system
                  </span>{' '}
                  and also some of your valuable opinions which are asked in the
                  survey later.
                </li>
              </div>

              <div className="leading-10 mx-10  px-6">
                {' '}
                <li>
                  {' '}
                  &nbsp; &nbsp; &nbsp; Please use{' '}
                  <strong>your laptop or desktop</strong> to take this study for
                  a better view.
                </li>
              </div>

              <div className="leading-10 mx-10 px-6">
                <li>
                  {' '}
                  &nbsp; &nbsp; &nbsp; You may go through the study information
                  and consent form by clicking here{' '}
                  <a
                    className="text-blue-500"
                    href="https://drive.google.com/file/d/12-MbSQfMgO3741DSRgR1zSuWwQ5t6ONd/view?usp=sharing"
                    target="_blank"
                  >
                    <span className="underline">google drive link</span>
                  </a>
                </li>
              </div>
            </div>
          </div>
        </div>
        <div className="flex py-5 pr-4 justify-center row-span-1 ">
          <div className="mt-10 mx-5 flex justify-center my-auto">
            <input
              type="checkbox"
              id="check"
              name="check"
              onChange={(event) => setChecked(!checked)}
            />
            <label for="check" className="">
              {' '}
              <strong className="text-blue-800 text-md">
                &nbsp; "I have read the consent form and agree to participate in
                the study"
              </strong>
            </label>
          </div>
        </div>
        <div className="flex py-5 pr-4 justify-center bg-gray-50 row-span-1 ">
          <button
            className="flex px-5 py-2 my-auto bg-sky-800 hover:bg-blue-700 text-white rounded-lg shadow-2xl"
            onClick={checkInfo}
          >
            Proceed to the first part of the study
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="26"
              height="26"
              fill="#FFFFFF"
              enableBackground="new 0 0 512 512"
              version="1.1"
              viewBox="0 0 512 512"
              xmlSpace="preserve"
            >
              <path d="M160 115.4L180.7 96 352 256 180.7 416 160 396.7 310.5 256z"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
