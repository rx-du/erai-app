import { Text, View } from 'react-native';
import Modal from 'react-native-modal';
import { Styles } from './Styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CustomButton } from '../CustomButton';
import { useTheme } from '../../Theme/ThemeContext';
import { FC, ReactNode } from 'react';
import { SvgProps } from 'react-native-svg';

type CustomModalProps = {
  visible: boolean;
  title?: string | ReactNode;
  subtitle?: string;
  icon?: FC<SvgProps>;
  firstText?: string | ReactNode;
  secondText?: string | ReactNode;
  actionName?: string;
  onAction?: () => void;
  onCancel?: () => void;
  onModalHide?: () => void;
  children?: React.ReactNode;
  isFormValid?: boolean;
};

export function CustomModal({
  visible,
  firstText,
  secondText,
  title,
  actionName,
  children,
  onCancel,
  onAction,
  onModalHide,
  isFormValid,
  icon: Icon,
  subtitle,
}: CustomModalProps) {
  const { colors } = useTheme();

  return (
    <Modal
      isVisible={visible}
      onDismiss={onCancel}
      backdropOpacity={0.6}
      onBackdropPress={onCancel}
      onBackButtonPress={onCancel}
      hideModalContentWhileAnimating
      useNativeDriverForBackdrop
      useNativeDriver
      statusBarTranslucent
      avoidKeyboard
      onModalHide={onModalHide}
    >
      <SafeAreaView style={[Styles.modal, { backgroundColor: colors.Bg.primary }]}>
        <View style={{ alignItems: 'center', gap: 24 }}>
          {Icon && <Icon />}
          <View style={[title && subtitle ? { gap: 12 } : null]}>
            {title && <Text style={Styles.title}>{title}</Text>}
            {subtitle && (
              <Text style={[Styles.subtitle, { color: colors.Text.neutral.secondary }]}>
                {subtitle}
              </Text>
            )}
          </View>
        </View>
        {firstText && !secondText && (
          <Text style={[Styles.text, { color: colors.Text.neutral.primary, fontWeight: 600 }]}>
            {firstText}
          </Text>
        )}
        {firstText && secondText && (
          <View style={{ gap: 4 }}>
            <Text style={[Styles.text, { color: colors.Text.neutral.primary, fontWeight: 600 }]}>
              {firstText}
            </Text>
            <Text style={[Styles.text, { color: colors.Text.neutral.secondary, fontWeight: 400 }]}>
              {secondText}
            </Text>
          </View>
        )}
        {children}
        <View style={Styles.buttons}>
          {onCancel && (
            <CustomButton
              width={120}
              type={!onAction ? 'primary' : 'social'}
              text={!onAction ? 'Close' : 'Cancel'}
              onPress={onCancel}
            />
          )}
          {onAction && (
            <CustomButton
              disabled={actionName == 'Add' && !isFormValid}
              width={120}
              type={actionName == 'Add' && !isFormValid ? 'disabled' : 'primary'}
              text={actionName}
              onPress={onAction}
            />
          )}
        </View>
      </SafeAreaView>
    </Modal>
  );
}
