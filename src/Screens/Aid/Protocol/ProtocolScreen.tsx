import { RouteProp, useRoute } from '@react-navigation/native';
import Footer from '../../../Features/Protocol/Footer';
import Header from '../../../Features/Protocol/Header';
import { MainLayout } from '../../Layout/MainLayout';
import { RootStackParamList } from '../../../Navigations/Navigations';
import ProtocolData from '../../../Features/Protocol/ProtocolData';
import { View } from 'react-native';

export default function ProtocolScreen() {
  const route = useRoute<RouteProp<RootStackParamList, 'Protocol'>>();
  const { protocolData, title, icon } = route.params;

  return (
    <MainLayout>
      <Header title={title} Icon={icon} />
      <View style={{ paddingHorizontal: 24 }}>
        <ProtocolData protocolData={protocolData} />
      </View>
      <Footer protocolData={protocolData} />
    </MainLayout>
  );
}
