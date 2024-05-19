namespace ClothingStoreWeb.Models
{
    public class Orders
    {
        public int Id { get; set; }

        public int? CustomerId { get; set; }

        public int? ProductId { get; set; }

        public int? Costs { get; set; }

        public int? Quantity { get; set; }

        public string? Status { get; set; }

        public virtual Products? Products { get; set; }//один (звідси приходить)
        
        public virtual Client? Client { get; set; }//один (звідси приходить)

    }
}
