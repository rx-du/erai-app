import React, { useState, useEffect, useRef } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import Sound from 'react-native-sound';
import Video, { VideoRef } from 'react-native-video';
import { useTranslation } from 'react-i18next';
import { footerStyle, stepFlowStyle } from './Styles';
import { useTheme } from '../../Theme/ThemeContext';
import { useProtocol } from '../../Context/ProtocolContext';
import VideoIcon from '../../Icons/video.svg';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../Navigations/Navigations';
import PagerView from 'react-native-pager-view';

import PointsIcon from '../../Icons/points.svg';
import DownArrow from '../../Icons/arrow-down.svg';
import RightArrow from '../../Icons/arrow-right.svg';
import LeftArrow from '../../Icons/arrow-left.svg';
import { NoHandsModeModal } from '../Emergency/NoHandsModeModal';
import ProtocolMenu from './ProtocolMenu';
import { CustomModal } from '../../Components/CustomModal';
import { CustomButton } from '../../Components/CustomButton';
import { getProtocolData } from '../../i18n/utils/getProtocolData';
import i18n from '../../i18n';
import CPRIcon from '../../Icons/cpr-24.svg';
import StepCompletedIcon from '../../Icons/step_completed.svg';
import PhoneIcon from '../../Icons/phone-filled-24.svg';
import Arrow from '../../Icons/arrow-protocol.svg';

type ProtocolStepFlowProps = {
  protocolData: any;
  icon: any;
};

const MEDIA_MAP: Record<string, any> = {
  'ADULT_CPR.mp4': require('../../i18n/locales/protocols/en/ADULT_CPR.mp4'),
};

