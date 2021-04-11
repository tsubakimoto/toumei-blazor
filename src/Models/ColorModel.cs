using System.ComponentModel.DataAnnotations;

namespace toumei.Models
{
    public class ColorModel
    {
        [Required]
        [StringLength(6)]
        public string Color { get; set; }
    }
}