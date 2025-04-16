import { Divider } from "react-native-paper";
import { View, TouchableOpacity, StyleSheet, Platform } from "react-native";
import { router } from "expo-router";
import { brandDetails } from "@/components_v2/PDP/BrandDetails";
import TextButton from "../common/TextButton";

export default function ButtonsAtEnd() {
  return (
    <View style={styles.buttonContainer}>
      <TextButton
        style={{ marginBottom: 8 }}
        variant="small"
        text={`Buy from ${brandDetails?.brandDetailsMeta?.name}`}
        color="black"
        onPress={() => {
          //   track("continue-clicked", {
          //     label: "shop",
          //     brand: brandDetails?.brandDetailsMeta?.name,
          //     screen: "cherry-creators/brand-page/cashback-brand-overview",
          //   });
          if (brandDetails?.brandDetailsMeta?.website) {
            router.push({
              pathname: "/webview/WebViewScreen",
              params: {
                url: "https://" + brandDetails?.brandDetailsMeta?.website,
                reelOrPostCashbackMeta: JSON.stringify(
                  brandDetails?.brandDetailsMeta?.reelDiscountMeta
                ),
                storyCashbackMeta: JSON.stringify(
                  brandDetails?.brandDetailsMeta?.storyDiscountMeta
                ),
              },
            });
          }
        }}
      />
      <TextButton
        text="Add to Favourites"
        color="black"
        variant="outlined-small"
        trackingData={{
          label: "claim-cashback",
          brand: brandDetails?.brandDetailsMeta?.name,
          screen: "cherry-creators/brand-page/cashback-brand-overview",
        }}
        style={{
          marginBottom: Platform.OS === "ios" ? 16 : 0, // Conditionally add marginBottom for iOS
        }}
        onPress={async () => {
          //   const response = await fetchUserInfo();
          router.push({
            pathname: "/upload_details/UpiIdAvailableScreen",
            params: {
              type: "cashback",
              brandId: brandDetails?.brandDetailsMeta?.brandId,
              brandName: brandDetails?.brandDetailsMeta?.name,
              transactionId: null,
            },
          });
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    width: "100%",
    paddingVertical: 24,
    paddingHorizontal: 20,
    // marginTop: 24,
    // marginHorizontal: 20,
    borderTopColor: "#F1F1F1",
    borderTopWidth: 2,
  },
});
