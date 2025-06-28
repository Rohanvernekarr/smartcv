import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import ToggleSwitch from './ToggleSwitch';

interface SecuritySettingsProps {
  settings: {
    twoFactorAuth: boolean;
    loginAlerts: boolean;
    sessionTimeout: string;
  };
  onSettingChange: (key: string, value: string | boolean) => void;
}

const SecuritySettings = ({ settings, onSettingChange }: SecuritySettingsProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <ToggleSwitch
          checked={settings.twoFactorAuth}
          onChange={(checked) => onSettingChange('twoFactorAuth', checked)}
          label="Two-Factor Authentication"
          description="Add an extra layer of security to your account"
        />
        
        <ToggleSwitch
          checked={settings.loginAlerts}
          onChange={(checked) => onSettingChange('loginAlerts', checked)}
          label="Login Alerts"
          description="Get notified when someone logs into your account"
        />
      </div>
      
      <div>
        <label htmlFor="sessionTimeout" className="block text-sm font-medium text-gray-700 mb-2">Session Timeout</label>
        <select
          id="sessionTimeout"
          value={settings.sessionTimeout}
          onChange={(e) => onSettingChange('sessionTimeout', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="15">15 minutes</option>
          <option value="30">30 minutes</option>
          <option value="60">1 hour</option>
          <option value="120">2 hours</option>
          <option value="480">8 hours</option>
          <option value="1440">24 hours</option>
        </select>
      </div>
      
      <div className="border-t pt-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Change Password</h3>
        <div className="space-y-4">
          <div>
            <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
            <div className="relative">
              <input
                id="currentPassword"
                type={showPassword ? 'text' : 'password'}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-10"
                placeholder="Enter current password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="h-4 w-4 text-gray-400" /> : <Eye className="h-4 w-4 text-gray-400" />}
              </button>
            </div>
          </div>
          <div>
            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
            <input
              id="newPassword"
              type="password"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter new password"
            />
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
            <input
              id="confirmPassword"
              type="password"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Confirm new password"
            />
          </div>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Update Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default SecuritySettings; 