import React from "react";
import { useMutation, useQuery } from "@apollo/client/react";

import { ScreenShell } from "@/components/ui/ScreenShell";
import { Button, Card, CardContent, Input, Spinner } from "@/components/ui";
import
    {
        MeQuery,
        MeQueryVariables,
        UpdateProfileMutation,
        UpdateProfileMutationVariables,
    } from "@/gql/graphql";
import { useBackendErrorToast } from "@/hooks/use-backend-error-toast";
import { ME_QUERY, UPDATE_PROFILE_MUTATION } from "@/graphql";
import { showBackendErrorToast, showToast } from "@/lib/toast";
import
    {
        StyledEditProfileForm,
        StyledEditProfileLabel,
        StyledEditProfileLoadingWrap,
        StyledEditProfileRoot,
    } from "@/styles/tabs/accounts";

export default function EditProfileScreen()
{
    const [firstName, setFirstName] = React.useState("");
    const [lastName, setLastName] = React.useState("");
    const [phoneE164, setPhoneE164] = React.useState("");

    const { data, loading, error, refetch } = useQuery<MeQuery, MeQueryVariables>(ME_QUERY, {
        fetchPolicy: "cache-and-network",
        errorPolicy: "all",
    });

    const [updateProfile, { loading: saving }] = useMutation<
        UpdateProfileMutation,
        UpdateProfileMutationVariables
    >(UPDATE_PROFILE_MUTATION);

    useBackendErrorToast(error, "Unable to load your profile.", {
        title: "Edit Profile Error",
        dedupeKey: "account-edit-profile-query",
    });

    React.useEffect(() =>
    {
        const profile = data?.me;
        if (!profile)
        {
            return;
        }

        setFirstName(profile.firstName ?? "");
        setLastName(profile.lastName ?? "");
        setPhoneE164(profile.phoneE164 ?? "");
    }, [data?.me]);

    const handleSave = async () =>
    {
        try
        {
            await updateProfile({
                variables: {
                    input: {
                        firstName: firstName.trim() || undefined,
                        lastName: lastName.trim() || undefined,
                        phoneE164: phoneE164.trim() || undefined,
                    },
                },
            });

            await refetch();

            showToast({
                tone: "success",
                title: "Profile Updated",
                message: "Your profile details were updated successfully.",
                dedupeKey: "account-edit-profile-success",
            });
        } catch (mutationError)
        {
            showBackendErrorToast(mutationError, "Unable to update profile.", {
                title: "Edit Profile Error",
                dedupeKey: "account-edit-profile-mutation",
            });
        }
    };

    return (
        <ScreenShell contentJustify="flex-start">
            <StyledEditProfileRoot>
                {loading && !data ? (
                    <Card>
                        <CardContent>
                            <StyledEditProfileLoadingWrap>
                                <Spinner size="small" />
                            </StyledEditProfileLoadingWrap>
                        </CardContent>
                    </Card>
                ) : null}

                <Card>
                    <CardContent>
                        <StyledEditProfileForm>
                            <StyledEditProfileLabel>First name</StyledEditProfileLabel>
                            <Input value={firstName} onChangeText={setFirstName} placeholder="First name" />

                            <StyledEditProfileLabel>Last name</StyledEditProfileLabel>
                            <Input value={lastName} onChangeText={setLastName} placeholder="Last name" />

                            <StyledEditProfileLabel>Phone (E.164)</StyledEditProfileLabel>
                            <Input
                                value={phoneE164}
                                onChangeText={setPhoneE164}
                                placeholder="+2348012345678"
                                keyboardType="phone-pad"
                            />

                            <Button fullWidth onPress={() => void handleSave()} disabled={saving}>
                                {saving ? "Saving..." : "Save profile"}
                            </Button>
                        </StyledEditProfileForm>
                    </CardContent>
                </Card>
            </StyledEditProfileRoot>
        </ScreenShell>
    );
}
