import { err, ok } from 'neverthrow';
import useSWRMutation from 'swr/mutation';
import { client } from '../../../lib/api-client';

interface ActivateFormArg {
  id: string;
}

const useActivateForm = () => {
  const $patch = client.api.forms[':id'].activate.$patch;

  const activateForm = async (
    _url: string,
    { arg }: { arg: ActivateFormArg },
  ) => {
    try {
      const res = await $patch({
        param: { id: arg.id },
      });

      if (!res.ok) {
        return err(res.statusText);
      }

      const data = await res.json();
      return ok(data);
    } catch (error) {
      return err(error instanceof Error ? error.message : 'Unknown error');
    }
  };

  const { trigger, isMutating } = useSWRMutation(
    'forms/activate',
    activateForm,
  );

  return {
    activateForm: trigger,
    activateFormIsMutating: isMutating,
  };
};

export default useActivateForm;
