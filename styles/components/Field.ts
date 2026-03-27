import styled from "styled-components/native";

export const StyledFieldSet = styled.View`
  width: 100%;
  gap: ${({ theme }) => theme.spacing.lg}px;
`;

export const StyledFieldLegend = styled.Text`
  color: ${({ theme }) => theme.colors.foreground};
  font-size: ${({ theme }) => theme.typography.md}px;
  font-weight: 600;
`;

export const StyledFieldGroup = styled.View`
  width: 100%;
  gap: ${({ theme }) => theme.spacing.lg}px;
`;

export const StyledField = styled.View<{
  orientation?: "vertical" | "horizontal" | "responsive";
}>`
  width: 100%;
  gap: ${({ theme }) => theme.spacing.xs}px;
  ${({ orientation = "vertical" }) =>
    orientation === "horizontal" || orientation === "responsive"
      ? "flex-direction: row; align-items: center;"
      : "flex-direction: column;"}
`;

export const StyledFieldContent = styled.View`
  flex: 1;
  gap: ${({ theme }) => theme.spacing.xxs}px;
`;

export const StyledFieldTitle = styled.Text`
  color: ${({ theme }) => theme.colors.foreground};
  font-size: ${({ theme }) => theme.typography.sm}px;
  font-weight: 600;
`;

export const StyledFieldDescription = styled.Text`
  color: ${({ theme }) => theme.colors.mutedForeground};
  font-size: ${({ theme }) => theme.typography.xs}px;
  line-height: 18px;
`;

export const StyledFieldSeparatorWrap = styled.View`
  width: 100%;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs}px;
`;

export const StyledFieldError = styled.Text`
  color: ${({ theme }) => theme.colors.destructive};
  font-size: ${({ theme }) => theme.typography.xs}px;
`;
