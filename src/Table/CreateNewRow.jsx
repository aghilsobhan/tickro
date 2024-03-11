import React, { useState } from "react";
import Input from "../ui/Input";
import { Controller, useForm } from "react-hook-form";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addData, editTable } from "../services/apiData";
import toast from "react-hot-toast";
const stylDate = {
  backgroundColor: "white",
  display: "block",
  border: " 1px solid #D1D5DB" /* border-gray-300 */,
  borderRadius: "0.375rem" /* rounded-md */,
  paddingLeft: "8px",
  paddingTop: "16px",
  paddingBottom: "16px",
  boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)" /* shadow-sm */,
  maxWidth: "14rem",
  width: "14rem",
};
function CreateNewRow({ dataTable = {},onCloseModal }) {
  const { id: editID, ...editValue } = dataTable;

  const isEditValue = Boolean(editID);
  const queryClient = useQueryClient();
  const { control, handleSubmit, register, reset, getValues, formState } =
    useForm({
      defaultValues: isEditValue ? editValue : {},
    });
  const { errors } = formState;
  const { mutate, isLoading } = useMutation({
    mutationFn: addData,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tickro"],
      });
      reset();
      onCloseModal?.();

    },
    onError: (err) => {
      toast.error("خطا در برقراری ارتباط");
      console.log(err);
    },
  });
  const { mutate: editMutate, isLoading: editLoading } = useMutation({
    mutationFn: editTable,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tickro"],
        
      });
      onCloseModal?.();
      
    },
    onError: (err) => {
      toast.error("خطا در برقراری ارتباط");
      console.log(err);
    },
  });

  const onSubmit = (data) => {
    //data.date.format?.("YYYY/MM/DD").toString();

    isEditValue? editMutate({data, editID}):mutate(data);
  };
  const onError = (error) => {
    console.log(error);
  };

  return (
    <div>
      <form className="" onSubmit={handleSubmit(onSubmit, onError)}>
        <div className="grid items-center">
          <label className="font-bold">ردیف</label>
          <Input
            type="number"
            id="row"
            {...register("row", {
              required: "لظفا این قسمت را تکمیل کنید",
              min: {
                value: 0,
                message: "باید بیشتر از 4 رقم باشد",
              },
            })}
            placeholder="شماره ردیف"
          />
          {errors?.row?.message && (
            <span className="text-red-700 text-sm">{errors?.row?.message}</span>
          )}
        </div>
        <div className="grid items-center">
          <label>تاریخ</label>
          <div style={{ direction: "rtl", maxWidth: "20rem" }}>
            <Controller
              control={control}
              name="date"
              render={({ field: { onChange, name, value } }) => (
                <>
                  <DatePicker
                    style={stylDate}
                    mobileLabels={{
                      OK: "Accept",
                      CANCEL: "Close",
                    }}
                    {...register(name, {
                      required: "تاریخ را از جدول انتخاب کنید",
                    })}
                    calendar={persian}
                    locale={persian_fa}
                    calendarPosition="bottom-right"
                    placeholder="تاریخ"
                    onChange={(date) => onChange(date.format?.("DD/MM/YYYY"))}
                    value={value}
                    format="D MMMM YYYY"
                  />
                </>
              )}
            />
          </div>
          {errors?.date?.message && (
            <span className="text-red-700 text-sm">
              {errors?.date?.message}
            </span>
          )}
        </div>
        <div className="grid items-center">
          <label>مالیات/عوارض</label>
          <Input
            type="number"
            id="tax"
            defaultValue={0}
            placeholder="عوارض/مالیات"
            {...register("tax")}
          />
          {errors?.tax?.message && (
            <span className="text-red-700 text-sm">{errors?.tax?.message}</span>
          )}
        </div>

        <div className="grid items-center">
          <label>مبلغ</label>
          <Input
            type="number"
            id="amount"
            placeholder="مبلغ"
            {...register("amount")}
          />
          {errors?.amount?.message && (
            <span className="text-red-700 text-sm">
              {errors?.amount?.message}
            </span>
          )}
        </div>
        <div className="grid items-center">
          <label>نوع هزینه</label>
          <Input
            type="text"
            id="costType"
            {...register("costType", {
              required: "نوع هزینه الزامی میباشد",
            })}
            placeholder="نوع هزینه"
          />
          {errors?.costType?.message && (
            <span className="text-red-700 text-sm">
              {errors?.costType?.message}
            </span>
          )}
        </div>
        <div className="grid items-center">
          <label>مدت (ماه)</label>
          <Input
            type="number"
            id="timeMonth"
            placeholder="مدت (ماه)"
            {...register("timeMonth")}
          />
          {errors?.timeMonth?.message && (
            <span className="text-red-700 text-sm">
              {errors?.timeMonth?.message}
            </span>
          )}
        </div>

        <div className="grid items-center">
          <label>تخفیف</label>
          <Input
            placeholder="تخفیف"
            type="number"
            id="amountDiscount"
            {...register("amountDiscount", {
              validate: (value) =>
                value >= getValues()?.amount ||
                "مبلغ تخفیف باید کمتر از مبلغ کل باشد",
            })}
          />
          {errors?.amountDiscount?.message && (
            <span className="text-red-700 text-sm">
              {errors?.amountDiscount?.message}
            </span>
          )}
        </div>

        {
          <button
            disabled={isLoading || editLoading}
            className="border-none rounded-lg cursor-pointer bg-blue-800 text-white p-2 m-3"
          >
            {!isEditValue ? "ایجاد" : "ویرایش"}
          </button>
        }
      </form>
    </div>
  );
}

export default CreateNewRow;
