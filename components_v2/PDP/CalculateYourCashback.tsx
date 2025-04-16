import { View, TouchableOpacity, StyleSheet } from "react-native";
import { router } from "expo-router";
import StyledText from "../common/StyledText";
import { brandDetails } from "./BrandDetails";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function CalculateYourCashbackButton() {
  return (
    <View style={styles.buttonWrapper}>
      <TouchableOpacity
        style={styles.rowButton}
        onPress={() => {
          //   track("button-clicked", {
          //     label: "calculate-cashback",
          //     screen: "cherry-creators/brand-page/cashback-brand-overview",
          //   });
          router.push({
            pathname: "/cashback/calculation",
            params: {
              fromBrand: "true",
              brandName: brandDetails?.brandDetailsMeta?.name,
              brandId: brandDetails?.brandDetailsMeta?.brandId,
              reelDiscountMeta: JSON.stringify(
                brandDetails?.brandDetailsMeta?.reelDiscountMeta
              ),
              postDiscountMeta: JSON.stringify(
                brandDetails?.brandDetailsMeta?.postDiscountMeta
              ),
              storyDiscountMeta: JSON.stringify(
                brandDetails?.brandDetailsMeta?.storyDiscountMeta
              ),
              offerType: brandDetails?.brandDetailsMeta?.offerType,
            },
          });
        }}
      >
        <StyledText preset="headingMedium" style={styles.rowButtonText}>
          Calculate your cashback
        </StyledText>
        <MaterialCommunityIcons
          name="chevron-right-circle-outline"
          size={24}
          color="black"
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  rowButton: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 9,
    paddingVertical: 14,
  },
  rowButtonText: {
    color: "black",
    fontSize: 16,
    flex: 1,
  },
  buttonWrapper: {
    width: "100%",
    height: 63,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
});
