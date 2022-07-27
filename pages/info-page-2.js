import Head from 'next/head';
import { useEffect, useState, createContext } from 'react';
import { useRouter } from 'next/router';

// export const ApplicationContext = createContext();
export default function Home() {
  const [checked, setChecked] = useState('');
  const [id, setID] = useState('');

  const router = useRouter();
  // const param = router.query.par;

  // Proceed with test
  const checkInfo = () => {
    // console.log(id);
    if (id == '') {
      alert('Please enter your Prolific ID');
    } else if (!checked) alert('Please tick the box to continue');
    else {
      router.push('/info-page-3?id=' + id);
    }
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
        <div className="row-span-1 px-16 pb-3 flex my-auto text-xl text-gray-500">
          Your Prolific information
        </div>
        <div className="px-16 py-5 row-span-1  ">
          Enter Your Prolific ID: <span> </span>
          {(() => {
            if (id == '') {
              return (
                <>
                  <input
                    type="text"
                    onChange={(event) => setID(event.target.value)}
                    className="p-2 text-black shadow-md rounded-lg border-teal-500 border-2 w-72"
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
                    className="p-2 text-indigo-800 font-semibold border-gray shadow-md rounded-lg border-2 w-72"
                    placeholder="Enter your Prolific ID"
                  />
                </>
              );
            }
          })()}
        </div>

        <div className="space-y-8 my-auto px-16 row-span-4">
          <input
            type="checkbox"
            id="check"
            name="check"
            onChange={(event) => setChecked(!checked)}
          />
          <label for="check" className="">
            {' '}
            <span className=""></span>{' '}
            <span className="text-lg ">
              &nbsp;"I understand that this is a research study and no
              activities of mine as a part of it pose any threat to my Prolific
              membership"
            </span>
          </label>
        </div>
        <div className="row-span-3"></div>

        <div className="flex py-5 pr-4 justify-center bg-gray-100 row-span-1">
          <button
            className="px-5 py- bg-blue-700 hover:bg-sky-700 text-white rounded-lg shadow-2xl"
            onClick={checkInfo}
          >
            Next Page
          </button>
        </div>
      </div>
    </div>
  );
}
