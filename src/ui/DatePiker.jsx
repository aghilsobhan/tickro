
import DatePicker from "react-multi-date-picker"
import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa"
function DatePickerDetailes({props,ref}) {
    return (
        <div style={{ direction: "rtl","maxWidth":"20rem" }}>
        <DatePicker
        style={{   
            "backgroundColor":"white",
            "display": "block",
            "border":" 1px solid #D1D5DB", /* border-gray-300 */
            "borderRadius": "0.375rem", /* rounded-md */
            "paddingLeft":"8px",
            "paddingTop":"16px",
            "paddingBottom":"16px",
            "boxShadow": "0 1px 2px 0 rgba(0, 0, 0, 0.05)", /* shadow-sm */
            "maxWidth":"14rem",
        "width":"14rem"}}
        {...props}
        ref={ref}
          calendar={persian}
          id={id}
          locale={persian_fa}
          calendarPosition="bottom-right"
          placeholder="تاریخ"
        />
      </div>
      );
}

export default DatePickerDetailes;