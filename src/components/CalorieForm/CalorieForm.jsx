import { useState } from 'react';
import './CalorieForm.css'; // Import the CSS file
import MonthYearPicker from '../MonthYearPicker';

const CalorieForm = ({ onSubmit }) => {
  const [calorie, setCalorie] = useState('');
  const [category, setCategory] = useState('BREAKFAST');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState({
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
  });

  const handleSubmit = e => {
    debugger
    e.preventDefault();
    // Call the onSubmit prop function and pass the form data
    onSubmit({
      calorie,
      category,
      description,
      year: date.year,
      month: date.month
    });

    // Clear the form after submission
    setCalorie('');
    setCategory('BREAKFAST');
    setDescription('');
    setDate({
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="calorie-form"
    >
      <div className="form-group">
        <label className="form-label">Date:</label>
        <MonthYearPicker
          onChange={setDate}
          date={date}
          label={false}
        />
      </div>
      <div className="form-group">
        <label className="form-label">Category:</label>
        <select
          value={category}
          onChange={e => setCategory(e.target.value)}
          required
          className="form-input"
        >
          <option value="BREAKFAST">Breakfast</option>
          <option value="LUNCH">Lunch</option>
          <option value="DINNER">Dinner</option>
          <option value="OTHER">Other</option>
        </select>
      </div>

      <div className="form-group">
        <label className="form-label">Calories:</label>
        <input
          type="number"
          value={calorie}
          onChange={e => setCalorie(Number(e.target.value))}
          required
          className="form-input"
        />
      </div>

      <div className="form-group">
        <label className="form-label">Description:</label>
        <input
          type="text"
          value={description}
          onChange={e => setDescription(e.target.value)}
          required
          className="form-input"
        />
      </div>

      <button
        type="submit"
        className="form-button"
      >
        Add Item
      </button>
    </form>
  );
};

export default CalorieForm;
