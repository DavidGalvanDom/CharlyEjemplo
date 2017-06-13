using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Mvc;

using CharlyEjemplo.Web.Model;

namespace CharlyEjemplo.Web.Controllers
{
   public class UsuarioController: Controller
    {
        [HttpGet]
        public ActionResult Index( )
        {
            return View();
        }


        [HttpPost]
        public JsonResult CargarUsuarios()
        {
            var lstUsuario = new List<Usuario>();
            try
            {
                lstUsuario.Add(new Usuario()
                {
                    id = 1,
                    Nombre = "Jose",
                    Direccion = "Lomas 155"
                });
                lstUsuario.Add(
                new Usuario()
                {
                    id = 2,
                    Nombre = "Pepe",
                    Direccion = "Lomas 155"
                });

                return Json(new { Success = true, data = lstUsuario });

            } catch(Exception exp)
            {
                return Json(new { Success = false, Messages = exp.Message });
            }


           
        }

        [HttpPost]
        public ActionResult Index(int idUsuario)
        {
            return View();
        }


    }
}
