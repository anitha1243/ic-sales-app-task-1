using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace IC_MVP_Project_Task1.Models
{
    public class Customer
    {
        public int ID { get; set; }

        [Required(ErrorMessage = "Customer Name is required")]
        public string Name { get; set; }
        [Required(ErrorMessage = "Customer Address is required")]
        public string Address { get; set; }

        public virtual ICollection<Sale> Sales { get; set; }
    }
}