import Modal from 'react-bootstrap/Modal';
import { QueueCard } from './cards';
import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { loaderAction } from '../../../actions';
import { GlobalLoader } from '../../App';
import { BASE_URL } from '../../../constants';

const PatientQueue = ({ compCode, userInfo, loaderAction }) => {

    const [list, setList] = useState([]);
    const [initLoading, setInitLoading] = useState(true);

    // useEffect(() => {

    //     let controller = new AbortController();                       // To avoid race condition. axios docs.

    //     const getQueueList = async (companyCode) => {
    //         try {
    //             const res = await axios.get(`${BASE_URL}/api/Values/Get?CID=${companyCode}&DID=0&DeptId=8636`, { signal: controller.signal } );
    //             if (res.status === 200) {
    //                 setList(res.data);
    //             } else if (res.status === 500) {                       // res code 500 is treated as response not error hence need to handle it manually.
    //                 alert('Error : 500. Something went wrong.');
    //             }
    //         } catch (err) {
    //             alert(err.message);
    //         }
    //     }
    //     var timer;
    //     const refreshQueueList = () => {
    //         timer = setInterval(() => {
    //             getQueueList(userInfo.selectedCompany.EncCompanyId);
    //         }, 15000);
    //     }

    //     getQueueList(userInfo.selectedCompany.EncCompanyId);
    //     refreshQueueList();

    //     return () => {
    //         clearInterval(timer);                       // clear the setInterval function to stop making further request on page unmount.
    //         controller.abort();                         // this will cancel the previous api request so that new request can be made avoiding the race condition.
    //     }
    // },[compCode])

    useEffect(() => {
        const getQueueList = async (companyCode, deptId) => {
            if (!companyCode || deptId === undefined) return;
            try {
                const res = await axios.get(`${BASE_URL}/api/Values/Get?CID=${companyCode}&DID=0&DeptId=${deptId}`,
                    //  { signal: AbortSignal.timeout(15000) }
                    
                );
                setInitLoading(false);
                if (res.status === 200) {
                    setList(res.data);
                } else if (res.status === 500) {                       // res code 500 is treated as response not error hence need to handle it manually.
                    setInitLoading(false);
                    alert('Error : 500. Something went wrong.');
                }
            } catch (err) {
                if (err.code === 'ERR_CANCELED') return; 
                setInitLoading(false);
                alert(err.message);
            }
        }
        var timer;
        const refreshQueueList = () => {
            timer = setInterval(() => {
                getQueueList(userInfo.selectedCompany.EncCompanyId, userInfo.selectedCompany.DeptId);
            }, 15000);
        }

        getQueueList(userInfo.selectedCompany.EncCompanyId, userInfo.selectedCompany.DeptId);
        refreshQueueList();

        return () => {
            clearInterval(timer);                       // clear the setInterval function to stop making further request on page unmount.
        }
    },[userInfo.selectedCompany.EncCompanyId, userInfo.selectedCompany.DeptId])
    
    
    const  renderQueueModal = () => {

        const queue = list.filter(i => i.TokenNo);      
        return (
            <main>
                <h3 style={{color: '#253691'}} className='text-xl'>{userInfo.selectedCompany.COMPNAME}</h3>
                <section>
                    {queue.map(i => (<QueueCard data={i} key={i.MPartyCode} />))}
                    {queue.length === 0 && <div className='text-center my-5 w-100'><h2 className="mark">No Data Found.</h2></div>}
                </section>
            </main>
        )
    }
    
    return (
        <Modal className='p-0 default-global' show={true} fullscreen={true} id="queue-modal">
            <Modal.Body className='pt-2'>
                {renderQueueModal()}
                {initLoading ? <div className='spinner-container'><GlobalLoader/></div> : ''}
            </Modal.Body> 
        </Modal>
    )
}

const mapStateToProps = (state) => {
    return { compCode: state.compCode, userInfo: state.userInfo };
}

export default connect(mapStateToProps, {loaderAction})(PatientQueue);