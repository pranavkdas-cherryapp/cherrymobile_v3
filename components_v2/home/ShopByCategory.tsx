import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useState } from "react";
import { router } from "expo-router";

const brands = [
  {
    id: "1",
    name: "Chapter 2",
    image: require("@/assets/images/brands/chapter2.png"),
  },
  {
    id: "2",
    name: "Allways",
    image: require("@/assets/images/brands/allways.png"),
  },
  {
    id: "3",
    name: "TYPSY Beauty",
    image: require("@/assets/images/brands/typsy.png"),
  },
  {
    id: "4",
    name: "Off duty",
    image: require("@/assets/images/brands/offduty.png"),
  },
  {
    id: "5",
    name: "Serenade",
    image: require("@/assets/images/brands/serenade.png"),
  },
  {
    id: "6",
    name: "NEWME",
    image: require("@/assets/images/brands/newme.png"),
  },
  {
    id: "7",
    name: "Chapter 2",
    image: require("@/assets/images/brands/chapter2.png"),
  },
  {
    id: "8",
    name: "Allways",
    image: require("@/assets/images/brands/allways.png"),
  },
  {
    id: "9",
    name: "TYPSY Beauty",
    image: require("@/assets/images/brands/typsy.png"),
  },
  {
    id: "10",
    name: "Off duty",
    image: require("@/assets/images/brands/offduty.png"),
  },
  {
    id: "11",
    name: "Serenade",
    image: require("@/assets/images/brands/serenade.png"),
  },
  {
    id: "12",
    name: "NEWME",
    image: require("@/assets/images/brands/newme.png"),
  },
];

// Utility to split array into two rows
const splitIntoRows = (list) => {
  const row1 = list.filter((_, index) => index % 2 === 0);
  const row2 = list.filter((_, index) => index % 2 === 1);
  return [row1, row2];
};

export default function ShopByCategory() {
  const [row1, row2] = splitIntoRows(brands);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Shop by brands</Text>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.rowsWrapper}>
          {/* Row 1 */}
          <View style={styles.row}>
            {row1.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.brandCard}
                onPress={() => router.push("/shop")}
              >
                <Image source={item.image} style={styles.brandImage} />
                <Text style={styles.brandName}>{item.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
          {/* Row 2 */}
          <View style={styles.row}>
            {row2.map((item) => (
              <View key={item.id} style={styles.brandCard}>
                <Image source={item.image} style={styles.brandImage} />
                <Text style={styles.brandName}>{item.name}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    paddingTop: 16,
    backgroundColor: "#fff",
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
  },
  rowsWrapper: {
    flexDirection: "column",
  },
  row: {
    flexDirection: "row",
    marginBottom: 12,
  },
  brandCard: {
    width: 108,
    marginRight: 20,
    alignItems: "center",
  },
  brandImage: {
    width: 108,
    height: 136,
    borderRadius: 8,
    marginBottom: 6,
    resizeMode: "cover",
  },
  brandName: {
    fontSize: 12,
    textAlign: "center",
  },
});

// const styles = StyleSheet.create({
//   container: {
//     marginTop: 16,
//     paddingTop: 16,
//     backgroundColor: "#fff",
//   },
//   heading: {
//     fontSize: 18,
//     fontWeight: "bold",
//     marginBottom: 12,
//   },
//   brandCard: {
//     width: 108, // Adjust width to fit two rows properly
//     marginBottom: 20,
//     alignItems: "center",
//   },
//   brandImage: {
//     width: 108,
//     height: 136,
//     borderRadius: 8,
//     marginBottom: 6,
//     resizeMode: "cover",
//   },
//   brandName: {
//     fontSize: 12,
//     textAlign: "center",
//   },
//   tabsContainer: {
//     flexDirection: "row",
//     justifyContent: "center",
//     marginBottom: 20,
//     gap: 10,
//   },
//   tabButton: {
//     paddingHorizontal: 16,
//     paddingVertical: 8,
//     borderRadius: 20,
//     backgroundColor: "#f5f5f5",
//   },
//   activeTab: {
//     backgroundColor: "#eee",
//   },
//   tabText: {
//     fontSize: 14,
//     color: "#000",
//   },
//   activeTabText: {
//     fontWeight: "bold",
//   },
//   productsGrid: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//     justifyContent: "space-between",
//   },
//   productCard: {
//     width: "30%",
//     height: 100,
//     borderRadius: 12,
//     backgroundColor: "#fafafa",
//     marginBottom: 16,
//     justifyContent: "center",
//     alignItems: "center",
//     elevation: 1,
//   },
//   productName: {
//     fontSize: 14,
//     textAlign: "center",
//   },
// });
