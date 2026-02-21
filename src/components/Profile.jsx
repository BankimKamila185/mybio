import React, { useState } from 'react';
import './Profile.css';

const Profile = ({ name, bio }) => {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <div className="profile-container">
      <div className="avatar-wrapper">
        <img
          src="/profile.png"
          alt="Profile Avatar"
          className={`avatar ${imageFailed ? 'fallback-avatar' : 'real-avatar'}`}
          onError={(e) => {
            if (!imageFailed) {
              setImageFailed(true);
              e.target.src = "https://ui-avatars.com/api/?name=Bankim+Kamila&background=030508&color=2be8b7&size=400&font-size=0.33&bold=true";
            }
          }}
        />
        <div className="avatar-glow"></div>
      </div>

      {/* Name and bio overlaying the bottom fade of the image */}
      <div className="profile-text-overlay">
        <h1 className="profile-name">{name}</h1>
        <p className="profile-bio">{bio}</p>
      </div>
    </div>
  );
};

export default Profile;
