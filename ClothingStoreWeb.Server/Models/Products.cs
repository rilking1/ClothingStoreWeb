namespace ClothingStoreWeb.Models
{
    public class Products
    {
        public int Id { get; set; }

        public string? ProductName { get; set; }

        public string? Description { get; set; }

        public int? CategoryId { get; set; }

        public int? Price { get; set; }

        public int? SizeId { get; set; }

        public int? ColorId { get; set; }

        public int? MaterialId { get; set; }

        public int? PhotoId { get; set; }

        public string? ProductQuantity { get; set; }

        public virtual Photo? Photo { get; set; }//один (звідси приходить)

        public virtual ICollection<Orders> Orders { get; set; } = new List<Orders>();//багато (сюди йде)

        public virtual Category? Category { get; set; }//один (звідси приходить)

        public virtual Material? Material { get; set; }//один (звідси приходить)

        public virtual Color? Color { get; set; }//один (звідси приходить)

        public virtual Size? Size { get; set; }//один (звідси приходить)

    }
}
