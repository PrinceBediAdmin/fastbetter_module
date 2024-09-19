import React from 'react';
import Modal from 'react-native-modal';

export const ModelBox = ({
  isVisible,
  onClose,
  children,
  Directio = ['down'],
  ...modalProps
}) => {
  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      animationInTiming={700}
      animationOutTiming={700}
      backdropOpacity={0.6}
      swipeDirection={['down']}
      style={{
        bottom: 0,
        margin: 0,
        marginHorizontal: 1,
        marginTop: 50,
        display: 'flex',
        justifyContent: 'flex-end',
      }}
      {...modalProps}>
      {children}
    </Modal>
  );
};
