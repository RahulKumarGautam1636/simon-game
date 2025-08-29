import { useEffect, useState } from 'react';
import { AlertTriangle, User, Trash2, Mail, Clock, CheckCircle } from 'lucide-react';
import { connect, useSelector } from 'react-redux';
import { modalAction } from '../../../actions';
import { MyModal } from '../default/utilities';
import LoginModal from './modals/loginModal';
import axios from 'axios';
import { BASE_URL } from '../../../constants';

const DeleteAccount = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [confirmText, setConfirmText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [reason, setReason] = useState('');

  const userInfo = useSelector(i => i.userInfo)

  const deletionReasons = [
    'No longer need the account',
    'Privacy concerns',
    'Switching to competitor',
    'Too many notifications',
    'Account security issues',
    'Other'
  ];

  const handleDeleteAccount = async () => {
    if (confirmText !== 'DELETE MY ACCOUNT') return alert('Please complete all required fields correctly.')
    let body = {
      EncCompanyId: userInfo.EncCompanyId,
      BillType: 'DeleteRequest',    
      PBankId: userInfo.PBankId,
      BillId: userInfo.BillId,
      Name: userInfo.Name,
      PartyCode: userInfo.PartyCode,
      RegMob1: userInfo.RegMob1,
      RegMob2: userInfo.RegMob2,
      Email: userInfo.Email,
      Address: userInfo.Address,
      Amount: userInfo.Amount,
      OpportunityId: userInfo.OpportunityId,
      UserId: userInfo.UserId,
      MPartyCode: userInfo.MPartyCode,
      MemberId: userInfo.MemberId,
      UnderDoctId: userInfo.UnderDoctId,
      ReferrerId: userInfo.ReferrerId,
      ProviderId: userInfo.ProviderId,
      MarketedId: userInfo.MarketedId,
      DeptId: userInfo.DeptId,
      AppointmentToId: userInfo.AppointmentToId,
      AppointmentTo: userInfo.AppointmentTo || '',
      EnqStatusValue: userInfo.EnqStatusValue || '',
      EnqStatusId: userInfo.EnqStatusId,
      Remarks: reason,
    }
    console.log(body);  
    
    setIsLoading(true);
    const res = await axios.post(`${BASE_URL}/api/Appointment/SaveAllRequest`, body);
    setIsLoading(false);
    if (res.data[0] === 'Y' && res.data[1]?.length > 4) {
      setCurrentStep(3);
    } else {
      alert('An Unexpected error occured.');
    }
  };

  const renderStep1 = () => (
    <div className="!space-y-6">
      <div className="bg-red-50 border border-red-200 rounded-lg !p-4">
        <div className="flex items-start !space-x-3">
          <AlertTriangle className="w-6 !h-6 text-red-600 flex-shrink-0 !mt-0.5" />
          <div>
            <h3 className="!text-lg font-semibold text-red-800 !mb-2">
              Account Deletion Warning
            </h3>
            <p className="text-red-700 !mb-4">
              Deleting your account is permanent and cannot be undone. You will lose access to:
            </p>
            <ul className="text-red-700 !space-y-1 !text-sm" style={{listStyle: 'decimal'}}>
              <li>Your account and all associated data</li>
              <li>Access to all services and features</li>
              <li>Transaction history and records</li>
              <li>Any premium subscriptions or benefits</li>
              <li>Saved preferences and settings</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 border border-gray-200 rounded-lg !p-4">
        <h3 className="!text-lg font-semibold text-gray-800 !mb-4">
          Help us improve (Optional)
        </h3>
        <p className="text-gray-600 !mb-4">
          Could you tell us why you're deleting your account?
        </p>
        <div className="!space-y-2">
          {deletionReasons.map((reasonOption) => (
            <label key={reasonOption} className="!flex items-center cursor-pointer gap-3">
              <input
                type="radio"
                name="reason"
                value={reasonOption}
                checked={reason === reasonOption}
                onChange={(e) => setReason(e.target.value)}
                className="w-4 h-4 text-red-600 border-gray-300 focus:ring-red-500"
              />
              <span className="!text-sm text-gray-700">{reasonOption}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="flex justify-between mt-3">
        <button className="text-gray-500 hover:text-gray-700 transition-colors">
          ← Cancel
        </button>
        <button
          onClick={() => {
            if (!reason) return alert('Please select an option.');
            setCurrentStep(2)}
          }
          className="bg-red-600 text-white !px-6 !py-2 rounded-lg hover:bg-red-700 transition-colors"
        >
          Continue with Deletion
        </button>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="!space-y-4">
      <div>
        <h3 className="!text-lg font-semibold text-gray-900 !mb-2">
          Final Confirmation
        </h3>
        <p className="text-gray-600">
          Please confirm your decision by completing the verification below. This action cannot be undone.
        </p>
      </div>

      <div className="bg-red-50 border border-red-200 rounded-lg !p-4">
        <h4 className="font-medium text-red-800 !mb-3 flex items-center !text-lg">
          <Trash2 className="w-4 h-4 me-3" />
          This will permanently delete:
        </h4>
        <ul className="!space-y-1 !text-sm text-red-700" style={{listStyle: 'decimal'}}>
          <li>Your entire account and profile</li>
          <li>All your content and data</li>
          <li>Transaction and activity history</li>
          <li>Preferences and settings</li>
          <li>Any connections or relationships</li>
        </ul>
      </div>

      <div className="!space-y-4">
        <div>
          <label className="block !text-sm font-medium text-gray-700 !mb-2">
            Type "DELETE MY ACCOUNT" to confirm *
          </label>
          <input
            type="text"
            value={confirmText}
            onChange={(e) => setConfirmText(e.target.value)}
            className="w-full !px-3 !py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
            placeholder="DELETE MY ACCOUNT"
          />
        </div>

        {/* <div>
          <label className="block !text-sm font-medium text-gray-700 !mb-2">
            Enter your password *
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full !px-3 !py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
            placeholder="Your current password"
          />
        </div> */}
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg !p-4">
        <div className="flex items-start !space-x-2">
          <Clock className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
          <div className="!text-sm">
            <p className="text-yellow-800 font-medium !mb-1">Grace Period</p>
            <p className="text-yellow-700">
              After confirmation, you have 7 days to cancel this request. 
              Your account will remain accessible during this period.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg !p-4">
        <div className="flex items-start !space-x-2">
          <Mail className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div className="!text-sm">
            <p className="text-blue-800 font-medium !mb-1">Email Confirmation</p>
            <p className="text-blue-700">
              You will receive an email confirmation before your account is permanently deleted. 
              You can cancel this request by clicking the link in the email.
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-between">
        <button
          onClick={() => setCurrentStep(1)}
          className="text-gray-500 hover:text-gray-700 transition-colors"
        >
          ← Previous Step
        </button>
        <button
          onClick={handleDeleteAccount}
          disabled={isLoading || confirmText !== 'DELETE MY ACCOUNT'}
          className="bg-red-600 text-white !px-6 !py-2 rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center !space-x-2"
        >
          {isLoading ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Processing...</span>
            </>
          ) : (
            <>
              <Trash2 className="w-4 h-4" />
              <span>Delete My Account</span>
            </>
          )}
        </button>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="text-center !space-y-6">
      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
        <CheckCircle className="w-8 h-8 text-green-600" />
      </div>
      
      <div>
        <h3 className="!text-xl font-semibold text-gray-900 !mb-2">
          Deletion Request Submitted
        </h3>
        <p className="text-gray-600 !mb-4">
          Your account deletion request has been successfully submitted. 
        </p>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg !p-4">
        <h4 className="font-medium text-blue-800 !mb-3">What happens next?</h4>
        <div className="!text-sm text-blue-700 !space-y-2 text-left">
          {/* <div className="flex items-start !space-x-3">
            <div className="w-2 h-2 bg-blue-500 rounded-full !mt-2 flex-shrink-0"></div>
            <p>You'll receive immediate email confirmation</p>
          </div> */}
          <div className="flex items-start !space-x-3">
            <div className="w-2 h-2 bg-blue-500 rounded-full !mt-2 flex-shrink-0"></div>
            <p>Your account will remain active for 7 days (grace period)</p>
          </div>
          <div className="flex items-start !space-x-3">
            <div className="w-2 h-2 bg-blue-500 rounded-full !mt-2 flex-shrink-0"></div>
            <p>All account data will be permanently deleted after the grace period</p>
          </div>
          <div className="flex items-start !space-x-3">
            <div className="w-2 h-2 bg-blue-500 rounded-full !mt-2 flex-shrink-0"></div>
            <p>Final confirmation will be sent when deletion is complete</p>
          </div>
        </div>
      </div>
      {/* <div className="bg-gray-50 border border-gray-200 rounded-lg !p-4">
        <p className="!text-sm text-gray-600">
          <strong>Need to cancel?</strong> Check your email for the cancellation link, 
          or contact support within the next 7 days.
        </p>
      </div> */}
      {/* <div className="space-y-3">
        <button
          onClick={() => window.location.href = '/'}
          className="w-full bg-gray-600 text-white !px-6 !py-2 rounded-lg hover:bg-gray-700 transition-colors"
        >
          Return to Homepage
        </button>
        <button
          onClick={() => window.location.href = '/support'}
          className="w-full text-gray-600 hover:text-gray-800 transition-colors !text-sm mt-3"
        >
          Contact Support
        </button>
      </div> */}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 !p-4" style={{fontFamily: 'Nunito'}}>
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        {currentStep === 3 || <div className="text-center">
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto !mb-3 text-[2em]">
            <User className="w-6 h-6 text-red-600" />
          </div>
          <h1 className="!text-2xl font-bold text-gray-900 !mb-1">
            Delete Account
          </h1>
          <p className="text-gray-600">
            Permanently remove your account and data
          </p>
        </div>}

        {/* Progress Indicator */}
        {currentStep < 3 && (
          <div className="!mb-6">
            <div className="flex items-center justify-between !mb-2">
              <span className="!text-sm font-medium text-gray-600">
                Step {currentStep} of 2
              </span>
              <span className="!text-sm text-gray-500">
                {Math.round((currentStep / 2) * 100)}% Complete
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-red-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(currentStep / 2) * 100}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 !p-4">
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}
        </div>

        {/* Footer */}
        {/* {currentStep < 3 && (
          <div className="!mt-6 text-center">
            <p className="!text-sm text-gray-500">
              Need help? <a href="/support" className="text-blue-600 hover:text-blue-700">Contact Support</a>
            </p>
          </div>
        )} */}
      </div>
    </div>
  );
};


const DeleteAccountPage = () => {
  const isLoggedIn = useSelector(i => i.isLoggedIn)
  if (!isLoggedIn) return (
    <div className='fixed inset-0 bg-gray-200 z-[9999] overflow-auto login-modal epharma-global d-flex justify-content-center'>
      <div className='max-w-[90rem] my-[5rem] flex-1'>
        <LoginModal />
      </div>
    </div> 
  )
  return <div className='fixed inset-0 bg-gray-200 z-[9999] overflow-auto'><DeleteAccount /></div>
}

const mapStateToProps = (state) => ({})

export default connect(mapStateToProps, {modalAction})(DeleteAccountPage);