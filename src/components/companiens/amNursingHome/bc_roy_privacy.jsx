import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Shield, Phone, Mail, MapPin, Globe } from 'lucide-react';

const BCRoyPrivacyPolicy = () => {
  const [expandedSections, setExpandedSections] = useState({});

  const toggleSection = (sectionId) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const sections = [
    {
      id: 'introduction',
      title: '1. Introduction',
      content: `Dr. B. C. Roy General Hospital & Maternity Home ("we," "our," or "the Hospital") is committed to protecting the privacy and confidentiality of our patients' personal and health information. This Privacy Policy outlines how we collect, use, disclose, and safeguard your information in accordance with applicable laws and regulations, including the Information Technology Act, 2000, and relevant healthcare privacy standards.`
    },
    {
      id: 'info-collect',
      title: '2. Information We Collect',
      content: {
        personal: [
          'Full name, date of birth, gender, and contact details',
          'Government-issued identification numbers (Aadhaar, PAN, etc.)',
          'Emergency contact information',
          'Insurance and billing information',
          'Employment and demographic information'
        ],
        health: [
          'Medical history and current health conditions',
          'Diagnostic test results and imaging studies',
          'Treatment plans and medication records',
          'Clinical notes and observations',
          'Mental health information',
          'Genetic information (when applicable)'
        ],
        technical: [
          'Website usage data and cookies',
          'IP addresses and device information',
          'Login credentials for patient portals',
          'Communication records (emails, phone calls)'
        ]
      }
    },
    {
      id: 'how-collect',
      title: '3. How We Collect Information',
      content: [
        'Patient registration and admission processes',
        'Medical examinations and consultations',
        'Diagnostic procedures and laboratory tests',
        'Insurance verification and billing processes',
        'Our website and online patient portals',
        'Telephone communications',
        'Third-party healthcare providers and laboratories'
      ]
    },
    {
      id: 'use-info',
      title: '4. Use of Information',
      content: {
        healthcare: [
          'Providing medical treatment and care',
          'Coordinating care among healthcare providers',
          'Managing appointments and scheduling',
          'Maintaining accurate medical records',
          'Emergency medical situations'
        ],
        administrative: [
          'Billing and insurance claims processing',
          'Quality assurance and improvement programs',
          'Compliance with legal and regulatory requirements',
          'Risk management and patient safety initiatives',
          'Statistical analysis and research (anonymized data)'
        ],
        communication: [
          'Appointment reminders and follow-up care',
          'Test results and treatment updates',
          'Health education and preventive care information',
          'Hospital announcements and service updates'
        ]
      }
    },
    {
      id: 'sharing',
      title: '5. Information Sharing and Disclosure',
      content: {
        authorized: [
          'Healthcare professionals involved in your care',
          'Authorized family members or representatives',
          'Insurance companies for claim processing',
          'Government agencies as required by law',
          'Accreditation and quality assurance organizations',
          'Legal authorities when mandated by court orders'
        ],
        thirdParty: [
          'Laboratory and diagnostic service providers',
          'Medical equipment and technology vendors',
          'Billing and collection agencies',
          'IT support and data storage services',
          'Professional consultants (legal, audit, etc.)'
        ],
        research: [
          'De-identified data for medical research',
          'Educational institutions for training purposes',
          'Public health agencies for epidemiological studies'
        ]
      }
    },
    {
      id: 'security',
      title: '6. Data Security Measures',
      content: [
        'Encryption of sensitive data in transit and at rest',
        'Access controls and user authentication systems',
        'Regular security audits and vulnerability assessments',
        'Staff training on privacy and security protocols',
        'Secure disposal of physical and electronic records',
        'Firewall protection and intrusion detection systems',
        'Regular data backups and disaster recovery procedures'
      ]
    },
    {
      id: 'rights',
      title: '7. Patient Rights',
      content: [
        'Access your medical records and personal information',
        'Request corrections to inaccurate information',
        'Obtain copies of your medical records',
        'Request restrictions on use or disclosure of information',
        'File complaints regarding privacy practices',
        'Receive communications through alternative means',
        'Withdraw consent for certain uses (where applicable)',
        'Know about any data breaches affecting your information'
      ]
    },
    {
      id: 'retention',
      title: '8. Data Retention',
      content: {
        periods: [
          'Active medical records: As long as medically necessary',
          'Billing records: 7 years from the date of service',
          'Legal and regulatory compliance: As required by law',
          'Research data: According to study protocols and regulations'
        ],
        note: 'Information is securely destroyed when no longer required, unless legal obligations mandate longer retention.'
      }
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white !pt-8">
      <div className="max-w-4xl mx-auto !px-6 py-8">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg !p-5 !mb-6 border border-blue-100">
          <div className="flex items-center">
            <Shield className="text-blue-600 w-12 h-12 !mr-3" />
            <div>
              <h1 className="!text-3xl font-bold !text-gray-900 mb-2">Privacy Policy</h1>
              <h2 className="!text-xl text-blue-600 font-semibold">Dr. B. C. Roy General Hospital & Maternity Home</h2>
            </div>
          </div>
        </div>

        {/* Main Content */}
        {sections.map((section) => (
          <div key={section.id} className="bg-white rounded-xl shadow-md !mb-6 border border-gray-200 overflow-hidden">
            <button
              onClick={() => toggleSection(section.id)}
              className="w-full !px-6 !py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
            >
              <h3 className="!text-lg font-semibold !text-gray-900">{section.title}</h3>
            </button>
            
            {/* {expandedSections[section.id] && ( */}
              <div className="!px-6 !pb-6">
                {typeof section.content === 'string' ? (
                  <p className="!text-gray-700 leading-relaxed">{section.content}</p>
                ) : Array.isArray(section.content) ? (
                  <ul className="!space-y-2">
                    {section.content.map((item, index) => (
                      <li key={index} className="!text-gray-700 flex items-start">
                        <span className="w-2 h-2 bg-blue-500 rounded-full !mt-2 !mr-3 flex-shrink-0"></span>
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="!space-y-6">
                    {Object.entries(section.content).map(([key, value]) => (
                      <div key={key}>
                        <h4 className="!text-md font-semibold text-gray-800 !mb-3 capitalize">
                          {key === 'thirdParty' ? 'Third-Party Service Providers' : key.replace(/([A-Z])/g, ' $1').trim()}
                        </h4>
                        {Array.isArray(value) ? (
                          <ul className="!space-y-2 !ml-4">
                            {value.map((item, index) => (
                              <li key={index} className="!text-gray-700 flex items-start">
                                <span className="w-2 h-2 bg-blue-400 rounded-full !mt-2 !mr-3 flex-shrink-0"></span>
                                {item}
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="!text-gray-700 leading-relaxed !ml-4">{value}</p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            {/* )} */}
          </div>
        ))}

        {/* Additional Sections */}
        <div className="grid md:grid-cols-2 !gap-6 !mb-8">
          {/* Cookies */}
          <div className="bg-white rounded-xl shadow-md !p-6 border border-gray-200">
            <h3 className="!text-lg font-semibold !text-gray-900 mb-4">9. Cookies and Website Privacy</h3>
            <p className="!text-gray-700 !mb-3">Our website uses cookies to:</p>
            <ul className="!space-y-2 !text-base">
              {[
                'Enhance user experience and functionality',
                'Analyze website traffic and usage patterns',
                'Provide personalized content and services',
                'Maintain login sessions for patient portals'
              ].map((item, index) => (
                <li key={index} className="!text-gray-700 flex items-start">
                  <span className="w-2 h-2 bg-green-500 rounded-full !mt-2 !mr-3 flex-shrink-0"></span>
                  {item}
                </li>
              ))}
            </ul>
            <p className="!text-base text-gray-600 mt-3">You can control cookie settings through your browser preferences.</p>
          </div>

          {/* Children's Privacy */}
          <div className="bg-white rounded-xl shadow-md !p-6 border border-gray-200">
            <h3 className="!text-lg font-semibold !text-gray-900 mb-4">12. Children's Privacy</h3>
            <p className="!text-gray-700 !text-base leading-relaxed">
              We take special care to protect the privacy of patients under 18 years of age. Parental or guardian consent is required for treatment and information disclosure, except in emergency situations or as otherwise permitted by law.
            </p>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl shadow-lg text-white !p-8 !mb-8">
          <h3 className="!text-2xl font-bold !mb-6 flex items-center text-white">
            <Phone className="!mr-3" />
            Contact Information
          </h3>
          <div className="grid md:grid-cols-2 !gap-6">
            <div>
              <h4 className="font-semibold !mb-3 text-white">Privacy Officer</h4>
              <p className="text-blue-100 mb-4">Dr. B. C. Roy General Hospital & Maternity Home</p>
              
              <div className="!space-y-3">
                <div className="flex items-start">
                  <MapPin className="w-5 h-5 !mr-3 !mt-1 flex-shrink-0" />
                  <span className="!text-base">103, B. C. ROY SARANI, NEW BARRACKPORE, KOLKATA-700131</span>
                </div>
                <div className="flex items-center">
                  <Phone className="w-5 h-5 !mr-3" />
                  <span className="!text-base">+91 7044641644</span>
                </div>
                <div className="flex items-center">
                  <Mail className="w-5 h-5 !mr-3" />
                  <span className="!text-base">info@drbcroyhosp.com</span>
                </div>
                <div className="flex items-center">
                  <Globe className="w-5 h-5 !mr-3" />
                  <span className="!text-base">bcroy.gbooksindia.in</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold !mb-3 text-white">Complaints and Grievances</h4>
              <p className="!text-base text-blue-100 leading-relaxed">
                If you believe your privacy rights have been violated, you may file a complaint with our Privacy Officer, contact hospital administration, or report to relevant regulatory authorities. We will not retaliate against individuals who file complaints in good faith.
              </p>
            </div>
          </div>
        </div>

        {/* Legal Compliance */}
        <div className="bg-white rounded-xl shadow-md !p-6 border border-gray-200 !mb-8">
          <h3 className="!text-lg font-semibold !text-gray-900 mb-4">16. Compliance and Legal Framework</h3>
          <p className="!text-gray-700 !mb-3">This Privacy Policy complies with:</p>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              'Information Technology Act, 2000',
              'Indian Medical Council (Professional Conduct, Etiquette and Ethics) Regulations',
              'Clinical Establishments Act and relevant state regulations',
              'Other applicable healthcare privacy laws and standards'
            ].map((item, index) => (
              <div key={index} className="flex items-start">
                <span className="w-2 h-2 bg-purple-500 rounded-full !mt-2 !mr-3 flex-shrink-0"></span>
                <span className="!text-base !text-gray-700">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Acknowledgment */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl !p-6">
          <h3 className="!text-lg font-semibold text-amber-800 !mb-3">Acknowledgment</h3>
          <p className="text-amber-700 !text-base leading-relaxed">
            By receiving services at Dr. B. C. Roy General Hospital & Maternity Home or using our website, you acknowledge that you have read, understood, and agree to this Privacy Policy. If you do not agree with any part of this policy, please discuss your concerns with our Privacy Officer before receiving services.
          </p>
          <p className="text-xs text-amber-600 mt-3">
            This Privacy Policy is available in multiple languages upon request.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BCRoyPrivacyPolicy;