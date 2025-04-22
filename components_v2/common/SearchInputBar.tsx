import React, { RefObject } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Image,
  Platform,
  StyleProp,
  ViewStyle,
  TextStyle,
} from "react-native";
import { Searchbar } from "react-native-paper";
import StyledText from "@/components_v2/common/StyledText"; // adjust if needed

interface SearchInputBarProps {
  isSearchActive: boolean;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onSearchFocus: () => void;
  onSearchBlur: () => void;
  searchbarRef: RefObject<typeof Searchbar>;
  containerStyle?: StyleProp<ViewStyle>;
  searchBarStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  placeholderStyle?: StyleProp<TextStyle>;
  onClearIconPress?: () => void;
}

const SearchInputBar: React.FC<SearchInputBarProps> = ({
  isSearchActive,
  searchQuery,
  setSearchQuery,
  onSearchFocus,
  onSearchBlur,
  searchbarRef,
  containerStyle,
  searchBarStyle,
  inputStyle,
  placeholderStyle,
  onClearIconPress,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.searchContainer,
        isSearchActive && styles.stickyHeader,
        containerStyle,
      ]}
      onPress={onSearchFocus}
      activeOpacity={1}
    >
      <Searchbar
        ref={searchbarRef}
        autoFocus={isSearchActive}
        placeholder=""
        value={searchQuery}
        icon={() => (
          <Image
            source={require("@/assets/images/search.png")}
            style={styles.searchIcon}
          />
        )}
        onFocus={onSearchFocus}
        onBlur={onSearchBlur}
        onChangeText={setSearchQuery}
        style={[styles.searchBar, searchBarStyle]}
        inputStyle={[styles.searchInput, inputStyle]}
        onClearIconPress={onClearIconPress}
      />
      {searchQuery === "" && !isSearchActive && (
        <StyledText
          preset="headingSmall"
          style={[styles.customPlaceholder, placeholderStyle]}
        >
          Search across 50+ brands
        </StyledText>
      )}
    </TouchableOpacity>
  );
};

export default SearchInputBar;

const styles = StyleSheet.create({
  searchContainer: {
    width: "100%",
    backgroundColor: "#fff",
  },
  stickyHeader: {
    width: "100%",
    backgroundColor: "#fff",
    paddingHorizontal: 24,
    zIndex: 10,
  },
  searchBar: {
    width: "100%",
    height: 46,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#F1F1F1",
    elevation: 12,
    marginTop: 20,
    marginBottom: 16,
  },
  searchInput: {
    width: "100%",
    height: 46,
    textAlignVertical: "center",
    marginTop: -5,
    fontSize: 16,
    lineHeight: 22,
    color: "#767676",
    fontFamily: Platform.select({
      android: "Poppins_400Regular",
      ios: "Poppins-Regular",
    }) as string,
  },
  searchIcon: {
    width: 24,
    height: 24,
    alignSelf: "center",
    borderColor: "red",
  },
  customPlaceholder: {
    position: "absolute",
    left: 53,
    top: "50%",
    transform: [{ translateY: -7 }],
    color: "#686868",
    fontSize: 12,
  },
});
