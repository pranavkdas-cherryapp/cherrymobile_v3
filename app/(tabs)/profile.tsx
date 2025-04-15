import React, { useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SectionList,
  Dimensions,
  PanResponder,
  Pressable,
} from "react-native";

const ALPHABETS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

// Generate sample data
const generateData = () => {
  return ALPHABETS.map((letter) => ({
    title: letter,
    data: Array.from({ length: 3 }, (_, i) => `${letter} Brand ${i + 1}`),
  }));
};

export default function App() {
  const sections = generateData();
  const sectionListRef = useRef(null);
  const [activeLetter, setActiveLetter] = useState(null);

  // Get screen height and item height
  const { height: screenHeight } = Dimensions.get("window");
  const indexItemHeight = screenHeight / ALPHABETS.length;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      // Fires immediately when finger touches the alphabet bar
      onPanResponderGrant: (_, gestureState) => {
        const index = Math.floor(gestureState.y0 / indexItemHeight);
        if (index >= 0 && index < ALPHABETS.length) {
          const letter = ALPHABETS[index];
          setActiveLetter(letter);
          const sectionIndex = sections.findIndex(
            (section) => section.title === letter
          );
          if (sectionIndex !== -1 && sectionListRef.current) {
            sectionListRef.current.scrollToLocation({
              sectionIndex,
              itemIndex: 0,
              animated: false,
            });
          }
        }
      },
      onPanResponderMove: (_, gestureState) => {
        const index = Math.floor(gestureState.moveY / indexItemHeight);
        if (index >= 0 && index < ALPHABETS.length) {
          const letter = ALPHABETS[index];
          setActiveLetter(letter);
          const sectionIndex = sections.findIndex(
            (section) => section.title === letter
          );
          if (sectionIndex !== -1 && sectionListRef.current) {
            sectionListRef.current.scrollToLocation({
              sectionIndex,
              itemIndex: 0,
              animated: false,
            });
          }
        }
      },
      onPanResponderRelease: () => setActiveLetter(null),
      onPanResponderTerminate: () => setActiveLetter(null),
    })
  ).current;

  return (
    <View style={styles.container}>
      <SectionList
        ref={sectionListRef}
        sections={sections}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.itemText}>{item}</Text>
          </View>
        )}
        renderSectionHeader={({ section: { title } }) => (
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionHeaderText}>{title}</Text>
          </View>
        )}
      />

      {/* Alphabet Index */}
      <View style={styles.alphabetIndexContainer} {...panResponder.panHandlers}>
        {ALPHABETS.map((letter) => (
          <View
            style={{
              height: indexItemHeight,
              width: 32,
              justifyContent: "center",
              borderColor: "red",
              borderWidth: 1,
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
    backgroundColor: "#fff",
  },
  sectionHeader: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    backgroundColor: "#eee",
  },
  sectionHeaderText: {
    fontWeight: "bold",
    fontSize: 16,
  },
  item: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomColor: "#ccc",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  itemText: {
    fontSize: 16,
  },
  alphabetIndexContainer: {
    position: "absolute",
    right: 0,
    top: 0,
    bottom: 0,
    width: 24,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 4,
    marginRight: 12,
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
});
