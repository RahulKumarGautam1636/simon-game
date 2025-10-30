import { useEffect, useState } from "react";
import { BASE_URL, TAKE_HOME_ID, TAKEHOME_AGRO, TAKEHOME_ELECTRONICS, TAKEHOME_GARMENTS, TAKEHOME_SURGICAL } from "../../../constants";
import { Link } from "react-router-dom";
import { getFrom, MySlider } from "../ePharma/utilities";
import { GridLoader } from "../../utils/utils";
import { compCodeAction, modalAction } from "../../../actions";
import { connect, useDispatch, useSelector } from "react-redux";
import { Search, ShoppingBag, Menu, X } from 'lucide-react';

const TakeHome = ({ modalAction, compCodeAction }) => {

  const [pharmaCategory, setPharmaCategory] = useState({ loading: true, data: { LinkCategoryList: [] }, err: { status: false, msg: '' } });
  const [agroCategory, setAgroCategory] = useState({ loading: true, data: { LinkCategoryList: [] }, err: { status: false, msg: '' } });
  const [garmentsCategory, setGarmentsCategory] = useState({ loading: true, data: { LinkCategoryList: [] }, err: { status: false, msg: '' } });
  const [rentCategory, setRentCategory] = useState({ loading: true, data: { LinkCategoryList: [] }, err: { status: false, msg: '' } });
  const [electronicsCategory, setElectronicsCategory] = useState({ loading: true, data: { LinkCategoryList: [] }, err: { status: false, msg: '' } });
  const [surgicalCategory, setSurgicalCategory] = useState({ loading: true, data: { LinkCategoryList: [] }, err: { status: false, msg: '' } });

  const isLoggedIn = useSelector(i => i.isLoggedIn);

  const openLogin = (subDomain, companyCode) => {
    // compCodeAction(companyCode);
    // modalAction('LOGIN_MODAL', true, { redirect: 'http://localhost:3001/'});
    let token = localStorage.getItem('userLoginData')
    window.location.href = `https://${subDomain}.takehome.live/?slugKey=${token || ''}&scheme=common`
    // window.location.href = `http://localhost:3000/?slugKey=${token || ''}&scheme=common`
  }

  useEffect(() => {
    const getPharmaCategories = async () => {
      const res = await getFrom(`${BASE_URL}/api/Pharma/GetCatSubCat?CID=${TAKE_HOME_ID}&LOCID=1293`, {}, setPharmaCategory);
      if (res) {
        const categories = getCategoryRequiredFieldsOnly(res.data.LinkCategoryList);
        setPharmaCategory({ loading: false, data: { ...res.data, LinkCategoryList: categories }, err: { status: false, msg: '' } }); 
      } else {
        console.log('No data received');
      }
    }
    const getAgroCategories = async () => {
      const res = await getFrom(`${BASE_URL}/api/Pharma/GetCatSubCat?CID=${TAKEHOME_AGRO}&LOCID=1559`, {}, setAgroCategory);
      if (res) {
        const categories = getCategoryRequiredFieldsOnly(res.data.LinkCategoryList);
        setAgroCategory({ loading: false, data: { ...res.data, LinkCategoryList: categories }, err: { status: false, msg: '' } }); 
      } else {
        console.log('No data received');
      }
    }
    const getGarmentsCategories = async () => {
      const res = await getFrom(`${BASE_URL}/api/Pharma/GetCatSubCat?CID=${TAKEHOME_GARMENTS}&LOCID=1598`, {}, setGarmentsCategory);
      if (res) {
      const categories = getCategoryRequiredFieldsOnly(res.data.LinkCategoryList);
        setGarmentsCategory({ loading: false, data: { ...res.data, LinkCategoryList: categories }, err: { status: false, msg: '' } }); 
      } else {
        console.log('No data received');
      }
    }
    const getElectronicsCategories = async () => {
      const res = await getFrom(`${BASE_URL}/api/Pharma/GetCatSubCat?CID=${TAKEHOME_ELECTRONICS}&LOCID=1634`, {}, setGarmentsCategory);
      if (res) {
      const categories = getCategoryRequiredFieldsOnly(res.data.LinkCategoryList);
        setElectronicsCategory({ loading: false, data: { ...res.data, LinkCategoryList: categories }, err: { status: false, msg: '' } }); 
      } else {
        console.log('No data received');
      }
    }
    const getSurgicalCategories = async () => {
      const res = await getFrom(`${BASE_URL}/api/Pharma/GetCatSubCat?CID=${TAKEHOME_SURGICAL}&LOCID=1634`, {}, setSurgicalCategory);
      if (res) {
      const categories = getCategoryRequiredFieldsOnly(res.data.LinkCategoryList);
        setSurgicalCategory({ loading: false, data: { ...res.data, LinkCategoryList: categories }, err: { status: false, msg: '' } }); 
      } else {
        console.log('No data received');
      }
    }
    // setTimeout(() => {
    //   setRentCategory((pre) => ({...pre, loading: false, data: { LinkCategoryList: rentCategories }}))      
    // }, 1500);
    getPharmaCategories();
    getAgroCategories();
    getGarmentsCategories();
    getElectronicsCategories();
    getSurgicalCategories();
  }, [])

  const renderContent = (data, type) => {
    if (data.loading) {
      return <GridLoader classes='h-[130px] min-w-[140px] lg:h-[168px] flex-1 rounded-2xl' containerClass="gap-3 my-2" />
    } else if (data.err.status) {
      return <div className='text-center my-5'><h2 className="text-danger mark">An error occured, please try again later. Error code: <span className='text-dark'>{data.err.msg}</span></h2></div>;
    } else if (data.data.LinkCategoryList.length === 0) {
      return;
    } else {
      let slide = data.data.LinkCategoryList.map(i => (<Card_1 data={i} type={type} key={i.ItemId} />));
      return <MySlider name={'product-slider'} dataList={slide} responsive={responsive} customSettings={{dots: false, variableWidth: false, rtl: (type === 'pharma' || type === 'ea') ? true : false}}/> 
    }
  }


  return (
    <section className="selection-page" style={{ fontSize: "0.9em" }}>
      <TakeHomeHeader isLoggedIn={isLoggedIn} />
      {/* <div className="heading-sec justify-content-center justify-content-lg-around bg-white !pb-[0.4em]">
        <div className="d-none d-lg-block" />
        <div className="text-center">
          <p>Welcome to</p>
          <h2>TakeHome</h2>
          <p className="tagline animate-pulse">Simplifying Your Searches</p>
        </div>
        <a href="https://play.google.com/store/apps/details?id=com.takehome.takehome&hl=en_IN">
          <img src="./assets/img/takehome/landing_page/download.png" className="d-none d-lg-block" style={{ maxWidth: "15em" }} alt="" />
        </a>
      </div> */}

      <div className="content-grid mt-3">

        <div className="d-flex">
          <Link to="#" className="bx-shadow-1 card-item" onClick={() => openLogin('pharma', TAKE_HOME_ID)}>
            <img className="img-fluid" src="assets/img/takehome/landing_page/medicine2.PNG" alt="Pharmacy" />
            <h3>Medicines & Healthcare</h3>
          </Link>
          <div style={{ padding: "0px clamp(0.5em, 1vw, 1.5em)" }} className="overflow-hidden lg:flex-1 text-[0.75em]">
            <div className="cat-slider w-100">
              {renderContent(pharmaCategory, 'pharma')}
            </div>
          </div>
        </div>
        <div className="d-flex">
          <Link to="#" className="d-non d-lg-flex card-item" href="#" onClick={() => openLogin("snh", TAKEHOME_SURGICAL)}>
            <p className="float-label">COMING SOON</p>
            <img className="img-fluid" src="assets/img/takehome/surgical/surgical.jpeg" alt="electornics" />
            <h3>Surgicals</h3>
          </Link>
          <div style={{ padding: "0px clamp(0.5em, 1vw, 1.5em)" }} className="overflow-hidden lg:flex-1 text-[0.75em]">
            <div className="cat-slider w-100">
              {renderContent(surgicalCategory, '')}
            </div>
          </div>
        </div>
        <div className="d-flex">
          <Link to="#" className="d-non d-lg-flex card-item" onClick={() => openLogin('agro', TAKEHOME_AGRO)}>
            <p className="float-label">COMING SOON</p>
            <img className="img-fluid" src="assets/img/takehome/landing_page/grocery2.PNG" alt="Agro" />
            <h3>Agro & Grocery</h3>
          </Link>
          <div style={{ padding: "0px clamp(0.5em, 1vw, 1.5em)" }} className="overflow-hidden lg:flex-1 text-[0.75em]">
            {/* <div className="d-flex justify-content-between align-items-center" style={{ padding: "0.6em 0 1.8em" }}>
              <h4 className="mb-0 text-slate-700" style={{ fontSize: "clamp(1em, 5.6vw, 2.4em)" }}>
                Fresh Agro & Grocery
              </h4>
              <a href="http://agro.takehome.live" className="text-blue-500 mb-0 font-medium text-[1.3em]">
                VIEW ALL
              </a>
            </div> */}
            <div className="cat-slider w-100">
              {renderContent(agroCategory, 'agro')}
            </div>
          </div>
        </div>
        <div className="d-flex">
          <Link to="#" className="d-non d-lg-flex card-item" onClick={() => openLogin("gna", TAKEHOME_GARMENTS)}>
            <p className="float-label">COMING SOON</p>
            <img className="img-fluid" src="assets/img/takehome/landing_page/garments.jpeg" alt="Garments" />
            <h3>Garments & Fashion</h3>
          </Link>
          <div style={{ padding: "0px clamp(0.5em, 1vw, 1.5em)" }} className="overflow-hidden lg:flex-1 text-[0.75em]">
            <div className="cat-slider w-100">
              {renderContent(garmentsCategory, 'gna')}
            </div>
          </div>
        </div>
        <div className="d-flex">
          <Link to="#" className="d-non d-lg-flex card-item" href="#" onClick={() => openLogin("ea", TAKEHOME_ELECTRONICS)}>
            <p className="float-label">COMING SOON</p>
            <img className="img-fluid" src="assets/img/takehome/landing_page/appliance.jpeg" alt="electornics" />
            <h3>Electronic Appliances</h3>
          </Link>
          <div style={{ padding: "0px clamp(0.5em, 1vw, 1.5em)" }} className="overflow-hidden lg:flex-1 text-[0.75em]">
            <div className="cat-slider w-100">
              {renderContent(electronicsCategory, 'ea')}
            </div>
          </div>
        </div>

        {/* <a className="d-non d-lg-flex card-item" onClick={() => openLogin("#" style={{transform: "translateY(")}1.6em) scale(0.95)"}}>
          <p className="float-label">COMING SOON</p>
          <img className="img-fluid" src="assets/img/takehome/landing_page/finance.jpeg" alt="Pharmacy" />
          <h3>Loans & Insurance</h3>
        </a> */}
      </div>
      
      <div className="container d-flex d-lg-none flex-column-reverse flex-lg-row justify-content-center pb-3 items-center" style={{ rowGap: "2em" }}>
        <a href="https://play.google.com/store/apps/details?id=com.takehome.takehome&hl=en_IN">
          <img src="./assets/img/takehome/landing_page/download.png" className="" style={{ maxWidth: "15em", margin: "auto" }} alt="" />
        </a>
      </div>

      <div className="foot-links text-center text-lg-end d-flex justify-content-center flex-wrap align-items-start pb-[3em] mt-8" style={{ gap: "1em 1.4em" }}>
        <Link to="/aboutUs">ABOUT US</Link>
        <Link to="./contactUs">CONTACT US</Link>
        <Link to="/onBoarding">ON BOARDING</Link>
        <Link to="/privacyPolicy">PRIVACY POLICY</Link>
        <Link to="/termsConditions">TERMS & CONDITIONS</Link>
      </div>
    </section>
  );
};

