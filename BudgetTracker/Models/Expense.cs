using System.ComponentModel.DataAnnotations;

namespace BudgetTracker.Models
{
    public class Expense
    {
        public int Id { get; set; }
        [Required]
        public string Title { get; set; } = string.Empty;
        [Required]
        public  decimal Amount { get; set; }
        [Required]
        public  DateTime Date { get; set; }
        public string? Category { get; set; } //= string.Empty;
        public string? Note { get; set; }
        public string? FilePath { get; set; }
    }

}
