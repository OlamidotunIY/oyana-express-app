import { useUserStore } from "@/store/userStore";
import
{
    StyledBackButton,
    StyledHeaderActions,
    StyledHeaderContainer,
    StyledHeaderContent,
    StyledHeaderTitle,
    StyledLeft,
    StyledMenuButton,
    StyledNotificationBadge,
    StyledNotificationBadgeText,
    StyledNotificationWrapper,
    StyledProfileAvatar,
    StyledProfileAvatarText,
    StyledProfileCard,
    StyledProfileGreeting,
    StyledProfileName,
    StyledProfileText,
} from "@/styles";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "styled-components/native";

export type HeaderMenuItem = {
    id: string;
    label: string;
    onPress: () => void;
    iconName?: React.ComponentProps<typeof MaterialIcons>["name"];
};

type BaseHeaderProps = {
    title: string;
    showBackButton: boolean;
    canGoBack?: boolean;
    onBackPress?: () => void;
    menuItems?: HeaderMenuItem[];
    showProfileCard?: boolean;
    notificationCount?: number;
    onRefresh?: () => void;
    onNotificationsPress?: () => void;
    backgroundColor?: string;
    titleContent?: React.ReactNode;
};

type PageHeaderProps = Omit<BaseHeaderProps, "showBackButton">;
type TabHeaderProps = Pick<BaseHeaderProps, "title">;

function getTimeGreeting(): string
{
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return "Good morning!";
    if (hour >= 12 && hour < 17) return "Good afternoon!";
    return "Good evening!";
}

