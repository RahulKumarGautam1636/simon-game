import React, { useEffect } from "react"
import { Link, useLocation } from "react-router-dom";
import Slider from 'react-slick';

export default function ScrollToTop() {
  const { pathname } = useLocation();
  
  useEffect(() => {
    const offset = window.$('#header-container')[0].clientHeight;
    window.scrollTo(0, offset);
  }, [pathname]);

  return null;
}

export const SelectMenu = ({ id, dataList, customClass='ui-state-default'}) => {
    
    useEffect(() => {                       // Default Select Element of this template.
        window.$(`#${id}`).selectmenu();
        window.$(`#${id}-button`).addClass(customClass);
        return () => window.$(`#${id}`).selectmenu("destroy");
    })

    return (
      <select className="selectmenu" id={id} style={{display: 'none'}}>
        {dataList.map(i => (<option key={i.name} value={i.value}>{i.name}</option>))}
      </select>
    );
}

export const JQDatePicker = ({ id, curValue, setState, name, customClass, handler, format='dd/mm/yy', placeholder=''}) => {

    useEffect(() => {                       // Default JQuery Datepicker of this template.
      window.$(`#${id}`).datepicker({
        dateFormat: format,
        changeMonth: true,
        changeYear: true,
        yearRange: "-60:+0",
        onSelect: function() {this.focus()}, 
        onClose: function(date) {
          if (handler) return handler(date);
          setState(pre => ({ ...pre, [name]: date}))
        }      
      });
      return () => window.$(`#${id}`).datepicker( "destroy" );
    },[id, setState, name, format])             // passing handler causing problem (datepicker not closing) when user types invalid date in input.
  
    return <input type="text" value={curValue} onChange={(e) => setState(pre => ({ ...pre, [name]: e.target.value}))} className={customClass} autoComplete="off" id={id} placeholder={placeholder} />;
}

export const MyAccordion = ({ name, data, activeKey, handler, allOpen=false }) => {

  return (
    <div className="accordion-box accordion-default">
      {data.map(i => {
        const uniqueKey = name + '-' + i.key;
        return (
          <div className="accordion accordion-block" key={uniqueKey}>
              <div className={`accord-btn ${allOpen || uniqueKey === activeKey ? 'active' : ''}`} onClick={() => handler(uniqueKey)}>
                  <h4><i className='bx bx-right-arrow-alt'></i> {i.heading}</h4>
              </div>
              <div className={`accord-content ${allOpen || uniqueKey === activeKey ? 'collapsed' : ''}`}>
                  <p>{i.content}</p>
              </div>
          </div>
        )
      })}
    </div>
  )
}

export const MyAccordion2 = ({ name, data, activeKey, handler, allOpen=false, trigger, content, customClass }) => {

  return (
    <div className={`accordion-box accordion-default ${customClass}`}>
      {data.map(i => {
        const uniqueKey = name + '-' + i.key;

        const createButton = () => {
          return React.cloneElement(trigger, { data: i, key: i.id });
        }   

        const createContent = () => {
          return React.cloneElement(content, { data: i, key: i.id });
        }      

        return (
          <div className={`accordion accordion-block`} key={uniqueKey}>
              <div className={`accord-btn ${allOpen || uniqueKey === activeKey ? 'active' : ''}`} onClick={() => handler(uniqueKey)}>
                  {/* <h4>
                    {allOpen ? <i className='bx bx-radio-circle-marked'></i> : <i className='bx bx-right-arrow-alt'></i>}
                    {i.heading}
                  </h4> */}
                  {createButton()}
              </div>
              <div className={`accord-content ${allOpen || uniqueKey === activeKey ? 'collapsed' : ''}`}>
                  {createContent()}
              </div>
          </div>
        )
      })}
    </div>
  )
}

export const DataList = ({ name, data }) => {

  return (
    <div className="accordion-box accordion-default">
      {data.map(i => {
        return (
          <div className="accordion accordion-block" key={i.text}>
              <div className={`accord-btn`}>
                  <Link to={'/articles'}><h4><i className='bx bx-right-arrow-alt'></i> {i.text}</h4></Link>
              </div>
          </div>
        )
      })}
    </div>
  )
}

