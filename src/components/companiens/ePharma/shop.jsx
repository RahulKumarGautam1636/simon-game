import React, { useState } from 'react';
import { ChevronLeft, User, CreditCard, Building, Clock, FileText, Smartphone, Lock, Eye, EyeOff, ChevronDown } from 'lucide-react';
import { ConnectedProductCard } from './cards';
import Reviews from './productPage/reviews';

function MobileAccountSettings() {

  const [tabActive, setTabActive] = useState('products');
  const [faceIdEnabled, setFaceIdEnabled] = useState(true);
  const [hideBalances, setHideBalances] = useState(false);

  const ProfileSection = () => (
    <div className="bg-white p-4 mb-0 border-b border-gray-200">
      <h3 className="text-sm font-medium text-gray-500 mb-3">Shop Profile</h3>
      <div className="space-y-2">
        <MenuItem icon={CreditCard} text="58 Products" tab={'products'} />
        <MenuItem icon={Building} text="82,773 Ratings & Reviews" tab={`reviews`} />
        <MenuItem icon={Clock} text="1950 Followers" tab={'followers'}/>
        <MenuItem icon={FileText} text="Contact Seller" tab={'contact'}/>
      </div>
    </div>
  );

  const SecuritySection = () => (
    <div className="bg-white p-4">
      <h3 className="text-sm font-medium text-gray-500 mb-3">Security</h3>
      <div className="">
        <MenuItem icon={Lock} text="Change Password" />
        <MenuItem icon={CreditCard} text="Payment Methods" />
        <MenuItem icon={Smartphone} text="Get Support" />
        <ToggleMenuItem icon={Eye} text="Face Id" enabled={faceIdEnabled} onToggle={() => setFaceIdEnabled(!faceIdEnabled)}/>
        <ToggleMenuItem icon={EyeOff} text="Hide balances" enabled={hideBalances} onToggle={() => setHideBalances(!hideBalances)}/>
      </div>
    </div>
  );

  const MenuItem = ({ icon: Icon, text, tab }) => (
    <div className={`flex items-center p-3 cursor-pointer ${tabActive === tab && 'bg-sky-600'}`} onClick={() => setTabActive(tab)}>
      <Icon className={`w-5 h-5 mr-3 ${tabActive === tab ? 'text-white' : 'text-gray-400'}`} />
      <span className={`flex-1 ${tabActive === tab ? 'text-white' : 'text-gray-900'}`}>{text}</span>
    </div>
  );

  const ToggleMenuItem = ({ icon: Icon, text, enabled, onToggle }) => (
    <div className="flex items-center p-3">
      <Icon className="w-5 h-5 text-gray-400 mr-3" />
      <span className="text-gray-900 flex-1">{text}</span>
      <button onClick={onToggle} className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${ enabled ? 'bg-blue-500' : 'bg-gray-200' }`} >
        <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${ enabled ? 'translate-x-6' : 'translate-x-1' }`} />
      </button>
    </div>
  );

//   --------------------------------------------------------------------------------------------

