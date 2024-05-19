namespace ClothingStoreWeb.Models
{
    public class Category
    {
        public int Id { get; set; }

        public string? CategoryName { get; set; }

        public virtual ICollection<Products> Products { get; set; } = new List<Products>();//багато (сюди йде)
    }
}
