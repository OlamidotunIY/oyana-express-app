import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";

export const StyledShellSafeArea = styled(SafeAreaView)`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const StyledKeyboardWrap = styled.KeyboardAvoidingView`
  flex: 1;
`;

export const StyledShellScroll = styled(ScrollView)`
  flex: 1;
`;

export const StyledShellContent = styled.View`
  flex-grow: 1;
  padding-horizontal: ${({ theme }) => theme.spacing.xl}px;
  padding-top: ${({ theme }) => theme.spacing.xl}px;
  padding-bottom: ${({ theme }) => theme.spacing.xl}px;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.lg}px;
`;

export const StyledShellTop = styled.View`
  gap: ${({ theme }) => theme.spacing.md}px;
`;

export const StyledShellBottom = styled.View`
  gap: ${({ theme }) => theme.spacing.md}px;
`;
