import type { CreateFormDto } from '@backend/application/dto/CreateFormDto';
import type { FormResponseDto } from '@backend/application/dto/FormResponseDto';
import { err, ok } from 'neverthrow';
import useSWRMutation from 'swr/mutation';
import { client } from '../../../lib/api-client';

interface UpdateFormArg {
  id: string;
  data: Partial<CreateFormDto>;
}

const useUpdateForm = () => {
  const $put = client.api.forms[':id'].$put;

  const updateForm = async (_url: string, { arg }: { arg: UpdateFormArg }) => {
    try {
      const res = await $put({
        param: { id: arg.id },
        json: arg.data,
      });

      if (!res.ok) {
        return err(res.statusText);
      }

      const data = (await res.json()) as FormResponseDto;
      return ok(data);
    } catch (error) {
      return err(error instanceof Error ? error.message : 'Unknown error');
    }
  };

  const { trigger, isMutating } = useSWRMutation('forms/update', updateForm);

  return {
    updateForm: trigger,
    updateFormIsMutating: isMutating,
  };
};

export default useUpdateForm;
