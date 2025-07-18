import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { sidebarLinks } from '../../../data/sidebarLinks';
import SidebarLink from './SidebarLink';
import { logout } from '../../../servises/operation/AuthApi';
import { useNavigate } from 'react-router-dom';
import { VscSignOut, VscSettingsGear } from 'react-icons/vsc';

import  ConfirmationModal from '../../commen/ConfirmationModal'
const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading: profileLoading } = useSelector((state) => state.profile);
  const { loading: authLoading } = useSelector((state) => state.auth);
  const [confirmationModal, setConfirmationModal] = useState(null);

  if (profileLoading || authLoading) {
    return <div className="mt-10 text-white text-center">Loading...</div>;
  }

  return (
    <div className="flex min-w-[220px] flex-col justify-start gap-4 border-r border-richblack-700 h-[calc(100vh-3.5rem)] bg-[#161D29] py-6">
      
    
      <div className="flex flex-col gap-1">
        {sidebarLinks.map((link) => {
          if (link.type && user?.accountType !== link.type) return null;
          return <SidebarLink key={link.id} link={link} iconName={link.icon} />;
        })}
      </div>

  
      <div className="mx-3 my-4 h-px bg-[#424854]"></div>

     
      <div className="flex flex-col gap-1 px-1">
        <SidebarLink
          link={{ name: 'Settings', path: '/dashboard/settings' }}
          iconName="VscSettingsGear"
        />
      </div>

      
      <div className="mt-auto px-6">
        <button
          onClick={() =>
            setConfirmationModal({
              text: 'Are you sure?',
              text2: 'You will be logged out of your account',
              btn2Text: 'Cancel',
              btnText:"Log out",
              btnHandler: () => dispatch(logout(navigate)),
              btn2Handler: () => setConfirmationModal(null),
            })
          }
          className="flex items-center gap-x-2 text-sm font-medium text-gray-200 hover:bg-[#424854] px-2 py-2 w-full transition-all"
        >
          <VscSignOut className="text-lg" />
          <span>Log Out</span>
        </button>
      </div>

      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </div>
  );
};

export default Sidebar;
