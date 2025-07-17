import type { InferRequestType } from 'hono/client';
import useSWR from 'swr';
import { client } from '../../../lib/api-client';

interface HealthResponse {
  status: string;
  timestamp: string;
}

const useFetchFormHealth = () => {
  const $get = client.api.health.$get;
  const fetcher = (arg: InferRequestType<typeof $get>) => async () => {
    const res = await $get(arg);
    if (!res.ok) {
      throw new Error('Failed to fetch health status');
    }
    return (await res.json()) as HealthResponse;
  };

  const { data, error, isLoading, mutate } = useSWR('health', fetcher({}), {
    revalidateOnFocus: false,
    revalidateOnReconnect: true,
    refreshInterval: 30000, // 30秒ごとに更新
  });

  return {
    health: data,
    fetchHealthLoading: isLoading,
    fetchHealthError: error,
    fetchHealthMutate: mutate,
  };
};

export default useFetchFormHealth;
