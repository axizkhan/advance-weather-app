import { api } from "@/lib/axios";

export async function weatherRequest<T>(
  endpoint: string,
  params?: Record<string, string | number | boolean>,
) {
  const reponse = await api.get(endpoint, {
    params,
  });

  return reponse.data;
}
