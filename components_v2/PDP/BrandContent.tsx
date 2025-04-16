import StyledText from "@/components_v2/common/StyledText";
// import { Divider } from "@/components_v2/common/Divider";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { router } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import ProductList from "@/components_v2/PDP/ProductList";

const brandDetails = {
  brandDetailsMeta: {
    brandId: "67de68e9304dfe15b3244f64",
    brandType: "CASHBACK",
    category: {
      description: "Skincare and makeup products",
      id: "670014ae73fb1b5ab9355638",
      name: "Beauty",
    },
    description: "Skin-loving, high quality SPF that you actually want to wear",
    discountPercentage: 60,
    instagramHandle: "52sundaze_",
    instagramImageOne:
      "https://cherry-meta.s3.ap-south-1.amazonaws.com/52+Sundaez_insta.png",
    instagramImageSecond: null,
    logo: "https://cherry-meta.s3.ap-south-1.amazonaws.com/52+Sundaez_logo.png",
    maxDiscount: 1500,
    name: "52 Sundaze",
    offerDescription: null,
    offerDiscountPercentage: null,
    offerMaxDiscount: null,
    offerType: null,
    postDiscountMeta: {
      discountPercentage: 60,
      maxDiscount: 1500,
      offerDiscountPercentage: null,
    },
    priceLevel: null,
    primaryImage:
      "https://cherry-meta.s3.ap-south-1.amazonaws.com/52+Sundaez_Cover.png",
    products: null,
    reelDiscountMeta: {
      discountPercentage: 60,
      maxDiscount: 1500,
      offerDiscountPercentage: null,
    },
    shopifyHandles: [
      "spf50-collagen-glow",
      "spf-50-rice-sun-mist",
      "spf-glow-kit-rose",
      "spf-50-sun-milk-multi-active-creme",
      "spf50-clear-glow-spf-mist-with-rosewater",
    ],
    storyDiscountMeta: {
      discountPercentage: 40,
      maxDiscount: 750,
      offerDiscountPercentage: null,
    },
    styles: null,
    website: "52sundaze.com",
  },
  couponCodeRef: null,
  lastTransactionRef: null,
};
interface Product {
  data: {
    product: {
      title: string;
      images: Array<{ src: string }>;
      variants: Array<{ price: string }>;
    };
  };
  productId: string;
  success: boolean;
  error: string | null;
}
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
      {/* <Divider style={styles.divider} /> */}
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
    <>
      <ProductList
        products={products}
        storyDiscountMeta={brandDetails?.brandDetailsMeta?.storyDiscountMeta}
        reelOrPostDiscountMeta={
          brandDetails?.brandDetailsMeta?.reelDiscountMeta
        }
      />
      {shouldShowDescription && renderDescription()}
    </>
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
