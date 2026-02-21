import React from 'react';
import './LinkCard.css';

const SocialIcon = ({ id }) => {
    switch (id) {
        case 'linkedin':
            return <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>;
        case 'github':
            return <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>;
        case 'discord':
            return <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 11a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"></path><path d="M15 11a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"></path><path d="M9 16c1.5-1 4.5-1 6 0"></path><path d="M18.16 5.84l-.56-.56c-1.3-1.3-3.07-2-4.9-2h-1.4c-1.83 0-3.6.7-4.9 2l-.56.56C5.03 6.65 4.5 7.6 4.5 8.6v6.8c0 1 .53 1.95 1.34 2.76l.56.56c1.3 1.3 3.07 2 4.9 2h1.4c1.83 0 3.6-.7 4.9-2l.56-.56c.81-.81 1.34-1.76 1.34-2.76V8.6c0-1-.53-1.95-1.34-2.76z"></path></svg>;
        case 'x':
            return <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"></path></svg>;
        case 'instagram':
        default:
            return <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>;
    }
};

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

    if (type === 'image-dark' || type === 'social-card') {
        return (
            <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="bento-card image-link-card staggered-enter"
                style={staggerStyle}
            >
                <div className="ig-info">
                    <SocialIcon id={link.id} />
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
