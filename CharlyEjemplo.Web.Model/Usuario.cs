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
        
        public int id { get; set; }

        [Required]
        [MaxLength(50)]
        public string Nombre { get; set; }

        [Required]
        [MaxLength(200)]
        public string Direccion { get; set; }

        [Required]
        public string usuarioCreacion { get; set; }

    }
}