export const Arrow = ({ customClass, onClick, el }) => <span className={customClass} onClick={onClick}><i className={`bx bxs-chevrons-${el}`}></i></span>;
export const MySlider = ({ name, dataList, responsive=[], customSettings={} }) => {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 1500,
    slidesToScroll: 1,
    swipeToSlide: true,
    variableWidth: true,
    className: 'product-slider',
    prevArrow: <Arrow customClass='slick-prev slick-arrow' el={'left'}/>,
    nextArrow: <Arrow customClass='slick-next slick-arrow' el={'right'}/>,
    arrows: true,
    ...customSettings         // to override above defined settings.
  };
  return <Slider {...settings} className={name} responsive={responsive}>{dataList}</Slider>;
}

export const responsive_4 = [
  { breakpoint: 2000, settings: { slidesToShow: 4 } },
  { breakpoint: 1200, settings: { slidesToShow: 3 } },
  { breakpoint: 1000, settings: { slidesToShow: 2 } },
  { breakpoint: 700, settings: { slidesToShow: 1 } }
]

export const responsive_3 = [
  { breakpoint: 2000, settings: { slidesToShow: 3 } },
  { breakpoint: 1000, settings: { slidesToShow: 2 } },
  { breakpoint: 700, settings: { slidesToShow: 1 } }
]

export const responsive_2 = [
  { breakpoint: 2000, settings: { slidesToShow: 2 } },
  { breakpoint: 1000, settings: { slidesToShow: 1 } },
  // { breakpoint: 700, settings: { slidesToShow: 1 } }
]

export const doctorsList = [
  { id: 1, Name: 'Marc Parcival', SpecialistDesc: 'Newyork', RegMob1: '+321 567 89 0123', StateDesc: 'Bailey@Hospitals.com', img: '1.jpg' },
  { id: 2, Name: 'Alen Bailey', SpecialistDesc: 'Newyork', RegMob1: '+321 567 89 0123', StateDesc: 'Bailey@Hospitals.com', img: '2.jpg' },
  { id: 3, Name: 'Basil Andrew', SpecialistDesc: 'Newyork', RegMob1: '+321 567 89 0123', StateDesc: 'Bailey@Hospitals.com', img: '3.jpg' },
  { id: 4, Name: 'Edgar Denzil', SpecialistDesc: 'Newyork', RegMob1: '+321 567 89 0123', StateDesc: 'Bailey@Hospitals.com', img: '4.jpg' },
  { id: 5, Name: 'Marc Parcival', SpecialistDesc: 'Newyork', RegMob1: '+321 567 89 0123', StateDesc: 'Bailey@Hospitals.com', img: '1.jpg' },
  { id: 6, Name: 'Alen Bailey', SpecialistDesc: 'Newyork', RegMob1: '+321 567 89 0123', StateDesc: 'Bailey@Hospitals.com', img: '2.jpg' },
]

export const testimonialList = [
  { id: 1, name: 'Rossy Miranda', place: 'Newyork', review: 'Mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system.', img: '1.png' },
  { id: 2, name: 'Peter Lawrence', place: 'California', review: 'The master-builder of human happiness one rejects, dislikes, or avoids pleasure itself, because it is pleasure pursue.', img: '2.png' },
  { id: 3, name: 'Rossy Miranda', place: 'Newyork', review: 'Mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system.', img: '1.png' },
  { id: 4, name: 'Peter Lawrence', place: 'California', review: 'The master-builder of human happiness one rejects, dislikes, or avoids pleasure itself, because it is pleasure pursue.', img: '2.png' },
]

