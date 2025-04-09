import { TouchableOpacity, StyleSheet } from "react-native";
import WishlistIcon from "@/assets/icons/wishlist-icon.svg";
import HelpIcon from "@/assets/icons/help-icon.svg";
import PlatinumIcon from "@/assets/icons/cherry-platinum-icon.svg";
import GoldIcon from "@/assets/icons/cherry-gold-icon.svg";
import SilverIcon from "@/assets/icons/cherry-silver-icon.svg";
import BronzeIcon from "@/assets/icons/cherry-bronze-icon.svg";
import DiamondIcon from "@/assets/icons/cherry-diamond-icon.svg";

const iconsList = {
  wishlist: WishlistIcon,
  help: HelpIcon,
  platinumBadge: PlatinumIcon,
  goldBadge: GoldIcon,
  silverBadge: SilverIcon,
  bronzeBadge: BronzeIcon,
  diamondBadge: DiamondIcon,
};

type IconKey = keyof typeof iconsList;

const IconButton = ({
  iconKey,
  width,
  height,
}: {
  iconKey: IconKey;
  width: number;
  height: number;
}) => {
  const IconComponent = iconsList[iconKey];

  return (
    <TouchableOpacity style={styles.iconButton}>
      <IconComponent width={width} height={height} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  iconButton: {
    marginLeft: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default IconButton;
