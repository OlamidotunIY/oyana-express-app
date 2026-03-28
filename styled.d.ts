// Type definitions for styled-components theme
export interface AppTheme {
  colors: {
    background: string;
    foreground: string;
    card: string;
    cardForeground: string;
    popover: string;
    popoverForeground: string;
    primary: string;
    primaryForeground: string;
    secondary: string;
    secondaryForeground: string;
    muted: string;
    mutedForeground: string;
    accent: string;
    accentForeground: string;
    destructive: string;
    destructiveForeground: string;
    border: string;
    input: string;
    ring: string;
    success: string;
    warning: string;
    overlay: string;
    heroSurface: string;
    heroForeground: string;
    heroMutedForeground: string;
    heroChipBackground: string;
    heroChipBorder: string;
    heroChipForeground: string;
    heroTileBackground: string;
    heroTileBorder: string;
    heroTileForeground: string;
    heroTileMutedForeground: string;
    heroActionBackground: string;
    heroActionBorder: string;
    heroActionForeground: string;
    heroActionActiveBackground: string;
    heroActionActiveBorder: string;
  };
  radii: {
    sm: number;
    md: number;
    lg: number;
    xl: number;
    full: number;
  };
  spacing: {
    xxs: number;
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
    xxl: number;
  };
  borderWidths: {
    thin: number;
    thick: number;
  };
  typography: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
    xxl: number;
  };
}

declare module "styled-components/native" {
  export interface DefaultTheme extends AppTheme {}
}

declare module "styled-components" {
  export interface DefaultTheme extends AppTheme {}
}
