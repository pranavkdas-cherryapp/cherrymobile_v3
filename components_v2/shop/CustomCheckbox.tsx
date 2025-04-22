// CustomCheckbox.tsx
import React from 'react';
import { TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface CustomCheckboxProps {
  isChecked: boolean;
  onPress: () => void;
  style?: ViewStyle;
}

const CustomCheckbox: React.FC<CustomCheckboxProps> = ({ isChecked, onPress, style }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.container,
        { borderColor: isChecked ? '#000' : '#D9D9D9' },
        style,
      ]}
    >
      {isChecked && (
        <MaterialCommunityIcons name="check" size={20} color="#000" />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 24,
    height: 24,
    borderWidth: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3,
  },
});

export default CustomCheckbox;
