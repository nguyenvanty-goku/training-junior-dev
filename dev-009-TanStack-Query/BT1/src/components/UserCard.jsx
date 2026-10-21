import React from 'react';
import { Mail, Phone, Globe, Building } from 'lucide-react';

export const UserCard = ({ user }) => {
  return (
    <div className="user-card">
      <div className="user-avatar">
        {user.name.charAt(0)}
      </div>

      <div className="user-info">
        <h4 className="user-name">{user.name}</h4>
        <span className="user-username">@{user.username}</span>

        <div className="user-meta">
          <div className="meta-item">
            <Mail size={14} />
            <span>{user.email}</span>
          </div>
          <div className="meta-item">
            <Phone size={14} />
            <span>{user.phone}</span>
          </div>
          <div className="meta-item">
            <Globe size={14} />
            <span>{user.website}</span>
          </div>
          <div className="meta-item">
            <Building size={14} />
            <span>{user.company?.name}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
