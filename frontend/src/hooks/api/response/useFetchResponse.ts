import type { InferRequestType } from 'hono/client';
import useSWR from 'swr';
import type { ResponseItemDto } from '../../../../../backend/src/application/dto/FormResponseDto';
import { client } from '../../../lib/api-client';

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

const useFetchResponse = (id: string) => {
  const $get = client.api.responses[':id'].$get;
  const fetcher = (arg: InferRequestType<typeof $get>) => async () => {
    const res = await $get(arg);
    if (!res.ok) {
      throw new Error('Failed to fetch response');
    }
    const result = (await res.json()) as ApiResponse<ResponseItemDto>;
    if (!result.success || !result.data) {
      throw new Error(result.error || 'Failed to fetch response');
    }
    return result.data;
  };

  const { data, error, isLoading, mutate } = useSWR(
    id ? `response-${id}` : null,
    fetcher({
      param: { id },
    }),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
    },
  );

  return {
    response: data,
    fetchResponseLoading: isLoading,
    fetchResponseError: error,
    fetchResponseMutate: mutate,
  };
};

export default useFetchResponse;
