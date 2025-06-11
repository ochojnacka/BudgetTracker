// // import React from 'react';

// const ExpenseList = ({ expenses, onDelete, onEdit }) => (
//   <table>
//     <thead>
//       <tr>
//         <th>Tytuł</th>
//         <th>Kategoria</th>
//         <th>Kwota</th>
//         <th>Data</th>
//         <th>Notatka</th>
//         <th>Plik</th>
//         <th>Akcje</th>
//       </tr>
//     </thead>
//     <tbody>
//       {expenses.map(exp => (
//         <tr key={exp.id}>
//           <td>{exp.title}</td>
//           <td>{exp.category}</td>
//           <td>{exp.amount} zł</td>
//           <td>{new Date(exp.date).toLocaleDateString()}</td>
//           <td>{exp.note}</td>
//           <td>
//             {exp.filePath && (
//               <a href={`https://localhost:7173${exp.filePath}`} 
//               // target="_blank" rel="#"
//               >
//                 Zobacz plik
//               </a>)
//             }
//           </td>
//           <td>
//             <button onClick={() => onEdit(exp)}>Edytuj</button>
//             <button onClick={() => onDelete(exp.id)}>Usuń</button>
//           </td>
//         </tr>
//       ))}
//     </tbody>
//   </table>
// );

// export default ExpenseList;

import React from 'react';

const ExpenseList = ({ expenses, onDelete, onEdit }) => (
  <div className="table-container">
    <table className="table is-striped is-hoverable is-fullwidth">
      <thead>
        <tr>
          <th>Tytuł</th>
          <th>Kategoria</th>
          <th>Kwota</th>
          <th>Data</th>
          <th>Notatka</th>
          <th>Plik</th>
          <th>Akcje</th>
        </tr>
      </thead>
      <tbody>
        {expenses.map(exp => (
          <tr key={exp.id}>
            <td>{exp.title}</td>
            <td>{exp.category}</td>
            <td>{exp.amount} zł</td>
            <td>{new Date(exp.date).toLocaleDateString()}</td>
            <td>{exp.note}</td>
            <td>
              {exp.filePath && (
                <a
                  href={`https://localhost:7173${exp.filePath}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Zobacz plik
                </a>
              )}
            </td>
            <td className="buttons">
              <button className="button is-small is-info mr-2" onClick={() => onEdit(exp)}>Edytuj</button>
              <button className="button is-small is-danger" onClick={() => onDelete(exp.id)}>Usuń</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default ExpenseList;
