import type { FormResponseDto } from '@backend/application/dto/FormResponseDto';
import type { InferRequestType } from 'hono/client';
import useSWR from 'swr';
import { client } from '../../../lib/api-client';

const useFetchForm = (id: string) => {
  const $get = client.api.forms[':id'].$get;
  const fetcher = (arg: InferRequestType<typeof $get>) => async () => {
    const res = await $get(arg);
    if (!res.ok) {
      throw new Error('Failed to fetch form');
    }
    return (await res.json()) as FormResponseDto;
  };

  const { data, error, isLoading, mutate } = useSWR(
    id ? `form-${id}` : null,
    fetcher({
      param: { id },
    }),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
    },
  );

  return {
    form: data,
    fetchFormLoading: isLoading,
    fetchFormError: error,
    fetchFormMutate: mutate,
  };
};

export default useFetchForm;
