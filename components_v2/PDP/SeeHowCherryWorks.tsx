import { View, TouchableOpacity, StyleSheet } from "react-native";
import { router } from "expo-router";
import StyledText from "../common/StyledText";
import { brandDetails } from "./BrandDetails";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function SeeHowCherryWorks() {
  return (
    <View style={styles.buttonWrapper}>
      <TouchableOpacity
        style={styles.rowButton}
        onPress={() => {
          //   track("button-clicked", {
          //     label: "how-cherry-works",
          //     screen: "cherry-creators/brand-page/cashback-brand-overview",
          //   });
          if (
            brandDetails?.brandDetailsMeta?.brandId ===
            "670783af1da35d67bc57a357"
          ) {
            router.push({
              pathname: "/onboarding/NewMeHowItWorksScreen",
              params: {
                fromBrand: "true",
                website: brandDetails?.brandDetailsMeta?.website,
                brandName: brandDetails?.brandDetailsMeta?.name,
              },
            });
          } else {
            router.push({
              pathname: "/onboarding/HowItWorksScreen",
              params: {
                fromBrand: "true",
                website: brandDetails?.brandDetailsMeta?.website,
                brandName: brandDetails?.brandDetailsMeta?.name,
              },
            });
          }
        }}
      >
        <StyledText preset="headingMedium" style={styles.rowButtonText}>
          See how Cherry works
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
