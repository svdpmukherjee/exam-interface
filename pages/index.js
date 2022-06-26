import Head from 'next/head';
import { useEffect, useState, createContext } from 'react';
import { useRouter } from 'next/router';
import Script from 'next/script';

// export const ApplicationContext = createContext();
export default function Home() {
  const [checked, setChecked] = useState(false);
  // const [modal, setModal] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const router = useRouter();

  // const openModal = () => {
  //   setModal(1);
  // };
  const checkInfo = () => {
    setShowModal(false);
    router.push('/info-page-1');
    // alert('We need your consent to proceed with the study');
  };
  // JSX
  return (
    <div className="">
      <div className="grid grid-rows-6 h-screen ">
        <Head>
          <title>Online test</title>
          {/* <link
            rel="stylesheet"
            href="https://unpkg.com/flowbite@1.4.5/dist/flowbite.min.css"
          /> */}
        </Head>

        <div className="font-serif py-10 text-2xl text-center font-semibold row-span-1 mx-auto">
          <p className="border-t-2 border-b-2 py-6">
            Hi There! Thank you for participating in the study
          </p>
        </div>

        <div className="m-auto row-span-4 text-md ">
          {/* <p className="font-serif pb-10 mt-10 text-lg flex justify-center">
              &#128075; Hi There! Please read the details of the study carefully
              before proceeding &#8628;
            </p> */}

          <div className="text-md space-y-8 pl-10">
            <div className="text-justify flex">
              <div className="">
                <span className="">The entire study has 2 parts</span> - an
                online maths test followed by an online questionnaire.{' '}
                {/* <div className="mx-10">
                  <li>
                    <span className="font-bold">In the first part</span>, you
                    shall take an{' '}
                    <span className="">
                      online test of 6 quantitative aptitude (maths) questions
                    </span>{' '}
                    in a time-bound manner.{' '}
                  </li>
                  <li>
                    <span className="font-bold">In the second part</span>, you
                    shall{' '}
                    <span className="">
                      fill an online survey questionnaire
                    </span>{' '}
                    right after the online test is submitted.
                  </li>
                </div> */}
              </div>
            </div>

            {/* <div className=" flex">
              <div className="">
                <span className="">
                  The study should take around 20-23 minutes in total.
                </span>
              </div>
            </div> */}

            <div className="flex">
              <div>
                Through this study,{' '}
                <span className="font-bold">
                  we evaluate your experience with an online test system.
                </span>{' '}
              </div>
            </div>

            <div className="">
              Please use <strong> a laptop or desktop </strong> to take this
              study. Using{' '}
              <strong> a mobile or tablet is strictly not allowed.</strong>
            </div>
            <div className="">
              For study details and consent form, please click below.
            </div>

            {/* <div className="leading-10 mx-10 px-6">
                <li>
                  {' '}
                  &nbsp; &nbsp; &nbsp; You may go through the study information
                  and consent form by clicking here{' '}
                  <a
                    className="text-blue-500"
                    href="https://drive.google.com/file/d/1cYZf7CG_VdSWSTLhDlPTyFDowI9bmq83/view?usp=sharing"
                    target="_blank"
                  >
                    <span className="underline">google drive link</span>
                  </a>
                </li>
              </div> */}
          </div>
        </div>
        {/* <div className="flex  pr-4 justify-center row-span-1 ">
          <div className="mt-10 mx-5 flex justify-center my-auto">
            <input
              type="checkbox"
              id="check"
              name="check"
              className="my-auto"
              onChange={(event) => setChecked(!checked)}
            />
            <label for="check" className="my-auto">
              {' '}
              <strong className="text-blue-800 text-md">
                &nbsp; "I have read the consent form and agree to participate in
                the study"
              </strong>
            </label>
          </div>
        </div> */}

        {/* <div className="flex  pr-4 justify-center row-span-1 bg-gray-50"> */}
        {/* <button
            className="bg-blue-200 text-black active:bg-blue-500 
      font-bold px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
            type="button"
            onClick={() => setShowModal(true)}
          >
            Fill Details
          </button> */}
        <button
          type="button"
          class="inline-block px-6 py-2.5 bg-blue-800 text-white font-medium text-xl leading-tight uppercase shadow-lg hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
          onClick={() => setShowModal(true)}
        >
          Click here to Read the Study Information and Consent Form to
          Participate
        </button>
        {showModal ? (
          <>
            <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none row-span-1">
              <div className="relative w-auto my-6 mx-auto max-w-4xl">
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
                    <h3 className="text-3xl font=semibold text-center">
                      Evaluation of User Interaction with a Computer-based
                      Assessment System
                    </h3>
                    {/* <button
                        className="bg-transparent border-0 text-black float-right"
                        onClick={() => setShowModal(false)}
                      >
                        <span className="text-black opacity-7 h-6 w-6 text-xl block bg-gray-400 py-0 rounded-full">
                          x
                        </span>
                      </button> */}
                  </div>
                  <div className="relative p-6 flex-auto text-sm text-justify space-y-6 leading-6">
                    <div className="">
                      <span className="font-bold">
                        Description of the study:{' '}
                      </span>
                      During the study, you are about to solve 6 quantitative
                      aptitude questions in an online test system within 10
                      minutes.{' '}
                      <span className="font-semibold">
                        You will be rewarded with a bonus (£3) at the end of the
                        study if you could solve at least 5 questions correctly.
                      </span>{' '}
                      You should not look for any help either on the internet or
                      from anyone else during the test. After the test, you will
                      be presented with a survey questionnaire regarding your
                      experience with the test system and some of your general
                      opinions related to it. We expect you to answer them
                      honestly.{' '}
                      <span className="font-semibold">
                        The total duration will take around 20-23 minutes. To
                        thank you for your participation, you will receive a £3
                        compensation.
                      </span>
                    </div>
                    <div>
                      <span className="font-bold">
                        What data would we collect?{' '}
                      </span>
                      In the survey, we will ask you to share some information
                      about yourself, e.g. birth year, gender, native language,
                      qualification, and educational background.{' '}
                      <span className="font-semibold">
                        All your personal data will strictly be anonymized.
                      </span>{' '}
                      Your answers (both from the online test and survey), along
                      with the time taken to answer them will be stored in a
                      secured server in University of Luxembourg. During the
                      online test, IP address of your test-taking device shall
                      be recorded and be strictly pseudonymized before storing
                      it in the same server. Only the researchers working on
                      this study will have the access to these data. The data
                      collected during the study will only be used for the
                      research project.{' '}
                      <span className="font-semibold">
                        The data will be used for publications without
                        personally identifying you.
                      </span>
                    </div>
                    <div>
                      <span className="font-bold">Your Consent -</span> I have
                      been informed in writing on how the study will be carried
                      out. I have also been informed about the anonymity of my
                      personal data and processing of it without revealing my
                      identity, under the conditions detailed in the GDPR. I am
                      aware that I may withdraw my consent any time and I don’t
                      need to give reasons for my withdrawal and that there will
                      be no negative consequences.
                    </div>
                  </div>
                  <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                    <button
                      className="text-black background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 hover:text-blue-600"
                      type="button"
                      onClick={() => setShowModal(false)}
                    >
                      Close
                    </button>
                    <button
                      className="text-white bg-green-500  font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg hover:bg-green-700 outline-none focus:outline-none mr-1 mb-1"
                      type="button"
                      onClick={checkInfo}
                    >
                      Yes, I give my consent
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : null}
        {/* </div> */}
      </div>
      {/* <Script src="https://unpkg.com/flowbite@1.4.5/dist/flowbite.js"></Script> */}
    </div>
  );
}
