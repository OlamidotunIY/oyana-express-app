import styled from "styled-components/native";

export const StyledSkeleton = styled.View`
  border-radius: ${({ theme }) => theme.radii.md}px;
  background-color: ${({ theme }) => theme.colors.muted};
`;
