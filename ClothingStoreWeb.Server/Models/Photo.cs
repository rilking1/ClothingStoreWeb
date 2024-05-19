namespace ClothingStoreWeb.Models
{
    public class Photo
    {
        public int Id { get; set; }

        public string? PhotoUrl { get; set; }

        public virtual ICollection<Products> Products { get; set; } = new List<Products>();//багато (сюди йде)

        public virtual ICollection<Client> Clients { get; set; } = new List<Client>();//багато (сюди йде)

    }
}
