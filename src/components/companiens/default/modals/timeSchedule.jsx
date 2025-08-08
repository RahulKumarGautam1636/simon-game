
import { useState, useEffect } from "react";
import Form from "react-bootstrap/Form"; 
import { getFrom, Spinner, handleIsoDate, ButtonSlider, JQDatePicker } from '../utilities';
import { TimePicker } from 'react-ios-time-picker';
import { connect } from 'react-redux';
import Select from 'react-select';
import axios from "axios";
import { modalAction, loaderAction } from "../../../../actions";
import Skeleton from "react-loading-skeleton";
import { BASE_URL } from "../../../../constants";

const TimeSchedule = ({ userInfo, bookingInfo, compCode, modalAction, loaderAction }) => {
  const [selectedDays, setSelectedDays] = useState([{ value: new Date().toLocaleDateString('en-US', { weekday: 'long'}), label: new Date().toLocaleDateString('en-US', { weekday: 'long'}) }]);
  const [schedule, setSchedule] = useState({loading: false, data: {TimeScheduleList: []}, err: {status: false, msg: ''}});
  const [tabListData, setTabListData] = useState([]);
  const [activeDate, setActiveDate] = useState({TimeSlotList: []});
  const [selected, setSelected] = useState({date: '', slot: '', type: ''});
  const [pickerActive, setPickerActive] = useState(false);
  const [isCreatingSlots, setIsCreatingSlots] = useState(false);
  const [viewOnly, setViewOnly] = useState(false);
  const [formData, setFormData] = useState({
    
    TranType: "OPD",
    PartyId: "",
    PartyDesc: "",
    CompanyId: "",
    UserId: "",
    FromDate: new Date().toLocaleDateString('en-TT'),
    ToDate: new Date(new Date().setDate(new Date().getDate() + 10)).toLocaleDateString('en-TT'),
    Days: "Monday, Friday",
    InTime: "10:00 AM",
    OutTime: "02:00 PM",
    TotalSlots: "1",
    TimePerSlot: "",
    PtAllocPerSlot: "1",
    MaxPtAlloc: "",
    ShiftType: 'DAY'
  }); 

  const getMinutes = () => {
    var startTime = new Date(`${new Date().toISOString().substr(0, 10)} ${formData.InTime}`);           // 2023-09-13 11:30 AM
    var endTime = new Date(`${new Date().toISOString().substr(0, 10)} ${formData.OutTime}`);            // 2023-09-13 20:00 PM
    var difference = endTime.getTime() - startTime.getTime();
    var resultInMinutes = Math.round(difference / 60000);
    return { hours: Math.floor(resultInMinutes / 60), minutes: resultInMinutes % 60, totalMinutes: resultInMinutes };
  }

  useEffect(() => {
    setFormData(pre => ({ ...pre, TimePerSlot: getMinutes().totalMinutes / parseInt(pre.TotalSlots), MaxPtAlloc: parseInt(pre.TotalSlots) * parseInt(pre.PtAllocPerSlot) }));
  },[formData.TotalSlots, formData.PtAllocPerSlot, formData.InTime, formData.OutTime])

  useEffect(() => {
    setFormData(pre => ({...pre, PartyId: bookingInfo.Doctor.PartyCode, PartyDesc: bookingInfo.Doctor.Name, UserId: userInfo.UserId, CompanyId: compCode }));             // using pre is important to ensure all useEffects will get latest updated value of states from each other. otherwise they will take state directly 
  },[schedule])  

  useEffect(() => {
    const days = selectedDays.map(i => i.value).join();
    setFormData(pre => ({...pre, Days: days }));
  },[selectedDays])

  const handleBookingFormSubmit = () => {}
  
  const handleFormInputs = (e) => {
    const { name, value} = e.target;
    setFormData({...formData, [name]: value});
  }

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!isCreatingSlots) {
      handleScheduleSubmit();
    } else {
      getSchedule(formData);
    }
  }

  const getSchedule = async (params) => {
    const res = await getFrom(`${BASE_URL}/api/TimeSchedule/Get`, params, setSchedule);
    if (res) {
      setTimeout(() => {
        setSchedule(res);
        setActiveDate(res.data.TimeScheduleList[0]);
        setSelected({date: res.data.TimeScheduleList[0].SDate, slot: ''});
        setTabListData(res.data.TimeScheduleList); 
      }, 1000);
    }
  }   

  const getDateSlotsList = (sDate) => {
    if (sDate) {         
      const newSlotList = schedule.data.TimeScheduleList.filter(i => i.SDate === sDate)[0];
      loaderAction(true);
      setTimeout(() => {
        setActiveDate(newSlotList);
        loaderAction(false);
      },[1000])
    } 
  }

  const options = [
    { value: 'Monday', label: 'Monday' },
    { value: 'Tuesday', label: 'TuesDay' },
    { value: 'Wednesday', label: 'Wednesday' },
    { value: 'Thursday', label: 'Thursday' },
    { value: 'Friday', label: 'Friday' },
    { value: 'Saturday', label: 'Saturday' },
    { value: 'Sunday', label: 'Sunday' },
  ];

  const handlePicker = (val) => {
    setSchedule(pre => {
      let newSchedule = [ ...schedule.data.TimeScheduleList ];                          // Take state as value otherwis e direct use of state (pass by reference) will mutate the original state (schedule) when we make changes to newSchedule.
      let targetSlot;
      let targetDate = newSchedule.filter(i => i.SDate === selected.date)[0];
      if (selected.type === 'inTime') {
        targetSlot = targetDate.TimeSlotList.filter(i => i.SInTimeStr === selected.slot)[0];
        targetSlot.SInTime = handleIsoDate(targetSlot.SInTime, val);
        targetSlot.SInTimeStr = val;
      } else if (selected.type === 'outTime') {
        targetSlot = targetDate.TimeSlotList.filter(i => i.SOutTimeStr === selected.slot)[0];
        targetSlot.SOutTime = handleIsoDate(targetSlot.SInTime, val);
        targetSlot.SOutTimeStr = val;
      }
      return {...pre, data: {TimeScheduleList: newSchedule}};
    })
    setPickerActive(false);
  }

  const renderDateSlotsList = (data) => {                       
    return (
      data.TimeSlotList.map(item => {
        return (
          <span key={item.SInTimeStr} className={`dateSlot btn my-2 me-1 btn-secondary selectedSlotDate}`}>
            <span onClick={() => {setSelected({date: item.SDate, slot: item.SInTimeStr, type: 'inTime'});setPickerActive(true)}}>{item.SInTimeStr}</span>
              -
            <span onClick={() => {setSelected({date: item.SDate, slot: item.SOutTimeStr, type: 'outTime'});setPickerActive(true)}}>{item.SOutTimeStr}</span>
          </span>
        )
      })
    )
  }

  const handleScheduleSubmit = () => {
    makeScheduleSubmitRequest(schedule.data.TimeScheduleList);
  }
  
  const makeScheduleSubmitRequest = async (params) => {
    loaderAction(true);
    const res = await axios.get(`${BASE_URL}/api/TimeSchedule/Get`, params);
    loaderAction(false);
    if (res.status === 200) {
      alert('Shedule submitted successfully !');
      modalAction('SCHEDULE_MODAL', false);
    } else {
      alert('Something went wrong, try again later.');
    }
  }

  const tabList = tabListData.map((item, index) => {                     // State driven variable. Using useMemo to prevents it's recalculation on every page render to prevent resetting on tab carousel.
    return (
      <button onClick={() => getDateSlotsList(item.SDate)} key={item.SDate} type="button" id='tabButtons-1' className={`nav-item nav-link d-flex justify-content-center align-items-center ${index === 0 ? 'active' : ''} slotDate`} data-bs-toggle="tab" data-bs-target='#tabButtons-pane-1' role="tab" aria-controls='tabButtons-pane-1' aria-selected="true">
          <h5 style={{fontSize: 'clamp(1em, 3.8vw, 1.4em)', margin: '0 2px 0 0', fontWeight: 'bold'}}>{item.Day}</h5>
          <div>
            <span className="p d-block mb-0 nMonth" style={{lineHeight: '1.25em', fontSize: 'clamp(0.4em, 1.9vw, 0.7em)'}}>{item.Month}</span>
            <span className="p d-block mb-0 text-capitalize nDay" style={{lineHeight: '1.2em', fontSize: 'clamp(0.4em, 1.9vw, 0.7em)'}}>{item.DName.substring(0, 3)}</span>
          </div>
          {/* <span className="p d-block nTiming" style={{lineHeight: '1.25em', fontSize: 'clamp(0.4em, 1.9vw, 0.7em)'}}>{item.SInTimeStr} - {item.SOutTimeStr}</span> */}
      </button>
    )
  })

  const renderTabCarousel = () => {                           // since this function is used directly in jsx hence whenever any of this componenets state change forces this to rerender hence using 
    if (schedule.loading) {                                           // useMemo to force it's rerendering only when schedule changes, not on any other state changes.
      // return <Spinner min_height="7rem"/>;
      return <div className='w-100'><Skeleton count={3}/></div>;
    } else if (schedule.err.status) {
      return <div className='text-center my-5'><h2 className="text-danger mark">An error occured, please try again later. Error code: <span className='text-dark'>{schedule.err.msg}</span></h2></div>;
    } else if (schedule.data.TimeScheduleList.length === 0) {
        return <h4 className="card-title my-2">No Appoinment Dates found</h4>;
    } else {
      return <div className="nav nav-tabs pt-2 pb-1 px-3 d-block" role="tablist" style={{borderBottom: 'none'}}><ButtonSlider dataList={tabList} responsive={[{ breakpoint: 880, settings: { slidesToShow: 5} }]}/></div>;
    }
  }

  const renderShift = (data) => {
    if (schedule.loading) {                         
      return <div className='w-100'><Skeleton count={7}/></div>;
    } else {
      return (
        <div className="col-12 d-flex justify-content-between align-items-center flex-wrap pt-2 position-relative gap-1" style={{maxHeight: "12.2rem", minHeight: '5rem', overflowY: "auto", padding: '0 1px 0 1px'}}>
          {renderDateSlotsList(data)}
        </div>
      )
    }
  }

  const RenderBookingModal = () => {
    return (
      <form className="bg-white rounded tabs-carousel" onSubmit={handleBookingFormSubmit} id="schedule-form">
        <div className="row mb-2">
          <div className="col-12">
            <nav className="pt-1 button-carousel" style={{fontSize: '0.9em'}}>
              {renderTabCarousel()}
            </nav>
            <div className="tab-content pt-0">
              <div id='tabButtons-pane-1' className='tab-pane active show'  role="tabpanel" aria-labelledby="tabButtons-1">
                <ul className="nav nav-tabs icon-btn-box" role="tablist">
                  <li className="nav-item" role="presentation">
                    <button type="button" id="shift-1" className={`btn-item active`}><i className="icofont-sun" style={{color: '#e58b06'}}></i> {formData.ShiftType} <span className="p d-block nTiming" style={{lineHeight: '1.25em', fontSize: 'clamp(0.4em, 1.9vw, 0.7em)', fontWeight: 'normal'}}>{activeDate.SInTimeStr} - {activeDate.SOutTimeStr}</span></button>
                  </li>
                </ul>
                <div className="tab-content pt-0" style={{pointerEvents: viewOnly && 'none'}}>
                  <div id="shift-pane-1" className={`tab-pane fade show active`} role="tabpanel" aria-labelledby="shift-1">
                    {renderShift(activeDate)}
                  </div>
                </div>                
              </div>
            </div>   
          </div> 
        </div>
      </form>
    )
  }

  return (
    <section className="position-relative">
      <div className="d-flex gap-4" style={{position: 'absolute', top: '3px', right: 0, zIndex: 1111, fontSize: '1.1em'}}>
        <i className="icofont-eye-alt" role="button" onClick={() => setViewOnly(true)} style={{color: viewOnly ? 'orangered' : 'var(--clr-30)'}}></i>
        <i className="icofont-ui-edit" role="button" onClick={() => setViewOnly(false)} style={{color: viewOnly ? 'var(--clr-30)' : 'orangered'}}></i>
        <i className="icofont-close-circled" role="button" onClick={() => modalAction('SCHEDULE_MODAL', false)} style={{fontWeight: 'bold'}}></i>
      </div>
      {pickerActive && <div className="picker-overlay" onClick={() => setPickerActive(false)}></div>}
      {pickerActive && <TimePicker isOpen={true} onChange={(value) => handlePicker(value)} value={selected.slot} use12Hours/>}
      {!viewOnly && <div className="row">
        <form onSubmit={handleFormSubmit} >
          <h4 className="card-title">Time Schedule Creation:-</h4>
          <div className="row gx-2 schedule-form">
            <div className="col-md-3 col-4">
              <div className="form-group form-focus focused">
                <label className="focus-label">
                  <b className="text-danger">* </b>Category
                </label>
                <select name="TranType" required onChange={handleFormInputs} value={formData.TranType} tabIndex={1} className="form-control">
                  <option value>-Select-</option>
                  <option value="1">Category 1</option>
                </select>
              </div>
            </div>
            <div className="col-md-9 col-8">
              <div className="form-group form-focus focused">
                <label className="focus-label"> <b className="text-danger">* </b>Name </label>
                <input name="PartyDesc" className="form-control floating" onChange={handleFormInputs} value={formData.PartyDesc} tabIndex={1} type="text" id="txtPName" autoComplete="off" required />
              </div>
            </div>
            <div className="col-md-12 col-12">
              <div className="form-group form-focus focused">
                <Select value={selectedDays} placeholder="Day" onChange={setSelectedDays} required closeMenuOnSelect={false} options={options} isMulti className="multi-select" />
              </div>
            </div>
            <div className="col-md-3 col-6">
              <div className="form-group form-focus focused">
                <label className="focus-label"> <b className="text-danger">* </b>From Date </label>
                {/* <Form.Control className="" type="date" name="FromDate" onChange={handleFormInputs} required value={formData.FromDate} placeholder="DateRange"/> */}
                <JQDatePicker id={'FromDate'} isRequired={true} setState={setFormData} curValue={formData.FromDate} name={'FromDate'} customClass={'form-control'} required />
              </div>
            </div>
            <div className="col-md-3 col-6">
              <div className="form-group form-focus focused">
                <label className="focus-label"> <b className="text-danger">* </b>To Date</label>
                {/* <Form.Control className="" type="date" name="ToDate" onChange={handleFormInputs} required value={formData.ToDate} placeholder="DateRange"/> */}
                <JQDatePicker id={'ToDate'} isRequired={true} setState={setFormData} curValue={formData.ToDate} name={'ToDate'} customClass={'form-control'} required />
              </div>
            </div>
            <div className="col-md-3 col-6">
              <div className="form-group form-focus focused">
                <label className="focus-label">From Time</label>
                <TimePicker inputClassName="form-control" onChange={(val) => setFormData({...formData, InTime: val})} required value={formData.InTime} use12Hours/>
              </div>
            </div>
            <div className="col-md-3 col-6 has-label">
              <div className="form-group form-focus focused">
                <label className="focus-label">To Time</label>
                <TimePicker inputClassName="form-control" onChange={(val) => setFormData({...formData, OutTime: val})} required value={formData.OutTime} use12Hours/>
              </div>
              {getMinutes().totalMinutes !== 0 && <p>Total: {getMinutes().hours} : {getMinutes().minutes} hours </p>}
            </div>
            <div className="col-4 col-md-3">
              <div className="form-group form-focus focused">
                <label className="focus-label">
                  <b className="text-danger">* </b>Type
                </label>
                <select name="ShiftType" required onChange={handleFormInputs} value={formData.ShiftType} tabIndex={1} className="form-control">
                  <option value="MORNING">MORNING</option>
                  <option value="DAY">DAY</option>
                  <option value="EVENING">EVENING</option>
                </select>
              </div>
            </div>
            <div className="col-4 col-md-3 has-label" style={{transform: isCreatingSlots ? 'scaleY(1)' : 'scaleY(0)', transition: '0.4s ease-in-out'}}>
              <div className="form-group form-focus focused">
                <label className="focus-label">No of Slots</label>
                <input name="TotalSlots" className="form-control floating" onChange={handleFormInputs} value={formData.TotalSlots} tabIndex={1} type="text"/>
              </div>
              <p style={{visibility: !isNaN(formData.TimePerSlot) ? 'visible' : 'hidden'}}>Time per Slot: {formData.TimePerSlot}</p>
            </div>
            <div className="col-4 col-md-3 has-label" style={{transform: isCreatingSlots ? 'scaleY(1)' : 'scaleY(0)', transition: '0.4s ease-in-out'}}>
              <div className="form-group form-focus focused">
                <label className="focus-label">Patient Per Slot</label>
                <input name="PtAllocPerSlot" className="form-control floating" onChange={handleFormInputs} value={formData.PtAllocPerSlot} tabIndex={1} type="text" />
              </div>
              <p style={{visibility: !isNaN(formData.MaxPtAlloc) ? 'visible' : 'hidden'}}>Max Patient: {formData.MaxPtAlloc}</p>
            </div>
            <div className="col-md-3 col-4 d-none">
              <div className="form-group form-focus focused">
                <label className="focus-label">Time Per Slot</label>
                <input name="TimePerSlot" className="form-control floating" onChange={handleFormInputs} value={formData.TimePerSlot} tabIndex={1} type="text" id="txtRegNo" />
              </div>
            </div>
            <div className="col-md-3 col-4 d-none">
              <div className="form-group form-focus focused">
                <label className="focus-label">Max Patient</label>
                <input name="MaxPtAlloc" className="form-control floating" onChange={handleFormInputs} value={formData.MaxPtAlloc} tabIndex={1} type="text" id="txtQualification" />
              </div>
            </div>
            <div className="col-12 col-md-3 position-relative pt-2" style={{fontSize: '0.9em'}}>
              <button type="submit" className="btn btn-primary d-block btnSave ms-auto fw-bold text-nowrap" tabIndex={1} id="btnSave">{isCreatingSlots ? 'CREATE' : 'SUBMIT'}</button>
              {!isCreatingSlots && <span style={{fontSize: '0.95em', fontWeight: '500', position: 'absolute', right: '0', top: '15%', transform: 'translateX(-100%)', color: '#606060'}} onClick={(e) => setIsCreatingSlots(true)}><i style={{fontSize: '1.5em', verticalAlign: 'sub', color: '#dc39d1', fontWeight: '500'}} className='bx bx-alarm-add'></i>  CREATE SLOTS </span>}
            </div>
          </div>
        </form>
      </div>}
      {(isCreatingSlots || viewOnly) && <div className="row">
        <div className="col-12">
          <div className="card card-table mb-0" style={{boxShadow: 'none'}}>
            <div className="card-header px-0 pt-0 pt-lg-1 pb-1 d-flex gap-2 align-items-baseline">
              <h4 className="card-title text-nowrap">{bookingInfo.Doctor.Name} </h4>{bookingInfo.Doctor.SpecialistDesc !== '' && <span style={{fontSize: '0.75em'}}>({bookingInfo.Doctor.SpecialistDesc})</span>}
            </div>
            <div className="card-body">
              {RenderBookingModal()}
              {!viewOnly &&  <div className="card-footer d-flex justify-content-between px-0" style={{gap:  '4%'}}>
                <button type="button" className="btn btn-primary d-block btnSave fw-bold" tabIndex={1} style={{ maxWidth: "10rem", width: '48%' }} > DELETE </button>
                <button type="button" className={`btn ${schedule.data.TimeScheduleList.length === 0 ? 'btn-secondary opacity-50 pe-none' : 'btn-primary'} d-block btnSave fw-bold`} tabIndex={1} style={{ maxWidth: "10rem", width: '48%' }} onClick={handleScheduleSubmit}> SUBMIT </button>
              </div>}
            </div>
          </div>
        </div>
      </div>}
    </section>
  );
}

const mapStateToTimeSchedule = (state) => {
  return { compCode: state.compCode, isLoggedIn: state.isLoggedIn, userInfo: state.userInfo, bookingInfo: state.bookingInfo };
}

export default connect(mapStateToTimeSchedule, {loaderAction, modalAction })(TimeSchedule);


