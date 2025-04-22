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
  SectionListData,
  DefaultSectionT,
} from "react-native";
import { Image } from "expo-image";
import IconButton from "@/components_v2/common/IconButton";
import StyledText from "@/components_v2/common/StyledText";
import { useAppSelector } from "@/store/hooks";
import { getBrandsGroupedByStartingLetterList } from "@/store/slices/BrandsSlice";

// const ALPHABETS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export default function ListWithAlphabetScroll() {
  const brandsGroupedByStartingLetterList = useAppSelector(
    getBrandsGroupedByStartingLetterList
  );
  const sections = React.useMemo(
    () => brandsGroupedByStartingLetterList,
    [brandsGroupedByStartingLetterList]
  );

  const ALPHABETS = React.useMemo(
    () => sections.map((section: any) => section.title),
    [sections]
  );

  const containerRef = useRef<View>(null);
  const containerYRef = useRef(0);

  const handleLayout = () => {
    if (containerRef.current) {
      containerRef.current.measure((x, y, width, height, pageX, pageY) => {
        console.log("Y position of component:", pageY);
        containerYRef.current = pageY;
      });
    }
  };

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

  const ITEM_HEIGHT = 64; // Approximate row height (you can adjust this)
  const HEADER_HEIGHT = 44; // As defined in your styles

  const getItemLayout = (
    data: SectionListData<string, DefaultSectionT>[] | null,
    index: number
  ): { length: number; offset: number; index: number } => {
    let offset = 0;
    let itemCount = 0;

    if (!data) return { length: ITEM_HEIGHT, offset: 0, index };

    for (let i = 0; i < sections.length; i++) {
      offset += HEADER_HEIGHT; // Add header height
      if (index < itemCount + sections[i].data.length) {
        offset += (index - itemCount) * ITEM_HEIGHT;
        break;
      } else {
        offset += sections[i].data.length * ITEM_HEIGHT;
        itemCount += sections[i].data.length;
      }
    }

    return {
      length: ITEM_HEIGHT,
      offset,
      index,
    };
  };

  const handleLetterSelect = (yPosition: number) => {
    const relativeY = yPosition - translateY - containerYRef.current;
    const index = Math.floor(relativeY / letterHeight);
    if (index >= 0 && index < ALPHABETS.length) {
      const letter = ALPHABETS[index];
      console.log("letter", index);
      setActiveLetter(letter);
      const sectionIndex = sections.findIndex(
        (section: any) => section.title === letter
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
    ({
      item,
      onPress,
    }: {
      item: { brandName: string; brandId: string; logo: string };
      onPress: (item: string) => void;
    }) => {
      return (
        <TouchableOpacity onPress={() => onPress(item)} style={styles.brandRow}>
          <Image source={{ uri: item.logo }} style={styles.brandLogo} />
          <StyledText preset="headingMedium" style={styles.brandName}>
            {item.brandName}
          </StyledText>
          <View style={styles.arrowContainer}>
            <IconButton iconKey="goToNextPage" width={16} height={16} />
          </View>
        </TouchableOpacity>
      );
    }
  );

  return (
    <View ref={containerRef} onLayout={handleLayout} style={styles.container}>
      <SectionList
        ref={sectionListRef}
        sections={sections}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item: any, index: number) => item?.brandId}
        renderItem={renderItem}
        renderSectionHeader={({ section: { title } }) => (
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionHeaderText}>{title}</Text>
          </View>
        )}
        // initialNumToRender={10}
        // maxToRenderPerBatch={10}
        // windowSize={10}
        style={{ paddingHorizontal: 20 }}
        // onScrollToIndexFailed={(info) => {
        //   console.warn("Scroll to index failed", info);
        // }} // not a nice way to handle this
        // getItemLayout={getItemLayout}
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
    right: 10,
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
