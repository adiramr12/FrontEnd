import './CalorieTable.css';

const CalorieTable = (
  { data }, // data is an array of objects
) => {
  return (
    <div className="table-container">
      <table className="calorie-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Description</th>
            <th>Category</th>
            <th>Calorie</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {data.map(item => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.description}</td>
              <td>{item.category}</td>
              <td>{item.calorie}</td>
              <td>{`${item.month}/${item.year}`}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CalorieTable;
