﻿using System;
using Domain;                               // <Value>
using Microsoft.EntityFrameworkCore;        // DbContext (queries databases based on entities)

namespace Persistence
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }
        public DbSet<Value> Values { get; set; }
        // public DbSet<Pinga> Pinga { get; set; }

        // Seed the database with initial values
        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<Value>()
                .HasData(
                    new Value { Id = 1, Name = "Value 101" },
                    new Value { Id = 2, Name = "Value 102" },
                    new Value { Id = 3, Name = "Value 103" }
                );
        }
    }
}