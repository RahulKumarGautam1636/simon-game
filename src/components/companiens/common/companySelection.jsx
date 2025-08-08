import { connect } from "react-redux";
import { compCodeAction, loginStatusAction } from "../../../actions";
import { useHistory } from "react-router-dom";
import { SRC_URL } from "../../../constants";

const CompanySelection = ({ compCodeAction, loginStatusAction }) => {

    const history = useHistory();

    const companies = [
        { COMPNAME: 'Parivar Restaurant', EncCompanyId: '9ub1WEn91tnbx7ChUtuYyw==', LogoUrl: '827.png' },
        { COMPNAME: 'Gbooks ERP', EncCompanyId: 'FFCeIi27FQMTNGpatwiktw==', LogoUrl: '612.png' },
        { COMPNAME: 'E-Pharma', EncCompanyId: 'TcbqtUi5nB%2BX6FL5ySfFyg==', LogoUrl: '599.png' },
        { COMPNAME: 'Bankura Seva Niketan', EncCompanyId: 'Za2mOwLGdnsDt9dWguvATw==', LogoUrl: '852.png' },
        { COMPNAME: 'XYZ Pharmacy', EncCompanyId: 'KHLqDFK8CUUxe1p1EotU3g==', LogoUrl: '852.png' },
        { COMPNAME: 'TakeHome', EncCompanyId: 'yFObpUjTIGhK9%2B4bFmadRg==', LogoUrl: '852.png' },
        { COMPNAME: 'Bless Hospital', EncCompanyId: '4K%2Bip4H91KicEh1TMAw9Rw==', LogoUrl: '636.jpg' }
    ]

    // const handleSelect = (i) => {
    //     compCodeAction(i.EncCompanyId);
    //     history.push(`/?CID=${i.EncCompanyId}`); 
    // }

    return (
        <section className="company-selection">
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5em 2em'}}> 
                {companies.map(i => (
                    <div className="card card-stats mb-0" key={i.EncCompanyId}>
                        <div className="card-header border-0" style={{padding: '0.8em 1em'}}>
                            <div className="card-icon">
                                <img src={`${SRC_URL}/Content/CompanyLogo/${i.LogoUrl}`} style={{maxHeight: '3.4em'}} alt="logo" />
                            </div>
                            <p className="card-category" style={{fontSize: '0.9em'}}>{i.COMPNAME}</p>
                            <h3 className="card-title">{i.COMPNAME}</h3>
                        </div>
                        <a href={`/?CID=${i.EncCompanyId}`} className="card-footer" style={{padding: '0.7em 1em', borderTop: '1px solid #e1e1e1'}}>     {/* onClick={() => handleSelect(i)} */}
                            <div className="stats d-flex justify-content-between align-items-center">
                                {/* <i className="material-icons text-danger">warning</i> */}
                                <i className='bx bxs-right-arrow-circle' style={{fontSize: '1.6em', lineheight: '0', color: '#fd7e14'}}></i>
                                <button className="controlled-btn ms-auto" type="button">VIEW DASHBOARD</button>
                            </div>
                        </a>
                    </div>
                ))}
            </div>
        </section>
    )
}


const mapStateToProps = (state) => {
    return { compInfo: state.compInfo };
}
  
export default connect(mapStateToProps, { compCodeAction, loginStatusAction })(CompanySelection);