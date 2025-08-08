import { breadCrumbAction } from "../../../../actions";
import { useEffect } from "react";
import { connect } from "react-redux";
import { HashLink } from "react-router-hash-link";
import { scrollWithOffset } from "../utilities";
import { ePharmaId, TAKE_HOME_ID, takehomeMain, XYZ_ID } from "../../../../constants";
import { Link } from "react-router-dom";

const ReturnPolicy = ({ breadCrumbAction, compCode }) => {

    useEffect(() => {
		breadCrumbAction({links: [{name: 'Home', link: '/'}, {name: 'Return Policy', link: '/returnPolicy'}], activeLink: '/returnPolicy'});
    },[breadCrumbAction])  

    if (compCode === XYZ_ID || compCode === ePharmaId) {
        return (
            <section id="return-policy" className='terms-conditions-styles'>
                <div className="container">
                    <div>
                        <div id="return-policy" className="content" style={{background: 'white'}}>
                        <div className="last-updated mb-20">
                            <span>last updated May 2023</span>
                        </div>
                        <div className="">
                            <h1 className="heading">E-Pharma Return &amp; Refund Policy</h1>
                            <p className="sub-heading">
                            E-Pharma RETURN POLICY, REFUND, CANCELLATION AND SHIPPING CHARGES POLICY
                            <br />
                            <br /> E-Pharma Healthcare Solutions Private Limited (“E-Pharma”) team
                            facilitates processing correct medicines as per order and prescription
                            and strives to service the medicines and products in right conditions/
                            without any damage every time a consumer places an order. We also
                            strongly recommend the items are checked at the time of delivery.
                            </p>
                            <h3 className="table-content">Table of Content</h3>
                            <ul className="main-contents" style={{paddingLeft: '2rem'}}>
                            <li>
                                <HashLink to="#DEFINITION" scroll={el => scrollWithOffset(el, 120)}>
                                <span>DEFINITION</span>
                                </HashLink>
                            </li>
                            <li>
                                <HashLink to="#RETURNPROCESS" scroll={el => scrollWithOffset(el, 120)}>
                                <span>RETURN PROCESS</span>
                                </HashLink>
                            </li>
                            <li>
                                <HashLink to="#MEDICALTEST" scroll={el => scrollWithOffset(el, 120)}>
                                <span>MEDICAL TEST</span>
                                </HashLink>
                            </li>
                            <li>
                                <HashLink to="#REFUNDPROCESS" scroll={el => scrollWithOffset(el, 120)}>
                                <span>REFUND PROCESS</span>
                                </HashLink>
                            </li>
                            <li>
                                <HashLink to="#ONLINECONSULTATION" scroll={el => scrollWithOffset(el, 120)}>
                                <span>ONLINE CONSULTATION</span>
                                </HashLink>
                            </li>
                            <li>
                                <HashLink to="#SHIPPINGCHARGES" scroll={el => scrollWithOffset(el, 120)}>
                                <span>SHIPPING CHARGES</span>
                                </HashLink>
                            </li>
                            <li>
                                <HashLink to="#SHIPPINGCHARGES" scroll={el => scrollWithOffset(el, 120)}>
                                <span>CANCELLATION POLICY</span>
                                </HashLink>
                            </li>
                            </ul>
                            <ol className="root-list">
                            <li>
                                <div>
                                <div id="DEFINITION" className="cont-details">
                                    <h2>DEFINITION</h2>
                                    'Return' means an action of giving back the product ordered at
                                    E-Pharma portal by the consumer. The following situations may arise
                                    which may cause the action of return of product:
                                    <ol className="sub-norm">
                                    <li> Product(s) delivered do not match your order; </li>
                                    <li>
                                        {" "}
                                        Product(s) delivered are past or near to its expiry date
                                        (medicines with an expiry date of less than 03 months shall
                                        be considered as near expiry);{" "}
                                    </li>
                                    <li>
                                        {" "}
                                        Product(s) delivered were damaged in transit (do not to
                                        accept any product which has a tampered seal):{" "}
                                    </li>
                                    </ol>
                                </div>
                                <div className="sub-heading">
                                    {" "}
                                    Note: If the product that you have received is damaged, then do
                                    not accept the delivery of that product. If after opening the
                                    package you discover that the product is damaged, the same may
                                    be returned for a refund. Please note that we cannot promise a
                                    replacement for all products as it will depend on the
                                    availability of the particular product, in such cases we will
                                    offer a refund.{" "}
                                </div>
                                <div>
                                    {" "}
                                    In the aforesaid unlikely situations, if there is something
                                    wrong with the order, we'd be happy to assist and resolve your
                                    concern. You may raise a Return request with our customer care
                                    within 07 (Seven) days from the delivery of the product. E-Pharma
                                    reserves the right to cancel the Return request, if the customer
                                    reaches out to E-Pharma after 7 days of delivery.{" "}
                                </div>
                                <div>
                                    {" "}
                                    Upon receiving your Return/Refund request, E-Pharma shall verify the
                                    authenticity and the nature of the request. If E-Pharma finds that
                                    the request is genuine, it will initiate the Return and Refund
                                    process. E-Pharma shall process the refund only once it has received
                                    the confirmation from the vendor concerned in respect of the
                                    contents of the product relating to that refund.{" "}
                                </div>
                                <div>
                                    {" "}
                                    In the event of frivolous and unjustified complaints regarding
                                    the quality and content of the products, E-Pharma reserves the right
                                    to pursue necessary legal actions against you and you will be
                                    solely liable for all costs incurred by E-Pharma in this regard.{" "}
                                </div>
                                <h4>The returns are subject to the below conditions:-</h4>
                                <ol>
                                    <li>
                                    {" "}
                                    Any wrong ordering of product doesn’t qualify for Return;{" "}
                                    </li>
                                    <li>
                                    {" "}
                                    Batch number of the product being returned should match as
                                    mentioned on the invoice;{" "}
                                    </li>
                                    <li>
                                    {" "}
                                    Return requests arising due to change in prescription do not
                                    qualify for Return;{" "}
                                    </li>
                                    <li>
                                    {" "}
                                    Product being returned should only be in their original
                                    manufacturer's packaging i.e. with original price tags,
                                    labels, bar-code and invoice; and{" "}
                                    </li>
                                    <li>
                                    {" "}
                                    Partially consumed strips or products do not qualify for
                                    Return, only fully unopened strips or products can be
                                    returned.{" "}
                                    </li>
                                </ol>
                                <p>
                                    {" "}
                                    <u>Category of Non-Returnable Product:</u>
                                    <span>
                                    <span>
                                        Certain categories of products marked as non- returnable on
                                        product page, will not qualify for the Return as per E-Pharma
                                        Return policy. The details of the non- returnable products
                                        are mentioned below:{" "}
                                    </span>
                                    </span>
                                </p>
                                <table>
                                    <thead>
                                    <tr>
                                        <th>Categories</th>
                                        <th>Type of Products</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td>Baby Care</td>
                                        <td>
                                        Bottle Nipples, Breast Nipple Care, Breast Pumps, Diapers,
                                        Ear Syringes, Nappy, Wet Reminder, Wipes and Wipe Warmers
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Food and Nutrition</td>
                                        <td>Health Drinks, Health Supplements</td>
                                    </tr>
                                    <tr>
                                        <td>Healthcare Devices</td>
                                        <td>
                                        Glucometer Lancet/Strip, Healthcare Devices and Kits,
                                        Surgical, Health Monitors
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Sexual Wellness</td>
                                        <td>
                                        Condoms, Fertility Kit/Supplement, Lubricants, Pregnancy
                                        Kits
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Temperature Controlled and Speciality Medicines</td>
                                        <td>
                                        Vials, Injections, Vaccines, Penfills and any other
                                        Product, requiring cold storage, or medicines that fall
                                        under the category of speciality medicines.
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                                </div>
                            </li>
                            <li>
                                <div id="RETURNPROCESS" className="cont-details">
                                <h2>RETURN PROCESS:</h2>
                                <ol>
                                    <li>
                                    For Return intimation, please visit{" "}
                                    <a href="https://www.E-Pharma.com/contactUs" target="_black">
                                        www.E-Pharma.com/contactUs
                                    </a>
                                    .
                                    </li>
                                    <li>
                                    E-Pharma customer care team will verify the claim made by the
                                    customer within 72 (seventy-two) business hours from the time
                                    of receipt of complaint.
                                    </li>
                                    <li>
                                    Once the claim is verified as genuine and reasonable, E-Pharma will
                                    initiate the collection of product(s) to be returned.
                                    </li>
                                    <li>
                                    The customer will be required to pack the product(s) in
                                    original manufacturer’s packaging.{" "}
                                    </li>
                                    <li>
                                    Refund will be completed within 30 (thirty) days from date of
                                    reverse pick up (if required).{" "}
                                    </li>
                                </ol>
                                </div>
                            </li>
                            <li>
                                <div id="MEDICALTEST" className="cont-details">
                                <h2>MEDICAL TEST:</h2>
                                <div>
                                    In case of medical tests, a Refund request may be raised in the
                                    following cases:
                                </div>
                                <ol>
                                    <li>
                                    If the patient has suffered from Haematoma or any prick
                                    related injury;
                                    </li>
                                    <li>
                                    If the report has been challenged and no proper justification
                                    (
                                    <i>
                                        i.e. reasonable clarification provided either by E-Pharma or the
                                        diagnostic centre
                                    </i>
                                    ) has been provided;{" "}
                                    </li>
                                    <li>
                                    If the time limit within which a report has to be provided to
                                    the patient is breached by 72 (seventy-two) hours and no
                                    proper justification (
                                    <i>
                                        i.e reasonable clarification provided either by E-Pharma or the
                                        diagnostic centre
                                    </i>
                                    ) has been provided.
                                    </li>
                                </ol>
                                </div>
                            </li>
                            <li>
                                <div id="REFUNDPROCESS" className="cont-details">
                                <h2>REFUND PROCESS:</h2>
                                <div>
                                    In all the above cases, if the claim is found to be valid,
                                    Refund will be made as mentioned below:
                                </div>
                                <ol>
                                    <li>
                                    Order placed through online wallet will be credited to the
                                    wallet; and
                                    </li>
                                    <li>
                                    Order placed through cash on delivery will be refunded through
                                    fund transfer to customer bank account.
                                    </li>
                                </ol>
                                </div>
                            </li>
                            <li>
                                <div id="ONLINECONSULTATION" className="cont-details">
                                <h2>ONLINE CONSULTATION:</h2>
                                <p>
                                    {" "}
                                    In case of online consultation, a customer will be eligible to
                                    raise a request for Refund only in case the consultation query
                                    is not replied within specified timeline.{" "}
                                </p>
                                <p>
                                    {" "}
                                    The customer is required to raise the Refund request with E-Pharma
                                    customer care within 72 (seventy-two) hours from the time of
                                    submission of query or receiving of response. The request for
                                    the Refund will be validated by E-Pharma customer care team.{" "}
                                </p>
                                <p>
                                    {" "}
                                    In case of valid Refund, the same will be done by crediting the
                                    bank account of the customer. Refund process shall be completed
                                    within 30 (thirty) days from the date of submission of the
                                    request for Refund.{" "}
                                </p>
                                </div>
                            </li>
                            <li>
                                <div id="SHIPPINGCHARGES" className="cont-details">
                                <h2>SHIPPING CHARGES</h2>
                                <p>
                                    {" "}
                                    Estimated shipping charges are calculated as per the value of
                                    the order and can be viewed in the cart section at the time of
                                    checkout. For any further shipping related information, please
                                    write to <a href="mailto:care@E-Pharma.com">care@E-Pharma.com​.</a>{" "}
                                </p>
                                <p>
                                    {" "}
                                    For any further Refund related information, please write to{" "}
                                    <a href="mailto:care@E-Pharma.com">care@E-Pharma.com​.</a>{" "}
                                </p>
                                </div>
                            </li>
                            <li>
                                <div id="CANCELLATIONPOLICY" className="cont-details">
                                <h2>CANCELLATION POLICY</h2>
                                <p>
                                    {" "}
                                    <b>Customer cancellation:</b>{" "}
                                </p>
                                <p>
                                    {" "}
                                    The customer can cancel the order for the product till E-Pharma ship
                                    it. Orders once shipped cannot be cancelled.{" "}
                                </p>
                                <p>
                                    {" "}
                                    The customer can cancel the order for medical test till the
                                    collection of sample.{" "}
                                </p>
                                <p>
                                    {" "}
                                    <b>E-Pharma cancellation:</b>{" "}
                                </p>
                                <p>
                                    {" "}
                                    There may be certain orders that E-Pharma partners are unable to
                                    accept and service and these may need to be cancelled. Some
                                    situations that may result in your order being cancelled
                                    include, non-availability of the product or quantities ordered
                                    by you or inaccuracies or errors in pricing information
                                    specified by our partners.{" "}
                                </p>
                                <p>
                                    {" "}
                                    E-Pharma also reserves the right to cancel any orders that classify
                                    as ‘Bulk Order’ as determined by E-Pharma as per certain criteria. An
                                    order can be classified as ‘Bulk Order’ if it meets with the
                                    below mentioned criteria, which may not be exhaustive, viz:{" "}
                                </p>
                                <p>
                                    {" "}
                                    i. Products ordered are not for self-consumption but for
                                    commercial resale;{" "}
                                </p>
                                <p>
                                    {" "}
                                    ii. Multiple orders placed for same product at the same address;{" "}
                                </p>
                                <p> iii. Bulk quantity of the same product ordered; </p>
                                <p> iv. Invalid address given in order details; </p>
                                <p> v. Any malpractice used to place the order. </p>
                                <p>
                                    No cancellation charges shall be levied for cancellation of an
                                    order in accordance with the terms of this policy.
                                </p>
                                </div>
                            </li>
                            </ol>
                        </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    } else if (compCode === TAKE_HOME_ID) {
        return (
            <div className="container !py-6">
                <style>{`
                    p.MsoNormal, li.MsoNormal, div.MsoNormal{
                        margin-top:0in;
                        margin-right:0in;
                        margin-bottom:8.0pt;
                        margin-left:0in;
                        line-height:115%;
                        font-size:12.0pt;
                        font-family:"Calibri",sans-serif;
                    }
                    a:link, span.MsoHyperlink {
                        color:#0563C1;
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
                        <b>Return &amp; Refund Policy</b>
                    </p>
                    <p className="MsoNormal" style={{ textAlign: "justify" }}>
                        <b>
                        <span style={{ color: "#4472C4" }}>
                            RETURN POLICY, REFUND, CANCELLATION AND SHIPPING CHARGES POLICY
                            <br />
                        </span>
                        </b>
                        <span style={{ color: "#4472C4" }}>
                        <br />
                        </span>
                        <b>TakeHome Agro Private Limited</b> (“TakeHome”) team facilitates
                        processing correct medicines as per order and prescription and strives to
                        service the medicines and products in right conditions/ without any damage
                        every time a consumer places an order. We also strongly recommend the items
                        are checked at the time of delivery.
                    </p>
                    <p className="MsoNormal">&nbsp;</p>
                    <ol style={{ marginTop: "0in" }} start={1} type={1}>
                        <li className="MsoNormal">DEFINITION</li>
                    </ol>
                    <p className="MsoNormal">
                        <b>
                        'Return' means an action of giving back the product ordered at{" "}
                        <span style={{ color: "#4472C4" }}>pharma.takehome.live </span>portal by
                        the consumer. The following situations may arise which may cause the
                        action of return of product:
                        </b>
                    </p>
                    <ol style={{ marginTop: "0in" }} start={1} type={1}>
                        <ol style={{ marginTop: "0in" }} start={1} type={1}>
                        <li className="MsoNormal">
                            Product(s) delivered do not match your order;
                        </li>
                        <li className="MsoNormal">
                            Product(s) delivered are past or near to its expiry date (medicines with
                            an expiry date of less than 01 months shall be considered as near
                            expiry);
                        </li>
                        <li className="MsoNormal">
                            Product(s) delivered were damaged in transit (do not to accept any
                            product which has a tampered seal):
                        </li>
                        </ol>
                    </ol>
                    <p className="MsoNormal" style={{ textAlign: "justify" }}>
                        <b>
                        <i>
                            Note: If the product that you have received is damaged, then do not
                            accept the delivery of that product. If after opening the package you
                            discover that the product is damaged, the same may be returned for a
                            refund. Please note that we cannot promise a replacement for all
                            products as it will depend on the availability of the particular
                            product, in such cases we will offer a refund.
                        </i>
                        </b>
                    </p>
                    <p className="MsoNormal" style={{ textAlign: "justify" }}>
                        <b>
                        In the aforesaid unlikely situations, if there is something wrong with the
                        order, we'd be happy to assist and resolve your concern. You may raise a
                        Return request with our customer care within 07 (Seven) days from the
                        delivery of the product. <i>TakeHome</i>
                        reserves the right to cancel the Return request, if the customer reaches
                        out to
                        <i>TakeHome</i> after 7 days of delivery.
                        </b>
                    </p>
                    <p className="MsoNormal" style={{ textAlign: "justify" }}>
                        <b>
                        Upon receiving your Return/Refund request, <i>TakeHome</i> shall verify
                        the authenticity and the nature of the request. If <i>TakeHome</i> finds
                        that the request is genuine, it will initiate the Return and Refund
                        process. <i>TakeHome</i> shall process the refund only once it has
                        received the confirmation from the vendor concerned in respect of the
                        contents of the product relating to that refund.
                        </b>
                    </p>
                    <p className="MsoNormal" style={{ textAlign: "justify" }}>
                        <b>
                        In the event of frivolous and unjustified complaints regarding the quality
                        and content of the products, TakeHome reserves the right to pursue
                        necessary legal actions against you and you will be solely liable for all
                        costs incurred by <i>TakeHome</i> in this regard.
                        </b>
                    </p>
                    <p className="MsoNormal">The returns are subject to the below Conditions:-</p>
                    <ol style={{ marginTop: "0in" }} start={1} type={1}>
                        <ol style={{ marginTop: "0in" }} start={4} type={1}>
                        <li className="MsoNormal">
                            <b>Any wrong ordering of product doesn’t qualify for Return;</b>
                        </li>
                        <li className="MsoNormal">
                            <b>
                            Batch number of the product being returned should match as mentioned
                            on the invoice;
                            </b>
                        </li>
                        <li className="MsoNormal">
                            <b>
                            Return requests arising due to change in prescription do not qualify
                            for Return;
                            </b>
                        </li>
                        <li className="MsoNormal">
                            <b>
                            Product being returned should only be in their original manufacturer's
                            packaging i.e. with original price tags, labels, bar-code and invoice;
                            and
                            </b>
                        </li>
                        <li className="MsoNormal">
                            <b>
                            Partially consumed strips or products do not qualify for Return, only
                            fully unopened strips or products can be returned.
                            </b>
                        </li>
                        </ol>
                    </ol>
                    <p className="MsoNormal">
                        <b>&nbsp;</b>
                    </p>
                    <p className="MsoNormal" style={{ textAlign: "justify" }}>
                        <b>
                        <u>Category of Non-Returnable Product:</u>Certain categories of products
                        marked as Non- Returnable on product page, will not qualify for the Return
                        as per <i>TakeHome</i> Return policy. The details of the non- returnable
                        products are mentioned below:
                        </b>
                    </p>
                    <p className="MsoNormal">
                        <b>&nbsp;</b>
                    </p>
                    <p className="MsoNormal">
                        <b>Categories&nbsp;&nbsp;&nbsp; --------------- Type of Products</b>
                    </p>
                    <p className="MsoNormal">
                        <b>
                        <i>
                            <span style={{ color: "red" }}>
                            Baby Care&nbsp;&nbsp; -----------------
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Bottle Nipples, Breast
                            Nipple Care, Breast Pumps, Diapers,{" "}
                            </span>
                        </i>
                        </b>
                    </p>
                    <p className="MsoNormal">
                        <b>
                        <i>
                            <span style={{ color: "red" }}>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Ear Syringes, Nappy,
                            Wet Reminder, Wipes and Wipe Warmers
                            </span>
                        </i>
                        </b>
                    </p>
                    <p className="MsoNormal">
                        <b>
                        <i>
                            <span style={{ color: "red" }}>
                            Food and Nutrition ------------ Health Drinks, Health Supplements
                            </span>
                        </i>
                        </b>
                    </p>
                    <p className="MsoNormal">
                        <b>
                        <i>
                            <span style={{ color: "red" }}>
                            Healthcare Devices --------- Glucometer Lancet/Strip, Healthcare
                            Devices and Kits, Surgical,{" "}
                            </span>
                        </i>
                        </b>
                    </p>
                    <p className="MsoNormal">
                        <b>
                        <i>
                            <span style={{ color: "red" }}>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            Health Monitors
                            </span>
                        </i>
                        </b>
                    </p>
                    <p className="MsoNormal">
                        <b>
                        <i>
                            <span style={{ color: "red" }}>
                            Sexual Wellness --------------- Condoms, Fertility Kit/Supplement,
                            Lubricants, Pregnancy Kits
                            </span>
                        </i>
                        </b>
                    </p>
                    <p className="MsoNormal">
                        <b>
                        <i>
                            <span style={{ color: "red" }}>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Temperature
                            Controlled and{" "}
                            </span>
                        </i>
                        </b>
                    </p>
                    <p className="MsoNormal">
                        <b>
                        <i>
                            <span style={{ color: "red" }}>
                            Speciality Medicines&nbsp;&nbsp;&nbsp; ------------- Vials,
                            Injections, Vaccines, Penfills and any other Product,{" "}
                            </span>
                        </i>
                        </b>
                    </p>
                    <p className="MsoNormal">
                        <b>
                        <i>
                            <span style={{ color: "red" }}>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            requiring cold storage, or medicines that fall under the{" "}
                            </span>
                        </i>
                        </b>
                    </p>
                    <p className="MsoNormal">
                        <b>
                        <i>
                            <span style={{ color: "red" }}>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            category of speciality medicines.
                            </span>
                        </i>
                        </b>
                    </p>
                    <p className="MsoNormal">
                        <b>
                        <i>
                            <span style={{ color: "red" }}>&nbsp;</span>
                        </i>
                        </b>
                    </p>
                    <p className="MsoNormal">
                        <b>
                        <i>
                            <span style={{ color: "red" }}>&nbsp;</span>
                        </i>
                        </b>
                    </p>
                    <ol style={{ marginTop: "0in" }} start={2} type={1}>
                        <li className="MsoNormal">RETURN PROCESS:</li>
                        <ol style={{ marginTop: "0in" }} start={1} type={1}>
                        <li className="MsoNormal">
                            <b>For Return intimation, please visit&nbsp;</b>
                            <a href="http://www.takehome.live/contactUs">
                            <b>www.takehome.live/contactUs</b>
                            </a>
                            <b>.</b>
                        </li>
                        <li className="MsoNormal">
                            <b>
                            <i>TakeHome</i> customer care team will verify the claim made by the
                            customer within 72 (seventy-two) business hours from the time of
                            receipt of complaint.
                            </b>
                        </li>
                        <li className="MsoNormal">
                            <b>
                            Once the claim is verified as genuine and reasonable, <i>TakeHome</i>
                            will initiate the collection of product(s) to be returned.
                            </b>
                        </li>
                        <li className="MsoNormal">
                            <b>
                            The customer will be required to pack the product(s) in original
                            manufacturer’s packaging.
                            </b>
                        </li>
                        <li className="MsoNormal">
                            <b>
                            Refund will be completed within 30 (thirty) days from date of reverse
                            pick up (if required).
                            </b>
                        </li>
                        </ol>
                        <li className="MsoNormal">MEDICAL TEST:</li>
                    </ol>
                    <p className="MsoNormal">
                        <b>
                        In case of medical tests, a Refund request may be raised in the following
                        cases:
                        </b>
                    </p>
                    <ol style={{ marginTop: "0in" }} start={3} type={1}>
                        <ol style={{ marginTop: "0in" }} start={1} type={1}>
                        <li className="MsoNormal">
                            <b>
                            If the report has been challenged and no proper justification (
                            <i>
                                i.e. reasonable clarification provided either by TakeHome or the
                                diagnostic centre
                            </i>
                            ) has been provided;
                            </b>
                        </li>
                        <li className="MsoNormal">
                            <b>
                            If the time limit within which a report has to be provided to the
                            patient is breached by 72 (seventy-two) hours and no proper
                            justification (
                            <i>
                                i.e reasonable clarification provided either by TakeHome or the
                                diagnostic centre
                            </i>
                            ) has been provided.
                            </b>
                        </li>
                        </ol>
                    </ol>
                    <p className="MsoNormal">
                        <b>
                        Note: We will provide free consultation and free delivery of medicine if
                        the patient has suffered from Haematoma or any prick related injury.
                        </b>
                    </p>
                    <ol style={{ marginTop: "0in" }} start={4} type={1}>
                        <li className="MsoNormal">REFUND PROCESS:</li>
                    </ol>
                    <p className="MsoNormal">
                        <b>
                        In all the above cases, if the claim is found to be valid, Refund will be
                        made as mentioned below:
                        </b>
                    </p>
                    <ol style={{ marginTop: "0in" }} start={4} type={1}>
                        <ol style={{ marginTop: "0in" }} start={1} type={1}>
                        <li className="MsoNormal">
                            <b>
                            Order placed through online wallet will be credited to the wallet; and
                            </b>
                        </li>
                        <li className="MsoNormal">
                            <b>
                            Order placed through cash on delivery will be refunded through fund
                            transfer to customer bank account.
                            </b>
                        </li>
                        </ol>
                        <li className="MsoNormal">ONLINE CONSULTATION:</li>
                    </ol>
                    <p className="MsoNormal" style={{ textAlign: "justify" }}>
                        <b>
                        In case of online consultation, a customer will be eligible to raise a
                        request for Refund only in case the consultation query is not replied
                        within specified timeline.
                        </b>
                    </p>
                    <p className="MsoNormal" style={{ textAlign: "justify" }}>
                        <b>
                        The customer is required to raise the Refund request with TakeHome
                        customer care within 72 (seventy-two) hours from the time of submission of
                        query or receiving of response. The request for the Refund will be
                        validated by TakeHome customer care team.
                        </b>
                    </p>
                    <p className="MsoNormal">
                        <b>
                        In case of valid Refund, the same will be done by crediting the bank
                        account of the customer. Refund process shall be completed within 30
                        (thirty) days from the date of submission of the request for Refund.
                        </b>
                    </p>
                    <ol style={{ marginTop: "0in" }} start={6} type={1}>
                        <li className="MsoNormal">SHIPPING CHARGES</li>
                    </ol>
                    <p className="MsoNormal">
                        <b>
                        Estimated shipping charges are calculated as per the value of the order
                        and can be viewed in the cart section at the time of checkout. For any
                        further shipping related information, please write to&nbsp;
                        </b>
                        <a href="mailto:caremed@takehome.live">
                        <b>caremed@takehome.live</b>
                        </a>
                        .
                    </p>
                    <p className="MsoNormal">
                        <b>For any further Refund related information, please write to&nbsp;</b>
                        <a href="mailto:care@1mg.com">
                        <b>caremed@takehome.live</b>
                        </a>
                        .
                    </p>
                    <ol style={{ marginTop: "0in" }} start={7} type={1}>
                        <li className="MsoNormal">CANCELLATION POLICY</li>
                    </ol>
                    <p className="MsoNormal">
                        <b>Customer cancellation:</b>
                    </p>
                    <p className="MsoNormal">
                        <b>
                        The customer can cancel the order for the product till TakeHome ship it.
                        Orders once shipped cannot be cancelled.
                        </b>
                    </p>
                    <p className="MsoNormal">
                        <b>
                        The customer can cancel the order for medical test till the collection of
                        sample.
                        </b>
                    </p>
                    <p className="MsoNormal">
                        <b>TakeHome cancellation:</b>
                    </p>
                    <p className="MsoNormal">
                        <b>
                        There may be certain orders that TakeHome partners are unable to accept
                        and service and these may need to be cancelled. Some situations that may
                        result in your order being cancelled include, non-availability of the
                        product or quantities ordered by you or inaccuracies or errors in pricing
                        information specified by our partners.
                        </b>
                    </p>
                    <p className="MsoNormal">
                        <b>
                        TakeHome also reserves the right to cancel any orders that classify as
                        ‘Bulk Order’ as determined by TakeHome as per certain criteria. An order
                        can be classified as ‘Bulk Order’ if it meets with the below mentioned
                        criteria, which may not be exhaustive, viz:
                        </b>
                    </p>
                    <p className="MsoNormal">
                        <b>
                        i. Products ordered are not for self-consumption but for commercial
                        resale;
                        </b>
                    </p>
                    <p className="MsoNormal">
                        <b>ii. Multiple orders placed for same product at the same address;</b>
                    </p>
                    <p className="MsoNormal">
                        <b>iii. Bulk quantity of the same product ordered;</b>
                    </p>
                    <p className="MsoNormal">
                        <b>iv. Invalid address given in order details;</b>
                    </p>
                    <p className="MsoNormal">
                        <b>v. Any malpractice used to place the order.</b>
                    </p>
                    <p className="MsoNormal">
                        <b>
                        No cancellation charges shall be levied for cancellation of an order in
                        accordance with the terms of this policy.
                        </b>
                    </p>
                    <p className="MsoNormal">&nbsp;</p>
                </div>
            </div>
        )
    } else {
        return (<div className="container"><h1>Coming soon..</h1></div>);
    }
        
}

const mapStateToReturnPolicy = (state) => {
    return { compCode: state.compCode };
}
  
export default connect(mapStateToReturnPolicy, {breadCrumbAction})(ReturnPolicy)