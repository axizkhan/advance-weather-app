export const queryConfig = {
  queries: {
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 60,

    retry: 2,

    refetchOnWindowFocus: false,

    refetchOnReconnect: true,
  },
};
