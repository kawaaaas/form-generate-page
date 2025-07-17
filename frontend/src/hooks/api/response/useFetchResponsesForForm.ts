import type { ResponseItemDto } from '@backend/application/dto/SubmitResponseDto';
import type { InferRequestType } from 'hono/client';
import useSWR from 'swr';
import { client } from '../../../lib/api-client';

interface UseFetchResponsesForFormOptions {
  limit?: number;
  offset?: number;
}

const useFetchResponsesForForm = (
  formId: string,
  options?: UseFetchResponsesForFormOptions,
) => {
  const $get = client.api.responses.form[':formId'].$get;
  const fetcher = (arg: InferRequestType<typeof $get>) => async () => {
    const res = await $get(arg);
    if (!res.ok) {
      throw new Error('Failed to fetch responses for form');
    }
    return (await res.json()) as ResponseItemDto[];
  };

  const { data, error, isLoading, mutate } = useSWR(
    formId
      ? `responses-form-${formId}-${options?.limit ?? 'all'}-${options?.offset ?? 0}`
      : null,
    fetcher({
      param: { formId },
    }),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
    },
  );

  return {
    responses: data,
    fetchResponsesLoading: isLoading,
    fetchResponsesError: error,
    fetchResponsesMutate: mutate,
  };
};

export default useFetchResponsesForForm;
