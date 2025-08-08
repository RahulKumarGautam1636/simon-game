import { useState } from "react";
import { connect } from "react-redux";
import { getFormattedDate, getFrom } from "./utilities";
import { Spinner } from './utilities';
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { BASE_URL } from "../../../constants";

const BedStatus = ({ match, compCode, userInfo }) => {

    const [data, setData] = useState({loading: true, data: { AccPartyMasterList: [], AccSubgroupObj: {}, PartyMasterObj: {} }, err: {status: false, msg: ''}});
    // const history = useHistory();

    useEffect(() => {
        getData(userInfo.selectedCompany.EncCompanyId)
    }, [userInfo.selectedCompany.EncCompanyId])

    const getData = async (companyId) => {
        if (companyId) {
          const res = await getFrom(`${BASE_URL}/api/Appointment/GetBedMaps?CID=${companyId}`, {}, setData);
          if (res) {
            setTimeout(() => {
                setData(res);            
            }, 400)
          }
        }
    }

    const renderBedGroup = (groupId, groupName, data) => {
        const groupItems = data.filter(i => i.BedGroupId === groupId);
        return (
            <div className="bed-group-box" key={groupId}>
                <div className="card border-0 w-100">
                    <h3 className="card-header border-info bg-transparent">{groupName} <span style={{fontSize: '0.7rem'}}></span></h3>             
                    <div className="card-body">
                        {groupItems.map(i => (
                            <div className="bed-card" key={i.BedId}>                 {/* title={i.Symptoms ? `${i.Name} (${i.Symptoms})` : i.Name} */}
                                <div style={{minWidth: 'fit-content', width: '7.3em', paddingTop: '0.6em', paddingBottom: '0.6em'}} className={`companyTabCard d-flex position-relative cursor-pointer`} >
                                    {i.PartyCode === 0 ? <img src="./img/emptyBed.svg" style={{marginTop: 4, maxHeight: '1.9em'}} alt='Empty Bed'/> : <img src="./img/occupiedBed.svg" style={{marginTop: 4, maxHeight: '1.9em'}} alt='Occupied Bed'/>}
                                    <div className=''>
                                        <h5 className="mb-0">{i.BedDesc}</h5>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )
    }

    const renderData = (data) => {

        var bedGroupIdList = [...new Map(data.data.AccPartyMasterList.map(item => [item['BedGroupId'], item])).values()]; 


        if (data.loading) {
            return <Spinner min_height='31rem' fSize='2rem'/>;
        } else if (data.err.status) {
            return <h2 className="text-danger mark">An error occured, please try again later. Error code: <span className="text-dark d-inline">{data.err.msg}</span></h2>;
        } else if (data.data.AccPartyMasterList.length === 0) {
            return <h2 className="text-danger py-2">No Data Received !</h2>;
        } else {
            return bedGroupIdList.map(i => renderBedGroup(i.BedGroupId, i.BedGroupDesc, data.data.AccPartyMasterList));
        //   return data.data.AccPartyMasterList.map((item, index) => {
        //     return (
        //         <div className="bed-card" key={index}>
        //             <div style={{minWidth: 'fit-content', width: '7rem', paddingTop: '0.6em', paddingBottom: '0.6em'}} className={`companyTabCard d-flex position-relative cursor-pointer`} >
                        
        //                 {item.PartyCode === 0 ? <svg 
        //                     width="50px"
        //                     height="46px"
        //                     style={{ fill: "#12b712", marginTop: 4, maxHeight: '1.9em', marginRight: '.8em' }}
        //                     viewBox="0 0 24 24"
        //                     xmlns="http://www.w3.org/2000/svg"
        //                     >
        //                     <path d="m22.102 11.147v1.731h-20.198v-6.206h-1.904v12.414h1.904v-2.837h20.198v3.074h1.898v-8.178z" />
        //                     <path d="m8.709 11.165v.001c0 .564-.457 1.022-1.022 1.022h-.001-3.892-.001c-.564 0-1.022-.457-1.022-1.022v-.001-.001c0-.564.457-1.022 1.022-1.022h.001 3.892.001c.564 0 1.022.457 1.022 1.022z" />
        //                     <path d="m19.743 7.164h-2.37v-2.364h-1.68v2.365h-2.365v1.68h2.364v2.365h1.68v-2.365h2.37z" />
        //                 </svg> 
        //                 : 
        //                 <svg
        //                     width="50px"
        //                     height="46px"
        //                     style={{ color: "red", marginTop: 4, maxHeight: '1.9em', marginRight: '.8em' }}
        //                     viewBox="0 0 64 64"
        //                     xmlns="http://www.w3.org/2000/svg"
        //                     xmlnsXlink="http://www.w3.org/1999/xlink"
        //                     aria-hidden="true"
        //                     role="img"
        //                     className="iconify iconify--medical-icon"
        //                     preserveAspectRatio="xMidYMid meet"
        //                     >
        //                     <path
        //                         d="M10.643 35.727a4.233 4.233 0 0 1 4.24-4.235a4.236 4.236 0 0 1 4.242 4.235a4.241 4.241 0 0 1-8.482 0z"
        //                         fill="currentColor"
        //                     />
        //                     <path
        //                         d="M51.597 33.133c1.865 0 3.371 1.462 3.387 3.313l.007 8.944H20.958V33.142l30.639-.009z"
        //                         fill="currentColor"
        //                     />
        //                     <path
        //                         d="M17.039 45.383c1.151 0 2.086-.935 2.086-2.086s-.935-2.086-2.086-2.086h-6.03a2.083 2.083 0 0 0-2.084 2.086c0 1.151.928 2.086 2.084 2.086h6.03z"
        //                         fill="currentColor"
        //                     />
        //                     <path
        //                         d="M57.009 54.179v9.327h5.523V33.928a2.756 2.756 0 0 0-2.755-2.759a2.764 2.764 0 0 0-2.768 2.759v13.575H7.42V28.348c0-1.523-1.328-2.762-2.855-2.762v.002c-1.522 0-2.721 1.237-2.721 2.759v35.158h5.575v-9.327h49.59z"
        //                         fill="currentColor"
        //                     />
        //                     <path
        //                         d="M39.508.14c1.767 0 4.661.743 6.271 2.505l-2.17 4.168a5.17 5.17 0 0 0-4.101-2.014c-1.649 0-3.116.77-4.065 1.973L33.23 2.737C35.093.873 37.669.139 39.508.139zm-.625 4.2h1.238V3.101h1.239V1.865h-1.239V.627h-1.238v1.238h-1.237v1.236h1.237V4.34z"
        //                         fill="currentColor"
        //                     />
        //                     <path
        //                         d="M43.482 10.248a3.982 3.982 0 1 1-7.965 0a3.982 3.982 0 0 1 7.965 0z"
        //                         fill="currentColor"
        //                     />
        //                     <path
        //                         d="M35.67 15.365c-2.784.015-4.397 2.274-4.76 3.55l-3.392 11.133h3.433l2.5-8.542h1.779l-2.493 8.54h13.507l-2.475-8.54h1.778l2.566 8.542h3.382L48.09 18.915c-.362-1.26-1.941-3.476-4.664-3.544l-7.756-.006z"
        //                         fill="currentColor"
        //                     />
        //                     <path
        //                         d="M10.293 17.925c-4.888 0-8.86-3.974-8.86-8.862c0-4.889 3.971-8.864 8.86-8.864c4.886 0 8.864 3.976 8.864 8.864c0 4.888-3.979 8.862-8.864 8.862zm-.003-2.194c3.678 0 6.672-2.991 6.672-6.67c0-3.675-2.993-6.671-6.672-6.671c-3.676 0-6.665 2.995-6.665 6.671c0 3.68 2.989 6.67 6.665 6.67z"
        //                         fill="currentColor"
        //                     />
        //                     <path
        //                         d="M10.338 10.233a.662.662 0 0 1-.639-.048a.66.66 0 0 1-.296-.46l-.009-5.151a.667.667 0 0 1 1.333 0V8.57l3.416-1.609a.666.666 0 0 1 .566 1.204l-4.372 2.067z"
        //                         fill="currentColor"
        //                     />
        //                 </svg>}

        //                 <div className=''>
        //                     <h5 className="mb-0">{item.BedDesc}</h5>
        //                 </div>
        //             </div>
        //         </div>
        //     )
        //   })
        }
    }



    // const prescriptionPage = (item) => {
    //     const pharmacy = item.PrescriptionDetailsList.filter(i => i.Category === "PHARMACY");
    //     const investigations = item.PrescriptionDetailsList.filter(i => i.Category === "INVESTIGATION");
    //     return (
    //         <></>       
    //     )
    // }

    return (
        <section className="container pt-3">
            <h4 className="card-title mb-2">{userInfo.selectedCompany.COMPNAME}</h4>
            <p style={{color: 'blue'}}>( Bed Status )</p>
            <div className="bed-container container" id="printContent" style={{width:'100%'}}>
                {renderData(data)}
            </div>

        </section>
    )
}

const mapStateBedStatus = (state) => {
	return { userInfo: state.userInfo };
}
  
export default connect(mapStateBedStatus, {})(BedStatus);

