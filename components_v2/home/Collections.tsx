import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";

export default function Collections() {
  const collections = [
    {
      title: "Loose fits",
      description: "Easy, relaxed styles you can wear anytime.",
      button: "Shop now",
      price: "Rs. 1,499.00",
      product: "Loose Fit Printed T-Shirt",
      image: require("@/assets/images/loose-fits.png"), // Replace with your local image
    },
    {
      title: "Seasonal edit",
      description: "",
      button: "",
      price: "Rs. 1,999.00",
      product: "Viscose strappy dress",
      image: require("@/assets/images/seasonal-edit.png"),
    },
    {
      title: "The Resort Edit",
      description: "",
      button: "",
      price: "Rs. 1,499.00",
      product: "Seamless Medium Support Bra",
      image: require("@/assets/images/resort-edit.png"),
    },
  ];

  const overlayObjects = (item: any) => {
    return (
      <View style={styles.overlay}>
        <View style={styles.topTags}>
          <Text style={styles.priceTag}>{item.price}</Text>
          <Text style={styles.productTag}>{item.product}</Text>
        </View>
        <View style={styles.bottomContent}>
          <Text style={styles.title}>{item.title}</Text>
          {item.description ? (
            <Text style={styles.description}>{item.description}</Text>
          ) : null}
          {item.button ? (
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>{item.button}</Text>
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Collections</Text>
      {collections.map((item, index) => (
        <View key={index} style={styles.card}>
          <Image source={item.image} style={styles.image} />
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
  },
  card: {
    marginBottom: 24,
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: "#eee",
  },
  image: {
    width: "100%",
    height: 144,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "space-between",
    padding: 16,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
  },
  topTags: {},
  priceTag: {
    backgroundColor: "#000",
    color: "#fff",
    fontSize: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginBottom: 4,
    alignSelf: "flex-start",
  },
  productTag: {
    backgroundColor: "#fff",
    color: "#000",
    fontSize: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    alignSelf: "flex-start",
  },
  bottomContent: {},
  title: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  description: {
    color: "#fff",
    marginBottom: 12,
    fontSize: 14,
  },
  button: {
    backgroundColor: "#fff",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignSelf: "flex-start",
  },
  buttonText: {
    color: "#000",
    fontWeight: "600",
  },
});
