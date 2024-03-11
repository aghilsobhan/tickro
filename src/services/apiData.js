// export const data = [
//     {
//       id: 1,
//       row: "2526",
//       costType: "در آمد صدور پروانه باری کمتر از",
//       timeMonth: 2,
//       date: "1402/02/12",
//       amountDiscount: "0.0",
//       tax: "0",
//       amount: "500000",
//     },
//     {
//       id: 2,
//       row: "2568",
//       costType: "در آمد صدور پروانه باری کمتر از",
//       timeMonth: 2,
//       date: "1402/02/12",
//       amountDiscount: "0.0",
//       tax: "0",
//       amount: "500000",
//     },
//     {
//       id: 3,
//       row: "3586",
//       costType: "در آمد صدور پروانه باری کمتر از",
//       timeMonth: 2,
//       date: "1402/02/12",
//       amountDiscount: "350000000",
//       tax: "8",
//       amount: "556000000",
//     },
//     {
//       id: 4,
//       row: "2564",
//       costType: "در آمد صدور پروانه باری کمتر از",
//       timeMonth: 2,
//       date: "1402/02/12",
//       amountDiscount: "0.0",
//       tax: "0",
//       amount: "500000",
//     },
//     {
//       id: 5,
//       row: "5658",
//       costType:
//         "در آمد صدور پروانه باری کمتر از 3.5تن در ماه و نه بیشتر وبرای بیشتر بودن عواقب ان و ذر نهایت بیشتر را",
//       timeMonth: 2,
//       date: "1402/02/12",
//       amountDiscount: "0.0",
//       tax: "0",
//       amount: "500000",
//     },

import supabase from "./supabase";

export async function getDate() {
  const { data, error } = await supabase.from("tickro").select("*");
  if (error) {
    throw new Error("خطا در دریافت اطلاعات");
  }
  return data;
}
export async function addData(newData) {
  console.log(newData);
  const { data, error } = await supabase.from("tickro").insert([newData]);
  if (error) {
    throw new Error("error in add new data");
  }
  return data;
}
export async function deleteData(id) {
  const { error, data } = await supabase.from("tickro").delete().eq("id", id);
  if (error) {
    throw new Error("خطا در حذف ردیف مورد نظر");
  }
  return data;
}
export async function editTable(updateTable) {
  const { data, error } = await supabase
    .from("tickro")
    .update([updateTable.data ])
    .eq("id", updateTable.editID)
  if (error) {
    throw new Error("error table is edit");
  }
  return data;
}
