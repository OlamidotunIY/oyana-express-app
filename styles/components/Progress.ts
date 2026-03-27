import styled from "styled-components/native";

export const StyledProgressRoot = styled.View`
  width: 100%;
  height: 8px;
  border-radius: ${({ theme }) => theme.radii.full}px;
  background-color: ${({ theme }) => theme.colors.secondary};
  overflow: hidden;
`;

export const StyledProgressFill = styled.View<{ value?: number }>`
  height: 100%;
  width: ${({ value = 0 }) => `${Math.max(0, Math.min(100, value))}%`};
  background-color: ${({ theme }) => theme.colors.primary};
`;
