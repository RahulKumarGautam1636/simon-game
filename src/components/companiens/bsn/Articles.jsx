import { Link, useParams } from "react-router-dom";
// import { DoctorCard } from "../utils/cards";
// import { doctorsList } from "../utils/utilities";
import { useEffect, useState } from "react";
import { MyAccordion, MyAccordion2 } from "./utils/utilities";
import { useRef } from "react";
import { scrollToContent } from "../default/utilities";

const Articles = ({ match }) => {

    const [active, setActive] = useState('1');
    // const [active2, setActive2] = useState('');
    const [nestedItem, setNestedItem] = useState('');
    const contentRef = useRef(null);

    // const params = {service: 'cardiology'};

    // useEffect(() => {
    //     if (!departments[params.service]) return;
    //     setActive(params.service);
    // }, [params.service])

    useEffect(() => {
        window.initMenuAccord('.tab-dropdown li .tab-toggler');
    },[])
    
    let accordData_1 = [
        {key: '1', heading: 'Anemia or Iron Deficiency', subItems: [], childId: '1'},
        {key: '2', heading: 'Arthritis and Bone', subItems: [{childId: '2', title: 'Arthritis'}, {childId: '3', title: 'Osteoporosis'}]},
        {key: '3', heading: 'Cancer', subItems: [], childId: 'none'},
        {key: '4', heading: 'Cardiovascular', subItems: [{childId: '1', title: 'Cerebrovascular Disease or Stroke'}, {childId: '2', title: 'Cholesterol'}, {childId: '1', title: 'Heart Disease'}, {childId: '2', title: 'Hypertension'}]},
        {key: '5', heading: 'Dementia and Mental Health', subItems: [{childId: '1', title: 'Alzheimer’s Disease'}, {childId: '2', title: 'Attention Deficit Hyperactivity Disorder'}, {childId: '1', title: 'Depression'}, {childId: '2', title: 'Mental Health'}]},
        {key: '6', heading: 'Diabetes', subItems: [], childId: 'none'},
        {key: '7', heading: 'Chronic Liver Disease and Cirrho', subItems: [{childId: '1', title: 'Digestive Diseases'}, {childId: '2', title: 'Chronic Liver Disease and Cirrho'}]},
        {key: '8', heading: 'Kidney Disease', subItems: [], childId: 'none'},
        {key: '9', heading: 'Oral and Dental Health', subItems: [], childId: 'none'},
        {key: '10', heading: 'Respiratory and Allergies', subItems: [{childId: '1', title: 'Allergies and Hay Fever'}, {childId: '2', title: 'Asthma'}, {childId: '1', title: 'Chronic Obstructive Pulmonary Disease'}]},
    ]

    let accordData_2 = [
        {key: 1, heading: 'AIDS and HIV', subItems: [], childId: '4'},
        {key: 2, heading: 'Viral Hepatitis', subItems: [], childId: '5'},
        {key: 3, heading: 'Infectious Disease', subItems: [], childId: '6'},
        {key: 4, heading: 'Influenza', subItems: [], childId: '7'},
        {key: 5, heading: 'Measles, Mumps, and Rubella', subItems: [], childId: 'none'},
        {key: 6, heading: 'Pneumonia', subItems: [], childId: 'none'},
        {key: 7, heading: 'Sexually Transmitted Diseases (STD)', subItems: [], childId: 'none'},
        {key: 8, heading: 'Chronic Sinusitis', subItems: [], childId: 'none'},
        {key: 9, heading: 'Whooping Cough or Pertussis', subItems: [], childId: 'none'},
    ]

    let accordData_3 = [
        {key: 1, heading: 'Marriage and Divorces', subItems: [], childId: '8'},
    ]
    let accordData_4 = [
        {key: 1, heading: 'Access to Health Cares', subItems: [], childId: '9'},
    ]
    let accordData_5 = [
        {key: 1, heading: 'Sleep Health', subItems: [], childId: '10'},
    ]
    let accordData_6 = [
        {key: 1, heading: 'Assault or Homicide', subItems: [], childId: '11'},
    ]
    let accordData_7 = [
        {key: 1, heading: 'Age Groups', subItems: [{childId: '12', title: 'Adolescent Health'}, {childId: '13', title: 'Child Health'}]},
    ]
    let accordData_8 = [
        {key: 1, heading: 'Contraceptive Use', subItems: [], childId: '14'},
    ]

    let diseases = [
        {
            id: '1', 
            heading: 'Anemia or Iron Deficiency', 
            cards: [
                {
                    title: 'Physician office visits', 
                    itemList: [
                        {topic: 'Number of visits to physician offices with anemias as the primary diagnosis group: 2.8 million', source: {link: '#', text: 'National Ambulatory Medical Care Survey: 2016 National Summary Tables, table 15'}},
                    ]
                },
                {
                    title: 'Emergency department visits', 
                    itemList:[
                        {topic: 'Number of visits to emergency departments with anemias as the primary diagnosis group: 800,000', source: {link: '#', text: 'National Hospital Ambulatory Medical Care Survey: 2021 National Summary Tables, table 11'}},
                    ]
                },
                {
                    title: 'Mortality', 
                    itemList:[
                        {topic: 'Number of deaths: 6,021', source: {link: '#', text: ''}},
                        {topic: 'Deaths per 100,000 population: 1.8', source: {link: '#', text: 'National Vital Statistics System – Mortality Data (2022) via CDC WONDER'}},
                    ]
                }
            ],
            moreData: [
                // { text: '', link: '#'},
            ],
            relatedLinks: [
                { text: 'Ambulatory Health Care Data', link: '#'},
                { text: 'Mortality Statistics', link: '#'},
                { text: 'National Health and Nutrition Examination Survey', link: '#'},
                { text: 'National Center for Chronic Disease Prevention and Health Promotion', link: '#'},
                { text: 'National Heart, Lung, and Blood Institute', link: '#'},
            ]
        },
        {
            id: '2', 
            heading: 'Arthritis', 
            cards: [
                {
                    title: 'Morbidity', 
                    itemList: [
                        {topic: 'Percent of adults age 18 and older with diagnosed arthritis: 21.6% (2022)', source: {link: '#', text: 'Interactive Summary Health Statistics for Adults: National Health Interview Survey, 2019-2022'}},
                    ]
                },
                {
                    title: 'Ambulatory care visits', 
                    itemList:[
                        {topic: 'Number of visits to office-based physicians with osteoarthritis as the primary diagnosis: 9.9 million', source: {link: '#', text: ''}},
                        {topic: 'Percent of visits to office-based physicians with arthritis indicated on the medical record: 10.6%', source: {link: '#', text: ' National Ambulatory Medical Care Survey: 2019 National Summary Tables, tables 14, 16 [PDF – 865 KB]'}},
                    ]
                },
            ],
            moreData: [
                { text: 'Arthritis in Adults Age 18 and Older: United States, 2022', link: '#'},
                { text: 'Use of Complementary Health Approaches for Musculoskeletal Pain Disorders Among Adults: United States, 2012 [PDF – 302 KB]', link: '#'}
            ],
            relatedLinks: [
                { text: 'Ambulatory Health Care Data', link: '#'},
                { text: 'National Health Interview Survey', link: '#'},
                { text: 'National Hospital Discharge Survey', link: '#'},
                { text: ' Centers for Disease Control and Prevention: Arthritis', link: '#'},
                { text: 'National Institute of Arthritis and Musculoskeletal and Skin Diseases', link: '#'},
                { text: 'Arthritis Foundation', link: '#'},
            ]
        },
        {
            id: '3', 
            heading: 'Osteoporosis', 
            cards: [
                {
                    title: 'Morbidity', 
                    itemList: [
                        {topic: 'Percent of men age 50 and older with osteoporosis of the femur neck or lumbar spine: 4.2%', source: {link: '#', text: ''}},
                        {topic: 'Percent of women age 50 and older with osteoporosis of the femur neck or lumbar spine: 18.8%', source: {link: '#', text: 'Osteoporosis or Low Bone Mass in Older Adults: United States, 2017-2018'}},
                    ]
                },
                
            ],
            moreData: [
                // { text: '', link: '#'}
            ],
            relatedLinks: [
                { text: 'National Health and Nutrition Examination Survey', link: '#'},
                { text: 'Centers for Disease Control and Prevention: Osteoporosis', link: '#'},
                { text: 'National Institute of Arthritis and Musculoskeletal and Skin Diseases: Osteoporosis and related bone diseases', link: '#'},
                { text: 'Bone health and osteoporosis: a report of the Surgeon General', link: '#'},
            ]
        },
        {
            id: '4', 
            heading: 'AIDS and HIV', 
            cards: [
                {
                    title: 'Morbidity', 
                    itemList: [
                        {topic: 'Number of HIV diagnoses: 36,398 (2019)', source: {link: '#', text: 'Health, United States, 2020-2021, Table HIV [PDF – 9.8 MB]'}},
                    ]
                },
                {
                    title: 'Morbidity', 
                    itemList: [
                        {topic: 'Number of deaths: 4,941', source: {link: '#', text: ''}},
                        {topic: 'Deaths per 100,000 population: 1.5', source: {link: '#', text: 'National Vital Statistics System – Mortality Data (2022) via CDC WONDER'}},
                    ]
                },
            ],
            moreData: [
                { text: 'Trends in HIV/AIDS from Health, United States', link: '#'},
                { text: 'Health, United States — Topic Page: HIV', link: '#'},
                { text: 'Tables of Summary Health Statistics from the National Health Interview Survey', link: '#'},
                { text: 'Key Statistics from the National Survey of Family Growth (from A to Z)', link: '#'},
                { text: 'HIV Surveillance Report', link: '#'},
            ],
            relatedLinks: [
                { text: 'Mortality Statistics', link: '#'},
                { text: 'National Health and Nutrition Examination Survey', link: '#'},
                { text: 'National Health Interview Survey', link: '#'},
                { text: 'National Survey of Family Growth', link: '#'},
            ]
        }, 
        {
            id: '5', 
            heading: 'Viral Hepatitis', 
            cards: [
                {
                    title: 'Morbidity', 
                    itemList: [
                        {topic: 'Number of new hepatitis A cases: 9,946', source: {link: '#', text: ''}},
                        {topic: 'Number of new hepatitis B cases: 2,155', source: {link: '#', text: ''}},
                        {topic: 'Number of new hepatitis C cases: 6,025', source: {link: '#', text: 'National Notifiable Diseases Surveillance System – Data (2020) via CDC Wonder'}},
                    ]
                },
                {
                    title: 'Mortality', 
                    itemList: [
                        {topic: 'Number of deaths: 3,107', source: {link: '#', text: ''}},
                        {topic: 'Deaths per 100,000 population: 0.9', source: {link: '#', text: 'National Vital Statistics System – Mortality Data (2022) via CDC WONDER'}},
                    ]
                },
            ],
            moreData: [
                { text: '2020 Viral Hepatitis Surveillance Report | CDC', link: '#'},
                { text: 'Trends and Characteristics in Maternal Hepatitis C Virus Infection Rates During Pregnancy: United States, 2016-2021 [PDF – 361 KB]', link: '#'},
                { text: 'QuickStats: Percentage of Adults Ages ≥18 Years with Current Hepatitis C Virus Infection, by Health Insurance Coverage -National Health and Nutrition Examination Survey, United States, January 2017-March 2020', link: '#'},
                { text: 'Prevalence and Trends in Hepatitis B Virus Infection in the United States, 2015–2018', link: '#'},
                { text: 'Prevalence, Change Over Time, and Comparison With U.S. Estimates of Selected Infectious Diseases in Los Angeles County: Findings From the National Health and Nutrition Examination Survey, 1999–2006 and 2007–2014 [PDF – 479 KB]', link: '#'},
                { text: 'QuickStats: Prevalence of Past or Present Infection with Hepatitis B Virus Among Adults Ages ≥18 Years, by Race and Hispanic Origin – National Health and Nutrition Examination Survey, 1999-2018', link: '#'},
            ],
            relatedLinks: [
                { text: 'Mortality Statistics', link: '#'},
                { text: 'Centers for Disease Control and Prevention: Viral Hepatitis', link: '#'},
                { text: 'National Institute for Allergy and Infectious Diseases: Viral Hepatitis', link: '#'},
            ]
        },
        {
            id: '6', 
            heading: 'Infectious Disease', 
            cards: [
                {
                    title: 'Morbidity', 
                    itemList: [
                        {topic: 'Number of new tuberculosis cases: 8,916 (2019)', source: {link: '#', text: ''}},
                        {topic: 'Number of new salmonella cases: 58,371 (2019)', source: {link: '#', text: ''}},
                        {topic: 'Number of new Lyme disease cases: 34,945 (2019)', source: {link: '#', text: ''}},
                        {topic: 'Number of new meningococcal disease cases: 371 (2019)', source: {link: '#', text: 'Health, United States, 2020-2021, table IDNotif [PDF – 9.8 MB]'}},
                    ]
                },
                {
                    title: 'Physician office visits', 
                    itemList: [
                        {topic: 'Number of visits to physician offices for infectious and parasitic diseases: 10.2 million', source: {link: '#', text: ''}},
                        {topic: 'Deaths per 100,000 population: 0.9', source: {link: '#', text: 'National Ambulatory Medical Care Survey: 2019 National Summary Tables, table 13 [PDF – 865 KB]'}},
                    ]
                }, {
                    title: 'Emergency department visitsPhysician office visits', 
                    itemList: [
                        {topic: 'Number of emergency department visits with infectious and parasitic diseases as the primary diagnosis: 3.8 million', source: {link: '#', text: ''}},
                        {topic: 'Number of emergency department visits resulting in hospital admission with a principal hospital discharge diagnosis of infectious and parasitic diseases: 482,000', source: {link: '#', text: 'National Hospital Ambulatory Medical Care Survey: 2021 National Summary Tables, table 10, 25 [PDF – 830 KB]'}},
                    ]
                },      
            ],
            moreData: [
                { text: 'Trends in Infectious diseases from Health, United States', link: '#'}
            ],
            relatedLinks: [
                { text: 'Ambulatory Health Care Data', link: '#'},
                { text: 'Emerging Infectious Diseases', link: '#'},
                { text: 'Summary of Notifiable Diseases', link: '#'},
                { text: 'Centers for Disease Control and Prevention', link: '#'},
                { text: 'National Institute of Allergy and Infectious Diseases', link: '#'},
            ]
        },
        {
            id: '7', 
            heading: 'Influenza', 
            cards: [
                {
                    title: 'Vaccination', 
                    itemList: [
                        {topic: 'Percent of adults age 18 and older who received an influenza vaccination during the past 12 months: 48.0%', source: {link: '#', text: 'Early Release of Selected Estimates Based on Data From the 2023 National Health Interview Survey [PDF – 254 KB]'}},
                        {topic: 'Percent of children ages 6 months to 17 years who received an influenza vaccination during the past 12 months: 45.9% (2022)', source: {link: '#', text: 'Interactive Summary Health Statistics for Children: National Health Interview Survey, 2019-2022'}},
                        {topic: 'Percent of adults ages 18–34 who received an influenza vaccination during the past 12 months: 32.9% (2022)', source: {link: '#', text: ''}},
                        {topic: 'Percent of adults ages 35–49 who received an influenza vaccination during the past 12 months: 39.6% (2022)', source: {link: '#', text: ''}},
                        {topic: 'Percent of adults ages 50–64 who received an influenza vaccination during the past 12 months: 50.3% (2022)', source: {link: '#', text: ''}},
                        {topic: 'Percent of adults age 65 and older who received an influenza vaccination during the past 12 months: 70.6% (2022)', source: {link: '#', text: 'Interactive Summary Health Statistics for Adults: National Health Interview Survey, 2019-2022'}},
    
                    ]
                },
                {
                    title: 'Mortality', 
                    itemList: [
                        {topic: 'Number of deaths: 47,052', source: {link: '#', text: ''}},
                        {topic: 'Deaths per 100,000 population: 14.1', source: {link: '#', text: ''}},
                        {topic: 'Cause of death rank: 12', source: {link: '#', text: 'National Vital Statistics System – Mortality Data (2022) via CDC WONDER'}},
                        {topic: 'Number of deaths: 5,944', source: {link: '#', text: ''}},
                        {topic: 'Deaths per 100,000 population: 1.8', source: {link: '#', text: 'National Vital Statistics System – Mortality Data (2022) via CDC WONDER'}},
                    ]
                },
            ],
            moreData: [
                { text: 'Trends in Influenza and pneumonia from Health, United States', link: '#'},
                { text: 'Influenza Vaccination in the Past 12 Months Among Children Ages 6 Months to 17 Years: United States, 2019', link: '#'},
                { text: 'Emergency Department Visits for Influenza and Pneumonia: United States, 2016-2018', link: '#'},
            ],
            relatedLinks: [
                { text: 'National Health Interview Survey', link: '#'},
                { text: 'Mortality Statistics', link: '#'},
                { text: 'Centers for Disease Control and Prevention: Influenza', link: '#'},
                { text: 'National Institute of Allergy and Infectious Diseases', link: '#'},
            ]
        },
        {
            id: '8', 
            heading: 'Marriage and Divorce', 
            cards: [
                {
                    title: '', 
                    itemList: [
                        {topic: 'Number of marriages: 2,065,905', source: {link: '#', text: ''}},
                        {topic: 'Marriage rate: 6.2 per 1,000 total population', source: {link: '#', text: ''}},
                        {topic: 'Number of divorces: 673,989 (45 reporting States and D.C.)', source: {link: '#', text: ''}},
                        {topic: 'Divorce rate: 2.4 per 1,000 population (45 reporting States and D.C.)', source: {link: '#', text: 'Sources: National Marriage and Divorce Rate Trends for 2000-2022 [PDF – 120 KB] (data shown are provisional 2022)'}},
                    ]
                },
            ],
            moreData: [
                { text: 'Detailed marriage and divorce tables by state', link: '#'},
                { text: 'Marriage Rates in the United States, 1900-2018', link: '#'},
                { text: 'Mortality Among Adults Ages 25 and Older by Marital Status: United States, 2010–2017', link: '#'},
            ],
            relatedLinks: [
                { text: 'Marriage and divorce statistics', link: '#'},
                { text: 'National Survey of Family Growth', link: '#'},
                { text: 'Where to Write for Vital Records', link: '#'},
                { text: 'U.S. Census Bureau', link: '#'},
            ]
        },
        {
            id: '9', 
            heading: 'Access to Health Care', 
            cards: [
                {
                    title: '', 
                    itemList: [
                        {topic: 'Percent of adults age 18 and older who failed to obtain needed medical care due to cost: 6.4%', source: {link: '#', text: 'Source: Early Release of Selected Estimates Based on Data From the 2023 National Health Interview Survey [PDF – 254 KB]'}},
                        {topic: 'Percent of persons with a usual place to go for medical care: 87.6% (2022)', source: {link: '#', text: 'Source: Interactive Summary Health Statistics for Adults, 2019-2022'}},
                    ]
                },
                
            ],
            moreData: [
                { text: 'Reduced Access to Care, Household Pulse Survey', link: '#'},
                { text: 'Reduced Access to Care, RANDS during COVID-19', link: '#'},
                { text: 'Trends in Health care access from Health, United States', link: '#'},
                { text: 'Health, United States — Topic Page: Unmet need', link: '#'},
            ],
            relatedLinks: [
                { text: 'National Health Interview Survey', link: '#'}
            ]
        },
        {
            id: '10', 
            heading: 'Sleep Health', 
            cards: [
                {
                    title: 'Morbidity', 
                    itemList: [
                        {topic: 'Percent of adults age 18 and older who get sufficient sleep: 72.3% (2020)', source: {link: '#', text: 'Source: Healthy People 2030: Sleep Health Objective SH-03, National Health Interview Survey '}},
                    ]
                },
                
            ],
            moreData: [
                { text: 'Sleep Medication Use in Adults Ages 18 Years and Older: United States, 2020', link: '#'},
                { text: 'Sleep Difficulties in Adults: United States, 2020', link: '#'},
                { text: 'Regular Bedtimes Among Children Ages 5-17 years: United States, 2020', link: '#'},
            ],
            relatedLinks: [
                { text: 'National Health and Nutrition Examination Survey', link: '#'},
                { text: 'National Health Interview Survey', link: '#'},
                { text: 'CDC: Sleep and Sleep Disorders', link: '#'},
            ]
        },
        {
            id: '11', 
            heading: 'Assault or Homicide', 
            cards: [
                {
                    title: 'Emergency department visits', 
                    itemList: [
                        {topic: 'Number of emergency department visits for assault: 1.4 million', source: {link: '#', text: 'Source: National Hospital Ambulatory Medical Care Survey: 2021 National Summary Tables, table 15 [PDF – 830 KB]'}},
                    ]
                },{
                    title: 'Mortality', 
                    itemList: [
                        {topic: 'Number of deaths: 24,849', source: {link: '#', text: ''}},
                        {topic: 'Deaths per 100,000 population: 7.5', source: {link: '#', text: 'Source: National Vital Statistics System – Mortality Data (2022) via CDC WONDER'}},
                    ]
                },
                
            ],
            moreData: [
                { text: 'Trends in Homicide from Health, United States', link: '#'},
                { text: 'Deaths: Leading Causes for 2020 [PDF – 2 MB]', link: '#'},
                { text: 'Emergency Department Visit Rates for Assaults: United States, 2019-2021', link: '#'},
            ],
            relatedLinks: [
                { text: 'Ambulatory Health Care Data', link: '#'},
                { text: 'Mortality Statistics', link: '#'},
            ]
        },
        {
            id: '12', 
            heading: 'Adolescent Health', 
            cards: [
                {
                    title: 'Health status', 
                    itemList: [
                        {topic: 'Percent of adolescents ages 12–17 years who are in fair or poor health: 3.8% (2022)', source: {link: '#', text: ''}},
                        {topic: 'Percent of adolescents ages 12–17 years who missed 11 or more days of school in the past 12 months because of illness, injury, or disability: 9.9% (2022)', source: {link: '#', text: 'Source: Interactive Summary Health Statistics for Children: National Health Interview Survey, 2019-2022'}},
                    ]
                },
                {
                    title: 'Obesity', 
                    itemList: [
                        {topic: 'Percent of adolescents ages 12–19 years with obesity: 22.2% (2017-March 2020)', source: {link: '#', text: 'Source: National Health and Nutrition Examination Survey 2017-March 2020 Prepandemic Data Files-Development of Files and Prevalence Estimates for Selected Health Outcomes, table 3 [PDF – 436 KB]'}},
                    ]
                },
                {
                    title: 'Smoking and alcohol use', 
                    itemList: [
                        {topic: 'Percent of adolescents ages 12–17 years who smoked cigarettes in the past month: 2.3% (2019)', source: {link: '#', text: ''}},
                        {topic: 'Percent of adolescents ages 12–17 years who used alcohol in the past month: 9.4% (2019)', source: {link: '#', text: 'Source: Health, United States, 2020-2021 Table SubUse [PDF – 9.8 MB]'}},
                    ]
                },
            ],
            moreData: [
                { text: 'Trends in Child and Adolescent Health from Health, United States', link: '#'},
                { text: 'United States Life Tables, 2021 [PDF – 2 MB]', link: '#'},
                { text: 'U.S. State Life Tables, 2020 [PDF – 2 MB]', link: '#'},
                { text: 'Key Statistics from the National Survey of Family Growth (from A to Z)', link: '#'},
            ],
            relatedLinks: [
                { text: 'Mortality Statistics', link: '#'},
                { text: 'National Health Interview Survey', link: '#'},
                { text: 'National Health and Nutrition Examination Survey', link: '#'},
            ]
        },
        {
            id: '13', 
            heading: 'Child Health', 
            cards: [
                {
                    title: 'Health status', 
                    itemList: [
                        {topic: 'Percent of children ages 0–4 years who are in fair or poor health: 1.5% (2022)', source: {link: '#', text: ''}},
                        {topic: 'Percent of children ages 5–11 years who are in fair or poor health: 2.2% (2022)', source: {link: '#', text: 'Source: Health, United States, 2020-2021 Table SubUse [PDF – 9.8 MB]'}},
                        {topic: 'Percent of children ages 5–11 years who missed 11 or more days of school in the past 12 months because of illness, injury, or disability: 8.0% (2022)', source: {link: '#', text: 'Interactive Summary Health Statistics for Children: National Health Interview Survey, 2019-2022'}},
                    ]
                }, 
                {
                    title: 'Access to health care', 
                    itemList: [
                        {topic: 'Percent of children 0-4 years with a usual source of health care: 97.5% (2022)', source: {link: '#', text: ''}},
                        {topic: 'Percent of children 5-11 years with a usual source of health care: 97.2% (2022)', source: {link: '#', text: 'Interactive Summary Health Statistics for Children: National Health Interview Survey, 2019-2022'}},
                    ]
                },
                
            ],
            moreData: [],
            relatedLinks: [
                { text: 'Mortality Statistics', link: '#'},
                { text: 'National Health Interview Survey', link: '#'},
                { text: 'National Health and Nutrition Examination Survey', link: '#'},
                { text: 'National Health and Nutrition Examination Survey', link: '#'},
                { text: 'KIDS Count', link: '#'},
            ]
        },
        {
            id: '14', 
            heading: 'Contraceptive Uses', 
            cards: [
                {
                    title: 'Women', 
                    itemList: [
                        {topic: 'Mean age at first menstrual period for women ages 15-49: 12.4 years', source: {link: '#', text: ''}},
                        {topic: 'Percent of women ages 15-49 who have ever been treated for pelvic inflammatory disease (PID): 3.7%', source: {link: '#', text: 'Source: Key Statistics from the National Survey of Family Growth (data are for 2017-2019)'}},
                    ]
                }
                
            ],
            moreData: [
                { text: 'Teenagers in the United States: Sexual Activity, Contraceptive Use, and Childbearing, 2015-2019 [PDF – 773 KB]', link: '#'},
                { text: 'Fertility of Men and Women Ages 15–49 in the United States: National Survey of Family Growth, 2015–2019 [PDF – 650 KB]', link: '#'}
                

            ],
            relatedLinks: [
                { text: 'National Survey of Family Growth', link: '#'},
                { text: 'National Vital Statistics System-Birth Data', link: '#'},
            ]
        },
        {
            id: 'none', 
            heading: 'Coming soon..', 
            cards: [
                {
                    title: 'Coming soon..', 
                    itemList: [
                        {topic: 'Content not available yet.', source: {link: '#', text: ''}},
                    ]
                }
            ]
        },
    ]
        
    // const [accordKey_1, setAccordKey_1] = useState('accord_1-1');
    // const [accordKey_2, setAccordKey_2] = useState('accord_2-1');

    const AccordChild = ({ data }) => {
        if (!data.subItems.length) return;
        return (
            <div className="links-list">
                {data.subItems.map(i => {
                    return (
                        <Link to={`#`} onClick={() => {setNestedItem(i.childId)}} key={i.title}><i className='bx bx-chevron-right'></i> {i.title}</Link>
                    )
                })}
            </div>
        )
    }

    const AccordButton = ({ data }) => {
        if (data.childId) {
            return <h4 onClick={() => {setNestedItem(data.childId)}}><i className='bx bx-radio-circle-marked'></i>{data.heading}</h4>
        } else {
            return <h4><i className='bx bx-radio-circle-marked'></i>{data.heading}</h4>
        }
    }
    
    const tabList = [
        { 
            id: '1',
            link: '#', 
            heading: 'Diseases and Conditions', 
            subLinks: [ 
                {title: 'Anemia or Iron Deficiency', link: '1', nestedLinks: [] },
                {title: 'Arthritis and Bone', link: '', nestedLinks: [{title: 'Arthritis', link: '2'}, {title: 'Osteoporosis', link: '3'}] }
            ], 
            accordName: 'accord_1', 
            accordData: accordData_1, 
            // activeKey: accordKey_1, 
            // setAccordKey: setAccordKey_1, 
            // child: <AccordChild />
        },
        { 
            id: '2',
            link: '#', 
            heading: 'Infectious / Immune', 
            subLinks: [ 
                {title: 'AIDS and HIV', link: '4', nestedLinks: []},
                {title: 'Viral Hepatitis', link: '5', nestedLinks: []},
                {title: 'Infectious Disease', link: '6', nestedLinks: []},
                {title: 'Influenza', link: '7', nestedLinks: []},
            ], 
            accordName: 'accord_2', 
            accordData: accordData_2
        },
        { 
            id: '3',
            link: '#', 
            heading: 'Family Life',
            subLinks: [
                {title: 'Marriage and Divorce', link: '8', nestedLinks: []}
            ],
            accordName: 'accord_3', 
            accordData: accordData_3,   
        },
        { 
            id: '4',
            link: '#', 
            heading: 'Health Care and Insurance',
            subLinks: [
                {title: 'Access to Health Care', link: '9', nestedLinks: []},
                // {title: 'Ambulatory and Hospital Care', link: '#', nestedLinks: [{title: 'Ambulatory Care Use and Physician office visits', link: '#'}, { title: 'Emergency Department Visits', link: '#'}, {title: 'Hospital Utilization', link: '#'}]},
                // {title: 'Therapeutic Drug Use', link: '#', nestedLinks: []},
                // {title: 'Electronic Medical Records', link: '#', nestedLinks: []},
                // {title: 'Health Expenditures', link: '#', nestedLinks: []},
                // {title: 'Health Insurance Coverage', link: '#', nestedLinks: []},
                // {title: 'Immunization', link: '#', nestedLinks: []},
                // {title: 'Long Term Care', link: '#', nestedLinks: [{title: 'Adult Day Services Centers', link: '#'}, {title: 'Home Health Care', link: '#'}, {title: 'Hospice Care', link: '#'}, {title: 'Nursing Home Care', link: '#'}, {title: 'Residential Care Communities', link: '#'}]},
                // {title: 'Screenings', link: '#', nestedLinks: [{title: 'Mammography', link: '#'}, {title: 'Pap Tests', link: '#'}]},
            ],
            accordName: 'accord_4',
            accordData: accordData_4
        },
        { 
            id: '5',
            link: '#', 
            heading: 'Disability and Risk Factors',
            subLinks: [
                {title: 'Sleep Health', link: '10', nestedLinks: []},
                // {title: 'Substance Use', link: '#', nestedLinks: [{title: 'Alcohol Use', link: '#'}, {title: 'Illicit Drug Use', link: '#'}, {title: 'Smoking', link: '#'}]},
                // {title: 'Weight Status and Size', link: '#', nestedLinks: [{title: 'Body Measurements', link: '#'}, {title: 'Obesity and Overweight', link: '#'}]},
                // {title: 'Nutrition, Exercise, and Sleep', link: '#', nestedLinks: [{title: 'Diet/Nutrition', link: '#'}, {title: 'Exercise/Physical Activity', link: '#'}, {title: 'Sleep Health', link: '#'}]},
                // {title: 'Disability and Functioning', link: '#', nestedLinks: []}
            ], 
            accordName: 'accord_5', 
            accordData: accordData_5,  
        },
        { 
            id: '6',
            link: '#', 
            heading: 'Injuries',
            subLinks: [
                // {title: 'Accidents or Unintentional Injuries', link: '11', nestedLinks: []},
                // {title: 'All Injuries', link: '#', nestedLinks: []},
                {title: 'Assault or Homicide', link: '11', nestedLinks: []},
                // {title: 'Suicide and Self-Inflicted Injury', link: '#', nestedLinks: []},
            ], 
            accordName: 'accord_6', 
            accordData: accordData_6,  
        },
        { 
            id: '7',
            link: '#', 
            heading: 'Life Stages and Populations',
            subLinks: [
                {title: 'Age Groups', link: '#', nestedLinks: [{title: 'Adolescent Health', link: '12'}, {title: 'Child Health', link: '13'}]},
                // {title: 'Births', link: '#', nestedLinks: [{title: 'Birth Defects or Congenital Anomalies', link: '#'}, {title: 'Births and Natality', link: '#'}, {title: 'Birthweight and Gestation', link: '#'}, {title: 'Method of Delivery', link: '#'}, {title: 'Multiple Births', link: '#'}, {title: 'Teen Births', link: '#'}, {title: 'Unmarried Childbearing', link: '#'}]},
                // {title: 'Deaths', link: '#', nestedLinks: [{title: 'Deaths and Mortality', link: '#'}, {title: 'Leading Causes of Death', link: '#'}, {title: 'Life Expectancy', link: '#'}, {title: 'Maternal Mortality', link: '#'}, ]},
                // {title: 'Race and Ethnicity', link: '#', nestedLinks: [{title: 'Health of American Indian or Alaska Native Population', link: '#'}, {title: 'Health of Asian Population', link: '#'}, {title: 'Health of Black or African American non-Hispanic Population', link: '#'}, {title: 'Health of Hispanic or Latino Population', link: '#'}, {title: 'Health of Native Hawaiian or Other Pacific Islander non-Hispanic Population', link: '#'}, {title: 'Health of Mexican American Population', link: '#'}, {title: 'Health of White non-Hispanic Population', link: '#'}, ]},
                // {title: 'Sex', link: '#', nestedLinks: [{title: 'Mens Health', link: '#'}, {title: 'Womens Health', link: '#'}, ]},
                // {title: 'State and Territorial Data', link: '#', nestedLinks: []},
            ], 
            accordName: 'accord_7', 
            accordData: accordData_7,   
        },
        { 
            id: '8',
            link: '#', 
            heading: 'Reproductive Health',
            subLinks: [
                {title: 'Contraceptive Use', link: '14', nestedLinks: []},
                // {title: 'Infertility', link: '#', nestedLinks: []},
                // {title: 'Reproductive Health', link: '#', nestedLinks: []},
            ], 
            accordName: 'accord_8', 
            accordData: accordData_8, 
        },
    ]

    const currentItem = () => {
        let target = diseases.find(i => i.id === nestedItem);
        if (target) return target;
        return {id: '', heading: '', cards: []};
    }

    return (
        <div className="bsn-global">
            <section className="breadcrumb-area" style={{backgroundImage: 'url(/assets/img/aboutUs/aboutus-background.jpg)'}}>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="breadcrumbs">
                                <h1>Health Topics</h1>
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
                                        <li><Link to="/">Home</Link></li>
                                        <li><span className="material-symbols-outlined notranslate">navigate_next</span></li>
                                        <li className="active">Health Topics</li>  
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

            <section className="articles-area" id="departments-single-area">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 col-md-8 col-sm-12 col-xs-12 pull-left">
                            <div className="departments-sidebar pt-0">
                                <div className="single-sidebar">
                                    <div className="title">
                                        <h3>Health Topics</h3>    
                                    </div>
                                    <ul className="all-departments border-0 tab-dropdown">
                                        {tabList.map(tabs => (
                                            <li className={tabs.id === active ? 'active' : ''} key={tabs.id}>
                                                <Link to={`#`} className="d-flex justify-content-between">
                                                    <span onClick={() => {setNestedItem('');setActive(tabs.id);scrollToContent(contentRef)}}>{tabs.heading}</span> <i className='bx bx-caret-down tab-toggler'></i>
                                                </Link>
                                                {tabs.subLinks.length > 0 && 
                                                <div className="menu-wrapper">
                                                    <ul className="all-departments border-0 tab-dropdown-item">
                                                        {tabs.subLinks.map(subLink => (
                                                            <li key={subLink.title}>
                                                                {subLink.nestedLinks.length ? 
                                                                <Link to={`#`} className="d-flex justify-content-between"><span>{subLink.title}</span> <i className='bx bx-caret-down tab-toggler'></i></Link> :
                                                                <Link to={`#`} onClick={() => {setNestedItem(subLink.link);scrollToContent(contentRef)}}><span>{subLink.title}s</span></Link>}
                                                                {subLink.nestedLinks.length > 0 && 
                                                                <div className="menu-wrapper">
                                                                    <ul className="all-departments border-0 tab-dropdown-item">
                                                                        {subLink.nestedLinks.map((nestedLink, n) => (
                                                                            <li key={n}>
                                                                                <Link to={`#`} onClick={() => {setNestedItem(nestedLink.link);scrollToContent(contentRef)}}>{nestedLink.title}</Link> 
                                                                            </li>
                                                                        ))}
                                                                    </ul>
                                                                </div>}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>}
                                            </li>
                                        ))}
                                    </ul>
                                </div> 
                            </div>    
                        </div>

                        <div className="col-lg-9 col-md-8 col-sm-12 col-xs-12 pull-right" ref={contentRef}>  
                            <div className="tab-box">
                                <div className="tab-content">
                                    {tabList.map(i => (
                                        <div className={`tab-pane ${!nestedItem && i.id === active ? 'active' : ''}`} key={i.id}>
                                            <section className="faq-content-area py-0">
                                                <div className="row">
                                                    <div className="col-md-12 col-sm-12 col-xs-12">
                                                        <div className="single-box mb-0">
                                                            <div className="sec-title pb-3">
                                                                <h1>{i.heading}</h1>
                                                                <span className="border"></span>
                                                            </div>
                                                            <MyAccordion2 customClass='accord-type-1' name={i.accordName} data={i.accordData} activeKey={''} handler={() => {}} trigger={<AccordButton/>} content={<AccordChild />} allOpen={true} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </section>                                            
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="tab-box">
                                <div className="tab-content">
                                    <div className={`tab-pane ${nestedItem ? 'active' : ''}`}>
                                        <section className="faq-content-area py-0">
                                            <div className="row">
                                                <div className="col-md-12 col-sm-12 col-xs-12">
                                                    <div className="single-box mb-0">
                                                        <div className="sec-title pb-3">
                                                            <h1 className="d-flex justify-content-between align-items-end">{currentItem().heading} <span onClick={() => {setNestedItem('')}} style={{fontSize: '0.8em', color: '#008fe3'}} role="button">Go Back</span></h1>
                                                            <span className="border"></span>
                                                        </div>
                                                        <div className="quick-contact career-sectoin mb-3 mb-lg-0">
                                                            <ul className="career">
                                                                {currentItem().cards?.map(i => (
                                                                    <li key={i.id}>
                                                                        <div className="careerLisRow d-flex justify-content-md-between justify-content-center">
                                                                            <div className="careerInfo w-100">
                                                                                <h3>{i.title}</h3>
                                                                                <ul className="list-group list-type-1 mt-2">
                                                                                    {i.itemList.map((a, n) => (
                                                                                        <li className="list-group-item" key={n}>
                                                                                            <i className='bx bx-radio-circle-marked mt-1'></i>
                                                                                            <div>
                                                                                                <p className="mb-0"> {a.topic}</p>
                                                                                                {a.source.text ? <Link className="source-link" to={a.source.link}><i className='bx bx-link align-middle text-danger'></i> {a.source.text}</Link> : ''}
                                                                                            </div>
                                                                                        </li>
                                                                                    ))}
                                                                                </ul>
                                                                            </div>
                                                                        </div>
                                                                    </li>
                                                                ))}
                                                                {currentItem().moreData?.length ? <li>
                                                                    <div className="careerLisRow d-flex justify-content-md-between justify-content-center">
                                                                        <div className="careerInfo w-100">
                                                                            <h3>More Data</h3>
                                                                            <ul className="list-group list-type-1 mt-2">
                                                                                {currentItem().moreData?.map((a, n) => (
                                                                                    <li className="list-group-item" key={n}>
                                                                                        <div>
                                                                                            {a.text ? <Link className="source-link" to={a.link}><i className='bx bx-link align-middle text-danger'></i> {a.text}</Link> : ''}
                                                                                        </div>
                                                                                    </li>
                                                                                ))}
                                                                            </ul>
                                                                        </div>
                                                                    </div>
                                                                </li> : ''}
                                                                {currentItem().relatedLinks?.length ? <li>
                                                                    <div className="careerLisRow d-flex justify-content-md-between justify-content-center">
                                                                        <div className="careerInfo w-100">
                                                                            <h3>Related Links</h3>
                                                                            <ul className="list-group list-type-1 mt-2">
                                                                                {currentItem().relatedLinks?.map((a, n) => (
                                                                                    <li className="list-group-item" key={n}>
                                                                                        <div>
                                                                                            {a.text ? <Link className="source-link" to={a.link}><i className='bx bx-link align-middle text-danger'></i> {a.text}</Link> : ''}
                                                                                        </div>
                                                                                    </li>
                                                                                ))}
                                                                            </ul>
                                                                        </div>
                                                                    </div>
                                                                </li> : ''}
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </section>                                            
                                    </div>
                                </div>
                            </div>
                        </div> 
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Articles;