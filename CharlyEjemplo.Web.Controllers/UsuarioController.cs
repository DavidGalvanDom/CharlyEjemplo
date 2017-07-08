using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Mvc;

using CharlyEjemplo.Web.Model;
using CharlyEjemplo.Web.Data;

namespace CharlyEjemplo.Web.Controllers
{
   public class UsuarioController: Controller
    {
        dbCharlyNew db = new dbCharlyNew();

        [HttpGet]
        public ActionResult Index( )
        {
            return View();
        }


        [HttpPost]
        public JsonResult CargarUsuarios()
        {
            try
            {

                var lstUsuarios = (from usu in db.Usuarios
                                   select new
                                   {
                                       id = usu.idUsuario,
                                       Nombre = usu.nombresUsuario + " " +  usu.apellidosUsuario,
                                       Direccion = usu.emailUsuario
                                   }).ToList();
             
                return Json(new { Success = true, data = lstUsuarios });

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

        [HttpGet]
        public PartialViewResult Nuevo()
        {
            var usuario = new Usuario();
            ViewBag.Titulo = " Nuevo ";

            return PartialView("_NuevoUsuario", usuario);
        }

        [HttpPost]
        public JsonResult Borrar (int? idUsuario)
        {
            if(idUsuario != null)
            {
                var usuario = db.Usuarios.FirstOrDefault(usr => usr.idUsuario == idUsuario);

                db.Usuarios.Remove(usuario);
                db.SaveChanges();

                return Json(new { status = true, mensaje = "El usuario fue borrado." });
            }
            else
            {
                return Json(new { status = false, mensaje = " Usuario invalido." });
            }
        }

        [HttpPost]
        public JsonResult Nuevo(Usuario user)
        {
            if(ModelState.IsValid)
            {
                var idUsuario = "0";

                var nuevoUsuario = new Usuarios();

                nuevoUsuario.nombresUsuario = user.Nombre;
                nuevoUsuario.idRol = 1;
                nuevoUsuario.idEstatus = 1;
                nuevoUsuario.emailUsuario = user.Direccion;

                db.Usuarios.Add(nuevoUsuario);
                db.SaveChanges();
                idUsuario = nuevoUsuario.idUsuario.ToString();

                return Json(new { status = true, id = idUsuario });
            }
            else 
            {
                return Json(new { status = false, mensaje = " Los datos del modelo no son validos." });
            }
    }


    }
}
