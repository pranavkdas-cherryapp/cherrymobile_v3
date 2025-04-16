import React, { useState, useRef } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

const { width } = Dimensions.get("window");

const visualVariants = [
  { id: "1", image: require("@/assets/images/variant1.png") },
  { id: "2", image: require("@/assets/images/variant2.png") },
  { id: "3", image: require("@/assets/images/variant1.png") },
];

const nonVisualVariants = ["XS", "S", "M", "L", "XL", "XXL"];

export default function ProductDetailScreen() {
  const [selectedVisual, setSelectedVisual] = useState("1");
  const [selectedSize, setSelectedSize] = useState("S");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [detailsVisible, setDetailsVisible] = useState(false);
  const scrollRef = useRef(null);

  const handleScroll = (event) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentIndex(index);
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#fff" }}>
      {/* Header */}
      <View
        style={{
          padding: 10,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingTop: Platform.OS === "ios" ? 30 : 50, //Should be overlay and not sequential
        }}
      >
        <Ionicons name="arrow-back" size={24} onPress={() => router.back()} />
        <View style={{ flexDirection: "row", gap: 10 }}>
          <Ionicons name="heart-outline" size={24} />
          <Ionicons name="share-social-outline" size={24} />
          <Ionicons name="help-circle-outline" size={24} />
        </View>
      </View>

      {/* Product Images Carousel */}
      <FlatList
        data={visualVariants}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        ref={scrollRef}
        renderItem={({ item }) => (
          <Image
            source={item.image}
            style={{ width: width, height: 300, resizeMode: "contain" }}
          />
        )}
      />

      {/* Carousel Dots */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          marginTop: 10,
        }}
      >
        {visualVariants.map((_, index) => (
          <View
            key={index}
            style={{
              width: 8,
              height: 8,
              borderRadius: 4,
              backgroundColor: currentIndex === index ? "#000" : "#ccc",
              marginHorizontal: 4,
            }}
          />
        ))}
      </View>

      {/* Product Info */}
      <View style={{ padding: 20 }}>
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>
          The OG & Glazed Jalebi
        </Text>
        <Text style={{ fontSize: 16, color: "#888", marginTop: 5 }}>
          ₹1,579
        </Text>

        {/* Visual Variants */}
        <View style={{ flexDirection: "row", gap: 10, marginTop: 15 }}>
          {visualVariants.map((variant) => (
            <TouchableOpacity
              key={variant.id}
              onPress={() => setSelectedVisual(variant.id)}
              style={{
                borderWidth: selectedVisual === variant.id ? 2 : 1,
                borderColor: selectedVisual === variant.id ? "black" : "#ccc",
                padding: 5,
                borderRadius: 8,
              }}
            >
              <Image
                source={variant.image}
                style={{ width: 40, height: 40, resizeMode: "contain" }}
              />
            </TouchableOpacity>
          ))}
        </View>

        {/* Non-Visual Variant Options */}
        <Text style={{ marginTop: 20, fontWeight: "500" }}>Sizes</Text>
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            gap: 10,
            marginTop: 10,
          }}
        >
          {nonVisualVariants.map((size) => (
            <TouchableOpacity
              key={size}
              onPress={() => setSelectedSize(size)}
              style={{
                paddingHorizontal: 16,
                paddingVertical: 8,
                borderRadius: 8,
                borderWidth: 1,
                borderColor: selectedSize === size ? "black" : "#ccc",
                backgroundColor: selectedSize === size ? "#f0f0f0" : "white",
              }}
            >
              <Text style={{ color: selectedSize === size ? "black" : "#777" }}>
                {size}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Product Details Accordion */}
      <View style={{ padding: 20 }}>
        <TouchableOpacity onPress={() => setDetailsVisible(!detailsVisible)}>
          <Text style={{ fontSize: 16, fontWeight: "600" }}>
            Product details {detailsVisible ? "▲" : "▼"}
          </Text>
        </TouchableOpacity>
        {detailsVisible && (
          <Text style={{ marginTop: 10, color: "#555" }}>
            This is a luxurious skincare product packed with Ayurvedic
            ingredients, designed to deeply hydrate and rejuvenate your skin. It
            combines the nourishing power of natural extracts with modern
            science for glowing, healthy skin.
          </Text>
        )}
      </View>
    </ScrollView>
  );
}
