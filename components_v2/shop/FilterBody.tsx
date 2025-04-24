import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ScrollView,
} from "react-native";
import { ChevronRight } from "lucide-react-native";
import { FilterOptions } from "@/store/constants/ShoppingConstants";
import CustomCheckbox from "./CustomCheckbox";
import StyledText from "../common/StyledText";

export default function FilterBody({
  filterType,
  options,
  selectedOptions,
  toggleSelection,
  handleSingleSelect,
}: {
  filterType: string;
  options: string[];
  selectedOptions: string[];
  toggleSelection: (option: string) => void;
  handleSingleSelect: (option: string) => void;
}) {
  const filterOption = FilterOptions[filterType as keyof typeof FilterOptions];
  const filterOptionsType = filterOption?.type;

  if (filterOptionsType === "singleSelect") {
    return (
      <FlatList
        data={options}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.optionContainer}
            onPress={() => handleSingleSelect(item)}
          >
            <Text style={styles.optionText}>{item}</Text>
            <ChevronRight size={20} color="#000" />
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.container}
      />
    );
  }

  if (filterOptionsType === "multiSelect") {
    return (
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContainerContent}
      >
        {options.map((option, index) => {
          const isSelected = selectedOptions.includes(option);
          return (
            <TouchableOpacity
              key={index}
              onPress={() => toggleSelection(option)}
              style={styles.optionRow}
            >
              <CustomCheckbox
                isChecked={isSelected}
                onPress={() => toggleSelection(option)}
              />
              <StyledText preset="headingMedium" style={styles.optionLabel}>
                {option}
              </StyledText>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    );
  }

  return null;
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
  optionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  optionText: {
    fontSize: 16,
    color: "#000",
  },
  scrollContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  scrollContainerContent: {
    paddingBottom: 80,
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
});
