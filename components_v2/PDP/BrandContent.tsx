import StyledText from "@/components_v2/common/StyledText";
import { Divider } from "react-native-paper";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { router } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import ProductList from "@/components_v2/PDP/ProductList";
import { Product, brandDetails } from "@/components_v2/PDP/BrandDetails";

export default function BrandContent({ products }: { products: Product[] }) {
  const isNewMeBrand =
    brandDetails?.brandDetailsMeta?.brandId === "670783af1da35d67bc57a357";
  const hasWebsite = !!brandDetails?.brandDetailsMeta?.website;
  const hasValidProductIds =
    brandDetails?.brandDetailsMeta?.shopifyHandles?.length > 0;

  const renderDescription = () => (
    <>
      <StyledText preset="pageHeader" style={styles.header}>
        {brandDetails?.brandDetailsMeta?.name}
      </StyledText>
      <StyledText
        preset="pageSubheader"
        style={{ textAlign: "center", color: "#5B5B5B" }}
      >
        {brandDetails?.brandDetailsMeta?.description}
      </StyledText>
      <Divider style={styles.divider} />
    </>
  );

  if (isNewMeBrand) {
    return (
      <View>
        <StyledText preset="pageHeader" style={styles.header}>
          {brandDetails?.brandDetailsMeta?.name}
        </StyledText>
        <TouchableOpacity
          style={{
            backgroundColor: "#FBDDA0",
            justifyContent: "space-evenly",
            alignItems: "center",
            flexDirection: "row",
            paddingHorizontal: 22,
            paddingVertical: 8,
            borderRadius: 15,
          }}
          onPress={() => {
            router.push({
              pathname: "/onboarding/NewMeHowItWorksScreen",
              params: {
                fromBrand: "true",
                website: brandDetails?.brandDetailsMeta?.website,
                brandName: brandDetails?.brandDetailsMeta?.name,
              },
            });
          }}
        >
          <StyledText
            preset={"consentText"}
            style={{
              marginRight: 8,
              paddingRight: 40,
              paddingLeft: 8,
            }}
          >
            Post on Instagram and leave a product{" "}
            <StyledText style={{ textDecorationLine: "underline" }}>
              review on the NewMe app
            </StyledText>{" "}
            for cashback
          </StyledText>
          <MaterialIcons name="info-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>
    );
  }

  if (!hasWebsite || !hasValidProductIds) {
    return renderDescription();
  }

  const shouldShowDescription = products.length === 0;

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <StyledText
        style={{
          fontSize: 16,
          fontWeight: "600",
          paddingTop: 16,
          paddingHorizontal: 12,
        }}
      >
        More from {brandDetails?.brandDetailsMeta?.name}
      </StyledText>
      <ProductList
        products={products}
        storyDiscountMeta={brandDetails?.brandDetailsMeta?.storyDiscountMeta}
        reelOrPostDiscountMeta={
          brandDetails?.brandDetailsMeta?.reelDiscountMeta
        }
      />
      {shouldShowDescription && renderDescription()}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    marginTop: 40,
    textAlign: "center",
  },

  divider: {
    width: "100%",
    marginHorizontal: 32,
    marginTop: 25,
    marginBottom: 10,
    height: 2,
    backgroundColor: "#f3f3f3",
  },
});
