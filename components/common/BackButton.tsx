import { StyleSheet, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { colors } from "@/constants/theme";
import { ROUTES } from "@/utils/routes";
import ArrowLeftIcon from "@/assets/icons/arrow-left.svg";

interface BackButtonProps {
  onPress?: () => void;
}

export default function BackButton({ onPress = () => router.replace(ROUTES.SCENARIOS) }: BackButtonProps) {
  return (
    <TouchableOpacity onPress={onPress} hitSlop={8} style={styles.button} activeOpacity={0.7}>
      <ArrowLeftIcon width={20} height={20} color={colors.text.main} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
});
