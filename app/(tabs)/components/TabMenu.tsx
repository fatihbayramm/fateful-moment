import { useState } from "react";
import { Modal, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { router, usePathname } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "@/constants/theme";
import { getPathname, ROUTES } from "@/utils/routes";
import MenuIcon from "@/assets/icons/menu.svg";
import CompassIcon from "@/assets/icons/compass.svg";
import DnaIcon from "@/assets/icons/dna.svg";
import SettingsIcon from "@/assets/icons/settings.svg";

const routes = [
  { href: ROUTES.SCENARIOS, label: "SCENARIOS", Icon: CompassIcon },
  { href: ROUTES.DNA, label: "DNA", Icon: DnaIcon },
  { href: ROUTES.SETTINGS, label: "SETTINGS", Icon: SettingsIcon },
] as const;

const iconStyle = { width: 22, height: 22 };

export default function TabMenu() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const handleSelect = (href: (typeof routes)[number]["href"]) => {
    setOpen(false);
    router.push(href);
  };

  return (
    <>
      <Pressable onPress={() => setOpen(true)} hitSlop={8} style={styles.trigger}>
        <MenuIcon {...iconStyle} color={colors.text.main} />
      </Pressable>

      <Modal
        visible={open}
        transparent
        animationType="fade"
        statusBarTranslucent
        navigationBarTranslucent
        onRequestClose={() => setOpen(false)}
      >
        <Pressable style={styles.backdrop} onPress={() => setOpen(false)}>
          <SafeAreaView style={styles.sheet} edges={["top", "left", "right"]}>
            <Text style={styles.title}>Menu</Text>

            <ScrollView contentContainerStyle={styles.list} showsVerticalScrollIndicator={false}>
              {routes.map(({ href, label, Icon }) => {
                const isActive = pathname === getPathname(href);

                return (
                  <TouchableOpacity
                    key={href}
                    style={[styles.item, isActive && styles.itemActive]}
                    onPress={() => handleSelect(href)}
                  >
                    <Icon {...iconStyle} color={isActive ? colors.primary.main : colors.bodyText.main} />

                    <Text style={[styles.label, isActive && styles.labelActive]}>{label}</Text>

                    {isActive && <View style={styles.dot} />}
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </SafeAreaView>
        </Pressable>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  trigger: {
    justifyContent: "center",
    alignItems: "center",
    width: 40,
    height: 40,
  },
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(2, 6, 23, 0.7)",
  },
  sheet: {
    width: 260,
    height: "100%",
    backgroundColor: colors.background.main,
    borderRightWidth: 1,
    borderRightColor: colors.border.main,
    paddingTop: 48,
    paddingHorizontal: 16,
  },
  title: {
    color: colors.bodyText.main,
    fontSize: 12,
    fontWeight: "bold",
    letterSpacing: 2,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  list: {
    gap: 12,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border.main,
    backgroundColor: colors.secondary.main,
  },
  itemActive: {
    borderColor: colors.primary.main,
    backgroundColor: "rgba(0, 211, 243, 0.12)",
  },
  label: {
    flex: 1,
    color: colors.bodyText.main,
    fontSize: 15,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  labelActive: {
    color: colors.primary.main,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.primary.main,
  },
});