function BaseHeader({
    title,
    showBackButton,
    canGoBack = false,
    onBackPress,
    menuItems,
    showProfileCard = false,
    notificationCount,
    onRefresh,
    onNotificationsPress,
    backgroundColor,
    titleContent,
}: BaseHeaderProps)
{
    const insets = useSafeAreaInsets();
    const theme = useTheme();
    const user = useUserStore((state) => state.user);
    const disableBack = !canGoBack || !onBackPress;
    const shouldShowBackButton = showBackButton && canGoBack;
    const topInset = Math.max(insets.top - 4, 0);
    const contentMinHeight = showProfileCard ? 56 : 42;
    const greeting = React.useMemo(() => getTimeGreeting(), []);
    const displayName = React.useMemo(() =>
    {
        const fallback = user?.email ?? "Oyana provider";
        const fullName = [user?.firstName?.trim(), user?.lastName?.trim()]
            .filter(Boolean)
            .join(" ");
        return fullName || fallback;
    }, [user?.email, user?.firstName, user?.lastName]);
    const initials = React.useMemo(() =>
    {
        const firstInitial = user?.firstName?.trim().charAt(0) ?? "";
        const lastInitial = user?.lastName?.trim().charAt(0) ?? "";
        const combined = `${firstInitial}${lastInitial}`.toUpperCase();
        return combined || "OP";
    }, [user?.firstName, user?.lastName]);

    return (
        <StyledHeaderContainer $bg={backgroundColor}>
            <StyledHeaderContent
                style={{
                    minHeight: contentMinHeight,
                    paddingTop: topInset + 8,
                    paddingBottom: 10,
                }}
            >
                <StyledLeft>
                    {shouldShowBackButton ? (
                        <StyledBackButton
                            accessibilityLabel="Go back"
                            accessibilityRole="button"
                            disabled={disableBack}
                            hitSlop={10}
                            onPress={onBackPress}
                            $colored={!!backgroundColor}
                            $disabled={disableBack}
                        >
                            <MaterialIcons
                                color={backgroundColor ? theme.colors.heroForeground : theme.colors.foreground}
                                name="arrow-back-ios-new"
                                size={16}
                            />
                        </StyledBackButton>
                    ) : null}
                    {titleContent ? (
                        titleContent
                    ) : showProfileCard ? (
                        <StyledProfileCard>
                            <StyledProfileAvatar>
                                <StyledProfileAvatarText>{initials}</StyledProfileAvatarText>
                            </StyledProfileAvatar>
                            <StyledProfileText>
                                <StyledProfileGreeting numberOfLines={1}>{greeting}</StyledProfileGreeting>
                                <StyledProfileName numberOfLines={1}>{displayName}</StyledProfileName>
                            </StyledProfileText>
                        </StyledProfileCard>
                    ) : (
                        <StyledHeaderTitle $colored={!!backgroundColor} numberOfLines={1}>{title}</StyledHeaderTitle>
                    )}
                </StyledLeft>
                {showProfileCard ? (
                    <StyledHeaderActions>
                        <StyledNotificationWrapper>
                            <StyledMenuButton
                                accessibilityLabel="Notifications"
                                accessibilityRole="button"
                                hitSlop={10}
                                $disabled={false}
                                $colored={!!backgroundColor}
                                onPress={onNotificationsPress}
                            >
                                <MaterialIcons
                                    color={backgroundColor ? theme.colors.heroForeground : theme.colors.foreground}
                                    name="notifications-none"
                                    size={backgroundColor ? 24 : 18}
                                />
                            </StyledMenuButton>
                            {notificationCount != null && notificationCount > 0 ? (
                                <StyledNotificationBadge>
                                    <StyledNotificationBadgeText>
                                        {notificationCount > 99 ? "99+" : notificationCount}
                                    </StyledNotificationBadgeText>
                                </StyledNotificationBadge>
                            ) : null}
                        </StyledNotificationWrapper>
                        <StyledMenuButton
                            accessibilityLabel="Refresh"
                            accessibilityRole="button"
                            hitSlop={10}
                            $disabled={false}
                            $colored={!!backgroundColor}
                            onPress={onRefresh}
                        >
                            <MaterialIcons
                                color={backgroundColor ? theme.colors.heroForeground : theme.colors.foreground}
                                name="refresh"
                                size={backgroundColor ? 24 : 18}
                            />
                        </StyledMenuButton>
                    </StyledHeaderActions>
                ) : menuItems?.length ? (
                    <StyledHeaderActions>
                        {menuItems.map((item) => (
                            <StyledMenuButton
                                key={item.id}
                                accessibilityLabel={item.label}
                                accessibilityRole="button"
                                hitSlop={10}
                                $disabled={false}
                                $colored={!!backgroundColor}
                                onPress={item.onPress}
                            >
                                {item.iconName ? (
                                    <MaterialIcons
                                        color={backgroundColor ? theme.colors.heroForeground : theme.colors.foreground}
                                        name={item.iconName}
                                        size={backgroundColor ? 24 : 18}
                                    />
                                ) : null}
                            </StyledMenuButton>
                        ))}
                    </StyledHeaderActions>
                ) : null}
            </StyledHeaderContent>
        </StyledHeaderContainer>
    );
}

export function PageHeader(props: PageHeaderProps)
{
    return <BaseHeader showBackButton {...props} />;
}

export function TabHeader({
    title,
    menuItems,
    showProfileCard,
    notificationCount,
    onRefresh,
    onNotificationsPress,
    backgroundColor,
    titleContent,
}: TabHeaderProps & Pick<BaseHeaderProps, "menuItems" | "showProfileCard" | "notificationCount" | "onRefresh" | "onNotificationsPress" | "backgroundColor" | "titleContent">)
{
    return (
        <BaseHeader
            title={title}
            showBackButton={false}
            menuItems={menuItems}
            showProfileCard={showProfileCard}
            notificationCount={notificationCount}
            titleContent={titleContent}
            onRefresh={onRefresh}
            onNotificationsPress={onNotificationsPress}
            backgroundColor={backgroundColor}
        />
    );
}

export function resolveHeaderTitle(routeName: string, title?: string)
{
    if (title && title.trim().length > 0)
    {
        return title;
    }

    const normalizedName = routeName
        .replace(/^\((.*)\)$/, "")
        .replace(/[-_]/g, " ")
        .trim();

    if (!normalizedName)
    {
        return "Page";
    }

    return normalizedName
        .split(" ")
        .filter(Boolean)
        .map((word) => word[0].toUpperCase() + word.slice(1))
        .join(" ");
}
