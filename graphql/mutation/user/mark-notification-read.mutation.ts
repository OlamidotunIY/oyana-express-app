import { gql } from "@apollo/client";

export const MARK_NOTIFICATION_READ_MUTATION = gql`
  mutation MarkNotificationRead($notificationId: String!) {
    markNotificationRead(notificationId: $notificationId) {
      id
      category
      title
      body
      entityType
      entityId
      metadata
      isRead
      readAt
      createdAt
    }
  }
`;
