import React from 'react';
import ToggleSwitch from '../ToggleSwitch';

interface NotificationSettingsProps {
  settings: {
    emailNotifications: boolean;
    pushNotifications: boolean;
    smsNotifications: boolean;
    marketingEmails: boolean;
    securityAlerts: boolean;
    activityDigest: string;
  };
  onSettingChange: (key: string, value: string | boolean) => void;
}

const NotificationSettings = ({ settings, onSettingChange }: NotificationSettingsProps) => {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <ToggleSwitch
          checked={settings.emailNotifications}
          onChange={(checked) => onSettingChange('emailNotifications', checked)}
          label="Email Notifications"
          description="Receive notifications via email"
        />
        
        <ToggleSwitch
          checked={settings.pushNotifications}
          onChange={(checked) => onSettingChange('pushNotifications', checked)}
          label="Push Notifications"
          description="Receive push notifications on your devices"
        />
        
        <ToggleSwitch
          checked={settings.smsNotifications}
          onChange={(checked) => onSettingChange('smsNotifications', checked)}
          label="SMS Notifications"
          description="Receive notifications via text message"
        />
        
        <ToggleSwitch
          checked={settings.marketingEmails}
          onChange={(checked) => onSettingChange('marketingEmails', checked)}
          label="Marketing Emails"
          description="Receive promotional and marketing emails"
        />
        
        <ToggleSwitch
          checked={settings.securityAlerts}
          onChange={(checked) => onSettingChange('securityAlerts', checked)}
          label="Security Alerts"
          description="Important security and login notifications"
        />
      </div>
      
      <div>
        <label htmlFor="activityDigest" className="block text-sm font-medium text-gray-700 mb-2">Activity Digest</label>
        <select
          id="activityDigest"
          value={settings.activityDigest}
          onChange={(e) => onSettingChange('activityDigest', e.target.value)}
          className="w-full px-3 py-2 border text-gray-700 border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-200 focus:border-transparent"
        >
          <option value="never">Never</option>
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </select>
      </div>
    </div>
  );
};

export default NotificationSettings; 