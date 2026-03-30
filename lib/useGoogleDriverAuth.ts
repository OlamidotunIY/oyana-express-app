import React from "react";
import { useMutation } from "@apollo/client/react";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import Constants from "expo-constants";
import { useRouter } from "expo-router";
import {
  SignInWithGoogleMutation,
  SignInWithGoogleMutationVariables,
} from "@/gql/graphql";
import { SIGN_IN_WITH_GOOGLE_MUTATION } from "@/graphql";
import { persistAuthTokens } from "@/lib/auth-cookies";
import { parseAuthError, resolveAuthenticatedRoute } from "@/lib/session";
import { useToastStore } from "@/store/toastStore";
import { useUserStore } from "@/store/userStore";

WebBrowser.maybeCompleteAuthSession();

type GoogleAuthExtra = {
  googleAuth?: {
    webClientId?: string;
    androidClientId?: string;
    iosClientId?: string;
  };
};

function readGoogleClientIds() {
  const extra = (Constants.expoConfig?.extra ?? {}) as GoogleAuthExtra;
  return {
    webClientId:
      extra.googleAuth?.webClientId ??
      process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
    androidClientId:
      extra.googleAuth?.androidClientId ??
      process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID,
    iosClientId:
      extra.googleAuth?.iosClientId ??
      process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID,
  };
}

export function useGoogleDriverAuth() {
  const router = useRouter();
  const showToast = useToastStore((state) => state.showToast);
  const setUser = useUserStore((state) => state.setUser);
  const [busy, setBusy] = React.useState(false);

  const [signInWithGoogle, { loading }] = useMutation<
    SignInWithGoogleMutation,
    SignInWithGoogleMutationVariables
  >(SIGN_IN_WITH_GOOGLE_MUTATION);

  const googleClientIds = React.useMemo(() => readGoogleClientIds(), []);

  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    webClientId: googleClientIds.webClientId,
    androidClientId: googleClientIds.androidClientId,
    iosClientId: googleClientIds.iosClientId,
    selectAccount: true,
  });

  const handleIdToken = React.useCallback(
    async (idToken: string) => {
      setBusy(true);

      try {
        const { data } = await signInWithGoogle({
          variables: {
            input: {
              idToken,
            },
          },
        });

        const payload = data?.signInWithGoogle;
        if (!payload?.accessToken || !payload.refreshToken || !payload.user) {
          throw new Error("Google sign-in did not return a complete session.");
        }

        persistAuthTokens(payload.accessToken, payload.refreshToken);
        setUser(payload.user);
        router.replace(resolveAuthenticatedRoute(payload.user) as never);
      } catch (error) {
        showToast({
          message: parseAuthError(
            error,
            "Google sign-in failed. Please try again.",
          ),
          tone: "error",
        });
      } finally {
        setBusy(false);
      }
    },
    [router, setUser, showToast, signInWithGoogle],
  );

  React.useEffect(() => {
    if (response?.type !== "success") {
      return;
    }

    const params =
      "params" in response && response.params ? response.params : undefined;
    const idToken =
      response.authentication?.idToken ??
      (typeof params?.id_token === "string" ? params.id_token : undefined);

    if (!idToken) {
      showToast({
        message: "Google sign-in did not return an ID token.",
        tone: "error",
      });
      return;
    }

    void handleIdToken(idToken);
  }, [handleIdToken, response, showToast]);

  const promptGoogleAuth = React.useCallback(async () => {
    if (!request) {
      showToast({
        message: "Google sign-in is not configured yet.",
        tone: "error",
      });
      return;
    }

    const result = await promptAsync();
    if (result.type === "error") {
      showToast({
        message: "Google sign-in could not be started.",
        tone: "error",
      });
    }
  }, [promptAsync, request, showToast]);

  return {
    promptGoogleAuth,
    loading: loading || busy,
    ready: Boolean(request),
  };
}
