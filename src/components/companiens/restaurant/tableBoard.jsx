import { useState } from "react";
import { connect, useSelector } from "react-redux";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import { globalDataAction, modalAction } from "../../../actions";
import { getFrom } from "../ePharma/utilities";
import { BASE_URL } from "../../../constants";
import qs from 'query-string';

const TableBoard = ({ match, userInfo, modalAction, globalDataAction, globalData }) => {

    const queryString = qs.parse(window.location.search, { ignoreQueryPrefix: true, decode: false });
    const bedId = queryString.BedId || '';
    let tableAutoSelect = globalData.restaurant.table?.autoSelect;

    const [data, setData] = useState({loading: true, data: { AccPartyMasterList: [], AccSubgroupObj: {}, PartyMasterObj: {} }, err: {status: false, msg: ''}});
    const history = useHistory();

    useEffect(() => {
        if (tableAutoSelect) modalAction('TABLE_SELECTION_MODAL', false);
    }, [tableAutoSelect])

    useEffect(() => {
        getData(userInfo.selectedCompany.EncCompanyId, globalData.location.LocationId)
    }, [userInfo.selectedCompany.EncCompanyId, globalData.location.LocationId])

    const getData = async (companyId, LID) => {
        if (companyId) {
          const res = await getFrom(`${BASE_URL}/api/values/GetRBT?CID=${companyId}&LID=${LID}&Type=TableCategory`, {}, setData);
          if (res) {                     
            setData({loading: false, data: { AccPartyMasterList: res.data, AccSubgroupObj: {}, PartyMasterObj: {} }, err: {status: false, msg: ''}});                       
          }
        }
    }      

    useEffect(() => {
        const onBackClick = (event) => {
            modalAction('TABLE_SELECTION_MODAL', false);
        }                                                                                                                  
        window.addEventListener("popstate", onBackClick);
        return () => window.removeEventListener("popstate", onBackClick);                               
    }, [])
    
    const handleSelect = (item, autoSelectable=false) => {
        let requiredFields = {
            BedDesc: item.BedDesc,
            BedGroupDesc: item.BedGroupDesc,
            BedGroupId: item.BedGroupId,
            BedId: item.BedId,
            ChkInActive: item.ChkInActive,
            ChkoutActive: item.ChkoutActive,
            ProvInvBillid: item.ProvInvBillid,
            ProvBalAmt: item.ProvBalAmt,
            ProvVoucherAmount: item.ProvVoucherAmount
        }
        globalDataAction({ restaurant: { table: { ...requiredFields, autoSelect: autoSelectable } }});
        modalAction('TABLE_SELECTION_MODAL', false);
        history.push('/checkout');
    }

    useEffect(() => {
        if (!data.data.AccPartyMasterList.length || !bedId) return;
        const table = data.data.AccPartyMasterList.find(i => i.BedId == bedId);
        if (!table) {
            modalAction('TABLE_SELECTION_MODAL', false);
            globalDataAction({ restaurant: { table: { autoSelect: false } }});
            resetUrl()
            alert('Invalid table selection.')
        } else {
            if (table.ProvInvBillid) {
                modalAction('TABLE_SELECTION_MODAL', false);
                globalDataAction({ restaurant: { table: { autoSelect: false } }});
                resetUrl()
                alert('This Table has already active orders.')
                return;
            }
            handleSelect(table, true);
        }
    }, [data.data.AccPartyMasterList, bedId])

    function resetUrl() {
        const hash = window.location.hash.split('#')[1] || '';
        const newUrl = `${window.location.origin}/?CID=${queryString.CID}#${hash}`;
        window.history.replaceState({}, '', newUrl);
    }

    const renderBedGroup = (groupId, groupName, data) => {
        const groupItems = data.filter(i => i.BedGroupId === groupId);
        return (
            <div className="bed-group-box table-group" key={groupId}>
                <div className="card border-0 w-100 mb-0">
                    <h5 className="card-header border-info bg-transparent">{groupName} <span style={{fontSize: '0.7rem'}}></span></h5>             
                    <div className="card-body">
                        {groupItems.map(i => (
                            <div className={`bed-card ${i.ProvInvBillid && 'active'}`} key={i.BedId} onClick={() => handleSelect(i)}>               
                                <div className={`companyTabCard d-flex position-relative cursor-pointer gap-0 gap-md-1`}>
                                    <h5 className="mb-0 ms-auto">{i.BedDesc}</h5>
                                    <i className="icofont-dining-table" style={{fontSize: '3em', color: i.ProvInvBillid === 0 ? '#0baf0b' : 'orangered', margin: '-0.1em 0px'}}></i>
                                    <h5 className="mb-0 ms-auto">₹ {i.ProvVoucherAmount}</h5>
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
            return <Skeleton count={16}/>;
        } else if (data.err.status) {
            return <h2 className="text-danger mark">An error occured, please try again later. Error code: <span className="text-dark d-inline">{data.err.msg}</span></h2>;
        } else if (data.data.AccPartyMasterList.length === 0) {
            return <h2 className="text-danger py-2">No Data Received !</h2>;
        } else {
            return bedGroupIdList.map(i => renderBedGroup(i.BedGroupId, i.BedGroupDesc, data.data.AccPartyMasterList));
        }
    }

    return (
        <section className="container bg-white rounded-4 px-0" style={{fontSize: '0.8em'}}>
            <div className="card-header d-flex align-items-end gap-3 flex-wrap px-2 pt-0 pb-3" style={{fontSize: '1.3em'}}>
                <h4 className="card-title mb-0">{userInfo.selectedCompany.COMPNAME}</h4>
                <span className="text-sm" style={{color: 'blue'}}>( Table Status )</span>
                <span onClick={() => modalAction('TABLE_SELECTION_MODAL', false)} className='continue-button d-inline ms-auto  ' style={{background: '#1f8dc9', padding: '0.3em 0.8em', fontSize: '0.8em', borderRadius: '6px'}} role='button'>CLOSE</span>
            </div>
            <div className="bed-container" id="printContent" style={{width:'100%'}}>
                {renderData(data)}
            </div>
        </section>
    )
}

const mapStateTableBoard = (state) => {
	return { userInfo: state.userInfo, globalData: state.globalData };
}
  
export default connect(mapStateTableBoard, {modalAction, globalDataAction})(TableBoard);

