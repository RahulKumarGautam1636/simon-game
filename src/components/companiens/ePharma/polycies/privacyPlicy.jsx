import { breadCrumbAction } from "../../../../actions";
import { useEffect } from "react";
import { connect } from "react-redux";
import { ePharmaId, TAKE_HOME_ID, takehomeMain, XYZ_ID } from "../../../../constants";
import { Link } from "react-router-dom";

const PrivacyPolicy = ({ breadCrumbAction, compCode }) => {

    useEffect(() => {
		breadCrumbAction({links: [{name: 'Home', link: '/'}, {name: 'Privacy Policy', link: '/privacyPolicy'}], activeLink: '/privacyPolicy'});
    },[breadCrumbAction])  

    if (compCode === XYZ_ID || compCode === ePharmaId) {
        return (
            <section id="privacy-policy" className="terms-conditions-styles">
                <div className="container">
                    <h1 className="head1 f-w-700 t-center mt-20 m-m-t-2">PRIVACY POLICY</h1>
                    <p className="para1 mt-20">
                        E-Pharma Healthcare Solutions Private Limited ("
                        <span className="f-w-600">E-Pharma</span>" or "
                        <span className="f-w-600">we"</span>) takes the privacy of your information
                        seriously. This privacy notice ("
                        <span className="f-w-600">Privacy Notice</span>") describes the types of
                        personal information we collect from you through our website (including
                        sub-domains and microsites) and mobile applications. It also describes the
                        purposes for which we collect that personal information, the other parties
                        with whom we may share it and the measures we take to protect the security
                        of your data. It also tells you about your rights and choices with respect
                        to your personal information, and how you can contact us about our privacy
                        practices.
                    </p>
                    <p className="para1 m-t-1">
                        You are advised to carefully read this Privacy Notice before using or
                        availing any of our products and/or services.
                    </p>
                    {/*2*/}
                    <ol className="para2_ol m-t-2 m-m-t-8" start={1}>
                        <li className="para2_li f-w-700">DEFINITIONS</li>
                    </ol>
                    <p className="para1 m-t-1 m-m-t-2">
                        In this Privacy Notice, the following definitions are used:
                    </p>
                    <p className="para1 f-w-600 m-t-1 m-m-t-3">Cookies</p>
                    <p className="para1">
                        a small file placed on your device by our website or mobile application when
                        you either visit or use certain features of our website or mobile
                        application. A cookie generally allows a website to remember your actions or
                        preference for a certain period of time.
                    </p>
                    <p className="para1 f-w-600 m-t-1 m-m-t-3">Data</p>
                    <p className="para1">
                        includes non-personal information, personal information and sensitive
                        personal information about you, which either directly or indirectly in
                        combination with other information, could allow you to be identified when
                        you visit our stores, website and/or mobile application.
                    </p>
                    <p className="para1 f-w-600 m-t-1 m-m-t-3">Data Protection Laws</p>
                    <p className="para1">
                        any applicable law for the time being in force relating to the processing of
                        Data.
                    </p>
                    <p className="para1 f-w-600 m-t-1 m-m-t-3">Partners</p>
                    <p className="para1">
                        select third parties (including E-Pharma Group Entities) with whom we have
                        contracts for the businesses described in this Privacy Notice.
                    </p>
                    <p className="para1 f-w-600 m-t-1 m-m-t-3">Service Providers</p>
                    <p className="para1">
                        includes entities to whom we or other E-Pharma Group Entities will disclose your
                        Data in order to process information for a specific purpose pursuant to
                        written contract.
                    </p>
                    <p className="para1 f-w-600 m-t-1 m-m-t-3">E-Pharma</p>
                    <p className="para1">
                        E-Pharma Healthcare Solutions Private Limited , a company incorporated in
                        India whose registered office is at Level 3, Vasant Square Mall, Pocket V,
                        Sector B, Vasant Kunj New Delhi South Delhi DL 110070
                    </p>
                    <p className="para1 f-w-600 m-t-1 m-m-t-3">E-Pharma Group Entity</p>
                    <p className="para1">
                        E-Pharma Private Limited, and its subsidiaries, affiliates, associate
                        companies and joint venture companies with whom we have a contractual
                        arrangement to, inter alia, share data for the purposes described in this
                        Privacy Notice.
                    </p>
                    <p className="para1 f-w-600 m-t-1 m-m-t-3">User or you</p>
                    <p className="para1">
                        the natural person who accesses our stores, website or mobile application.
                    </p>
                    {/*2*/}
                    <ol className="para2_ol m-t-3 m-m-t-8" start={2}>
                        <li className="para2_li f-w-700">WHAT DATA DO WE COLLECT ABOUT YOU</li>
                    </ol>
                    <p className="para1 m-t-1 m-m-t-2">
                        E-Pharma collects Data for various purposes set out in this Privacy Notice.
                    </p>
                    <p className="para1 m-t-1 m-m-t-3">
                        This Data includes, without limitation, the following categories:
                    </p>
                    <ol className="para1_ol m-t-1 m-m-t-3">
                        <li className="para1_li">
                        Contact information:{" "}
                        <span className="f-w-n">
                            first and last name, email address, postal address, country, employer,
                            phone number and other similar contact data.
                        </span>
                        </li>
                        <li className="para1_li">
                        Financial information:{" "}
                        <span className="f-w-n">
                            payment instrument information, transactions, transaction history,
                            preferences, method, mode and manner of payment, spending pattern or
                            trends, and other similar data.
                        </span>
                        </li>
                        <li className="para1_li">
                        Technical information:{" "}
                        <span className="f-w-n">
                            website, device and mobile app usage, Internet Protocol (IP) address and
                            similar information collected via automated means, such as cookies,
                            pixels and similar technologies.
                        </span>
                        </li>
                        <li className="para1_li">
                        Transaction information:{" "}
                        <span className="f-w-n">
                            the date of the transaction, total amount, transaction history and
                            preferences and related details.
                        </span>
                        </li>
                        <li className="para1_li">
                        <span className="f-w-n">
                            Health related information, such as information or records relating to
                            Your medical/ health history, health status, details of treatment plans
                            and medication prescribed by a Medical Practitioner, dosage details such
                            as frequency of dosage, alternative medication, medicines ordered by You
                            through the Platform, laboratory testing results and any other
                            information inferred there from
                        </span>
                        </li>
                        <li className="para1_li">
                        Product and service information:{" "}
                        <span className="f-w-n">
                            Your account membership number, registration and payment information,
                            and program-specific information, when you request products and/or
                            services directly from us, or participate in marketing programs.
                        </span>
                        </li>
                        <li className="para1_li">
                        Personal information:{" "}
                        <span className="f-w-n">
                            Age, sex, date of birth, marital status, nationality, details of
                            government identification documents provided, occupation, ethnicity,
                            religion, travel history or any other personal information provided in
                            responses to surveys or questionnaires.{" "}
                        </span>
                        </li>
                        <li className="para1_li">
                        <span className="f-w-n">
                            Your reviews, feedback and opinions about our products, programmes and
                            services.
                        </span>
                        </li>
                        <li className="para1_li">
                        Loyalty programme information:{" "}
                        <span className="f-w-n">
                            your loyalty membership information, account details, profile or
                            password details and any frequent flyer or travel partner programme
                            affiliation.
                        </span>
                        </li>
                    </ol>
                    {/*3*/}
                    <ol className="para2_ol m-t-3 m-m-t-8" start={3}>
                        <li className="para2_li f-w-700">HOW WE COLLECT DATA</li>
                    </ol>
                    <p className="para1 m-t-1 m-m-t-3">We collect Data in the following ways:</p>
                    <ol className="para1_ol m-t-1 m-m-t-3">
                        <li className="para1_li">
                        Information You Give Us:{" "}
                        <span className="f-w-n">
                            We receive and store any information you enter on our website or mobile
                            application or give us in any other way (e.g., at outlets, stores,
                            hotels, kiosks). Please see the section titled "Data Shared by You" for
                            more information.
                        </span>
                        </li>
                        <li className="para1_li">
                        Automatic Information We Collect:{" "}
                        <span className="f-w-n">
                            We use "cookies", pixels and similar technologies to receive and store
                            certain types of information whenever you interact with us. Please see
                            the section below, titled "Data that is Collected Automatically" for
                            more information.
                        </span>
                        </li>
                        <li className="para1_li">
                        E-mail Communications:{" "}
                        <span className="f-w-n">
                            To help us make e-mails more relevant and interesting, we often receive
                            a confirmation (if your device supports such capabilities) when you open
                            e-mail from us or click on a link in the e-mail. You can choose not to
                            receive marketing emails from us by clicking on the unsubscribe link in
                            any marketing email.
                        </span>
                        </li>
                        <li className="para1_li">
                        Automatic Information We Collect from Other Websites:{" "}
                        <span className="f-w-n">
                            We receive and store certain types of information when you interact with
                            third-party websites that use our technology or with whom we have a
                            specific agreement. Because we process this information on behalf of the
                            applicable website operators, collection, processing, and use of such
                            information is subject to the applicable website operators’ privacy
                            policies and is not covered by our Privacy Notice.{" "}
                        </span>
                        </li>
                        <li className="para1_li">
                        Information from Other Sources:{" "}
                        <span className="f-w-n">
                            We may obtain information from other sources. An example of this is when
                            you authorize a third-party website (such as the website of another E-Pharma
                            Group Entity), to interact directly with our website or mobile
                            application to provide or receive Data about you. In that case, we might
                            receive such Data used by that third-party website to identify your
                            account with that website.{" "}
                        </span>
                        </li>
                        <li className="para1_li">
                        Information Previously Provided to E-Pharma Group Entities:{" "}
                        <span className="f-w-n">
                            Where you have shared any information previously with any of the E-Pharma Group
                            Entities and have consented to the further sharing of such
                            information, such information will be shared with us by the E-Pharma Group
                            Entities.{" "}
                        </span>
                        </li>
                    </ol>
                    <p className="para1 m-t-1 m-m-t-3">
                        You can make choices about our collection and use of your Data. For example,
                        you may want to access, edit or remove your Data on our website or mobile
                        application. When you are asked to provide Data, you may decline.
                    </p>
                    {/*4*/}
                    <ol className="para2_ol m-t-3 m-m-t-8" start={4}>
                        <li className="para2_li f-w-700">DATA SHARED BY YOU</li>
                    </ol>
                    <p className="para1 m-t-1 m-m-t-3">
                        E-Pharma may collect your Data in several ways from your use of our stores,
                        website or mobile application. For instance:
                    </p>
                    <ol className="para1_ol m-t-1 m-m-t-3">
                        <li className="para1_li">
                        <span className="f-w-n">
                            when you register with us to receive our products and/or services;
                        </span>
                        </li>
                        <li className="para1_li">
                        <span className="f-w-n">
                            when you conduct a transaction with us or attempt a transaction at our
                            stores, on our website or mobile application;
                        </span>
                        </li>
                        <li className="para1_li">
                        <span className="f-w-n">
                            when you complete surveys conducted by or for us;
                        </span>
                        </li>
                        <li className="para1_li">
                        <span className="f-w-n">
                            when you elect to receive any communications (including promotional
                            offers) from us;{" "}
                        </span>
                        </li>
                        <li className="para1_li">
                        <span className="f-w-n">
                            from the information gathered by your visit to our stores, website or
                            mobile application;
                        </span>
                        </li>
                    </ol>
                    {/*5*/}
                    <ol className="para2_ol m-t-3 m-m-t-8" start={5}>
                        <li className="para2_li f-w-700">DATA THAT IS COLLECTED AUTOMATICALLY</li>
                    </ol>
                    <ol className="para1_ol m-t-1 m-m-t-3">
                        <li className="para1_li">
                        <span className="f-w-n">
                            We automatically collect some information when you visit our website or
                            use our mobile application. This information helps us to make
                            improvements to our content and navigation. The information collected
                            automatically includes your IP address.
                        </span>
                        </li>
                        <li className="para1_li">
                        <span className="f-w-n">
                            Our web servers or affiliates who provide analytics and performance
                            enhancement services collect IP addresses, operating system details,
                            browsing details, device details and language settings. This information
                            is aggregated to measure the number of visits, average time spent on the
                            site, pages viewed and similar information. E-Pharma uses this
                            information to measure the site usage, improve content and to ensure
                            safety and security, as well as enhance performance of our website or
                            mobile application.
                        </span>
                        </li>
                        <li className="para1_li">
                        <span className="f-w-n">
                            We may collect your Data automatically via Cookies, pixels and similar
                            technologies in line with settings on your browser. For more information
                            about Cookies, please see the section below, titled{" "}
                            <span className="f-w-600">"Cookies"</span>.
                        </span>
                        </li>
                    </ol>
                    {/*6*/}
                    <ol className="para2_ol m-t-3 m-m-t-8" start={6}>
                        <li className="para2_li f-w-700">OUR USE OF DATA</li>
                    </ol>
                    <p className="para1 m-t-1 m-m-t-3">
                        Any or all the above Data may be required by us from time to time to provide
                        information relating to E-Pharma and to work on the experience when using
                        our website or mobile application. Specifically, Data may be used by us for
                        the following reasons:
                    </p>
                    <ol className="para1_ol m-t-1 m-m-t-3">
                        <li className="para1_li">
                        <span className="f-w-n">
                            carry out our obligations arising from any contract entered into between
                            you and us;
                        </span>
                        </li>
                        <li className="para1_li">
                        <span className="f-w-n">
                            provide products and/or services and communicate with you about products
                            and/or services offered by us;
                        </span>
                        </li>
                        <li className="para1_li">
                        <span className="f-w-n">
                            enable E-Pharma Group Entities and Partners to offer their products and/or
                            services and communicate with you about such products and/or services;
                        </span>
                        </li>
                        <li className="para1_li">
                        <span className="f-w-n">
                            processing, disclosing, transmitting, and/or sharing the
                            data/information with E-Pharma Group Entities, and other third parties which
                            have business or contractual dealings with us;
                        </span>
                        </li>
                        <li className="para1_li">
                        <span className="f-w-n">
                            provide you with offers (including for financial products and/or
                            services), personalized services and recommendations and improve your
                            experience on our website and mobile application;{" "}
                        </span>
                        </li>
                        <li className="para1_li">
                        <span className="f-w-n">
                            operate, evaluate and improve our business, website and mobile
                            application;
                        </span>
                        </li>
                        <li className="para1_li">
                        <span className="f-w-n">
                            generate aggregated data to prepare insights to enable us to understand
                            customer behaviour, patterns and trends with a view to learning more
                            about your preferences or other characteristics;{" "}
                        </span>
                        </li>
                        <li className="para1_li">
                        <span className="f-w-n">
                            provide privileges and benefits to you, marketing and promotional
                            campaigns based on your profile;
                        </span>
                        </li>
                        <li className="para1_li">
                        <span className="f-w-n">
                            in connection with loyalty programs owned and operated by us or by other
                            E-Pharma Group Entities;
                        </span>
                        </li>
                        <li className="para1_li">
                        <span className="f-w-n">
                            communicate with you (including to respond to your requests, questions,
                            feedback, claims or disputes) and to customize and improve our services;
                        </span>
                        </li>
                        <li className="para1_li">
                        <span className="f-w-n">
                            to enhance your shopping experience and bring you access to membership
                            programs, rewards and offers across E-Pharma brands.
                        </span>
                        </li>
                        <li className="para1_li">
                        <span className="f-w-n">
                            enforce the terms of use of our website and mobile application;
                        </span>
                        </li>
                        <li className="para1_li">
                        <span className="f-w-n">
                            protect against and prevent fraud, illegal activity, harm, financial
                            loss and other legal or information security risks; and
                        </span>
                        </li>
                        <li className="para1_li">
                        <span className="f-w-n">
                            serve other purposes for which we provide specific notice at the time of
                            collection, and as otherwise authorized or required by applicable law.
                        </span>
                        </li>
                    </ol>
                    <p className="para1 m-t-1 m-m-t-3">
                        We treat these inferences as personal information (or sensitive personal
                        information, as the case may be), where required under applicable law. Some
                        of the above grounds for processing will overlap and there may be several
                        grounds which justify our use of your personal information.
                    </p>
                    <p className="para1 m-t-1 m-m-t-3">
                        Where required under applicable law, we will only use your personal
                        information (including sensitive personal information) with your consent; as
                        necessary to provide you with products and/or services; to comply with a
                        legal obligation; or when there is a legitimate interest that necessitates
                        the use.
                    </p>
                    {/*7*/}
                    <ol className="para2_ol m-t-3 m-m-t-8" start={7}>
                        <li className="para2_li f-w-700">MINORS</li>
                    </ol>
                    <p className="para1 m-t-1 m-m-t-3">
                        Our website and mobile application do not offer products or services for use
                        by minors. If you are under 18, you may use our website or mobile
                        application only with the involvement of a parent or guardian.
                    </p>
                    {/*8*/}
                    <ol className="para2_ol m-t-3 m-m-t-8" start={8}>
                        <li className="para2_li f-w-700">SHARING OF DATA</li>
                    </ol>
                    <p className="para1 m-t-1 m-m-t-3">We may share your Data with/ for:</p>
                    <ol className="para1_ol m-t-1 m-m-t-3">
                        <li className="para1_li">
                        Partners:{" "}
                        <span className="f-w-n">
                            &nbsp;We may make available to you services, products, or applications
                            provided by Partners for use on or through our website or mobile
                            application. If you choose to use such service, customer information
                            related to those transactions may be shared with such Partner.{" "}
                        </span>
                        <p className="m-t-half f-w-n">
                            Such Partners will be required to respect the security of your Data and
                            to treat it in accordance with this privacy policy and applicable law.
                        </p>
                        </li>
                        <li className="para1_li">
                        E-Pharma Group Entities:{" "}
                        <span className="f-w-n">
                            We may make available to you products, services and /or applications of
                            E-Pharma Group Entities, to assist them to reach out to you in relation to
                            their programs or campaigns and to process your queries and requests.
                            Accordingly, we may share your Data with E-Pharma Group Entities. We may
                            also share your Data with the E-Pharma Group Entities as is relevant for the
                            purposes set out in Clause 6 above, and to facilitate the operation of
                            our business.{" "}
                        </span>
                        </li>
                        <li className="para1_li">
                        E-Pharma Consumer Platform:{" "}
                        <span className="f-w-n">
                            Your Data may be shared with E-Pharma Group Entities and other participating
                            entities on the E-Pharma Consumer Platform operated by E-Pharma Digital Limited
                            ("TCP") for purposes of enrolment, offering you products, services and
                            benefits on the TCP. Accordingly, we may share your Data with other E-Pharma
                            Group Entities, Partners and Service Providers and as a part of this
                            unification your account information across several E-Pharma Companies may
                            be merged, to offer You a single login for seamless experience.{" "}
                        </span>
                        </li>
                        <li className="para1_li">
                        Service Providers:{" "}
                        <span className="f-w-n">
                            {" "}
                            We or other E-Pharma Group Entities may share your Data with Service
                            Providers. Examples include storing and analyzing Data, protecting and
                            securing our systems, providing search results and links, providing
                            customer service, credit analysis, processing your information for
                            profiling, user analysis and payment processing.{" "}
                        </span>
                        </li>
                        <li className="para1_li">
                        Information from Other Sources:{" "}
                        <span className="f-w-n">
                            We may obtain information from other sources. An example of this is when
                            you authorize a third-party website (such as the website of another E-Pharma
                            Group Entity), to interact directly with our website or mobile
                            application to provide or receive Data about you. In that case, we might
                            receive such Data used by that third-party website to identify your
                            account with that website.{" "}
                        </span>
                        <p className="para1 m-t-half f-w-n">
                            These Service Providers will be required to only process Data in
                            accordance with express instructions and as necessary to perform
                            services for purposes set forth in this Privacy Notice. The Service
                            Providers will also be required to safeguard the security and
                            confidentiality of the Data they process by implementing appropriate
                            technical and organizational security measures and confidentiality
                            obligations binding employees accessing Data.
                        </p>
                        </li>
                        <li className="para1_li">
                        Protecting E-Pharma:{" "}
                        <span className="f-w-n">
                            We may release Data when we believe release is appropriate to comply
                            with applicable law or legal process, enforce or apply the&nbsp;Terms of
                            Use of our website or mobile application and other agreements, protect
                            E-Pharma against harm or financial loss, when we believe disclosure is
                            necessary to protect individuals’ vital interests, or in connection with
                            an investigation of suspected or actual fraudulent or illegal activity.
                            This may include exchanging information with other companies and
                            organizations for fraud protection, risk management and dispute
                            resolution. This does not include selling or otherwise disclosing
                            personal information of users for commercial purposes in violation of
                            this Privacy Notice.{" "}
                        </span>
                        </li>
                        <li className="para1_li">
                        Business Transfers:{" "}
                        <span className="f-w-n">
                            As we continue to develop our business, we might sell or buy
                            subsidiaries or business units. Your Data (including in relation to
                            loyalty programs) may be transferred as part of such transaction. Any
                            Data that we receive from a third party pursuant to such transactions
                            will be processed in accordance with this Privacy Notice and applicable
                            law.{" "}
                        </span>
                        </li>
                        <li className="para1_li">
                        Third Parties:{" "}
                        <span className="f-w-n">
                            We may also share your Data with other third parties where:{" "}
                        </span>
                        <ul className="para3_ul m-t-half m-m-t-1">
                            <li className="para3_li">You request or authorize us to do so;</li>
                            <li className="para3_li">
                            We need to comply with applicable law or respond to valid legal
                            process; or
                            </li>
                            <li className="para3_li">
                            We need to operate and maintain the security of our website or mobile
                            application, including to prevent or stop an attack on our computer
                            systems or networks.
                            </li>
                        </ul>
                        <p className="para1 m-t-half f-w-n m-m-t-3">
                            We require these third parties by contract to only process sensitive
                            personal data in accordance with our instructions and as necessary to
                            perform services on our behalf or in compliance with applicable law. We
                            also require them to safeguard the security and confidentiality of the
                            sensitive personal data they process on our behalf by implementing
                            appropriate confidentiality, technical and organizational security
                            measures.
                        </p>
                        </li>
                    </ol>
                    <p className="para1 m-t-1 m-m-t-3">
                        Please note that E-Pharma Group Entities and Partners may have privacy practices
                        that differ from those of E-Pharma. The use of your Data will be governed by
                        their privacy statements when you provide Data on their websites.
                    </p>
                    {/*9*/}
                    <ol className="para2_ol m-t-3 m-m-t-8" start={9}>
                        <li className="para2_li f-w-700">KEEPING DATA SECURE</li>
                    </ol>
                    <p className="para1 m-t-1 m-m-t-3">
                        We will use technical and organisational measures to safeguard your Data and
                        we store your Data on secure servers. Technical and organisational measures
                        include measures to deal with any suspected data breach. If you suspect any
                        misuse or loss or unauthorised access to your Data, please let us know
                        immediately by contacting us by e-mail at our email address provided at
                        Clause 16 below.
                    </p>
                    {/*10*/}
                    <ol className="para2_ol_2 m-t-3 m-m-t-8" start={10}>
                        <li className="para2_li f-w-700">RETENTION OF DATA</li>
                    </ol>
                    <p className="para1 m-t-1 m-m-t-3">
                        E-Pharma retains Data for as long as necessary for the use of our products
                        and/or services or to provide access to and use of our website or mobile
                        application, or for other essential purposes such as complying with our
                        legal obligations, resolving disputes, enforcing our agreements and as long
                        as processing and retaining your Data is necessary and is permitted by
                        applicable law. Because these needs can vary for different data types and
                        purposes, actual retention periods can vary significantly.
                    </p>
                    <p className="para1 m-t-1 m-m-t-3">
                        Even if we delete your Data, including on account of exercise of your right
                        under Clause 10 below, it may persist on backup or archival media for audit,
                        legal, tax or regulatory purposes.
                    </p>
                    {/*11*/}
                    <ol className="para2_ol_2 m-t-3 m-m-t-8" start={11}>
                        <li className="para2_li f-w-700">YOUR RIGHTS AND CHOICES</li>
                    </ol>
                    <p className="para1 m-t-1 m-m-t-3">
                        When we process Data about you, we do so with your consent and/or as
                        necessary to operate our business, meet our contractual and legal
                        obligations, protect the security of our systems and our customers, or
                        fulfil other legitimate interests of E-Pharma as described in this Privacy
                        Notice.
                        <br />
                        You have the following rights in relation to your sensitive personal
                        information and you can exercise it by submitting a request as described in
                        the <span className="f-w-600">"How to Contact Us"</span> section below.
                    </p>
                    <ul className="para3_ul m-t-half m-m-t-1">
                        <li className="para3_li">Right to Access, Review and Modify</li>
                        <li className="para3_li">Right to Correction</li>
                        <li className="para3_li">Right to Withdraw Consent</li>
                    </ul>
                    <p className="para1 m-t-1 m-m-t-3">
                        It is important that the Data we hold about you is accurate and current.
                        Please keep us informed if your personal information changes during the
                        period for which we hold it.
                    </p>
                    {/*12*/}
                    <ol className="para2_ol_2 m-t-3 m-m-t-8" start={12}>
                        <li className="para2_li f-w-700">WHERE WE STORE DATA</li>
                    </ol>
                    <p className="para1 m-t-1 m-m-t-3">
                        Data collected under this Privacy Notice is hosted on servers located in
                        India.
                    </p>
                    {/*13*/}
                    <ol className="para2_ol_2 m-t-3 m-m-t-8" start={13}>
                        <li className="para2_li f-w-700">PROCESSING YOUR DATA</li>
                    </ol>
                    <p className="para1 m-t-1 m-m-t-3">
                        We take steps to ensure that the Data we collect under this Privacy Notice
                        is processed according to the provisions of this Privacy Notice and the
                        requirements of applicable law.
                    </p>
                    <p className="para1 m-t-1 m-m-t-3">
                        To ensure that your Data receives an adequate level of protection, we have
                        put in place appropriate written contracts with E-Pharma Group Entities,
                        Partners and Service Providers that we share your Data with. This ensures
                        your Data is treated by such parties in a way that is consistent with
                        applicable law.
                    </p>
                    {/*13*/}
                    <ol className="para2_ol_2 m-t-3 m-m-t-8" start={14}>
                        <li className="para2_li f-w-700">APP PERMISSIONS THAT WE CAPTURE</li>
                    </ol>
                    <p className="para1 m-t-1 m-m-t-2">
                        We ask for the following app permissions while onboarding, in order to
                        optimize the experience for you:
                    </p>
                    <p className="para1 f-w-600 m-t-1 m-m-t-3">Location</p>
                    <p className="para1">
                        It is recommended that you set your location sharing 'Always' as it helps us
                        to show you location specific data like availability of products. You can
                        change this anytime.
                    </p>
                    <p className="para1 f-w-600 m-t-1 m-m-t-3">Camera</p>
                    <p className="para1">
                        To allow you to take a photo of prescriptions &amp; directly upload it to
                        the app.
                    </p>
                    <p className="para1 f-w-600 m-t-1 m-m-t-3">Photos/Media/Files</p>
                    <p className="para1">
                        Media access permission is needed to store and retrieve your uploads such as
                        prescription uploads on your device.
                    </p>
                    <p className="para1 f-w-600 m-t-1 m-m-t-3">SMS</p>
                    <p className="para1">
                        To support automatic OTP confirmation, so that you don't have to enter the
                        authentication code manually.
                    </p>
                    <p className="para1 f-w-600 m-t-1 m-m-t-3">Receive SMS</p>
                    <p className="para1">
                        This helps us to send you payment related SMS by our payment partner
                        JustPay.
                    </p>
                    <p className="para1 f-w-600 m-t-1 m-m-t-3">Access Wifi State</p>
                    <p className="para1">
                        This helps us to optimize your experience based on the Wifi’s strength and
                        signals, especially for optimizing video consultations.
                    </p>
                    <p className="para1 f-w-600 m-t-1 m-m-t-3">Record Audio</p>
                    <p className="para1">To enable video consultations with doctors.</p>
                    <p className="para1 f-w-600 m-t-1 m-m-t-3">Bluetooth</p>
                    <p className="para1">
                        Bluetooth is used to redirect to bluetooth headset during video
                        consultations.
                    </p>
                    {/*15*/}
                    <ol className="para2_ol_2 m-t-3 m-m-t-8" start={15}>
                        <li className="para2_li f-w-700">SEVERABILITY</li>
                    </ol>
                    <p className="para1 m-t-1 m-m-t-3">
                        If any court or competent authority finds that any provision of this Privacy
                        Notice (or part of any provision) is invalid, illegal or unenforceable, that
                        provision or part-provision will, to the extent required, be deemed to be
                        deleted, and the validity and enforceability of the other provisions of this
                        Privacy Notice will not be affected.
                    </p>
                    {/*16*/}
                    <ol className="para2_ol_2 m-t-3 m-m-t-8" start={16}>
                        <li className="para2_li f-w-700">CHANGES TO THIS PRIVACY NOTICE</li>
                    </ol>
                    <p className="para1 m-t-1 m-m-t-3">
                        Our business changes constantly and our Privacy Notice may also change . We
                        may e-mail periodic reminders of our notices and conditions, unless you have
                        instructed us not to, but you should check our website and mobile
                        application frequently to see recent changes. The updated version will be
                        effective as soon as it is accessible. Any changes will be immediately
                        posted on our website and mobile application and you are deemed to have
                        accepted the terms of the updated Privacy Notice on your first use of our
                        website or mobile application or first purchase of the products and/or
                        services following the alterations. We encourage you to review this Privacy
                        Notice frequently to be informed of how we are protecting your information.
                    </p>
                    {/*17*/}
                    <ol className="para2_ol_2 m-t-3 m-m-t-8" start={17}>
                        <li className="para2_li f-w-700">HOW TO CONTACT US</li>
                    </ol>
                    <p className="para1 m-t-1 m-m-t-3">
                        To request to access, review, update, or withdraw your consent for your
                        personal information or to otherwise reach us, please&nbsp;submit a request
                        by e-mailing us at{" "}
                        <a
                        href="mailto:care@1mg.com"
                        style={{
                            textDecoration: "none",
                            color: "#ff6f61",
                            cursor: "pointer",
                            fontWeight: 600
                        }}
                        >
                        care@1mg.com
                        </a>
                        . You may contact us for information on Service Providers, Partners and E-Pharma
                        Group Entities with whom we may share your Data in compliance with this
                        Privacy Notice and applicable law. We will respond to your request within 30
                        days.
                    </p>
                    {/*18*/}
                    <ol className="para2_ol_2 m-t-3 m-m-t-8" start={18}>
                        <li className="para2_li f-w-700">GRIEVANCE OFFICER</li>
                    </ol>
                    <p className="para1 m-t-1 m-m-t-3">
                        Please see below the details of our grievance officer:
                    </p>
                    <p className="para1 m-t-1 m-m-t-3">
                        <span className="f-w-600">Name: </span>
                        <span className="f-w-600">Ms. Siji George</span>
                    </p>
                    <p className="para1 m-t-1 m-m-t-3">
                        <span className="f-w-600">
                        Email:{" "}
                        <a
                            href="mailto:care@1mg.com"
                            style={{ textDecoration: "none", color: "#ff6f61", cursor: "pointer" }}
                        >
                            grievance-officer@1mg.com{" "}
                        </a>
                        </span>
                    </p>
                    <p className="para1 m-t-1 m-m-t-3">
                        <span className="f-w-600"> Address:</span> Grievance Officer, 1mg to Level
                        3, Vasant Square Mall, Pocket V, Sector B, Vasant Kunj New Delhi South Delhi
                        DL 110070
                    </p>
                </div>
            </section>
        )
    } else if(compCode === TAKE_HOME_ID) {
        return (
            <div className={`container !py-6`}>
                <style>
                    {`
                        p.MsoNormal,
                        li.MsoNormal,
                        div.MsoNormal {
                            margin-top: 0in;
                            margin-right: 0in;
                            margin-bottom: 8.0pt;
                            margin-left: 0in;
                            line-height: 115%;
                            font-size: 12.0pt;
                            font-family: "Calibri", sans-serif;
                        }

                        a:link,
                        span.MsoHyperlink {
                            color: #0563C1;
                        }

                        .MsoChpDefault {
                            font-size: 12.0pt;
                            font-family: "Calibri", sans-serif;
                        }

                        @page WordSection1 {
                            size: 8.5in 11.0in;
                            margin: 1.0in 1.0in 1.0in 1.0in;
                        }

                        div.WordSection1 {
                            page: WordSection1;
                        }

                        ol {
                            margin-bottom: 0in;
                            padding: 0;
                        }

                        ul {
                            margin-bottom: 0in;
                        }
                    `}
                </style>
                <div className="WordSection1">
                    {takehomeMain && <div className="pb-4 pb-lg-0 pt-lg-4 foot-links justify-content-center d-flex flex-wrap align-items-start" style={{ gap: "1em 1.4em" }}>
                        <Link to="/">HOME</Link>
                        <Link to="/contactUs">CONTACT US</Link>
                        <Link to="/aboutUs">ABOUT US</Link>
                    </div>}
                    <p className="MsoNormal">
                        <b>PRIVACY POLICY</b>
                    </p>
                    <p className="MsoNormal" style={{ textAlign: "justify" }}>
                        "<b>TakeHome</b>" or "<b>we"</b> takes the privacy of your information
                        seriously. This privacy notice ("<b>Privacy Notice</b>") describes the types
                        of personal information we collect from you through our website (including
                        sub-domains and microsites) and mobile applications. It also describes the
                        purposes for which we collect that personal information, the other parties
                        with whom we may share it and the measures we take to protect the security
                        of your data. It also tells you about your rights and choices with respect
                        to your personal information, and how you can contact us about our privacy
                        practices.
                    </p>
                    <p className="MsoNormal" style={{ textAlign: "justify" }}>
                        You are advised to carefully read this Privacy Notice before using or
                        availing any of our products and/or services.
                    </p>
                    <ol style={{ marginTop: "0in" }} start={1} type={1}>
                        <li className="MsoNormal">
                        <b>DEFINITIONS</b>
                        </li>
                    </ol>
                    <p className="MsoNormal">
                        In this Privacy Notice, the following definitions are used:
                    </p>
                    <p className="MsoNormal">
                        <b>Cookies</b>
                    </p>
                    <p className="MsoNormal" style={{ textAlign: "justify" }}>
                        a small file placed on your device by our website or mobile application when
                        you either visit or use certain features of our website or mobile
                        application. A cookie generally allows a website to remember your actions or
                        preference for a certain period of time.
                    </p>
                    <p className="MsoNormal">
                        <b>Data</b>
                    </p>
                    <p className="MsoNormal" style={{ textAlign: "justify" }}>
                        includes non-personal information, personal information and sensitive
                        personal information about you, which either directly or indirectly in
                        combination with other information, could allow you to be identified when
                        you visit our stores, website and/or mobile application.
                    </p>
                    <p className="MsoNormal">
                        <b>Data Protection Laws</b>
                    </p>
                    <p className="MsoNormal">
                        any applicable law for the time being in force relating to the processing of
                        Data.
                    </p>
                    <p className="MsoNormal">
                        <b>Partners</b>
                    </p>
                    <p className="MsoNormal" style={{ textAlign: "justify" }}>
                        select third parties (including <b>TakaHome</b>Group Entities) with whom we
                        have contracts for the businesses described in this Privacy Notice.
                    </p>
                    <p className="MsoNormal">
                        <b>Service Providers</b>
                    </p>
                    <p className="MsoNormal" style={{ textAlign: "justify" }}>
                        includes entities to whom we or other <b>TakeHome</b> Group Entities will
                        disclose your Data in order to process information for a specific purpose
                        pursuant to written contract.
                    </p>
                    <p className="MsoNormal">
                        <b>TakeHome</b>
                    </p>
                    <p className="MsoNormal" style={{ textAlign: "justify" }}>
                        <b>TakeHome Agro Private Limited,</b>a company incorporated in India whose
                        registered office is at Plot No. B-1/312, Labonya Apartment, Ground floor,
                        Chittaranjan Park, Kalyani-741235, Nadia, West Bengal, India.{" "}
                    </p>
                    <p className="MsoNormal" style={{ textAlign: "justify" }}>
                        <b>TakeHome Group Entity</b>
                    </p>
                    <p className="MsoNormal" style={{ textAlign: "justify" }}>
                        <b>TakeHome Agro Private Limited,</b>
                        and its subsidiaries, affiliates, associate companies and joint venture
                        companies with whom we have a contractual arrangement to, inter alia, share
                        data for the purposes described in this Privacy Notice.
                    </p>
                    <p className="MsoNormal">
                        <b>User or you</b>
                    </p>
                    <p className="MsoNormal">
                        the natural person who accesses our stores, website or mobile application.
                    </p>
                    <ol style={{ marginTop: "0in" }} start={2} type={1}>
                        <li className="MsoNormal">
                        <b>WHAT DATA DO WE COLLECT ABOUT YOU</b>
                        </li>
                    </ol>
                    <p className="MsoNormal">
                        TakeHome collects Data for various purposes set out in this Privacy Notice.
                    </p>
                    <p className="MsoNormal">
                        This Data includes, without limitation, the following categories:
                    </p>
                    <ol style={{ marginTop: "0in" }} start={1} type="A">
                        <li className="MsoNormal" style={{ textAlign: "justify" }}>
                        <b>Contact information:&nbsp;</b>first and last name, email address,
                        postal address, country, employer, phone number and other similar contact
                        data.
                        </li>
                        <li className="MsoNormal" style={{ textAlign: "justify" }}>
                        <b>Financial information:&nbsp;</b>payment instrument information,
                        transactions, transaction history, preferences, method, mode and manner of
                        payment, spending pattern or trends, and other similar data.
                        </li>
                        <li className="MsoNormal" style={{ textAlign: "justify" }}>
                        <b>Technical information:&nbsp;</b>website, device and mobile app usage,
                        Internet Protocol (IP) address and similar information collected via
                        automated means, such as cookies, pixels and similar technologies.
                        </li>
                        <li className="MsoNormal" style={{ textAlign: "justify" }}>
                        <b>Transaction information:&nbsp;</b>the date of the transaction, total
                        amount, transaction history and preferences and related details.
                        </li>
                        <li className="MsoNormal" style={{ textAlign: "justify" }}>
                        Health related information, such as information or records relating to
                        Your medical/ health history, health status, details of treatment plans
                        and medication prescribed by a Medical Practitioner, dosage details such
                        as frequency of dosage, alternative medication, medicines ordered by You
                        through the Platform, laboratory testing results and any other information
                        inferred there from
                        </li>
                        <li className="MsoNormal" style={{ textAlign: "justify" }}>
                        <b>Product and service information:&nbsp;</b>Your account membership
                        number, registration and payment information, and program-specific
                        information, when you request products and/or services directly from us,
                        or participate in marketing programs.
                        </li>
                        <li className="MsoNormal" style={{ textAlign: "justify" }}>
                        <b>Personal information:&nbsp;</b>Age, sex, date of birth, marital status,
                        nationality, details of government identification documents provided,
                        occupation, ethnicity, religion, travel history or any other personal
                        information provided in responses to surveys or questionnaires.
                        </li>
                        <li className="MsoNormal">
                        Your reviews, feedback and opinions about our products, programmes and
                        services.
                        </li>
                        <li className="MsoNormal" style={{ textAlign: "justify" }}>
                        <b>Loyalty programme information:&nbsp;</b>your loyalty membership
                        information, account details, profile or password details and any frequent
                        flyer or travel partner programme affiliation.
                        </li>
                    </ol>
                    <ol style={{ marginTop: "0in" }} start={3} type={1}>
                        <li className="MsoNormal">
                        <b>HOW WE COLLECT DATA</b>
                        </li>
                    </ol>
                    <p className="MsoNormal">We collect Data in the following ways:</p>
                    <ol style={{ marginTop: "0in" }} start={1} type="A">
                        <li className="MsoNormal" style={{ textAlign: "justify" }}>
                        <b>Information You Give Us:&nbsp;</b>We receive and store any information
                        you enter on our website or mobile application or give us in any other way
                        (e.g., at outlets, stores, hotels, kiosks). Please see the section titled
                        "Data Shared by You" for more information.
                        </li>
                        <li className="MsoNormal" style={{ textAlign: "justify" }}>
                        <b>Automatic Information We Collect:&nbsp;</b>We use "cookies", pixels and
                        similar technologies to receive and store certain types of information
                        whenever you interact with us. Please see the section below, titled "Data
                        that is Collected Automatically" for more information.
                        </li>
                        <li className="MsoNormal" style={{ textAlign: "justify" }}>
                        <b>E-mail Communications:&nbsp;</b>To help us make e-mails more relevant
                        and interesting, we often receive a confirmation (if your device supports
                        such capabilities) when you open e-mail from us or click on a link in the
                        e-mail. You can choose not to receive marketing emails from us by clicking
                        on the unsubscribe link in any marketing email.
                        </li>
                        <li className="MsoNormal" style={{ textAlign: "justify" }}>
                        <b>Automatic Information We Collect from Other Websites:&nbsp;</b>We
                        receive and store certain types of information when you interact with
                        third-party websites that use our technology or with whom we have a
                        specific agreement. Because we process this information on behalf of the
                        applicable website operators, collection, processing, and use of such
                        information is subject to the applicable website operators’ privacy
                        policies and is not covered by our Privacy Notice.
                        </li>
                        <li className="MsoNormal" style={{ textAlign: "justify" }}>
                        <b>Information from Other Sources:&nbsp;</b>We may obtain information from
                        other sources. An example of this is when you authorize a third-party
                        website (such as the website of another Tata Group Entity), to interact
                        directly with our website or mobile application to provide or receive Data
                        about you. In that case, we might receive such Data used by that
                        third-party website to identify your account with that website.
                        </li>
                        <li className="MsoNormal" style={{ textAlign: "justify" }}>
                        <b>Information Previously Provided to TakeHome Group Entities:&nbsp;</b>
                        Where you have shared any information previously with any of the TakeHome
                        Group Entities and have consented to the further sharing of such
                        information, such information will be shared with us by the TakeHome Group
                        Entities.
                        </li>
                    </ol>
                    <p className="MsoNormal" style={{ textAlign: "justify" }}>
                        You can make choices about our collection and use of your Data. For example,
                        you may want to access, edit or remove your Data on our website or mobile
                        application. When you are asked to provide Data, you may decline.
                    </p>
                    <ol style={{ marginTop: "0in" }} start={4} type={1}>
                        <li className="MsoNormal" style={{ textAlign: "justify" }}>
                        <b>DATA SHARED BY YOU</b>
                        </li>
                    </ol>
                    <p className="MsoNormal" style={{ textAlign: "justify" }}>
                        TakeHome may collect your Data in several ways from your use of our stores,
                        website or mobile application. For instance:
                    </p>
                    <ol style={{ marginTop: "0in" }} start={1} type="A">
                        <li className="MsoNormal" style={{ textAlign: "justify" }}>
                        when you register with us to receive our products and/or services;
                        </li>
                        <li className="MsoNormal" style={{ textAlign: "justify" }}>
                        when you conduct a transaction with us or attempt a transaction at our
                        stores, on our website or mobile application;
                        </li>
                        <li className="MsoNormal" style={{ textAlign: "justify" }}>
                        when you complete surveys conducted by or for us;
                        </li>
                        <li className="MsoNormal" style={{ textAlign: "justify" }}>
                        when you elect to receive any communications (including promotional
                        offers) from us;
                        </li>
                        <li className="MsoNormal" style={{ textAlign: "justify" }}>
                        from the information gathered by your visit to our stores, website or
                        mobile application;
                        </li>
                    </ol>
                    <ol style={{ marginTop: "0in" }} start={5} type={1}>
                        <li className="MsoNormal" style={{ textAlign: "justify" }}>
                        <b>DATA THAT IS COLLECTED AUTOMATICALLY</b>
                        </li>
                    </ol>
                    <ol style={{ marginTop: "0in" }} start={1} type="A">
                        <li className="MsoNormal" style={{ textAlign: "justify" }}>
                        We automatically collect some information when you visit our website or
                        use our mobile application. This information helps us to make improvements
                        to our content and navigation. The information collected automatically
                        includes your IP address.
                        </li>
                        <li className="MsoNormal" style={{ textAlign: "justify" }}>
                        Our web servers or affiliates who provide analytics and performance
                        enhancement services collect IP addresses, operating system details,
                        browsing details, device details and language settings. This information
                        is aggregated to measure the number of visits, average time spent on the
                        site, pages viewed and similar information. Tata 1mg uses this information
                        to measure the site usage, improve content and to ensure safety and
                        security, as well as enhance performance of our website or mobile
                        application.
                        </li>
                        <li className="MsoNormal" style={{ textAlign: "justify" }}>
                        We may collect your Data automatically via Cookies, pixels and similar
                        technologies in line with settings on your browser. For more information
                        about Cookies, please see the section below, titled&nbsp;<b>"Cookies"</b>.
                        </li>
                    </ol>
                    <ol style={{ marginTop: "0in" }} start={6} type={1}>
                        <li className="MsoNormal">
                        <b>OUR USE OF DATA</b>
                        </li>
                    </ol>
                    <p className="MsoNormal" style={{ textAlign: "justify" }}>
                        Any or all the above Data may be required by us from time to time to provide
                        information relating to Tata 1mg and to work on the experience when using
                        our website or mobile application. Specifically, Data may be used by us for
                        the following reasons:
                    </p>
                    <ol style={{ marginTop: "0in" }} start={1} type="A">
                        <li className="MsoNormal" style={{ textAlign: "justify" }}>
                        carry out our obligations arising from any contract entered into between
                        you and us;
                        </li>
                        <li className="MsoNormal" style={{ textAlign: "justify" }}>
                        provide products and/or services and communicate with you about products
                        and/or services offered by us;
                        </li>
                        <li className="MsoNormal" style={{ textAlign: "justify" }}>
                        enable TakeHome Group Entities and Partners to offer their products and/or
                        services and communicate with you about such products and/or services;
                        </li>
                        <li className="MsoNormal" style={{ textAlign: "justify" }}>
                        processing, disclosing, transmitting, and/or sharing the data/information
                        with TakeHome Group Entities, and other third parties which have business
                        or contractual dealings with us;
                        </li>
                        <li className="MsoNormal" style={{ textAlign: "justify" }}>
                        provide you with offers (including for financial products and/or
                        services), personalized services and recommendations and improve your
                        experience on our website and mobile application;
                        </li>
                        <li className="MsoNormal" style={{ textAlign: "justify" }}>
                        operate, evaluate and improve our business, website and mobile
                        application;
                        </li>
                        <li className="MsoNormal" style={{ textAlign: "justify" }}>
                        Generate aggregated data to prepare insights to enable us to understand
                        customer behaviour, patterns and trends with a view to learning more about
                        your preferences or other characteristics;
                        </li>
                        <li className="MsoNormal" style={{ textAlign: "justify" }}>
                        Provide privileges and benefits to you, marketing and promotional
                        campaigns based on your profile;
                        </li>
                        <li className="MsoNormal" style={{ textAlign: "justify" }}>
                        In connection with loyalty programs owned and operated by us or by other
                        TakeHome Group Entities;
                        </li>
                        <li className="MsoNormal" style={{ textAlign: "justify" }}>
                        Communicate with you (including to respond to your requests, questions,
                        feedback, claims or disputes) and to customize and improve our services;
                        </li>
                        <li className="MsoNormal" style={{ textAlign: "justify" }}>
                        To enhance your shopping experience and bring you access to membership
                        programs, rewards and offers across Tata brands.
                        </li>
                        <li className="MsoNormal" style={{ textAlign: "justify" }}>
                        Enforce the terms of use of our website and mobile application;
                        </li>
                        <li className="MsoNormal" style={{ textAlign: "justify" }}>
                        Protect against and prevent fraud, illegal activity, harm, financial loss
                        and other legal or information security risks; and
                        </li>
                        <li className="MsoNormal" style={{ textAlign: "justify" }}>
                        Serve other purposes for which we provide specific notice at the time of
                        collection, and as otherwise authorized or required by applicable law.
                        </li>
                    </ol>
                    <p className="MsoNormal" style={{ textAlign: "justify" }}>
                        We treat these inferences as personal information (or sensitive personal
                        information, as the case may be), where required under applicable law. Some
                        of the above grounds for processing will overlap and there may be several
                        grounds which justify our use of your personal information.
                    </p>
                    <p className="MsoNormal" style={{ textAlign: "justify" }}>
                        Where required under applicable law, we will only use your personal
                        information (including sensitive personal information) with your consent; as
                        necessary to provide you with products and/or services; to comply with a
                        legal obligation; or when there is a legitimate interest that necessitates
                        the use.
                    </p>
                    <ol style={{ marginTop: "0in" }} start={7} type={1}>
                        <li className="MsoNormal" style={{ textAlign: "justify" }}>
                        <b>MINORS</b>
                        </li>
                    </ol>
                    <p className="MsoNormal" style={{ textAlign: "justify" }}>
                        Our website and mobile application do not offer products or services for use
                        by minors. If you are under 18, you may use our website or mobile
                        application only with the involvement of a parent or guardian.
                    </p>
                    <ol style={{ marginTop: "0in" }} start={8} type={1}>
                        <li className="MsoNormal" style={{ textAlign: "justify" }}>
                        <b>SHARING OF DATA</b>
                        </li>
                    </ol>
                    <p className="MsoNormal" style={{ textAlign: "justify" }}>
                        We may share your Data with/ for:
                    </p>
                    <ol style={{ marginTop: "0in" }} start={1} type="A">
                        <li className="MsoNormal" style={{ textAlign: "justify" }}>
                        <b>Partners:&nbsp;</b>&nbsp;We may make available to you services,
                        products, or applications provided by Partners for use on or through our
                        website or mobile application. If you choose to use such service, customer
                        information related to those transactions may be shared with such Partner.
                        </li>
                    </ol>
                    <p className="MsoNormal" style={{ textAlign: "justify" }}>
                        Such Partners will be required to respect the security of your Data and to
                        treat it in accordance with this privacy policy and applicable law.
                    </p>
                    <ol style={{ marginTop: "0in" }} start={2} type="A">
                        <li className="MsoNormal" style={{ textAlign: "justify" }}>
                        <b>TakeHome Group Entities:&nbsp;</b>We may make available to you
                        products, services and /or applications of TakeHome Group Entities, to
                        assist them to reach out to you in relation to their programs or campaigns
                        and to process your queries and requests. Accordingly, we may share your
                        Data with TakeHome Group Entities. We may also share your Data with the
                        TakeHome Group Entities as is relevant for the purposes set out in Clause
                        6 above, and to facilitate the operation of our business.
                        </li>
                        <li className="MsoNormal" style={{ textAlign: "justify" }}>
                        <b>TakeHome Consumer Platform:&nbsp;</b>Your Data may be shared with
                        TakeHome Group Entities and other participating entities on the TakeHome
                        Consumer Platform operated by TakeHome Agro Private Limited for purposes
                        of enrolment, offering you products, services and benefits on the TAPL.
                        Accordingly, we may share your Data with other <b>TakeHome</b> Group
                        Entities, Partners and Service Providers and as a part of this unification
                        your account information across several <b>TakeHome</b> Companies may be
                        merged, to offer You a single login for seamless experience.
                        </li>
                        <li className="MsoNormal" style={{ textAlign: "justify" }}>
                        <b>Service Providers:&nbsp;</b>We or other TakeHome Group Entities may
                        share your Data with Service Providers. Examples include storing and
                        analyzing Data, protecting and securing our systems, providing search
                        results and links, providing customer service, credit analysis, processing
                        your information for profiling, user analysis and payment processing.
                        </li>
                        <li className="MsoNormal" style={{ textAlign: "justify" }}>
                        <b>Information from Other Sources:&nbsp;</b>We may obtain information from
                        other sources. An example of this is when you authorize a third-party
                        website (such as the website of another TakeHome Group Entity), to
                        interact directly with our website or mobile application to provide or
                        receive Data about you. In that case, we might receive such Data used by
                        that third-party website to identify your account with that website.
                        </li>
                    </ol>
                    <p className="MsoNormal" style={{ textAlign: "justify" }}>
                        These Service Providers will be required to only process Data in accordance
                        with express instructions and as necessary to perform services for purposes
                        set forth in this Privacy Notice. The Service Providers will also be
                        required to safeguard the security and confidentiality of the Data they
                        process by implementing appropriate technical and organizational security
                        measures and confidentiality obligations binding employees accessing Data.
                    </p>
                    <ol style={{ marginTop: "0in" }} start={6} type="A">
                        <li className="MsoNormal" style={{ textAlign: "justify" }}>
                        <b>Protecting TakeHome:&nbsp;</b>We may release Data when we believe
                        release is appropriate to comply with applicable law or legal process,
                        enforce or apply the&nbsp;Terms of Use of our website or mobile
                        application and other agreements, protect <b>TakeHome</b>against harm or
                        financial loss, when we believe disclosure is necessary to protect
                        individuals’ vital interests, or in connection with an investigation of
                        suspected or actual fraudulent or illegal activity. This may include
                        exchanging information with other companies and organizations for fraud
                        protection, risk management and dispute resolution. This does not include
                        selling or otherwise disclosing personal information of users for
                        commercial purposes in violation of this Privacy Notice.
                        </li>
                        <li className="MsoNormal" style={{ textAlign: "justify" }}>
                        <b>Business Transfers:&nbsp;</b>As we continue to develop our business, we
                        might sell or buy subsidiaries or business units. Your Data (including in
                        relation to loyalty programs) may be transferred as part of such
                        transaction. Any Data that we receive from a third party pursuant to such
                        transactions will be processed in accordance with this Privacy Notice and
                        applicable law.
                        </li>
                        <li className="MsoNormal" style={{ textAlign: "justify" }}>
                        <b>Third Parties:&nbsp;</b>We may also share your Data with other third
                        parties where:
                        </li>
                        <ul style={{ marginTop: "0in" }} type="disc">
                        <li className="MsoNormal" style={{ textAlign: "justify" }}>
                            You request or authorize us to do so;
                        </li>
                        <li className="MsoNormal" style={{ textAlign: "justify" }}>
                            We need to comply with applicable law or respond to valid legal process;
                            or
                        </li>
                        <li className="MsoNormal" style={{ textAlign: "justify" }}>
                            We need to operate and maintain the security of our website or mobile
                            application, including to prevent or stop an attack on our computer
                            systems or networks.
                        </li>
                        </ul>
                    </ol>
                    <p className="MsoNormal" style={{ textAlign: "justify" }}>
                        We require these third parties by contract to only process sensitive
                        personal data in accordance with our instructions and as necessary to
                        perform services on our behalf or in compliance with applicable law. We also
                        require them to safeguard the security and confidentiality of the sensitive
                        personal data they process on our behalf by implementing appropriate
                        confidentiality, technical and organizational security measures.
                    </p>
                    <p className="MsoNormal" style={{ textAlign: "justify" }}>
                        Please note that TakeHome Group Entities and Partners may have privacy
                        practices that differ from those of TakeHome. The use of your Data will be
                        governed by their privacy statements when you provide Data on their
                        websites.
                    </p>
                    <ol style={{ marginTop: "0in" }} start={9} type={1}>
                        <li className="MsoNormal" style={{ textAlign: "justify" }}>
                        <b>KEEPING DATA SECURE</b>
                        </li>
                    </ol>
                    <p className="MsoNormal" style={{ textAlign: "justify" }}>
                        We will use technical and organizational measures to safeguard your Data and
                        we store your Data on secure servers. Technical and organizational measures
                        include measures to deal with any suspected data breach. If you suspect any
                        misuse or loss or unauthorized access to your Data, please let us know
                        immediately by contacting us by e-mail at our email address provided at
                        Clause 16 below.
                    </p>
                    <ol style={{ marginTop: "0in" }} start={10} type={1}>
                        <li className="MsoNormal" style={{ textAlign: "justify" }}>
                        <b>RETENTION OF DATA</b>
                        </li>
                    </ol>
                    <p className="MsoNormal" style={{ textAlign: "justify" }}>
                        TakeHome retains Data for as long as necessary for the use of our products
                        and/or services or to provide access to and use of our website or mobile
                        application, or for other essential purposes such as complying with our
                        legal obligations, resolving disputes, enforcing our agreements and as long
                        as processing and retaining your Data is necessary and is permitted by
                        applicable law. Because these needs can vary for different data types and
                        purposes, actual retention periods can vary significantly.
                    </p>
                    <p className="MsoNormal" style={{ textAlign: "justify" }}>
                        Even if we delete your Data, including on account of exercise of your right
                        under Clause 10 below, it may persist on backup or archival media for audit,
                        legal, tax or regulatory purposes.
                    </p>
                    <ol style={{ marginTop: "0in" }} start={11} type={1}>
                        <li className="MsoNormal" style={{ textAlign: "justify" }}>
                        <b>YOUR RIGHTS AND CHOICES</b>
                        </li>
                    </ol>
                    <p className="MsoNormal" style={{ textAlign: "justify" }}>
                        When we process Data about you, we do so with your consent and/or as
                        necessary to operate our business, meet our contractual and legal
                        obligations, protect the security of our systems and our customers, or
                        fulfil other legitimate interests of TakeHome as described in this Privacy
                        Notice.
                        <br />
                        You have the following rights in relation to your sensitive personal
                        information and you can exercise it by submitting a request as described in
                        the&nbsp;<b>"How to Contact Us"</b>&nbsp;section below.
                    </p>
                    <ul style={{ marginTop: "0in" }} type="disc">
                        <li className="MsoNormal" style={{ textAlign: "justify" }}>
                        Right to Access, Review and Modify
                        </li>
                        <li className="MsoNormal" style={{ textAlign: "justify" }}>
                        Right to Correction
                        </li>
                        <li className="MsoNormal" style={{ textAlign: "justify" }}>
                        Right to Withdraw Consent
                        </li>
                    </ul>
                    <p className="MsoNormal" style={{ textAlign: "justify" }}>
                        It is important that the Data we hold about you is accurate and current.
                        Please keep us informed if your personal information changes during the
                        period for which we hold it.
                    </p>
                    <ol style={{ marginTop: "0in" }} start={12} type={1}>
                        <li className="MsoNormal">
                        <b>WHERE WE STORE DATA</b>
                        </li>
                    </ol>
                    <p className="MsoNormal" style={{ textAlign: "justify" }}>
                        Data collected under this Privacy Notice is hosted on servers located in
                        India.
                    </p>
                    <ol style={{ marginTop: "0in" }} start={13} type={1}>
                        <li className="MsoNormal" style={{ textAlign: "justify" }}>
                        <b>PROCESSING YOUR DATA</b>
                        </li>
                    </ol>
                    <p className="MsoNormal" style={{ textAlign: "justify" }}>
                        We take steps to ensure that the Data we collect under this Privacy Notice
                        is processed according to the provisions of this Privacy Notice and the
                        requirements of applicable law.
                    </p>
                    <p className="MsoNormal" style={{ textAlign: "justify" }}>
                        To ensure that your Data receives an adequate level of protection, we have
                        put in place appropriate written contracts with TakeHome Group Entities,
                        Partners and Service Providers that we share your Data with. This ensures
                        your Data is treated by such parties in a way that is consistent with
                        applicable law.
                    </p>
                    <ol style={{ marginTop: "0in" }} start={14} type={1}>
                        <li className="MsoNormal" style={{ textAlign: "justify" }}>
                        <b>APP PERMISSIONS THAT WE CAPTURE</b>
                        </li>
                    </ol>
                    <p className="MsoNormal" style={{ textAlign: "justify" }}>
                        We ask for the following app permissions while onboarding, in order to
                        optimize the experience for you:
                    </p>
                    <p className="MsoNormal" style={{ textAlign: "justify" }}>
                        <b>Location</b>
                    </p>
                    <p className="MsoNormal" style={{ textAlign: "justify" }}>
                        It is recommended that you set your location sharing 'Always' as it helps us
                        to show you location specific data like availability of products. You can
                        change this anytime.
                    </p>
                    <p className="MsoNormal">
                        <b>Camera</b>
                    </p>
                    <p className="MsoNormal" style={{ textAlign: "justify" }}>
                        To allow you to take a photo of prescriptions &amp; directly upload it to
                        the app.
                    </p>
                    <p className="MsoNormal" style={{ textAlign: "justify" }}>
                        <b>Photos/Media/Files</b>
                    </p>
                    <p className="MsoNormal" style={{ textAlign: "justify" }}>
                        Media access permission is needed to store and retrieve your uploads such as
                        prescription uploads on your device.
                    </p>
                    <p className="MsoNormal" style={{ textAlign: "justify" }}>
                        <b>SMS</b>
                    </p>
                    <p className="MsoNormal" style={{ textAlign: "justify" }}>
                        To support automatic OTP confirmation, so that you don't have to enter the
                        authentication code manually.
                    </p>
                    <p className="MsoNormal" style={{ textAlign: "justify" }}>
                        <b>Receive SMS</b>
                    </p>
                    <p className="MsoNormal" style={{ textAlign: "justify" }}>
                        This helps us to send you payment related SMS by our payment partner.
                    </p>
                    <p className="MsoNormal" style={{ textAlign: "justify" }}>
                        <b>Access Wifi State</b>
                    </p>
                    <p className="MsoNormal" style={{ textAlign: "justify" }}>
                        This helps us to optimize your experience based on the Wifi’s strength and
                        signals, especially for optimizing video consultations.
                    </p>
                    <p className="MsoNormal" style={{ textAlign: "justify" }}>
                        <b>Record Audio</b>
                    </p>
                    <p className="MsoNormal" style={{ textAlign: "justify" }}>
                        To enable video consultations with doctors.
                    </p>
                    <p className="MsoNormal">
                        <b>Bluetooth</b>
                    </p>
                    <p className="MsoNormal" style={{ textAlign: "justify" }}>
                        Bluetooth is used to redirect to Bluetooth headset during video
                        consultations.
                    </p>
                    <ol style={{ marginTop: "0in" }} start={15} type={1}>
                        <li className="MsoNormal" style={{ textAlign: "justify" }}>
                        <b>SEVERABILITY</b>
                        </li>
                    </ol>
                    <p className="MsoNormal" style={{ textAlign: "justify" }}>
                        If any court or competent authority finds that any provision of this Privacy
                        Notice (or part of any provision) is invalid, illegal or unenforceable, that
                        provision or part-provision will, to the extent required, be deemed to be
                        deleted, and the validity and enforceability of the other provisions of this
                        Privacy Notice will not be affected.
                    </p>
                    <ol style={{ marginTop: "0in" }} start={16} type={1}>
                        <li className="MsoNormal" style={{ textAlign: "justify" }}>
                        <b>CHANGES TO THIS PRIVACY NOTICE</b>
                        </li>
                    </ol>
                    <p className="MsoNormal" style={{ textAlign: "justify" }}>
                        Our business changes constantly and our Privacy Notice may also change . We
                        may e-mail periodic reminders of our notices and conditions, unless you have
                        instructed us not to, but you should check our website and mobile
                        application frequently to see recent changes. The updated version will be
                        effective as soon as it is accessible. Any changes will be immediately
                        posted on our website and mobile application and you are deemed to have
                        accepted the terms of the updated Privacy Notice on your first use of our
                        website or mobile application or first purchase of the products and/or
                        services following the alterations. We encourage you to review this Privacy
                        Notice frequently to be informed of how we are protecting your information.
                    </p>
                    <ol style={{ marginTop: "0in" }} start={17} type={1}>
                        <li className="MsoNormal" style={{ textAlign: "justify" }}>
                        <b>HOW TO CONTACT US</b>
                        </li>
                    </ol>
                    <p className="MsoNormal" style={{ textAlign: "justify" }}>
                        To request to access, review, update, or withdraw your consent for your
                        personal information or to otherwise reach us, please&nbsp;submit a request
                        by e-mailing us at&nbsp;
                        <a href="mailto:caremed@">
                        <b>
                            <span style={{ color: "red" }}>caremed@</span>
                        </b>
                        </a>
                        <b>
                        <span style={{ color: "red" }}>takehome.live</span>
                        </b>
                        <span style={{ color: "red" }}>.</span> You may contact us for information
                        on Service Providers, Partners and TakeHome Group Entities with whom we may
                        share your Data in compliance with this Privacy Notice and applicable law.
                        We will respond to your request within 30 days.
                    </p>
                </div>
            </div>
        )
    } else {
        return (<div className="container"><h1>Coming soon..</h1></div>);
    }

}

const mapStateToPrivacyPolicy = (state) => {
    return { compCode: state.compCode };
}
  
export default connect(mapStateToPrivacyPolicy, {breadCrumbAction})(PrivacyPolicy)