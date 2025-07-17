import type { CreateFormDto } from '@backend/application/dto/CreateFormDto';
import type { FormResponseDto } from '@backend/application/dto/FormResponseDto';
import { err, ok } from 'neverthrow';
import useSWRMutation from 'swr/mutation';
import { client } from '../../../lib/api-client';

const useCreateForm = () => {
  const $post = client.api.forms.create.$post;

  const createForm = async (_url: string, { arg }: { arg: CreateFormDto }) => {
    try {
      const res = await $post({
        json: arg,
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

  const { trigger, isMutating } = useSWRMutation('forms/create', createForm);

  return {
    createForm: trigger,
    createFormIsMutating: isMutating,
  };
};

export default useCreateForm;
