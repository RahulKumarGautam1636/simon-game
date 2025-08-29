import React, { useState, useEffect } from 'react';
import { ArrowRight, Check, ChevronDown, ChevronUp, Users, Award, Clock, Target, Sparkles, Heart, Star, Shield, Stethoscope, Building, Activity, Microscope, UserCheck, Brain } from 'lucide-react';

const BCRoyAboutPage = () => {
  const [openFaq, setOpenFaq] = useState(null);
  const [animated, setAnimated] = useState([]);

  useEffect(() => {
    // Trigger animations on initial load
    const timer = setTimeout(() => {
      setAnimated(['hero', 'mission', 'team', 'facilities', 'faq', 'cta']);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      question: "What makes Dr. B.C. Roy Hospital different from other healthcare institutions?",
      answer: "Dr. B.C. Roy Hospital combines a rich 50-year legacy of medical excellence with cutting-edge technology and research. Named after the legendary physician-statesman, we uphold his vision of accessible, quality healthcare while pioneering innovative treatments through our research centers and academic collaborations."
    },
    {
      question: "How can I schedule an appointment with a specialist?",
      answer: "You can schedule appointments through our 24/7 helpline, online patient portal, or mobile app. We offer both in-person and telemedicine consultations. For emergency services, no appointment is needed - our emergency department operates round the clock with immediate triage services."
    },
    {
      question: "What insurance plans does the hospital accept?",
      answer: "We accept all major health insurance plans including government schemes like Ayushman Bharat, CGHS, and ESI. We also have partnerships with leading private insurance providers. Our billing department can assist with insurance verification and claim processing."
    },
    {
      question: "Does the hospital have international patient services?",
      answer: "Yes, we have a dedicated International Patient Services department that assists with visa facilitation, airport transfers, accommodation arrangements, language interpreters, and personalized care coordination for patients from around the world."
    }
  ];

  return (
    <div className="bg-white font-sans">
      {/* Hero Section */}
      <section className={`relative overflow-hidden transition-all duration-1000 ${animated.includes('hero') ? 'opacity-100' : 'opacity-0'}`}>
        <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-indigo-800 to-purple-900">
          {/* Medical grid pattern overlay */}
          <div className="absolute inset-0 opacity-5">
            <div className="h-full w-full" style={{
              backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 50px, rgba(255,255,255,0.1) 50px, rgba(255,255,255,0.1) 51px),
                              repeating-linear-gradient(90deg, transparent, transparent 50px, rgba(255,255,255,0.1) 50px, rgba(255,255,255,0.1) 51px)`
            }}></div>
          </div>

          {/* Content */}
          <div className="container mx-auto !px-4 relative z-10">
            <div className="text-center !max-w-4xl mx-auto">
              <div className="!mb-8 flex justify-center">
                <div className="bg-white bg-opacity-20 backdrop-blur-md !p-6 rounded-full">
                  <Stethoscope className="w-16 h-16 !text-gray-600" />
                </div>
              </div>
              <h1 className="!text-5xl md:text-7xl font-bold text-white !mb-2 tracking-tight">
                Dr. B.C. Roy Hospital
              </h1>
              <div className="w-32 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto !mb-4"></div>
              <p className="!text-xl md:!text-2xl text-blue-100 !mb-6 leading-relaxed font-light">
                Honoring a Legacy of Excellence • Pioneering Tomorrow's Healthcare
              </p>
              <p className="!text-lg text-white opacity-80 !mb-6 !max-w-3xl mx-auto">
                Named after Dr. Bidhan Chandra Roy, the legendary physician and former Chief Minister of West Bengal, 
                our institution continues his vision of compassionate, accessible, and world-class healthcare for all.
              </p>
              
              <div className="flex flex-wrap justify-center py-4 !gap-6">
                <div className="bg-white bg-opacity-20 backdrop-blur-md rounded-xl !p-6 !text-gray-600 text-center w-44 border border-white border-opacity-20 shadow-lg transform hover:scale-105 transition-all duration-300">
                  <p className="!text-4xl font-bold !mb-2">50+</p>
                  <p className="text-sm uppercase tracking-wider opacity-90 mb-0">Years of Service</p>
                </div>
                <div className="bg-white bg-opacity-20 backdrop-blur-md rounded-xl !p-6 !text-gray-600 text-center w-44 border border-white border-opacity-20 shadow-lg transform hover:scale-105 transition-all duration-300">
                  <p className="!text-4xl font-bold !mb-2">1M+</p>
                  <p className="text-sm uppercase tracking-wider opacity-90 mb-0">Patients Treated</p>
                </div>
                <div className="bg-white bg-opacity-20 backdrop-blur-md rounded-xl !p-6 !text-gray-600 text-center w-44 border border-white border-opacity-20 shadow-lg transform hover:scale-105 transition-all duration-300">
                  <p className="!text-4xl font-bold !mb-2">2000+</p>
                  <p className="text-sm uppercase tracking-wider opacity-90 mb-0">Healthcare Staff</p>
                </div>
                <div className="bg-white bg-opacity-20 backdrop-blur-md rounded-xl !p-6 !text-gray-600 text-center w-44 border border-white border-opacity-20 shadow-lg transform hover:scale-105 transition-all duration-300">
                  <p className="!text-4xl font-bold !mb-2">40+</p>
                  <p className="text-sm uppercase tracking-wider opacity-90 mb-0">Specialties</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission and Vision */}
      <section className={`!py-24 transition-all duration-1000 ${animated.includes('mission') ? 'opacity-100' : 'opacity-0'}`}>
        <div className="container mx-auto !px-4">
          <div className="!mb-16 text-center">
            <h2 className="!text-4xl !md:text-5xl font-bold !text-gray-800 !mb-4">
              Our Purpose & <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Direction</span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto !mb-6"></div>
            <p className="!text-gray-600 !max-w-3xl mx-auto !text-lg">
              Guided by the principles of our founder and driven by innovation, we're committed to setting new standards in healthcare delivery and medical education.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 !gap-12">
            <div className="bg-gradient-to-br from-blue-50 via-white to-indigo-50 !p-10 rounded-3xl shadow-xl h-full border border-blue-100 hover:shadow-2xl transition-all duration-300">
              <div className="inline-flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200 !p-4 rounded-2xl !mb-6">
                <Target className="w-12 h-12 text-blue-700" />
              </div>
              <h2 className="!text-3xl font-bold !mb-6 !text-gray-800">Our Mission</h2>
              <p className="!text-gray-600 leading-relaxed !text-lg !mb-8">
                To provide comprehensive, compassionate, and cutting-edge healthcare services that honor Dr. B.C. Roy's vision 
                of making quality medical care accessible to all sections of society. We strive to integrate clinical excellence 
                with medical education and research to advance the frontiers of medicine.
              </p>
              <div className="!pt-6 border-t border-blue-100">
                <h3 className="font-semibold !text-gray-700 !mb-4">How We Fulfill Our Mission:</h3>
                <ul className="!space-y-4">
                  <li className="flex items-start">
                    <span className="bg-blue-100 !p-1.5 rounded-full !mr-4 !mt-1 flex-shrink-0">
                      <Check className="w-4 h-4 text-blue-600" />
                    </span>
                    <span className="!text-gray-600">Delivering evidence-based, patient-centered care across all specialties</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-blue-100 !p-1.5 rounded-full !mr-4 !mt-1 flex-shrink-0">
                      <Check className="w-4 h-4 text-blue-600" />
                    </span>
                    <span className="!text-gray-600">Training the next generation of healthcare professionals through our medical college</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-blue-100 !p-1.5 rounded-full !mr-4 !mt-1 flex-shrink-0">
                      <Check className="w-4 h-4 text-blue-600" />
                    </span>
                    <span className="!text-gray-600">Conducting pioneering research in cardiology, oncology, and neurosciences</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-blue-100 !p-1.5 rounded-full !mr-4 !mt-1 flex-shrink-0">
                      <Check className="w-4 h-4 text-blue-600" />
                    </span>
                    <span className="!text-gray-600">Implementing digital health initiatives for better patient outcomes</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 via-white to-pink-50 !p-10 rounded-3xl shadow-xl h-full border border-purple-100 hover:shadow-2xl transition-all duration-300">
              <div className="inline-flex items-center justify-center bg-gradient-to-br from-purple-100 to-purple-200 !p-4 rounded-2xl !mb-6">
                <Sparkles className="w-12 h-12 !text-purple-700" />
              </div>
              <h2 className="!text-3xl font-bold !mb-6 !text-gray-800">Our Vision</h2>
              <p className="!text-gray-600 leading-relaxed !text-lg !mb-8">
                To be recognized globally as a premier healthcare institution that sets benchmarks in clinical care, 
                medical education, and research. We envision creating a healthier society through innovative healthcare 
                solutions, preventive medicine programs, and community outreach initiatives that touch millions of lives.
              </p>
              <div className="!pt-6 border-t border-purple-100">
                <h3 className="font-semibold !text-gray-700 !mb-4">Our Core Values:</h3>
                <ul className="!space-y-4">
                  <li className="flex items-start">
                    <span className="bg-purple-100 !p-1.5 rounded-full !mr-4 !mt-1 flex-shrink-0">
                      <Heart className="w-4 h-4 !text-purple-600" />
                    </span>
                    <span className="!text-gray-600">Compassion and empathy in every patient interaction</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-purple-100 !p-1.5 rounded-full !mr-4 !mt-1 flex-shrink-0">
                      <Shield className="w-4 h-4 !text-purple-600" />
                    </span>
                    <span className="!text-gray-600">Integrity and ethical practices in all medical procedures</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-purple-100 !p-1.5 rounded-full !mr-4 !mt-1 flex-shrink-0">
                      <Brain className="w-4 h-4 !text-purple-600" />
                    </span>
                    <span className="!text-gray-600">Innovation through research and adoption of new technologies</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-purple-100 !p-1.5 rounded-full !mr-4 !mt-1 flex-shrink-0">
                      <Users className="w-4 h-4 !text-purple-600" />
                    </span>
                    <span className="!text-gray-600">Collaboration with global healthcare leaders for knowledge exchange</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Facilities */}
      <section className={`!py-24 bg-gradient-to-b from-gray-50 to-white transition-all duration-1000 ${animated.includes('facilities') ? 'opacity-100' : 'opacity-0'}`}>
        <div className="container mx-auto !px-4">
          <div className="text-center !mb-16">
            <h2 className="!text-4xl !md:text-5xl font-bold !text-gray-800 !mb-4">
              World-Class <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Facilities</span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto !mb-6"></div>
            <p className="!text-gray-600 !mt-4 !max-w-3xl mx-auto !text-lg">
              Our state-of-the-art infrastructure combines advanced medical technology with patient comfort, 
              creating an environment conducive to healing and recovery.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 !gap-8 !mb-16">
            <div className="bg-white rounded-3xl !p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 group">
              <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl !p-4 inline-flex items-center justify-center !mb-6 group-hover:scale-110 transition-transform duration-300">
                <Microscope className="w-10 h-10 text-blue-700" />
              </div>
              <h3 className="!text-2xl font-bold !text-gray-800 !mb-4">Advanced Diagnostic Center</h3>
              <p className="!text-gray-600 leading-relaxed">
                Featuring 3T MRI, 256-slice CT scanner, PET-CT, digital mammography, and automated laboratory systems 
                for precise diagnosis with minimal waiting time.
              </p>
            </div>

            <div className="bg-white rounded-3xl !p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 group">
              <div className="bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl !p-4 inline-flex items-center justify-center !mb-6 group-hover:scale-110 transition-transform duration-300">
                <Activity className="w-10 h-10 !text-purple-700" />
              </div>
              <h3 className="!text-2xl font-bold !text-gray-800 !mb-4">Specialized ICUs</h3>
              <p className="!text-gray-600 leading-relaxed">
                200+ ICU beds including Cardiac, Neuro, Pediatric, and Neonatal ICUs with advanced monitoring systems 
                and isolation facilities for critical care.
              </p>
            </div>

            <div className="bg-white rounded-3xl !p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 group">
              <div className="bg-gradient-to-br from-indigo-100 to-indigo-200 rounded-2xl !p-4 inline-flex items-center justify-center !mb-6 group-hover:scale-110 transition-transform duration-300">
                <Building className="w-10 h-10 !text-indigo-700" />
              </div>
              <h3 className="!text-2xl font-bold !text-gray-800 !mb-4">Modern Operation Theatres</h3>
              <p className="!text-gray-600 leading-relaxed">
                25 modular OTs with laminar flow, integrated surgical systems, robotic surgery capabilities, 
                and hybrid catheterization labs for complex procedures.
              </p>
            </div>

            <div className="bg-white rounded-3xl !p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 group">
              <div className="bg-gradient-to-br from-green-100 to-green-200 rounded-2xl !p-4 inline-flex items-center justify-center !mb-6 group-hover:scale-110 transition-transform duration-300">
                <Heart className="w-10 h-10 !text-green-700" />
              </div>
              <h3 className="!text-2xl font-bold !text-gray-800 !mb-4">Cardiac Care Excellence</h3>
              <p className="!text-gray-600 leading-relaxed">
                Comprehensive cardiac center with interventional cardiology, electrophysiology lab, 
                and dedicated cardiac surgery unit performing 5000+ procedures annually.
              </p>
            </div>

            <div className="bg-white rounded-3xl !p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 group">
              <div className="bg-gradient-to-br from-pink-100 to-pink-200 rounded-2xl !p-4 inline-flex items-center justify-center !mb-6 group-hover:scale-110 transition-transform duration-300">
                <Brain className="w-10 h-10 text-pink-700" />
              </div>
              <h3 className="!text-2xl font-bold !text-gray-800 !mb-4">Neurosciences Center</h3>
              <p className="!text-gray-600 leading-relaxed">
                Advanced neurosurgery suite with neuro-navigation, intraoperative MRI, gamma knife, 
                and comprehensive stroke unit for neurological disorders.
              </p>
            </div>

            <div className="bg-white rounded-3xl !p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 group">
              <div className="bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-2xl !p-4 inline-flex items-center justify-center !mb-6 group-hover:scale-110 transition-transform duration-300">
                <Clock className="w-10 h-10 text-yellow-700" />
              </div>
              <h3 className="!text-2xl font-bold !text-gray-800 !mb-4">24/7 Emergency & Trauma</h3>
              <p className="!text-gray-600 leading-relaxed">
                Level-1 trauma center with helipad, dedicated ambulance fleet, disaster management unit, 
                and rapid response teams available round the clock.
              </p>
            </div>
          </div>

          <div className="!mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl overflow-hidden shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="!p-12 lg:p-16 flex flex-col justify-center">
                <h3 className="!text-4xl font-bold text-white !mb-6">Experience Our Excellence</h3>
                <div className="w-20 h-1 bg-white opacity-60 !mb-6"></div>
                <p className="text-white opacity-90 !mb-8 leading-relaxed !text-lg">
                  Take a virtual tour of our world-class facilities and discover how we combine medical expertise 
                  with advanced technology to deliver exceptional patient care.
                </p>
                <div className="flex flex-wrap !gap-4">
                  <button className="bg-white text-blue-600 hover:bg-blue-50 !py-4 !px-8 rounded-full font-semibold transition-all duration-300 flex items-center shadow-lg hover:shadow-xl transform hover:scale-105">
                    Virtual Tour <ArrowRight className="ml-2 w-5 h-5" />
                  </button>
                  <button className="bg-transparent border-2 border-white text-white hover:bg-white hover:bg-opacity-10 !py-4 !px-8 rounded-full font-semibold transition-all duration-300">
                    Download Brochure
                  </button>
                </div>
              </div>
              <div className="bg-gradient-to-br from-blue-700 to-purple-700 relative overflow-hidden">
                <div className="absolute inset-0 bg-black opacity-20"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <img src="/img/bg/BC_ROY/bc_roy_hospital.jpeg" alt="" className='w-full h-full' />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className={`!py-24 transition-all duration-1000 ${animated.includes('faq') ? 'opacity-100' : 'opacity-0'}`}>
        <div className="container mx-auto !px-4">
          <div className="text-center !mb-16">
            <h2 className="!text-4xl !md:text-5xl font-bold !text-gray-800 !mb-4">
              Frequently Asked <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Questions</span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto !mb-6"></div>
            <p className="!text-gray-600 !mt-4 !max-w-3xl mx-auto !text-lg">
              Find answers to common questions about our services, facilities, and patient care processes.
            </p>
          </div>

          <div className="!max-w-4xl mx-auto">
            {faqs.map((faq, index) => (
              <div key={index} className="!mb-6 bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300">
                <button
                  className="w-full text-left !p-8 flex justify-between items-center focus:outline-none hover:bg-gray-50 transition-colors"
                  onClick={() => toggleFaq(index)}
                >
                  <h3 className="font-bold !text-gray-800 !text-lg pr-4">{faq.question}</h3>
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center transition-transform duration-300 flex-shrink-0 ${openFaq === index ? 'rotate-180' : ''}`}>
                    {openFaq === index ? (
                      <ChevronUp className="w-5 h-5 text-blue-600" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-blue-600" />
                    )}
                  </div>
                </button>
                <div
                  className={`!px-8 pb-8 !text-gray-600 transition-all duration-300 ${
                    openFaq === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0 overflow-hidden"
                  }`}
                >
                  <p className="leading-relaxed !text-lg">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className={`!py-24 bg-gradient-to-br from-blue-900 via-indigo-800 to-purple-900 relative overflow-hidden transition-all duration-1000 ${animated.includes('cta') ? 'opacity-100' : 'opacity-0'}`}>

        <div className="container mx-auto !px-4 relative z-10">
          <div className="!max-w-4xl mx-auto text-center">
            <h2 className="!text-4xl !md:text-5xl font-bold text-white !mb-6">Experience Excellence in Healthcare</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto !mb-8"></div>
            <p className="!text-xl text-white opacity-90 !mb-12 leading-relaxed">
              Join millions who have trusted Dr. B.C. Roy Hospital for their healthcare needs. 
              From routine check-ups to complex surgeries, we're here to serve you with dedication and expertise.
            </p>
            <div className="flex flex-wrap justify-center !gap-6">
              <button className="bg-white text-blue-600 hover:bg-blue-50 !py-4 !px-10 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center">
                Doctor Appointment <ArrowRight className="ml-2 w-5 h-5" />
              </button>
              <button className="bg-transparent border-2 border-white text-white hover:bg-white hover:!text-indigo-700 hover:bg-opacity-10 !py-4 !px-10 rounded-full font-semibold transition-all duration-300">
                Emergency Services
              </button>
            </div>
            
            <div className="!mt-16 flex flex-wrap justify-center !gap-8 text-white">
              <div className="flex items-center !gap-2">
                <Star className="w-5 h-5 text-yellow-400" />
                <span className="opacity-90">NABH Accredited</span>
              </div>
              <div className="flex items-center !gap-2">
                <Award className="w-5 h-5 text-yellow-400" />
                <span className="opacity-90">NABL Certified Labs</span>
              </div>
              <div className="flex items-center !gap-2">
                <Shield className="w-5 h-5 text-yellow-400" />
                <span className="opacity-90">JCI Recognition</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BCRoyAboutPage;