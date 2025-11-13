import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Calendar, Users, Heart, Shield, Award, ChevronRight, Menu, X, Star, Activity, Stethoscope, Brain, Baby, Bone } from 'lucide-react';
import { Link } from 'react-router-dom';

const HospitalHomepage = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // const departments = [
  //   { name: 'Cardiology', icon: Heart, description: 'Advanced heart care and treatment' },
  //   { name: 'Neurology', icon: Brain, description: 'Expert neurological services' },
  //   { name: 'Pediatrics', icon: Baby, description: 'Comprehensive child healthcare' },
  //   { name: 'Orthopedics', icon: Bone, description: 'Bone and joint specialists' },
  //   { name: 'Emergency', icon: Activity, description: '24/7 emergency services' },
  //   { name: 'General Medicine', icon: Stethoscope, description: 'Primary healthcare services' }
  // ];

  const features = [
    { title: '24/7 Emergency Care', description: 'Round-the-clock emergency services with expert medical staff', icon: Shield },
    { title: 'Expert Doctors', description: 'Board-certified physicians with years of experience', icon: Users },
    { title: 'Modern Equipment', description: 'State-of-the-art medical technology and facilities', icon: Award },
    { title: 'Compassionate Care', description: 'Patient-centered approach with personalized treatment', icon: Heart }
  ];

  const testimonials = [
    { name: 'Priya Sharma', rating: 5, text: 'Excellent care and professional staff. The doctors took time to explain everything clearly.' },
    { name: 'Rajesh Kumar', rating: 5, text: 'Clean facilities and efficient service. Highly recommend DR B C ROY Hospital.' },
    { name: 'Anita Patel', rating: 5, text: 'The emergency department saved my life. Forever grateful to the amazing team.' }
  ];

  const departments = [
    { name: 'Emergency Unit', icon: Activity, beds: 5, description: '24/7 emergency medical services' },
    { name: 'ICU', icon: Heart, beds: 5, description: 'Intensive Care Unit with advanced monitoring' },
    { name: 'HDU', icon: Shield, beds: 5, description: 'High Dependency Unit for critical care' },
    { name: 'Maternity Ward', icon: Baby, beds: 20, description: 'Comprehensive maternal and newborn care' },
    { name: 'NICU', icon: Baby, beds: 4, description: 'Neonatal Intensive Care Unit' },
    { name: 'Surgery Wards', icon: Stethoscope, beds: 20, description: 'Male & Female surgical recovery' }
  ];

  const specializedUnits = [
    { name: 'Burn Unit', beds: 4, description: 'Specialized burn treatment and recovery' },
    { name: 'Dengue Unit', beds: 6, description: 'Dedicated dengue fever treatment' },
    { name: 'Chemotherapy Unit', beds: 4, description: 'Cancer treatment and support' },
    { name: 'Dialysis Unit', beds: 4, description: 'Kidney dialysis services' },
    { name: 'Day-care Unit', beds: 4, description: 'Short-term medical procedures' }
  ];

  const generalWards = [
    { name: 'General Male Ward', beds: 10 },
    { name: 'General Female Ward', beds: 10 },
    { name: 'Male Cabin', beds: 4 },
    { name: 'Female Cabin', beds: 3 }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto !px-4 !sm:px-6 !lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex items-center !space-x-2">
                <div className="w-10 h-10 !bg-blue-600 rounded-full flex items-center justify-center">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <span className="!font-bold !text-xl !text-gray-900">DR B C ROY</span>
              </div>
            </div>
            
            <nav className="hidden md:flex !space-x-8">
              <a href="#home" className="!text-gray-700 !hover:text-blue-600 transition">Home</a>
              <a href="#departments" className="!text-gray-700 !hover:text-blue-600 transition">Departments</a>
              <a href="#about" className="!text-gray-700 !hover:text-blue-600 transition">About</a>
              <a href="#contact" className="!text-gray-700 !hover:text-blue-600 transition">Contact</a>
            </nav>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a href="#home" className="block !px-3 !py-2 !text-gray-700 hover:bg-gray-50 rounded">Home</a>
              <a href="#departments" className="block !px-3 !py-2 !text-gray-700 hover:bg-gray-50 rounded">Departments</a>
              <a href="#about" className="block !px-3 !py-2 !text-gray-700 hover:bg-gray-50 rounded">About</a>
              <a href="#contact" className="block !px-3 !py-2 !text-gray-700 hover:bg-gray-50 rounded">Contact</a>
            </div>
          </div>
        )}
      </header> */}

      {/* Hero Section */}
      <section id="home" className="relative text-white">
        {/* Background Image */}
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url("/img/bg/BC_ROY/bc_roy_hospital.jpeg")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        >
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/50 to-blue-800/90"></div>
          {/* Additional Dark Overlay for better text readability I am using this to translate my website pages into bengali but it translates some person names wrong. can we do anything for that.  */}
          <div className="absolute inset-0 bg-black/30"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto !px-4 !sm:px-6 !lg:px-8 !py-16 lg:py-32">
          <div className="grid md:grid-cols-2 !gap-12 items-center">
            <div>
              <div className="!mb-8 flex justify-center lg:hidden">
                <img className='max-h-[8em] rounded-[1em]' src="/img/bg/BC_ROY/new_barrackpore_muncipality.jpeg" alt="NBMC" />
              </div>
              <h1 className="text-4xl lg:text-5xl !font-bold !mb-6">
                Welcome to Dr. B.&nbsp;C. Roy General Hospital & Maternity Home
              </h1>
              <p className="!text-xl !mb-8 !text-blue-100">
                Providing compassionate, comprehensive healthcare with cutting-edge medical technology and expert physicians dedicated to your wellbeing.
              </p>
              
              <div className="flex flex-col sm:flex-row !gap-4">
                <Link to={'/specialists'} className="bg-white !text-blue-600 !px-8 !py-4 rounded-lg !font-semibold !hover:bg-blue-50 transition transform hover:scale-105 flex items-center justify-center group">
                  <Calendar className="w-5 h-5 !mr-2" />
                  Book Appointment
                  <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition" />
                </Link>
                <button className="!border-2 !border-white text-white !px-8 !py-4 rounded-lg !font-semibold !hover:bg-white !hover:text-blue-600 transition">
                  <Phone className="w-5 h-5 inline !mr-2" />
                  7044641644
                </button>
              </div>

              <div className="!mt-8 flex flex-col sm:flex-row !gap-6 !text-sm">
                {/* <div className="flex items-center">
                  <Clock className="w-5 h-5 !mr-2 !text-blue-200" />
                  <span>24/7 Emergency</span>
                </div> */}
                <div className="flex items-center text-[1.1em]">
                  <MapPin className="w-5 h-5 !mr-2 !text-blue-200" />
                  <span>103, B.&nbsp;C. ROY SARANI, NEWBARRACKPORE, KOLKATA-700131</span>
                </div>
              </div>
            </div>

            <div className="hidden md:block">
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl !p-8 border border-white/20">
                <div className='flex justify-between'>
                  <h3 className="!font-semibold !mb-6 text-lime-300">Quick Stats</h3>
                  <img className='max-h-[8em] absolute right-[1em] top-[-1em] rounded-[1em]' src="/img/bg/BC_ROY/new_barrackpore_muncipality.jpeg" alt="NBMC" />
                </div>
                <div className="grid grid-cols-2 !gap-6">
                  <div>
                    <div className="!text-3xl !font-bold">50+</div>
                    <div className="text-blue-100">Expert Doctors</div>
                  </div>
                  <div>
                    <div className="!text-3xl !font-bold">200+</div>
                    <div className="text-blue-100">Hospital Beds</div>
                  </div>
                  <div>
                    <div className="!text-3xl !font-bold">15+</div>
                    <div className="text-blue-100">Departments</div>
                  </div>
                  <div>
                    <div className="!text-3xl !font-bold">10K+</div>
                    <div className="text-blue-100">Happy Patients</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="!py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto !px-4 !sm:px-6 !lg:px-8">
          <div className="text-center !mb-12">
            <h2 className="!text-3xl !font-bold !text-gray-900 !mb-4">Why Choose Dr. B.&nbsp;C. Roy Hospital</h2>
            <p className="!text-xl text-gray-600">Excellence in healthcare with a human touch</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 !gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-xl !p-6 shadow-lg hover:shadow-xl transition">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center !mb-4">
                  <feature.icon className="w-6 h-6 !text-blue-600" />
                </div>
                <h3 className="text-lg !font-semibold !mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Departments Section */}
      {/* <section id="departments" className="!py-16">
        <div className="max-w-7xl mx-auto !px-4 !sm:px-6 !lg:px-8">
          <div className="text-center !mb-12">
            <h2 className="!text-3xl !font-bold !text-gray-900 !mb-4">Our Departments</h2>
            <p className="!text-xl text-gray-600">Specialized care across multiple disciplines</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 !gap-6">
            {departments.map((dept, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-xl !p-6 hover:shadow-lg transition cursor-pointer group">
                <div className="flex items-start !space-x-4">
                  <div className="w-12 h-12 !bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-blue-700 transition">
                    <dept.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg !font-semibold !mb-1">{dept.name}</h3>
                    <p className="text-gray-600 !text-sm">{dept.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center !mt-8">
            <button className="bg-blue-600 text-white !px-6 !py-3 rounded-lg !font-semibold hover:bg-blue-700 transition">
              View All Departments
            </button>
          </div>
        </div>
      </section> */}
      <section id="departments" className="!py-16 !bg-gray-50">
        <div className="max-w-7xl mx-auto !px-4 !sm:px-6 !lg:px-8">
          <div className="text-center !mb-12">
            <h2 className="!text-3xl !font-bold !text-gray-900 !mb-4">Our Departments & Facilities</h2>
            <p className="text-xl !text-gray-600">Comprehensive healthcare services with {109} total beds</p>
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
                <div className="!text-3xl !font-bold !mb-1">109</div>
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
            <Link to={'/specialists'} className="bg-blue-600 text-white !px-8 !py-4 rounded-lg !font-semibold hover:bg-blue-700 transition-all transform hover:scale-105 inline-flex items-center">
              <Calendar className="w-5 h-5 !mr-2" />
              Book Appointment
            </Link>
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="!py-16 bg-blue-600">
        <div className="max-w-4xl mx-auto !px-4 !sm:px-6 !lg:px-8 text-center">
          <h2 className="!text-3xl !font-bold text-white !mb-4">
            Need Medical Assistance?
          </h2>
          <p className="!text-xl !text-blue-100 !mb-8">
            Our dedicated team is here to help you 24/7. Book your appointment today for expert medical care.
          </p>
          <div className="flex flex-col sm:flex-row !gap-4 justify-center">
            <Link to={'/specialists'} className="bg-white !text-blue-600 !px-8 !py-4 rounded-lg !font-semibold !hover:bg-blue-50 transition transform hover:scale-105 inline-flex items-center justify-center">
              <Calendar className="w-5 h-5 !mr-2" />
              Book Appointment 
            </Link>
            <button className="!border-2 !border-white text-white !px-8 !py-4 rounded-lg !font-semibold !hover:bg-white !hover:text-blue-600 transition inline-flex items-center justify-center">
              <Phone className="w-5 h-5 !mr-2" />
              Call Us: 7044641644
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="!py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto !px-4 !sm:px-6 !lg:px-8">
          <div className="text-center !mb-12">
            <h2 className="!text-3xl !font-bold !text-gray-900 !mb-4">Patient Testimonials</h2>
            <p className="!text-xl text-gray-600">Hear from our satisfied patients</p>
          </div>

          <div className="grid md:grid-cols-3 !gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-xl !p-6 shadow-lg">
                <div className="flex !mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 !mb-4">"{testimonial.text}"</p>
                <p className="!font-semibold !text-gray-900">- {testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="!py-16">
        <div className="max-w-7xl mx-auto !px-4 !sm:px-6 !lg:px-8">
          <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 rounded-2xl overflow-hidden md:p-12 text-white">
            <div className="grid md:grid-cols-2 !gap-8">
              <div className='!px-8 !py-16'>
                <h2 className="!text-3xl !font-bold !mb-6">Get In Touch</h2>
                <div className="!space-y-4">
                  <div className="flex items-center">
                    <MapPin className="w-5 h-5 !mr-3 flex-shrink-0" />
                    <span>103, B.&nbsp;C. ROY SARANI, NEWBARRACKPORE, KOLKATA-700131</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="w-5 h-5 !mr-3 flex-shrink-0" />
                    <span>+91 7044641644</span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="w-5 h-5 !mr-3 flex-shrink-0" />
                    <span>info@drbcroyhosp.com</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-5 h-5 !mr-3 flex-shrink-0" />
                    <span>Mon-Sat: 8:00 AM - 8:00 PM | Emergency: 24/7</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-center">
                <div className="relative h-[100%] w-[100%]">
                  <div
                    className="absolute inset-0"
                    style={{
                      backgroundImage: 'url("/img/bg/BC_ROY/bc_roy_hospital.jpeg")',
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      backgroundRepeat: 'no-repeat'
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white !py-8">
        <div className="max-w-7xl mx-auto !px-4 !sm:px-6 !lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center !space-x-2 !mb-4 !md:mb-0">
              <div className="w-8 h-8 !bg-blue-600 rounded-full flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <span className="!font-bold text-lg">Dr. B.&nbsp;C. Roy General Hospital & Maternity Home</span>
            </div>
            <p className="text-gray-400 !text-sm mb-0 text-center">
              © 2025 Dr. B.&nbsp;C. Roy General Hospital & Maternity Home. All rights reserved. | Committed to Your Health
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HospitalHomepage;