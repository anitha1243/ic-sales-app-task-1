using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Diagnostics;
using System.Linq;
using System.Web;
using System.Web.UI.WebControls;

namespace IC_MVP_Project_Task1.Models
{
    public class Sale
    {
        public int ID { get; set; }
        [Required(ErrorMessage = "CustomerID is required")]
        public int CustomerID { get; set; }
        [Required(ErrorMessage = "StoreID is required")]
        public int StoreID { get; set; }
        [Required(ErrorMessage = "ProductID is required")]
        public int ProductID { get; set; }
        [Required(ErrorMessage = "DateSold is required")]
        public DateTime DateSold { get; set; }

        public virtual Customer Customer { get; set; }

        public virtual Store Store { get; set; }

        public virtual Product Product { get; set; }
    }
}