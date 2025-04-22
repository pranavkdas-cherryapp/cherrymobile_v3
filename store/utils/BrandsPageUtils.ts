export const generateDataFromBrands = (
  brandList: { name: string; brandId: string; logo: string }[]
) => {
  const sectionMap: Record<
    string,
    { brandName: string; brandId: string; logo: string }[]
  > = {};

  brandList.forEach((item) => {
    const firstLetter = item.name.charAt(0).toUpperCase();
    if (!sectionMap[firstLetter]) {
      sectionMap[firstLetter] = [];
    }
    sectionMap[firstLetter].push({
      brandName: item.name,
      brandId: item.brandId,
      logo: item.logo,
    });
  });

  // Convert the map into SectionList format
  const sectionListData = Object.keys(sectionMap)
    .sort() // Optional: to sort alphabetically
    .map((letter) => ({
      title: letter,
      data: sectionMap[letter],
    }));

  return sectionListData;
};
