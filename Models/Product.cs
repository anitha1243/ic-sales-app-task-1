using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace IC_MVP_Project_Task1.Models
{
    public class Product
    {
        public int ID { get; set; }
        [Required(ErrorMessage = "Product Name is required")]
        public string Name { get; set; }
        [Required(ErrorMessage = "Product Price is required")]
        public int Price { get; set; }

        public virtual ICollection<Sale> Sales { get; set; }
    }
}