import type { FormResponseDto } from '@backend/application/dto/FormResponseDto';
import { err, ok } from 'neverthrow';
import useSWRMutation from 'swr/mutation';
import { client } from '../../../lib/api-client';

interface VerifyPasswordArg {
  id: string;
  password: string;
}

const useVerifyFormPassword = () => {
  const $post = client.api.forms[':id'].verify.$post;

  const verifyFormPassword = async (
    _url: string,
    { arg }: { arg: VerifyPasswordArg },
  ) => {
    try {
      const res = await $post({
        param: { id: arg.id },
        json: { password: arg.password },
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

  const { trigger, isMutating } = useSWRMutation(
    'forms/verify',
    verifyFormPassword,
  );

  return {
    verifyFormPassword: trigger,
    verifyFormPasswordIsMutating: isMutating,
  };
};

export default useVerifyFormPassword;
