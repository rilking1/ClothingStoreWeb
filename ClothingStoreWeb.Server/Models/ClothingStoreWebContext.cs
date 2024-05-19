using Microsoft.EntityFrameworkCore;

namespace ClothingStoreWeb.Models
{
    public class ClothingStoreWebContext : DbContext
    {
        public ClothingStoreWebContext(DbContextOptions<ClothingStoreWebContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Category> Category { get; set; }
        public virtual DbSet<Client> Client { get; set; }
        public virtual DbSet<Color> Color { get; set; }
        public virtual DbSet<Material> Material { get; set; }
        public virtual DbSet<Orders> Orders { get; set; }
        public virtual DbSet<Photo> Photo { get; set; }
        public virtual DbSet<Products> Products { get; set; }
        public virtual DbSet<Size> Size { get; set; }
    }
}
