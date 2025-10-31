import React, { useState, useEffect, useRef } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import TrackPlayer, { State, usePlaybackState, Capability } from 'react-native-track-player';
import Video, { VideoRef } from 'react-native-video';
import { useTranslation } from 'react-i18next';
import { stepFlowStyle } from './Styles';
import { useTheme } from '../../Theme/ThemeContext';
import VideoIcon from '../../Icons/video.svg';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../Navigations/Navigations';

type ProtocolStepFlowProps = {
  protocolData: any;
};

const MEDIA_MAP: Record<string, any> = {
  'sample_video.mp4': require('../../i18n/locales/protocols/en/sample_video.mp4'),
};

export default function ProtocolStepFlow({ protocolData }: ProtocolStepFlowProps) {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPlayerReady, setIsPlayerReady] = useState(false);
  const playbackState = usePlaybackState();
  const setupDone = useRef(false);
  const videoRef = useRef<VideoRef>(null);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const currentProtocol = protocolData?.steps[0];
  const steps = currentProtocol.steps;
  const currentStep = steps[currentStepIndex];
  const totalSteps = steps.length;

  const isVideoFile = currentStep.video !== null;

  const handleNext = () => {
    if (currentStepIndex < totalSteps - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
      setIsPlaying(false);
    }
  };

  const handlePrevious = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
      setIsPlaying(false);
    }
  };

  const handleStepComplete = () => {
    if (!completedSteps.includes(currentStep.id)) {
      setCompletedSteps([...completedSteps, currentStep.id]);
    }
    if (currentStepIndex < totalSteps - 1) {
      handleNext();
    } else {
      navigation.goBack();
    }
  };

  useEffect(() => {
    setupPlayer();
    return () => {
      cleanupPlayer();
    };
  }, []);

  const setupPlayer = async () => {
    if (setupDone.current) return;

    try {
      await TrackPlayer.setupPlayer({ waitForBuffer: true });
      await TrackPlayer.updateOptions({
        capabilities: [Capability.Play, Capability.Pause, Capability.Stop],
        compactCapabilities: [Capability.Play, Capability.Pause],
      });

      setupDone.current = true;
      setIsPlayerReady(true);
    } catch (error) {
      console.error('Player setup error:', error);
    }
  };

  const cleanupPlayer = async () => {
    try {
      await TrackPlayer.reset();
    } catch (error) {
      console.error('Cleanup error:', error);
    }
  };

  const handlePlayMedia = async () => {
    if (!currentStep.video) {
      console.log('No media file for this step');
      return;
    }

    const mediaFile = MEDIA_MAP[currentStep.video];

    if (isVideoFile) {
      setIsPlaying(!isPlaying);
    } else {
      if (!isPlayerReady) return;

      try {
        const currentState = await TrackPlayer.getState();

        if (currentState === State.Playing) {
          await TrackPlayer.pause();
        } else if (currentState === State.Paused) {
          await TrackPlayer.play();
        } else {
          await TrackPlayer.reset();
          await TrackPlayer.add({
            id: `step-${currentStep.id}`,
            url: mediaFile,
            title: currentStep.title,
            artist: 'Protocol Guide',
          });
          await TrackPlayer.play();
        }
      } catch (error) {
        console.error('Audio playback error:', error);
      }
    }
  };

  useEffect(() => {
    if (!isVideoFile) {
      const state = playbackState.state;
      setIsPlaying(state === State.Playing);
    }
  }, [playbackState.state, isVideoFile]);

  useEffect(() => {
    const stopMedia = async () => {
      if (isPlayerReady) {
        try {
          await TrackPlayer.reset();
        } catch (error) {
          console.error('Error stopping audio:', error);
        }
      }
      setIsPlaying(false);
    };

    stopMedia();
  }, [currentStepIndex]);

  const isStepCompleted = completedSteps.includes(currentStep.id);

  return (
    <View style={stepFlowStyle.container}>
      <View style={stepFlowStyle.stepCounter}>
        <Text style={[stepFlowStyle.stepCounterText, { color: colors.Text.accent.primary }]}>
          {protocolData.title}
        </Text>
        <Text style={[stepFlowStyle.stepCounterText, { color: colors.Text.accent.primary }]}>
          {t('aid.protocol.step')} {currentStepIndex + 1} {t('aid.protocol.of')} {totalSteps}
        </Text>
      </View>

      <View
        style={[
          stepFlowStyle.contentContainer,
          { justifyContent: currentStep.video ? 'space-between' : 'center' },
        ]}
      >
        <View style={stepFlowStyle.firstSubContainer}>
          {currentStep.timeframe && (
            <View style={stepFlowStyle.timeframeBadge}>
              <Text style={[stepFlowStyle.timeframeText, { color: colors.Text.neutral.secondary }]}>
                ⏱ {currentStep.timeframe}
              </Text>
            </View>
          )}

          <Text style={[stepFlowStyle.stepTitle, { color: colors.Text.neutral.primary }]}>
            {currentStep.title}
          </Text>

          <Text style={[stepFlowStyle.stepSubtitle, { color: colors.Text.neutral.secondary }]}>
            {currentStep.subtitle}
          </Text>
        </View>

        {isPlaying && isVideoFile && (
          <View
            style={{
              flex: 1,
              width: '100%',
              backgroundColor: '#000',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 24,
              overflow: 'hidden',
            }}
          >
            <Video
              ref={videoRef}
              source={MEDIA_MAP[currentStep.video]}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
              }}
              controls={true}
              paused={false}
              resizeMode="cover"
              repeat={false}
              onEnd={() => {
                setIsPlaying(false);
              }}
              onError={(error) => {
                setIsPlaying(false);
              }}
            />
            <TouchableOpacity
              style={{
                position: 'absolute',
                top: 10,
                right: 10,
                backgroundColor: 'rgba(0,0,0,0.7)',
                padding: 10,
                borderRadius: 5,
                zIndex: 1000,
              }}
              onPress={() => setIsPlaying(false)}
            >
              <Text style={{ color: '#fff', fontSize: 16 }}>✕ {t('aid.protocol.close')}</Text>
            </TouchableOpacity>
          </View>
        )}

        {!isPlaying && (
          <View style={stepFlowStyle.secondSubContainer}>
            {currentStep.video && (
              <>
                <TouchableOpacity
                  onPress={handlePlayMedia}
                  disabled={!isVideoFile && !isPlayerReady}
                >
                  <VideoIcon />
                </TouchableOpacity>
              </>
            )}
          </View>
        )}
      </View>

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
            ←
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
            →
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            stepFlowStyle.completeButton,
            {
              backgroundColor: isStepCompleted ? '#4CAF50' : colors.Button.accent.primary,
            },
          ]}
          onPress={handleStepComplete}
        >
          <Text style={[stepFlowStyle.completeButtonText, { color: colors.Text.neutral.white }]}>
            {isStepCompleted
              ? t('aid.protocol.stepCompletedCheck')
              : t('aid.protocol.stepCompleted')}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
