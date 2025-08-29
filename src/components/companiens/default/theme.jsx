import { useState } from "react";
import Theme1 from "./themes/theme1";
import Theme2 from "./themes/theme2";

const Theme = () => {

    const [theme, setTheme] = useState('theme1');

    return (
        <div>
            <i className="bx bx-search header-login ms-3" onClick={() => setTheme('theme2')}></i>
            {/* {theme === 'theme2' && <Theme2/>} */}
            {theme === 'theme1' && <Theme1/>}
            {/* {theme === 'theme3' && <Theme3/>} */}
        </div>
    )
}

export default Theme;


const Comp = () => {
          <section id="departments" className="!py-16 !bg-gray-50">
        <div className="max-w-7xl mx-auto !px-4 !sm:px-6 !lg:px-8">
          <div className="text-center !mb-12">
            <h2 className="!text-3xl !font-bold !text-gray-900 !mb-4">Our Departments & Facilities</h2>
            <p className="text-xl !text-gray-600">Comprehensive healthcare services with {107} total beds</p>
          </div>

          {/* Critical Care & Emergency */}
          <div className="!mb-12">
            <h3 className="!text-2xl !font-semibold !text-gray-800 !mb-6 flex items-center">
              <Shield className="w-6 h-6 !mr-2 !text-blue-600" />
              Critical Care & Emergency
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 !gap-6 text-[1.2em]">
              {departments.map((dept, index) => (
                <div key={index} className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group flex flex-col h-full">
                  <div className="!p-6 flex-1 flex flex-col">
                    <div className="flex items-start !space-x-4">
                      <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                        <dept.icon className="w-7 h-7 text-white" />
                      </div>
                      <div className="flex-1 flex flex-col">
                        <h4 className="!text-lg !font-bold !text-gray-900 !mb-1">{dept.name}</h4>
                        <p className="!text-sm !text-gray-600 mb-3 min-h-[2.5rem]">{dept.description}</p>
                        <div className="flex items-center !text-blue-600 !mt-auto">
                          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M2 11a2 2 0 012-2h3v6H4a2 2 0 01-2-2v-2zm7-8a2 2 0 012-2h5a2 2 0 012 2v12a2 2 0 01-2 2h-5a2 2 0 01-2-2V3z"/>
                          </svg>
                          <span className="!text-sm !font-semibold">{dept.beds} Beds</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="h-1 bg-gradient-to-r from-blue-500 to-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Specialized Units */}
          <div className="!mb-12">
            <h3 className="!text-2xl !font-semibold !text-gray-800 !mb-6 flex items-center">
              <Stethoscope className="w-6 h-6 !mr-2 !text-blue-600" />
              Specialized Treatment Units
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 text-[1.2em]">
              {specializedUnits.map((unit, index) => (
                <div key={index} className="bg-white rounded-lg border-2 border-gray-100 hover:border-blue-400 p-4 transition-all hover:shadow-lg">
                  <h4 className="!font-bold !text-gray-900 mb-2">{unit.name}</h4>
                  <p className="text-xs !text-gray-600 mb-2">{unit.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="!text-sm !font-semibold !text-blue-600">{unit.beds} Beds</span>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* General Wards */}
          <div className="!mb-8">
            <h3 className="!text-2xl !font-semibold !text-gray-800 !mb-6 flex items-center">
              <Users className="w-6 h-6 !mr-2 !text-blue-600" />
              General Wards & Cabins
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-[1.2em]">
              {generalWards.map((ward, index) => (
                <div key={index} className="bg-gradient-to-br from-blue-50 to-white rounded-lg p-4 border border-blue-100">
                  <h4 className="!font-semibold !text-gray-800 !text-sm !mb-1">{ward.name}</h4>
                  <div className="flex items-center !text-blue-600">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 11a2 2 0 012-2h3v6H4a2 2 0 01-2-2v-2zm7-8a2 2 0 012-2h5a2 2 0 012 2v12a2 2 0 01-2 2h-5a2 2 0 01-2-2V3z"/>
                    </svg>
                    <span className="!text-lg !font-bold">{ward.beds}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Stats Bar */}
          <div className="!mt-12 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl !p-8 text-white">
            <div className="grid grid-cols-2 md:grid-cols-4 !gap-6 text-center">
              <div>
                <div className="!text-3xl !font-bold !mb-1">107</div>
                <div className="text-blue-100">Total Beds</div>
              </div>
              <div>
                <div className="!text-3xl !font-bold !mb-1">15+</div>
                <div className="text-blue-100">Departments</div>
              </div>
              <div>
                <div className="!text-3xl !font-bold !mb-1">24/7</div>
                <div className="text-blue-100">Emergency Care</div>
              </div>
              <div>
                <div className="!text-3xl !font-bold !mb-1">50+</div>
                <div className="text-blue-100">Expert Doctors</div>
              </div>
            </div>
          </div>

          <div className="text-center !mt-8">
            <button className="bg-blue-600 text-white !px-8 !py-4 rounded-lg !font-semibold hover:bg-blue-700 transition-all transform hover:scale-105 inline-flex items-center">
              <Calendar className="w-5 h-5 !mr-2" />
              Book Your Appointment
            </button>
          </div>
        </div>
      </section>
}