export const mapStateToProps = (state) => {
  return {}
}

export default connect(mapStateToProps, { modalAction, compCodeAction })(TakeHome);

const rentCategories = [
  {Text: 'Property', Value: 1, img: 'properties2.jpg', icon: 'real_estate_agent'},
  {Text: 'Furniture', Value: 2, img: 'furnitures.jpg', icon: 'chair'},
  {Text: 'Vehicle', Value: 3, img: 'vehicles.jpg', icon: 'local_shipping'},
  {Text: 'Electronic Appliance', Value: 4, img: 'kitchen-appliance.jpg', icon: 'media_output'},
] 

const responsive = [
  {
    breakpoint: 1900,
    settings: {
      slidesToShow: 6,
      slidesToScroll: 6,
    }
  },
  {
    breakpoint: 1300,
    settings: {
      slidesToShow: 5,
      slidesToScroll: 5,
    }
  },
  {
    breakpoint: 1100,
    settings: {
      slidesToShow: 4,
      slidesToScroll: 4,
    }
  },
  {
    breakpoint: 480,
    settings: {
      slidesToShow: 2,
      slidesToScroll: 2
    }
  }
]


const getCategoryRequiredFieldsOnly = (list) => {

  return list.map(i => ({ 
    Parent: i.Parent,
    ParentDesc: i.ParentDesc,
    Text: i.ParentDesc,
    Value: String(i.Parent),
    ImageURL: i.ImageURL
  }));
}


