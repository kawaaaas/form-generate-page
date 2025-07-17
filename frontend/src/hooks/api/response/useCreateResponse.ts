import type {
  ResponseItemDto,
  SubmitResponseDto,
} from '@backend/application/dto/SubmitResponseDto';
import { err, ok } from 'neverthrow';
import useSWRMutation from 'swr/mutation';
import { client } from '../../../lib/api-client';

const useCreateResponse = () => {
  const $post = client.api.responses.create.$post;

  const createResponse = async (
    _url: string,
    { arg }: { arg: SubmitResponseDto },
  ) => {
    try {
      const res = await $post({
        json: arg,
      });

      if (!res.ok) {
        return err(res.statusText);
      }

      const data = (await res.json()) as ResponseItemDto;
      return ok(data);
    } catch (error) {
      return err(error instanceof Error ? error.message : 'Unknown error');
    }
  };

  const { trigger, isMutating } = useSWRMutation(
    'responses/create',
    createResponse,
  );

  return {
    createResponse: trigger,
    createResponseIsMutating: isMutating,
  };
};

export default useCreateResponse;
