import CalorieForm from '../components/CalorieForm/CalorieForm';
import CalorieTable from '../components/CalorieTable/CalorieTable';
import { useCaloriesManagerContext } from '../providers/CaloriesManager.provider';
import { useEffect, useState, useCallback } from 'react';
import MonthYearPicker from '../components/MonthYearPicker';

const HomePage = () => {
  const caloriesManagerContext = useCaloriesManagerContext();
  const [items, setItems] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);

  const fetchItems = useCallback(async () => {
    if (caloriesManagerContext.db) {
      if (selectedDate) {
        const items = await caloriesManagerContext.db.getCaloriesByDate(selectedDate.year, selectedDate.month);
        setItems(items);
      } else {
        const items = await caloriesManagerContext.db.getAllCalories();
        setItems(items);
      }
    }
  }, [caloriesManagerContext.db, selectedDate]);

  useEffect(() => {
    fetchItems();
  }, [caloriesManagerContext, fetchItems]);

  const addCalories = async calories => {
    if (caloriesManagerContext.db) {
      await caloriesManagerContext.db.addCalories(calories);
      setSelectedDate(null);
      fetchItems();
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        margin: '20px',
      }}
    >
      <h1>Home Page</h1>
      <MonthYearPicker
        onChange={setSelectedDate}
        date={selectedDate}
      />
      <CalorieForm onSubmit={addCalories} />
      <CalorieTable data={items} />
    </div>
  );
};

export default HomePage;
