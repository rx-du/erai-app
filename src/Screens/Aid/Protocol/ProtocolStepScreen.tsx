import { useRoute, RouteProp } from '@react-navigation/core';
import ProtocolStepFlow from '../../../Features/Protocol/ProtocolStepFlow';
import { RootStackParamList } from '../../../Navigations/Navigations';
import { MainLayout } from '../../Layout/MainLayout';

export default function ProtocolStepScreen() {
  const route = useRoute<RouteProp<RootStackParamList, 'ProtocolStep'>>();
  const { protocolData } = route.params;

  return (
    <MainLayout>
      <ProtocolStepFlow protocolData={protocolData} />
    </MainLayout>
  );
}
