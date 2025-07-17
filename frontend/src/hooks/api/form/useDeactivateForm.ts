import { err, ok } from 'neverthrow';
import useSWRMutation from 'swr/mutation';
import { client } from '../../../lib/api-client';

interface DeactivateFormArg {
  id: string;
}

const useDeactivateForm = () => {
  const $patch = client.api.forms[':id'].deactivate.$patch;

  const deactivateForm = async (
    _url: string,
    { arg }: { arg: DeactivateFormArg },
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
    'forms/deactivate',
    deactivateForm,
  );

  return {
    deactivateForm: trigger,
    deactivateFormIsMutating: isMutating,
  };
};

export default useDeactivateForm;
