import { useEffect, useState } from "react";
import { Keyboard } from "react-native";

/**
 * Tracks whether the soft keyboard is currently visible.
 *
 * Auth screens only need to be scrollable while the keyboard covers part of the layout, so they
 * can scroll between inputs and reach the one the keyboard hides.
 */
export const useKeyboardVisible = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => setIsVisible(true));
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => setIsVisible(false));

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  return isVisible;
};
