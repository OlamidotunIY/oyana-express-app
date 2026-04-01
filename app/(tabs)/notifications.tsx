import { useMutation, useQuery } from "@apollo/client/react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React from "react";
import styled, { useTheme } from "styled-components/native";
import { Button, Spinner } from "@/components/ui";
import { ScreenShell } from "@/components/ui/ScreenShell";
import {
  MarkAllNotificationsReadMutation,
  MarkNotificationReadMutation,
  MarkNotificationReadMutationVariables,
  MyNotificationInboxQuery,
  MyNotificationInboxQueryVariables,
} from "@/gql/graphql";
import {
  MARK_ALL_NOTIFICATIONS_READ_MUTATION,
  MARK_NOTIFICATION_READ_MUTATION,
  MY_NOTIFICATION_INBOX_QUERY,
} from "@/graphql";
import { useBackendErrorToast } from "@/hooks/use-backend-error-toast";
import { useUserStore } from "@/store/userStore";

export default function NotificationsScreen() {
  const theme = useTheme();
  const setUser = useUserStore((state) => state.setUser);
  const currentUser = useUserStore((state) => state.user);

  const { data, loading, error, refetch } = useQuery<
    MyNotificationInboxQuery,
    MyNotificationInboxQueryVariables
  >(MY_NOTIFICATION_INBOX_QUERY, {
    variables: { take: 50 },
    fetchPolicy: "cache-and-network",
    errorPolicy: "all",
  });

  const [markNotificationRead, { loading: markingOne }] = useMutation<
    MarkNotificationReadMutation,
    MarkNotificationReadMutationVariables
  >(MARK_NOTIFICATION_READ_MUTATION);

  const [markAllNotificationsRead, { loading: markingAll }] =
    useMutation<MarkAllNotificationsReadMutation>(MARK_ALL_NOTIFICATIONS_READ_MUTATION);

  useBackendErrorToast(error, "Unable to load notifications.", {
    title: "Notifications Error",
    dedupeKey: "notifications-inbox-query",
  });

  const items = data?.myNotificationInbox ?? [];

  const syncUnreadCount = React.useCallback(
    (unreadCount: number) => {
      if (!currentUser) {
        return;
      }

      setUser({
        ...currentUser,
        unreadNotificationCount: unreadCount,
      });
    },
    [currentUser, setUser],
  );

  const handleMarkRead = async (notificationId: string) => {
    await markNotificationRead({
      variables: { notificationId },
    });

    const unreadCount = Math.max(
      0,
      items.filter((item) => !item.isRead && item.id !== notificationId).length,
    );
    syncUnreadCount(unreadCount);
    await refetch();
  };

  const handleMarkAll = async () => {
    await markAllNotificationsRead();
    syncUnreadCount(0);
    await refetch();
  };

  return (
    <ScreenShell contentJustify="flex-start">
      <StyledRoot>
        <StyledHeaderCard>
          <StyledHeaderMain>
            <StyledHeaderTitle>Notifications</StyledHeaderTitle>
            <StyledHeaderBody>
              Shipment updates, account alerts, and driver activity all land here.
            </StyledHeaderBody>
          </StyledHeaderMain>

          <Button
            variant="outline"
            onPress={() => void handleMarkAll()}
            disabled={markingAll || items.length === 0}
          >
            {markingAll ? "Marking..." : "Mark all read"}
          </Button>
        </StyledHeaderCard>

        {loading && !items.length ? (
          <StyledLoadingWrap>
            <Spinner size="small" />
          </StyledLoadingWrap>
        ) : null}

        {items.length === 0 && !loading ? (
          <StyledEmptyCard>
            <MaterialIcons name="notifications-none" size={28} color={theme.colors.mutedForeground} />
            <StyledEmptyTitle>Nothing new right now</StyledEmptyTitle>
            <StyledEmptyBody>
              Important alerts and shipment updates will appear here as activity comes in.
            </StyledEmptyBody>
          </StyledEmptyCard>
        ) : (
          <StyledList>
            {items.map((item) => (
              <StyledItem key={item.id} $unread={!item.isRead} onPress={() => void handleMarkRead(item.id)}>
                <StyledItemHeader>
                  <StyledCategoryBadge $unread={!item.isRead}>
                    <StyledCategoryText $unread={!item.isRead}>
                      {item.category.replace(/_/g, " ")}
                    </StyledCategoryText>
                  </StyledCategoryBadge>
                  {!item.isRead ? (
                    <StyledUnreadDot />
                  ) : null}
                </StyledItemHeader>

                <StyledItemTitle>{item.title}</StyledItemTitle>
                <StyledItemBody>{item.body}</StyledItemBody>
                <StyledItemTime>
                  {new Date(item.createdAt).toLocaleString()}
                </StyledItemTime>
              </StyledItem>
            ))}
          </StyledList>
        )}

        {markingOne ? (
          <StyledMarkingText>Updating inbox...</StyledMarkingText>
        ) : null}
      </StyledRoot>
    </ScreenShell>
  );
}

