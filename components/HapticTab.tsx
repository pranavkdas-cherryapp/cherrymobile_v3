import { BottomTabBarButtonProps } from "@react-navigation/bottom-tabs";
import { Pressable } from "react-native";
import * as Haptics from "expo-haptics";
import { Platform } from "react-native";

export function NoEffectTabBarButton(props: BottomTabBarButtonProps) {
  return (
    <Pressable
      {...props}
      android_ripple={null}
      style={({ pressed }) => [
        typeof props.style === "function"
          ? props.style({ pressed })
          : props.style,
        { opacity: 1 }, // No visual press feedback
      ]}
      onPressIn={(ev) => {
        Haptics.impactAsync(
          Platform.OS === "ios"
            ? Haptics.ImpactFeedbackStyle.Light
            : Haptics.ImpactFeedbackStyle.Medium
        );
        props.onPressIn?.(ev);
      }}
    />
  );
}
