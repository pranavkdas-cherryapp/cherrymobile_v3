import React, { useState, useRef, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  ScrollView,
} from "react-native";
import IconButton from "@/components_v2/common/IconButton";
import { Searchbar } from "react-native-paper";
import { router } from "expo-router";
import CategoryTabs from "@/components_v2/home/CategoryTabs";
import HomeActionCard from "@/components_v2/common/HomeActionCard";
import SearchInputBar from "@/components_v2/common/SearchInputBar";
import ShopByCategory from "@/components_v2/home/ShopByCategory";
import Collections from "@/components_v2/home/Collections";
import LottieView from "lottie-react-native";
import { useAppDispatch } from "@/store/hooks";
import { getBrandsList } from "@/store/slices/BrandsSlice";

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useAppDispatch();
  const [isSearchActive, setIsSearchActive] = useState(false);
  const searchbarRef = useRef<typeof Searchbar>(null);
  const animationRef = useRef<LottieView>(null);
  const [playCount, setPlayCount] = useState(0);

  useEffect(() => {
    if (playCount < 1 && animationRef.current) {
      animationRef.current.play();
    }
  }, [playCount]);

  useEffect(() => {
    dispatch(getBrandsList());
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <SearchInputBar
            isSearchActive={isSearchActive}
            searchbarRef={searchbarRef}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onSearchFocus={() => setIsSearchActive(true)}
            onSearchBlur={() => setIsSearchActive(false)}
            containerStyle={styles.searchInput}
          />
          <View style={styles.searchIcons}>
            <IconButton iconKey="wishlist" width={28} height={28} />
            <IconButton iconKey="help" width={28} height={28} />
          </View>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.membershipCard}>
            <LottieView
              ref={animationRef}
              loop={false}
              source={require("@/assets/lottie/home_button_animation.json")}
              onAnimationFinish={() => {
                setPlayCount((prevCount) => prevCount + 1);
              }}
              style={StyleSheet.absoluteFillObject}
            />
            <View style={styles.membershipHeader}>
              <IconButton iconKey="goldBadge" width={26} height={30} />
              <Text style={styles.membershipTitle}>Cherry Gold Member</Text>
            </View>
            <Text style={styles.moneySavedLabel}>Money Saved</Text>

            <View style={styles.membershipDetails}>
              <Text style={styles.moneySavedAmount}>₹1,200</Text>
              <TouchableOpacity
                style={styles.shopButton}
                onPress={() => router.push("/shop")}
              >
                <Text style={styles.shopButtonText}>Shop →</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Action Cards */}
          <View style={styles.actionCardsContainer}>
            <HomeActionCard
              title="What to do?"
              subtitle="Shop, post, earn"
              imageSource={require("@/assets/images/what-todo.png")}
              onPress={() => null}
              containerStyle={styles.actionCardLeft}
              imageStyle={styles.actionCardLeftImage}
            />
            <View style={{ flex: 1 }}>
              <HomeActionCard
                title="Where will I get?"
                subtitle="UPI account"
                imageSource={require("../../assets/images/guard.png")}
                onPress={() => null}
                containerStyle={styles.actionCardTopRight}
                imageStyle={styles.actionCardTopRightImage}
              />
              <HomeActionCard
                title="How much?"
                subtitle="Calculate now!"
                imageSource={require("@/assets/images/coins.png")}
                onPress={() => null}
                containerStyle={styles.actionCardBottomRight}
                imageStyle={styles.actionCardBottomRightImage}
              />
            </View>
          </View>
          <HomeActionCard
            title="Our wall of love"
            imageSource={require("@/assets/images/reviews-stars.png")}
            subtitle="Reviews from our happy users"
            onPress={() => null}
            containerStyle={styles.reviewActionCard}
            imageStyle={styles.reviewActionCardImage}
          />
          <ShopByCategory />
          <CategoryTabs />
          <Collections />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

// Styles
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    paddingTop: Platform.OS === "ios" ? 20 : 30,
    paddingHorizontal: 20,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
  },
  searchIcons: {
    flexDirection: "row",
    marginLeft: 10,
  },
  iconButton: {
    width: 20,
    height: 20,
    marginLeft: 10,
    alignSelf: "center",
  },
  iconButton2: {
    width: 20,
    height: 20,
  },
  membershipCard: {
    height: 180,
    backgroundColor: "#000",
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    overflow: "hidden",
  },
  membershipHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  membershipTitle: {
    color: "white",
    fontSize: 18,
    marginLeft: 10,
    fontWeight: "bold",
  },
  moneySavedLabel: {
    color: "#ccc",
    marginTop: 20,
    fontSize: 16,
  },
  moneySavedAmount: {
    color: "white",
    fontSize: 48,
    fontWeight: "bold",
    marginTop: 5,
  },
  shopButton: {
    width: 77,
    height: 36,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    marginTop: 20,
    justifyContent: "center", // center vertically
    alignItems: "center", // center horizontally
  },
  shopButtonText: {
    color: "#000",
    fontSize: 12,
    fontWeight: "bold",
  },
  actionCardsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 16,
  },
  actionCardLeft: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#F1F1F1",
    marginRight: 8,
    height: 150,
  },
  actionCardLeftImage: {
    marginTop: 4,
    marginLeft: 50,
    height: 120,
    width: 120,
  },
  actionCardTopRight: {
    borderWidth: 1,
    borderColor: "#F1F1F1",
    marginBottom: 8,
    padding: 8,
    height: 71,
  },
  actionCardTopRightImage: {
    marginLeft: 90,
    bottom: 40,
    height: 70,
    width: 70,
  },
  actionCardBottomRight: {
    borderWidth: 1,
    borderColor: "#F1F1F1",
    padding: 8,
    height: 71,
  },
  actionCardBottomRightImage: {
    marginLeft: 105,
    bottom: 20,
    height: 40,
    width: 40,
  },
  reviewActionCard: {
    borderWidth: 1,
    borderColor: "#F1F1F1",
    padding: 8,
    height: 71,
    marginTop: 10,
  },
  reviewActionCardImage: {
    right: 7,
    position: "absolute",
    bottom: 20,
    height: 30,
    width: 121,
  },

  membershipDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  membershipDetailsItem: {
    flexDirection: "column",
    alignItems: "center",
  },
});
