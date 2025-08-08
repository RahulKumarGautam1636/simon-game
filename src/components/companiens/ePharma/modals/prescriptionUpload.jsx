import { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { modalAction, loginStatusAction, loaderAction, userInfoAction, globalDataAction } from "../../../../actions";
import axios from "axios";
import { ProgressBar } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { BASE_URL } from "../../../../constants";
import { useFetch } from "../../default/utilities";

// import axios from "axios";
// import { JQDatePicker, createDate, getDuration, handleNumberInputs, useFetch } from "../utilities";


const PrescriptionUpload = ({ modalAction, isLoggedIn, loginStatusAction, compCode, loaderAction, userInfoAction, userInfo, globalData, globalDataAction }) => {

    const [file, setFile] = useState({});
    const [imgURL, setImgURL] = useState('');
    const [progress, setProgress] = useState({ isComplete: false, currentProgress: 0 });
    const prescription = globalData.prescription;
    const genderData = useFetch(`${BASE_URL}/api/Values/Get`, compCode)[0];
    const statesList = useFetch(`${BASE_URL}/api/Values/Get?id=1`, compCode)[0];

    useEffect(() => {						
		window.renderVenoBox();
	},[prescription.src])
  
    function handleChange(event) {
        let target = event.target.files[0];
        var url = URL.createObjectURL(target);
        setFile(target);     
        setImgURL(url);
    }
  
    function handleSubmit(event) {
        event.preventDefault()      
        // if (!isLoggedIn) return modalAction('LOGIN_MODAL', true);
        if (!file.name) return alert('Please select a file.');
        let sizeInKB = file.size / 1024;
        if (sizeInKB > 5000) {
            alert('Please select a file less than 5mb in size.');
            setFile({}); 
            setImgURL('');
            return; 
        }
        
        // ----------------------------------------------------------------- Turn on from this line to see example with server.
        // const url = 'http://localhost:3000/upload';
        // const formData = new FormData();
        // formData.append('image', file);
        // formData.append('imgName', file.name);
        // const data = { title: 'Prescription Upload', image: formData.get('image'), imgName: formData.get('imgName') };
        // const config = {
        //     headers: { 'content-type': 'multipart/form-data' },
        //     onUploadProgress: (e) => {
        //         const percentProgress = Math.round((e.loaded / e.total) * 100);
        //         setProgress(pre => ({ ...pre, currentProgress: percentProgress }));
        //     }
        // };

        // axios.post(url, data, config).then((res) => {
        //     if (res.status === 200) {
        //         setProgress(pre => ({ ...pre, isComplete: true }));
        //         globalDataAction({ prescription: { imgName: file.name, src: imgURL } });
        //         setFile({});
        //         setImgURL('');
        //         setProgress({ isComplete: false, currentProgress: 0 });
        //     } else {
        //         alert('Something went wrong. please try again.');
        //         setFile({});
        //     }            
        // });
        // ----------------------------------------------------------------- Turn on upto this line to see example with server.
        
        
        // ----------------------------------------------------------------- Keep below lines off while example with server is on.
        const verifiedMemberId = checkMember() ? patient.memberId : 0;
        globalDataAction({ 
            prescription: { 
                required: true,
                imgName: file.name, 
                extn: '.' + (file.name).split('.').pop(),
                src: imgURL, 
                patient: { ...patient, memberId: verifiedMemberId } 
            }
        });        
        setFile({});
        setImgURL('');
    } 
    
    const checkMember = () => {
        const selectedMember = JSON.stringify({
            name: userInfo.selectedMember.MemberName, 
            phone: userInfo.selectedMember.Mobile, 
            gender: { CodeId: userInfo.selectedMember.Gender, GenderDesc: userInfo.selectedMember.GenderDesc }, 
            age: userInfo.selectedMember.Age,
            memberId: userInfo.selectedMember.MemberId,
            address: userInfo.selectedMember.Address,
            city: userInfo.selectedMember.City,
            pinCode: userInfo.selectedMember.Pin,
            state: { CodeId: userInfo.selectedMember.State, Description: userInfo.selectedMember.StateDesc },
            docName: '',
            docAddress: '',
        })
        const currPatient = JSON.stringify({
            ...patient,
            docName: '',
            docAddress: '',
        })      
        return selectedMember === currPatient;
    }
    
    const initMember = { 
        name: '', 
        phone: '', 
        gender: { CodeId: '', GenderDesc: '' }, 
        age: '', 
        memberId: 0,
        address: '',
        city: '',
        pinCode: '',
        state: {Description: 'West Bengal', CodeId: 3},
        docName: '', 
        docAddress: '', 
    }

    const [patient, setPatient] = useState(initMember);
    const [defaultMember, setDefaultMember] = useState(true);

    useEffect(() => {
        if (prescription.patient.name) {
            setPatient(pre => ({ 
                ...pre,
                name: prescription.patient.name, 
                phone: prescription.patient.phone, 
                gender: { CodeId: prescription.patient.gender.CodeId, GenderDesc: prescription.patient.gender.GenderDesc }, 
                age: prescription.patient.age,
                memberId: prescription.patient.memberId,
                address: prescription.patient.address,
                city: prescription.patient.city,
                pinCode: prescription.patient.pinCode,
                state: { CodeId: prescription.patient.state.CodeId, Description: prescription.patient.state.Description },
                docName: prescription.patient.docName,
                docAddress: prescription.patient.docAddress,
            }))
        } else {
            if (!defaultMember) return;
            if (!userInfo.selectedMember.MemberId) return;
            // setDefaultMember(false);                            // control when to set by default. there are some case where we don't want it.
            setPatient(pre => ({ 
                ...pre,
                name: userInfo.selectedMember.MemberName, 
                phone: userInfo.selectedMember.Mobile, 
                gender: { CodeId: userInfo.selectedMember.Gender, GenderDesc: userInfo.selectedMember.GenderDesc }, 
                age: userInfo.selectedMember.Age,
                memberId: userInfo.selectedMember.MemberId,
                address: userInfo.selectedMember.Address,
                city: userInfo.selectedMember.City,
                pinCode: userInfo.selectedMember.Pin,
                state: { CodeId: userInfo.selectedMember.State, Description: userInfo.selectedMember.StateDesc },
                docName: prescription.patient.docName,
                docAddress: prescription.patient.docAddress,
            }))
        }					

	},[userInfo.selectedMember, prescription.patient])

    const handlePatient = (e) => {
        const  { name, value } = e.target;
        if (name === 'gender') {
            let currGender = genderData.find(i => i.CodeId == value);
            return setPatient(pre => ({ ...pre, gender: { CodeId: currGender.CodeId, GenderDesc: currGender.Description }}));
        } else if (name === 'state') {
            let currState = statesList.find(i => i.CodeId == value);
            return setPatient(pre => ({ ...pre, state: { CodeId: currState.CodeId, Description: currState.Description }}));
        }
        setPatient(pre => ({ ...pre, [name]: value}));           
    }

    const selectAnother = () => {
        globalDataAction({ prescription: { required: true, patient: { docName: '', docAddress: '' } } });
        setDefaultMember(true);
        modalAction('MEMBER_SELECT_MODAL', true);
    }

    const resetForm = () => {
        setDefaultMember(false);
        globalDataAction({ prescription: { required: true, patient: { docName: '', docAddress: '' } } });
        setPatient(initMember); 
    }

    const clearUploadedImage = () => {
        setDefaultMember(false);
        globalDataAction({ prescription: { required: true, patient: { docName: '', docAddress: '' } } });
    }

    return (
        <section className="presc-upload-box">
            <h1><i className="bx bxs-cloud-upload"></i> Upload Prescription</h1>
            <form className="presc-content" onSubmit={handleSubmit}>
                <div className="card">
                    <div className="card-header">
                        <h4>Patient Details.</h4>
                    </div>
                    <div className="card-body" style={{padding: '1.3em 1.5em'}}>
                        <div style={{fontSize: '1.1em'}}>
                            {/* <h5 className="mb-3">Patient Details.</h5> */}
                            <div style={{fontSize: '0.95em'}}>                            
                                <div className="d-flex gap-3 align-items-center mb-4">
                                    <div className="input-group flex-nowrap">
                                        <input type="text" className="form-control bg-white" placeholder="Patient Name" onChange={handlePatient} required name='name' value={patient.name} autoComplete='true' />
                                    </div>
                                    <div className="input-group flex-nowrap">
                                        <input type="text" className="form-control bg-white" placeholder="Phone Number" onChange={handlePatient} required name='phone' value={patient.phone} autoComplete='true' maxLength={10} />
                                    </div>
                                </div>
                                <div className="d-flex gap-3 align-items-center mb-4">
                                    <div className="input-group flex-nowrap">
                                        <input type="text" className="form-control bg-white" placeholder="Age" onChange={handlePatient} required name='age' value={patient.age} autoComplete='true' maxLength={2} />
                                    </div>
                                    <div className="input-group flex-nowrap">
                                        <select name="gender" value={patient.gender.CodeId} onChange={handlePatient} required tabIndex={1} className="form-control bg-white" autoComplete='true'>
                                            <option value="">- Gender -</option>
                                            {genderData.map(item => (<option key={item.CodeId} value={item.CodeId}>{item.Description}</option>))}
                                        </select>
                                    </div>
                                </div>
                                <div className="input-group flex-nowrap mb-4">
                                    <input type="text" className="form-control bg-white" placeholder="Address" onChange={handlePatient} required name='address' value={patient.address} autoComplete='true' />
                                </div>
                                <div className="d-flex gap-3 align-items-center">
                                    <div className="input-group flex-nowrap">
                                        <input type="text" className="form-control bg-white" placeholder="City" onChange={handlePatient} required name='city' value={patient.city} autoComplete='true' />
                                    </div>
                                    <div className="input-group flex-nowrap">
                                        <select name="state" value={patient.state.CodeId} onChange={handlePatient} required tabIndex={1} className="form-control bg-white" autoComplete='true'>
                                            <option value="">- State -</option>
                                            {statesList.map(item => (<option key={item.CodeId} value={item.CodeId}>{item.Description}</option>))}
                                        </select>
                                    </div>
                                    <div className="input-group flex-nowrap">
                                        <input type="text" className="form-control bg-white" placeholder="Pin Code" onChange={handlePatient} required name='pinCode' value={patient.pinCode} autoComplete='true' maxLength={6} />
                                    </div>
                                </div>
                            </div>
                            <div className="d-flex justify-content-between mt-5 gap-4">
                                <h6 onClick={resetForm} style={{color: '#007bff', cursor: 'pointer', borderBottom: '2px solid #007fff', fontSize: '0.9em', width: 'fit-content', wordSpacing: 3}}>
                                    <i className='bx bx-x' style={{color: '#007bff', fontSize: '1.9rem', verticalAlign: 'middle'}}></i> Clear All
                                </h6>
                                {isLoggedIn && <h6 onClick={selectAnother} style={{color: '#007bff', cursor: 'pointer', borderBottom: '2px solid #007fff', fontSize: '0.9em', width: 'fit-content', wordSpacing: 3}}>
                                    <i className='bx bx-plus' style={{color: '#007bff', fontSize: '1.9rem', verticalAlign: 'middle'}}></i> Select Another Patient
                                </h6>}
                            </div>
                            {/* <div className="card-body presc-img-box" style={{padding: '1em 1.5em'}}>
                                <img className="img-fluid" src="/assets/img/ePharma/presc.png" alt="prescription example" style={{boxShadow: 'rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px'}} />
                            </div> */}
                        </div>
                    </div>
                </div>

                <div className="card">
                    <div className="card-header">
                        {/* <h4>Guide for Valid prescription</h4> */}
                        <h4>Doctor Details.</h4>
                    </div>
                    <div className="card-body" style={{padding: '1.3em 1.5em'}}>
                        {/* <h5 className="mb-3">Doctor Details.</h5> */}
                        <div className="input-group flex-nowrap mb-4">
                            <span className="input-group-text" id="addon-wrapping" style={{fontSize: '1.3em'}}><i className='bx bxs-user-plus'></i></span>
                            <input type="text" className="form-control bg-white" placeholder="Doctor Name" onChange={handlePatient} required name='docName' value={patient.docName} autoComplete='true' />
                        </div>
                        <div className="input-group flex-nowrap mb-4">
                            <span className="input-group-text" id="addon-wrapping" style={{fontSize: '1.3em'}}><i className='bx bxs-map'></i></span>
                            <input type="text" className="form-control bg-white" placeholder="Address" onChange={handlePatient} required name='docAddress' value={patient.docAddress} autoComplete='true' />
                        </div>
                        {/* <p className="text-danger" style={{display: loginError.status ? 'block' : 'none'}}>{loginError.message}</p>
                        <Link to='#' onClick={() => setTabActive('forgotPassword')} className='text-primary'>Forgot Password ?</Link>*/}
                        
                        {!prescription.imgName ? <>
                            <h5>Please select clean and valid image of prescription.</h5>
                            <div>
                                {imgURL ? 
                                <div className="d-flex gap-4 py-4">
                                    <div className="img-preview">
                                        <i className='bx bx-x delete' onClick={() => {setFile({}); setImgURL('')}}></i>
                                        {
                                            (file.name).split('.').pop() === 'pdf' ?
                                                <>
                                                    <embed src={imgURL} className="d-none d-lg-block" />
                                                    <div className="d-flex align-items-center rounded-4 p-3 d-lg-none" style={{height: '7em', background: '#e7e7e7', padding: '1em', border: '1px solid #cdcdcd'}}>No Preview Available</div>
                                                </>
                                            :
                                            <img src={imgURL} alt="Uploaded content"/>
                                        }
                                    </div>
                                    <h5 style={{fontFamily: 'Lato', fontSize: '1em', lineHeight: '1.6em'}}>{file.name}</h5>
                                </div>
                                :
                                <div className="upload-box">
                                    <label className="upload-item" htmlFor="img-input">
                                        <i className="bx bx-file"></i>
                                        <p className="mb-0">click to select</p>
                                    </label>
                                </div>}
                                <input type="file" className="d-none" onChange={handleChange} accept="image/png, image/jpeg, image/jpg, application/pdf, .doc, .docx" name="image" id="img-input"/>
                            </div>
                            {progress.currentProgress === 0 || progress.currentProgress === 100 ? '' : <ProgressBar variant="info" now={progress.currentProgress} style={{margin: '1rem 0 1.5rem'}} />}
                            {/* <p>Always upload clean version of the prescription to get better results.</p> */}
                            {/* {progress.isComplete ? <p className="text-danger">Successfully uploaded your prescription.</p> : ''} */}
                            {/* {progress.isComplete ? 
                            <button onClick={() => modalAction('PRESCRIPTION_MODAL', false)} className="add-to-cart d-block ms-auto" style={{padding: '0.8em 3em'}}>Close</button> :  */}
                            <button type="submit" className="add-to-cart d-block ms-auto" style={{padding: '0.8em 3em'}}>
                                {(progress.currentProgress === 0 || progress.currentProgress === 100) ? 'Upload File' : 'Uploading...'}
                            </button>
                            {/* }    */}
                        </>
                        :
                        <>
                            <h5>Your uploaded prescription.</h5>
                            <div>
                                <div className="d-flex gap-4 py-4">
                                    <div className="img-preview">
                                        <div className="zoom-img">
                                            <i className='bx bx-search search'></i>
                                        </div>
                                        <i className='bx bx-x delete' onClick={clearUploadedImage}></i>
                                        {
                                            prescription.extn === '.pdf' ?
                                                <>
                                                    <embed src={prescription.src} className="d-none d-lg-block" />
                                                    <div className="d-flex align-items-center rounded-4 p-3 d-lg-none" style={{height: '8em', background: '#e7e7e7', padding: '1em', border: '1px solid #cdcdcd'}}>No Preview Available</div>
                                                </>
                                            :
                                            <a className="popup-img venobox vbox-item d-flex justify-content-center" href={prescription.src} data-gall="myGallery">
                                                <img src={prescription.src} alt="Uploaded content"/>
                                            </a>
                                        }
                                    </div>
                                    <h5 style={{fontFamily: 'Lato', fontSize: '1em', lineHeight: '1.6em'}}>{prescription.imgName}</h5>
                                </div>
                            </div> 
                            <p style={{color: '#00a743'}} onClick={() => window.renderVenoBox()}>Your Prescription is uploaded Successfully.</p>
                            <div className="d-flex gap-4 justify-content-end">
                                <Link to={'/checkout'} onClick={() => modalAction('PRESCRIPTION_MODAL', false)} className="add-to-cart flex-1" style={{padding: '0.8em 3em'}}>Checkout</Link> 
                                <button onClick={() => modalAction('PRESCRIPTION_MODAL', false)} className="add-to-cart flex-1" style={{padding: '0.8em 3em'}}>Close</button> 
                            </div>
                        </> 
                        }
                    </div>
                    <div className="card-footer" style={{baackground: '#f1f1f1'}}>
                        <h5>Ensure Clear Doctor signature & stamp</h5>
                        <p className="mb-0">The prescription with a signature and/or stamp of the doctor is considered as valid.</p>
                    </div>
                </div>
            </form>
        </section>
    )
}

const mapStateToPrescriptionUpload = (state) => {
    return { isLoggedIn: state.isLoggedIn, compCode: state.compCode, userInfo: state.userInfo, globalData: state.globalData };
}

export default connect(mapStateToPrescriptionUpload, {modalAction, loginStatusAction, loaderAction, userInfoAction, globalDataAction})(PrescriptionUpload);


