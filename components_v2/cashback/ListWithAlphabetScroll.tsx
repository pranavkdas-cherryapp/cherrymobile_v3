import React, { useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SectionList,
  Dimensions,
  PanResponder,
  Platform,
  TouchableOpacity,
} from "react-native";
import { Image } from "expo-image";
import IconButton from "@/components_v2/common/IconButton";
import StyledText from "@/components_v2/common/StyledText";

const ALPHABETS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

// Generate sample data
const generateData = () => {
  return ALPHABETS.map((letter) => ({
    title: letter,
    data: Array.from({ length: 3 }, (_, i) => `Brand ${letter} ${i + 1}`),
  }));
};

export default function ListWithAlphabetScroll() {
  const sections = generateData();
  const sectionListRef = useRef<SectionList>(null);
  const [activeLetter, setActiveLetter] = useState<string | null>(null);

  // Get screen height and item height
  const { height: screenHeight } = Dimensions.get("window");
  const letterHeight = 16;
  const alphabetContainerHeight = letterHeight * ALPHABETS.length;
  const screenHeightWithoutHeader = Platform.OS === "ios" ? 120 : 90; // Because of search bar + tab bar
  const translateY =
    (screenHeight - alphabetContainerHeight) / 2 - screenHeightWithoutHeader;
  console.log(screenHeight);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: (_, gestureState) => {
        handleLetterSelect(gestureState.y0);
      },
      onPanResponderMove: (_, gestureState) => {
        handleLetterSelect(gestureState.moveY);
      },
      onPanResponderRelease: () => setActiveLetter(null),
      onPanResponderTerminate: () => setActiveLetter(null),
    })
  ).current;

  const handleLetterSelect = (yPosition: number) => {
    const relativeY = yPosition - translateY;
    console.log("relativeY", relativeY, translateY, yPosition);
    const index = Math.floor(yPosition / letterHeight);
    if (index >= 0 && index < ALPHABETS.length) {
      const letter = ALPHABETS[index];
      console.log("letter", index);
      setActiveLetter(letter);
      const sectionIndex = sections.findIndex(
        (section) => section.title === letter
      );
      if (sectionIndex !== -1 && sectionListRef.current) {
        sectionListRef.current?.scrollToLocation({
          sectionIndex,
          itemIndex: 0,
          animated: false,
        });
      }
    }
  };

  const handleBrandPress = (item: string) => {
    console.log("item", item);
  };

  const renderItem = React.useCallback(({ item }: { item: string }) => {
    return <BrandRow item={item} onPress={handleBrandPress} />;
  }, []);

  const BrandRow = React.memo(
    ({ item, onPress }: { item: string; onPress: (item: string) => void }) => {
      return (
        <TouchableOpacity onPress={() => onPress(item)} style={styles.brandRow}>
          <Image
            source={{ uri: "https://picsum.photos/200/300" }}
            style={styles.brandLogo}
          />
          <StyledText preset="headingMedium" style={styles.brandName}>
            {item}
          </StyledText>
          <View style={styles.arrowContainer}>
            <IconButton iconKey="goToNextPage" width={16} height={16} />
          </View>
        </TouchableOpacity>
      );
    }
  );

  return (
    <View style={styles.container}>
      <SectionList
        ref={sectionListRef}
        sections={sections}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => item + index}
        renderItem={renderItem}
        renderSectionHeader={({ section: { title } }) => (
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionHeaderText}>{title}</Text>
          </View>
        )}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={10}
        getItemLayout={(_, index) => ({
          length: translateY, // estimated total row height including padding (adjust as needed)
          offset: translateY * index,
          index,
        })}
      />

      {/* Alphabet Index */}
      <View
        style={[
          styles.alphabetIndexContainer,
          {
            height: alphabetContainerHeight,
            transform: [{ translateY }],
          },
        ]}
        {...panResponder.panHandlers}
      >
        {ALPHABETS.map((letter) => (
          <View
            key={letter}
            style={{
              height: letterHeight,
              width: 20,
              justifyContent: "center",
            }}
          >
            <Text
              style={[
                styles.indexLetter,
                letter === activeLetter && styles.activeIndexLetter,
              ]}
            >
              {letter}
            </Text>
          </View>
        ))}
      </View>

      {/* Floating Letter Popup */}
      {activeLetter && (
        <View style={styles.letterOverlay}>
          <Text style={styles.letterOverlayText}>{activeLetter}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sectionHeader: {
    height: 20,
    marginTop: 24,
    marginBottom: 0,
  },
  sectionHeaderText: {
    fontWeight: "bold",
    fontSize: 16,
  },
  alphabetIndexContainer: {
    position: "absolute",
    right: -12,
    width: 20,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  indexLetter: {
    fontSize: 12,
    color: "#444",
    textAlign: "center",
  },
  activeIndexLetter: {
    color: "#007AFF",
    fontWeight: "bold",
  },
  letterOverlay: {
    position: "absolute",
    alignSelf: "center",
    top: "40%",
    backgroundColor: "rgba(0,0,0,0.6)",
    padding: 20,
    borderRadius: 10,
  },
  letterOverlayText: {
    color: "#fff",
    fontSize: 40,
    fontWeight: "bold",
  },
  ////
  brandRow: {
    flexDirection: "row",
    alignItems: "center",
    // height: 47,
    // paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F1F1",
  },
  brandLogo: {
    width: 32,
    height: 32,
    marginRight: 12,
    borderWidth: 1,
    borderColor: "#F1F1F1",
    borderRadius: 100,
  },
  brandName: {
    color: "black",
    width: "100%",
    textAlign: "left",
    paddingVertical: 18,
  },
  arrowContainer: {
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    right: 20,
  },
});
