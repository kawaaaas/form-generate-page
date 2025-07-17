import type { ResponseItemDto } from '@backend/application/dto/SubmitResponseDto';
import { err, ok } from 'neverthrow';
import useSWRMutation from 'swr/mutation';
import { client } from '../../../lib/api-client';

interface CreateResponseForFormArg {
  formId: string;
  data: Record<string, unknown>;
  metadata?: Record<string, unknown>;
}

const useCreateResponseForForm = () => {
  const $post = client.api.responses.form[':formId'].$post;

  const createResponseForForm = async (
    _url: string,
    { arg }: { arg: CreateResponseForFormArg },
  ) => {
    try {
      const res = await $post({
        param: { formId: arg.formId },
        json: {
          data: arg.data,
          metadata: arg.metadata,
        },
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
    'responses/form/create',
    createResponseForForm,
  );

  return {
    createResponseForForm: trigger,
    createResponseForFormIsMutating: isMutating,
  };
};

export default useCreateResponseForForm;
