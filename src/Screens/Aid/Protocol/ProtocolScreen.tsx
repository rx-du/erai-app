import { RouteProp, useRoute } from '@react-navigation/native';
import Footer from '../../../Features/Protocol/Footer';
import Header from '../../../Features/Protocol/Header';
import { MainLayout } from '../../Layout/MainLayout';
import { RootStackParamList } from '../../../Navigations/Navigations';
import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';

export default function ProtocolScreen() {
  const route = useRoute<RouteProp<RootStackParamList>>();

  return (
    <MainLayout>
      <Header title="TEST" />
      <Footer />
    </MainLayout>
  );
}
