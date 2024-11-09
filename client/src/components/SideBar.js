import React from 'react';
import ChatIcon from '@mui/icons-material/Chat';
import GroupIcon from '@mui/icons-material/Group';
import ExtensionIcon from '@mui/icons-material/Extension';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import SettingsIcon from '@mui/icons-material/Settings';
import BoltIcon from '@mui/icons-material/Bolt'; // New Lightning icon
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faComments } from '@fortawesome/free-solid-svg-icons';
import './style.css';

function Sidebar() {
    return (
        <div className="sidebar">
            <h2 className="headig mb-5">
                <BoltIcon sx={{ color: 'purple', fontSize: 30 }} /> Superpage
            </h2>
            <ul>
                <li className='active'><ChatIcon /> AI chat</li>
                <li><GroupIcon /> Members</li>
                <li><ExtensionIcon /> Integrations</li>
                <li><PersonAddIcon /> Refer Friends</li>
                <li><AttachMoneyIcon /> Pricing Plans</li>
                <li><SettingsIcon /> Settings</li>
            </ul>
        </div>
    );
}

export default Sidebar;
