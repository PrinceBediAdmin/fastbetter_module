import { Dimensions, PixelRatio } from 'react-native';
import { widthPercentageToDP as wp2dp, heightPercentageToDP as hp2dp } from 'react-native-responsive-screen';

const { width, height } = Dimensions.get('window');

// Helper function for relative sizing
export const wp = (dimension) => {
    const divBy = width < 767 ? 375 : 550; // Based on standard device widths
    return wp2dp((dimension / divBy) * 100);
};

export const hp = (dimension) => {
    return hp2dp((dimension / 812) * 100); // Based on iPhone X height
};

export const relativeFont = (fontSize) => {
    const divBy = width < 767 ? 375 : 550;
    return wp2dp((fontSize / divBy) * 100) / PixelRatio.getFontScale(); // Simplified calculation
};

export const SIZES = {
    f1: 32,
    f2: 26,
    f3: 22,
    f4: 16,
    f5: 14,
    f6: 12,
    f7: 20,
    f8: 11,
    f9: 14,

    // App Dimensions
    width,
    height,
    uWidth: width < 767 ? width - wp(30) : wp(350),
    uWidthRaw: width < 767 ? width : 767,

    // Logo Dimensions
    logo_small: { h: hp(50), w: wp(50) },
    logo_medium: { h: hp(90), w: wp(90) },
    logo_large: { h: hp(125), w: wp(125) },
};

// Theme colors
export const themeColors = {
    primaryColor: '#FF9950',
    white: "#FFFFFF",
    black: "#000",

    subtleText: '#18192B',
    // Buttons
    btnBgColor: "#FF9950",
    btnTextColor: "#000",
    btnDisableBgColor: "#DADADA",
    btnDisableTextColor: "#B0B0B0",
};

// Detailed color definitions
export const COLORS = {
    black: '#000',
    white: '#FFFFFF',
    lightGray: '#BFBFBF',
    green: '#097969',
    darkGray: '#4B4B4B',
    blue: '#197BBD',
    pink: '#FE579F',
    red: '#FE5757',
    grayDivider: '#EBEBEB',
    buttonBorder: '#BABABA',
    grayText: '#555555',
    buttonBorderSecondary: '#197BBD4D',
    imageBackground: "#EBEBEB4F",

    bottomNavActive: '#197BBD',
    bottomNavInactive: '#A7A7A7',

    secondaryText: '#4B4B4B',
    secondaryText2: '#FE579F',
    subtleText: '#BCBCBC',
    highlightText: '#197BBD',

    donutCirclePrimary: '#FE579F',
    donutCircleSecondary: '#6E6E6F',
    donutCircleText: '#6E6E6F',

    buttonGradient1: ['#F3D6EB', '#D1EEFE'],

    toggleGradient1: ['#7DC6F7', '#E3F4FF'],

    checkboxHighlightColor: '#197BBD',
    checkboxCheckmarkColor: '#FFFFFF',
    checkboxOutlineColor: '#197BBD',

    toggleActiveColor: '#7DC6F7',
    toggleInactiveColor: '#EBEBEB',
};
