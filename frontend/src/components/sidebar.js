import React from 'react';
import './sidebar.css';

const sidebar = () => {
    return (
        <div className = "sidebar">
            <div className = "sidebar-content">
                <button>Home</button>
                <button>Labs</button>
                <button>Medication</button>
                <button>Messages</button>
            </div>
        </div>
    );
};

export default sidebar;