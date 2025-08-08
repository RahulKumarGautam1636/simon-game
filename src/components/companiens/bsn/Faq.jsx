import { useState } from "react";
import { MyAccordion } from "./utils/utilities";

const Faq = () => {

    const [accordKey_1, setAccordKey_1] = useState    ('accord_1-1');
    const [accordKey_2, setAccordKey_2] = useState    ('accord_2-1');
    const [accordKey_3, setAccordKey_3] = useState    ('accord_3-1');
    const [accordKey_4, setAccordKey_4] = useState    ('accord_4-1');

    const accordData_1 = [
        { key: '1', heading: 'Where is the hospital located?', content: 'A Patient Centered Medical Home is a model of healthcare delivery in which care is tailored to the needs preferences of patients, the Patient Centered Medical  model encourages.' },
        { key: '2', heading: 'What is the deposit amount for admission?', content: 'A Patient Centered Medical Home is a model of healthcare delivery in which care is tailored to the needs preferences of patients, the Patient Centered Medical  model encourages.' },
        { key: '3', heading: 'What are the visiting hours?', content: 'A Patient Centered Medical Home is a model of healthcare delivery in which care is tailored to the needs preferences of patients, the Patient Centered Medical  model encourages.' },
        { key: '4', heading: 'How many visitors are allowed at a time?', content: 'A Patient Centered Medical Home is a model of healthcare delivery in which care is tailored to the needs preferences of patients, the Patient Centered Medical  model encourages.' },
    ]

    const accordData_2 = [
        { key: '1', heading: 'Why hospitals do not allow return medication?', content: 'A Patient Centered Medical Home is a model of healthcare delivery in which care is tailored to the needs preferences of patients, the Patient Centered Medical  model encourages.' },
        { key: '2', heading: 'What is a Patient Centered Medical Home?', content: 'A Patient Centered Medical Home is a model of healthcare delivery in which care is tailored to the needs preferences of patients, the Patient Centered Medical  model encourages.' },
        { key: '3', heading: 'How much will my hospital stay cost?', content: 'A Patient Centered Medical Home is a model of healthcare delivery in which care is tailored to the needs preferences of patients, the Patient Centered Medical  model encourages.' },
        { key: '4', heading: 'Can I choose my class of ward?', content: 'A Patient Centered Medical Home is a model of healthcare delivery in which care is tailored to the needs preferences of patients, the Patient Centered Medical  model encourages.' },
    ]

    const accordData_3 = [
        { key: '1', heading: 'How do I get a prescription refilled?', content: 'A Patient Centered Medical Home is a model of healthcare delivery in which care is tailored to the needs preferences of patients, the Patient Centered Medical  model encourages.' },
        { key: '2', heading: 'What is a Patient Centered Medical Home?', content: 'A Patient Centered Medical Home is a model of healthcare delivery in which care is tailored to the needs preferences of patients, the Patient Centered Medical  model encourages.' },
        { key: '3', heading: 'What is evidence-based medicine?', content: 'A Patient Centered Medical Home is a model of healthcare delivery in which care is tailored to the needs preferences of patients, the Patient Centered Medical  model encourages.' },
        { key: '4', heading: 'What do I need to do during registration?', content: 'A Patient Centered Medical Home is a model of healthcare delivery in which care is tailored to the needs preferences of patients, the Patient Centered Medical  model encourages.' },
    ]

    const accordData_4 = [
        { key: '1', heading: 'How do I get a prescription refilled?', content: 'A Patient Centered Medical Home is a model of healthcare delivery in which care is tailored to the needs preferences of patients, the Patient Centered Medical  model encourages.' },
        { key: '2', heading: 'What is a Patient Centered Medical Home?', content: 'A Patient Centered Medical Home is a model of healthcare delivery in which care is tailored to the needs preferences of patients, the Patient Centered Medical  model encourages.' },
        { key: '3', heading: 'What is evidence-based medicine?', content: 'A Patient Centered Medical Home is a model of healthcare delivery in which care is tailored to the needs preferences of patients, the Patient Centered Medical  model encourages.' },
        { key: '4', heading: 'What do I need to do during registration?', content: 'A Patient Centered Medical Home is a model of healthcare delivery in which care is tailored to the needs preferences of patients, the Patient Centered Medical  model encourages.' },
    ]      

    return (
        <div className="bsn-global">
            <section className="breadcrumb-area" style={{backgroundImage: 'url(/assets/img/aboutUs/aboutus-background.jpg)'}}>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="breadcrumbs">
                                <h1>FAQ</h1>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="breadcrumb-bottom">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="left">
                                    <ul>
                                        <li><a href="index.html">Home</a></li>
                                        <li><span className="material-symbols-outlined notranslate">navigate_next</span></li>
                                        <li className="active">Faq</li>
                                    </ul>
                                </div>
                                <div className="right">
                                    <a href="#"><span className="material-symbols-outlined notranslate">share</span> Share</a> 
                                </div>    
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="faq-content-area">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12">
                            <div className="single-box">
                                <div className="sec-title mar0auto text-center">
                                    <h1>What Our Patients Say</h1>
                                    <span className="border"></span>
                                </div>
                                <MyAccordion name='accord_1' data={accordData_1} activeKey={accordKey_1} handler={setAccordKey_1} />
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12">
                            <div className="single-box">
                                <div className="sec-title mar0auto text-center">
                                    <h1>Medication Pharmacy</h1>
                                    <span className="border"></span>
                                </div>
                                <MyAccordion name='accord_2' data={accordData_2} activeKey={accordKey_2} handler={setAccordKey_2} />
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12">
                            <div className="single-box">
                                <div className="sec-title mar0auto text-center">
                                    <h1>Outpatient Services</h1>
                                    <span className="border"></span>
                                </div>
                                <MyAccordion name='accord_3' data={accordData_3} activeKey={accordKey_3} handler={setAccordKey_3} />
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12">
                            <div className="single-box">
                                <div className="sec-title mar0auto text-center">
                                    <h1>Medical Report</h1>
                                    <span className="border"></span>
                                </div>
                                <MyAccordion name='accord_4' data={accordData_4} activeKey={accordKey_4} handler={setAccordKey_4} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Faq;