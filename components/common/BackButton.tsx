import { StyleSheet, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { colors } from "@/constants/theme";
import ArrowLeftIcon from "@/assets/icons/arrow-left.svg";

interface BackButtonProps {
  onPress?: () => void;
}

export default function BackButton({ onPress }: BackButtonProps) {
  const handlePress = () => {
    if (onPress) {
      onPress();
      return;
    }

    if (router.canGoBack()) {
      router.back();
      return;
    }

    router.replace("/scenarios");
  };

  return (
    <TouchableOpacity onPress={handlePress} hitSlop={8} style={styles.button} activeOpacity={0.7}>
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
