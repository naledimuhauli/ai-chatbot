import React from 'react';
import ChatIcon from '@mui/icons-material/Chat';
import GroupIcon from '@mui/icons-material/Group';
import ExtensionIcon from '@mui/icons-material/Extension';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import SettingsIcon from '@mui/icons-material/Settings';

function Sidebar() {
    return (
        <div className="sidebar">
            <h2 className="headig">Superpage</h2>
            <ul>
                <li><ChatIcon /> Chat</li>
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