export default function ProtocolStepFlow({ protocolData, icon: Icon }: ProtocolStepFlowProps) {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const {
    protocolState,
    setProtocolMinimized,
    setCurrentProtocol,
    setCurrentStepIndex: setGlobalStepIndex,
    addCompletedStep,
    removeCompletedStep,
    clearProtocol,
    setCompressions,
  } = useProtocol();

  const [isPlaying, setIsPlaying] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const audioRef = useRef<Sound | null>(null);
  const videoRef = useRef<VideoRef>(null);
  const pagerRef = useRef<PagerView>(null);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [showNoHandModeModal, setShowNoHandModeModal] = useState(false);

  const protocolId = protocolData?.id || protocolData?.title;

  useEffect(() => {
    setCurrentProtocol(protocolId, protocolData, Icon);
  }, [protocolId]);

  const currentStepIndex = protocolState.currentStepIndex;
  const completedSteps = protocolState.completedSteps;
  const isMinimized = protocolState.isMinimized;

  const handleMinimize = (shouldNavigateBack = true) => {
    setProtocolMinimized(true);

    if (shouldNavigateBack) {
      navigation.goBack();
    }
  };

  const [showFinishProtocolModal, setShowFinishProtocolModal] = useState(false);
  const handleFinishProtocolModalCancel = () => {
    setShowFinishProtocolModal(false);
    clearProtocol();

    navigation.navigate('Protocol', {
      protocolData: protocolData,
      title: protocolData.title,
      icon: Icon,
    });
  };

  const selectedProtocol = protocolData?.selectedProtocol;
  const currentProtocol = selectedProtocol || protocolData?.steps?.[0];
  const steps = selectedProtocol ? selectedProtocol.steps : currentProtocol?.steps || [];
  const currentStep = steps[currentStepIndex];
  const totalSteps = steps.length;

  const isCPR = protocolData?.id === 'CPR';

  const isVideoFile = currentStep?.video !== null;

  const handleNext = () => {
    if (currentStepIndex < totalSteps - 1) {
      pagerRef.current?.setPage(currentStepIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStepIndex > 0) {
      pagerRef.current?.setPage(currentStepIndex - 1);
    }
  };

  const handlePageSelected = (e: any) => {
    const newIndex = e.nativeEvent.position;
    setGlobalStepIndex(newIndex);
    setIsPlaying(false);
  };

  const handleStepComplete = () => {
    if (!completedSteps.includes(currentStep.id)) {
      addCompletedStep(currentStep.id);
    }
    if (currentStepIndex < totalSteps - 1) {
      handleNext();
    } else {
      setShowFinishProtocolModal(true);
    }
  };

  useEffect(() => {
    Sound.setCategory('Playback');

    return () => {
      if (audioRef.current) {
        audioRef.current.release();
        audioRef.current = null;
      }
    };
  }, []);

  const handlePlayMedia = () => {
    if (!currentStep?.video) {
      return;
    }

    const mediaFile = MEDIA_MAP[currentStep.video];

    if (isVideoFile) {
      setIsPlaying(!isPlaying);
    } else {
      if (audioRef.current) {
        if (isPlaying) {
          audioRef.current.pause();
          setIsPlaying(false);
        } else {
          audioRef.current.play((success: boolean) => {
            if (!success) {
              console.error('Audio playback failed');
              setIsPlaying(false);
            }
          });
          setIsPlaying(true);
        }
      } else {
        const sound = new Sound(mediaFile, (error: Error | null) => {
          if (error) {
            console.error('Failed to load audio', error);
            return;
          }

          audioRef.current = sound;
          sound.play((success: boolean) => {
            if (success) {
              setIsPlaying(false);
              sound.release();
              audioRef.current = null;
            } else {
              console.error('Audio playback failed');
              setIsPlaying(false);
            }
          });
          setIsPlaying(true);
        });
      }
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.stop(() => {
        if (audioRef.current) {
          audioRef.current.release();
          audioRef.current = null;
        }
      });
    }
    setIsPlaying(false);
  }, [currentStepIndex]);

  const isStepCompleted = completedSteps.includes(currentStep?.id);

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleNoHandsMode = () => {
    setIsDropdownOpen(false);

    setTimeout(() => {
      setShowNoHandModeModal(true);
    }, 500);
  };

  const handleEndProtocol = () => {
    setIsDropdownOpen(false);
    clearProtocol();
    navigation.navigate('MainTabs', { screen: 'Aid' });
  };

  if (isMinimized) {
    return null;
  }

  return (
    <View style={stepFlowStyle.container}>
      <View style={stepFlowStyle.headerContainer}>
        <View style={stepFlowStyle.stepCounter}>
          <Text style={[stepFlowStyle.stepCounterText, { color: colors.Text.accent.primary }]}>
            {protocolData.title}
          </Text>
          <Text style={[stepFlowStyle.stepCounterText, { color: colors.Text.accent.primary }]}>
            {t('aid.protocol.step')} {currentStepIndex + 1} {t('aid.protocol.of')} {totalSteps}
          </Text>
        </View>

        <View style={stepFlowStyle.settingsContainer}>
          <TouchableOpacity
            onPress={handleDropdownToggle}
            activeOpacity={0.7}
            hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
          >
            <PointsIcon />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              handleMinimize();
            }}
            activeOpacity={0.7}
          >
            <DownArrow />
          </TouchableOpacity>
        </View>
      </View>

      <PagerView
        ref={pagerRef}
        style={stepFlowStyle.contentContainer}
        initialPage={currentStepIndex}
        onPageSelected={handlePageSelected}
      >
        {steps.map((step: any, index: number) => {
          const stepIsVideoFile = step.video !== null;
          const isCurrentStep = index === currentStepIndex;

          return (
            <View
              key={step.id}
              style={[
                stepFlowStyle.pageContainer,
                { justifyContent: step.video ? 'space-between' : 'center' },
              ]}
            >
              <View style={stepFlowStyle.firstSubContainer}>
                {step.timeframe && (
                  <View style={stepFlowStyle.timeframeBadge}>
                    <Text
                      style={[
                        stepFlowStyle.timeframeText,
                        { color: colors.Text.neutral.secondary },
                      ]}
                    >
                      ⏱ {step.timeframe}
                    </Text>
                  </View>
                )}

                <Text style={[stepFlowStyle.stepTitle, { color: colors.Text.neutral.primary }]}>
                  {step.title}
                </Text>

                <Text
                  style={[stepFlowStyle.stepSubtitle, { color: colors.Text.neutral.secondary }]}
                >
                  {step.subtitle}
                </Text>

                {/* {isCPR && index === totalSteps - 1 && (
                  <CustomButton
                    type="secondary"
                    text={`Continue compressions ${protocolState.compressions}`}
                    width={230}
                    onPress={() => {
                      setCompressions(30);
                      removeCompletedStep(currentStep.id - 1);
                      pagerRef.current?.setPage(4);
                    }}
                    dimension="small"
                  />
                )} */}

                {step.shouldDisplayEmergencyCall && (
                  <TouchableOpacity
                    onPress={() => {
                      handleMinimize(false);
                      navigation.navigate('MainTabs');
                    }}
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                      gap: 8,
                    }}
                  >
                    <PhoneIcon color={colors.Text.accent.primary} />
                    <Text style={[footerStyle.text, { color: colors.Text.accent.primary }]}>
                      Call 911
                    </Text>
                  </TouchableOpacity>
                )}

                {step.shouldDisplayCprProtocol && (
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('Protocol', {
                        protocolData: getProtocolData('CPR'),
                        title: i18n.t('aid.categories.cpr'),
                        icon: CPRIcon,
                        onBack: () => navigation.goBack(),
                      });
                    }}
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                      gap: 8,
                    }}
                  >
                    <CPRIcon color={colors.Text.accent.primary} />
                    <Text style={[footerStyle.text, { color: colors.Text.accent.primary }]}>
                      CPR protocol
                    </Text>
                  </TouchableOpacity>
                )}

                {step.shouldDisplayEpinephineDose && (
                  <TouchableOpacity
                    onPress={() => {
                      handleMinimize(false);
                      navigation.navigate('Protocol', {
                        protocolData: getProtocolData('anaphylaxis'),
                        title: i18n.t('aid.categories.anaphylaxis'),
                        icon: CPRIcon,
                        categoryIndex: 2,
                      });
                    }}
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                      gap: 8,
                    }}
                  >
                    <Text style={[footerStyle.text, { color: colors.Text.accent.primary }]}>
                      Epinephrine Dose
                    </Text>
                    <Arrow />
                  </TouchableOpacity>
                )}

                {step.shouldDisplayCSpineManagement && (
                  <TouchableOpacity
                    onPress={() => {
                      handleMinimize(false);
                      navigation.navigate('Protocol', {
                        protocolData: getProtocolData('head_injury'),
                        title: i18n.t('aid.categories.headInjury'),
                        icon: CPRIcon,
                        categoryIndex: 3,
                      });
                    }}
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                      gap: 8,
                    }}
                  >
                    <Text style={[footerStyle.text, { color: colors.Text.accent.primary }]}>
                      C-Spine management
                    </Text>
                    <Arrow />
                  </TouchableOpacity>
                )}

                {step.shouldDisplayGlasgowComaScale && (
                  <TouchableOpacity
                    onPress={() => {
                      handleMinimize(false);
                      navigation.navigate('Protocol', {
                        protocolData: getProtocolData('head_injury'),
                        title: i18n.t('aid.categories.headInjury'),
                        icon: CPRIcon,
                        categoryIndex: 2,
                      });
                    }}
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                      gap: 8,
                    }}
                  >
                    <Text style={[footerStyle.text, { color: colors.Text.accent.primary }]}>
                      Glasgow Coma scale
                    </Text>
                    <Arrow />
                  </TouchableOpacity>
                )}
              </View>

              {stepIsVideoFile && isCurrentStep && (
                <TouchableOpacity
                  onPress={() => setIsPlaying(true)}
                  style={{
                    width: '100%',
                    aspectRatio: 16 / 9,
                    backgroundColor: '#000',
                    borderRadius: 24,
                    overflow: 'hidden',
                  }}
                >
                  <Video
                    ref={videoRef}
                    source={MEDIA_MAP[step.video]}
                    viewType={0}
                    style={{
                      width: '100%',
                      height: '100%',
                    }}
                    paused={!isPlaying}
                    controls={isPlaying}
                    resizeMode="contain"
                    repeat={false}
                    onEnd={() => {
                      setIsPlaying(false);
                    }}
                    onError={(error) => {
                      setIsPlaying(false);
                    }}
                  />

                  {!isPlaying && (
                    <View
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'rgba(0, 0, 0, 0.3)',
                      }}
                    >
                      <View
                        style={{
                          width: 64,
                          height: 64,
                          borderRadius: 32,
                          backgroundColor: 'rgba(255, 255, 255, 0.9)',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                      >
                        <View
                          style={{
                            width: 0,
                            height: 0,
                            marginLeft: 4,
                            borderLeftWidth: 20,
                            borderTopWidth: 12,
                            borderBottomWidth: 12,
                            borderLeftColor: '#000',
                            borderTopColor: 'transparent',
                            borderBottomColor: 'transparent',
                          }}
                        />
                      </View>
                    </View>
                  )}
                </TouchableOpacity>
              )}
            </View>
          );
        })}
      </PagerView>

      <View style={stepFlowStyle.footer}>
        <TouchableOpacity
          style={[
            stepFlowStyle.navButton,
            { backgroundColor: colors.Button.neutral.secondary },
            currentStepIndex === 0 && stepFlowStyle.navButtonDisabled,
          ]}
          onPress={handlePrevious}
          disabled={currentStepIndex === 0}
        >
          <Text
            style={[
              stepFlowStyle.navButtonText,
              { color: colors.Text.neutral.primary },
              currentStepIndex === 0 && { color: colors.Text.neutral.tertiary },
            ]}
          >
            <LeftArrow color={colors.Text.neutral.primary} width={14} height={18} />
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            stepFlowStyle.navButton,
            { backgroundColor: colors.Button.neutral.secondary },
            currentStepIndex === totalSteps - 1 && stepFlowStyle.navButtonDisabled,
          ]}
          onPress={handleNext}
          disabled={currentStepIndex === totalSteps - 1}
        >
          <Text
            style={[
              stepFlowStyle.navButtonText,
              { color: colors.Text.neutral.primary },
              currentStepIndex === totalSteps - 1 && { color: colors.Text.neutral.tertiary },
            ]}
          >
            <RightArrow color={colors.Text.neutral.primary} width={14} height={18} />
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            stepFlowStyle.completeButton,
            {
              backgroundColor: isStepCompleted
                ? colors.Button.neutral.secondary
                : colors.Button.accent.primary,
            },
          ]}
          onPress={handleStepComplete}
        >
          <StepCompletedIcon />
          <Text
            style={[
              stepFlowStyle.completeButtonText,
              {
                color: isStepCompleted ? colors.Text.neutral.secondary : colors.Text.neutral.white,
              },
            ]}
          >
            {t('aid.protocol.stepCompleted')}
          </Text>
        </TouchableOpacity>
      </View>

      <ProtocolMenu
        isVisible={isDropdownOpen}
        onClose={() => setIsDropdownOpen(false)}
        onNoHandsMode={handleNoHandsMode}
        onEndProtocol={handleEndProtocol}
        protocolTitle={protocolData?.title}
        icon={Icon}
      />

      <NoHandsModeModal
        visible={showNoHandModeModal}
        onClose={() => setShowNoHandModeModal(false)}
      />

      <CustomModal
        title={
          <Text style={{ color: colors.Text.neutral.secondary, fontSize: 13, fontWeight: '400' }}>
            {protocolData.title}
          </Text>
        }
        firstText={
          <Text
            style={{
              color: colors.Text.neutral.primary,
              fontSize: 20,
              fontWeight: '700',
            }}
          >
            All steps completed
          </Text>
        }
        secondText={
          <Text style={{ color: colors.Text.neutral.secondary }}>
            Your input helps us improve our guides for everyone.
          </Text>
        }
        visible={showFinishProtocolModal}
        onCancel={handleFinishProtocolModalCancel}
      />
    </View>
  );
}
