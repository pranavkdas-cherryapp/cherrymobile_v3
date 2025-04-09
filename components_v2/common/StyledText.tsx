import React from "react";
import { Platform, Text, useWindowDimensions } from "react-native";
import { TextProps } from "react-native";
import textStyles from "@/constants/textStyles";
import RenderHtml from "react-native-render-html";

interface StyledTextProps extends TextProps {
  children: React.ReactNode;
  style?: TextProps["style"];
  preset?: keyof typeof textStyles; // Add a preset prop
  htmlContent?: string;
}
const StyledText: React.FC<StyledTextProps> = ({
  children,
  style,
  preset,
  htmlContent,
  ...props
}) => {
  const presetStyle = preset ? textStyles[preset] : {};
  if (htmlContent) {
    return <RenderHtml source={{ html: htmlContent }} tagsStyles={htmlStyle} />;
  } else {
    return (
      <Text style={[presetStyle, style]} {...props}>
        {children}
      </Text>
    );
  }
};

const htmlStyle = {
  body: {
    fontFamily: Platform.select({
      android: "Poppins_400Regular",
      ios: "Poppins-Regular",
    }) as string,
    fontSize: 12,
  },
};

export default StyledText;
