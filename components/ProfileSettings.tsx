import React from 'react';

interface ProfileSettingsProps {
  settings: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    bio: string;
    location: string;
    website: string;
  };
  onSettingChange: (key: string, value: string) => void;
}

const ProfileSettings = ({ settings, onSettingChange }: ProfileSettingsProps) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
          <input
            id="firstName"
            type="text"
            value={settings.firstName}
            onChange={(e) => onSettingChange('firstName', e.target.value)}
            className="w-full px-3 py-2 border text-gray-700 border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-200 focus:border-transparent"
            placeholder="Enter your first name"
          />
        </div>
        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
          <input
            id="lastName"
            type="text"
            value={settings.lastName}
            onChange={(e) => onSettingChange('lastName', e.target.value)}
            className="w-full px-3 py-2 border text-gray-700 border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-200 focus:border-transparent"
            placeholder="Enter your last name"
          />
        </div>
      </div>
      
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email</label>
        <input
          id="email"
          type="email"
          value={settings.email}
          onChange={(e) => onSettingChange('email', e.target.value)}
          className="w-full px-3 py-2 border text-gray-700 border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-200 focus:border-transparent"
          placeholder="Enter your email address"
        />
      </div>
      
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
        <input
          id="phone"
          type="tel"
          value={settings.phone}
          onChange={(e) => onSettingChange('phone', e.target.value)}
          className="w-full px-3 py-2 border text-gray-700 border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-200 focus:border-transparent"
          placeholder="Enter your phone number"
        />
      </div>
      
      <div>
        <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
        <textarea
          id="bio"
          value={settings.bio}
          onChange={(e) => onSettingChange('bio', e.target.value)}
          rows={3}
          className="w-full px-3 py-2 border text-gray-700 border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-200 focus:border-transparent"
          placeholder="Tell us about yourself"
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">Location</label>
          <input
            id="location"
            type="text"
            value={settings.location}
            onChange={(e) => onSettingChange('location', e.target.value)}
            className="w-full px-3 py-2 border text-gray-700 border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-200 focus:border-transparent"
            placeholder="Enter your location"
          />
        </div>
        <div>
          <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-2">Website</label>
          <input
            id="website"
            type="url"
            value={settings.website}
            onChange={(e) => onSettingChange('website', e.target.value)}
            className="w-full px-3 py-2 border text-gray-700 border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-200 focus:border-transparent"
            placeholder="Enter your website URL"
          />
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings; 