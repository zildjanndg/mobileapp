import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Database,
  Trash2,
  Info,
  Shield,
  Smartphone,
  ChevronRight,
} from 'lucide-react-native';
import { dataService } from '@/services/dataService';

export default function Settings() {
  const handleClearAllData = () => {
    Alert.alert(
      'Clear All Data',
      'This will permanently delete all your data items. This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear All Data',
          style: 'destructive',
          onPress: async () => {
            try {
              // Note: This is a basic implementation
              // In a real app, you'd want to implement a proper clear all function
              Alert.alert('Info', 'Clear all data functionality would be implemented here');
            } catch (error) {
              Alert.alert('Error', 'Failed to clear data');
            }
          },
        },
      ]
    );
  };

  const showAbout = () => {
    Alert.alert(
      'About Firebase Data App',
      'Version 1.0.0\n\nA centralized data management application built with React Native, Expo, and Firebase.\n\nThis app demonstrates real-time data synchronization, CRUD operations, and modern mobile UI design patterns.'
    );
  };

  const SettingsItem = ({ icon: Icon, title, subtitle, onPress, danger = false }: any) => (
    <TouchableOpacity style={styles.settingsItem} onPress={onPress}>
      <View style={styles.settingsItemLeft}>
        <View style={[styles.settingsItemIcon, danger && styles.dangerIcon]}>
          <Icon size={20} color={danger ? '#ef4444' : '#2563eb'} />
        </View>
        <View style={styles.settingsItemText}>
          <Text style={[styles.settingsItemTitle, danger && styles.dangerText]}>
            {title}
          </Text>
          {subtitle && (
            <Text style={styles.settingsItemSubtitle}>{subtitle}</Text>
          )}
        </View>
      </View>
      <ChevronRight size={20} color="#9ca3af" />
    </TouchableOpacity>
  );

  const SettingsSection = ({ title, children }: any) => (
    <View style={styles.settingsSection}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.sectionContent}>{children}</View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Settings</Text>
          <Text style={styles.subtitle}>Manage your app preferences</Text>
        </View>

        <SettingsSection title="Data Management">
          <SettingsItem
            icon={Database}
            title="Firebase Configuration"
            subtitle="Configure your Firebase connection"
            onPress={() => Alert.alert('Info', 'Firebase configuration would be handled here')}
          />
          <SettingsItem
            icon={Trash2}
            title="Clear All Data"
            subtitle="Permanently delete all stored data"
            onPress={handleClearAllData}
            danger
          />
        </SettingsSection>

        <SettingsSection title="Security & Privacy">
          <SettingsItem
            icon={Shield}
            title="Data Privacy"
            subtitle="Learn how your data is protected"
            onPress={() => Alert.alert(
              'Data Privacy',
              'Your data is stored securely in Firebase Firestore with proper security rules. All data transmission is encrypted, and access is controlled through Firebase Authentication.'
            )}
          />
        </SettingsSection>

        <SettingsSection title="App Information">
          <SettingsItem
            icon={Smartphone}
            title="App Version"
            subtitle="1.0.0"
            onPress={() => {}}
          />
          <SettingsItem
            icon={Info}
            title="About"
            subtitle="Learn more about this app"
            onPress={showAbout}
          />
        </SettingsSection>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Firebase Data Management App
          </Text>
          <Text style={styles.footerSubtext}>
            Built with React Native & Firebase
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingBottom: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
  },
  settingsSection: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 12,
    paddingHorizontal: 20,
  },
  sectionContent: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    marginHorizontal: 20,
    overflow: 'hidden',
  },
  settingsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  settingsItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingsItemIcon: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: '#eff6ff',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  dangerIcon: {
    backgroundColor: '#fef2f2',
  },
  settingsItemText: {
    flex: 1,
  },
  settingsItemTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1f2937',
    marginBottom: 2,
  },
  dangerText: {
    color: '#ef4444',
  },
  settingsItemSubtitle: {
    fontSize: 14,
    color: '#6b7280',
  },
  footer: {
    alignItems: 'center',
    padding: 40,
    paddingTop: 20,
  },
  footerText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 4,
  },
  footerSubtext: {
    fontSize: 14,
    color: '#9ca3af',
  },
});