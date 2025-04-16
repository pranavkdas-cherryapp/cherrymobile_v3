export const brandDetails = {
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

export interface Product {
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