const StyledRoot = styled.View`
  gap: ${({ theme }) => theme.spacing.md}px;
`;

const StyledHeaderCard = styled.View`
  border-radius: ${({ theme }) => theme.radii.xl}px;
  background-color: ${({ theme }) => theme.colors.card};
  border-width: ${({ theme }) => theme.borderWidths.thin}px;
  border-color: ${({ theme }) => theme.colors.border};
  padding: ${({ theme }) => theme.spacing.lg}px;
  gap: ${({ theme }) => theme.spacing.md}px;
`;

const StyledHeaderMain = styled.View`
  gap: ${({ theme }) => theme.spacing.xs}px;
`;

const StyledHeaderTitle = styled.Text`
  color: ${({ theme }) => theme.colors.foreground};
  font-size: ${({ theme }) => theme.typography.lg}px;
  font-weight: 700;
`;

const StyledHeaderBody = styled.Text`
  color: ${({ theme }) => theme.colors.mutedForeground};
  font-size: ${({ theme }) => theme.typography.sm}px;
  line-height: 20px;
`;

const StyledLoadingWrap = styled.View`
  min-height: 160px;
  align-items: center;
  justify-content: center;
`;

const StyledEmptyCard = styled.View`
  border-radius: ${({ theme }) => theme.radii.xl}px;
  background-color: ${({ theme }) => theme.colors.card};
  border-width: ${({ theme }) => theme.borderWidths.thin}px;
  border-color: ${({ theme }) => theme.colors.border};
  padding: ${({ theme }) => theme.spacing.xl}px;
  gap: ${({ theme }) => theme.spacing.sm}px;
  align-items: center;
`;

const StyledEmptyTitle = styled.Text`
  color: ${({ theme }) => theme.colors.foreground};
  font-size: ${({ theme }) => theme.typography.md}px;
  font-weight: 700;
`;

const StyledEmptyBody = styled.Text`
  color: ${({ theme }) => theme.colors.mutedForeground};
  font-size: ${({ theme }) => theme.typography.sm}px;
  line-height: 20px;
  text-align: center;
`;

const StyledList = styled.View`
  gap: ${({ theme }) => theme.spacing.md}px;
`;

const StyledItem = styled.Pressable<{ $unread: boolean }>`
  border-radius: ${({ theme }) => theme.radii.xl}px;
  background-color: ${({ theme }) => theme.colors.card};
  border-width: ${({ theme }) => theme.borderWidths.thin}px;
  border-color: ${({ $unread, theme }) =>
    $unread ? "rgba(255, 106, 0, 0.45)" : theme.colors.border};
  padding: ${({ theme }) => theme.spacing.lg}px;
  gap: ${({ theme }) => theme.spacing.sm}px;
`;

const StyledItemHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const StyledCategoryBadge = styled.View<{ $unread: boolean }>`
  border-radius: ${({ theme }) => theme.radii.full}px;
  padding-vertical: 4px;
  padding-horizontal: ${({ theme }) => theme.spacing.sm}px;
  background-color: ${({ $unread, theme }) =>
    $unread ? "rgba(255, 106, 0, 0.12)" : theme.colors.muted};
`;

const StyledCategoryText = styled.Text<{ $unread: boolean }>`
  color: ${({ $unread, theme }) =>
    $unread ? theme.colors.primary : theme.colors.mutedForeground};
  font-size: ${({ theme }) => theme.typography.xs}px;
  font-weight: 700;
  text-transform: capitalize;
`;

const StyledUnreadDot = styled.View`
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.colors.primary};
`;

const StyledItemTitle = styled.Text`
  color: ${({ theme }) => theme.colors.foreground};
  font-size: ${({ theme }) => theme.typography.sm}px;
  font-weight: 700;
`;

const StyledItemBody = styled.Text`
  color: ${({ theme }) => theme.colors.mutedForeground};
  font-size: ${({ theme }) => theme.typography.sm}px;
  line-height: 20px;
`;

const StyledItemTime = styled.Text`
  color: ${({ theme }) => theme.colors.mutedForeground};
  font-size: ${({ theme }) => theme.typography.xs}px;
`;

const StyledMarkingText = styled.Text`
  color: ${({ theme }) => theme.colors.mutedForeground};
  font-size: ${({ theme }) => theme.typography.xs}px;
  text-align: center;
`;
