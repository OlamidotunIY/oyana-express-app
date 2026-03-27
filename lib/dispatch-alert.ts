import { Audio } from "expo-av";
import * as Haptics from "expo-haptics";
import { Platform } from "react-native";

const DISPATCH_ALERT_URI =
  "data:audio/wav;base64,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";

let isPlayingDispatchAlert = false;

export async function playDispatchAlertAttention() {
  if (isPlayingDispatchAlert) {
    return;
  }

  isPlayingDispatchAlert = true;

  try {
    if (Platform.OS === "ios" || Platform.OS === "android") {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
    }
  } catch {}

  try {
    if (Platform.OS === "ios" || Platform.OS === "android") {
      await Audio.setAudioModeAsync({
        playsInSilentModeIOS: true,
        staysActiveInBackground: false,
        shouldDuckAndroid: true,
        playThroughEarpieceAndroid: false,
      });

      const { sound } = await Audio.Sound.createAsync(
        { uri: DISPATCH_ALERT_URI },
        { shouldPlay: true, volume: 0.32 },
      );

      sound.setOnPlaybackStatusUpdate((status) => {
        if ("didJustFinish" in status && status.didJustFinish) {
          void sound.unloadAsync();
        }
      });
    }
  } catch {
  } finally {
    setTimeout(() => {
      isPlayingDispatchAlert = false;
    }, 600);
  }
}
