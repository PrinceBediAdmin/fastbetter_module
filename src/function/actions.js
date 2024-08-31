import { Vibration, Platform, UIManager, findNodeHandle } from 'react-native';

export const vibrateWithIntensity = (intensity) => {
  if (Platform.OS === 'android' && UIManager.VibrationModule) {
    const vibrationPattern = [0, intensity]; // [0, intensity] for no delay followed by the intensity duration
    const vibrationEffect = Vibration.VibrationEffect.createWaveform(vibrationPattern, -1); // -1 for indefinite repeat
    Vibration.vibrate(vibrationEffect, true);
  } 
  // else {
  //   Vibration.vibrate(); // On iOS and unsupported Android devices, use the default intensity
  // }
};

