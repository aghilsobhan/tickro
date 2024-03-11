import { RiDeleteBinLine } from "react-icons/ri";
import { MdEdit } from "react-icons/md";
import { useState } from "react";
import Modal from "../ui/Modal";
import CreateNewRow from "./CreateNewRow";
import { e2p, sp } from "../utils/numbers";
import { getDate } from "../services/apiData";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../ui/Spinner";
import TBody from "../ui/TBody";

function Table() {
  const {data,isLoading}=useQuery({queryKey:['tickro'],queryFn:getDate});
  const [isModal, setIsModal] = useState(false);
if(isLoading)  return <Spinner/>;
  return (
    <div className="h-screen">
      <h1 className="text-sm p-4">گردش بستانکار</h1>
      <div className="overflow-auto">
        <table className=" divide-y-2  bg-gray-900 rounded-t-lg  text-white min-w-80 w-full">
          <thead className="text-sm">
            <tr>
              <th className=" py-3">ردیف</th>
              <th className=" py-3">نوع هزینه</th>
              <th className=" py-3">مدت(ماه)</th>
              <th className=" py-3">تاریخ</th>
              <th className=" py-3">مبلغ تخفیف (ریال)</th>
              <th className=" py-3">مالیات/عوارض</th>
              <th className=" py-3">مبلغ</th>
              <th className=" border-r-2 px-3 py-3">عملیات</th>
            </tr>
          </thead>
          <tbody className="text-black bg-gray-400 text-right">
            {data?.map((item) => (
              <TBody key={item.id} data={item}/>
            ))}
          </tbody>
        </table>
      </div>
      <Modal>
        <Modal.Open>
          <button
            onClick={() => setIsModal((show) => !show)}
            className="border-none rounded-lg cursor-pointer bg-blue-800 text-white p-2 m-3">
            ایجاد مورد جدید
          </button>
        </Modal.Open>
        <Modal.Window>
          <CreateNewRow />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default Table;
