namespace ClothingStoreWeb.Models
{
    public class Client
    {
        public int Id { get; set; }

        public int? ClientPhotoId { get; set; }

        public string? FirstName { get; set; }

        public string? LastName { get; set; }

        public virtual Photo? Photo { get; set; }//один (звідси приходить)

    }
}
