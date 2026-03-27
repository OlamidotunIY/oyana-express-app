import styled from "styled-components/native";
import { LinearGradient } from "expo-linear-gradient";

export const OnboardingBackground = styled.View`
  flex: 1;
  justify-content: flex-end;
`;

export const OnboardingBgImage = styled.Image`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

export const OnboardingOverlay = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.45);
`;

export const OnboardingSheetFade = styled(LinearGradient)`
  height: 48px;
  width: 100%;
`;

export const OnboardingSheet = styled.View`
  background-color: ${({ theme }) => theme.colors.card};
  padding: ${({ theme }) => theme.spacing.xxl}px;
  padding-bottom: ${({ theme }) => theme.spacing.xxl + theme.spacing.lg}px;
  gap: ${({ theme }) => theme.spacing.xl}px;
`;

export const OnboardingButtonGroup = styled.View`
  gap: ${({ theme }) => theme.spacing.sm}px;
`;

export const OnboardingFooter = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const OnboardingFooterText = styled.Text`
  color: ${({ theme }) => theme.colors.mutedForeground};
  font-size: ${({ theme }) => theme.typography.sm}px;
`;
