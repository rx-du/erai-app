import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Switch } from 'react-native';
import { useTheme } from '../../Theme/ThemeContext';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { MainLayout } from '../Layout/MainLayout';

export default function AccountScreen({ navigation }: any) {
  const { theme, toggleTheme } = useTheme();
  const [email, setEmail] = React.useState('');

  useEffect(() => {
    const checkUser = async () => {
      try {
        const user = await GoogleSignin.getCurrentUser();
        if (user?.user?.email) {
          setEmail(user.user.email);
        }
      } catch (e) {
        console.log('Not logged in');
      }
    };
    checkUser();
  }, []);

  const handleLogout = async () => {
    await GoogleSignin.revokeAccess();
    await GoogleSignin.signOut();

    navigation.replace('Welcome');
  };

  return (
    <MainLayout>
      <View style={styles.container}>
        <Text style={styles.title}>Account</Text>

        <Text style={styles.subtitle}>
          You are logged in as{'\n'}
          <Text style={styles.email}>{email}</Text>
        </Text>

        <TouchableOpacity onPress={handleLogout}>
          <Text style={styles.logout}>Log out</Text>
        </TouchableOpacity>

        <Switch value={theme === 'dark'} onValueChange={toggleTheme} />
      </View>
    </MainLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 80,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#000',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 15,
    color: '#555',
    marginBottom: 32,
  },
  email: {
    color: '#000',
    fontWeight: '500',
  },
  logout: {
    color: '#E53935',
    fontSize: 16,
    fontWeight: '600',
  },
});
