import { gql } from "@apollo/client";

export const MY_NOTIFICATION_INBOX_QUERY = gql`
  query MyNotificationInbox($take: Int) {
    myNotificationInbox(take: $take) {
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
