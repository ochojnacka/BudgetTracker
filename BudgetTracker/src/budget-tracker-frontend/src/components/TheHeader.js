// import React from 'react'

// export const TheHeader = () => {
//   return (
//     <div>
//         <h1>BudgetTracer 💰</h1>
//     </div>
//   )
// }

// export default TheHeader;

import React from 'react'

export const TheHeader = () => {
  return (
<nav class="navbar" role="navigation" aria-label="main navigation">
  <div class="navbar-brand">
    <a class="navbar-item" href="">
        <h1>BudgetTracer 💰</h1>
    </a>

    <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false">
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </a>
  </div>
</nav>
  )
}

export default TheHeader;