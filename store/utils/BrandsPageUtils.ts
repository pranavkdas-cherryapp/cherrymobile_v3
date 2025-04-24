export const generateDataFromBrands = (
  brandList: { name: string; brandId: string; logo: string }[]
) => {
  const sectionMap: Record<
    string,
    { brandName: string; brandId: string; logo: string }[]
  > = {};

  brandList.forEach((item) => {
    const firstChar = item.name.charAt(0).toUpperCase();
    const isAlpha = /^[A-Z]$/.test(firstChar);
    const sectionKey = isAlpha ? firstChar : "#";
    if (!sectionMap[sectionKey]) {
      sectionMap[sectionKey] = [];
    }
    sectionMap[sectionKey].push({
      brandName: item.name,
      brandId: item.brandId,
      logo: item.logo,
    });
  });

  // Convert the map into SectionList format
  const sectionListData = Object.keys(sectionMap)
    .filter((key) => key !== "#")
    .sort() // Optional: to sort alphabetically
    .map((letter) => ({
      title: letter,
      data: sectionMap[letter],
    }));

  if (sectionMap["#"]) {
    sectionListData.push({
      title: "#",
      data: sectionMap["#"],
    });
  }

  return sectionListData;
};
