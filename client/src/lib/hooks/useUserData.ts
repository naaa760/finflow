import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchApi } from "../api";

export interface UserPreferences {
  emailNotifications: boolean;
  currencyDisplay: "USD" | "EUR" | "GBP";
  theme: "light" | "dark";
}

type PreferencesResponse = {
  success: boolean;
  data: UserPreferences;
};

export function useUserPreferences() {
  const queryClient = useQueryClient();

  const query = useQuery<PreferencesResponse, Error>({
    queryKey: ["userPreferences"],
    queryFn: () => fetchApi("/user/preferences"),
  });

  const mutation = useMutation<
    PreferencesResponse,
    Error,
    Partial<UserPreferences>
  >({
    mutationFn: (newPreferences) =>
      fetchApi("/user/preferences", {
        method: "PATCH",
        body: JSON.stringify(newPreferences),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userPreferences"] });
    },
  });

  return {
    preferences: query.data?.data,
    isLoading: query.isLoading,
    error: query.error,
    updatePreferences: mutation.mutate,
    isUpdating: mutation.isPending,
  };
}
