import React from 'react';
import ToggleSwitch from './ToggleSwitch';

interface PrivacySettingsProps {
  settings: {
    profileVisibility: string;
    showEmail: boolean;
    showPhone: boolean;
    allowSearchEngines: boolean;
    dataCollection: boolean;
  };
  onSettingChange: (key: string, value: string | boolean) => void;
}

const PrivacySettings = ({ settings, onSettingChange }: PrivacySettingsProps) => {
  return (
    <div className="space-y-6">
      <div>
        <label htmlFor="profileVisibility" className="block text-sm font-medium text-gray-700 mb-2">Profile Visibility</label>
        <select
          id="profileVisibility"
          value={settings.profileVisibility}
          onChange={(e) => onSettingChange('profileVisibility', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="public">Public</option>
          <option value="friends">Friends Only</option>
          <option value="private">Private</option>
        </select>
      </div>
      
      <div className="space-y-4">
        <ToggleSwitch
          checked={settings.showEmail}
          onChange={(checked) => onSettingChange('showEmail', checked)}
          label="Show Email"
          description="Display your email on your public profile"
        />
        
        <ToggleSwitch
          checked={settings.showPhone}
          onChange={(checked) => onSettingChange('showPhone', checked)}
          label="Show Phone"
          description="Display your phone number on your public profile"
        />
        
        <ToggleSwitch
          checked={settings.allowSearchEngines}
          onChange={(checked) => onSettingChange('allowSearchEngines', checked)}
          label="Allow Search Engine Indexing"
          description="Let search engines index your profile"
        />
        
        <ToggleSwitch
          checked={settings.dataCollection}
          onChange={(checked) => onSettingChange('dataCollection', checked)}
          label="Data Collection"
          description="Allow us to collect usage data to improve your experience"
        />
      </div>
    </div>
  );
};

export default PrivacySettings; 