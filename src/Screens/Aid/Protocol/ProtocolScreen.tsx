import { RouteProp, useRoute } from '@react-navigation/native';
import { Key, useEffect, useRef, useState } from 'react';
import Footer from '../../../Features/Protocol/Footer';
import Header from '../../../Features/Protocol/Header';
import { MainLayout } from '../../Layout/MainLayout';
import { RootStackParamList } from '../../../Navigations/Navigations';
import ProtocolData from '../../../Features/Protocol/ProtocolData';
import { View } from 'react-native';
import PagerView from 'react-native-pager-view';
import MinimizedProtocolOverlay from '../../../Features/Protocol/MinimizedProtocolOverlay';
import { useProtocol } from '../../../Context/ProtocolContext';
import ProtocolSelectionModal from '../../../Features/Protocol/ProtocolSelectionModal';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export default function ProtocolScreen() {
  const route = useRoute<RouteProp<RootStackParamList, 'Protocol'>>();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { protocolData, title, icon, categoryIndex, onBack } = route.params;

  const categoryData = protocolData?.category || [];
  const categoryNames = categoryData
    .filter((c: { name: string }) => c.name?.trim())
    .map((c: { name: any }) => c.name);

  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(categoryIndex ?? 0);
  const [showProtocolModal, setShowProtocolModal] = useState(false);

  const pagerRef = useRef<PagerView>(null);

  const handleTabSelect = (index: number) => {
    setSelectedCategoryIndex(index);
    pagerRef.current?.setPage(index);
  };

  const { setCurrentProtocol } = useProtocol();

  useEffect(() => {
    setCurrentProtocol(protocolData.id, protocolData, icon);
  }, [protocolData]);

  const protocols = protocolData?.protocols || [];
  const hasMultipleProtocols = protocols.length > 1;

  const handleSelectProtocol = (protocol: any) => {
    navigation.navigate('ProtocolStep', {
      protocolData: {
        ...protocolData,
        selectedProtocol: protocol,
      },
      icon: icon,
    });
  };

  return (
    <MainLayout>
      <Header
        title={title}
        Icon={icon}
        categories={categoryNames}
        selectedCategoryIndex={selectedCategoryIndex}
        onCategorySelect={handleTabSelect}
        onBack={
          onBack ||
          (() => {
            navigation.navigate('MainTabs', { screen: 'Aid' });
          })
        }
      />
      <PagerView
        ref={pagerRef}
        style={{ flex: 1 }}
        initialPage={categoryIndex ?? 0}
        onPageSelected={(e) => {
          setSelectedCategoryIndex(e.nativeEvent.position);
        }}
      >
        {categoryData.map((cat: { sections: any }, index: Key | null | undefined) => (
          <View key={index} style={{ flex: 1, paddingHorizontal: 24, paddingVertical: 24 }}>
            <ProtocolData
              protocolData={{
                ...protocolData,
                sections: cat.sections,
              }}
            />
          </View>
        ))}
      </PagerView>
      <Footer
        protocolData={protocolData}
        icon={icon}
        onChooseProtocol={hasMultipleProtocols ? () => setShowProtocolModal(true) : undefined}
      />
      <View style={{ marginBottom: 16 }}>
        <MinimizedProtocolOverlay />
      </View>

      {hasMultipleProtocols && (
        <ProtocolSelectionModal
          visible={showProtocolModal}
          onClose={() => setShowProtocolModal(false)}
          protocols={protocols}
          onSelectProtocol={handleSelectProtocol}
          protocolTitle={protocolData.title}
        />
      )}
    </MainLayout>
  );
}
