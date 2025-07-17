import type { ResponseItemDto } from '@backend/application/dto/SubmitResponseDto';
import type { InferRequestType } from 'hono/client';
import useSWR from 'swr';
import { client } from '../../../lib/api-client';

const useFetchResponse = (id: string) => {
  const $get = client.api.responses[':id'].$get;
  const fetcher = (arg: InferRequestType<typeof $get>) => async () => {
    const res = await $get(arg);
    if (!res.ok) {
      throw new Error('Failed to fetch response');
    }
    return (await res.json()) as ResponseItemDto;
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
