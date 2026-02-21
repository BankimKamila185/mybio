import React from 'react';
import './LinkCard.css';

const LinkCard = ({ link, index }) => {
    const { type, title, content, url, image } = link;

    // Stagger animation based on array index
    const staggerStyle = { '--stagger': index };

    if (type === 'split-whatsapp' || type === 'split-email') {
        const isWhatsapp = type === 'split-whatsapp';
        return (
            <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className={`bento-card contact-card staggered-enter ${isWhatsapp ? 'whatsapp-card' : 'email-card'}`}
                style={staggerStyle}
            >
                <div>
                    <div className="contact-icon">
                        {isWhatsapp ? (
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                        ) : (
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                        )}
                    </div>
                    <h3>{title}</h3>
                </div>
                <div className="contact-pill">{content}</div>
            </a>
        );
    }

    if (type === 'image-dark') {
        return (
            <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="bento-card image-link-card staggered-enter"
                style={staggerStyle}
            >
                <div className="ig-info">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                    <h3>{title}</h3>
                    <p>{content}</p>
                </div>
                {image && (
                    <div className="ig-avatar">
                        <img src={image} alt={title} />
                    </div>
                )}
            </a>
        );
    }

    // Default to 'simple' thin horizontal link
    return (
        <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="bento-card simple-link-card staggered-enter"
            style={staggerStyle}
        >
            <div className="link-icon-circle">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>
            </div>
            <span className="link-text">{title}</span>
        </a>
    );
};

export default LinkCard;
