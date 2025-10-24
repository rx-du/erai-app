import { DimensionValue, Text, TouchableOpacity, ViewStyle } from 'react-native';
import { FC } from 'react';
import { SvgProps } from 'react-native-svg';
import { Styles } from './Styles';
import { getButtonStyle } from './Helpers';
import { ButtonType, ButtonDimension } from './Types';
import { isAndroid } from '../../Constants/Device';

type CustomButtonProps = {
  text?: string;
  type?: ButtonType;
  dimension?: ButtonDimension;
  width?: number | string;
  Icon?: FC<SvgProps>;
  disabled?: boolean;
  style?: ViewStyle;
  btnStyle?: ViewStyle;
  onPress?: () => void;
  onRemove?: () => void;
};

export function CustomButton({
  text,
  type = 'primary',
  dimension = 'large',
  width: customWidth = 'auto',
  Icon,
  style,
  btnStyle,
  disabled = false,
  onPress,
  onRemove,
}: CustomButtonProps) {
  const {
    backgroundColor,
    height: customHeight,
    textColor,
    borderColor,
  } = getButtonStyle(type, dimension);

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[
        Styles.container,
        {
          backgroundColor,
          borderColor,
          height: customHeight,
          width: customWidth as DimensionValue,
        },
        style,
      ]}
    >
      {Icon && (
        <Icon
          onPress={onRemove}
          color={textColor}
          style={[btnStyle, text ? { position: 'absolute', left: 12 } : {}]}
        />
      )}

      {text && (
        <Text
          numberOfLines={1}
          style={{
            ...Styles.text,
            color: textColor,
            marginHorizontal: isAndroid ? 16 : 0,
          }}
        >
          {text}
        </Text>
      )}
    </TouchableOpacity>
  );
}
