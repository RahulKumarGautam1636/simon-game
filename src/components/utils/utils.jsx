import { stringToast, wait } from "../companiens/default/utilities";
import { useEffect, useState } from 'react';

export const Error = () => {
    let styles = `
        h1 {
            font-size: 5.9em;
        }
        h3 {
            font-size: 2.7em;
        }
        h3 + p {
            font-size: 1.2em;
        }
        img {
            transform: scale(1.1);
        }
    `
    const handleBack = async () => {
        // stringToast("Please wait a moment.", { type: 'error', autoClose: 2000 });
        window.reloadPage();
    }
    return (
    <section className="error-container p-lg-5 vh-100">
        <style>{styles}</style> 
        <div className="p-5 bg-purple-50 d-flex flex-column-reverse flex-lg-row h-100 justify-center gap-4" >
            <div className="d-flex flex-column err-left">
                <h1>Oops..</h1>
                <h3 className="lh-base text-rose-600">An Unexpected Error has occured.</h3>
                <p>Please try again later.</p>
                <div className="hero-cta btn-group-1 d-flex gap-4 justify-content-center justify-content-lg-start">
                    <button style={{ background: "#c970ff", color: "white" }} className="!py-3 !px-4 !text-[16px]" onClick={handleBack}>
                      BACK TO HOME
                    </button>
                </div>
                {/* <p className="mt-auto d-flex align-items-center gap-2 text-blue-600" style={{fontSize: '1.6em'}}><i className='bx bxs-error'></i> Description of actual error.</p> */}
            </div>
            <div className="">
                <img src="/img/error.png" alt="ERROR" className="img-fluid" /> 
            </div>
        </div>
    </section>
    )
}

export const ListLoader = ({ classes='h-[91px]', count=4, containerClass='gap-3 mb-6' }) => {
  return (
    <div className={`flex flex-column justify-between overflow-hidden ${containerClass}`}>
      {Array.from(Array(count).keys()).map(i => (<div className={`${classes} w-full skeleton-box`} key={i}></div>))}
    </div>
  )
}

export const GridLoader = ({ classes='h-[140px] flex-1', count=6, containerClass='gap-3 mb-6' }) => {
  return (
    <div className={`flex justify-between overflow-hidden ${containerClass}`}>
      {Array.from(Array(count).keys()).map(i => (<div className={`${classes} skeleton-box`} key={i}></div>))}
    </div>
  )
}


export const Timer = ({ initialTime = 30, handleTask }) => {
  const [timer, setTimer] = useState(initialTime);

  useEffect(() => {
    let interval = null;

    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [timer]);

  const handleResend = () => {
    // 👉 Here you’d trigger your resend OTP API
    handleTask()
    console.log('OTP resent!');
    setTimer(initialTime);
  };

  return (
    <div>
      <button onClick={handleResend} disabled={timer > 0} className="mark text-sm px-3" >
        {timer > 0 ? `Resend OTP in ${timer}s` : 'Resend OTP'}
      </button>
    </div>
  );
};

export default Timer;

export function filterUnique(list, fieldName) {
  const seen = new Set();
  return list.filter(item => {
    if (!seen.has(item[fieldName])) {
      seen.add(item[fieldName]);
      return true;
    }
    return false;
  });
}

export const userLevel = { MARKETBY: 55, SALESPOINT: 56, DOCTOR: 57, PROVIDER: 58, PATIENT: 60, CUSTOMER: 60 }; 
export const uType = { 
  MARKETBY: { title: 'MARKETBY', level: 55}, 
  SALESPOINT: { title: 'SALESPOINT', level: 56},
  DOCTOR: { title: 'DOCTOR', level: 57}, 
  PROVIDER: { title: 'PROVIDER', level: 58}, 
  COLLECTOR: { title: 'COLLECTOR', level: 59},
  POLYCLINIC: { title: 'POLYCLINIC', level: 465464}, 
  
  PATIENT: { title: 'PATIENT', level: 60}, 
  RETAILER: { title: 'RETAILER', level: 60},
  CUSTOMER: { title: 'CUSTOMER', level: 60},
};

