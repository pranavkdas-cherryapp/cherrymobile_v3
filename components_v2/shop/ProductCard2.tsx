import { Pressable, View, StyleSheet, Image } from "react-native";
import IconButton from "@/components_v2/common/IconButton";
import React, { useState } from "react";
import { router } from "expo-router";
import Animated from "react-native-reanimated";
import { Text } from "react-native-paper";

const OverlayObjects = ({
  item,
  handleWishlistPress,
}: {
  item: any;
  handleWishlistPress: (item: any) => void;
}) => {
  const wishlistIcon = item.wishlist ? "addedToWishlist" : "notAddedToWishlist";
  return (
    <Pressable
      style={styles.overlay}
      onPress={() => handleWishlistPress({ item })}
    >
      <View style={styles.topTags}>
        <IconButton iconKey={wishlistIcon} width={16} height={16} />
      </View>
      {/* <View style={styles.bottomContent}>
          <Text style={styles.title}>{item.title}</Text>
          {item.description ? (
            <Text style={styles.description}>{item.description}</Text>
          ) : null}
          {item.button ? (
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>{item.button}</Text>
            </TouchableOpacity>
          ) : null}
        </View>  */}
    </Pressable>
  );
};

export const ProductCard = React.memo(
  ({
    item,
    handleWishlistPress,
  }: {
    item: any;
    handleWishlistPress: (item: any) => void;
  }) => {
    if (!item?.images?.[0]) return null; // skip invalid cards

    const [loaded, setLoaded] = useState(false);
    const placeholderUri =
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR4nGP4/PnzfwAJjwPZfT+Y4QAAAABJRU5ErkJggg==";

    return (
      <Pressable onPress={() => router.push(item.url)}>
        <Animated.View entering={Animated.FadeIn} style={styles.card}>
          <View style={[styles.image, { height: item.height }]}>
            {!loaded && (
              <Image
                source={{ uri: placeholderUri }}
                style={[StyleSheet.absoluteFill, { resizeMode: "cover" }]}
              />
            )}
            <Image
              source={{ uri: item.images[0] }}
              style={[StyleSheet.absoluteFill, { opacity: loaded ? 1 : 0 }]}
              onLoad={() => setLoaded(true)}
              resizeMode="cover"
            />
          </View>
          <OverlayObjects
            item={item}
            handleWishlistPress={handleWishlistPress}
          />
          <Text style={styles.productTitle} numberOfLines={2}>
            {item.productTitle}
          </Text>
          <Text style={styles.productPrice}>
            {item.price} . {item.brandName}
          </Text>
        </Animated.View>
      </Pressable>
    );
  }
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    overflow: "hidden",
    margin: 8,
    elevation: 2,
    flex: 1,
  },
  image: {
    width: "100%",
    borderRadius: 12,
  },
  productTitle: {
    fontSize: 14,
    fontWeight: "600",
    marginTop: 8,
    marginHorizontal: 8,
  },
  productPrice: {
    fontSize: 12,
    color: "#555",
    marginTop: 4,
    marginBottom: 8,
    marginHorizontal: 8,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "space-between",
    padding: 8,
  },
  topTags: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
});
