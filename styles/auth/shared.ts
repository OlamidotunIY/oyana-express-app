import styled from "styled-components/native";

export const AuthKeyboardAvoiding = styled.KeyboardAvoidingView`
  flex: 1;
`;

export const AuthScrollView = styled.ScrollView`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const AuthContent = styled.View`
  padding-horizontal: ${({ theme }) => theme.spacing.xxl}px;
  padding-bottom: 40px;
  flex-grow: 1;
`;

export const AuthHeader = styled.View`
  margin-bottom: ${({ theme }) => theme.spacing.xxl + 8}px;
`;

export const AuthTitle = styled.Text`
  font-size: 28px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.foreground};
  margin-bottom: 6px;
`;

export const AuthSubtitle = styled.Text`
  font-size: 15px;
  color: ${({ theme }) => theme.colors.mutedForeground};
  line-height: 22px;
`;

export const AuthForm = styled.View`
  gap: ${({ theme }) => theme.spacing.xl}px;
  margin-bottom: ${({ theme }) => theme.spacing.xxl + 4}px;
`;

export const AuthField = styled.View`
  gap: ${({ theme }) => theme.spacing.xs + 2}px;
`;

export const AuthLabel = styled.Text`
  font-size: ${({ theme }) => theme.typography.sm}px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.foreground};
`;

export const AuthSubmitWrapper = styled.View`
  margin-bottom: ${({ theme }) => theme.spacing.xxl}px;
`;

export const AuthFooter = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: ${({ theme }) => theme.spacing.sm}px;
`;

export const AuthFooterText = styled.Text`
  font-size: ${({ theme }) => theme.typography.sm}px;
  color: ${({ theme }) => theme.colors.mutedForeground};
`;

export const AuthFooterLink = styled.Text`
  font-size: ${({ theme }) => theme.typography.sm}px;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 500;
`;

export const BackButton = styled.Pressable`
  align-self: flex-start;
  flex-direction: row;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm}px;
  margin-bottom: ${({ theme }) => theme.spacing.xxl}px;
`;

export const BackButtonIcon = styled.View`
  width: 40px;
  height: 40px;
  border-radius: ${({ theme }) => theme.radii.full}px;
  border-width: ${({ theme }) => theme.borderWidths.thin}px;
  border-color: ${({ theme }) => theme.colors.border};
  background-color: ${({ theme }) => theme.colors.muted};
  align-items: center;
  justify-content: center;
`;

export const BackButtonText = styled.Text`
  font-size: 15px;
  color: ${({ theme }) => theme.colors.foreground};
  font-weight: 600;
`;
