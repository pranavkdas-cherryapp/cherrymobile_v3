import { brandDetails } from "./BrandDetails";
import { View, Text, StyleSheet } from "react-native";
import StyledText from "../common/StyledText";
import { Image } from "expo-image";

const DiscountMeta = ({
  title,
  discountMeta,
}: {
  title: string;
  discountMeta?: {
    discountPercentage?: number;
    offerDiscountPercentage?: number;
    maxDiscount?: number;
  };
}) => {
  if (!discountMeta) {
    return (
      <View style={styles.discountContainer}>
        <Text style={styles.discountText}>{title}: Not eligible 😔</Text>
      </View>
    );
  }

  // Assign correct image for each title
  const iconSource =
    title === "Reel or post"
      ? require("@/assets/images/post-reel-active.png")
      : require("@/assets/images/story-active.png");

  return (
    <View style={styles.discountContainer}>
      {/* Icon */}
      <Image source={iconSource} style={styles.discountIcon} />

      {/* Discount Text */}
      <View style={{ flexDirection: "column" }}>
        <StyledText preset={"pageSubheader"} style={styles.discountTitle}>
          {title}
        </StyledText>

        {/* Discount Percentage */}
        <StyledText preset={"pageSubheader"} style={styles.discountPercentage}>
          {discountMeta.offerDiscountPercentage ? (
            <>
              <StyledText
                preset={"pageSubheader"}
                style={{ textDecorationLine: "line-through", color: "#6B6B6B" }}
              >
                {discountMeta.discountPercentage}%
              </StyledText>{" "}
              {discountMeta.offerDiscountPercentage}%
            </>
          ) : (
            <StyledText preset={"pageSubheader"}>
              {`${discountMeta.discountPercentage}%`}
            </StyledText>
          )}{" "}
          <StyledText preset={"pageSubheader"}>
            off up to ₹{discountMeta.maxDiscount}
          </StyledText>
        </StyledText>
      </View>
    </View>
  );
};

export default function CashbackForPostingOnInsta() {
  return (
    <View
      style={{
        width: "100%",
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <View
        style={{
          width: "100%",
          flex: 1,
          justifyContent: "center",
          paddingVertical: 12,
          alignItems: "flex-start",
        }}
      >
        <StyledText
          preset={"headingMedium"}
          style={{
            paddingVertical: 12,
            paddingHorizontal: 12,
            borderRadius: 10,
            overflow: "hidden",
          }}
        >
          Cashback for posting on Instagram
        </StyledText>
        <View style={{ marginBottom: 0, marginLeft: -10 }}>
          <DiscountMeta
            title="Reel or post"
            discountMeta={brandDetails?.brandDetailsMeta?.reelDiscountMeta}
          />
          <DiscountMeta
            title="Story"
            discountMeta={brandDetails?.brandDetailsMeta?.storyDiscountMeta}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  discountText: {
    textAlign: "left",
    color: "black",
    fontSize: 16,
    flexShrink: 1,
  },
  discountContainer: {
    flexDirection: "row",
    marginLeft: 25,
    alignItems: "center",
    justifyContent: "flex-start",
    marginBottom: 15,
    width: "100%",
  },
  discountIcon: {
    width: 27,
    height: 27,
    marginRight: 10,
  },
  discountTitle: {
    textAlign: "left",
    color: "black",
    fontSize: 16,
    marginBottom: 2,
  },
  discountPercentage: {
    fontSize: 13,
    color: "black",
    textAlign: "left",
  },
  discountMax: {
    fontSize: 13,
    color: "black",
    textAlign: "left",
  },
});
