import React from "react";
import { TouchableOpacity, Text, StyleSheet, ViewStyle } from "react-native";
import textStyles from "@/constants/textStyles";
// import { track } from "@amplitude/analytics-react-native";

interface TextButtonProps {
  color: string;
  text: string;
  onPress: () => void;
  style?: ViewStyle;
  variant?: "large" | "small" | "outlined" | "outlined-small";
  disabled?: boolean;
  trackingData?: Record<string, any>;
}

const TextButton: React.FC<TextButtonProps> = ({
  color,
  text,
  onPress,
  style,
  variant = "large",
  disabled = false,
  trackingData = {},
}) => {
  const textStyle =
    variant === "large" || variant === "outlined"
      ? textStyles.buttonLarge
      : textStyles.buttonSmall;

  return (
    <TouchableOpacity
      style={[
        ButtonStyles.button,
        {
          backgroundColor: variant.includes("outlined") ? "white" : color,
          height: variant.includes("small") ? 48 : undefined,
          borderColor: variant.includes("outlined") ? color : "transparent",
        },
        style,
        disabled && ButtonStyles.buttonDisabled,
      ]}
      onPress={() => {
        // track("continue-clicked", trackingData);
        onPress();
      }}
      disabled={disabled}
    >
      <Text
        style={[
          ButtonStyles.buttonText,
          textStyle,
          variant.includes("outlined") && { color: color },
        ]}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
};

const ButtonStyles = StyleSheet.create({
  button: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    borderWidth: 2,
    padding: 8,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
});

export default TextButton;