export const bsnDepartmentList = [
  { id: 1, title: 'Cardiology', img: 'cardiology', icon: 'cardiology', link: 'cardiology', content: 'How all this mistaken al idea of denouncing pleasure praisings pain was complete.' },
  { id: 4, title: 'Neurology', img: 'neurology', icon: 'neurology', link: 'neurology', content: 'Who chooses to enjoy a pleasure that has annoying consquences, or one who avoids a pain.' },
  { id: 3, title: 'Obstetrics & Gynecology', img: 'obs_gyne', icon: 'gynecology', link: 'obsGyne', content: 'Who chooses to enjoy a pleasure that has annoying consquences, or one who avoids a pain.' },
  { id: 5, title: 'Nephrology', img: 'nephrology', icon: 'nephrology', link: 'nephrology', content: 'Who chooses to enjoy a pleasure that has annoying consquences, or one who avoids a pain.' },
  { id: 6, title: 'Orthopaedics', img: 'orthopedic', icon: 'orthopedics', link: 'orthopedics', content: 'Who chooses to enjoy a pleasure that has annoying consquences, or one who avoids a pain.' },
  { id: 7, title: 'Pediatrics', img: 'pediatrics', icon: 'pediatrics', link: 'pediatrics', content: 'Who chooses to enjoy a pleasure that has annoying consquences, or one who avoids a pain.' },
  { id: 8, title: 'General Surgery', img: 'gen_surgery', icon: 'surgical', link: 'genSurgery', content: 'Who chooses to enjoy a pleasure that has annoying consquences, or one who avoids a pain.' },
  { id: 9, title: 'Critical Care', img: 'critical_care', icon: 'volunteer_activism', link: 'criticalCare', content: 'Who chooses to enjoy a pleasure that has annoying consquences, or one who avoids a pain.' },
  { id: 2, title: 'Urology', img: 'urology', icon: 'pulmonology', link: 'urology', content: 'Who chooses to enjoy a pleasure that has annoying consquences, or one who avoids a pain.' },
  
  // { id: 2, title: 'Pulmonology', icon: 'pulmonology', content: 'Who chooses to enjoy a pleasure that has annoying consquences, or one who avoids a pain.' },
]


export const departmentList = [
  { id: 1, title: 'Cardiology', img: '', icon: 'cardiology', link: 'cardiology', content: 'How all this mistaken al idea of denouncing pleasure praisings pain was complete.' },
  { id: 4, title: 'Neurology', img: '', icon: 'neurology', link: 'neurology', content: 'Who chooses to enjoy a pleasure that has annoying consquences, or one who avoids a pain.' },
  { id: 3, title: 'Obstetrics & Gynecology', img: '', icon: 'gynecology', link: 'obsGyne', content: 'Who chooses to enjoy a pleasure that has annoying consquences, or one who avoids a pain.' },
  { id: 5, title: 'Nephrology', img: '', icon: 'nephrology', link: 'nephrology', content: 'Who chooses to enjoy a pleasure that has annoying consquences, or one who avoids a pain.' },
  { id: 6, title: 'Orthopaedics', img: '', icon: 'orthopedics', link: 'orthopedics', content: 'Who chooses to enjoy a pleasure that has annoying consquences, or one who avoids a pain.' },
  { id: 7, title: 'Pediatrics', img: '', icon: 'pediatrics', link: 'pediatrics', content: 'Who chooses to enjoy a pleasure that has annoying consquences, or one who avoids a pain.' },
  { id: 8, title: 'General Surgery', img: '', icon: 'surgical', link: 'genSurgery', content: 'Who chooses to enjoy a pleasure that has annoying consquences, or one who avoids a pain.' },
  { id: 9, title: 'Critical Care', img: '', icon: 'volunteer_activism', link: 'criticalCare', content: 'Who chooses to enjoy a pleasure that has annoying consquences, or one who avoids a pain.' },
  { id: 2, title: 'Urology', img: '', icon: 'pulmonology', link: 'urology', content: 'Who chooses to enjoy a pleasure that has annoying consquences, or one who avoids a pain.' },
]

export const wait = async (time) => await new Promise((resolve) => setTimeout(resolve, time));

export const addedDocImages = ['134195.jpeg', '134136.jpeg', '134127.png', '138920.png', '134131.png'];