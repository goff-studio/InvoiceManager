import {
  AnimatableNumericValue,
  ColorValue,
  DimensionValue,
  FlexAlignType,
  ImageProps,
  TextInputProps as RNTextInputProps,
  TextProps as RNTextProps,
  TextStyle,
  ViewProps as RNViewProps,
  ViewStyle,
} from 'react-native';
import {ImageSourcePropType} from 'react-native/Libraries/Image/Image';
import {ReactNode} from 'react';

export enum TextVariants {
  H1 = 'h1',
  H2 = 'h2',
  H3 = 'h3',
  H4 = 'h4',
  Body1 = 'body1',
  Body2 = 'body2',
}

export interface TextProps extends RNTextProps {
  variant?: TextVariants;
  center?: boolean;
  color?: ColorValue;
  fontFamily?: FontFamilyValue;
  paddingVertical?: DimensionValue;
  paddingHorizontal?: DimensionValue;
  paddingBottom?: DimensionValue;
  paddingLeft?: DimensionValue;
  paddingRight?: DimensionValue;
  paddingTop?: DimensionValue;
  marginVertical?: DimensionValue;
  marginHorizontal?: DimensionValue;
  textAlign?: 'auto' | 'left' | 'right' | 'center' | 'justify' | undefined;
  marginBottom?: DimensionValue;
  marginLeft?: DimensionValue;
  marginRight?: DimensionValue;
  marginStart?: DimensionValue;
  marginTop?: DimensionValue;
}

export interface PaletteVariants {
  backgroundPrimary: string;
  backgroundSecondary: string;
  backgroundDisabled: string;
  textPrimary: string;
  textSecondary: string;
  textAccent: string;
  textLight: string;
  textError: string;
}

export enum FontFamilyValue {
  MEDIUM = 'Spartan-Medium',
  BOLD = 'Spartan-Bold',
}

export interface ScreenProps extends ViewProps {
  paddingHorizontal?: number;
  scrollable?: boolean;
  footer?: ReactNode;
}

export interface InputProps extends Omit<ViewProps, 'style'> {
  containerStyle?: ViewStyle;
  labelStyle?: TextStyle;
  label?: string;
}

export interface ViewProps extends RNViewProps {
  center?: boolean;
  backgroundColor?: ColorValue;
  flex?: boolean;
  row?: boolean;
  width?: DimensionValue;
  height?: DimensionValue;
  justifyContent?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | undefined;
  alignItems?: FlexAlignType;
  color?: ColorValue;
  fontFamily?: FontFamilyValue;
  paddingVertical?: DimensionValue;
  paddingHorizontal?: DimensionValue;
  paddingBottom?: DimensionValue;
  paddingLeft?: DimensionValue;
  paddingRight?: DimensionValue;
  paddingTop?: DimensionValue;
  marginVertical?: DimensionValue;
  marginHorizontal?: DimensionValue;
  marginBottom?: DimensionValue;
  marginLeft?: DimensionValue;
  opacity?: number;
  marginRight?: DimensionValue;
  marginStart?: DimensionValue;
  marginTop?: DimensionValue;
  borderRadius?: AnimatableNumericValue;
  borderColor?: ColorValue;
  overflow?: 'hidden';
  borderWidth?: number;
  onPress?: () => unknown;
}

export interface AvatarProps extends Omit<ImageProps, 'source'> {
  size?: number;
  source?: ImageSourcePropType;
}

export interface IconsProps extends ViewProps {
  size?: number;
  color?: ColorValue;
  path?: string;
  icon?: ReactNode;
}

export enum ButtonVariants {
  PRIMARY,
  SECONDARY,
  ACCENT,
  DARK,
}

export interface ButtonProps extends ViewProps {
  variant?: ButtonVariants;
  icon?: ReactNode;
  circleIcon?: boolean;
  label?: string;
  full?: boolean;
}
export interface ModalProps {
  onRequestClose?: () => unknown;
  isVisible?: boolean;
  children?: ReactNode;
  animationIn?: string;
  animationOut?: string;
  backdropOpacity?: number;
  onModalShow?: () => unknown;
  onModalHide?: () => unknown;
}

export interface DropDownProps extends Omit<ViewProps, 'onPress'> {
  placeholder: string;
  items?: string[];
  label?: string;
  onChange?: (item: string | undefined) => unknown;
  initialValue?: string;
  showReset?: boolean;
  resetLabel?: string;
}

export interface TextInputProps extends InputProps, RNTextInputProps {
  paddingVertical?: DimensionValue;
  paddingHorizontal?: DimensionValue;
  marginLeft?: DimensionValue;
  marginRight?: DimensionValue;
  containerStyle?: ViewStyle;
  labelStyle?: TextStyle;
  label?: string;
}

export interface CalendarProps extends ViewProps {
  label?: string;
  value?: string;
  placeholder?: string;
  onChange: (date: string) => unknown;
}
