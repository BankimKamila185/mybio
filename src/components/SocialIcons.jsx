import React from 'react';
import './SocialIcons.css';

const SocialIcons = ({ links }) => {
    return (
        <div className="social-icons-container">
            {links.map((link, index) => (
                <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-icon-wrapper"
                >
                    {link.icon}
                </a>
            ))}
        </div>
    );
};

export default SocialIcons;
