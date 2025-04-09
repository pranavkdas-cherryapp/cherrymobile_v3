import React from "react";
import { TouchableOpacity, View, StyleSheet } from "react-native";
import StyledText from "@/components_v2/common/StyledText";
import { Image } from "expo-image";

interface HomeActionCardProps {
  title: string;
  subtitle: string;
  imageSource?: any;
  onPress: () => void;
  containerStyle?: object;
  imageStyle?: object;
}

export default function HomeActionCard({
  title,
  subtitle,
  imageSource,
  onPress,
  containerStyle,
  imageStyle,
}: HomeActionCardProps) {
  return (
    <TouchableOpacity style={[styles.card, containerStyle]} onPress={onPress}>
      <StyledText preset="headingSmall">{title}</StyledText>
      <StyledText preset="consentText" style={{ color: "#8A8A8E" }}>
        {subtitle}
      </StyledText>
      <Image source={imageSource} contentFit="contain" style={[imageStyle]} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: "#F1F1F1",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    // elevation: 1,
    backgroundColor: "white",
    overflow: "hidden",
    padding: 8,
  },
});
