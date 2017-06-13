using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;



namespace CharlyEjemplo.Web.Model
{
    public class Usuario
    {
        [Required]
        public int id { get; set; }

        [MaxLength(50)]
        public string Nombre { get; set; }

        [MaxLength(200)]
        public string Direccion { get; set; }
    }
}
