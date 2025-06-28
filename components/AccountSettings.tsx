import React from 'react';
import { Download, Upload, Trash2 } from 'lucide-react';
import ToggleSwitch from './ToggleSwitch';

interface AccountSettingsProps {
  settings: {
    autoSave: boolean;
    defaultCurrency: string;
  };
  onSettingChange: (key: string, value: string | boolean) => void;
  onExportData: () => void;
}

const AccountSettings = ({ settings, onSettingChange, onExportData }: AccountSettingsProps) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-medium text-gray-700">Auto-save</h3>
          <p className="text-xs text-gray-500">Automatically save your changes</p>
        </div>
        <ToggleSwitch
          checked={settings.autoSave}
          onChange={(checked) => onSettingChange('autoSave', checked)}
          label=""
        />
      </div>
      
      <div>
        <label htmlFor="defaultCurrency" className="block text-sm font-medium text-gray-700 mb-2">Default Currency</label>
        <select
          id="defaultCurrency"
          value={settings.defaultCurrency}
          onChange={(e) => onSettingChange('defaultCurrency', e.target.value)}
          className="w-full px-3 py-2 border text-gray-700 border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-200 focus:border-transparent"
        >
          <option value="USD">USD - US Dollar</option>
          <option value="EUR">EUR - Euro</option>
          <option value="GBP">GBP - British Pound</option>
          <option value="JPY">JPY - Japanese Yen</option>
          <option value="CAD">CAD - Canadian Dollar</option>
          <option value="AUD">AUD - Australian Dollar</option>
        </select>
      </div>
      
      <div className="border-t pt-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Data Management</h3>
        <div className="space-y-4">
          <button
            onClick={onExportData}
            className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <Download className="h-4 w-4 mr-2" />
            Export My Data
          </button>
          <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Upload className="h-4 w-4 mr-2" />
            Import Data
          </button>
        </div>
      </div>
      
      <div className="border-t pt-6">
        <h3 className="text-lg font-medium text-red-600 mb-4">Danger Zone</h3>
        <div className="space-y-4">
          <div className="p-4 border border-red-200 rounded-lg bg-red-50">
            <h4 className="text-sm font-medium text-red-800 mb-2">Delete Account</h4>
            <p className="text-sm text-red-600 mb-4">
              Once you delete your account, there is no going back. Please be certain.
            </p>
            <button className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
              <Trash2 className="h-4 w-4 mr-2" />
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSettings; 