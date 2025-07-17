import { err, ok } from 'neverthrow';
import useSWRMutation from 'swr/mutation';
import { client } from '../../../lib/api-client';

interface DeleteResponsesForFormArg {
  formId: string;
}

const useDeleteResponsesForForm = () => {
  const $delete = client.api.responses.form[':formId'].$delete;

  const deleteResponsesForForm = async (
    _url: string,
    { arg }: { arg: DeleteResponsesForFormArg },
  ) => {
    try {
      const res = await $delete({
        param: { formId: arg.formId },
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
    'responses/form/delete',
    deleteResponsesForForm,
  );

  return {
    deleteResponsesForForm: trigger,
    deleteResponsesForFormIsMutating: isMutating,
  };
};

export default useDeleteResponsesForForm;
