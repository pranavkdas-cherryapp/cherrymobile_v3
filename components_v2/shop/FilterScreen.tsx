import React, { useState, useEffect, useRef } from "react";
import { View, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import CustomCheckbox from "@/components_v2/shop/CustomCheckbox";
import StyledText from "@/components_v2/common/StyledText";
import TextButton from "@/components_v2/common/TextButton";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { FilterOptions } from "@/store/constants/ShoppingConstants";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import {
  getAppliedOptionsOfFilterSelector,
  getOptionsOfFilterSelector,
  getSelectedCategorySelector,
  getSelectedFilterTypeSelector,
  searchAndFilterProducts,
  setAppliedOptionsOfFilter,
} from "@/store/slices/ShoppingSlice";
import FilterBody from "@/components_v2/shop/FilterBody";
import { getBrandsGroupedByCategoryDict } from "@/store/slices/BrandsSlice";
import SearchInputBar from "../common/SearchInputBar";
import { Searchbar } from "react-native-paper";
import { SortOption } from "@/store/initialState/ShoppingInitialState";
interface FilterScreenProps {
  onClose: () => void;
}

const FilterScreen: React.FC<FilterScreenProps> = ({ onClose }) => {
  const dispatch = useAppDispatch();
  const selectedFilterType = useAppSelector(getSelectedFilterTypeSelector);
  const selectedCategory = useAppSelector(getSelectedCategorySelector);
  const appliedOptionsInitialState = useAppSelector((state) =>
    getAppliedOptionsOfFilterSelector(state, { payload: selectedFilterType })
  );

  const brandsList = useAppSelector((state) =>
    getBrandsGroupedByCategoryDict(state, { payload: selectedCategory })
  );

  const [selectedOptions, setSelectedOptions] = useState<string[]>(
    appliedOptionsInitialState as string[]
  );
  const insets = useSafeAreaInsets();

  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchActive, setIsSearchActive] = useState(false);
  const searchbarRef = useRef<typeof Searchbar>(null);

  const toggleSelection = (option: string) => {
    setSelectedOptions((prev) =>
      prev.includes(option)
        ? prev.filter((item) => item !== option)
        : [...prev, option]
    );
  };

  const handleSortOption = (option: string) => {
    dispatch(setAppliedOptionsOfFilter(option as SortOption));
    dispatch(searchAndFilterProducts(1));
    onClose();
  };

  console.log(selectedFilterType, "selectedFilterType");
  const options =
    selectedFilterType !== "brand"
      ? useAppSelector((state) =>
          getOptionsOfFilterSelector(state, { payload: selectedFilterType })
        )
      : brandsList;

  const resetFilters = () => {
    setSelectedOptions([]);
    dispatch(setAppliedOptionsOfFilter([]));
    dispatch(searchAndFilterProducts(1));
    onClose();
  };

  const applyFilters = () => {
    dispatch(setAppliedOptionsOfFilter(selectedOptions));
    dispatch(searchAndFilterProducts(1));
    onClose();
  };

  const headerTitle = selectedFilterType
    ? FilterOptions[selectedFilterType as keyof typeof FilterOptions]
        ?.headerTitle
    : null;

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top }]}>
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <MaterialCommunityIcons
            name="close"
            size={24}
            color="#000"
            style={{ marginLeft: 5 }}
          />
        </TouchableOpacity>
        <StyledText preset={"headingMedium"} style={styles.headerTitle}>
          {headerTitle}
        </StyledText>
      </View>
      {FilterOptions[selectedFilterType as keyof typeof FilterOptions]
        .searchPresent && (
        <View style={styles.searchContainer}>
          <SearchInputBar
            isSearchActive={isSearchActive}
            searchbarRef={searchbarRef}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onSearchFocus={() => setIsSearchActive(true)}
            onSearchBlur={() => setIsSearchActive(false)}
            containerStyle={styles.searchInput}
            placeholderText={
              FilterOptions[selectedFilterType as keyof typeof FilterOptions]
                .searchPlaceholder
            }
          />
        </View>
      )}
      <FilterBody
        filterType={selectedFilterType}
        options={options}
        selectedOptions={selectedOptions}
        toggleSelection={toggleSelection}
        handleSingleSelect={handleSortOption}
      />
      {FilterOptions[selectedFilterType as keyof typeof FilterOptions]?.type ===
        "multiSelect" && (
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={resetFilters}>
            <StyledText preset="headingMedium" style={styles.resetText}>
              Reset
            </StyledText>
          </TouchableOpacity>
          <TextButton
            text="Apply"
            onPress={applyFilters}
            color="black"
            variant="small"
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default FilterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    paddingHorizontal: 24,
  },
  searchInput: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  closeButton: {
    padding: 4,
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    marginRight: 40,
    color: "#313339",
  },
  scrollContainer: {
    flex: 1,
    padding: 16,
  },
  scrollContainerContent: {
    paddingBottom: 80, // Added bottom padding to show last items correctly
  },
  optionRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
  },
  optionLabel: {
    color: "#000",
    marginLeft: 8,
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: "column",
    padding: 16,
    borderTopWidth: 1,
    borderColor: "#2B2D331F",
  },
  resetText: {
    marginBottom: 10,
    textAlign: "center",
    textDecorationLine: "underline",
    color: "black",
  },
});
