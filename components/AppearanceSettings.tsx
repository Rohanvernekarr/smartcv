import React from 'react';

interface AppearanceSettingsProps {
  settings: {
    theme: string;
    language: string;
    timezone: string;
    dateFormat: string;
  };
  onSettingChange: (key: string, value: string) => void;
}

const AppearanceSettings = ({ settings, onSettingChange }: AppearanceSettingsProps) => {
  return (
    <div className="space-y-6">
      <div>
        <label htmlFor="theme" className="block text-sm font-medium text-gray-700 mb-2">Theme</label>
        <select
          id="theme"
          value={settings.theme}
          onChange={(e) => onSettingChange('theme', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="light">Light</option>
          <option value="dark">Dark</option>
          <option value="auto">Auto (System)</option>
        </select>
      </div>
      
      <div>
        <label htmlFor="language" className="block text-sm font-medium text-gray-700 mb-2">Language</label>
        <select
          id="language"
          value={settings.language}
          onChange={(e) => onSettingChange('language', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="en">English</option>
          <option value="es">Spanish</option>
          <option value="fr">French</option>
          <option value="de">German</option>
          <option value="it">Italian</option>
          <option value="pt">Portuguese</option>
          <option value="ja">Japanese</option>
          <option value="ko">Korean</option>
          <option value="zh">Chinese</option>
        </select>
      </div>
      
      <div>
        <label htmlFor="timezone" className="block text-sm font-medium text-gray-700 mb-2">Timezone</label>
        <select
          id="timezone"
          value={settings.timezone}
          onChange={(e) => onSettingChange('timezone', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="America/Los_Angeles">Pacific Time (PT)</option>
          <option value="America/New_York">Eastern Time (ET)</option>
          <option value="America/Chicago">Central Time (CT)</option>
          <option value="America/Denver">Mountain Time (MT)</option>
          <option value="Europe/London">London (GMT)</option>
          <option value="Europe/Paris">Paris (CET)</option>
          <option value="Asia/Tokyo">Tokyo (JST)</option>
          <option value="Asia/Shanghai">Shanghai (CST)</option>
          <option value="Australia/Sydney">Sydney (AEST)</option>
        </select>
      </div>
      
      <div>
        <label htmlFor="dateFormat" className="block text-sm font-medium text-gray-700 mb-2">Date Format</label>
        <select
          id="dateFormat"
          value={settings.dateFormat}
          onChange={(e) => onSettingChange('dateFormat', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="MM/DD/YYYY">MM/DD/YYYY</option>
          <option value="DD/MM/YYYY">DD/MM/YYYY</option>
          <option value="YYYY-MM-DD">YYYY-MM-DD</option>
          <option value="DD-MM-YYYY">DD-MM-YYYY</option>
        </select>
      </div>
    </div>
  );
};

export default AppearanceSettings; 