const Card_1 = ({ data, type }) => {
    let imgPath = (data.Text).replaceAll(' / ', '-');
    let token = localStorage.getItem('userLoginData')
    return (
        <a onClick={() => alert('test')} href={`https://${type}.takehome.live/?slugKey=${token || ''}&scheme=common#/filters/?head=${data.Text}&catVal=${data.Value}&page=1`} className="cat-card home-card">
            <img className="img-fluid" src={data.ImageURL || `https://agro.takehome.live/assets/img/agro/categories/${imgPath}.png`} alt="medicine"
                onError={({ currentTarget }) => {
                    currentTarget.onerror = null;                               // prevents looping
                    currentTarget.src = '/assets/img/takehome/landing_page/takeHome-no-image.png';
                }}
            />
            <h4>{data.Text}</h4>
        </a>
    )
}

export function TakeHomeHeader({ isLoggedIn }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dispatch = useDispatch()
  const user = useSelector(i => i.userInfo);

  const mainCategories = [ 'Medicines & Healthcare', 'Surgicals', 'Agro & Grocery', 'Garments & Fashion', 'Electronic Appliances' ];

  return (
    <header className="bg-white shadow-sm text-lg">
      <div className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <button className="md:hidden mr-3 p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
              {/* <h1 className="text-2xl font-bold text-pink-600" style={{ fontFamily: 'serif' }}>
                NYKAA
              </h1> */}
              <img id="main-logo" className="img-fluid w-[6.4rem] lg:w-[11.3rem] !left-auto" src={`https://erp.gsterpsoft.com/Content/CompanyLogo/752.jpeg`} alt="Footer Logo" />
            </div>

            {/* Navigation Links - Desktop */}
            {/* <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
              <a href="#" className="text-gray-700 hover:text-pink-600">Medicines & Healthcare</a>
              <a href="#" className="text-gray-700 hover:text-pink-600">Surgicals</a>
              <a href="#" className="text-gray-700 hover:text-pink-600">Agro & Grocery</a>
              <a href="#" className="text-gray-700 hover:text-pink-600">Garments & Fashion</a>
              <a href="#" className="text-gray-700 hover:text-pink-600">Electronic Appliances</a>
            </nav> */}

            {/* Search, Sign In, Cart */}
            <div className="flex items-center space-x-4 text-lg">
              <div className="hidden sm:flex items-center bg-gray-100 rounded-md px-4 py-[0.8rem] w-[53rem]">
                <Search size={18} className="text-gray-500 mr-2" />
                <input
                  type="text"
                  placeholder="Search on TakeHome.."
                  className="bg-transparent outline-none text-sm w-full"
                />
              </div>
            </div>
            <div className="flex gap-4">
              <a href="https://play.google.com/store/apps/details?id=com.takehome.takehome&hl=en_IN">
                <img src="./assets/img/takehome/landing_page/download.png" className="d-none d-lg-block" style={{ maxHeight: "3em" }} alt="" />
              </a>
              {isLoggedIn ? <ProfileCard user={user} /> : 
                <button onClick={() => dispatch(modalAction('LOGIN_MODAL', true))} className="bg-pink-600 text-white px-4 py-[0.7rem] rounded-md text-sm font-medium hover:bg-pink-700">Sign in</button>
              }
              {/* <button className="p-2 hover:bg-gray-100 rounded-md">
                <ShoppingBag size={22} className="text-gray-700" />
              </button> */}
            </div>
          </div>
        </div>
      </div>

      {/* Category Bar */}
      <div className="hidden md:block border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-8 h-12 overflow-x-auto justify-content-end">
            {mainCategories.map((category, index) => (
              <a
                key={index}
                href="#"
                className="text-sm text-gray-700 hover:text-pink-600 whitespace-nowrap font-medium"
              >
                {category}
              </a>
            ))}
            <span className="bg-pink-600 text-white text-xs px-3 py-1 rounded-full font-semibold whitespace-nowrap">
              OFFERS
            </span>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-gray-200 bg-white">
          <div className="px-4 py-4 space-y-3">
            {/* Search Bar Mobile */}
            {/* <div className="flex items-center bg-gray-100 rounded-md px-4 py-2">
              <Search size={18} className="text-gray-500 mr-2" />
              <input
                type="text"
                placeholder="Search on Nykaa"
                className="bg-transparent outline-none text-sm w-full"
              />
            </div> */}
            <div className="heading-sec">
              <div className="text-center">
                <p>Welcome to</p>
                <h2>TakeHome</h2>
                <p className="tagline animate-pulse">Simplifying Your Searches</p>
              </div>
            </div>

            {/* Navigation Links Mobile */}
            <div className="space-y-2">
              <a href="#" className="block text-sm font-medium text-gray-700 hover:text-pink-600">Medicines & Healthcare</a>
              <a href="#" className="block text-sm font-medium text-gray-700 hover:text-pink-600">Surgicals</a>
              <a href="#" className="block text-sm font-medium text-gray-700 hover:text-pink-600">Agro & Grocery</a>
              <a href="#" className="block text-sm font-medium text-gray-700 hover:text-pink-600">Garments & Fashion</a>
              <a href="#" className="block text-sm font-medium text-gray-700 hover:text-pink-600">Electronic Appliances</a>
            </div>

            {/* Categories Mobile */}
            <div className="border-t border-gray-200 pt-3 space-y-2">
              {mainCategories.map((category, index) => (
                <a
                  key={index}
                  href="#"
                  className="block text-sm text-gray-700 hover:text-pink-600"
                >
                  {category}
                </a>
              ))}
              <span className="inline-block bg-pink-600 text-white text-xs px-3 py-1 rounded-full font-semibold">
                OFFERS
              </span>
            </div>

            {/* Sign In Mobile */}
            <button className="w-full bg-pink-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-pink-700" onClick={() => dispatch(modalAction('LOGIN_MODAL', true))}>Sign in</button>
          </div>
        </div>
      )}
    </header>
  );
}

export function ProfileCard({ user }) {
  return (
    <div className="max-w-2xl mx-auto" >
      <div className="flex items-center gap-3 rounded-lg bg-white ">
        <div className="w-12 h-12 rounded-full bg-pink-600 flex items-center justify-center">
          {/* <span className="text-gray-600 font-medium text-lg">LA</span> */}
          <i className="bx bxs-user text-white" style={{fontSize: '2.6rem'}}></i>
        </div>
        <div>
          <h2 className="text-gray-900 font-semibold mb-1" style={{fontSize: '1.5rem'}}>{user.UserFullName}</h2>
          <p className="text-gray-500 text-sm mb-0">Co-Founder / CEO</p>
        </div>
      </div>
    </div>
  );
}