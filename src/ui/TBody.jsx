import { e2p, sp } from "../utils/numbers";
import { RiDeleteBinLine } from "react-icons/ri";
import { MdEdit } from "react-icons/md";
import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { deleteData } from "../services/apiData";
import toast from "react-hot-toast";
import CreateNewRow from "../Table/CreateNewRow";
import Modal from "./Modal";
import { useState } from "react";
import ConfirmTable from "../Table/ConfirmTable";

function TBody({ data }) {
  const queryClient = useQueryClient();
  const [isModal, setIsModal] = useState(false);
  const {
    id: dataID,
    row,
    costType,
    timeMonth,
    date,
    amountDiscount,
    amount,
    tax,
  } = data;
  const { isLoading, mutate } = useMutation({
    mutationFn: deleteData,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tickro"],
      });
      toast.success("اطلاعات با موفقیت حذف شد");
    },
    onError: () => {
      toast.error("اطلاعات حذف نشد");
    },
  });
  return (
    <>
      <tr key={dataID} className="even:bg-gray-100 odd:bg-gray-400 text-right">
        <td className="py-3 text-center ">{`${row}`}</td>
        <td className="py-3 overflow-auto  text-center   min-w-80">{`${costType}`}</td>
        <td className="py-3  text-center">{`${e2p(timeMonth)}`}</td>
        <td className="py-3  text-center">{`${e2p(date)}`}</td>
        <td className="py-3  text-center">{`${sp(amountDiscount)}`}</td>
        <td className="py-3  text-center">{`${e2p(tax)}`}</td>
        <td className="py-3 text-center">{`${sp(amount)}`}</td>
        <td className="border-r-2 text-center  border-white">
          <div className="flex justify-center ">
            <Modal>
              <Modal.Open>
                <RiDeleteBinLine
                  disabled={isLoading}
                  className="bg-slate-200 rounded-md m-1 cursor-pointer p-1"
                  size={25}
                />
              </Modal.Open>
              <Modal.Window>
                <ConfirmTable editID={dataID}  />
              </Modal.Window>
            </Modal>

            <Modal>
              <Modal.Open>
                <MdEdit
                  onClick={() => setIsModal((show) => !show)}
                  className="bg-slate-200 rounded-md cursor-pointer m-1 p-1 "
                  size={25}
                />
              </Modal.Open>
              <Modal.Window>
                <CreateNewRow dataTable={data} />
              </Modal.Window>
            </Modal>
          </div>
        </td>
      </tr>
    </>
  );
}

export default TBody;
