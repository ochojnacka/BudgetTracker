using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

using BudgetTracker.Data;
using BudgetTracker.Models;

namespace BudgetTracker.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ExpensesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ExpensesController(AppDbContext context) : base()
        {
            _context = context;
        }

        // GET: api/expenses  -> tu jest sukces 200 OK
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Expense>>> GetExpenses()
        {
            try
            {
                return await _context.Expenses.ToListAsync();
            }
            catch (Exception ex) 
            {
                return StatusCode(500, new { message = "błąd przy pobieraniu danych", error = ex.Message });
            }
        }

        // GET: api/expenses/1 -> tu jest sukces 200 OK
        [HttpGet("{id}")]
        public async Task<ActionResult<Expense>> GetExpense(int id)
        {
            try
            {
                var expense = await _context.Expenses.FindAsync(id);

                if (expense == null)
                    return NotFound(new { message = "Nie ma wydatku o takim id " });

                return Ok(expense);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "błąd serwera", error = ex.Message });
            }

        }

        // POST: api/expenses  -  tu jest sukces 201 Created
        [HttpPost]
        public async Task<ActionResult<Expense>> CreateExpense([FromBody] Expense expense)
        {
            try
            {
                _context.Expenses.Add(expense);
                await _context.SaveChangesAsync();

                return CreatedAtAction(nameof(GetExpense), new { id = expense.Id }, expense);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "błąd przy dodawaniu wydatku", error = ex.Message });
            }
        }

        // PUT: api/expenses/1 -  tu jest sukces 204 NoContent
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateExpense(int id, Expense updatedExpense)
        {
            if (id != updatedExpense.Id)
                return BadRequest(new { message = "ID z url nie pasuje do updated id" });
                

            _context.Entry(updatedExpense).State = EntityState.Modified; // tu jest wsm nadpisywanie całego obiektu

            try
            {
                await _context.SaveChangesAsync(); // zapiswanie do bazy
                return NoContent();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                if (!_context.Expenses.Any(e => e.Id == id))
                    return NotFound(new { message = " nie ma wydatku o takim id" });
                //to jest błąd przy aktualizacji, np. ktoś inny zmienił dane w międzyczasie - czyli blad równoległości
                return StatusCode(500, new { message = "Błąd podczas aktualizacji.", error = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "błąd ogólny podczas aktualizacji - np sprawdz czy zła walidacja, zła struktura danych", error = ex.Message });
            }

        }

        // DELETE: api/expenses/5  - tu jest sukces 204 NoContent
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteExpense(int id)
        {
            try
            {
                var expense = await _context.Expenses.FindAsync(id);
                if (expense == null)
                    return NotFound(new { message = "Nie znaleziono wydatku do usunięcia." });

                _context.Expenses.Remove(expense);
                await _context.SaveChangesAsync();

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Błąd podczas usuwania wydatku", error = ex.Message });
            }
        }

        // GET: api/expenses/category/{category}


        // POST: api/expenses/upload -> tu jest sukces 200 OK
        [HttpPost("upload")]
        public async Task<IActionResult> UploadFile([FromForm] int expenseId, [FromForm] IFormFile file)
        {
            var expense = await _context.Expenses.FindAsync(expenseId);
            if (expense == null)
                return NotFound(new { message = "Wydatek nie istnieje." });

            if (file == null || file.Length == 0)
                return BadRequest(new { message = "Nieprawidłowy plik." });

            var uploadsDir = Path.Combine(Directory.GetCurrentDirectory(), "Uploads");
            if (!Directory.Exists(uploadsDir))
                Directory.CreateDirectory(uploadsDir);

            var fileName = $"{Guid.NewGuid()}_{file.FileName}";
            var filePath = Path.Combine(uploadsDir, fileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            expense.FilePath = $"/Uploads/{fileName}";
            await _context.SaveChangesAsync();

            return Ok(new { message = "Plik zapisany", path = expense.FilePath });
        }

    }
}