const [firstName, setFirstName] = useState('Arafat Ahmed');
  const [lastName, setLastName] = useState('Chowdhury');
  const [countryCode, setCountryCode] = useState('+880');
  const [phoneNumber, setPhoneNumber] = useState('123 4567 890');
  const [timezone, setTimezone] = useState('Dhaka (GMT +6)');
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [showTimezoneDropdown, setShowTimezoneDropdown] = useState(false);

  const countryCodes = [
    { code: '+880', flag: '🇧🇩', country: 'Bangladesh' },
    { code: '+1', flag: '🇺🇸', country: 'United States' },
    { code: '+44', flag: '🇬🇧', country: 'United Kingdom' },
    { code: '+91', flag: '🇮🇳', country: 'India' },
  ];

  const timezones = [
    'Dhaka (GMT +6)',
    'New York (GMT -5)',
    'London (GMT +0)',
    'Tokyo (GMT +9)',
    'Sydney (GMT +10)',
  ];

  const handleSave = () => {
    console.log('Saving changes...', {
      firstName,
      lastName,
      countryCode,
      phoneNumber,
      timezone
    });
  };

  return (
    <div className='flex flex-col lg:flex-row bg-white'>
        <div className="min-w-[33rem] bg-white text-[1.2em]">
            {/* Header */}
            <div className="bg-white p-4 flex items-center border-b border-gray-200 gap-4">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-medium text-sm">AK</span>
                </div>
                <div className="flex-1">
                    <h1 className="text-lg font-semibold text-gray-900">Shop Name</h1>
                    <p className="text-sm text-gray-500 mb-0">Shop Address.</p>
                </div>
            </div>

            {/* Content */}
            <div className="py-t space-y-4">
                <ProfileSection />
                {/* <SecuritySection /> */}
            </div>
        </div>

        <div className="bg-white bg-slate-50 flex-1">
            <div className="shop-products-wrapper">
                <div className={`tab-content`}>
                    {(() => {
                        if (tabActive === 'products') {
                            return (
                                <div id="list-view" className={`tab-pane product-list-view fade active show`} role="tabpanel">
                                    <div className="row !px-6 py-4">     
                                        <h1 className="!text-2xl font-semibold text-gray-900 border-b border-gray-200 pb-4">Products</h1>                  
                                        <div className="col-12 d-flex flex-wrap justify-content-around filter-view" style={{columnGap: '0.85em'}}>
                                            {items.map((item, index) => {
                                                    // if (compCode === ePharmaId || vType === 'agro' || vType === 'ErpManufacturing') {
                                                        return (
                                                            <div style={{marginTop: '1.5em', fontSize: '0.94em'}} key={index}>
                                                                <ConnectedProductCard data={item} />
                                                            </div>
                                                        )
                                                    } 
                                                //     else if (compCode === TAKE_HOME_ID || compCode === XYZ_ID || isRestaurant) {
                                                //         return (
                                                //             <div style={{marginTop: '1.8em', maxWidth: '15.8em'}} key={index}>
                                                //                 <ConnectedProductCard1 data={item} />
                                                //             </div>
                                                //         )
                                                //     } else {
                                                //         return (
                                                //             <div style={{marginTop: '1.8em'}} key={index} className='pharmacy-cards'>
                                                //                 <ConnectedPharmacyCard2 data={item} />
                                                //             </div>
                                                //         )
                                                //     }
                                                // }                                    
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )
                        } else if (tabActive === 'reviews') {
                            return (
                                <Reviews tabActive={tabActive} styles={{fontSize: '0.8em', marginTop: 0}}/>
                            )
                        } else if (tabActive === 'contact') {
                          return (
                            <div className="contact-page-side-content d-flex gap-8 justify-content-between flex-wrap !px-4 lg:!px-8">
                              <div>
                              <h6 className="contact-page-message mb-4 !pb-4 border-b border-gray-500">Please feel free to contact us for any queries.</h6>
                              <div className="single-contact-block text-justify">
                                <h4>
                                  <i className="bx bxs-map"></i> Address
                                </h4>
                                <p>B-1/312, Labonya Apartment, Chittaranjan Park, Kalyani, Nadia, WB - 741235</p>
                              </div>
                              <div className="single-contact-block">
                                <h4>
                                  <i className="bx bxs-phone-call"></i> Phone
                                </h4>
                                <p>8420209696 / 9330241456</p>
                              </div>
                              <div className="single-contact-block">
                                <h4>
                                  <i className="bx bxs-envelope"></i> Email
                                </h4>
                                <p>
                                  <a href="mailto:ask@takehome.live" style={{ fontSize: "1.6rem", color: "rgb(31, 57, 255)" }}>
                                    ask@takehome.live
                                  </a>
                                </p>
                              </div>
                              </div>
                              <div className='flex-1 border border-gray-100'>
                                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1836.5671159785556!2d88.42665376271327!3d22.982090937331908!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f894cf7a21c85f%3A0x7bbe378844d724da!2sKalyani%20Chittaranjan%20Park!5e0!3m2!1sen!2sin!4v1653540588631!5m2!1sen!2sin" width={500} height={780} style={{ border: 0 }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
                              </div>
                            </div>
                          );
                        }
                    })()}
                </div>
            </div>
  
        </div>
    </div>

  );
}

export default MobileAccountSettings;


const items = [
    {
        "AutoId": 0,
        "Description": "Grihika Gobindobhog Rice 500 Gms",
        "Discount": 6,
        "DiscountPer": 6,
        "ItemId": 856404,
        "ItemMRP": 115,
        "PackSizeId": 0,
        "ItemPackSizeList": [],
        "SRate": 108.1,
        "StockQty": 5,
        "Technicalname": "Rice",
        "ManufacturBY": "Grihika",
        "ItemImageURL": "https://admin.takehome.live/Content/ImageMaster/250506151712_1.png"
    },
    {
        "AutoId": 0,
        "Description": "Max Health Jeerakati Rice 1kg",
        "Discount": 3,
        "DiscountPer": 3,
        "ItemId": 856405,
        "ItemMRP": 90,
        "PackSizeId": 0,
        "ItemPackSizeList": [],
        "SRate": 87.3,
        "StockQty": 6,
        "Technicalname": "Rice",
        "ManufacturBY": "Max Health ",
        "ItemImageURL": "https://admin.takehome.live/Content/ImageMaster/250506152531_1.png"
    },
    {
        "AutoId": 0,
        "Description": "Organic Basmati Rice - Brown (1kg) 280",
        "Discount": 6,
        "DiscountPer": 6,
        "ItemId": 856401,
        "ItemMRP": 280,
        "PackSizeId": 0,
        "ItemPackSizeList": [],
        "SRate": 263.2,
        "StockQty": 5,
        "Technicalname": "Rice",
        "ManufacturBY": "Phalada Pure & Sure",
        "ItemImageURL": "https://admin.takehome.live/Content/ImageMaster/250506150911_1.png"
    },
    {
        "AutoId": 0,
        "Description": "Organic GobindoBhog Unpolished Rice 1Kg",
        "Discount": 6,
        "DiscountPer": 6,
        "ItemId": 856402,
        "ItemMRP": 257,
        "PackSizeId": 0,
        "ItemPackSizeList": [],
        "SRate": 241.58,
        "StockQty": 5,
        "Technicalname": "Rice",
        "ManufacturBY": "Tattva",
        "ItemImageURL": "https://admin.takehome.live/Content/ImageMaster/250506151247_1.png"
    }
]