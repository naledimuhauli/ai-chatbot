import React from 'react';
// import { AiOutlineMessage } from 'react-icons/ai';
// import { FaUserPlus} from 'react-icons/fa';
// import { MdExtension } from 'react-icons/md';
// import { FiSettings } from 'react-icons/fi';
// import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
// import GroupIcon from '@mui/icons-material/Group';
// import { FaPaperPlane } from 'react-icons/fa';
import { GoArrowSwitch } from "react-icons/go";
import { TbCurrencyDollar } from "react-icons/tb";
import { IoChatbubbleOutline } from "react-icons/io5";
import { RiSettingsLine, RiGroupLine } from "react-icons/ri";
import { CiShare2 } from "react-icons/ci";
// import SettingsIcon from '@mui/icons-material/Settings';
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
                <li className='active'><IoChatbubbleOutline /> AI chat</li>
                <li><RiGroupLine /> Members</li>
                <li><GoArrowSwitch /> Integrations</li>
                <li><CiShare2 /> Refer Friends</li>
                <li><TbCurrencyDollar /> Pricing Plans</li>
                <li><RiSettingsLine /> Settings</li>
            </ul>
        </div>
    );
}

export default Sidebar;
