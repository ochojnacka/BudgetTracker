using BudgetTracker.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace BudgetTracker.Data
{
    public class AppDbContext : DbContext
    {
        public DbSet<Expense> Expenses { get; set; }

        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }
    }

}
