import React, { useState, useEffect } from 'react';
import InputCard from './InputCard';
import TheTextarea from './TheTextarea';
import {} from '../stylesheet/ExpenseForms.css'

const initialState = {
  title: '',
  amount: 0,
  date: '',
  category: '',
  note: ''
};

const ExpenseForm = ({ onSave, selected, onCancel}) => {
  const [expense, setExpense] = useState(initialState);
  const [file, setFile] = useState(null);

  useEffect(() => {
    if (selected) {
      setExpense(selected)
      setFile(null) //resetuje plik przy edycji?
    }
    else {
    setExpense(initialState);
    setFile(null)
    }
  }, [selected]);

  const handleChange = e => {
    const { name, value } = e.target;
    setExpense({ ...expense, [name]: value });
  };

  const handleFileChange = e => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSave(expense,file); // tu dodalam zeby tez file sie przekazal
  };

  return (
    <form onSubmit={handleSubmit}>
      <InputCard
        name="title"
        label="Tytuł"
        type="text"
        placeholder="Wpisz tytuł"
        value={expense.title}
        onChange={handleChange}
      />
      {/* <input name="amount" type="number" placeholder="Kwota" value={expense.amount} onChange={handleChange} /> */}
      <InputCard
        name="amount"
        label="Kwota"
        type="number"
        placeholder="Wpisz kwotę"
        value={expense.amount}
        onChange={handleChange}
      />
      {/* <input name="date" type="date" value={expense.date.split('T')[0]} onChange={handleChange} /> */}
      <InputCard
        name="date"
        label="Data"
        type="date"
        placeholder="Wpisz datę"
        value={expense.date.split('T')[0]}
        onChange={handleChange}
      />
      {/* <input name="category" placeholder="Kategoria" value={expense.category} onChange={handleChange} />       */}
      <InputCard
        name="category"
        label="Kategoria"
        type="text"
        placeholder="Wpisz kategorię"
        value={expense.category}
        onChange={handleChange}
      />
      {/* <input name="note" placeholder="Notatka" value={expense.note} onChange={handleChange} /> */}
      <textarea name="note" placeholder="Notatka" value={expense.note} onChange={handleChange} />
      {/* <TheTextarea name="note" placeholder="Notatka" value={expense.note} onChange={handleChange}/> */}
      {/* <input type="file" onChange={(e) => setFile(e.target.files[0])} /> */}
      {/* <input type="file" onChange={handleFileChange} /> */}
      <div className="file has-name is-boxed">
        <label className="file-label">
          <input className="file-input" type="file" name="resume" onChange={handleFileChange} />
          <span className="file-cta">
            <span className="file-icon">
              📁
            </span>
            <span className="file-label">
              Wybierz plik…
            </span>
          </span>
          {file && <span className="file-name">{file.name}</span>}
        </label>
      </div>
      {/* {file && <p>Wybrano plik: {file.name}</p>} */}

      {/* <button className="button is-primary" type="submit">{expense.id ? 'Zapisz zmiany' : 'Dodaj wydatek'}</button> */}
      <div className="buttons mt-4">
        <button className="button is-primary" type="submit">
          {expense.id ? 'Zapisz zmiany' : 'Dodaj wydatek'}
        </button>

        {expense.id && (
          <button
            className="button is-light"
            type="button"
            onClick={onCancel}
          >
            Anuluj
          </button>
        )}
      </div>
    </form>
  );
};

export default ExpenseForm;
