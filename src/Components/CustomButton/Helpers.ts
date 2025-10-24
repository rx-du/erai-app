import { useTheme } from '../../Theme/ThemeContext';
import { ButtonDimension, ButtonType } from './Types';

type ButtonStyle = {
  backgroundColor: string;
  textColor: string;
  borderColor: string;
};

export function getButtonStyle(type: ButtonType, dimension: ButtonDimension) {
  const { colors } = useTheme();

  let height;

  switch (dimension) {
    case 'large':
      height = 48;
      break;
    case 'small':
      height = 20;
      break;
    case 'medium':
      height = 42;
      break;
    default:
      height = 20;
      break;
  }

  const ButtonStyles: Record<ButtonType, ButtonStyle> = {
    primary: {
      backgroundColor: colors.Button.accent.primary,
      textColor: colors.Text.neutral.white,
      borderColor: 'transparent',
    },
    secondary: {
      backgroundColor: colors.Button.accent.secondary,
      textColor: colors.Text.accent.primary,
      borderColor: 'transparent',
    },
    tertiary: {
      backgroundColor: 'transparent',
      textColor: colors.Text.accent.primary,
      borderColor: 'transparent',
    },
    social: {
      backgroundColor: colors.Button.neutral.secondary,
      textColor: colors.Text.neutral.primary,
      borderColor: 'transparent',
    },
  };

  return { ...ButtonStyles[type], height };
}
