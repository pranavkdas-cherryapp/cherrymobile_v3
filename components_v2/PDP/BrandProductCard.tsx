import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { Image } from "expo-image";
import { router } from "expo-router";
import StyledText from "@/components_v2/common/StyledText";
import { components } from "@/types/apiTypes";

interface BrandProductCardProps {
  title: string;
  imageUrl: string;
  price: string;
  deeplinkUrl: string;
  storyDiscountMeta: components["schemas"]["CategoryDiscountDetails"] | null;
  reelOrPostDiscountMeta:
    | components["schemas"]["CategoryDiscountDetails"]
    | null;
}

const BrandProductCard: React.FC<BrandProductCardProps> = (props) => {
  return (
    <View style={styles.card}>
      <View style={styles.content}>
        <Image source={{ uri: props.imageUrl }} style={styles.image} />
        <View style={styles.textContent}>
          <View>
            <StyledText
              preset="headingMedium"
              numberOfLines={2}
              ellipsizeMode="tail"
            >
              {props.title}
            </StyledText>
            <StyledText preset="headingSmall" style={styles.price}>
              ₹{props.price}
            </StyledText>
          </View>
          <TouchableOpacity
            onPress={() => {
              router.push({
                pathname: "/webview/WebViewScreen",
                params: {
                  url: props.deeplinkUrl,
                  reelOrPostCashbackMeta: JSON.stringify(
                    props.reelOrPostDiscountMeta
                  ),
                  storyCashbackMeta: JSON.stringify(props.storyDiscountMeta),
                },
              });
            }}
          >
            <View style={styles.button}>
              <StyledText preset={"headingSmall"} style={styles.buttonText}>
                Checkout
              </StyledText>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {/* Checkout Button */}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 274,
    height: 138,
    backgroundColor: "#FFFFFF",
    borderColor: "#F3F3F3",
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 15,
    borderWidth: 1.2,
    marginRight: 16,
  },
  content: {
    flexDirection: "row",
  },
  price: {
    color: "#6B6B6B",
  },

  image: {
    width: 95,
    height: 106,
    borderRadius: 12,
  },
  textContent: {
    flex: 1,
    paddingLeft: 10,
    justifyContent: "space-between",
  },

  button: {
    backgroundColor: "black",
    paddingVertical: 4,
    width: 106,
    borderRadius: 44,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
  },
});

export default BrandProductCard;
