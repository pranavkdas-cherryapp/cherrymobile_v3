import { TouchableOpacity, StyleSheet, StyleProp } from "react-native";
import WishlistIcon from "@/assets/icons/wishlist-icon.svg";
import HelpIcon from "@/assets/icons/help-icon.svg";
import PlatinumIcon from "@/assets/icons/cherry-platinum-icon.svg";
import GoldIcon from "@/assets/icons/cherry-gold-icon.svg";
import SilverIcon from "@/assets/icons/cherry-silver-icon.svg";
import BronzeIcon from "@/assets/icons/cherry-bronze-icon.svg";
import DiamondIcon from "@/assets/icons/cherry-diamond-icon.svg";
import AddedToWishlistIcon from "@/assets/icons/added-to-wishlist-icon.svg";
import NotAddedToWishlistIcon from "@/assets/icons/not-added-to-wishlist-icon.svg";

const iconsList = {
  wishlist: WishlistIcon,
  help: HelpIcon,
  platinumBadge: PlatinumIcon,
  goldBadge: GoldIcon,
  silverBadge: SilverIcon,
  bronzeBadge: BronzeIcon,
  diamondBadge: DiamondIcon,
  addedToWishlist: AddedToWishlistIcon,
  notAddedToWishlist: NotAddedToWishlistIcon,
};

type IconKey = keyof typeof iconsList;

const IconButton = ({
  iconKey,
  width,
  height,
  style,
}: {
  iconKey: IconKey;
  width: number;
  height: number;
  style?: StyleProp<ViewStyle>;
}) => {
  const IconComponent = iconsList[iconKey];

  return (
    <TouchableOpacity style={[styles.iconButton, style]}>
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
