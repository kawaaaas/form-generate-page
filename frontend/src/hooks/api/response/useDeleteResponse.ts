import { err, ok } from 'neverthrow';
import useSWRMutation from 'swr/mutation';
import { client } from '../../../lib/api-client';

interface DeleteResponseArg {
  id: string;
}

const useDeleteResponse = () => {
  const $delete = client.api.responses[':id'].$delete;

  const deleteResponse = async (
    _url: string,
    { arg }: { arg: DeleteResponseArg },
  ) => {
    try {
      const res = await $delete({
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
    'responses/delete',
    deleteResponse,
  );

  return {
    deleteResponse: trigger,
    deleteResponseIsMutating: isMutating,
  };
};

export default useDeleteResponse;
