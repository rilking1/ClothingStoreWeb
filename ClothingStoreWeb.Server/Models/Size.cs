namespace ClothingStoreWeb.Models
{
    public class Size
    {
        public int Id { get; set; }

        public string? SizeName { get; set; }

        public virtual ICollection<Products> Products { get; set; } = new List<Products>();//багато (сюди йде)
    }
}
