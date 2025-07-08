'use client';
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../components/AuthProvider';
import { useRouter } from 'next/navigation';
import { supabase } from '../../lib/supabaseClient';
import SettingsHeader from '../../components/settings/SettingsHeader';
import SettingsSidebar from '../../components/settings/SettingsSidebar';
import ProfileSettings from '../../components/settings/ProfileSettings';
import PrivacySettings from '../../components/settings/PrivacySettings';
import NotificationSettings from '../../components/settings/NotificationSettings';
import AppearanceSettings from '../../components/settings/AppearanceSettings';
import SecuritySettings from '../../components/settings/SecuritySettings';
import AccountSettings from '../../components/settings/AccountSettings';
import { Save } from 'lucide-react';

export default function SettingsPage() {
  const { user, loading } = useAuth() || {};
  const router = useRouter();
  
  // Settings state
  const [activeTab, setActiveTab] = useState('profile');
  const [settings, setSettings] = useState({
    // Profile settings
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    bio: '',
    location: '',
    website: '',
    
    // Privacy settings
    profileVisibility: 'public',
    showEmail: false,
    showPhone: false,
    allowSearchEngines: true,
    dataCollection: true,
    
    // Notification settings
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    marketingEmails: false,
    securityAlerts: true,
    activityDigest: 'weekly',
    
    // Appearance settings
    theme: 'light',
    language: 'en',
    timezone: 'America/Los_Angeles',
    dateFormat: 'MM/DD/YYYY',
    
    // Security settings
    twoFactorAuth: false,
    loginAlerts: true,
    sessionTimeout: '30',
    
    // Account settings
    autoSave: true,
    defaultCurrency: 'USD'
  });

  // Fetch user profile from database
  useEffect(() => {
    async function fetchUserProfile() {
      if (user) {
        try {
          const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .single();

          if (error) {
            console.error('Error fetching profile:', error);
          } else if (data) {
            setSettings(prev => ({
              ...prev,
              firstName: data.first_name || '',
              lastName: data.last_name || '',
              email: data.email || user.email || '',
            }));
          }
        } catch (error) {
          console.error('Error fetching profile:', error);
        }
      }
    }

    fetchUserProfile();
  }, [user]);

  React.useEffect(() => {
    if (!loading && !user) router.replace('/login');
  }, [user, loading, router]);

  if (loading) return <div className="p-8">Loading...</div>;
  if (!user) return null;

  const handleSettingChange = (key: string, value: unknown) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    if (user) {
      try {
        // Update profile in database
        const { error } = await supabase
          .from('profiles')
          .upsert([
            {
              id: user.id,
              email: settings.email,
              first_name: settings.firstName,
              last_name: settings.lastName,
              full_name: `${settings.firstName} ${settings.lastName}`.trim(),
              updated_at: new Date().toISOString()
            }
          ], {
            onConflict: 'id'
          });

        if (error) {
          console.error('Error saving profile:', error);
          alert('Error saving settings. Please try again.');
        } else {
          alert('Settings saved successfully!');
        }
      } catch (error) {
        console.error('Error saving settings:', error);
        alert('Error saving settings. Please try again.');
      }
    }
  };

  const handleExportData = () => {
    const dataStr = JSON.stringify(settings, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = 'user-settings.json';
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  let sectionContent = null;
  switch (activeTab) {
    case 'profile':
      sectionContent = (
        <ProfileSettings settings={settings} onSettingChange={handleSettingChange} />
      );
      break;
    case 'privacy':
      sectionContent = (
        <PrivacySettings settings={settings} onSettingChange={handleSettingChange} />
      );
      break;
    case 'notifications':
      sectionContent = (
        <NotificationSettings settings={settings} onSettingChange={handleSettingChange} />
      );
      break;
    case 'appearance':
      sectionContent = (
        <AppearanceSettings settings={settings} onSettingChange={handleSettingChange} />
      );
      break;
    case 'security':
      sectionContent = (
        <SecuritySettings settings={settings} onSettingChange={handleSettingChange} />
      );
      break;
    case 'account':
      sectionContent = (
        <AccountSettings settings={settings} onSettingChange={handleSettingChange} onExportData={handleExportData} />
      );
      break;
    default:
      sectionContent = (
        <ProfileSettings settings={settings} onSettingChange={handleSettingChange} />
      );
  }

  return (
    <div className="w-full min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-2 sm:px-4 ">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <SettingsHeader />
          <div className="flex flex-col md:flex-row">
            <SettingsSidebar activeTab={activeTab} onTabChange={setActiveTab} />
            <div className="block md:hidden border-b border-gray-200 mx-4" />
            <div className="flex-1 p-4 sm:p-8">
              <div className="max-w-2xl">
                <div className="mb-6">
                  <h2 className="text-2xl font-semibold text-gray-900 capitalize">
                    {activeTab} Settings
                  </h2>
                  <p className="text-gray-600 mt-1">
                    Customize your {activeTab} preferences and options.
                  </p>
                </div>
                <div className="bg-white">{sectionContent}</div>
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-500">
                      Changes are saved automatically when you make them.
                    </p>
                    <button
                      onClick={handleSave}
                      className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}