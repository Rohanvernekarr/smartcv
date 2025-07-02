import React from 'react';
import { User, Shield, Bell, Palette, Key, Database } from 'lucide-react';

interface SettingsTab {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface SettingsSidebarProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

const SettingsSidebar = ({ activeTab, onTabChange }: SettingsSidebarProps) => {
  const settingsTabs: SettingsTab[] = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'privacy', label: 'Privacy', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'security', label: 'Security', icon: Key },
    { id: 'account', label: 'Account', icon: Database }
  ];

  return (
    <div className="w-64 bg-gray-50 border-r border-gray-200 p-6">
      <nav className="space-y-2">
        {settingsTabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors ${
                activeTab === tab.id
                  ? 'bg-blue-100 text-blue-700 border border-blue-200'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Icon className="h-5 w-5 mr-3" />
              {tab.label}
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default SettingsSidebar; 