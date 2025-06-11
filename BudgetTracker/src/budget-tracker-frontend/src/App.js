import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ExpenseList from './components/ExpenseList';
import ExpenseForm from './components/ExpenseForm';
import TheHeader from './components/TheHeader';

const API_URL = 'https:/localhost:7173/api/expenses';

function App() {
  const [expenses, setExpenses] = useState([]);
  const [selectedExpense, setSelectedExpense] = useState(null);

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    const res = await axios.get(API_URL);
    setExpenses(res.data);
  };

  const handleDelete = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    fetchExpenses();
  };

  const handleEdit = (expense) => {
    setSelectedExpense(expense);
  };

  const handleCancelEdit = () => {
    setSelectedExpense(null)
  }

  const handleSave = async (expense, file) => {
    let savedExpense;

    if (expense.id) {
      const res = await axios.put(`${API_URL}/${expense.id}`, expense);
      savedExpense = res.data;
    } else {
      const res = await axios.post(API_URL, expense);
      savedExpense = res.data;
    }

    if (file && savedExpense?.id) {
      const formData = new FormData();
      formData.append("expenseId", savedExpense.id);
      formData.append("file", file);

      await axios.post(`${API_URL}/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    }

  setSelectedExpense(null);
  fetchExpenses();
  };


  return (
    <div className="container">
      <TheHeader/>
      <ExpenseForm onSave={handleSave} selected={selectedExpense} onCancel={handleCancelEdit} />
      <ExpenseList expenses={expenses} onDelete={handleDelete} onEdit={handleEdit}/>
    </div>
  );
}

export default App;
