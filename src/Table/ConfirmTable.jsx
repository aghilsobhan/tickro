import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteData } from "../services/apiData";

function ConfirmTable({editID, onCloseModal }) {
  const queryClient = useQueryClient();
  const { isLoading, mutate } = useMutation({
    mutationFn: deleteData,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tickro"],
      });
      onCloseModal?.();
    },
  });
  return (
    <div className="w-96 flex flex-col gap-3">
      <p className="text-gray-500 mb-3">ستون مورد نظر حذف شد؟</p>
      <div className="flex justify-end gap-3">
        <button  className="border-none rounded-lg cursor-pointer bg-blue-800 text-white p-2 m-3" onClick={onCloseModal}>کنسل</button>
        <button  className="border-none rounded-lg cursor-pointer bg-red-700 text-white p-2 m-3" onClick={()=>mutate(editID)}>حذف</button>
      </div>
    </div>
  );
}

export default ConfirmTable;
