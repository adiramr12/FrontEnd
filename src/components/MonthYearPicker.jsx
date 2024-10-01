import { useEffect, useMemo } from 'react';

const MonthYearPicker = ({ onChange, date, label = 'Select Month and Year:' }) => {
  const selectedMonthYear = useMemo(() => {
    if (date) {
      return `${date.year}-${date.month.toString().padStart(2, '0')}`;
    }
    return '';
  }, [date]);

  useEffect(() => {
    if (onChange && selectedMonthYear) {
      const [year, month] = selectedMonthYear.split('-');
      onChange({
        year: Number(year),
        month: Number(month),
      });
    }
  }, [onChange, selectedMonthYear]);

  const handleMonthYearChange = e => {
    debugger
    if (e.target.value) {
      const [year, month] = e.target.value.split('-');
      onChange({
        year: Number(year),
        month: Number(month),
      });
    }
    else {
      onChange(null)
    }
  };

  return (
    <div style={{
      maxWidth: '250px',
      display: 'flex',
      flexDirection: 'column',
      gap: '10px'
    }}>
      {label && (
        <label
          htmlFor="monthYearPicker"
          style={{ marginRight: '10px',}}
        >
          {label}
        </label>
      )}
      <input
        className="form-input"
        id="monthYearPicker"
        type="month"
        value={selectedMonthYear}
        onChange={handleMonthYearChange}
      />
    </div>
  );
};

export default MonthYearPicker;
