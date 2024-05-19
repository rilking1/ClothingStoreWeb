namespace ClothingStoreWeb.Models
{
    public class Material
    {
        public int Id { get; set; }

        public string? MaterialName { get; set; }

        public virtual ICollection<Products> Products { get; set; } = new List<Products>();//багато (сюди йде)
    }
}
