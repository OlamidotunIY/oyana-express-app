import { useMutation } from "@apollo/client/react";
import * as Location from "expo-location";
import React from "react";

import {
  UpdateDriverPresenceMutation,
  UpdateDriverPresenceMutationVariables,
} from "@/gql/graphql";
import { UPDATE_DRIVER_PRESENCE_MUTATION } from "@/graphql";
import { refetchCurrentUser } from "@/lib/session";
import { showBackendErrorToast, showToast } from "@/lib/toast";

type UseDriverPresenceOptions = {
  onUpdated?: () => Promise<void> | void;
  successTitle?: string;
  errorDedupeKey?: string;
};

export function useDriverPresence(options: UseDriverPresenceOptions = {}) {
  const [updateDriverPresence, { loading: isUpdatingPresence }] = useMutation<
    UpdateDriverPresenceMutation,
    UpdateDriverPresenceMutationVariables
  >(UPDATE_DRIVER_PRESENCE_MUTATION);

  const setOnlineState = React.useCallback(
    async (nextIsOnline: boolean) => {
      try {
        let input: UpdateDriverPresenceMutationVariables["input"] = {
          isOnline: nextIsOnline,
        };

        if (nextIsOnline) {
          const permission =
            await Location.requestForegroundPermissionsAsync();

          if (!permission.granted) {
            showToast({
              title: options.successTitle ?? "Driver presence",
              message:
                "Location access is required before you can go online for dispatch.",
              tone: "error",
              dedupeKey: "driver-presence-permission-denied",
            });
            return null;
          }

          const position = await Location.getCurrentPositionAsync({
            accuracy: Location.Accuracy.Balanced,
          });

          input = {
            isOnline: true,
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            accuracyMeters: position.coords.accuracy ?? undefined,
            heading:
              position.coords.heading != null &&
              Number.isFinite(position.coords.heading)
                ? position.coords.heading
                : undefined,
            speedKph:
              position.coords.speed != null &&
              Number.isFinite(position.coords.speed)
                ? Math.max(position.coords.speed * 3.6, 0)
                : undefined,
            recordedAt: new Date(position.timestamp).toISOString(),
          };
        }

        const { data } = await updateDriverPresence({
          variables: { input },
        });

        await refetchCurrentUser();
        await options.onUpdated?.();

        showToast({
          title: options.successTitle ?? "Driver presence",
          message: nextIsOnline
            ? "You are online and nearby dispatch requests can reach you now."
            : "You are offline and will not receive new dispatch requests.",
          tone: "success",
          dedupeKey: `driver-presence-${nextIsOnline ? "online" : "offline"}`,
        });

        return data?.updateDriverPresence ?? null;
      } catch (error) {
        showBackendErrorToast(
          error,
          nextIsOnline
            ? "Unable to turn on driver presence."
            : "Unable to turn off driver presence.",
          {
            title: "Driver Presence Error",
            dedupeKey:
              options.errorDedupeKey ??
              `driver-presence-${nextIsOnline ? "online" : "offline"}-error`,
          },
        );
        return null;
      }
    },
    [options, updateDriverPresence],
  );

  return {
    isUpdatingPresence,
    setOnlineState,
  };
}
