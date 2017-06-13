/*global $, CHR, Inicio, contextPath, bootbox, moment*/
var CHR = {
    inicial: function () {

    },
    eventos: function () {


    },
    menuPrincipal: function () {
        if ($('#divSideBar').is(":visible") === true) {
            $('#divSideBar').hide();
            $('#page-wrapper').attr('style', 'margin: 0 0 0 0;');
        } else {
            $('#divSideBar').show();
            $('#page-wrapper').attr('style', 'margin: 0 0 0 250px;');
        }
    },
    onAcercaDe: function () {
        //bootbox.alert("<h4>Grupo CHARLY</h4> <h6>Derechos reservados</h6>", function () { });
        var htmlMessage = "<h4>Grupo CHARLY</h4>";
        htmlMessage += "<h5>Todos los derechos reservados <i class='fa fa-copyright'></i> " + moment().format('YYYY') + "</h5>";
        htmlMessage += "<div class='text-center'><div class='btn-group'><a href='http://www.youtube.com/channel/UCW5u5GFyYIhnbrhtzfa1EBQ' target='_blank' class='btn btn-default'><i class='fa fa-youtube'></i></a>";
        htmlMessage += "<a href='http://www.facebook.com/TenisCharly' target='_blank' class='btn btn-default'><i class='fa fa-facebook'></i></a>";
        htmlMessage += "<a href='http://twitter.com/tenischarly' target='_blank' class='btn btn-default'><i class='fa fa-twitter-square'></i></a>";
        htmlMessage += "<a href='http://www.pinterest.com/tenischarly/' target='_blank' class='btn btn-default'><i class='fa fa-pinterest'></i></a>";
        htmlMessage += "</div></div>";
        htmlMessage += "<div class='text-center'><h6><a href='http://www.charly.com.mx' target='_blank'>www.charly.com.mx</a></h6></div>";

        bootbox.alert({
            message: htmlMessage,
            size: 'small'
        });
    },
    CargaSideBar: function () {
        if (localStorage.idUser === '' || localStorage.idUser === undefined) return;
        var urlEventos = contextPath + "Principal/_sideBar?id=" + localStorage.idUser + "&lang=" + localStorage.lang;
        $.post(urlEventos, function (data) {
            if (data.substring(0, 5) === '<!DOC') return;
            $('#divSideBar').html(data);
            $('#side-menu').metisMenu();
            CHR.SeleccionaOpcionMenu();
        });
    },
    ReiniciaLocalStorage: function (pUsuario, pNombre) {
        localStorage.setItem("idUser", pUsuario);
        localStorage.setItem("UserName", pNombre);
    },
    SeleccionaOpcionMenu: function () {
        var url = window.location;
        var element = $('ul.nav a').filter(function () {
            return this.href === url || url.href.indexOf(this.href) === 0;
        }).addClass('active').parent().parent().addClass('in').parent();
        if (element.is('li')) {
            element.addClass('active');
        }
        return (element);
    },
    setPermisos: function (datos) {
        localStorage.modPermisos = datos;
        var item = document.getElementById('Permisos');
        if (item !== null) {
            localStorage.modSerdad = item.textContent;
        } else {
            localStorage.modSerdad = '00';
        }
    },
    ValidaFecha: function (pDate) {
        //yyyy-mm-dd
        var reg = /^\d{4}-((0\d)|(1[012]))-(([012]\d)|3[01])$/;
        return reg.test(pDate);
    },
    ValidaCorreo: function (pCorreo) {
        //name@domain.com
        var reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
        return reg.test(pCorreo);
    },
    toFixed: function (num, fixed) {
        fixed = fixed || 0;
        fixed = Math.pow(10, fixed);
        return Math.floor(num * fixed) / fixed;
    },
    RedefinirValidaciones: function () {
        $("form").removeData("validator");
        $("form").removeData("unobtrusiveValidation");
        $.validator.unobtrusive.parse("form");
    },
    CierraMensajes: function () {
        $(".clientAlert").html('');
        $(".clientAlertDlg").html('');
    },
    DespliegaError: function (error) {
        $(".clientAlert").html("<div class='alert alert-danger'>" +
                                "<button type='button' class='close' data-dismiss='alert'>x</button>" +
                                  error + "</div>");
        $("html, body").animate({ scrollTop: 0 }, '500', 'swing');
        $('#cargandoInfo').hide();
    },
    DespliegaInformacion: function (msg) {
        $(".clientAlert").html("<div class='alert alert-info'>" +
                                "<button type='button' class='close' data-dismiss='alert'>x</button>" +
                                  msg + "</div>");
        $("html, body").animate({ scrollTop: 0 }, '500', 'swing');
        $('#cargandoInfo').hide();
    },
    DespliegaErrorDialogo: function (error) {
        $(".clientAlertDlg").html("<div id='divMessage' class='alert alert-danger'>" +
                               "<button type='button' class='close' data-dismiss='alert'>x</button>" +
                                 error + "</div>");
        $("html, body").animate({ scrollTop: 0 }, '500', 'swing');
        $('#cargandoInfo').hide();
    },
    DespliegaInformacionDialogo: function (msg) {
        $(".clientAlertDlg").html("<div id='divMessage' class='alert alert-info'>" +
                               "<button type='button' class='close' data-dismiss='alert'>x</button>" +
                                 msg + "</div>");
        $("html, body").animate({ scrollTop: 0 }, '500', 'swing');
        $('#cargandoInfo').hide();
    },
    DespliegaWarning: function (msg) {
        $(".clientAlert").html("<div class='alert alert-warning'>" +
                                "<button type='button' class='close' data-dismiss='alert'>x</button>" +
                                  msg + "</div>");
        $("html, body").animate({ scrollTop: 0 }, '500', 'swing');
        $('#cargandoInfo').hide();
    },
    MuestraFechaActual: function () {
        return moment().format('D/M/YYYY');
    },
    botonMensaje: function (agregar, boton, nombre) {
        if (agregar === true) {
            $(boton).attr("disabled", "disabled");
            $(boton).html("<span class='glyphicon glyphicon-refresh glyphicon-refresh-animate'></span> " + nombre);
        } else {
            $(boton).html(nombre);
            $(boton).removeAttr("disabled");
        }
    },
    botonMensajeIcono: function (agregar, boton, nombre, icono) {
        if (agregar === true) {
            $(boton).attr("disabled", "disabled");
            $(boton).html("<span class='glyphicon glyphicon-refresh glyphicon-refresh-animate'></span> " + nombre);
        } else {
            $(boton).html("<i class='fa " + icono + "'></i> " + nombre);
            $(boton).removeAttr("disabled");
        }
    },
    ReadAllProjects: function (e) {
        e.preventDefault();
        $('.readAllLi').hide();
        $('.hiddenLi').show();
        $(document).on('click', '#menuProyectos', function (e) {
            e.stopPropagation();
        });
    }
}