import { breadCrumbAction } from "../../../../actions";
import { useEffect } from "react";
import { connect } from "react-redux";
import { ePharmaId, TAKE_HOME_ID, takehomeMain, XYZ_ID } from "../../../../constants";
import { Link } from "react-router-dom";

const TermsCondition = ({ breadCrumbAction, compCode }) => {

    useEffect(() => {
		breadCrumbAction({links: [{name: 'Home', link: '/'}, {name: 'Terms & Conditions', link: '/termsConditions'}], activeLink: '/termsConditions'});
    },[breadCrumbAction])  

    if (compCode === XYZ_ID || compCode === ePharmaId) {
        return (
            <section id="terms-conditions" className="terms-conditions-styles">
                <div className="container">
                    <h1 className="heading">Terms of use</h1>
                    <p className="sub-heading">
                        Please read these terms of use carefully by accessing or using this internet
                        based platform, you agree to be bound by the terms described herein and all
                        terms incorporated by reference. If you do not agree to all of these terms,
                        do not use this internet based platform.
                    </p>
                    <ol className="root-list">
                        <li className="nested">
                        <div id="whyE-Pharma" className="cont-details">
                            <h2>What is E-Pharma</h2>
                            <ol className="sub-norm">
                            <li className="nested">
                                The domain name www.epharma.live, an internet based portal and E-Pharma a
                                mobile application, is operated by E-Pharma Healthcare Solutions
                                Private Limited((formerly known as E-Pharma Healthcare Solutions Private
                                Limited), a company duly incorporated under the provisions of the
                                Companies Act, 2013 (hereinafter referred to as “<b>E-Pharma</b>” or
                                “<b>We</b>” or “<b>Our</b>” or “<b>Us</b>” or “<b>Company</b>”)
                                having registered office at Level 3, Vasant Square Mall, Pocket V,
                                Sector B, Vasant Kunj, South Delhi, New Delhi–110070, with GSTIN
                                07AAFCD7691C1ZL and PAN AAFCD7691C. The domain name and the mobile
                                application are collectively referred to as the “<b>Website</b>”.
                            </li>
                            <li className="nested">
                                Your access or use of the Website, transaction on the Website and
                                use of Services (as defined herein below) hosted or managed remotely
                                through the Website, are governed by the following terms and
                                conditions (hereinafter referred to as the
                                <b>Terms of Use</b>”), including the applicable policies which are
                                incorporated herein by way of reference. These Terms of Use
                                constitutes a legal and binding contract between you (hereinafter
                                referred to as <b>“You”</b> or <b>“Your”</b> or the <b>“User”</b>)
                                on one part and E-Pharma on the other Part.
                            </li>
                            <li className="nested">
                                By accessing, browsing or in any way transacting on the Website, or
                                availing any Services, You signify Your agreement to be bound by
                                these Terms of Use. Further, by impliedly or expressly accepting
                                these Terms of Use, you also accept and agree to be bound by Our
                                policies, including the Privacy Policy (as set out in Part B herein
                                below), and such other rules, guidelines, policies, terms and
                                conditions as are relevant under the applicable law(s) in India and
                                other jurisdictions for the purposes of accessing, browsing or
                                transacting on the Website, or availing any of the Services, and
                                such rules, guidelines, policies, terms and conditions shall be
                                deemed to be incorporated into, and considered as part and parcel of
                                these Terms of Use. However, if You navigate away from the Website
                                to a third party website, You may be subject to alternative terms
                                and conditions of use and privacy policy, as may be specified on
                                such website. In such event, the terms and conditions of use and
                                privacy policy applicable to that website will govern Your use of
                                that website.
                            </li>
                            <li className="nested">
                                The Website is a platform that facilitates (i) online purchase of
                                pharmaceutical products sold by various third party pharmacies
                                <b>(“Third Party Pharmacies”)</b> and by the Company; (ii)
                                diagnostic services being offered by various third party diagnostic
                                centers (<b>“Third Party Labs”</b>); (iii) online medical
                                consultancy services/ second opinion being offered by third party
                                independent doctors (<b>“Medical Experts”</b>); and (iv) online
                                advertisements of various sponsors advertising and marketing their
                                own good and services (<b>“Third Party Advertisers”</b>). The Third
                                Party Pharmacies, Third Party Labs, Medical Experts and the Third
                                Party Advertisers are collectively referred to as the “
                                <b>Third Party Service Providers</b>”. Further the Website also
                                serves as an information platform providing health and wellness
                                related information (“<b>Information Services</b>”) to the Users
                                accessing the Website (The services of the Third Party Services
                                Providers, sale of pharmaceutical products by the Company and the
                                Information Services are collectively referred to as the
                                <b>“Services”</b>).
                            </li>
                            <li className="nested">
                                The arrangement between the Third Party Service Providers, You and
                                Us shall be governed in accordance with these Terms of Use. The
                                Services would be made available to such natural persons who have
                                agreed to use the Website after obtaining due registration, in
                                accordance with the procedure as determined by Us, from time to
                                time, (referred to as
                                <b>“You” or “Your” or “Yourself” or “User”</b>, which terms shall
                                also include natural persons who are accessing the Website merely as
                                visitors). The Services are offered to You through various modes
                                which shall include issue of discount coupons and vouchers that can
                                be redeemed for various goods/ services offered for sale by relevant
                                Third Party Service Providers. To facilitate the relation between
                                You and the Third Party Service Providers through the Website, E-Pharma
                                shall send to You (promotional content including but not limited
                                to emailers, notifications and messages).
                            </li>
                            <li className="nested">
                                You agree and acknowledge that the Website is a platform that You
                                and Third Party Service Providers utilize to meet and interact with
                                another for their transactions. E-Pharma is not and cannot be a
                                party to or save as except as may be provided in these Terms of Use,
                                control in any manner, any transaction between You and the Third
                                Party Service Providers.
                            </li>
                            <li className="nested">
                                E-Pharma reserves the right to change or modify these Terms of Use
                                or any policy or guideline of the Website including the Privacy
                                Policy, at any time and in its sole discretion. Any changes or
                                modifications will be effective immediately upon posting the
                                revisions on the Website and You waive any right You may have to
                                receive specific notice of such changes or modifications, provided
                                however that, we will inform You of such changes at least once a
                                year. Your continued use of the Website will confirm Your acceptance
                                of such changes or modifications; therefore, You should frequently
                                review these Terms of Use and applicable policies to understand the
                                terms and conditions that apply to Your use of the Website.
                            </li>
                            <li className="nested">
                                As a condition to Your use of the Website, You must be 18 (eighteen)
                                years of age or older to use or visit the Website in any manner. By
                                visiting the Website or accepting these Terms of Use, You represent
                                and warrant to E-Pharma that You are 18 (eighteen) years of age or
                                older, and that You have the right, authority and capacity to use
                                the Website and agree to and abide by these Terms of Use.
                            </li>
                            <li className="nested">
                                These Terms of Use is published in compliance of, and is governed by
                                the provisions of Indian laws, including but limited to:
                                <ol className="sub-norm">
                                <li className="nested">
                                    the Indian Contract Act, 1872 (“<b>Contract Act</b>”);
                                </li>
                                <li className="nested">
                                    the (Indian) Information Technology Act, 2000 (“<b>IT Act</b>”)
                                    and the rules, regulations, guidelines and clarifications framed
                                    thereunder, including the (Indian) Information Technology
                                    (Reasonable Security Practices and Procedures and Sensitive
                                    Personal Information) Rules, 2011, and the (Indian) Information
                                    Technology (Intermediaries Guidelines) Rules, 2011 (“
                                    <b>IG Guidelines</b>”);
                                </li>
                                <li className="nested">
                                    the Drugs and Cosmetic Act, 1940 (“<b>Drugs Act</b>”), read with
                                    the Drugs and Cosmetics Rules, 1945 (“<b>Drugs Rules</b>”);
                                </li>
                                <li className="nested">
                                    the Drugs and Magic Remedies (Objectionable Advertisements) Act,
                                    1954 (“<b>Drugs and Magic Act</b>”);
                                </li>
                                <li className="nested">
                                    The Indian Medical Council Act, 1956 read with the Indian
                                    Medical Council Rules, 1957;
                                </li>
                                <li className="nested">
                                    Pharmacy Act, 1948 (“<b>Pharmacy Act</b>”) and
                                </li>
                                <li className="nested">
                                    the Consumer Protection Act, 2019 and
                                    <b>Consumer Protection (E-Commerce) Rules, 2020</b>.
                                </li>
                                </ol>
                            </li>
                            <li className="nested">
                                E-Pharma authorizes You to view and access the content available on
                                the Website solely for the purposes of availing the Services, such
                                as visiting, using, ordering, receiving, delivering and
                                communicating only as per these Terms of Use. The contents on the
                                Website including information, text, graphics, images, logos, button
                                icons, software code, design, and the collection, arrangement and
                                assembly of content, contains Third Party Service Providers’ content
                                (<b>“Third Party Content”</b>) as well as in-house content provided
                                by E-Pharma including without limitation, text, copy, audio, video,
                                photographs, illustrations, graphics and other visuals (
                                <b>“E-Pharma Content”</b>) (collectively, <b>“Content”</b>). The
                                E-Pharma Content is the property of E-Pharma and is protected under
                                copyright, trademark and other applicable law(s). You shall not
                                modify the E-Pharma Content or reproduce, display, publicly perform,
                                distribute, or otherwise use the E-Pharma Content in any way for any
                                public or commercial purpose or for personal gains.
                            </li>
                            <li className="nested">
                                Compliance with these Terms of Use would entitle You to a personal,
                                non-exclusive, non-transferable, limited privilege to access and
                                transact on the Website.
                            </li>
                            <li className="nested">
                                These Terms of Use constitute an electronic record in terms of the
                                IT Act and rules framed there under, as applicable and amended from
                                time to time. This electronic record is generated by a computer
                                system and does not require any physical or digital signatures.
                            </li>
                            </ol>
                        </div>
                        </li>
                        <li className="nested">
                        <div id="eligiblity" className="cont-details">
                            <h2>ELIGIBILITY</h2>
                            <ol className="sub-norm">
                            <li className="nested">
                                For the purposes of availing the Services and/or transacting with
                                the Third Party Service Providers through the Website, You are
                                required to obtain registration, in accordance with the procedure
                                established by E-Pharma in this regard. As part of the registration
                                process, E-Pharma may collect the following personal information
                                from You:
                                <ol className="sub-norm">
                                <li className="nested">Name;</li>
                                <li className="nested">User ID;</li>
                                <li className="nested">Email address;</li>
                                <li className="nested">
                                    Address (including country and ZIP/ postal code);
                                </li>
                                <li className="nested">Gender;</li>
                                <li className="nested">Age;</li>
                                <li className="nested">Phone number;</li>
                                <li className="nested">Password chosen by the User;</li>
                                <li className="nested">
                                    Valid financial account information; and
                                </li>
                                <li className="nested">Other details as You may volunteer.</li>
                                <li className="nested">
                                    The registration on or use/ access of the Website is only
                                    available to natural persons, other than those who are
                                    ‘incompetent to contract’ under the Contract Act. That is,
                                    persons including minors, un-discharged insolvents etc. are not
                                    eligible to register on, or use/ access the Website. By
                                    registering, accessing or using the Website, You accept the
                                    terms of these Terms of Use and represent and warrant to E-Pharma
                                    that you are ‘competent to contract’ under the Contract Act
                                    and have the right, authority and capacity to use the Website
                                    and agree to and abide by these Terms of Use.
                                </li>
                                <li className="nested">
                                    A registered id can only be utilized by the person whose details
                                    have been provided and E-Pharma does not permit multiple persons
                                    to share a single log in/ registration id. However, a registered
                                    user, being also a parent or legal guardian of a person
                                    ‘incompetent to contract’ such as minors or persons with unsound
                                    mind, would be permitted to access and use the Website for the
                                    purposes of procuring the Services, on behalf of such persons.
                                </li>
                                <li className="nested">
                                    Organizations, companies, and businesses may not become
                                    registered members on the Website or use the Website through
                                    individual members.
                                </li>
                                <li className="nested">
                                    You agree and acknowledge that You would (i) create only 1 (one)
                                    account; (ii) provide accurate, truthful, current and complete
                                    information when creating Your account and in all Your dealings
                                    through the Website; (iii) maintain and promptly update Your
                                    account information; (iv) maintain the security of Your account
                                    by not sharing Your password with others and restricting access
                                    to Your account and Your computer; (v) promptly notify E-Pharma
                                    if You discover or otherwise suspect any security breaches
                                    relating to the Website; (vi) take responsibility for all the
                                    activities that occur under Your account and accept all risk of
                                    unauthorized access; (vii) Any communication from E-Pharma shall
                                    be sent only to your registered mobile number and/or email
                                    address or such other contact number or email address that you
                                    may designate and (viii) You shall be solely responsible to
                                    update your registered mobile number and/or email address on the
                                    Website in the event there is a change.
                                </li>
                                <li className="nested">
                                    The Website uses temporary cookies to store certain data (that
                                    is not sensitive personal data or information) that is used by
                                    E-Pharma for the technical administration of the Website,
                                    research and development, and for User administration. In the
                                    course of serving advertisements or optimizing services to You,
                                    E-Pharma may allow authorized third parties to place or
                                    recognize a unique cookie on Your browser. E-Pharma does not
                                    store personally identifiable information in the cookies.
                                </li>
                                <li className="nested">
                                    E-Pharma, at its sole discretion, reserves the right to
                                    permanently or temporarily suspend Users, to bar their use and
                                    access of the Website and App, at any time while E-Pharma
                                    investigates complaints or alleged violations of these Terms of
                                    Use or any Services, or for any other reason.
                                </li>
                                </ol>
                            </li>
                            </ol>
                        </div>
                        </li>
                        <li className="nested">
                        <div id="UseofServices" className="cont-details">
                            <h2>USE OF SERVICES AND THE WEBSITE</h2>
                            <ol className="sub-norm">
                            <li className="nested">
                                <b>E-Commerce Platform for Pharmaceutical Products –</b>
                                <ol className="sub-norm">
                                <li className="nested">
                                    <u>Platform to facilitate transaction of business:</u>
                                    <ol className="sub-norm">
                                    <li className="nested">
                                        Through the Website, E-Pharma facilitates the purchase of
                                        drugs and other pharmaceutical products, and services
                                        offered for sale by Third Party Pharmacies (“
                                        <b>Pharmaceutical Goods and Services</b>”). You understand
                                        and agree that E-Pharma and the Website merely provide
                                        hosting services to You and persons browsing / visiting the
                                        Website. All items offered for sale on the Website, and the
                                        content made available by the Third Party Pharmacies, are
                                        third party user generated contents and third party
                                        products. E-Pharma has no control over such third party user
                                        generated contents and/ Pharmaceutical Goods and Services
                                        and does not - originate or initiate the transmission, or
                                        select the sender/recipient of the transmission, or the
                                        information contained in such transmission. The authenticity
                                        and genuineness of the Pharmaceutical Goods and Services
                                        made available by the Third Party Pharmacies through the
                                        Website shall be the sole responsibility of the Third Party
                                        Pharmacies. You understand and agree that E-Pharma shall
                                        have no liability with respect to the authenticity of the
                                        Pharmaceutical Goods and Services being facilitated through
                                        the Website.
                                    </li>
                                    <li className="nested">
                                        You understand and agree that all commercial / contractual
                                        terms, with respect to the sale/ purchase/ delivery and
                                        consumption of the Pharmaceutical Goods and Services which
                                        are offered by and agreed to between You and the Third Party
                                        Pharmacies and the contract for purchase of any of the
                                        Pharmaceutical Goods and Services, which are offered for
                                        sale on the Website by the Third Party Pharmacies shall
                                        strictly be a bipartite contract between the Third Party
                                        Pharmacies and You.
                                    </li>
                                    <li className="nested">
                                        The commercial / contractual terms include without
                                        limitation - price, shipping costs, payment methods, payment
                                        terms, date, period and mode of delivery, warranties related
                                        to Pharmaceutical Goods and Services offered for sale by the
                                        Third Party Pharmacies, and after sales services related to
                                        such Pharmaceutical Goods and Services are as provided by
                                        the Third Party Pharmacies. E-Pharma does not have any
                                        control over, and does not determine or advise or in any way
                                        involve itself in the offering or acceptance of, such
                                        commercial / contractual terms offered by and agreed to,
                                        between You and the Third Party Pharmacies.
                                    </li>
                                    </ol>
                                </li>
                                <li className="nested">
                                    <u>Representation as to legal title</u>
                                    <ol className="sub-norm">
                                    <li className="nested">
                                        E-Pharma does not make any representation or warranty as to
                                        legal title of the Pharmaceutical Goods and Services offered
                                        for sale by the Third Party Pharmacies on the Website.
                                    </li>
                                    <li className="nested">
                                        At no time shall any right, title, claim or interest in the
                                        products sold through or displayed on the Website vest with
                                        E-Pharma nor shall E-Pharma have any obligations or
                                        liabilities in respect of any transactions on the Website.
                                        You agree and acknowledge that the ownership of the
                                        inventory of such Pharmaceutical Goods and Services shall
                                        always vest with the Third Party Pharmacies, who are
                                        advertising or offering them for sale on the Website and are
                                        the ultimate sellers.
                                    </li>
                                    <li className="nested">
                                        You agree and acknowledge that the Third Party Pharmacies
                                        shall be solely responsible for any claim/ liability/
                                        damages that may arise in the event it is discovered that
                                        such Third Party Pharmacies do not have the sole and
                                        exclusive legal ownership over the Pharmaceutical Goods and
                                        Services that have been offered for sale on the Website by
                                        such Third Party Pharmacies, or did not have the absolute
                                        right, title and authority to deal in and offer for sale
                                        such Pharmaceutical Goods and Services on the Website.
                                    </li>
                                    </ol>
                                </li>
                                <li className="nested">
                                    <u>Non-Performance of Contract</u>
                                    <ol className="sub-norm">
                                    <span style={{ fontSize: 16, fontWeight: 100 }}>
                                        You accept and acknowledge the following:
                                    </span>
                                    <li className="nested">
                                        E-Pharma is not responsible for any unsatisfactory, delayed,
                                        non-performance or breach of the contract entered into
                                        between You and the Third Party Pharmacies for purchase and
                                        sale of goods or services offered by such Third Party
                                        Pharmacies on the Website;
                                    </li>
                                    <li className="nested">
                                        E-Pharma cannot and does not guarantee that the concerned
                                        Third Party Pharmacies will perform any transaction
                                        concluded on the Website;
                                    </li>
                                    <li className="nested">
                                        The Third Party Pharmacy(s) are solely responsible for
                                        ensuring that the Pharmaceutical Goods and Services offered
                                        for sale on the Website are kept in stock for successful
                                        fulfillment of orders received. Consequently, E-Pharma is
                                        not responsible if the Third Party Pharmacy(s) does not
                                        satisfy the contract for sale of Pharmaceutical Goods and
                                        Services which are out of stock, back ordered or otherwise
                                        unavailable, but were shown as available on the Website at
                                        the time of placement of order by You; and
                                    </li>
                                    <li className="nested">
                                        E-Pharma shall not and is not required to mediate or resolve
                                        any dispute or disagreement between You and Third Party
                                        Pharmacies. In particular, E-Pharma does not implicitly or
                                        explicitly support or endorse the sale or purchase of any
                                        items or services on the Website. E-Pharma shall, on a
                                        request in writing made by You after the purchase of any
                                        Pharmaceutical Goods and Services on the Website, provide
                                        You with information regarding the Third Party Pharmacies
                                        from which You have made such purchase, including the
                                        principal geographic address of its headquarters and all
                                        branches, name and details of its website, its email address
                                        and any other information necessary for communication with
                                        the Third Party Pharmacy for dispute resolution.
                                    </li>
                                    </ol>
                                </li>
                                <li className="nested">
                                    <u>
                                    Exhibition of drugs and publication of Third Party Pharmacies
                                    content on the Website
                                    </u>
                                    <ol className="sub-norm">
                                    <li className="nested">
                                        You agree and acknowledge that the respective Third Party
                                        Pharmacies are exhibiting Third Party Content which includes
                                        catalogue of drugs/ pharmaceutical products or services, and
                                        information in relation to such drugs/ pharmaceutical
                                        products or services, on the Website.
                                    </li>
                                    <li className="nested">
                                        The Third Party Content available on the Website, including
                                        without limitation, text, copy, audio, video, photographs,
                                        illustrations, graphics and other visuals, is for general
                                        information purposes only and does not constitute either an
                                        advertisement/ promotion of any drug being offered for sale
                                        by the Third Party Pharmacies on the Website or any
                                        professional medical advice, diagnosis, treatment or
                                        recommendations of any kind.
                                    </li>
                                    <li className="nested">
                                        You acknowledge and agree that such Third Party Pharmacies
                                        shall be solely responsible for ensuring that such Third
                                        Party Content made available regarding the Pharmaceutical
                                        Goods and Services offered for sale on the Website, are not
                                        misleading and describe the actual condition of the
                                        Pharmaceutical Goods and Services. In this connection, it is
                                        solely the responsibility of the concerned Third Party
                                        Pharmacy(s) to ensure that all such information is accurate
                                        in all respects and there is no exaggeration or over
                                        emphasis on the specifics of such Pharmaceutical Goods and
                                        Services so as to mislead the Users in any manner. You
                                        acknowledge and understand that E-Pharma provides no
                                        warranty or representation with respect to the authenticity/
                                        veracity of the information provided on the Website and You
                                        must run Your own independent check. You agree and
                                        acknowledge that E-Pharma has not played any role in the
                                        ascertainment of the actual impact/ effect of any
                                        Pharmaceutical Goods and Services being offered for sale by
                                        the Third Party Pharmacies on the Website. Further, it is
                                        hereby clarified that the Third Party Pharmacies are
                                        offering the Pharmaceutical Goods and Services for sale to
                                        You and they are responsible for procuring the appropriate
                                        licenses for the same under the Drugs Act read with the Drug
                                        rules and the Pharmacy Act. You agree and acknowledge that
                                        You shall not hold E-Pharma responsible or liable for any
                                        damages arising out of such reliance on third party user
                                        generated content by You.
                                    </li>
                                    </ol>
                                </li>
                                <li className="nested">
                                    <u>Prescription Drugs</u>
                                    <ol className="sub-norm">
                                    <li className="nested">
                                        The Website is a platform that can be used by the Users to
                                        purchase various drugs and pharmaceutical products that
                                        requires a valid medical prescription issued by a medical
                                        expert/ doctor to be provided to a registered pharmacist for
                                        the purpose of dispensing such medicine (“Prescription
                                        Drugs”), offered for sale on the Website by Third Party
                                        Pharmacies. In order to purchase Prescription Drugs from
                                        Third Party Pharmacies through the Website, You are required
                                        to upload a scanned copy of the valid prescription on the
                                        Website or email the same to E-Pharma. The order would not
                                        be processed and forwarded to the concerned Third Party
                                        Pharmacy(s) by E-Pharma until it receives a copy of a valid
                                        prescription. Third Party Pharmacies will verify the
                                        prescription forwarded by You and in case of Third Party
                                        Pharmacy(s) observe any discrepancy in the prescription
                                        uploaded by You, the Third Party Pharmacy(s) will cancel the
                                        order immediately. You are also required to make the
                                        original prescription available at the time of receipt of
                                        delivery of Prescription Drugs. You shall allow the delivery
                                        agent to stamp the original prescription at the time of
                                        medicine delivery failing which medicines will not be
                                        delivered.
                                    </li>
                                    <li className="nested">
                                        E-Pharma shall maintain a record of all the prescriptions
                                        uploaded by the Users.
                                    </li>
                                    </ol>
                                </li>
                                <li className="nested">
                                    <u>Substitution of Prescribed Drugs</u>
                                    <ol className="sub-norm">
                                    <li className="nested">
                                        You acknowledge and accept that the order for a substitute
                                        of a Prescription Drug would only be processed if the
                                        medical expert/ doctor has himself/ herself permitted for
                                        any other equivalent generic drug to be dispensed in place
                                        of the Prescription Drug in the prescription or if the
                                        prescription solely lists the salt names instead of a
                                        specific brand name.
                                    </li>
                                    <li className="nested">
                                        You further acknowledge and accept that, in the absence of
                                        the above, the concerned Third Party Pharmacy would not
                                        dispense a substitute drug in place of the Prescription
                                        Drug.
                                    </li>
                                    </ol>
                                </li>
                                <li className="nested">
                                    <u>Invitation to offer for sale</u>
                                    <ol className="sub-norm">
                                    <li className="nested">
                                        Notwithstanding anything else contained in any other part of
                                        these Terms of Use, the listing of drugs and other
                                        pharmaceutical products on the Website by the Third Party
                                        Pharmacies is merely an ‘invitation to an offer for sale’
                                        and not an ‘offer for sale’. The placement of an order by
                                        You shall constitute an offer by You to enter into an
                                        agreement with the Third Party Pharmacies (“Offer”). Post
                                        the Offer from the Third Party Pharmacies, E-Pharma shall
                                        send an email to You with the information on the Offer along
                                        with the details of the concerned Third Party Pharmacy(s)
                                        who may undertake the sale, and such an email shall not be
                                        considered as an acceptance of the Offer. The acceptance of
                                        the Offer would only be undertaken by the Third Party
                                        Pharmacy(s) after the validation/ verification of the
                                        prescription by such Third Party Pharmacy (in case of
                                        Prescription Drugs) and the ascertainment of the available
                                        stock in the relevant Third Party Pharmacy(s) (in the case
                                        of prescription as well as other drugs/ pharmaceutical
                                        products), by way of a confirmatory email to be sent to You.
                                    </li>
                                    <li className="nested">
                                        For the avoidance of any doubt, it is hereby clarified that
                                        any reference of the term ‘offer/ offered for sale by the
                                        Third Party Pharmacy’, as appearing in these Terms of Use,
                                        shall be construed solely as an ‘invitation to offer for
                                        sale’ by any such Third Party Pharmacy.
                                    </li>
                                    </ol>
                                </li>
                                <li className="nested">
                                    <u>Transfer of Property and Completion of Sale</u>
                                    <ol className="sub-norm">
                                    <li className="nested">
                                        Upon acceptance of the Offer by the concerned Third Party
                                        Pharmacy (being the brick and mortar pharmacy, the
                                        Pharmaceutical Drugs and Services would be dispensed at the
                                        pharmacy, in accordance with the terms of the order placed
                                        by You. Such dispensation shall also take place under the
                                        direct/ personal supervision of the pharmacist of the Third
                                        Party Pharmacy, wherever required under the applicable
                                        law(s).
                                    </li>
                                    <li className="nested">
                                        You agree and acknowledge that the property and title in the
                                        Pharmaceutical Drugs and Services ordered by You shall stand
                                        immediately transferred to You upon the dispensation of
                                        Pharmaceutical Drugs and Services and the raising of the
                                        invoice at the concerned Third Party Pharmacy. Accordingly,
                                        the sale of Pharmaceutical Drugs and Services is concluded
                                        at the concerned Third Party Pharmacy itself.
                                    </li>
                                    <li className="nested">
                                        The invoice in relation to the Pharmaceutical Drugs and
                                        Services, that are required to be delivered to You shall be
                                        issued by the concerned Third Party Pharmacy (being the
                                        brick and mortar pharmacy) which is to process and satisfy
                                        the order for such Pharmaceutical Drugs and Services.
                                    </li>
                                    </ol>
                                </li>
                                <li className="nested">
                                    <u>Delivery of Drugs</u>
                                    <ol className="sub-norm">
                                    <li className="nested">
                                        You agree to appoint an individual who shall act in the
                                        capacity of Your agent and collect the medicines as
                                        requested by You from Third Party Pharmacy on Your behalf
                                        ("User Agent"). You accept and acknowledge that the User
                                        Agent shall be responsible to collect the medicines ordered
                                        by You from the Third Party Pharmacy and to carry it to the
                                        address notified by You.
                                    </li>
                                    <li className="nested">
                                        You further agree and acknowledge that the User Agent acts
                                        as Your agent for collecting the medicines from the Third
                                        Party Pharmacy. The services are being undertaken by User
                                        Agent with Your consent and therefore the Company is merely
                                        facilitating for You and Users Agent to connect.
                                    </li>
                                    </ol>
                                </li>
                                </ol>
                            </li>
                            <li className="nested">
                                <b>Advertising Guidelines for the Website –</b>
                                <ol className="sub-norm">
                                <li className="nested">
                                    As part of the Services provided by Us; We facilitate and allow
                                    Third Party Advertisers to place advertisements on the Website.
                                    Accordingly, there are guidelines (as listed herein below) which
                                    the Third Party Advertisers have to follow for placing such
                                    advertisements (the “Advertising Policy”).
                                    <ol className="sub-norm">
                                    <li className="nested">
                                        <b>For the Users:</b> E-Pharma clearly distinguishes between
                                        the editorial content and content that is created or
                                        provided by one of Our Third Party Advertisers. The
                                        advertisements will be labeled as "sponsored", "from our
                                        Advertisers" or "advertisement". This content will not be
                                        reviewed by Our in-house editorial staff and shall not be
                                        subject to Our editorial policy (as set out herein below)
                                        but shall be subject to the Advertising Policy, these Terms
                                        of Use (except the editorial policy) and the Privacy Policy.
                                    </li>
                                    <li className="nested">
                                        <b>For the Third Party Advertisers:</b> The Third Party
                                        Advertisers must be honest about the products or services
                                        their advertisements promote; the advertisement shall not
                                        create unrealistic expectation and must not be misleading or
                                        offending; must be responsible and of the highest standards
                                        and without compromising the consumer protection. The
                                        Advertising Policy applies to all the advertisements, listed
                                        or sought to be listed, on the Website.
                                    </li>
                                    <li className="nested">
                                        <b>General Rules:</b> All the advertisements must comply
                                        with the Advertising Policy, the terms of these Terms of Use
                                        (except the editorial policy) and the Privacy Policy. E-Pharma
                                        may, at any time and without having to serve any prior
                                        notice to the Third Party Advertisers, (i) upgrade, update,
                                        change, modify, or improve the Website or a part thereof in
                                        a manner it may deem fit, and (ii) change the content of the
                                        Advertising Policy and/ or these Terms of Use and/ or the
                                        Privacy Policy. It is the responsibility of the Third Party
                                        Advertisers, in such cases, to review the terms of the
                                        Advertising Policy and/ or these Terms of Use and/ or the
                                        Privacy Policy, from time to time. Such change shall be made
                                        applicable when they are posted. E-Pharma may also alter or
                                        remove any content from the Website without prior notice and
                                        without liability. The Third Party Advertisers are also
                                        responsible for ensuring that their advertisements comply
                                        with all applicable law(s) in India and any other
                                        jurisdiction that such Third Party Advertiser(s) are based
                                        out of, industry codes, rules and regulations in each
                                        geographic area where the advertisements will run. All
                                        disclosures in the advertisements must be clear and
                                        conspicuous.
                                    </li>
                                    <li className="nested">
                                        <b>Review:</b> All the advertisements are subject to the
                                        review and approval of E-Pharma. E-Pharma reserves the right
                                        to reject or remove any advertisement in its sole discretion
                                        for any reason. Further, E-Pharma also reserves the right to
                                        request modifications to any advertisement, and to require
                                        factual substantiation for any claim made in an
                                        advertisement.
                                    </li>
                                    <li className="nested">
                                        <b>Prohibited Content:</b> The advertisements must not
                                        infringe the intellectual property, privacy, publicity,
                                        copyright, or other legal rights of any person or entity.
                                        The advertisements must not be false, misleading,
                                        fraudulent, defamatory, or deceptive. The following
                                        advertisement content is prohibited:
                                        <ol className="sub-norm">
                                        <li className="nested">
                                            content that demeans, degrades, or shows hate toward a
                                            particular race, gender, culture, country, belief, or
                                            toward any member of a protected class;
                                        </li>
                                        <li className="nested">
                                            content depicting nudity, sexual behaviour, or obscene
                                            gestures;
                                        </li>
                                        <li className="nested">content depicting drug use;</li>
                                        <li className="nested">
                                            content depicting excessive violence, including the
                                            harming of animals;
                                        </li>
                                        <li className="nested">
                                            shocking, sensational, or disrespectful content;
                                        </li>
                                        <li className="nested">
                                            deceptive, false or misleading content, including
                                            deceptive claims, offers, or business practices;
                                        </li>
                                        <li className="nested">
                                            content that directs users to phishing links, malware,
                                            or similarly harmful codes or sites; and
                                        </li>
                                        <li className="nested">
                                            content that deceives the Users into providing personal
                                            information without their knowledge, under false
                                            pretences, or to companies that resell, trade, or
                                            otherwise misuse that personal information; and
                                        </li>
                                        <li className="nested">
                                            content that violates any law for the time being in
                                            force.
                                        </li>
                                        </ol>
                                    </li>
                                    <li className="nested">
                                        <b>Prohibited Advertisements:</b> Advertisements for the
                                        following products and services are prohibited:
                                        <ol className="sub-norm">
                                        <li className="nested">
                                            adult products and services (other than contraceptives;
                                            see below);
                                        </li>
                                        <li className="nested">
                                            cigarettes (including e-cigarettes), cigars, smokeless
                                            tobacco, and other tobacco products;
                                        </li>
                                        <li className="nested">
                                            products or services that bypass copyright protection,
                                            such as software or cable signal descramblers;
                                        </li>
                                        <li className="nested">
                                            products or services principally dedicated to selling
                                            counterfeit goods or engaging in copyright piracy;
                                        </li>
                                        <li className="nested">
                                            get-rich-quick or pyramid schemes or offers or any other
                                            deceptive or fraudulent offers;
                                        </li>
                                        <li className="nested">
                                            illegal or recreational drugs or drug paraphernalia;
                                        </li>
                                        <li className="nested">
                                            counterfeit, fake or bootleg products, or replicas or
                                            imitations of designer products;
                                        </li>
                                        <li className="nested">
                                            firearms, weapons, ammunition, or accessories;
                                        </li>
                                        <li className="nested">
                                            advertisements that promote particular securities or
                                            that provide or allege to provide insider tips;
                                        </li>
                                        <li className="nested">
                                            any illegal conduct, product, or enterprise;
                                        </li>
                                        <li className="nested">
                                            unapproved pharmaceuticals and supplements;
                                        </li>
                                        <li className="nested">prescription drugs;</li>
                                        <li className="nested">
                                            products that have been subject to any government or
                                            regulatory action or warning;
                                        </li>
                                        <li className="nested">
                                            products with names that are confusingly similar to an
                                            unapproved pharmaceutical or supplement or controlled
                                            substance; and
                                        </li>
                                        <li className="nested">
                                            material that directly advertises products to or is
                                            intended to attract children under the age of 13.
                                        </li>
                                        </ol>
                                    </li>
                                    <li className="nested">
                                        <b>
                                        Prohibited Advertisements under the Drugs and Magic Act:
                                        </b>
                                        <ol className="sub-norm">
                                        <li className="nested">
                                            subject to the provisions of the Drugs and Magic Act, no
                                            person shall take any part in the publication of any
                                            advertisement referring to any drug which suggest or are
                                            calculated to lead to the use of that drug for –
                                            <ol className="sub-norm">
                                            <li className="nested">
                                                the procurement of miscarriage in women or
                                                prevention of conception in women; or
                                            </li>
                                            <li className="nested">
                                                the maintenance or improvement of the capacity of
                                                human beings for sexual pleasure; or
                                            </li>
                                            <li className="nested">
                                                the correction of menstrual disorder in women; or
                                            </li>
                                            <li className="nested">
                                                the diagnosis, cure, mitigation, treatment or
                                                prevention of any disease, disorder or condition
                                                specified in the schedule of the Drugs and Magic
                                                Act, or any other disease, disorder or condition (by
                                                whatsoever name called) which may be specified in
                                                the rules made under the Drugs and Magic Act; or
                                                provided that no such rule shall be made except, –
                                                (i) in respect of any disease, disorder or condition
                                                which requires timely treatment in consultation with
                                                a doctor or for which there are normally no accepted
                                                remedies; or
                                            </li>
                                            <li className="nested">
                                                prohibition of misleading advertisements relating to
                                                drugs;
                                            </li>
                                            <li className="nested">
                                                subject to the provisions of the Drugs and Magic
                                                Act, no person shall take any part in the
                                                publication of any advertisement relating to a drug
                                                if the advertisement contains any matters which:
                                                <ol className="sub-norm">
                                                <li className="nested">
                                                    directly or indirectly gives a false impression
                                                    regarding the true character of the drug; or
                                                </li>
                                                <li className="nested">
                                                    makes a false claim for the drug; or
                                                </li>
                                                <li className="nested">
                                                    is otherwise false or misleading in any material
                                                    particular.
                                                </li>
                                                </ol>
                                            </li>
                                            </ol>
                                        </li>
                                        <li className="nested">
                                            It is hereby clarified that that the Third Party
                                            Advertisers will comply with all the provisions of the
                                            Drugs and Magic Act and the rules made thereunder.
                                            Further, it is agreed that the Third Party Advertisers
                                            shall be solely responsible for any penalty or any
                                            action taken by the governmental authorities for
                                            non-compliance with the Drugs and Magic Act and the
                                            rules made thereunder.
                                        </li>
                                        </ol>
                                    </li>
                                    <li className="nested">
                                        <b>Restricted Advertisements:</b> Advertisements in the
                                        following categories are restricted and require approval on
                                        a case-by-case basis:
                                        <ol className="sub-norm">
                                        <li className="nested">
                                            advertisements that promote or reference alcohol;
                                        </li>
                                        <li className="nested">
                                            advertisements for online dating services;
                                        </li>
                                        <li className="nested">
                                            advertisements for gambling and games of skill;
                                        </li>
                                        <li className="nested">advertisements for lotteries;</li>
                                        <li className="nested">
                                            advertisements for financial services;
                                        </li>
                                        <li className="nested">
                                            advertisements for contraceptives;
                                        </li>
                                        <li className="nested">
                                            advertisements for online pharmacies or pharmaceuticals;
                                            and
                                        </li>
                                        <li className="nested">political advertisements.</li>
                                        </ol>
                                    </li>
                                    <li className="nested">
                                        <b>Testimonials &amp; Endorsements:</b>
                                        <ol className="sub-norm">
                                        <li className="nested">
                                            any testimonials and endorsements contained in
                                            advertisements must comply with all applicable law(s),
                                            industry codes, rules, and regulations. For example, a
                                            clear and conspicuous disclaimer is required if an
                                            endorser's results were atypical or if the endorser was
                                            paid;
                                        </li>
                                        <li className="nested">
                                            E-Pharma recognizes and maintains a distinct separation
                                            between advertising and sponsored content and editorial
                                            content. All advertising or sponsored content on the
                                            Website of the Company will be clearly and unambiguously
                                            identified; and
                                        </li>
                                        <li className="nested">
                                            a click on an advertisement may only link the User to
                                            the website of the Third Party Advertiser(s).
                                        </li>
                                        </ol>
                                    </li>
                                    </ol>
                                </li>
                                </ol>
                            </li>
                            <li className="nested">
                                <b>Editorial Policy for the Website –</b>
                                <ol className="sub-norm">
                                <li className="nested">
                                    As part of the Services, E-Pharma provides E-Pharma Content on
                                    the Website targeted at general public for informational
                                    purposes only and does not constitute professional medical
                                    advice, diagnosis, treatment or recommendations of any kind.
                                    E-Pharma Content is subject to the following rules/ information:
                                </li>
                                <ol className="sub-norm">
                                    <li className="nested">
                                    E-Pharma Content is original and is relevant to the general
                                    public;
                                    </li>
                                    <li className="nested">
                                    topics for E-Pharma Content are selected by Our board of
                                    qualified experts consisting of certified medical experts,
                                    pharmacist and medical professionals;
                                    </li>
                                    <li className="nested">
                                    topics for E-Pharma Content are chosen on the basis of current
                                    health news, drug alerts, new drug launches, latest medical
                                    findings published in peer-reviewed medical journals, such as
                                    ‘The Journal of the American Medical Association’, ‘The New
                                    England Journal of Medicine’, ‘The Lancet’, ‘Pediatrics’,
                                    ‘Diabetes Care’, and many others;
                                    </li>
                                    <li className="nested">
                                    editorial board (as mentioned below) takes into account the
                                    latest trending health and wellness topics like dengue, swine
                                    flu, seasonal allergies, new vaccines, public awareness trends
                                    like breast cancer awareness month," and ‘Healthy Heart
                                    Month’; as well as emerging health and nutrition trends like
                                    health benefits quinoa, use of BGR 34 for managing diabetes,
                                    alternative medicine like ayurveda, homeopathy and much more;
                                    </li>
                                    <li className="nested">
                                    E-Pharma maintains principles of fairness, accuracy,
                                    objectivity, and responsible, independent reporting;
                                    </li>
                                    <li className="nested">
                                    the member of E-Pharma has to fully disclose any potential
                                    conflict of interest with any of the Third Party Service
                                    Providers;
                                    </li>
                                    <li className="nested">
                                    E-Pharma’s editorial staff holds the responsibility of
                                    providing objective, accurate, and balanced accounts of events
                                    and issues; and
                                    </li>
                                    <li className="nested">
                                    E-Pharma’s editorial board constitutes of:
                                    <ul className="roman-list">
                                        <li>Dr. Rajeev Sharma MBBS, MBA</li>
                                        <li>Dr. Anuj Saini MBBS, MMST</li>
                                        <li>Dr. Sakshi Jain BDS, MS</li>
                                        <li>Dr. Swati Mishra BDS</li>
                                        <li>Dr. Sachin Gupta, MBBS, MD</li>
                                        <li>Dr. Deepak Soni BAMS</li>
                                    </ul>
                                    </li>
                                </ol>
                                </ol>
                            </li>
                            <li className="nested">
                                <b>Diagnostics Services –</b>
                                <ol className="sub-norm">
                                <li className="nested">
                                    As a condition of Your use of and access to the diagnostic
                                    services provided through the Website and Your acceptance of
                                    these Terms of Use, You are subject to the following rules/
                                    guidelines:
                                    <ol className="sub-norm">
                                    <li className="nested">
                                        <b>Terms for use of the Diagnostic Services:</b>
                                        <ol className="sub-norm">
                                        <li className="nested">
                                            E-Pharma provides Services through the Website as a
                                            marketplace and facilitates the Users to avail
                                            diagnostic test/ packages facilities offered by Third
                                            Party Labs through the Website. E-Pharma is not and
                                            shall not be responsible for any sample collected, tests
                                            conducted and reports generated by the Third Party Labs
                                            and does not deal with any of Third Party Labs’ client
                                            or patient managed by Third Party Labs through the
                                            Website and only provides facilitation Services to the
                                            Users through the Website. Use of the Website may
                                            require the Third Party Labs to use software and the
                                            Third Party Labs have to ensure the procurement of such
                                            software from the concerned providers. User and the
                                            Third Party Labs agree to use the Website and the
                                            materials provided therein only for purposes that are
                                            permitted by: (a) these Terms of Use; and (b) any
                                            applicable law(s), regulation or generally accepted
                                            practices or guidelines in the relevant jurisdictions.
                                        </li>
                                        <li className="nested">
                                            The Third Party Labs may not access the Services if the
                                            Third Party Labs are E-Pharma’s direct competitor,
                                            except with E-Pharma’s prior written consent. In
                                            addition, the Third Party Labs may not access the
                                            Services for purposes of monitoring their availability,
                                            performance or functionality, or for any other
                                            benchmarking or competitive purposes.
                                        </li>
                                        <li className="nested">
                                            E-Pharma will provide to the Third Party Labs basic
                                            support for the Services at no additional charge, and/or
                                            upgraded support if purchased separately and will use
                                            commercially reasonable efforts to make the Services
                                            available 24 (twenty-four) hours a day, 7 (seven) days a
                                            week, except for (i) planned downtime or (ii) any
                                            unavailability caused by circumstances beyond E-Pharma’s
                                            reasonable control, including without limitation Force
                                            Majeure Events (as defined herein below). E-Pharma will
                                            provide the Services only in accordance with applicable
                                            law(s) and government regulations.
                                        </li>
                                        <li className="nested">
                                            The Services may be subject to certain limitations, such
                                            as, limits on disk storage space, on the number of calls
                                            Third Party Labs are permitted to make against E-Pharma’s
                                            application programming interface, and, other
                                            limitations dependent on the Third Party Labs plan, for
                                            example, number of SMS, or number of Users. Any such
                                            limitations are specified in the Third Party Labs’
                                            plans. The Services provide real-time information to
                                            enable Third Party Labs to monitor such Third Party
                                            Labs’ compliance with such limitations.
                                        </li>
                                        <li className="nested">
                                            Notwithstanding anything to the contrary contained
                                            herein, Third Party Labs alone shall be liable for Third
                                            Party Labs’ dealings and interaction with the Users who
                                            avail the services of the Third Party Labs or diagnostic
                                            centres contacted or managed through the Website and
                                            E-Pharma shall have no liability or responsibility in
                                            this regard. E-Pharma does not guarantee or make any
                                            representation with respect to the correctness,
                                            completeness or accuracy of the information or details
                                            provided by such User, Third Party Labs or any
                                            diagnostic centre or any third party through the
                                            Website. The Services should not be used for emergency
                                            appointment purposes.
                                        </li>
                                        <li className="nested">
                                            Notwithstanding anything to the contrary contained
                                            herein, Third Party Labs alone shall be liable for
                                            dealings and interaction with Users contacted or managed
                                            through the Website and E-Pharma shall have no liability
                                            or responsibility in this regard. E-Pharma does not
                                            guarantee or make any representation with respect to the
                                            correctness, completeness or accuracy of the tests
                                            conducted and reports generated by the Third Party Labs.
                                        </li>
                                        <li className="nested">
                                            E-Pharma may, at its sole discretion, suspend Third
                                            Party Labs or Users ability to use or access the Website
                                            at any time while E-Pharma investigates complaints or
                                            alleged violations of these Terms of Use, or for any
                                            other reason. E-Pharma has the right to edit profiles of
                                            Third Party Labs to make them more suitable for package
                                            searches on the Website. If Third Party Labs and/ or
                                            Users find any wrong information on the Website in
                                            relation to such Third Party Labs and/ or User, they can
                                            correct it themselves or contact E-Pharma immediately
                                            for such corrections. E-Pharma shall have no liability
                                            or responsibility in this regard.
                                        </li>
                                        </ol>
                                    </li>
                                    </ol>
                                </li>
                                </ol>
                            </li>
                            <li className="nested">
                                <b>Terms for use of the Online Doctor Consultancy Services:</b>
                                <ol className="sub-norm">
                                <li className="nested">
                                    E-Pharma is an online health platform that provides a variety of
                                    online and online-linked health products and services to the
                                    Users for health related information and resources. Whenever We
                                    use the words "Your physician" or "Your doctor" or "healthcare
                                    provider" or similar words on the Website, including in these
                                    Terms of Use, We mean Your personal doctor with whom You have an
                                    actual, mutually acknowledged, doctor-patient relationship. E-Pharma’s 
                                    Medical Experts are not "Your" physician or healthcare
                                    provider.
                                </li>
                                <li className="nested">
                                    <b>NO DOCTOR-PATIENT RELATIONSHIP</b>: E-Pharma does not replace
                                    Your relationship with physician or healthcare provider. The
                                    information interpreted <b>SHOULD NOT</b> be relied upon as a
                                    substitute for sound professional medical advice, evaluation or
                                    care from Your physician or other qualified healthcare provider.
                                </li>
                                <li className="nested">
                                    You acknowledge that the Medical Experts empanelled with Us are
                                    independent contractors and thereby E-Pharma has an independent
                                    contractor relationship with such Medical Experts and therefore
                                    in no event E-Pharma will be directly or vicariously liable for
                                    any advice or medical consultancy or any loss arising therefrom
                                    that the Medical Experts may provide to You or You may avail as
                                    part of the Services.
                                </li>
                                <li className="nested">
                                    You acknowledge that the e-prescription which may be issued by
                                    the medical expert(s), in certain events, is not be a valid
                                    prescription under applicable law(s) of India and may not be
                                    used for dispensation of medicines by any pharmacist including
                                    the Third Party Pharmacies. You further agree and acknowledge
                                    that if You request us to process the e-prescription or any form
                                    of prescription (whether original or scanned copy of the
                                    original prescription) for facilitation of medicine orders, then
                                    we will only act as an aggregator and assume no responsibility
                                    and/ or liability in relation to the dispensation of the
                                    medicines, which shall at all times be at your sole risk and the
                                    sole responsibility of the Third Party Pharmacies supplying the
                                    medicines to you.
                                </li>
                                <li className="nested">
                                    You acknowledge that although some of the content, text, data,
                                    graphics, images, information, suggestions, guidance, and other
                                    material (collectively, “Information”) that is provided to You
                                    on the Website (including Information provided in direct
                                    response to Your questions or postings) may be provided by
                                    individuals in the medical profession, the provision of such
                                    Information does not create a doctor/medical
                                    professional-patient relationship, but is provided to inform You
                                    on various medical conditions, medical diagnosis and treatment
                                    and it does not constitute a direct medical diagnosis, treatment
                                    or prescription. Everything on the Website should be used for
                                    information purposes only.
                                </li>
                                <li className="nested">
                                    E-Pharma is designed to support the health decisions and choices
                                    that You make. These decisions and choices are Yours, and We
                                    believe that You, in connection with the advice You receive from
                                    Your doctor or other professional healthcare provider, are the
                                    best decision maker about Your health. We cannot make decisions
                                    for you. However, what We can do is help You find good health
                                    information and connect with doctors for in-person information.
                                    On E-Pharma You can ask and find informational questions and
                                    related educational answers by Medical Experts. The Website is
                                    not a place for the practice of medicine, but Medical Experts on
                                    the Website can be a resource for reliable, relevant general
                                    health information.
                                </li>
                                <li className="nested">
                                    Even if Your real life doctor is on E-Pharma, personal medical
                                    advice, treatment or diagnosis are not permitted through the
                                    Website, and by using the Website You agree not to solicit these
                                    or use any information as if it were personal advice, treatment,
                                    or diagnosis. Whenever You want personal medical advice,
                                    treatment, or diagnosis, You should contact Your physician or
                                    professional healthcare provider and see them in person.
                                </li>
                                <li className="nested">
                                    We do not recommend or endorse any specific Medical Expert(s),
                                    tests, products, procedures, opinions, or other information that
                                    may be mentioned on the Website. Reliance on any information
                                    provided on the Website is solely at Your own risk. In case of
                                    any medical emergency, kindly contact Your nearest
                                    doctor/hospital or any related helpline.
                                </li>
                                <li className="nested">
                                    The Services are not for use in medical emergencies or for
                                    critical health situations requiring prompt medical attention.
                                    The Services are not intended to be real-time and may not be the
                                    best solution when a face-to-face consultation is a must and
                                    therefore We strongly discourage any delay in seeking advice
                                    from Your doctor on account of something that You may have
                                    heard/viewed on the Website. You take full responsibility for
                                    ensuring that the information submitted is accurate and E-Pharma
                                    shall not make any effort to validate any information provided
                                    by You for using the Services with respect to content,
                                    correctness or usability. We, with an intention to provide the
                                    best services possible could ask You to share more information
                                    as and when needed.
                                </li>
                                <li className="nested">
                                    The opinions, statements, answers and tele-consultations
                                    (collectively <b>“Consultation”</b>) provided by the Medical
                                    Experts through the Website are solely the individual and
                                    independent opinions and statements of such Medical Experts and
                                    do not reflect the opinions of E-Pharma, its affiliates or any
                                    other organizations or institutions to which such Medical Expert
                                    or such specialist or professional is affiliated or provides
                                    services. E-Pharma does not recommend or endorse any specific
                                    tests, physicians, products, procedures, opinions, or other
                                    information that may be mentioned on the Website or by a
                                    licensee of E-Pharma.
                                </li>
                                <li className="nested">
                                    The inclusion of professionals, specialists and/ or Medical
                                    Experts on the Website or in any professional directory on the
                                    Website does not imply recommendation or endorsement of such
                                    specialists and/ or Medical Experts nor is such information
                                    intended as a tool for verifying the credentials,
                                    qualifications, or abilities of any specialists and/ or Medical
                                    Experts contained therein. Such information is provided on an
                                    ‘as-is’ basis and E-Pharma disclaims all warranties, either
                                    express or implied, including but not limited to the implied
                                    warranties of merchantability and fitness for particular
                                    purpose.
                                </li>
                                <li className="nested">
                                    E-Pharma (the owners and the employee staff of E-Pharma),
                                    Medical Experts and third-party professionals who offer the
                                    Services through the Website accept no responsibility for any
                                    medical, legal or financial events or outcomes related to the
                                    Services availed through the use of the Website.
                                </li>
                                <li className="nested">
                                    E-Pharma makes no warranty that the Services will meet Your
                                    requirements, or that the Service(s) will be uninterrupted,
                                    timely, secure, or error free. This includes loss of data or any
                                    service interruption caused by E-Pharma employees. E-Pharma is
                                    not responsible for transmission errors, corruption of data.
                                </li>
                                <li className="nested">
                                    The Website is for personal use and the Services are for
                                    individuals to use for supporting their personal health
                                    decisions. You may use the Website for personal, but not for
                                    commercial, purposes.
                                </li>
                                <li className="nested">
                                    The Website may not be used for illegal purposes. The
                                    Information and Services may not be used for any illegal
                                    purpose. You may not access our networks, computers, or the
                                    Information and Services in any manner that could damage,
                                    disable, overburden, or impair them, or interfere with any other
                                    person's use and enjoyment. You may not attempt to gain
                                    unauthorized access to any Information or Services, other
                                    accounts, computer systems, or networks connected with the
                                    Website, the Information, or Services. You may not use any
                                    automated means (such as a scraper) to access the Website, the
                                    Information, or Services for any purpose. Such unauthorized
                                    access includes, but is not limited to, using another person’s
                                    login credentials to access his or her E-Pharma profile/
                                    account. Any attempt by any individual or entity to solicit
                                    login information of any other user or Medical Expert or to
                                    access any such account is an express and direct violation of
                                    these Terms of Use and of applicable law(s), including relevant
                                    privacy and security laws and laws prohibiting unfair or
                                    unethical business practices.
                                </li>
                                <li className="nested">
                                    Your right to use the Services is not transferable.
                                </li>
                                <li className="nested">
                                    Notwithstanding anything to the contrary contained herein, You
                                    alone shall be liable for Your dealings and interaction with
                                    patients or Medical Experts (as the case may be) contacted or
                                    managed through the Website and E-Pharma shall have no liability
                                    or responsibility in this regard. E-Pharma does not guarantee or
                                    make any representation with respect to the correctness,
                                    completeness or accuracy of the Information or detail provided
                                    by such client, patient, User, Medical Experts or any third
                                    party through the Website. The Services should not be used for
                                    emergency appointment purposes.
                                </li>
                                <li className="nested">
                                    The exchanges between the Medical Experts and the patient
                                    through the chat window or over telephone (as the case maybe)
                                    and the e-prescription would be accessible to E-Pharma for the
                                    purposes of monitoring the quality of the consultation.
                                </li>
                                <li className="nested">
                                    E-Pharma may, at its sole discretion, suspend User’s or Medical
                                    Expert’s ability to use or access the Website at any time while
                                    E-Pharma investigates complaints or alleged violations of these
                                    Terms of Use, or for any other reason. E-Pharma has the right to
                                    edit profiles of Medical Experts to make them more suitable for
                                    patient/ Users searches on the Website.
                                </li>
                                <li className="nested">
                                    The Services should not be depended upon and should not be
                                    treated as a replacement for obtaining consultation for diseases
                                    as the consultation provided through the Website is generic in
                                    the approach and shall not and cannot act as a substitute for
                                    physical consultation with a doctor. Also the Consultations
                                    provided through the Website are not diagnostic in nature.
                                </li>
                                <li className="nested">
                                    <b>Risks of using E-Pharma’s Services</b>
                                    <ol className="sub-norm">
                                    <li className="nested">
                                        As with any medical procedure, there are potential risks
                                        associated with using the Services. By using the Services,
                                        You agree to abide by these Terms of Use, Privacy Policy and
                                        risks described below. These risks include, but may not be
                                        limited to:
                                        <ol className="sub-norm">
                                        <li className="nested">
                                            While the Website is an honest attempt to provide access
                                            to the best possible medical information to the Users,
                                            the Medical Experts will not be examining You
                                            physically. The Medical Experts may not have access to
                                            all or some of Your medical history that might be
                                            critical to consult You. The Medical Experts will not
                                            have the benefit of information that would be obtained
                                            by examining You in person, observing Your physical
                                            condition and by going through Your medical records.
                                            This means that the Services provided is different from
                                            the diagnostic and treatment services typically decided
                                            by a physician. Therefore, the Medical Experts may not
                                            be aware of facts or information that would affect his
                                            or her opinion of Your diagnosis. To reduce the risk of
                                            this limitation, E-Pharma strongly encourages You to be
                                            in touch with an on-ground physician and share the E-Pharma’s
                                            opinion with him/her.
                                        </li>
                                        <li className="nested">
                                            By requesting a medical opinion through the Website, You
                                            acknowledge and agree that:
                                            <ol className="sub-norm">
                                            <li className="nested">
                                                the advice/information/opinion on diagnosis You may
                                                receive could be limited and provisional;
                                            </li>
                                            <li className="nested">
                                                the medical opinion is not intended to replace a
                                                face-to-face visit with a physician and it does
                                                replace an actual doctor-patient relationship;
                                            </li>
                                            <li className="nested">
                                                in case of a second opinion where there is a
                                                difference of opinion among Our Medical Experts and
                                                Your physician, You would bear the responsibility to
                                                decide on online or offline consultation, or
                                                procedure, and/or treatment;
                                            </li>
                                            <li className="nested">
                                                the Medical Expert is reliant on information
                                                provided by You and hence any information
                                                demonstrated to have been falsified, misleading or
                                                incomplete will immediately render the opinion and
                                                all details therein null and void;
                                            </li>
                                            <li className="nested">
                                                in some cases, the Medical Expert may determine that
                                                the transmitted information is of inadequate quality
                                                and may ask for more information, without which
                                                he/she may refuse to answer the query;
                                            </li>
                                            <li className="nested">
                                                in rare cases, the Medical Experts may feel that the
                                                query may not be answerable without physically
                                                examining the patient/ Users and the Consultation
                                                may be refused forthwith;
                                            </li>
                                            <li className="nested">
                                                in very rare instances, security protocols could
                                                fail, causing a breach of privacy of personal
                                                medical information; and
                                            </li>
                                            <li className="nested">
                                                delays in medical evaluation and answers could occur
                                                due to deficiencies or failures of the service as
                                                per those mentioned in these Terms of Use.
                                            </li>
                                            </ol>
                                        </li>
                                        </ol>
                                    </li>
                                    </ol>
                                </li>
                                </ol>
                            </li>
                            </ol>
                        </div>
                        </li>
                        <li className="nested">
                        <div id="otherTerms" className="cont-details">
                            <h2>OTHER TERMS</h2>
                            <ol className="sub-norm">
                            <li className="nested">
                                <u>
                                Your Profile, Collection, Use, Storage and Transfer of Personal
                                Information:
                                </u>
                                <ol className="sub-norm">
                                <li className="nested">
                                    Your E-Pharma profile is created to store record of Your
                                    Consultations and Your personal health information online,
                                    including history, health conditions, allergies and medications.
                                </li>
                                <li className="nested">
                                    Any information provided as part of a web Consultation or
                                    obtained from use of the Services by You becomes part of Your
                                    E-Pharma record. You agree to provide accurate information to
                                    help Us serve You best to Our knowledge, to periodically review
                                    such information and to update such information as and when
                                    necessary. E-Pharma reserves the right to maintain, delete or
                                    destroy all communications and materials posted or uploaded to
                                    the Website according to its internal record retention and/or
                                    destruction policies. You might be contacted via email to review
                                    the information provided by You for E-Pharma’s record or for the
                                    Services. Please make sure You provide a valid email-id and You
                                    update it as and when needed.
                                </li>
                                <li className="nested">
                                    For additional information regarding use of information about
                                    You, please refer to the Privacy Policy.
                                </li>
                                <li className="nested">
                                    The terms “personal information” and “sensitive personal data or
                                    information” are defined under the Information Technology
                                    (Reasonable Security Practices and Procedures and Sensitive
                                    Personal Information) Rules, 2011 (the “<b>SPI Rules</b>”), and
                                    are reproduced in the Privacy Policy.
                                    <ol className="sub-norm">
                                    <li className="nested">
                                        The Privacy Policy sets out:
                                        <ol className="sub-norm">
                                        <li className="nested">
                                            the type of information collected from Users, including
                                            sensitive personal data or information;
                                        </li>
                                        <li className="nested">
                                            the purpose, means and modes of usage of such
                                            information; and
                                        </li>
                                        <li className="nested">
                                            how and to whom E-Pharma will disclose such information.
                                        </li>
                                        </ol>
                                    </li>
                                    <li>
                                        The Users are expected to read and understand the Privacy
                                        Policy, so as to ensure that he or she has the knowledge of:
                                        <ol className="sub-norm">
                                        <li className="nested">
                                            the fact that the information is being collected;
                                        </li>
                                        <li className="nested">
                                            the purpose for which the information is being
                                            collected;
                                        </li>
                                        <li className="nested">
                                            the intended recipients of the information;
                                        </li>
                                        <li className="nested">
                                            the name and address of the agency that is collecting
                                            the information and the agency that will retain the
                                            information; and
                                        </li>
                                        <li className="nested">
                                            the various rights available to such Users in respect of
                                            such information.
                                        </li>
                                        </ol>
                                    </li>
                                    </ol>
                                </li>
                                <li className="nested">
                                    E-Pharma shall not be responsible in any manner for the
                                    authenticity of the personal information or sensitive personal
                                    data or information supplied by the Users to E-Pharma or any
                                    other person acting on behalf of E-Pharma.
                                </li>
                                <li className="nested">
                                    The use of the Website involves every Users’ registration
                                    information and browsing history being stored and submitted to
                                    the appropriate authorities. The consent and procedure for such
                                    collection and submission is provided in the Privacy Policy. The
                                    other information collected by E-Pharma from Users as part of
                                    the registration process is described in the Privacy Policy. The
                                    consent and revocation procedures in relation to the same are
                                    set out in the Privacy Policy.
                                </li>
                                <li className="nested">
                                    The Users are responsible for maintaining the confidentiality of
                                    the Users’ account access information and password. The Users
                                    shall be responsible for all uses of the Users’ account and
                                    password, whether or not authorized by the Users. The Users
                                    shall immediately notify E-Pharma of any actual or suspected
                                    unauthorized use of the Users’ account or password.
                                </li>
                                <li className="nested">
                                    If a User provides any information that is untrue, inaccurate,
                                    not current or incomplete (or becomes untrue, inaccurate, not
                                    current or incomplete), or E-Pharma has reasonable grounds to
                                    suspect that such information is untrue, inaccurate, not current
                                    or incomplete, E-Pharma shall have the right to suspend or
                                    terminate such account at its sole discretion.
                                </li>
                                <li className="nested">
                                    E-Pharma may disclose or transfer User Information (as defined
                                    in the Privacy Policy) to its affiliates in other countries, and
                                    You hereby consent to such transfer. The SPI Rules only permit
                                    E-Pharma to transfer sensitive personal data or information
                                    including any information, to any other body corporate or a
                                    person in India, or located in any other country, that ensures
                                    the same level of data protection that is adhered to by E-Pharma
                                    as provided for under the SPI Rules, only if such transfer is
                                    necessary for the performance of the lawful contract between
                                    E-Pharma or any person on its behalf and the user or where the
                                    User has consented to data transfer.
                                </li>
                                <li className="nested">
                                    By accepting these Terms of Use and by registering on the
                                    Website, You consent to be contacted by Us and/or by our third
                                    party service providers.You further consent to receive Calls,
                                    emails and messages (SMS) notifications and information from Us
                                    and from Third Party Service Providers including for promotions,
                                    discount and/or other service delivery related issues.
                                </li>
                                </ol>
                            </li>
                            <li className="nested">
                                <u>Payment, Fees and Taxes:</u>
                                <ol className="sub-norm">
                                <li className="nested">
                                    Registration on the Website and the access to the information
                                    provided on the Website is free. E-Pharma does not charge any
                                    fee for accessing, browsing and buying through the Website. You
                                    agree to make all payments directly to the respective Third
                                    Party Pharmacies for purchase of Pharmaceutical Goods and
                                    Services from such Third Party Pharmacies and to the Company in
                                    case of purchase of Pharmaceutical Goods and Services directly
                                    from the Company. The Third Party Pharmacies may choose to
                                    either personally collect such payment from You or may use the
                                    services of collection agents duly appointed in this regard. You
                                    agree and acknowledge that You shall not hold E-Pharma
                                    responsible for any loss or damage caused to You during the
                                    process, due to any acts or omission on the part of third
                                    parties viz. the Third Party Pharmacies or the collection agents
                                    or for any actions/ omissions which are beyond the control of
                                    E-Pharma.
                                </li>
                                <li className="nested">
                                    In relation to the diagnostic services being availed from the
                                    Website, the User agrees to pay all package fees, consulting
                                    fees and other fees applicable to the Third Party Labs for use
                                    of such Services and the Third Party Labs shall not circumvent
                                    the fee structure. The fee is dependent on the package that the
                                    Third Party Labs purchase and not on actual usage of the
                                    Services. In relation to the Users using the diagnostic
                                    Services, the Users agree to make all payments directly to the
                                    respective Third Party Labs for use of the diagnostic Services
                                    from the Website. You agree and acknowledge that You shall not
                                    hold E-Pharma responsible for any loss or damage caused to You
                                    during the process, due to any acts or omission on the part of
                                    the Third Party Labs’ any actions/ omissions which are beyond
                                    the control of E-Pharma.
                                </li>
                                <li className="nested">
                                    Each User / Third Party Service Providers are solely responsible
                                    for payment of all taxes, legal compliances, statutory
                                    registrations and reporting. E-Pharma is in no way responsible
                                    for any of the taxes except for its own income tax.
                                </li>
                                <li className="nested">
                                    The subscription fees for the Services, if any charged by E-Pharma,
                                    could be paid online through the facility made on the
                                    Website. Third parties support and services are required to
                                    process online fee payment. E-Pharma is not responsible for any
                                    loss or damage caused to User/ Third Party Service Providers
                                    during this process as these third parties are beyond the
                                    control of E-Pharma. The fees could also be paid offline and be
                                    either collected personally from the User/ Third Party Service
                                    Providers or required to be mailed to E-Pharma at the following
                                    address of its Corporate office at E-Pharma Healthcare Solutions
                                    Private Limited, 5th Floor Tower –B of The Presidency Building,
                                    46/4 Mehrauli Gurgaon Road, Sector 14, Gurgaon, Haryana-122001,
                                    India.
                                </li>
                                <li className="nested">
                                    All fees are exclusive of applicable taxes.
                                </li>
                                <li className="nested">
                                    E-Pharma reserves the right to modify the fee structure by
                                    providing on the Website which shall be considered as valid and
                                    agreed communication.
                                </li>
                                <li className="nested">
                                    In order to process the payments, E-Pharma might requires
                                    details of User’s/ Third Party Service Providers’ bank account,
                                    credit card number etc. Please check Our Privacy Policy on how
                                    E-Pharma uses the confidential information provided by Users.
                                </li>
                                <li className="nested">
                                    Available payment methods: Wallets: Paytm, AmazonPay, Mobikwik,
                                    AirtelMoney, Freecharge, OlaMoney, JIO Money, PhonePe, MPESA UPI
                                    – BHIM and GooglePay. All debit and credit cards. Cash on
                                    delivery for offline payments.
                                </li>
                                <li className="nested">
                                    Applicable payment charges: No charges levied.
                                </li>
                                <li className="nested">
                                    Details, including contact information of all payment service
                                    providers: Paytm (https://paytm.com/care/ticket), AmazonPay
                                    (https://www.amazonpay.in/contact), Mobikwik
                                    (https://blog.mobikwik.com/contactus/), AirtelMoney
                                    (https://www.airtel.in/personal/money/contact-us), Freecharge
                                    (https://www.freecharge.in/contactus), OlaMoney
                                    (https://www.olamoney.com/support/index.html), JIO Money
                                    (https://www.jiomoney.com/contactus.html), PhonePe
                                    (https://www.phonepe.com/contact-us/), MPESA UPI – BHIM
                                    (https://www.bhimupi.org.in/get-touch) and GooglePay
                                    (https://support.google.com/pay/india/gethelp).
                                </li>
                                <li className="nested">
                                    Security details in relation to payment methods: API integrated.
                                </li>
                                <li className="nested">Charge-back options: No.</li>
                                </ol>
                            </li>
                            <li className="nested">
                                <u>Return, Refund, Cancellation and Shipping charges:</u> <br />
                                We offer return and refund on the products and Services ordered by
                                You on the Website which are subject to further terms and conditions
                                as detailed in the return, refund, cancellation and shipping charges
                                policy (“Return and Refund Policy”). The
                                <a href="/return-policy">Return and Refund Policy</a> forms an
                                integral part of these Terms of Use and the Users are requested to
                                carefully read the same.
                            </li>
                            <li className="nested">
                                <u>
                                Covenants: (Covenanters for the purposes of these Terms of Use
                                shall include the Users and the Third Party Service Providers)
                                </u>
                                <ol className="sub-norm">
                                <li className="nested">
                                    Each Covenanter undertakes that it shall not do any act or post,
                                    display, upload, modify, publish, transmit, update or share any
                                    information that -
                                    <ol className="sub-norm">
                                    <li className="nested">
                                        belongs to another person and to which the such Covenanter
                                        does not have any right;
                                    </li>
                                    <li className="nested">
                                        is grossly harmful, insulting or harassing on the basis of
                                        gender, blasphemous, defamatory, obscene, pornographic,
                                        paedophilic, libellous, invasive of another's privacy
                                        including bodily privacy, hateful, racially or ethnically
                                        objectionable, disparaging, relating or encouraging money
                                        laundering or gambling, or otherwise inconsistent with or
                                        contrary to the laws in force;
                                    </li>
                                    <li className="nested">
                                        infringes any patent, trademark, copyright or other
                                        proprietary rights;
                                    </li>
                                    <li className="nested">
                                        violates any law for the time being in force;
                                    </li>
                                    <li className="nested">impersonates another person;</li>
                                    <li className="nested">is harmful to child;</li>
                                    <li className="nested">
                                        deceives or misleads the addressee about the origin of such
                                        messages or knowingly and intentionally communicates any
                                        information that is patently false or misleading in nature
                                        but may reasonably be perceived as a fact;
                                    </li>
                                    <li className="nested">
                                        contains software viruses or any other computer code, files
                                        or programs designed to interrupt, destroy or limit the
                                        functionality of any computer resource;
                                    </li>
                                    <li className="nested">
                                        is prohibited under applicable law(s) for the time being in
                                        force including Drugs Act read with the Drugs Rules, the
                                        Drugs and Magic Act, the Indian Penal Code, 1860, as amended
                                        from time to time and rules made there under;
                                    </li>
                                    <li className="nested">
                                        is patently false and untrue, and is written or published in
                                        any form, with the intent to mislead or harass a person,
                                        entity or agency for financial gain or to cause any injury
                                        to any person; and
                                    </li>
                                    <li className="nested">
                                        threatens the unity, integrity, defense, security or
                                        sovereignty of India, friendly relations with foreign
                                        states, or public order or causes incitement to the
                                        commission of any cognizable offence or prevents
                                        investigation of any offence or is insulting any other
                                        nation.
                                    </li>
                                    </ol>
                                </li>
                                <li className="nested">
                                    You are also prohibited from:
                                    <ol className="sub-norm">
                                    <li className="nested">
                                        violating or attempting to violate the integrity or security
                                        of the Website or any E-Pharma Content;
                                    </li>
                                    <li className="nested">
                                        transmitting any information (including job posts, messages
                                        and hyperlinks) on or through the Website that is disruptive
                                        or competitive to the provision of Services by E-Pharma;
                                    </li>
                                    <li className="nested">
                                        intentionally submitting on the Website any incomplete,
                                        false or inaccurate information;
                                    </li>
                                    <li className="nested">
                                        making any unsolicited communications to other Covenanters;
                                    </li>
                                    <li className="nested">
                                        using any engine, software, tool, agent or other device or
                                        mechanism (such as spiders, robots, avatars or intelligent
                                        agents) to navigate or search the Website;
                                    </li>
                                    <li className="nested">
                                        attempting to decipher, decompile, disassemble or reverse
                                        engineer any part of the Website;
                                    </li>
                                    <li className="nested">
                                        copying or duplicating in any manner any of the E-Pharma
                                        Content or other information available from the Website; and
                                    </li>
                                    <li className="nested">
                                        framing or hotlinking or deeplinking any E-Pharma Content.
                                    </li>
                                    </ol>
                                </li>
                                <li className="nested">
                                    E-Pharma, upon obtaining knowledge by itself or been brought to
                                    actual knowledge by an affected person in writing or through
                                    email signed with electronic signature about any such
                                    information as mentioned in this Clause 4, shall be entitled to
                                    disable such information that is in contravention of this Clause
                                    4 or any provisions of these Terms of Use. E-Pharma shall be
                                    entitled to preserve such information and associated records for
                                    at least 90 (ninety) days for production to governmental
                                    authorities for investigation purposes.
                                </li>
                                <li className="nested">
                                    In case of non-compliance with any applicable law(s), rules or
                                    regulations, or these Terms of Use or the Privacy Policy by a
                                    Covenanter, E-Pharma has the right to immediately terminate the
                                    access or usage rights of the Covenanter to the Services and to
                                    remove noncompliant information.
                                </li>
                                </ol>
                            </li>
                            <li className="nested">
                                <u>Liability</u>
                                <ol className="sub-norm">
                                <li className="nested">
                                    E-Pharma shall not be responsible or liable in any manner to the
                                    Users or any Third Party Service Providers (collectively
                                    referred to as the <b>“Other Parties”</b>) for any losses,
                                    damage, injuries or expenses incurred by Other Parties as a
                                    result of any disclosures made by E-Pharma, where Other Parties
                                    have consented to the making of such disclosures by E-Pharma. If
                                    the Other Parties had revoked such consent under the terms of
                                    the Privacy Policy, then E-Pharma shall not be responsible or
                                    liable in any manner to the Other Parties for any losses,
                                    damage, injuries or expenses incurred by the Other Parties as a
                                    result of any disclosures made by E-Pharma prior to its actual
                                    receipt of such revocation.
                                </li>
                                <li className="nested">
                                    The Other Parties shall not hold E-Pharma responsible or liable
                                    in any way for any disclosures by E-Pharma under Regulation 6 of
                                    the SPI Rules.
                                </li>
                                <li className="nested">
                                    The Services provided by E-Pharma or any of its licensors or
                                    providers or Third Party Service Providers are provided ‘as is’,
                                    as available, and without any warranties or conditions (express
                                    or implied, including the implied warranties of merchantability,
                                    accuracy, fitness for a particular purpose, title and
                                    non-infringement, arising by statute or otherwise in law or from
                                    a course of dealing or usage or trade). E-Pharma does not
                                    provide or make any representations, warranties or guarantees,
                                    express or implied about the Website or the Services. E-Pharma
                                    does not verify any content or information provided by the Other
                                    Parties on the Website and to the fullest extent permitted by
                                    applicable law(s), disclaims all liability arising out of the
                                    Other Parties’ use or reliance upon the Website, the Services,
                                    the E-Pharma Content, Third Party Contents, representations and
                                    warranties made by the Other Parties on the Website or any loss
                                    arising out of the manner in which the Services have been
                                    rendered.
                                </li>
                                <li className="nested">
                                    The Website may be linked to the website of third parties,
                                    affiliates and business partners. E-Pharma has no control over,
                                    and not liable or responsible for content, accuracy, validity,
                                    reliability, quality of such websites or made available
                                    by/through the Website. Inclusion of any link on the Website
                                    does not imply that E-Pharma endorses the linked website. Other
                                    Parties may use the links and these services at their own risk.
                                </li>
                                <li className="nested">
                                    E-Pharma shall not be responsible for the mishaps/missed
                                    services due to no service/no show from the Other Parties; E-Pharma
                                    shall not be responsible for any error in any of the
                                    services being provided by the Third Party Service Providers.
                                </li>
                                <li className="nested">
                                    Users accept and acknowledge that E-Pharma does not provide any
                                    representation or give any guarantee or warranty (whether
                                    express or implied, or whether arising by virtue of a statue or
                                    otherwise in law or from a course of dealing or usage or trade)
                                    in relation to the goods/ products and services made available
                                    on its Website by Third Party Service Providers, including any
                                    guarantee or warrantee that such goods/ products (i) are
                                    merchantable; (ii) fit for the purpose of which they are to be
                                    (or have been) purchased;(iii) have accurate description; (iv)
                                    do not cause any infringement; and (v) that the Third Party
                                    Service Providers have legal title over the goods/products being
                                    offered for sale by them on the Website. E-Pharma also does not
                                    provide any representation or give any guarantee or warranty
                                    (whether express or implied) about the Website or any of the
                                    Services offered or services offered or provided by the Third
                                    Party Service Providers.
                                </li>
                                <li className="nested">
                                    The Other Parties further accept and acknowledge that E-Pharma
                                    does not verify any content or information provided by either
                                    the Users or the Third Party Services/ or obtained from the
                                    Users or the Third Party Service Providers, and to fullest
                                    extent permitted by applicable law(s), disclaims all liability
                                    arising out of the Other Parties’ use or reliance upon the
                                    Website, the Services, the E-Pharma Content, Third Party
                                    Content, representations and warranties made by the Other
                                    Parties on the Website or any opinion or suggestion given or
                                    expressed by E-Pharma or any Third Party Service Providers in
                                    relation to any Services provided by E-Pharma.
                                </li>
                                <li className="nested">
                                    E-Pharma assumes no responsibility, and shall not be liable for,
                                    any damages to, or viruses that may infect Other Parties’
                                    equipment on account of the Other Parties’ access to, use of, or
                                    browsing the Website or the downloading of any material, data,
                                    text, images, video content, or audio content from the Website.
                                    If any of the Other Party is dissatisfied with the Website, the
                                    sole remedy of such Other Party(s) is to discontinue using the
                                    Website.
                                </li>
                                <li className="nested">
                                    The listing of Third Party Service Providers on the Website is
                                    based on numerous factors including Users comments and
                                    feedbacks. In no event shall the Protected Entities (as defined
                                    herein below) be liable or responsible for the listing order of
                                    Third Party Service Providers on the Website.
                                </li>
                                <li className="nested">
                                    To the maximum extent permitted by applicable law(s), E-Pharma,
                                    its affiliates, independent contractors, service providers,
                                    consultants, licensors, agents, and representatives, and each of
                                    their respective directors, officers or employees (
                                    <b>“Protected Entities”</b>), shall not be liable for any
                                    direct, indirect, special, incidental, punitive, exemplary or
                                    consequential damages, or any other damages of any kind, arising
                                    from, or directly or indirectly related to, (i) the use of, or
                                    the inability to use, the Website or the content, materials and
                                    functions related thereto; (ii) User's provision of information
                                    via the Website; even if such Protected Entity has been advised
                                    of the possibility of such damages.
                                </li>
                                <li className="nested">
                                    In no event shall the Protected Entities be liable for, or in
                                    connection with, (i) the provision of, or failure to provide,
                                    all or any products or service by a Third Party Service Provider
                                    to any User; or (ii) any comments or feedback given by any of
                                    the Users in relation to the goods or services provided by any
                                    Third Party Service Providers; or (ii) any content posted,
                                    transmitted, exchanged or received by or on behalf of any User,
                                    Third Party Service Providers or other person on or through the
                                    Website.
                                </li>
                                <li className="nested">
                                    E-Pharma disclaims any liability in relation to the validity of
                                    the medical advice provided by the Medical Experts and the
                                    validity and legality of the e-prescription for dispensation of
                                    medicines and conduct of diagnostic tests. All liabilities
                                    arising out of any wrong diagnosis of medical condition by the
                                    Medical Experts and/ or arising from the e-prescription will be
                                    of the concerned Medical Expert. Further, all liabilities
                                    arising out of any wrong diagnosis report by the Third Party
                                    Labs and/ or arising from the wrong dispensation of the
                                    Pharmaceutical Goods and Services will be of the concerned Third
                                    Party Labs or the Third Party Pharmacies as the case may be.
                                </li>
                                <li className="nested">
                                    The Users may share their previous medical history during
                                    interaction with the Medical Experts. The Users undertake to
                                    share such information at their own risk. E-Pharma reserves the
                                    right to retain such information for the purpose of providing
                                    Services to the Users.
                                </li>
                                <li className="nested">
                                    With respect to the Consultation Services, after selection of
                                    the type of treatment viz. Homeopathy, Allopathy or Ayurveda
                                    along with the specification of the disease by the patient, E-Pharma
                                    will decide the Medical Expert to whom the query should be
                                    directed based on the information shared by the User. However,
                                    in no event the Protected Entities shall be held liable for the
                                    losses attributable to such decision making and in no event
                                    shall the Protected Entities be liable for any Consultation
                                    provided and/or e-prescription issued by the Medical Expert by
                                    using the interface of online medical consultancy.
                                </li>
                                <li className="nested">
                                    The Users acknowledge that the Protected Entities merely act in
                                    the capacity of facilitators between the Other Parties by
                                    providing a platform for them to interact and transact. In no
                                    event shall the Protected Entities be held liable for any of the
                                    losses attributable to Services offered through the Website.
                                </li>
                                <li className="nested">
                                    In no event shall the total aggregate liability of the Protected
                                    Entities to any Other Parties for all damages, losses, and
                                    causes of action (whether in contract or tort, including, but
                                    not limited to negligence, strict liability, product liability
                                    or otherwise) arising from these Terms of Use or any Other
                                    Parties’ use of the Website exceed an aggregate amount of INR
                                    1000/- (Indian Rupees One Thousand only). E-Pharma accepts no
                                    liability for any errors or omissions on behalf of the Other
                                    Parties.
                                </li>
                                <li className="nested">
                                    In no event shall the Protected Entities be liable for failure
                                    on the part of the Users or Third Party Service Providers to
                                    provide agreed services or to make himself/herself available at
                                    the appointed time, cancellation or rescheduling of
                                    appointments. In no event shall the Protected Entities be liable
                                    for any comments or feedback given by any of the Users in
                                    relation to the services provided by a Third Party Service
                                    Providers.
                                </li>
                                </ol>
                            </li>
                            <li className="nested">
                                <u>Indemnity</u> <br />
                                The Covenanters agree to defend, indemnify and hold harmless E-Pharma,
                                the Protected Entities, independent contractors, service
                                providers, consultants, licensors, agents, and representatives, and
                                each of their respective directors, officers and employees, from and
                                against any and all claims, losses, liability, damages, and/or costs
                                (including, but not limited to, reasonable attorney fees and costs)
                                arising from or related to (a) Covenanters access to or use of
                                Website; (b) Covenanters violation of these Terms of Use or any
                                applicable law(s); (c) Covenanters violation of any rights of
                                another person/ entity, including infringement of their intellectual
                                property rights; or (d) Covenanters conduct in connection with the
                                Website.
                            </li>
                            <li className="nested">
                                <u>Modification of Website</u> <br />
                                E-Pharma reserves the right to modify or discontinue, temporarily or
                                permanently, the Website or any features or portions thereof without
                                prior notice. Other Parties agree that E-Pharma will not be liable
                                for any modification, suspension or discontinuance of the Website or
                                any other part thereof.
                            </li>
                            <li className="nested">
                                <u>Intellectual property rights</u> <br />
                                All the intellectual property used on the Website except those which
                                have been identified as the intellectual properties of the Other
                                Parties shall remain the exclusive property of the Company. The
                                Other Parties agree not to circumvent, disable or otherwise
                                interfere with security related features of the Website or features
                                that prevent or restrict use or copying of any materials or enforce
                                limitations on use of the Website or the materials therein. The
                                materials on the Website or otherwise may not be modified, copied,
                                reproduced, distributed, republished, downloaded, displayed, sold,
                                compiled, posted or transmitted in any form or by any means,
                                including but not limited to, electronic, mechanical, photocopying,
                                recording or other means.
                            </li>
                            <li className="nested">
                                <u>Compliance of Applicable Law</u>
                                <ol className="sub-norm">
                                <li className="nested">
                                    While communicating/ transacting with each other through the
                                    Website, the Other Parties shall at all times ensure full
                                    compliance with the applicable provisions of the Contract Act,
                                    IT Act, IG Guidelines, Drugs Act read with the Drug Rules, Drugs
                                    and Magic Act, The Indian Medical Council Act, 1956 read with
                                    the Indian Medical Council Rules, 1957, Pharmacy Act, Consumer
                                    Protection Act, 1986, SPI Rules, etc (“Captioned Laws”). as well
                                    as all other laws for the time being in force, and ensure due
                                    payment of applicable taxes. They must specifically ensure that
                                    they are in no way purchasing Pharmaceutical Good and Services
                                    or Prescription Drugs without a valid prescription, which are
                                    prohibited under the Drugs Act (read with the Drugs Rules) as
                                    well as the other applicable laws for the time being in force.
                                </li>
                                <li className="nested">
                                    The Users must also ensure that the prescription uploaded on the
                                    Website or emailed to E-Pharma for processing the order for
                                    Prescription Drugs is a valid prescription duly obtained from a
                                    registered medical practitioner. The Users acknowledge and
                                    accept that they shall bear all costs/ liability/ damages,
                                    caused to the Third Party Service Providers or to E-Pharma, as a
                                    result of any dispensation of Prescription Drugs by the Third
                                    Party Service Providers owing to the non-compliance by the User
                                    in this regard.
                                </li>
                                </ol>
                            </li>
                            <li className="nested">
                                Termination (Parties for the Purpose of these Terms of Use shall
                                collectively mean the Other Parties and E-Pharma)
                                <ol className="sub-norm">
                                <li className="nested">
                                    The provisions of these Terms of Use shall continue to apply
                                    until terminated by either of the Party as set for below:
                                    <ol className="sub-norm">
                                    <li className="nested">
                                        In case of Other Parties wanting to terminate these Terms of
                                        Use, Other Parties may do so by:
                                        <ol className="sub-norm">
                                        <li className="nested">not accessing the Website; or</li>
                                        <li className="nested">
                                            closing their accounts for all of the Services that they
                                            use.
                                        </li>
                                        </ol>
                                    </li>
                                    <li className="nested">
                                        E-Pharma reserves the right to, at any time, and with or
                                        without notice, terminate these Terms of Use against each of
                                        the Users or the Third Party Service Providers or the Other
                                        Parties as a whole, if there is:
                                        <ol className="sub-norm">
                                        <li className="nested">
                                            breach any of applicable law(s), including but not
                                            limited to the Captioned Laws or the provisions of these
                                            Terms of Use or the terms of the Privacy Policy or any
                                            other terms, conditions, or policies that may be
                                            applicable to the Other Parties from time to time (or
                                            have acted in a manner that clearly shows that Other
                                            Party(s) do not intend to, or are unable to, comply with
                                            the same); or
                                        </li>
                                        <li className="nested">
                                            E-Pharma is unable to verify or authenticate any
                                            information provided to E-Pharma by Other Party(s); or
                                        </li>
                                        <li className="nested">
                                            E-Pharma believes, in its sole discretion, that Other
                                            Party(s) actions may cause legal liability for E-Pharma
                                            (or any of its affiliates, independent contractors,
                                            service providers, consultants, licensors, agents, and
                                            representatives) or are contrary to the interests of the
                                            Website; or
                                        </li>
                                        <li className="nested">
                                            E-Pharma is required to do so by law; or
                                        </li>
                                        <li className="nested">
                                            if Other Party(s) fail to provide (or after providing
                                            such consent, later revoke) the consents necessary or
                                            desirable for E-Pharma to provide the Services to the
                                            Other Party(s); or
                                        </li>
                                        <li className="nested">
                                            The provision of the Services to the Other Party(s), or
                                            to the general public, is in E-Pharma’s opinion, no
                                            longer commercially viable; or
                                        </li>
                                        <li className="nested">
                                            E-Pharma has elected to discontinue, with or without
                                            reason, access to the Website or the Services (or any
                                            part thereof).
                                        </li>
                                        </ol>
                                    </li>
                                    <li className="nested">
                                        E-Pharma may also terminate or suspend (temporarily or
                                        permanently) all or a portion of Other Party(s) account or
                                        access to the Services, with or without reason. Except as
                                        may be set forth in any of the terms applicable to a
                                        particular Service, termination of Other Party(s) account
                                        may include: (i) removal of access to all offerings within
                                        the Website or with respect to the Services; and (ii)
                                        barring Other Party(s) from further use or access of the
                                        Website or of any of the Services.
                                    </li>
                                    <li className="nested">
                                        Once terminated or suspended (temporarily or permanently),
                                        Other Party(s) may not continue to use the Website under the
                                        same account, a different account or re-register under a new
                                        account.
                                    </li>
                                    <li className="nested">
                                        Upon termination of these Terms of Use, E-Pharma shall have
                                        no obligation to maintain or provide any of Other Party(s)
                                        data and may thereafter, unless legally prohibited, delete
                                        all of Other Party(s) data in its systems or otherwise in
                                        its possession or under its control, including but not
                                        limited to Other Party(s) personal information, log-in ID
                                        and password, order details (including any prescriptions
                                        uploaded) and all related information, files and materials
                                        associated with or inside Other Party(s) account (or any
                                        part thereof).
                                    </li>
                                    <li className="nested">
                                        E-Pharma reserves the right, at its sole discretion, to
                                        pursue all of its legal remedies, including but not limited
                                        to deletion of the Other Party(s) content from the Website
                                        with or without ability to access the Website and the other
                                        Services, upon any breach by the Other Party(s) of these
                                        Terms of Use or if E-Pharma is unable to verify or
                                        authenticate any information the Other Party(s) submits to
                                        E-Pharma, or if the Other Party(s) fail to provide (or after
                                        providing such consent, later revokes) the consents
                                        necessary or desirable for E-Pharma to provide the Services
                                        to the Other Party(s).
                                    </li>
                                    <li className="nested">
                                        The right to terminate/ suspend the account is in addition
                                        to, and without prejudice to, E-Pharma’s right to initiate
                                        action against the Other Party(s), in accordance with
                                        applicable law.
                                    </li>
                                    </ol>
                                </li>
                                </ol>
                            </li>
                            <li className="nested">
                                <u>Force Majeure</u> <br />
                                Other Parties accept and acknowledge that E-Pharma shall not be
                                liable for any loss or damage caused to the User as a result of
                                delay or default or deficiency or failure in the Services as a
                                result of any natural disasters, fire, riots, civil disturbances,
                                actions or decrees of governmental bodies, communication line
                                failures (which are not caused due to the fault of E-Pharma or the
                                Third Party Service Providers), or any other delay or default or
                                deficiency or failure which arises from causes beyond E-Pharma’s
                                reasonable control (<b>“Force Majeure Event”</b>). In the event of
                                any Force Majeure Event arising, E-Pharma, depending on whose
                                performance has been impacted under the Terms of Use, shall
                                immediately give notice to the Other Party(s) of the facts which
                                constitute the Force Majeure Event.Further, delivery time periods
                                specified on Website shall always be nonbinding under all
                                circumstances as delivery is dependent on multiple factors that can
                                assume uncertainty at any moment for unforeseen reasons beyond
                                Company’s control.
                            </li>
                            <li className="nested">
                                <u>Governing Law and Dispute Resolution</u> <br />
                                These Terms of Use and any contractual obligation between the
                                Parties will be governed by the laws of India, without reference to
                                the conflict of laws principles. Any legal action or proceeding
                                related to Other Party(s) access to, or use of, the Website or these
                                Terms of Use shall be subject to the exclusive jurisdiction of the
                                courts at New Delhi. All disputes will be subject to arbitration at
                                New Delhi in English by a sole arbitrator appointed by E-Pharma
                                under the Arbitration and Conciliation Act, 1996.
                            </li>
                            <li className="nested">
                                <u>Survival</u> <br />
                                Even after termination, certain obligations mentioned under
                                Covenants, Liability, Indemnity, Intellectual Property, Dispute
                                Resolution will continue and survive termination.
                            </li>
                            <li className="nested">
                                <u>Severability</u> <br />
                                If any provision of these Terms of Use is deemed invalid, unlawful,
                                void or for any other reason unenforceable, then that provision
                                shall be deemed severable from these Terms of Use and shall not
                                affect the validity and enforceability of any of the remaining
                                provisions.
                            </li>
                            <li className="nested">
                                <u>Waiver</u> <br />
                                No provision of these Terms of Use shall be deemed to be waived and
                                no breach excused, unless such waiver or consent shall be in writing
                                and signed by E-Pharma. Any consent by E-Pharma to, or a waiver by
                                E-Pharma of any breach by Other Parties, whether expressed or
                                implied, shall not constitute consent to, waiver of, or excuse for
                                any other different or subsequent breach.
                            </li>
                            <li className="nested">
                                <u>Headings</u> <br />
                                The headings and subheadings herein are included for convenience and
                                identification only and are not intended to describe, interpret,
                                define or limit the scope, extent or intent of these Terms of Use.
                            </li>
                            <li className="nested">
                                <u>Contact Information</u> <br />
                                If any Other Party(s) has any grievance, comment, question or
                                suggestion regarding any of our Services, please contact our
                                customer service at
                                <a href="mailto:care@E-Pharma.com" target="blank">
                                care@E-Pharma.com
                                </a>
                                . If any Other Party(s) has any questions concerning E-Pharma, the
                                Website, these Terms of Use, or anything related to any of the
                                foregoing, E-Pharma can be reached at the following email address -
                                <a href="mailto:care@E-Pharma.com" target="blank">
                                care@E-Pharma.com
                                </a>{" "}
                                or via the contact information available from the following :
                                <a href="/contactus" target="blank">
                                Contact us
                                </a>
                                . Please also refer to our grievance redressal policy available at
                                <a href="https://www.E-Pharma.com/grievance-redressal-policy">
                                https://www.E-Pharma.com/grievance-redressal-policy
                                </a>
                            </li>
                            </ol>
                        </div>
                        </li>
                    </ol>
                </div>
            </section>
        )
    } else if (compCode === TAKE_HOME_ID) {
        return (
        <div className="container !py-6">
            <style>{`
                p.MsoNormal, li.MsoNormal, div.MsoNormal {
                    margin-top:0in;
                    margin-right:0in;
                    margin-bottom:8.0pt;
                    margin-left:0in;
                    line-height:115%;
                    font-size:12.0pt;
                    font-family:"Calibri",sans-serif;
                }
                .MsoChpDefault {
                    font-size:12.0pt;
                    font-family:"Calibri",sans-serif;
                }
                .MsoPapDefault {
                    margin-bottom:8.0pt;
                    line-height:115%;
                }
                @page WordSection1 {
                    size:8.5in 11.0in;
                    margin:1.0in 1.0in 1.0in 1.0in;
                }
                div.WordSection1 {
                    page:WordSection1;
                }
                ol {
                    margin-bottom:0in;
                    padding: 0;
                }
                ul {
                    margin-bottom:0in;
                }
            `}</style>
            <div className="WordSection1">
                {takehomeMain && <div className="pb-4 pb-lg-0 pt-lg-4 foot-links justify-content-center d-flex flex-wrap align-items-start" style={{ gap: "1em 1.4em" }}>
                    <Link to="/">HOME</Link>
                    <Link to="/contactUs">CONTACT US</Link>
                    <Link to="/aboutUs">ABOUT US</Link>
                </div>}
                <p className="MsoNormal">
                <b>Terms of use OR Terms &amp; Conditions</b>
                </p>
                <p className="MsoNormal" style={{ textAlign: "justify" }}>
                Please read these terms of use carefully by accessing or using this internet based platform, you agree to be bound by the terms described herein and all terms incorporated by reference. If you do not agree to all of these terms, do not use this internet based platform.
                </p>
                <ol style={{ marginTop: "0in" }} start={1} type={1}>
                <li className="MsoNormal" style={{ textAlign: "justify" }}>
                    <b>&nbsp;</b>
                </li>
                </ol>
                <p className="MsoNormal" style={{ textAlign: "justify" }}>
                What is <b>TakeHome</b>
                </p>
                <p className="MsoNormal" style={{ textAlign: "justify" }}>
                &nbsp;The domain name www.pharma.takehome.live, an internet based portal and TakeHome a mobile application, is operated by TakeHome Agro Private Limited, a company duly incorporated under the provisions of the Companies Act, 2013 (hereinafter referred to as “<b>TakeHome</b>” or “<b>We</b>” or “<b>Our</b>” or “<b>Us</b>” or “<b>Company</b>”) having registered office at Plot No. B-1/312, Labonya Apartment, Ground floor, Chittaranjan Park, Kalyani-741235, Nadia, West Bengal, India, with <span style={{ background: "yellow" }}>GSTIN 19AAKCT4207D1ZF and PAN AAKCT4207D</span>. The domain name and the mobile application are collectively referred to as the “<b>Website</b>”.
                </p>
                <ol style={{ marginTop: "0in" }} start={1} type={1}>
                <ol style={{ marginTop: "0in" }} start={1} type={1}>
                    <li className="MsoNormal" style={{ textAlign: "justify" }}>
                    &nbsp;Your access or use of the Website, transaction on the Website and use of Services (as defined herein below) hosted or managed remotely through the Website, are governed by the following terms and conditions (hereinafter referred to as the&nbsp;<b>Terms of Use</b>”), including the applicable policies which are incorporated herein by way of reference. These Terms of Use constitutes a legal and binding contract between you (hereinafter referred to as&nbsp;<b>“You”</b>&nbsp;or&nbsp;
                    <b>“Your”</b>&nbsp;or the&nbsp;<b>“User”</b>) on one part and TakeHome on the other Part.
                    </li>
                    <li className="MsoNormal" style={{ textAlign: "justify" }}>
                    &nbsp;By accessing, browsing or in any way transacting on the Website, or availing any Services, You signify your agreement to be bound by these Terms of Use. Further, by impliedly or expressly accepting these Terms of Use, you also accept and agree to be bound by Our policies, including the Privacy Policy (as set out in Part B herein below), and such other rules, guidelines, policies, terms and conditions as are relevant under the applicable law(s) in India and other jurisdictions for the purposes of accessing, browsing or transacting on the Website, or availing any of the Services, and such rules, guidelines, policies, terms and conditions shall be deemed to be incorporated into, and considered as part and parcel of these Terms of Use. However, if you navigate away from the Website to a third party website, You may be subject to alternative terms and conditions of use and privacy policy, as may be specified on such website. In such event, the terms and conditions of use and privacy policy applicable to that website will govern Your use of that website.
                    </li>
                    <li className="MsoNormal" style={{ textAlign: "justify" }}>
                    &nbsp;The Website is a platform that facilitates (i) online purchase of pharmaceutical products sold by various third party pharmacies&nbsp;
                    <b>(“Third Party Pharmacies”)</b>&nbsp;and by the Company; (ii) diagnostic services being offered by various third party diagnostic centers (<b>“Third Party Labs”</b>); (iii) online medical consultancy services/ second opinion being offered by third party independent doctors (<b>“Medical Experts”</b>); and (iv) online advertisements of various sponsors advertising and marketing their own good and services (<b>“Third Party Advertisers”</b>). The Third Party Pharmacies, Third Party Labs, Medical Experts and the Third Party Advertisers are collectively referred to as the “<b>Third Party Service Providers</b>”. Further the Website also serves as an information platform providing health and wellness related information (“<b>Information Services</b>”) to the Users accessing the Website (The services of the Third Party Services Providers, sale of pharmaceutical products by the Company and the Information Services are collectively referred to as the&nbsp;
                    <b>“Services”</b>).
                    </li>
                    <li className="MsoNormal" style={{ textAlign: "justify" }}>
                    &nbsp;The arrangement between the Third Party Service Providers, You and Us shall be governed in accordance with these Terms of Use. The Services would be made available to such natural persons who have agreed to use the Website after obtaining due registration, in accordance with the procedure as determined by Us, from time to time, (referred to as&nbsp;
                    <b>“You” or “Your” or “Yourself” or “User”</b>, which terms shall also include natural persons who are accessing the Website merely as visitors). The Services are offered to You through various modes which shall include issue of discount coupons and vouchers that can be redeemed for various goods/ services offered for sale by relevant Third Party Service Providers. To facilitate the relation between You and the Third Party Service Providers through the Website, <b>TakeHome</b> shall send to You (promotional content including but not limited to emailers, notifications and messages).
                    </li>
                    <li className="MsoNormal" style={{ textAlign: "justify" }}>
                    &nbsp;You agree and acknowledge that the Website is a platform that You and Third Party Service Providers utilize to meet and interact with another for their transactions. “<b>TakeHome</b>” not and cannot be a party to or save as except as may be provided in these Terms of Use, control in any manner, any transaction between You and the Third Party Service Providers.
                    </li>
                    <li className="MsoNormal" style={{ textAlign: "justify" }}>
                    &nbsp;<b>TakeHome</b> reserves the right to change or modify these Terms of Use or any policy or guideline of the Website including the Privacy Policy, at any time and in its sole discretion. Any changes or modifications will be effective immediately upon posting the revisions on the Website and You waive any right You may have to receive specific notice of such changes or modifications, provided however that, we will inform You of such changes at least once a year. Your continued use of the Website will confirm Your acceptance of such changes or modifications; therefore, You should frequently review these Terms of Use and applicable policies to understand the terms and conditions that apply to Your use of the Website.
                    </li>
                    <li className="MsoNormal" style={{ textAlign: "justify" }}>
                    &nbsp;As a condition to Your use of the Website, You must be 18 (eighteen) years of age or older to use or visit the Website in any manner. By visiting the Website or accepting these Terms of Use, You represent and warrant to <b>TakeHome</b>
                    that You are 18 (eighteen) years of age or older, and that You have the right, authority and capacity to use the Website and agree to and abide by these Terms of Use.
                    </li>
                    <li className="MsoNormal" style={{ textAlign: "justify" }}>
                    &nbsp;These Terms of Use is published in compliance of, and is governed by the provisions of Indian laws, including but limited to:
                    </li>
                    <ol style={{ marginTop: "0in" }} start={1} type={1}>
                    <li className="MsoNormal" style={{ textAlign: "justify" }}>
                        &nbsp;the Indian Contract Act, 1872 (“<b>Contract Act</b>”);
                    </li>
                    <li className="MsoNormal" style={{ textAlign: "justify" }}>
                        &nbsp;the (Indian) Information Technology Act, 2000 (“<b>IT Act</b>”) and the rules, regulations, guidelines and clarifications framed thereunder, including the (Indian) Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Information) Rules, 2011, and the (Indian) Information Technology (Intermediaries Guidelines) Rules, 2011 (“<b>IG Guidelines</b>”);
                    </li>
                    <li className="MsoNormal" style={{ textAlign: "justify" }}>
                        &nbsp;the Drugs and Cosmetic Act, 1940 (“<b>Drugs Act</b>”), read with the Drugs and Cosmetics Rules, 1945 (“<b>Drugs Rules</b>”);
                    </li>
                    <li className="MsoNormal" style={{ textAlign: "justify" }}>
                        &nbsp;the Drugs and Magic Remedies (Objectionable Advertisements) Act, 1954 (“<b>Drugs and Magic Act</b>”);
                    </li>
                    <li className="MsoNormal" style={{ textAlign: "justify" }}>
                        &nbsp;The Indian Medical Council Act, 1956 read with the Indian Medical Council Rules, 1957;
                    </li>
                    <li className="MsoNormal" style={{ textAlign: "justify" }}>
                        &nbsp;Pharmacy Act, 1948 (“<b>Pharmacy Act</b>”) and
                    </li>
                    <li className="MsoNormal" style={{ textAlign: "justify" }}>
                        &nbsp;the Consumer Protection Act, 2019 and&nbsp;
                        <b>Consumer Protection (E-Commerce) Rules, 2020</b>.
                    </li>
                    </ol>
                    <li className="MsoNormal" style={{ textAlign: "justify" }}>
                    &nbsp;TakeHome authorizes You to view and access the content available on the Website solely for the purposes of availing the Services, such as visiting, using, ordering, receiving, delivering and communicating only as per these Terms of Use. The contents on the Website including information, text, graphics, images, logos, button icons, software code, design, and the collection, arrangement and assembly of content, contains Third Party Service Providers’ content (<b>“Third Party Content”</b>) as well as in-house content provided by <b>TakeHome</b> including without limitation, text, copy, audio, video, photographs, illustrations, graphics and other visuals (<b>“TakeHome Content”</b>) (collectively,&nbsp;<b>“Content”</b>). The <b>TakeHome</b> Content is the property of TakeHome and is protected under copyright, trademark and other applicable law(s). You shall not modify the <b>TakeHome</b> Content or reproduce, display, publicly perform, distribute, or otherwise use the <b>TakeHome</b> Content in any way for any public or commercial purpose or for personal gains.
                    </li>
                    <li className="MsoNormal" style={{ textAlign: "justify" }}>
                    &nbsp;Compliance with these Terms of Use would entitle You to a personal, non-exclusive, non-transferable, limited privilege to access and transact on the Website.
                    </li>
                    <li className="MsoNormal" style={{ textAlign: "justify" }}>
                    &nbsp;These Terms of Use constitute an electronic record in terms of the IT Act and rules framed there under, as applicable and amended from time to time. This electronic record is generated by a computer system and does not require any physical or digital signatures.
                    </li>
                </ol>
                <li className="MsoNormal">
                    <b>&nbsp;</b>
                </li>
                </ol>
                <p className="MsoNormal">
                <b>ELIGIBILITY</b>
                </p>
                <ol style={{ marginTop: "0in" }} start={2} type={1}>
                <ol style={{ marginTop: "0in" }} start={1} type={1}>
                    <li className="MsoNormal" style={{ textAlign: "justify" }}>
                    &nbsp;For the purposes of availing the Services and/or transacting with the Third Party Service Providers through the Website, You are required to obtain registration, in accordance with the procedure established by <b>TakeHome</b> in this regard. As part of the registration process, <b>TakeHome</b> may collect the following personal information from You:
                    </li>
                    <ol style={{ marginTop: "0in" }} start={1} type={1}>
                    <li className="MsoNormal">Name;</li>
                    <li className="MsoNormal">User ID;</li>
                    <li className="MsoNormal">Email address;</li>
                    <li className="MsoNormal">&nbsp;Address (including country and ZIP/ postal code);</li>
                    <li className="MsoNormal">Gender;</li>
                    <li className="MsoNormal">Age;</li>
                    <li className="MsoNormal">Phone number;</li>
                    <li className="MsoNormal">Password chosen by the User;</li>
                    <li className="MsoNormal">Valid financial account information; and</li>
                    <li className="MsoNormal">Other details as You may volunteer.</li>
                    <li className="MsoNormal" style={{ textAlign: "justify" }}>
                        &nbsp;The registration on or use/ access of the Website is only available to natural persons, other than those who are ‘incompetent to contract’ under the Contract Act. That is, persons including minors, un-discharged insolvents etc. are not eligible to register on, or use/ access the Website. By registering, accessing or using the Website, You accept the terms of these Terms of Use and represent and warrant to <b>TakeHome</b> that you are ‘competent to contract’ under the Contract Act and have the right, authority and capacity to use the Website and agree to and abide by these Terms of Use.
                    </li>
                    <li className="MsoNormal" style={{ textAlign: "justify" }}>
                        &nbsp;A registered id can only be utilized by the person whose details have been provided and <b>TakeHome</b>
                        does not permit multiple persons to share a single log in/ registration id. However, a registered user, being also a parent or legal guardian of a person ‘incompetent to contract’ such as minors or persons with unsound mind, would be permitted to access and use the Website for the purposes of procuring the Services, on behalf of such persons.
                    </li>
                    <li className="MsoNormal" style={{ textAlign: "justify" }}>
                        &nbsp;Organizations, Companies, and businesses may become registered members on B2B Section of the Website.
                    </li>
                    <li className="MsoNormal" style={{ textAlign: "justify" }}>
                        &nbsp;You agree and acknowledge that You would (i) create only 1 (one) account; (ii) provide accurate, truthful, current and complete information when creating Your account and in all Your dealings through the Website; (iii) maintain and promptly update Your account information; (iv) maintain the security of Your account by not sharing Your password with others and restricting access to Your account and Your computer; (v) promptly notify <b>TakeHome</b>
                        if You discover or otherwise suspect any security breaches relating to the Website; (vi) take responsibility for all the activities that occur under Your account and accept all risk of unauthorized access; (vii) Any communication from <b>TakeHome</b> shall be sent only to your registered mobile number and/or email address or such other contact number or email address that you may designate and (viii) You shall be solely responsible to update your registered mobile number and/or email address on the Website in the event there is a change.
                    </li>
                    <li className="MsoNormal" style={{ textAlign: "justify" }}>
                        &nbsp;The Website uses temporary cookies to store certain data (that is not sensitive personal data or information) that is used by <b>TakeHome</b> for the technical administration of the Website, research and development, and for User administration. In the course of serving advertisements or optimizing services to You, <b>TakeHome</b> may allow authorized third parties to place or recognize a unique cookie on Your browser. <b>TakeHome</b> does not store personally identifiable information in the cookies.
                    </li>
                    <li className="MsoNormal" style={{ textAlign: "justify" }}>
                        &nbsp;<b>TakeHome</b>, at its sole discretion, reserves the right to permanently or temporarily suspend Users, to bar their use and access of the Website and App, at any time while <b>TakeHome</b> investigates complaints or alleged violations of these Terms of Use or any Services, or for any other reason.
                    </li>
                    </ol>
                </ol>
                <li className="MsoNormal">
                    <b>&nbsp;</b>
                </li>
                </ol>
                <p className="MsoNormal">USE OF SERVICES AND THE WEBSITE</p>
                <ol style={{ marginTop: "0in" }} start={3} type={1}>
                <ol style={{ marginTop: "0in" }} start={1} type={1}>
                    <li className="MsoNormal">
                    &nbsp;<b>E-Commerce Platform for Pharmaceutical Products –</b>
                    </li>
                    <ol style={{ marginTop: "0in" }} start={1} type={1}>
                    <li className="MsoNormal">
                        &nbsp;<u>Platform to facilitate transaction of business:</u>
                    </li>
                    <ol style={{ marginTop: "0in" }} start={1} type={1}>
                        <li className="MsoNormal" style={{ textAlign: "justify" }}>
                        &nbsp;Through the Website, <b>TakeHome</b>
                        facilitates the purchase of drugs and other pharmaceutical products, and services offered for sale by Third Party Pharmacies (“
                        <b>Pharmaceutical Goods and Services</b>”). You understand and agree that <b>TakeHome</b>
                        and the Website merely provide hosting services to You and persons browsing / visiting the Website. All items offered for sale on the Website, and the content made available by the Third Party Pharmacies, are third party user generated contents and third party products. <b>TakeHome</b>
                        has no control over such third party user generated contents and/ Pharmaceutical Goods and Services and does not - originate or initiate the transmission, or select the sender/recipient of the transmission, or the information contained in such transmission. The authenticity and genuineness of the Pharmaceutical Goods and Services made available by the Third Party Pharmacies through the Website shall be the sole responsibility of the Third Party Pharmacies. You understand and agree that <b>TakeHome</b> shall have no liability with respect to the authenticity of the Pharmaceutical Goods and Services being facilitated through the Website.
                        </li>
                        <li className="MsoNormal" style={{ textAlign: "justify" }}>
                        &nbsp;You understand and agree that all commercial / contractual terms, with respect to the sale/ purchase/ delivery and consumption of the Pharmaceutical Goods and Services which are offered by and agreed to between You and the Third Party Pharmacies and the contract for purchase of any of the Pharmaceutical Goods and Services, which are offered for sale on the Website by the Third Party Pharmacies shall strictly be a bipartite contract between the Third Party Pharmacies and You.
                        </li>
                        <li className="MsoNormal" style={{ textAlign: "justify" }}>
                        &nbsp;The commercial / contractual terms include without limitation - price, shipping costs, payment methods, payment terms, date, period and mode of delivery, warranties related to Pharmaceutical Goods and Services offered for sale by the Third Party Pharmacies, and after sales services related to such Pharmaceutical Goods and Services are as provided by the Third Party Pharmacies. <b>TakeHome</b> does not have any control over, and does not determine or advise or in any way involve itself in the offering or acceptance of, such commercial / contractual terms offered by and agreed to, between You and the Third Party Pharmacies.
                        </li>
                    </ol>
                    <li className="MsoNormal">
                        &nbsp;<u>Representation as to legal title</u>
                    </li>
                    <ol style={{ marginTop: "0in" }} start={1} type={1}>
                        <li className="MsoNormal">
                        &nbsp;<b>TakeHome</b> does not make any representation or warranty as to legal title of the Pharmaceutical Goods and Services offered for sale by the Third Party Pharmacies on the Website.
                        </li>
                        <li className="MsoNormal" style={{ textAlign: "justify" }}>
                        &nbsp;At no time shall any right, title, claim or interest in the products sold through or displayed on the Website vest with <b>TakeHome</b> nor shall <b>TakeHome</b>
                        have any obligations or liabilities in respect of any transactions on the Website. You agree and acknowledge that the ownership of the inventory of such Pharmaceutical Goods and Services shall always vest with the Third Party Pharmacies, who are advertising or offering them for sale on the Website and are the ultimate sellers.
                        </li>
                        <li className="MsoNormal" style={{ textAlign: "justify" }}>
                        &nbsp;You agree and acknowledge that the Third Party Pharmacies shall be solely responsible for any claim/ liability/ damages that may arise in the event it is discovered that such Third Party Pharmacies do not have the sole and exclusive legal ownership over the Pharmaceutical Goods and Services that have been offered for sale on the Website by such Third Party Pharmacies, or did not have the absolute right, title and authority to deal in and offer for sale such Pharmaceutical Goods and Services on the Website.
                        </li>
                    </ol>
                    <li className="MsoNormal">
                        &nbsp;<u>Non-Performance of Contract</u>
                    </li>
                    </ol>
                </ol>
                </ol>
                <p className="MsoNormal">You accept and acknowledge the following:</p>
                <ol style={{ marginTop: "0in" }} start={3} type={1}>
                <ol style={{ marginTop: "0in" }} start={1} type={1}>
                    <ol style={{ marginTop: "0in" }} start={3} type={1}>
                    <ol style={{ marginTop: "0in" }} start={1} type={1}>
                        <li className="MsoNormal">
                        &nbsp;<b>TakeHome</b> is not responsible for any unsatisfactory, delayed, non-performance or breach of the contract entered into between You and the Third Party Pharmacies for purchase and sale of goods or services offered by such Third Party Pharmacies on the Website;
                        </li>
                        <li className="MsoNormal" style={{ textAlign: "justify" }}>
                        &nbsp;<b>TakeHome</b> cannot and does not guarantee that the concerned Third Party Pharmacies will perform any transaction concluded on the Website;
                        </li>
                        <li className="MsoNormal" style={{ textAlign: "justify" }}>
                        &nbsp;The Third Party Pharmacy(s) are solely responsible for ensuring that the Pharmaceutical Goods and Services offered for sale on the Website are kept in stock for successful fulfillment of orders received. Consequently, <b>TakeHome</b>
                        is not responsible if the Third Party Pharmacy(s) does not satisfy the contract for sale of Pharmaceutical Goods and Services which are out of stock, back ordered or otherwise unavailable, but were shown as available on the Website at the time of placement of order by You;
                        </li>
                        <li className="MsoNormal" style={{ textAlign: "justify" }}>
                        &nbsp;And <b>TakeHome</b>
                        shall not and is not required to mediate or resolve any dispute or disagreement between You and Third Party Pharmacies. In particular, <b>TakeHome</b>
                        does not implicitly or explicitly support or endorse the sale or purchase of any items or services on the Website. <b>TakeHome</b>
                        shall, on a request in writing made by You after the purchase of any Pharmaceutical Goods and Services on the Website, provide You with information regarding the Third Party Pharmacies from which You have made such purchase, including the principal geographic address of its headquarters and all branches, name and details of its website, its email address and any other information necessary for communication with the Third Party Pharmacy for dispute resolution.
                        </li>
                    </ol>
                    <li className="MsoNormal">
                        &nbsp;
                        <u>Exhibition of drugs and publication of Third Party Pharmacies content on the Website</u>
                    </li>
                    <ol style={{ marginTop: "0in" }} start={1} type={1}>
                        <li className="MsoNormal" style={{ textAlign: "justify" }}>
                        &nbsp;You agree and acknowledge that the respective Third Party Pharmacies are exhibiting Third Party Content which includes catalogue of drugs/ pharmaceutical products or services, and information in relation to such drugs/ pharmaceutical products or services, on the Website.
                        </li>
                        <li className="MsoNormal" style={{ textAlign: "justify" }}>
                        &nbsp;The Third Party Content available on the Website, including without limitation, text, copy, audio, video, photographs, illustrations, graphics and other visuals, is for general information purposes only and does not constitute either an advertisement/ promotion of any drug being offered for sale by the Third Party Pharmacies on the Website or any professional medical advice, diagnosis, treatment or recommendations of any kind.
                        </li>
                        <li className="MsoNormal" style={{ textAlign: "justify" }}>
                        &nbsp;You acknowledge and agree that such Third Party Pharmacies shall be solely responsible for ensuring that such Third Party Content made available regarding the Pharmaceutical Goods and Services offered for sale on the Website, are not misleading and describe the actual condition of the Pharmaceutical Goods and Services. In this connection, it is solely the responsibility of the concerned Third Party Pharmacy(s) to ensure that all such information is accurate in all respects and there is no exaggeration or over emphasis on the specifics of such Pharmaceutical Goods and Services so as to mislead the Users in any manner. You acknowledge and understand that <b>TakeHome</b> provides no warranty or representation with respect to the authenticity/ veracity of the information provided on the Website and You must run Your own independent check. You agree and acknowledge that <b>TakeHome</b> has not played any role in the ascertainment of the actual impact/ effect of any Pharmaceutical Goods and Services being offered for sale by the Third Party Pharmacies on the Website. Further, it is hereby clarified that the Third Party Pharmacies are offering the Pharmaceutical Goods and Services for sale to You and they are responsible for procuring the appropriate licenses for the same under the Drugs Act read with the Drug rules and the Pharmacy Act. You agree and acknowledge that You shall not hold <b>TakeHome</b>
                        responsible or liable for any damages arising out of such reliance on third party user generated content by You.
                        </li>
                    </ol>
                    <li className="MsoNormal">
                        &nbsp;<u>Prescription Drugs</u>
                    </li>
                    <ol style={{ marginTop: "0in" }} start={1} type={1}>
                        <li className="MsoNormal" style={{ textAlign: "justify" }}>
                        &nbsp;The Website is a platform that can be used by the Users to purchase various drugs and pharmaceutical products that requires a valid medical prescription issued by a medical expert/ doctor to be provided to a registered pharmacist for the purpose of dispensing such medicine (“Prescription Drugs”), offered for sale on the Website by Third Party Pharmacies. In order to purchase Prescription Drugs from Third Party Pharmacies through the Website, You are required to upload a scanned copy of the valid prescription on the Website or email the same to <b>TakeHome</b>. The order would not be processed and forwarded to the concerned Third Party Pharmacy(s) by <b>TakeHome</b> until it receives a copy of a valid prescription. Third Party Pharmacies will verify the prescription forwarded by You and in case of Third Party Pharmacy(s) observe any discrepancy in the prescription uploaded by You, the Third Party Pharmacy(s) will cancel the order immediately. You are also required to make the original prescription available at the time of receipt of delivery of Prescription Drugs. You shall allow the delivery agent to stamp the original prescription at the time of medicine delivery failing which medicines will not be delivered.
                        </li>
                        <li className="MsoNormal">
                        &nbsp;<b>TakeHome</b> shall maintain a record of all the prescriptions uploaded by the Users.
                        </li>
                    </ol>
                    <li className="MsoNormal">
                        &nbsp;<u>Substitution of Prescribed Drugs</u>
                    </li>
                    <ol style={{ marginTop: "0in" }} start={1} type={1}>
                        <li className="MsoNormal" style={{ textAlign: "justify" }}>
                        &nbsp;You acknowledge and accept that the order for a substitute of a Prescription Drug would only be processed if the medical expert/ doctor has himself/ herself permitted for any other equivalent generic drug to be dispensed in place of the Prescription Drug in the prescription or if the prescription solely lists the salt names instead of a specific brand name.
                        </li>
                        <li className="MsoNormal" style={{ textAlign: "justify" }}>
                        &nbsp;You further acknowledge and accept that, in the absence of the above, the concerned Third Party Pharmacy would not dispense a substitute drug in place of the Prescription Drug.
                        </li>
                    </ol>
                    <li className="MsoNormal">
                        &nbsp;<u>Invitation to offer for sale</u>
                    </li>
                    <ol style={{ marginTop: "0in" }} start={1} type={1}>
                        <li className="MsoNormal" style={{ textAlign: "justify" }}>
                        &nbsp;Notwithstanding anything else contained in any other part of these Terms of Use, the listing of drugs and other pharmaceutical products on the Website by the Third Party Pharmacies is merely an ‘invitation to an offer for sale’ and not an ‘offer for sale’. The placement of an order by You shall constitute an offer by You to enter into an agreement with the Third Party Pharmacies (“Offer”). Post the Offer from the Third Party Pharmacies, <b>TakeHome</b> shall send an email to You with the information on the Offer along with the details of the concerned Third Party Pharmacy(s) who may undertake the sale, and such an email shall not be considered as an acceptance of the Offer. The acceptance of the Offer would only be undertaken by the Third Party Pharmacy(s) after the validation/ verification of the prescription by such Third Party Pharmacy (in case of Prescription Drugs) and the ascertainment of the available stock in the relevant Third Party Pharmacy(s) (in the case of prescription as well as other drugs/ pharmaceutical products), by way of a confirmatory email to be sent to You.
                        </li>
                        <li className="MsoNormal" style={{ textAlign: "justify" }}>
                        &nbsp;For the avoidance of any doubt, it is hereby clarified that any reference of the term ‘offer/ offered for sale by the Third Party Pharmacy’, as appearing in these Terms of Use, shall be construed solely as an ‘invitation to offer for sale’ by any such Third Party Pharmacy.
                        </li>
                    </ol>
                    <li className="MsoNormal">
                        &nbsp;<u>Transfer of Property and Completion of Sale</u>
                    </li>
                    <ol style={{ marginTop: "0in" }} start={1} type={1}>
                        <li className="MsoNormal" style={{ textAlign: "justify" }}>
                        &nbsp;Upon acceptance of the Offer by the concerned Third Party Pharmacy (being the brick and mortar pharmacy, the Pharmaceutical Drugs and Services would be dispensed at the pharmacy, in accordance with the terms of the order placed by You. Such dispensation shall also take place under the direct/ personal supervision of the pharmacist of the Third Party Pharmacy, wherever required under the applicable law(s).
                        </li>
                        <li className="MsoNormal" style={{ textAlign: "justify" }}>
                        &nbsp;You agree and acknowledge that the property and title in the Pharmaceutical Drugs and Services ordered by You shall stand immediately transferred to You upon the dispensation of Pharmaceutical Drugs and Services and the raising of the invoice at the concerned Third Party Pharmacy. Accordingly, the sale of Pharmaceutical Drugs and Services is concluded at the concerned Third Party Pharmacy itself.
                        </li>
                        <li className="MsoNormal" style={{ textAlign: "justify" }}>
                        &nbsp;The invoice in relation to the Pharmaceutical Drugs and Services, that are required to be delivered to You shall be issued by the concerned Third Party Pharmacy (being the brick and mortar pharmacy) which is to process and satisfy the order for such Pharmaceutical Drugs and Services.
                        </li>
                    </ol>
                    <li className="MsoNormal">
                        &nbsp;<u>Delivery of Drugs</u>
                    </li>
                    <ol style={{ marginTop: "0in" }} start={1} type={1}>
                        <li className="MsoNormal" style={{ textAlign: "justify" }}>
                        &nbsp;You agree to appoint an individual who shall act in the capacity of Your agent and collect the medicines as requested by You from Third Party Pharmacy on Your behalf ("User Agent"). You accept and acknowledge that the User Agent shall be responsible to collect the medicines ordered by You from the Third Party Pharmacy and to carry it to the address notified by You.
                        </li>
                        <li className="MsoNormal" style={{ textAlign: "justify" }}>
                        &nbsp;You further agree and acknowledge that the User Agent acts as Your agent for collecting the medicines from the Third Party Pharmacy. The services are being undertaken by User Agent with Your consent and therefore the Company is merely facilitating for You and Users Agent to connect.
                        </li>
                    </ol>
                    </ol>
                    <li className="MsoNormal">
                    &nbsp;<b>Advertising Guidelines for the Website –</b>
                    </li>
                    <ol style={{ marginTop: "0in" }} start={1} type={1}>
                    <li className="MsoNormal" style={{ textAlign: "justify" }}>
                        &nbsp;As part of the Services provided by Us; We facilitate and allow Third Party Advertisers to place advertisements on the Website. Accordingly, there are guidelines (as listed herein below) which the Third Party Advertisers have to follow for placing such advertisements (the “Advertising Policy”).
                    </li>
                    <ol style={{ marginTop: "0in" }} start={1} type={1}>
                        <li className="MsoNormal" style={{ textAlign: "justify" }}>
                        &nbsp;<b>For the Users:</b>&nbsp;<b>TakeHome</b>
                        clearly distinguishes between the editorial content and content that is created or provided by one of Our Third Party Advertisers. The advertisements will be labeled as "sponsored", "from our Advertisers" or "advertisement". This content will not be reviewed by Our in-house editorial staff and shall not be subject to Our editorial policy (as set out herein below) but shall be subject to the Advertising Policy, these Terms of Use (except the editorial policy) and the Privacy Policy.
                        </li>
                        <li className="MsoNormal" style={{ textAlign: "justify" }}>
                        &nbsp;<b>For the Third Party Advertisers:</b>&nbsp;The Third Party Advertisers must be honest about the products or services their advertisements promote; the advertisement shall not create unrealistic expectation and must not be misleading or offending; must be responsible and of the highest standards and without compromising the consumer protection. The Advertising Policy applies to all the advertisements, listed or sought to be listed, on the Website.
                        </li>
                        <li className="MsoNormal" style={{ textAlign: "justify" }}>
                        &nbsp;<b>General Rules:</b>&nbsp;All the advertisements must comply with the Advertising Policy, the terms of these Terms of Use (except the editorial policy) and the Privacy Policy. <b>TakeHome</b> may, at any time and without having to serve any prior notice to the Third Party Advertisers, (i) upgrade, update, change, modify, or improve the Website or a part thereof in a manner it may deem fit, and (ii) change the content of the Advertising Policy and/ or these Terms of Use and/ or the Privacy Policy. It is the responsibility of the Third Party Advertisers, in such cases, to review the terms of the Advertising Policy and/ or these Terms of Use and/ or the Privacy Policy, from time to time. Such change shall be made applicable when they are posted. <b>TakeHome</b> may also alter or remove any content from the Website without prior notice and without liability. The Third Party Advertisers are also responsible for ensuring that their advertisements comply with all applicable law(s) in India and any other jurisdiction that such Third Party Advertiser(s) are based out of, industry codes, rules and regulations in each geographic area where the advertisements will run. All disclosures in the advertisements must be clear and conspicuous.
                        </li>
                        <li className="MsoNormal" style={{ textAlign: "justify" }}>
                        &nbsp;<b>Review:</b>&nbsp;All the advertisements are subject to the review and approval of <b>TakeHome</b>.<b>TakeHome</b> reserves the right to reject or remove any advertisement in its sole discretion for any reason. Further, <b>TakeHome</b>
                        also reserves the right to request modifications to any advertisement, and to require factual substantiation for any claim made in an advertisement.
                        </li>
                        <li className="MsoNormal" style={{ textAlign: "justify" }}>
                        &nbsp;<b>Prohibited Content:</b>&nbsp;The advertisements must not infringe the intellectual property, privacy, publicity, copyright, or other legal rights of any person or entity. The advertisements must not be false, misleading, fraudulent, defamatory, or deceptive. The following advertisement content is prohibited:
                        </li>
                        <ol style={{ marginTop: "0in" }} start={1} type={1}>
                        <li className="MsoNormal" style={{ textAlign: "justify" }}>
                            &nbsp;content that demeans, degrades, or shows hate toward a particular race, gender, culture, country, belief, or toward any member of a protected class;
                        </li>
                        <li className="MsoNormal" style={{ textAlign: "justify" }}>
                            &nbsp;content depicting nudity, sexual behaviour, or obscene gestures;
                        </li>
                        <li className="MsoNormal" style={{ textAlign: "justify" }}>
                            content depicting drug use;
                        </li>
                        <li className="MsoNormal" style={{ textAlign: "justify" }}>
                            &nbsp;content depicting excessive violence, including the harming of animals;
                        </li>
                        <li className="MsoNormal" style={{ textAlign: "justify" }}>
                            &nbsp;shocking, sensational, or disrespectful content;
                        </li>
                        <li className="MsoNormal" style={{ textAlign: "justify" }}>
                            &nbsp;deceptive, false or misleading content, including deceptive claims, offers, or business practices;
                        </li>
                        <li className="MsoNormal" style={{ textAlign: "justify" }}>
                            &nbsp;content that directs users to phishing links, malware, or similarly harmful codes or sites; and
                        </li>
                        <li className="MsoNormal" style={{ textAlign: "justify" }}>
                            &nbsp;content that deceives the Users into providing personal information without their knowledge, under false pretences, or to companies that resell, trade, or otherwise misuse that personal information; and
                        </li>
                        <li className="MsoNormal" style={{ textAlign: "justify" }}>
                            &nbsp;content that violates any law for the time being in force.
                        </li>
                        </ol>
                        <li className="MsoNormal" style={{ textAlign: "justify" }}>
                        &nbsp;<b>Prohibited Advertisements:</b>&nbsp;Advertisements for the following products and services are prohibited:
                        </li>
                        <ol style={{ marginTop: "0in" }} start={1} type={1}>
                        <li className="MsoNormal" style={{ textAlign: "justify" }}>
                            &nbsp;adult products and services (other than contraceptives; see below);
                        </li>
                        <li className="MsoNormal" style={{ textAlign: "justify" }}>
                            &nbsp;cigarettes (including e-cigarettes), cigars, smokeless tobacco, and other tobacco products;
                        </li>
                        <li className="MsoNormal" style={{ textAlign: "justify" }}>
                            &nbsp;products or services that bypass copyright protection, such as software or cable signal descramblers;
                        </li>
                        <li className="MsoNormal" style={{ textAlign: "justify" }}>
                            &nbsp;products or services principally dedicated to selling counterfeit goods or engaging in copyright piracy;
                        </li>
                        <li className="MsoNormal" style={{ textAlign: "justify" }}>
                            &nbsp;get-rich-quick or pyramid schemes or offers or any other deceptive or fraudulent offers;
                        </li>
                        <li className="MsoNormal" style={{ textAlign: "justify" }}>
                            &nbsp;illegal or recreational drugs or drug paraphernalia;
                        </li>
                        <li className="MsoNormal" style={{ textAlign: "justify" }}>
                            &nbsp;counterfeit, fake or bootleg products, or replicas or imitations of designer products;
                        </li>
                        <li className="MsoNormal" style={{ textAlign: "justify" }}>
                            &nbsp;firearms, weapons, ammunition, or accessories;
                        </li>
                        <li className="MsoNormal" style={{ textAlign: "justify" }}>
                            &nbsp;advertisements that promote particular securities or that provide or allege to provide insider tips;
                        </li>
                        <li className="MsoNormal" style={{ textAlign: "justify" }}>
                            &nbsp;any illegal conduct, product, or enterprise;
                        </li>
                        <li className="MsoNormal" style={{ textAlign: "justify" }}>
                            &nbsp;unapproved pharmaceuticals and supplements;
                        </li>
                        <li className="MsoNormal" style={{ textAlign: "justify" }}>
                            prescription drugs;
                        </li>
                        <li className="MsoNormal" style={{ textAlign: "justify" }}>
                            &nbsp;products that have been subject to any government or regulatory action or warning;
                        </li>
                        <li className="MsoNormal" style={{ textAlign: "justify" }}>
                            &nbsp;products with names that are confusingly similar to an unapproved pharmaceutical or supplement or controlled substance; and
                        </li>
                        <li className="MsoNormal" style={{ textAlign: "justify" }}>
                            &nbsp;material that directly advertises products to or is intended to attract children under the age of 13.
                        </li>
                        </ol>
                        <li className="MsoNormal">
                        &nbsp;
                        <b>Prohibited Advertisements under the Drugs and Magic Act:</b>
                        </li>
                        <ol style={{ marginTop: "0in" }} start={1} type={1}>
                        <li className="MsoNormal" style={{ textAlign: "justify" }}>
                            &nbsp;subject to the provisions of the Drugs and Magic Act, no person shall take any part in the publication of any advertisement referring to any drug which suggest or are calculated to lead to the use of that drug for –
                        </li>
                        <ol style={{ marginTop: "0in" }} start={1} type={1}>
                            <li className="MsoNormal" style={{ textAlign: "justify" }}>
                            &nbsp;the procurement of miscarriage in women or prevention of conception in women; or
                            </li>
                            <li className="MsoNormal" style={{ textAlign: "justify" }}>
                            &nbsp;the maintenance or improvement of the capacity of human beings for sexual pleasure; or
                            </li>
                            <li className="MsoNormal" style={{ textAlign: "justify" }}>
                            &nbsp;the correction of menstrual disorder in women; or
                            </li>
                            <li className="MsoNormal" style={{ textAlign: "justify" }}>
                            &nbsp;the diagnosis, cure, mitigation, treatment or prevention of any disease, disorder or condition specified in the schedule of the Drugs and Magic Act, or any other disease, disorder or condition (by whatsoever name called) which may be specified in the rules made under the Drugs and Magic Act; or provided that no such rule shall be made except, – (i) in respect of any disease, disorder or condition which requires timely treatment in consultation with a doctor or for which there are normally no accepted remedies; or
                            </li>
                            <li className="MsoNormal" style={{ textAlign: "justify" }}>
                            &nbsp;prohibition of misleading advertisements relating to drugs;
                            </li>
                            <li className="MsoNormal" style={{ textAlign: "justify" }}>
                            &nbsp;subject to the provisions of the Drugs and Magic Act, no person shall take any part in the publication of any advertisement relating to a drug if the advertisement contains any matters which:
                            </li>
                            <ol style={{ marginTop: "0in" }} start={1} type={1}>
                            <li className="MsoNormal" style={{ textAlign: "justify" }}>
                                &nbsp;directly or indirectly gives a false impression regarding the true character of the drug; or
                            </li>
                            <li className="MsoNormal" style={{ textAlign: "justify" }}>
                                &nbsp;makes a false claim for the drug; or
                            </li>
                            <li className="MsoNormal" style={{ textAlign: "justify" }}>
                                &nbsp;is otherwise false or misleading in any material particular.
                            </li>
                            </ol>
                        </ol>
                        <li className="MsoNormal" style={{ textAlign: "justify" }}>
                            &nbsp;It is hereby clarified that that the Third Party Advertisers will comply with all the provisions of the Drugs and Magic Act and the rules made thereunder. Further, it is agreed that the Third Party Advertisers shall be solely responsible for any penalty or any action taken by the governmental authorities for non-compliance with the Drugs and Magic Act and the rules made thereunder.
                        </li>
                        </ol>
                        <li className="MsoNormal" style={{ textAlign: "justify" }}>
                        &nbsp;<b>Restricted Advertisements:</b>&nbsp;Advertisements in the following categories are restricted and require approval on a case-by-case basis:
                        </li>
                        <ol style={{ marginTop: "0in" }} start={1} type={1}>
                        <li className="MsoNormal" style={{ textAlign: "justify" }}>
                            &nbsp;advertisements that promote or reference alcohol;
                        </li>
                        <li className="MsoNormal" style={{ textAlign: "justify" }}>
                            &nbsp;advertisements for online dating services;
                        </li>
                        <li className="MsoNormal" style={{ textAlign: "justify" }}>
                            &nbsp;advertisements for gambling and games of skill;
                        </li>
                        <li className="MsoNormal" style={{ textAlign: "justify" }}>
                            advertisements for lotteries;
                        </li>
                        <li className="MsoNormal" style={{ textAlign: "justify" }}>
                            &nbsp;advertisements for financial services;
                        </li>
                        <li className="MsoNormal" style={{ textAlign: "justify" }}>
                            &nbsp;advertisements for contraceptives;
                        </li>
                        <li className="MsoNormal" style={{ textAlign: "justify" }}>
                            &nbsp;advertisements for online pharmacies or pharmaceuticals; and
                        </li>
                        <li className="MsoNormal" style={{ textAlign: "justify" }}>
                            political advertisements.
                        </li>
                        </ol>
                        <li className="MsoNormal">
                        &nbsp;<b>Testimonials &amp; Endorsements:</b>
                        </li>
                        <ol style={{ marginTop: "0in" }} start={1} type={1}>
                        <li className="MsoNormal" style={{ textAlign: "justify" }}>
                            &nbsp;Any testimonials and endorsements contained in advertisements must comply with all applicable law(s), industry codes, rules, and regulations. For example, a clear and conspicuous disclaimer is required if an endorser's results were atypical or if the endorser was paid;
                        </li>
                        <li className="MsoNormal" style={{ textAlign: "justify" }}>
                            &nbsp;<b>TakeHome</b>
                            recognizes and maintains a distinct separation between advertising and sponsored content and editorial content. All advertising or sponsored content on the Website of the Company will be clearly and unambiguously identified; and
                        </li>
                        <li className="MsoNormal">&nbsp;A click on an advertisement may only link the User to the website of the Third Party Advertiser(s).</li>
                        </ol>
                    </ol>
                    </ol>
                    <li className="MsoNormal">
                    &nbsp;<b>Editorial Policy for the Website –</b>
                    </li>
                    <ol style={{ marginTop: "0in" }} start={1} type={1}>
                    <li className="MsoNormal">
                        &nbsp;As part of the Services, <b>TakeHome</b> provides <b>TakeHome</b>
                        Content on the Website targeted at general public for informational purposes only and does not constitute professional medical advice, diagnosis, treatment or recommendations of any kind. <b>TakeHome</b>
                        Content is subject to the following rules/ information:
                    </li>
                    <ol style={{ marginTop: "0in" }} start={1} type={1}>
                        <li className="MsoNormal" style={{ textAlign: "justify" }}>
                        &nbsp;<b>TakeHome</b>
                        Content is original and is relevant to the general public;
                        </li>
                        <li className="MsoNormal" style={{ textAlign: "justify" }}>
                        &nbsp;topics for <b>TakeHome</b>
                        Content are selected by Our board of qualified experts consisting of certified medical experts, pharmacist and medical professionals;
                        </li>
                        <li className="MsoNormal" style={{ textAlign: "justify" }}>
                        &nbsp;topics for <b>TakeHome</b>
                        Content are chosen on the basis of current health news, drug alerts, new drug launches, latest medical findings published in peer-reviewed medical journals, such as ‘The Journal of the American Medical Association’, ‘The New England Journal of Medicine’, ‘The Lancet’, ‘Pediatrics’, ‘Diabetes Care’, and many others;
                        </li>
                        <li className="MsoNormal" style={{ textAlign: "justify" }}>
                        &nbsp;editorial board (as mentioned below) takes into account the latest trending health and wellness topics like dengue, swine flu, seasonal allergies, new vaccines, public awareness trends like breast cancer awareness month," and ‘Healthy Heart Month’; as well as emerging health and nutrition trends like health benefits quinoa, use of BGR 34 for managing diabetes, alternative medicine like ayurveda, homeopathy and much more;
                        </li>
                        <li className="MsoNormal" style={{ textAlign: "justify" }}>
                        &nbsp;<b>TakeHome</b>
                        maintains principles of fairness, accuracy, objectivity, and responsible, independent reporting;
                        </li>
                        <li className="MsoNormal" style={{ textAlign: "justify" }}>
                        &nbsp;the member of <b>TakeHome</b>
                        has to fully disclose any potential conflict of interest with any of the Third Party Service Providers;
                        </li>
                        <li className="MsoNormal" style={{ textAlign: "justify" }}>
                        &nbsp;<b>TakeHome</b>’s editorial staff holds the responsibility of providing objective, accurate, and balanced accounts of events and issues;{" "}
                        <span style={{ color: "black", background: "white" }}>
                            and Write to{" "}
                            <b>
                            <u>ask@takehome.live</u>
                            </b>
                        </span>
                        </li>
                    </ol>
                    </ol>
                    <li className="MsoNormal">
                    &nbsp;<b>Diagnostics Services –</b>
                    </li>
                    <ol style={{ marginTop: "0in" }} start={1} type={1}>
                    <li className="MsoNormal" style={{ textAlign: "justify" }}>
                        &nbsp;As a condition of Your use of and access to the diagnostic services provided through the Website and Your acceptance of these Terms of Use, You are subject to the following rules/ guidelines:
                    </li>
                    <ol style={{ marginTop: "0in" }} start={1} type={1}>
                        <li className="MsoNormal">
                        &nbsp;<b>Terms for use of the Diagnostic Services:</b>
                        </li>
                        <ol style={{ marginTop: "0in" }} start={1} type={1}>
                        <li className="MsoNormal" style={{ textAlign: "justify" }}>
                            &nbsp;<b>TakeHome</b>
                            provides Services through the Website as a marketplace and facilitates the Users to avail diagnostic test/ packages facilities offered by Third Party Labs through the Website. <b>TakeHome</b> is not and shall not be responsible for any sample collected, tests conducted and reports generated by the Third Party Labs and does not deal with any of Third Party Labs’ client or patient managed by Third Party Labs through the Website and only provides facilitation Services to the Users through the Website. Use of the Website may require the Third Party Labs to use software and the Third Party Labs have to ensure the procurement of such software from the concerned providers. User and the Third Party Labs agree to use the Website and the materials provided therein only for purposes that are permitted by: (a) these Terms of Use; and (b) any applicable law(s), regulation or generally accepted practices or guidelines in the relevant jurisdictions.
                        </li>
                        <li className="MsoNormal" style={{ textAlign: "justify" }}>
                            &nbsp;The Third Party Labs may not access the Services if the Third Party Labs are <b>TakeHome</b>’s direct competitor, except with <b>TakeHome</b>’s prior written consent. In addition, the Third Party Labs may not access the Services for purposes of monitoring their availability, performance or functionality, or for any other benchmarking or competitive purposes.
                        </li>
                        <li className="MsoNormal" style={{ textAlign: "justify" }}>
                            &nbsp;<b>TakeHome</b> will provide to the Third Party Labs basic support for the Services at no additional charge, and/or upgraded support if purchased separately and will use commercially reasonable efforts to make the Services available 24 (twenty-four) hours a day, 7 (seven) days a week, except for (i) planned downtime or (ii) any unavailability caused by circumstances beyond <b>TakeHome’s</b> reasonable control, including without limitation Force Majeure Events (as defined herein below). <b>TakeHome</b>
                            will provide the Services only in accordance with applicable law(s) and government regulations.
                        </li>
                        <li className="MsoNormal" style={{ textAlign: "justify" }}>
                            &nbsp;The Services may be subject to certain limitations, such as, limits on disk storage space, on the number of calls Third Party Labs are permitted to make against <b>TakeHome</b>’s application programming interface, and, other limitations dependent on the Third Party Labs plan, for example, number of SMS, or number of Users. Any such limitations are specified in the Third Party Labs’ plans. The Services provide real-time information to enable Third Party Labs to monitor such Third Party Labs’ compliance with such limitations.
                        </li>
                        <li className="MsoNormal" style={{ textAlign: "justify" }}>
                            &nbsp;Notwithstanding anything to the contrary contained herein, Third Party Labs alone shall be liable for Third Party Labs’ dealings and interaction with the Users who avail the services of the Third Party Labs or diagnostic centres contacted or managed through the Website and <b>TakeHome</b>
                            shall have no liability or responsibility in this regard. <b>TakeHome</b>
                            does not guarantee or make any representation with respect to the correctness, completeness or accuracy of the information or details provided by such User, Third Party Labs or any diagnostic centre or any third party through the Website. The Services should not be used for emergency appointment purposes.
                        </li>
                        <li className="MsoNormal" style={{ textAlign: "justify" }}>
                            &nbsp;Notwithstanding anything to the contrary contained herein, Third Party Labs alone shall be liable for dealings and interaction with Users contacted or managed through the Website and <b>TakeHome</b> shall have no liability or responsibility in this regard. <b>TakeHome</b> does not guarantee or make any representation with respect to the correctness, completeness or accuracy of the tests conducted and reports generated by the Third Party Labs.
                        </li>
                        <li className="MsoNormal" style={{ textAlign: "justify" }}>
                            &nbsp;<b>TakeHome</b> may, at its sole discretion, suspend Third Party Labs or Users ability to use or access the Website at any time while <b>TakeHome</b>
                            investigates complaints or alleged violations of these Terms of Use, or for any other reason. <b>TakeHome</b> has the right to edit profiles of Third Party Labs to make them more suitable for package searches on the Website. If Third Party Labs and/ or Users find any wrong information on the Website in relation to such Third Party Labs and/ or User, they can correct it themselves or contact <b>TakeHome</b>
                            immediately for such corrections. <b>TakeHome</b> shall have no liability or responsibility in this regard.
                        </li>
                        <li className="MsoNormal" style={{ textAlign: "justify" }}>
                            &nbsp;Any lab order pending for sample collection, pertaining to non-slot confirmation from the Customer, Customer being unresponsive/unreachable, or unavailable, for more than 72 hours from the time of placing the lab order, shall be subject to automatic cancellation by <b>TakeHome</b>.
                        </li>
                        <li className="MsoNormal" style={{ textAlign: "justify" }}>
                            &nbsp;Sample collection slots for a lab order can be rescheduled by a customer either through <b>TakeHome</b>
                            platform or by contacting the customer support team of <b>TakeHome</b>. The slot rescheduling shall only be allowed up to 4 times within a period of 14 days from the initial date of slot booked by the customer. Beyond the said period, customer shall not be eligible for slot reschedule and <b>TakeHome</b> in its sole discretion reserves the right to cancel the lab order.
                        </li>
                        </ol>
                    </ol>
                    </ol>
                    <li className="MsoNormal">
                    &nbsp;<b>Terms for use of the Online Doctor Consultancy Services:</b>
                    </li>
                    <ol style={{ marginTop: "0in" }} start={1} type={1}>
                    <li className="MsoNormal" style={{ textAlign: "justify" }}>
                        &nbsp;<b>TakeHome</b> is an online health platform that provides a variety of online and online-linked health products and services to the Users for health related information and resources. Whenever We use the words "Your physician" or "Your doctor" or "healthcare provider" or similar words on the Website, including in these Terms of Use, We mean Your personal doctor with whom You have an actual, mutually acknowledged, doctor-patient relationship. <b>TakeHome</b>’s Medical Experts are not "Your" physician or healthcare provider.
                    </li>
                    <li className="MsoNormal" style={{ textAlign: "justify" }}>
                        &nbsp;<b>NO DOCTOR-PATIENT RELATIONSHIP</b>: <b>TakeHome</b> does not replace Your relationship with physician or healthcare provider. The information interpreted&nbsp;<b>SHOULD NOT</b>&nbsp;be relied upon as a substitute for sound professional medical advice, evaluation or care from Your physician or other qualified healthcare provider.
                    </li>
                    <li className="MsoNormal" style={{ textAlign: "justify" }}>
                        &nbsp;You acknowledge that the Medical Experts empanelled with Us are independent contractors and thereby <b>TakeHome</b> has an independent contractor relationship with such Medical Experts and therefore in no event <b>TakeHome</b> will be directly or vicariously liable for any advice or medical consultancy or any loss arising therefrom that the Medical Experts may provide to You or You may avail as part of the Services.
                    </li>
                    <li className="MsoNormal" style={{ textAlign: "justify" }}>
                        &nbsp;You acknowledge that the e-prescription which may be issued by the medical expert(s), in certain events, is not be a valid prescription under applicable law(s) of India and may not be used for dispensation of medicines by any pharmacist including the Third Party Pharmacies. You further agree and acknowledge that if You request us to process the e-prescription or any form of prescription (whether original or scanned copy of the original prescription) for facilitation of medicine orders, then we will only act as an aggregator and assume no responsibility and/ or liability in relation to the dispensation of the medicines, which shall at all times be at your sole risk and the sole responsibility of the Third Party Pharmacies supplying the medicines to you.
                    </li>
                    <li className="MsoNormal" style={{ textAlign: "justify" }}>
                        &nbsp;You acknowledge that although some of the content, text, data, graphics, images, information, suggestions, guidance, and other material (collectively, “Information”) that is provided to You on the Website (including Information provided in direct response to Your questions or postings) may be provided by individuals in the medical profession, the provision of such Information does not create a doctor/medical professional-patient relationship, but is provided to inform You on various medical conditions, medical diagnosis and treatment and it does not constitute a direct medical diagnosis, treatment or prescription. Everything on the Website should be used for information purposes only.
                    </li>
                    <li className="MsoNormal" style={{ textAlign: "justify" }}>
                        &nbsp;<b>TakeHome</b> is designed to support the health decisions and choices that You make. These decisions and choices are Yours, and We believe that You, in connection with the advice You receive from Your doctor or other professional healthcare provider, are the best decision maker about Your health. We cannot make decisions for you. However, what We can do is help You find good health information and connect with doctors for in-person information. On <b>TakeHome</b> You can ask and find informational questions and related educational answers by Medical Experts. The Website is not a place for the practice of medicine, but Medical Experts on the Website can be a resource for reliable, relevant general health information.
                    </li>
                    <li className="MsoNormal" style={{ textAlign: "justify" }}>
                        &nbsp;Even if Your real life doctor is on <b>TakeHome</b>, personal medical advice, treatment or diagnosis are not permitted through the Website, and by using the Website You agree not to solicit these or use any information as if it were personal advice, treatment, or diagnosis. Whenever You want personal medical advice, treatment, or diagnosis, You should contact Your physician or professional healthcare provider and see them in person.
                    </li>
                    <li className="MsoNormal" style={{ textAlign: "justify" }}>
                        &nbsp;We do not recommend or endorse any specific Medical Expert(s), tests, products, procedures, opinions, or other information that may be mentioned on the Website. Reliance on any information provided on the Website is solely at Your own risk. In case of any medical emergency, kindly contact Your nearest doctor/hospital or any related helpline.
                    </li>
                    <li className="MsoNormal" style={{ textAlign: "justify" }}>
                        &nbsp;The Services are not for use in medical emergencies or for critical health situations requiring prompt medical attention. The Services are not intended to be real-time and may not be the best solution when a face-to-face consultation is a must and therefore We strongly discourage any delay in seeking advice from Your doctor on account of something that You may have heard/viewed on the Website. You take full responsibility for ensuring that the information submitted is accurate and <b>TakeHome</b>
                        shall not make any effort to validate any information provided by You for using the Services with respect to content, correctness or usability. We, with an intention to provide the best services possible could ask You to share more information as and when needed.
                    </li>
                    <li className="MsoNormal" style={{ textAlign: "justify" }}>
                        &nbsp;The opinions, statements, answers and tele-consultations (collectively&nbsp;<b>“Consultation”</b>) provided by the Medical Experts through the Website are solely the individual and independent opinions and statements of such Medical Experts and do not reflect the opinions of <b>TakeHome</b>, its affiliates or any other organizations or institutions to which such Medical Expert or such specialist or professional is affiliated or provides services. <b>TakeHome</b>
                        does not recommend or endorse any specific tests, physicians, products, procedures, opinions, or other information that may be mentioned on the Website or by a licensee of <b>TakeHome</b>.
                    </li>
                    <li className="MsoNormal" style={{ textAlign: "justify" }}>
                        &nbsp;The inclusion of professionals, specialists and/ or Medical Experts on the Website or in any professional directory on the Website does not imply recommendation or endorsement of such specialists and/ or Medical Experts nor is such information intended as a tool for verifying the credentials, qualifications, or abilities of any specialists and/ or Medical Experts contained therein. Such information is provided on an ‘as-is’ basis and <b>TakeHome</b>
                        disclaims all warranties, either express or implied, including but not limited to the implied warranties of merchantability and fitness for particular purpose.
                    </li>
                    <li className="MsoNormal" style={{ textAlign: "justify" }}>
                        &nbsp;<b>TakeHome</b> (the owners and the employee staff of <b>TakeHome</b>), Medical Experts and third-party professionals who offer the Services through the Website accept no responsibility for any medical, legal or financial events or outcomes related to the Services availed through the use of the Website.
                    </li>
                    <li className="MsoNormal" style={{ textAlign: "justify" }}>
                        &nbsp;<b>TakeHome</b> makes no warranty that the Services will meet Your requirements, or that the Service(s) will be uninterrupted, timely, secure, or error free. This includes loss of data or any service interruption caused by <b>TakeHome</b>
                        employees. <b>TakeHome</b> is not responsible for transmission errors, corruption of data.
                    </li>
                    <li className="MsoNormal" style={{ textAlign: "justify" }}>
                        &nbsp;The Website is for personal use and the Services are for individuals to use for supporting their personal health decisions. You may use the Website for personal, but not for commercial, purposes.
                    </li>
                    <li className="MsoNormal" style={{ textAlign: "justify" }}>
                        &nbsp;The Website may not be used for illegal purposes. The Information and Services may not be used for any illegal purpose. You may not access our networks, computers, or the Information and Services in any manner that could damage, disable, overburden, or impair them, or interfere with any other person's use and enjoyment. You may not attempt to gain unauthorized access to any Information or Services, other accounts, computer systems, or networks connected with the Website, the Information, or Services. You may not use any automated means (such as a scraper) to access the Website, the Information, or Services for any purpose. Such unauthorized access includes, but is not limited to, using another person’s login credentials to access his or her <b>TakeHome</b> profile/ account. Any attempt by any individual or entity to solicit login information of any other user or Medical Expert or to access any such account is an express and direct violation of these Terms of Use and of applicable law(s), including relevant privacy and security laws and laws prohibiting unfair or unethical business practices.
                    </li>
                    <li className="MsoNormal" style={{ textAlign: "justify" }}>
                        &nbsp;Your right to use the Services is not transferable.
                    </li>
                    <li className="MsoNormal" style={{ textAlign: "justify" }}>
                        &nbsp;Notwithstanding anything to the contrary contained herein, You alone shall be liable for Your dealings and interaction with patients or Medical Experts (as the case may be) contacted or managed through the Website and <b>TakeHome</b>
                        shall have no liability or responsibility in this regard. <b>TakeHome</b>
                        does not guarantee or make any representation with respect to the correctness, completeness or accuracy of the Information or detail provided by such client, patient, User, Medical Experts or any third party through the Website. The Services should not be used for emergency appointment purposes.
                    </li>
                    <li className="MsoNormal" style={{ textAlign: "justify" }}>
                        &nbsp;The exchanges between the Medical Experts and the patient through the chat window or over telephone (as the case maybe) and the e-prescription would be accessible to <b>TakeHome</b> for the purposes of monitoring the quality of the consultation.
                    </li>
                    <li className="MsoNormal" style={{ textAlign: "justify" }}>
                        &nbsp;<b>TakeHome</b> may, at its sole discretion, suspend User’s or Medical Expert’s ability to use or access the Website at any time while <b>TakeHome</b> investigates complaints or alleged violations of these Terms of Use, or for any other reason. <b>TakeHome</b> has the right to edit profiles of Medical Experts to make them more suitable for patient/ Users searches on the Website.
                    </li>
                    <li className="MsoNormal" style={{ textAlign: "justify" }}>
                        &nbsp;The Services should not be depended upon and should not be treated as a replacement for obtaining consultation for diseases as the consultation provided through the Website is generic in the approach and shall not and cannot act as a substitute for physical consultation with a doctor. Also the Consultations provided through the Website are not diagnostic in nature.
                    </li>
                    <li className="MsoNormal" style={{ textAlign: "justify" }}>
                        &nbsp;<b>Risks of using TakeHome’s Services</b>
                    </li>
                    <ol style={{ marginTop: "0in" }} start={1} type={1}>
                        <li className="MsoNormal" style={{ textAlign: "justify" }}>
                        &nbsp;As with any medical procedure, there are potential risks associated with using the Services. By using the Services, You agree to abide by these Terms of Use, Privacy Policy and risks described below. These risks include, but may not be limited to:
                        </li>
                        <ol style={{ marginTop: "0in" }} start={1} type={1}>
                        <li className="MsoNormal" style={{ textAlign: "justify" }}>
                            &nbsp;While the Website is an honest attempt to provide access to the best possible medical information to the Users, the Medical Experts will not be examining You physically. The Medical Experts may not have access to all or some of Your medical history that might be critical to consult You. The Medical Experts will not have the benefit of information that would be obtained by examining You in person, observing Your physical condition and by going through Your medical records. This means that the Services provided is different from the diagnostic and treatment services typically decided by a physician. Therefore, the Medical Experts may not be aware of facts or information that would affect his or her opinion of Your diagnosis. To reduce the risk of this limitation,
                            <b>TakeHome</b> strongly encourages You to be in touch with an on-ground physician and share the <b>TakeHome</b>’s opinion with him/her.
                        </li>
                        <li className="MsoNormal" style={{ textAlign: "justify" }}>
                            &nbsp;By requesting a medical opinion through the Website, You acknowledge and agree that:
                        </li>
                        <ol style={{ marginTop: "0in" }} start={1} type={1}>
                            <li className="MsoNormal" style={{ textAlign: "justify" }}>
                            &nbsp;the advice/information/opinion on diagnosis You may receive could be limited and provisional;
                            </li>
                            <li className="MsoNormal" style={{ textAlign: "justify" }}>
                            &nbsp;the medical opinion is not intended to replace a face-to-face visit with a physician and it does replace an actual doctor-patient relationship;
                            </li>
                            <li className="MsoNormal" style={{ textAlign: "justify" }}>
                            &nbsp;in case of a second opinion where there is a difference of opinion among Our Medical Experts and Your physician, You would bear the responsibility to decide on online or offline consultation, or procedure, and/or treatment;
                            </li>
                            <li className="MsoNormal" style={{ textAlign: "justify" }}>
                            &nbsp;the Medical Expert is reliant on information provided by You and hence any information demonstrated to have been falsified, misleading or incomplete will immediately render the opinion and all details therein null and void;
                            </li>
                            <li className="MsoNormal" style={{ textAlign: "justify" }}>
                            &nbsp;in some cases, the Medical Expert may determine that the transmitted information is of inadequate quality and may ask for more information, without which he/she may refuse to answer the query;
                            </li>
                            <li className="MsoNormal" style={{ textAlign: "justify" }}>
                            &nbsp;in rare cases, the Medical Experts may feel that the query may not be answerable without physically examining the patient/ Users and the Consultation may be refused forthwith;
                            </li>
                            <li className="MsoNormal" style={{ textAlign: "justify" }}>
                            &nbsp;in very rare instances, security protocols could fail, causing a breach of privacy of personal medical information; and
                            </li>
                            <li className="MsoNormal" style={{ textAlign: "justify" }}>
                            &nbsp;delays in medical evaluation and answers could occur due to deficiencies or failures of the service as per those mentioned in these Terms of Use.
                            </li>
                        </ol>
                        </ol>
                    </ol>
                    </ol>
                </ol>
                <li className="MsoNormal" style={{ textAlign: "justify" }}>
                    <b>&nbsp;</b>
                </li>
                </ol>
                <p className="MsoNormal" style={{ textAlign: "justify" }}>
                OTHER TERMS
                </p>
                <ol style={{ marginTop: "0in" }} start={4} type={1}>
                <ol style={{ marginTop: "0in" }} start={1} type={1}>
                    <li className="MsoNormal" style={{ textAlign: "justify" }}>
                    &nbsp;
                    <u>Your Profile, Collection, Use, Storage and Transfer of Personal Information:</u>
                    </li>
                    <ol style={{ marginTop: "0in" }} start={1} type={1}>
                    <li className="MsoNormal" style={{ textAlign: "justify" }}>
                        &nbsp;Your TakeHome profile is created to store record of Your Consultations and Your personal health information online, including history, health conditions, allergies and medications.
                    </li>
                    <li className="MsoNormal" style={{ textAlign: "justify" }}>
                        &nbsp;Any information provided as part of a web Consultation or obtained from use of the Services by You becomes part of Your TakeHome record. You agree to provide accurate information to help Us serve You best to Our knowledge, to periodically review such information and to update such information as and when necessary. TakeHome reserves the right to maintain, delete or destroy all communications and materials posted or uploaded to the Website according to its internal record retention and/or destruction policies. You might be contacted via email to review the information provided by You for <b>TakeHome’s</b> record or for the Services. Please make sure You provide a valid email-id and You update it as and when needed.
                    </li>
                    <li className="MsoNormal" style={{ textAlign: "justify" }}>
                        &nbsp;For additional information regarding use of information about You, please refer to the Privacy Policy.
                    </li>
                    <li className="MsoNormal" style={{ textAlign: "justify" }}>
                        &nbsp;The terms “personal information” and “sensitive personal data or information” are defined under the Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Information) Rules, 2011 (the “<b>SPI Rules</b>”), and are reproduced in the Privacy Policy.
                    </li>
                    <ol style={{ marginTop: "0in" }} start={1} type={1}>
                        <li className="MsoNormal" style={{ textAlign: "justify" }}>
                        &nbsp;The Privacy Policy sets out:
                        </li>
                        <ol style={{ marginTop: "0in" }} start={1} type={1}>
                        <li className="MsoNormal" style={{ textAlign: "justify" }}>
                            &nbsp;the type of information collected from Users, including sensitive personal data or information;
                        </li>
                        <li className="MsoNormal" style={{ textAlign: "justify" }}>
                            &nbsp;the purpose, means and modes of usage of such information; and
                        </li>
                        <li className="MsoNormal" style={{ textAlign: "justify" }}>
                            &nbsp;how and to whom <b>TakeHome</b>
                            will disclose such information.
                        </li>
                        </ol>
                        <li className="MsoNormal" style={{ textAlign: "justify" }}>
                        The Users are expected to read and understand the Privacy Policy, so as to ensure that he or she has the knowledge of:
                        </li>
                        <ol style={{ marginTop: "0in" }} start={1} type={1}>
                        <li className="MsoNormal" style={{ textAlign: "justify" }}>
                            &nbsp;the fact that the information is being collected;
                        </li>
                        <li className="MsoNormal" style={{ textAlign: "justify" }}>
                            &nbsp;the purpose for which the information is being collected;
                        </li>
                        <li className="MsoNormal" style={{ textAlign: "justify" }}>
                            &nbsp;the intended recipients of the information;
                        </li>
                        <li className="MsoNormal" style={{ textAlign: "justify" }}>
                            &nbsp;the name and address of the agency that is collecting the information and the agency that will retain the information; and
                        </li>
                        <li className="MsoNormal" style={{ textAlign: "justify" }}>
                            &nbsp;the various rights available to such Users in respect of such information.
                        </li>
                        </ol>
                    </ol>
                    <li className="MsoNormal" style={{ textAlign: "justify" }}>
                        &nbsp;TakeHome shall not be responsible in any manner for the authenticity of the personal information or sensitive personal data or information supplied by the Users to TakeHome or any other person acting on behalf of TakeHome.
                    </li>
                    <li className="MsoNormal" style={{ textAlign: "justify" }}>
                        &nbsp;The use of the Website involves every Users’ registration information and browsing history being stored and submitted to the appropriate authorities. The consent and procedure for such collection and submission is provided in the Privacy Policy. The other information collected by TakeHome from Users as part of the registration process is described in the Privacy Policy. The consent and revocation procedures in relation to the same are set out in the Privacy Policy.
                    </li>
                    <li className="MsoNormal" style={{ textAlign: "justify" }}>
                        &nbsp;The Users are responsible for maintaining the confidentiality of the Users’ account access information and password. The Users shall be responsible for all uses of the Users’ account and password, whether or not authorized by the Users. The Users shall immediately notify <b>TakeHome</b> of any actual or suspected unauthorized use of the Users’ account or password.
                    </li>
                    <li className="MsoNormal" style={{ textAlign: "justify" }}>
                        &nbsp;If a User provides any information that is untrue, inaccurate, not current or incomplete (or becomes untrue, inaccurate, not current or incomplete), or TakeHome has reasonable grounds to suspect that such information is untrue, inaccurate, not current or incomplete, <b>TakeHome</b> shall have the right to suspend or terminate such account at its sole discretion.
                    </li>
                    <li className="MsoNormal" style={{ textAlign: "justify" }}>
                        &nbsp;TakeHome may disclose or transfer User Information (as defined in the Privacy Policy) to its affiliates in other countries, and You hereby consent to such transfer. The SPI Rules only permit <b>TakeHome</b> to transfer sensitive personal data or information including any information, to any other body corporate or a person in India, or located in any other country, that ensures the same level of data protection that is adhered to by TakeHome as provided for under the SPI Rules, only if such transfer is necessary for the performance of the lawful contract between <b>TakeHome</b> or any person on its behalf and the user or where the User has consented to data transfer.
                    </li>
                    <li className="MsoNormal" style={{ textAlign: "justify" }}>
                        &nbsp;By accepting these Terms of Use and by registering on the Website, You consent to be contacted by Us and/or by our third party service providers. You further consent to receive Calls, emails and messages (SMS) notifications and information from Us and from Third Party Service Providers including for promotions, discount and/or other service delivery related issues.
                    </li>
                    </ol>
                    <li className="MsoNormal" style={{ textAlign: "justify" }}>
                    &nbsp;
                    <b>
                        <u>Payment, Fees and Taxes:</u>
                    </b>
                    </li>
                    <ol style={{ marginTop: "0in" }} start={1} type={1}>
                    <li className="MsoNormal" style={{ textAlign: "justify" }}>
                        &nbsp;Registration on the Website and the access to the information provided on the Website is free. <b>TakeHome</b> does not charge any fee for accessing, browsing and buying through the Website. You agree to make all payments directly to the respective Third Party Pharmacies for purchase of Pharmaceutical Goods and Services from such Third Party Pharmacies and to the Company in case of purchase of Pharmaceutical Goods and Services directly from the Company. The Third Party Pharmacies may choose to either personally collect such payment from You or may use the services of collection agents duly appointed in this regard. You agree and acknowledge that You shall not hold <b>TakeHome</b> responsible for any loss or damage caused to You during the process, due to any acts or omission on the part of third parties viz. the Third Party Pharmacies or the collection agents or for any actions/ omissions which are beyond the control of <b>TakeHome</b>.
                    </li>
                    <li className="MsoNormal" style={{ textAlign: "justify" }}>
                        &nbsp;In relation to the diagnostic services being availed from the Website, the User agrees to pay all package fees, consulting fees and other fees applicable to the Third Party Labs for use of such Services and the Third Party Labs shall not circumvent the fee structure. The fee is dependent on the package that the Third Party Labs purchase and not on actual usage of the Services. In relation to the Users using the diagnostic Services, the Users agree to make all payments directly to the respective Third Party Labs for use of the diagnostic Services from the Website. You agree and acknowledge that You shall not hold <b>TakeHome</b> responsible for any loss or damage caused to You during the process, due to any acts or omission on the part of the Third Party Labs’ any actions/ omissions which are beyond the control of <b>TakeHome</b>.
                    </li>
                    <li className="MsoNormal" style={{ textAlign: "justify" }}>
                        &nbsp;Each User / Third Party Service Providers are solely responsible for payment of all taxes, legal compliances, statutory registrations and reporting. TakeHome is in no way responsible for any of the taxes except for its own income tax.
                    </li>
                    <li className="MsoNormal" style={{ textAlign: "justify" }}>
                        &nbsp;The subscription fees for the Services, if any charged by <b>TakeHome</b>, could be paid online through the facility made on the Website. Third parties support and services are required to process online fee payment. <b>TakeHome</b>
                        is not responsible for any loss or damage caused to User/ Third Party Service Providers during this process as these third parties are beyond the control of <b>TakeHome</b>. The fees could also be paid offline and be either collected personally from the User/ Third Party Service Providers or required to be mailed to TakeHome at the following address of its Corporate office at <b>TakeHome</b> Agro Private Limited, B-1/312, Chittaranjan Park, Kalyani, Nadia-741235, India.
                    </li>
                    <li className="MsoNormal" style={{ textAlign: "justify" }}>
                        &nbsp;All fees are exclusive of applicable taxes.
                    </li>
                    <li className="MsoNormal" style={{ textAlign: "justify" }}>
                        &nbsp;TakeHome reserves the right to modify the fee structure by providing on the Website which shall be considered as valid and agreed communication.
                    </li>
                    <li className="MsoNormal" style={{ textAlign: "justify" }}>
                        &nbsp;In order to process the payments, <b>TakeHome</b> might requires details of User’s/ Third Party Service Providers’ bank account, credit card number etc. Please check Our Privacy Policy on how <b>TakeHome</b> uses the confidential information provided by Users.
                    </li>
                    <li className="MsoNormal" style={{ textAlign: "justify" }}>
                        &nbsp;Available payment methods: Wallets: Paytm, AmazonPay, Mobikwik, AirtelMoney, Freecharge, OlaMoney, JIO Money, PhonePe, MPESA UPI – BHIM and GooglePay. All debit and credit cards. Cash on delivery for offline payments.
                    </li>
                    <li className="MsoNormal" style={{ textAlign: "justify" }}>
                        &nbsp;Applicable payment charges: May be or May be No charges levied.
                    </li>
                    <li className="MsoNormal" style={{ textAlign: "justify" }}>
                        &nbsp;Security details in relation to payment methods: API integrated.
                    </li>
                    <li className="MsoNormal" style={{ textAlign: "justify" }}>
                        Charge-back options: No.
                    </li>
                    </ol>
                    <li className="MsoNormal">
                    &nbsp;
                    <b>
                        <u>Return, Refund, Cancellation and Shipping charges</u>
                    </b>
                    <u>:</u>
                    <br />
                    <br />
                    </li>
                </ol>
                </ol>
                <p className="MsoNormal" style={{ marginLeft: "1.0in", textAlign: "justify" }}>
                We offer return and refund on the products and Services ordered by You on the Website which are subject to further terms and conditions as detailed in the return, refund, cancellation and shipping charges policy (“Return and Refund Policy”). The Return and Refund Policy&nbsp;forms an integral part of these Terms of Use and the Users are requested to carefully read the same.
                </p>
                <ol style={{ marginTop: "0in" }} start={4} type={1}>
                <ol style={{ marginTop: "0in" }} start={4} type={1}>
                    <li className="MsoNormal" style={{ textAlign: "justify" }}>
                    &nbsp;
                    <b>
                        <u>Covenants: (Covenanters for the purposes of these Terms of Use shall include the Users and the Third Party Service Providers)</u>
                    </b>
                    </li>
                    <ol style={{ marginTop: "0in" }} start={1} type={1}>
                    <li className="MsoNormal" style={{ textAlign: "justify" }}>
                        &nbsp;Each Covenanter undertakes that it shall not do any act or post, display, upload, modify, publish, transmit, update or share any information that -
                    </li>
                    <ol style={{ marginTop: "0in" }} start={1} type={1}>
                        <li className="MsoNormal" style={{ textAlign: "justify" }}>
                        &nbsp;belongs to another person and to which the such Covenanter does not have any right;
                        </li>
                        <li className="MsoNormal" style={{ textAlign: "justify" }}>
                        &nbsp;is grossly harmful, insulting or harassing on the basis of gender, blasphemous, defamatory, obscene, pornographic, pedophilic, libelous, invasive of another's privacy including bodily privacy, hateful, racially or ethnically objectionable, disparaging, relating or encouraging money laundering or gambling, or otherwise inconsistent with or contrary to the laws in force;
                        </li>
                        <li className="MsoNormal" style={{ textAlign: "justify" }}>
                        &nbsp;infringes any patent, trademark, copyright or other proprietary rights;
                        </li>
                        <li className="MsoNormal" style={{ textAlign: "justify" }}>
                        &nbsp;violates any law for the time being in force;
                        </li>
                        <li className="MsoNormal" style={{ textAlign: "justify" }}>
                        impersonates another person;
                        </li>
                        <li className="MsoNormal" style={{ textAlign: "justify" }}>
                        is harmful to child;
                        </li>
                        <li className="MsoNormal" style={{ textAlign: "justify" }}>
                        &nbsp;deceives or misleads the addressee about the origin of such messages or knowingly and intentionally communicates any information that is patently false or misleading in nature but may reasonably be perceived as a fact;
                        </li>
                        <li className="MsoNormal" style={{ textAlign: "justify" }}>
                        &nbsp;contains software viruses or any other computer code, files or programs designed to interrupt, destroy or limit the functionality of any computer resource;
                        </li>
                        <li className="MsoNormal" style={{ textAlign: "justify" }}>
                        &nbsp;is prohibited under applicable law(s) for the time being in force including Drugs Act read with the Drugs Rules, the Drugs and Magic Act, the Indian Penal Code, 1860, as amended from time to time and rules made there under;
                        </li>
                        <li className="MsoNormal" style={{ textAlign: "justify" }}>
                        &nbsp;is patently false and untrue, and is written or published in any form, with the intent to mislead or harass a person, entity or agency for financial gain or to cause any injury to any person; and
                        </li>
                        <li className="MsoNormal" style={{ textAlign: "justify" }}>
                        &nbsp;threatens the unity, integrity, defense, security or sovereignty of India, friendly relations with foreign states, or public order or causes incitement to the commission of any cognizable offence or prevents investigation of any offence or is insulting any other nation.
                        </li>
                    </ol>
                    <li className="MsoNormal" style={{ textAlign: "justify" }}>
                        &nbsp;You are also prohibited from:
                    </li>
                    <ol style={{ marginTop: "0in" }} start={1} type={1}>
                        <li className="MsoNormal" style={{ textAlign: "justify" }}>
                        &nbsp;violating or attempting to violate the integrity or security of the Website or any <b>TakeHome</b>
                        Content;
                        </li>
                        <li className="MsoNormal" style={{ textAlign: "justify" }}>
                        &nbsp;transmitting any information (including job posts, messages and hyperlinks) on or through the Website that is disruptive or competitive to the provision of Services by <b>TakeHome</b>;
                        </li>
                        <li className="MsoNormal" style={{ textAlign: "justify" }}>
                        &nbsp;intentionally submitting on the Website any incomplete, false or inaccurate information;
                        </li>
                        <li className="MsoNormal" style={{ textAlign: "justify" }}>
                        &nbsp;making any unsolicited communications to other Covenanters;
                        </li>
                        <li className="MsoNormal" style={{ textAlign: "justify" }}>
                        &nbsp;using any engine, software, tool, agent or other device or mechanism (such as spiders, robots, avatars or intelligent agents) to navigate or search the Website;
                        </li>
                        <li className="MsoNormal" style={{ textAlign: "justify" }}>
                        &nbsp;attempting to decipher, decompile, disassemble or reverse engineer any part of the Website;
                        </li>
                        <li className="MsoNormal" style={{ textAlign: "justify" }}>
                        &nbsp;copying or duplicating in any manner any of the TakeHome Content or other information available from the Website; and
                        </li>
                        <li className="MsoNormal" style={{ textAlign: "justify" }}>
                        &nbsp;framing or hotlinking or deeplinking any <b>TakeHome</b> Content.
                        </li>
                    </ol>
                    <li className="MsoNormal" style={{ textAlign: "justify" }}>
                        &nbsp;<b>TakeHome</b>, upon obtaining knowledge by itself or been brought to actual knowledge by an affected person in writing or through email signed with electronic signature about any such information as mentioned in this Clause 4, shall be entitled to disable such information that is in contravention of this Clause 4 or any provisions of these Terms of Use. <b>TakeHome</b>
                        shall be entitled to preserve such information and associated records for at least 90 (ninety) days for production to governmental authorities for investigation purposes.
                    </li>
                    <li className="MsoNormal" style={{ textAlign: "justify" }}>
                        &nbsp;In case of non-compliance with any applicable law(s), rules or regulations, or these Terms of Use or the Privacy Policy by a Covenanter, <b>TakeHome</b>
                        has the right to immediately terminate the access or usage rights of the Covenanter to the Services and to remove noncompliant information.
                    </li>
                    </ol>
                    <li className="MsoNormal" style={{ textAlign: "justify" }}>
                    &nbsp;<u>Liability</u>
                    </li>
                    <ol style={{ marginTop: "0in" }} start={1} type={1}>
                    <li className="MsoNormal" style={{ textAlign: "justify" }}>
                        &nbsp;<b>TakeHome</b> shall not be responsible or liable in any manner to the Users or any Third Party Service Providers (collectively referred to as the&nbsp;<b>“Other Parties”</b>) for any losses, damage, injuries or expenses incurred by Other Parties as a result of any disclosures made by TakeHome, where Other Parties have consented to the making of such disclosures by TakeHome. If the Other Parties had revoked such consent under the terms of the Privacy Policy, then TakeHome shall not be responsible or liable in any manner to the Other Parties for any losses, damage, injuries or expenses incurred by the Other Parties as a result of any disclosures made by TakeHome prior to its actual receipt of such revocation.
                    </li>
                    <li className="MsoNormal" style={{ textAlign: "justify" }}>
                        &nbsp;The Other Parties shall not hold <b>TakeHome</b> responsible or liable in any way for any disclosures by <b>TakeHome</b> under Regulation 6 of the SPI Rules.
                    </li>
                    <li className="MsoNormal" style={{ textAlign: "justify" }}>
                        &nbsp;The Services provided by TakeHome or any of its licensors or providers or Third Party Service Providers are provided ‘as is’, as available, and without any warranties or conditions (express or implied, including the implied warranties of merchantability, accuracy, fitness for a particular purpose, title and non-infringement, arising by statute or otherwise in law or from a course of dealing or usage or trade). TakeHome does not provide or make any representations, warranties or guarantees, express or implied about the Website or the Services. <b>TakeHome</b> does not verify any content or information provided by the Other Parties on the Website and to the fullest extent permitted by applicable law(s), disclaims all liability arising out of the Other Parties’ use or reliance upon the Website, the Services, the <b>TakeHome</b> Content, Third Party Contents, representations and warranties made by the Other Parties on the Website or any loss arising out of the manner in which the Services have been rendered.
                    </li>
                    <li className="MsoNormal" style={{ textAlign: "justify" }}>
                        &nbsp;The Website may be linked to the website of third parties, affiliates and business partners. TakeHome has no control over, and not liable or responsible for content, accuracy, validity, reliability, quality of such websites or made available by/through the Website. Inclusion of any link on the Website does not imply that <b>TakeHome</b> endorses the linked website. Other Parties may use the links and these services at their own risk.
                    </li>
                    <li className="MsoNormal" style={{ textAlign: "justify" }}>
                        &nbsp;<b>TakeHome</b> shall not be responsible for the mishaps/missed services due to no service/no show from the Other Parties; <b>TakeHome</b> shall not be responsible for any error in any of the services being provided by the Third Party Service Providers.
                    </li>
                    <li className="MsoNormal" style={{ textAlign: "justify" }}>
                        &nbsp;Users accept and acknowledge that <b>TakeHome</b> does not provide any representation or give any guarantee or warranty (whether express or implied, or whether arising by virtue of a statue or otherwise in law or from a course of dealing or usage or trade) in relation to the goods/ products and services made available on its Website by Third Party Service Providers, including any guarantee or warrantee that such goods/ products (i) are merchantable; (ii) fit for the purpose of which they are to be (or have been) purchased;(iii) have accurate description; (iv) do not cause any infringement; and (v) that the Third Party Service Providers have legal title over the goods/products being offered for sale by them on the Website. TakeHome also does not provide any representation or give any guarantee or warranty (whether express or implied) about the Website or any of the Services offered or services offered or provided by the Third Party Service Providers.
                    </li>
                    <li className="MsoNormal" style={{ textAlign: "justify" }}>
                        &nbsp;The Other Parties further accept and acknowledge that TakeHome does not verify any content or information provided by either the Users or the Third Party Services/ or obtained from the Users or the Third Party Service Providers, and to fullest extent permitted by applicable law(s), disclaims all liability arising out of the Other Parties’ use or reliance upon the Website, the Services, the <b>TakeHome</b> Content, Third Party Content, representations and warranties made by the Other Parties on the Website or any opinion or suggestion given or expressed by <b>TakeHome</b> or any Third Party Service Providers in relation to any Services provided by <b>TakeHome</b>.
                    </li>
                    <li className="MsoNormal" style={{ textAlign: "justify" }}>
                        &nbsp;<b>TakeHome</b> assumes no responsibility, and shall not be liable for, any damages to, or viruses that may infect Other Parties’ equipment on account of the Other Parties’ access to, use of, or browsing the Website or the downloading of any material, data, text, images, video content, or audio content from the Website. If any of the Other Party is dissatisfied with the Website, the sole remedy of such Other Party(s) is to discontinue using the Website.
                    </li>
                    <li className="MsoNormal" style={{ textAlign: "justify" }}>
                        &nbsp;The listing of Third Party Service Providers on the Website is based on numerous factors including Users comments and feedbacks. In no event shall the Protected Entities (as defined herein below) be liable or responsible for the listing order of Third Party Service Providers on the Website.
                    </li>
                    <li className="MsoNormal" style={{ textAlign: "justify" }}>
                        &nbsp;To the maximum extent permitted by applicable law(s), <b>TakeHome</b>, its affiliates, independent contractors, service providers, consultants, licensors, agents, and representatives, and each of their respective directors, officers or employees (<b>“Protected Entities”</b>), shall not be liable for any direct, indirect, special, incidental, punitive, exemplary or consequential damages, or any other damages of any kind, arising from, or directly or indirectly related to, (i) the use of, or the inability to use, the Website or the content, materials and functions related thereto; (ii) User's provision of information via the Website; even if such Protected Entity has been advised of the possibility of such damages.
                    </li>
                    <li className="MsoNormal" style={{ textAlign: "justify" }}>
                        &nbsp;In no event shall the Protected Entities be liable for, or in connection with, (i) the provision of, or failure to provide, all or any products or service by a Third Party Service Provider to any User; or (ii) any comments or feedback given by any of the Users in relation to the goods or services provided by any Third Party Service Providers; or (ii) any content posted, transmitted, exchanged or received by or on behalf of any User, Third Party Service Providers or other person on or through the Website.
                    </li>
                    <li className="MsoNormal" style={{ textAlign: "justify" }}>
                        &nbsp;<b>TakeHome</b>
                        disclaims any liability in relation to the validity of the medical advice provided by the Medical Experts and the validity and legality of the e-prescription for dispensation of medicines and conduct of diagnostic tests. All liabilities arising out of any wrong diagnosis of medical condition by the Medical Experts and/ or arising from the e-prescription will be of the concerned Medical Expert. Further, all liabilities arising out of any wrong diagnosis report by the Third Party Labs and/ or arising from the wrong dispensation of the Pharmaceutical Goods and Services will be of the concerned Third Party Labs or the Third Party Pharmacies as the case may be.
                    </li>
                    <li className="MsoNormal" style={{ textAlign: "justify" }}>
                        &nbsp;The Users may share their previous medical history during interaction with the Medical Experts. The Users undertake to share such information at their own risk. TakeHome reserves the right to retain such information for the purpose of providing Services to the Users.
                    </li>
                    <li className="MsoNormal" style={{ textAlign: "justify" }}>
                        &nbsp;With respect to the Consultation Services, after selection of the type of treatment viz. Homeopathy, Allopathy or Ayurveda along with the specification of the disease by the patient, TakeHome will decide the Medical Expert to whom the query should be directed based on the information shared by the User. However, in no event the Protected Entities shall be held liable for the losses attributable to such decision making and in no event shall the Protected Entities be liable for any Consultation provided and/or e-prescription issued by the Medical Expert by using the interface of online medical consultancy.
                    </li>
                    <li className="MsoNormal" style={{ textAlign: "justify" }}>
                        &nbsp;The Users acknowledge that the Protected Entities merely act in the capacity of facilitators between the Other Parties by providing a platform for them to interact and transact. In no event shall the Protected Entities be held liable for any of the losses attributable to Services offered through the Website.
                    </li>
                    <li className="MsoNormal" style={{ textAlign: "justify" }}>
                        &nbsp;In no event shall the total aggregate liability of the Protected Entities to any Other Parties for all damages, losses, and causes of action (whether in contract or tort, including, but not limited to negligence, strict liability, product liability or otherwise) arising from these Terms of Use or any Other Parties’ use of the Website exceed an aggregate amount of INR 1000/- (Indian Rupees One Thousand only). <b>TakeHome</b> accepts no liability for any errors or omissions on behalf of the Other Parties.
                    </li>
                    <li className="MsoNormal" style={{ textAlign: "justify" }}>
                        &nbsp;In no event shall the Protected Entities be liable for failure on the part of the Users or Third Party Service Providers to provide agreed services or to make himself/herself available at the appointed time, cancellation or rescheduling of appointments. In no event shall the Protected Entities be liable for any comments or feedback given by any of the Users in relation to the services provided by a Third Party Service Providers.
                    </li>
                    </ol>
                    <li className="MsoNormal" style={{ textAlign: "justify" }}>
                    &nbsp;
                    <b>
                        <u>Indemnity</u>
                    </b>
                    <br />
                    The Covenanters agree to defend, indemnify and hold harmless <b>TakeHome</b>, the Protected Entities, independent contractors, service providers, consultants, licensors, agents, and representatives, and each of their respective directors, officers and employees, from and against any and all claims, losses, liability, damages, and/or costs (including, but not limited to, reasonable attorney fees and costs) arising from or related to (a) Covenanters access to or use of Website; (b) Covenanters violation of these Terms of Use or any applicable law(s); (c) Covenanters violation of any rights of another person/ entity, including infringement of their intellectual property rights; or (d) Covenanters conduct in connection with the Website.
                    </li>
                    <li className="MsoNormal">
                    &nbsp;
                    <b>
                        <u>Modification of Website</u>
                    </b>
                    <br />
                    <br />
                    </li>
                </ol>
                </ol>
                <p className="MsoNormal" style={{ marginLeft: "1.0in", textAlign: "justify" }}>
                TakeHome reserves the right to modify or discontinue, temporarily or permanently, the Website or any features or portions thereof without prior notice. Other Parties agree that TakeHome will not be liable for any modification, suspension or discontinuance of the Website or any other part thereof.
                </p>
                <ol style={{ marginTop: "0in" }} start={4} type={1}>
                <ol style={{ marginTop: "0in" }} start={8} type={1}>
                    <li className="MsoNormal">
                    &nbsp;
                    <b>
                        <u>Intellectual property rights</u>
                    </b>
                    </li>
                </ol>
                </ol>
                <p
                className="MsoNormal"
                style={{
                    marginTop: "0in",
                    marginRight: "0in",
                    marginBottom: "0in",
                    marginLeft: "1.0in",
                }}
                >
                &nbsp;
                </p>
                <p className="MsoNormal" style={{ marginLeft: "1.0in", textAlign: "justify" }}>
                All the intellectual property used on the Website except those which have been identified as the intellectual properties of the Other Parties shall remain the exclusive property of the Company. The Other Parties agree not to circumvent, disable or otherwise interfere with security related features of the Website or features that prevent or restrict use or copying of any materials or enforce limitations on use of the Website or the materials therein. The materials on the Website or otherwise may not be modified, copied, reproduced, distributed, republished, downloaded, displayed, sold, compiled, posted or transmitted in any form or by any means, including but not limited to, electronic, mechanical, photocopying, recording or other means.
                </p>
                <ol style={{ marginTop: "0in" }} start={4} type={1}>
                <ol style={{ marginTop: "0in" }} start={9} type={1}>
                    <li className="MsoNormal" style={{ textAlign: "justify" }}>
                    &nbsp;
                    <b>
                        <u>Compliance of Applicable Law</u>
                    </b>
                    </li>
                    <ol style={{ marginTop: "0in" }} start={1} type={1}>
                    <li className="MsoNormal" style={{ textAlign: "justify" }}>
                        &nbsp;While communicating/ transacting with each other through the Website, the Other Parties shall at all times ensure full compliance with the applicable provisions of the Contract Act, IT Act, IG Guidelines, Drugs Act read with the Drug Rules, Drugs and Magic Act, The Indian Medical Council Act, 1956 read with the Indian Medical Council Rules, 1957, Pharmacy Act, Consumer Protection Act, 1986, SPI Rules, etc (“Captioned Laws”). as well as all other laws for the time being in force, and ensure due payment of applicable taxes. They must specifically ensure that they are in no way purchasing Pharmaceutical Good and Services or Prescription Drugs without a valid prescription, which are prohibited under the Drugs Act (read with the Drugs Rules) as well as the other applicable laws for the time being in force.
                    </li>
                    <li className="MsoNormal" style={{ textAlign: "justify" }}>
                        &nbsp;The Users must also ensure that the prescription uploaded on the Website or emailed to TakeHome for processing the order for Prescription Drugs is a valid prescription duly obtained from a registered medical practitioner. The Users acknowledge and accept that they shall bear all costs/ liability/ damages, caused to the Third Party Service Providers or to TakeHome, as a result of any dispensation of Prescription Drugs by the Third Party Service Providers owing to the non-compliance by the User in this regard.
                    </li>
                    </ol>
                    <li className="MsoNormal" style={{ textAlign: "justify" }}>
                    &nbsp;Termination (Parties for the Purpose of these Terms of Use shall collectively mean the Other Parties and TakeHome)
                    </li>
                    <ol style={{ marginTop: "0in" }} start={1} type={1}>
                    <li className="MsoNormal" style={{ textAlign: "justify" }}>
                        &nbsp;The provisions of these Terms of Use shall continue to apply until terminated by either of the Party as set for below:
                    </li>
                    <ol style={{ marginTop: "0in" }} start={1} type={1}>
                        <li className="MsoNormal" style={{ textAlign: "justify" }}>
                        &nbsp;In case of Other Parties wanting to terminate these Terms of Use, Other Parties may do so by:
                        </li>
                        <ol style={{ marginTop: "0in" }} start={1} type={1}>
                        <li className="MsoNormal" style={{ textAlign: "justify" }}>
                            not accessing the Website; or
                        </li>
                        <li className="MsoNormal" style={{ textAlign: "justify" }}>
                            &nbsp;closing their accounts for all of the Services that they use.
                        </li>
                        </ol>
                        <li className="MsoNormal" style={{ textAlign: "justify" }}>
                        &nbsp;<b>TakeHome</b>
                        reserves the right to, at any time, and with or without notice, terminate these Terms of Use against each of the Users or the Third Party Service Providers or the Other Parties as a whole, if there is:
                        </li>
                        <ol style={{ marginTop: "0in" }} start={1} type={1}>
                        <li className="MsoNormal" style={{ textAlign: "justify" }}>
                            &nbsp;breach any of applicable law(s), including but not limited to the Captioned Laws or the provisions of these Terms of Use or the terms of the Privacy Policy or any other terms, conditions, or policies that may be applicable to the Other Parties from time to time (or have acted in a manner that clearly shows that Other Party(s) do not intend to, or are unable to, comply with the same); or
                        </li>
                        <li className="MsoNormal" style={{ textAlign: "justify" }}>
                            &nbsp;TakeHome is unable to verify or authenticate any information provided to TakeHome by Other Party(s); or
                        </li>
                        <li className="MsoNormal" style={{ textAlign: "justify" }}>
                            &nbsp;<b>TakeHome</b>
                            believes, in its sole discretion, that Other Party(s) actions may cause legal liability for TakeHome (or any of its affiliates, independent contractors, service providers, consultants, licensors, agents, and representatives) or are contrary to the interests of the Website; or
                        </li>
                        <li className="MsoNormal" style={{ textAlign: "justify" }}>
                            &nbsp;<b>TakeHome</b> is required to do so by law; or
                        </li>
                        <li className="MsoNormal" style={{ textAlign: "justify" }}>
                            &nbsp;if Other Party(s) fail to provide (or after providing such consent, later revoke) the consents necessary or desirable for TakeHome to provide the Services to the Other Party(s); or
                        </li>
                        <li className="MsoNormal" style={{ textAlign: "justify" }}>
                            &nbsp;The provision of the Services to the Other Party(s), or to the general public, is in <b>TakeHome’s</b>
                            opinion, no longer commercially viable; or
                        </li>
                        <li className="MsoNormal" style={{ textAlign: "justify" }}>
                            &nbsp;TakeHome has elected to discontinue, with or without reason, access to the Website or the Services (or any part thereof).
                        </li>
                        </ol>
                        <li className="MsoNormal" style={{ textAlign: "justify" }}>
                        &nbsp;<b>TakeHome</b> may also terminate or suspend (temporarily or permanently) all or a portion of Other Party(s) account or access to the Services, with or without reason. Except as may be set forth in any of the terms applicable to a particular Service, termination of Other Party(s) account may include: (i) removal of access to all offerings within the Website or with respect to the Services; and (ii) barring Other Party(s) from further use or access of the Website or of any of the Services.
                        </li>
                        <li className="MsoNormal" style={{ textAlign: "justify" }}>
                        &nbsp;Once terminated or suspended (temporarily or permanently), Other Party(s) may not continue to use the Website under the same account, a different account or re-register under a new account.
                        </li>
                        <li className="MsoNormal" style={{ textAlign: "justify" }}>
                        &nbsp;Upon termination of these Terms of Use, TakeHome shall have no obligation to maintain or provide any of Other Party(s) data and may thereafter, unless legally prohibited, delete all of Other Party(s) data in its systems or otherwise in its possession or under its control, including but not limited to Other Party(s) personal information, log-in ID and password, order details (including any prescriptions uploaded) and all related information, files and materials associated with or inside Other Party(s) account (or any part thereof).
                        </li>
                        <li className="MsoNormal" style={{ textAlign: "justify" }}>
                        &nbsp;<b>TakeHome</b>
                        reserves the right, at its sole discretion, to pursue all of its legal remedies, including but not limited to deletion of the Other Party(s) content from the Website with or without ability to access the Website and the other Services, upon any breach by the Other Party(s) of these Terms of Use or if TakeHome is unable to verify or authenticate any information the Other Party(s) submits to TakeHome, or if the Other Party(s) fail to provide (or after providing such consent, later revokes) the consents necessary or desirable for TakeHome to provide the Services to the Other Party(s).
                        </li>
                        <li className="MsoNormal" style={{ textAlign: "justify" }}>
                        &nbsp;The right to terminate/ suspend the account is in addition to, and without prejudice to, <b>TakeHome’s</b> right to initiate action against the Other Party(s), in accordance with applicable law.
                        </li>
                    </ol>
                    </ol>
                    <li className="MsoNormal" style={{ marginBottom: "0in" }}>
                    &nbsp;
                    <b>
                        <u>Force Majeure</u>
                    </b>
                    </li>
                </ol>
                </ol>
                <p
                className="MsoNormal"
                style={{
                    marginTop: "0in",
                    marginRight: "0in",
                    marginBottom: "0in",
                    marginLeft: "1.0in",
                }}
                >
                &nbsp;
                </p>
                <p
                className="MsoNormal"
                style={{
                    marginTop: "0in",
                    marginRight: "0in",
                    marginBottom: "0in",
                    marginLeft: "1.0in",
                    textAlign: "justify",
                }}
                >
                Other Parties accept and acknowledge that TakeHome shall not be liable for any loss or damage caused to the User as a result of delay or default or deficiency or failure in the Services as a result of any natural disasters, fire, riots, civil disturbances, actions or decrees of governmental bodies, communication line failures (which are not caused due to the fault of <b>TakeHome</b> or the Third Party Service Providers), or any other delay or default or deficiency or failure which arises from causes beyond
                <b>TakeHome’s</b> reasonable control (<b>“Force Majeure Event”</b>). In the event of any Force Majeure Event arising, TakeHome, depending on whose performance has been impacted under the Terms of Use, shall immediately give notice to the Other Party(s) of the facts which constitute the Force Majeure Event. Further, delivery time periods specified on Website shall always be nonbinding under all circumstances as delivery is dependent on multiple factors that can assume uncertainty at any moment for unforeseen reasons beyond Company’s control.
                </p>
                <ol style={{ marginTop: "0in" }} start={4} type={1}>
                <ol style={{ marginTop: "0in" }} start={12} type={1}>
                    <li className="MsoNormal">
                    &nbsp;
                    <b>
                        <u>Governing Law and Dispute Resolution</u>
                    </b>
                    <br />
                    <br />
                    </li>
                </ol>
                </ol>
                <p className="MsoNormal" style={{ marginLeft: "1.0in", textAlign: "justify" }}>
                These Terms of Use and any contractual obligation between the Parties will be governed by the laws of India, without reference to the conflict of laws principles. Any legal action or proceeding related to Other Party(s) access to, or use of, the Website or these Terms of Use shall be subject to the exclusive jurisdiction of the courts at New Delhi. All disputes will be subject to arbitration at New Delhi in English by a sole arbitrator appointed by TakeHome under the Arbitration and Conciliation Act, 1996.
                </p>
                <ol style={{ marginTop: "0in" }} start={4} type={1}>
                <ol style={{ marginTop: "0in" }} start={13} type={1}>
                    <li className="MsoNormal">
                    &nbsp;
                    <b>
                        <u>Survival</u>
                    </b>
                    <br />
                    <br />
                    </li>
                </ol>
                </ol>
                <p className="MsoNormal" style={{ marginLeft: "1.0in", textAlign: "justify" }}>
                Even after termination, certain obligations mentioned under Covenants, Liability, Indemnity, Intellectual Property, Dispute Resolution will continue and survive termination.
                </p>
                <ol style={{ marginTop: "0in" }} start={4} type={1}>
                <ol style={{ marginTop: "0in" }} start={14} type={1}>
                    <li className="MsoNormal">
                    &nbsp;
                    <b>
                        <u>Severability</u>
                        <br />
                        <br />
                    </b>
                    </li>
                </ol>
                </ol>
                <p className="MsoNormal" style={{ marginLeft: "1.0in", textAlign: "justify" }}>
                If any provision of these Terms of Use is deemed invalid, unlawful, void or for any other reason unenforceable, then that provision shall be deemed severable from these Terms of Use and shall not affect the validity and enforceability of any of the remaining provisions.
                </p>
                <ol style={{ marginTop: "0in" }} start={4} type={1}>
                <ol style={{ marginTop: "0in" }} start={15} type={1}>
                    <li className="MsoNormal">
                    &nbsp;
                    <b>
                        <u>Waiver</u>
                    </b>
                    <br />
                    <br />
                    </li>
                </ol>
                </ol>
                <p className="MsoNormal" style={{ marginLeft: "1.0in", textAlign: "justify" }}>
                No provision of these Terms of Use shall be deemed to be waived and no breach excused, unless such waiver or consent shall be in writing and signed by TakeHome. Any consent by TakeHome to, or a waiver by TakeHome of any breach by Other Parties, whether expressed or implied, shall not constitute consent to, waiver of, or excuse for any other different or subsequent breach.
                </p>
                <ol style={{ marginTop: "0in" }} start={4} type={1}>
                <ol style={{ marginTop: "0in" }} start={16} type={1}>
                    <li className="MsoNormal">
                    &nbsp;
                    <b>
                        <u>Headings</u>
                        <br />
                        <br />
                    </b>
                    </li>
                </ol>
                </ol>
                <p className="MsoNormal" style={{ marginLeft: "1.0in", textAlign: "justify" }}>
                The headings and subheadings herein are included for convenience and identification only and are not intended to describe, interpret, define or limit the scope, extent or intent of these Terms of Use.
                </p>
                <ol style={{ marginTop: "0in" }} start={4} type={1}>
                <ol style={{ marginTop: "0in" }} start={17} type={1}>
                    <li className="MsoNormal">
                    <b>
                        &nbsp;<u>Contact Information</u>
                    </b>
                    <br />
                    <br />
                    </li>
                </ol>
                </ol>
                <p className="MsoNormal" style={{ marginLeft: "1.0in", textAlign: "justify" }}>
                If any Other Party(s) has any grievance, comment, question or suggestion regarding any of our Services, please contact our customer service at ask@takehome.live. If any Other Party(s) has any questions concerning TakeHome, the Website, these Terms of Use, or anything related to any of the foregoing, TakeHome can be reached at the following email address -&nbsp;ask@takehome.live&nbsp;or via the contact information available from the following: Contact Us. Please also refer to our grievance redressal policy available at ask@takehome.live{" "}
                </p>
                <ol style={{ marginTop: "0in" }} start={4} type={1}>
                <ol style={{ marginTop: "0in" }} start={18} type={1}>
                    <li className="MsoNormal">
                    &nbsp;
                    <b>
                        <u>Account Deletion</u>
                        <br />
                        <br />
                    </b>
                    </li>
                </ol>
                </ol>
                <p className="MsoNormal" style={{ marginLeft: "1.0in", textAlign: "justify" }}>
                Deleting an account is a permanent action and cannot be reversed. In case you want to use <b className="me-2">TakeHome</b> 
                 again, you will need to create a new account which will have no previous order history. In order to delete your account, please download the app and follow these steps: Go to Need Help -&gt; Profile -&gt; How do I delete my account -&gt; Account deletion.
                </p>
            </div>
        </div>
        )
    } else {
        return (<div className="container"><h1>Coming soon..</h1></div>);
    }
}

const mapStateToTermsCondition = (state) => {
    return { compCode: state.compCode };
}
  
export default connect(mapStateToTermsCondition, {breadCrumbAction})(TermsCondition)