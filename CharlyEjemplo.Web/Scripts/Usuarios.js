/*global  bbGrid, Backbone */

var Usuarios = {
    colUsuairo: [],
    gridUsuarios: null,

    inicia: function () {
        this.eventos();
        this.CargarGrid();

    },
    eventos: function () {
        
        $('#UsuarioNuevo').click(Usuarios.onNuevo);
        $(document).on('click', '#btn-GuardaNuevoUsuario', Usuarios.GuardarUsuario);

        $(document).on('click', '.accrowBorrar', function () {
            Usuarios.Borrar($(this).parent().parent().attr("data-modelId"));
        });
        
    },
    Borrar : function (id) {
        var url = contextPath + 'Usuario/Borrar';

        $.post(url, { idUsuario: id }, function (resultado) {

            if (resultado.status === true) {

                Usuarios.colUsuairo.remove(id);
                alert(resultado.mensaje);
            } else {
                console.log('Error ' + resultado.mensaje)
            }
        });
    },
    RedefinirValidaciones: function () {
        $('form').removeData("validator");
        $('form').removeData("unobtrusiveValidation");
        $.validator.unobtrusive.parse("form");
    },
    GuardarUsuario: function() {
        var url = contextPath + 'Usuario/Nuevo';
        $('#usuarioCreacion').val("1");
        dataForm = $('#NuevoUsuarioForm *').serialize();

        if ($('form').valid()) {
            
            

            $.post(url, dataForm, function (resultado) {
                if (resultado.status === true) {

                    Usuarios.colUsuairo.add(Usuarios.serializaUsuario(resultado.id, '#NuevoUsuarioForm'))

                    $('#winUsuarioNuevo').modal('hide');
                } else {
                    console.log('Error ' + resultado.mensaje)
                }
            });

        }
    },
    onNuevo: function () {
        var url = contextPath + 'Usuario/Nuevo';

        $.get(url, null, function (result) {
            
            $('#winUsuarioNuevo').html(result);

            $('#winUsuarioNuevo').modal({
                backdrop: 'static',
                keyboard: true
            }, 'show');

            Usuarios.RedefinirValidaciones();
        });

       
    },
    serializaUsuario: function (id) {
        return {
            id: id,
            Nombre: $('#Nombre').val(),
            Direccion: $('#Direccion').val(),
        };
    },
    CargarGrid: function () {
        var url = contextPath + 'Usuario/CargarUsuarios';
        $('.loading').show();

        $.post(url, null, function (response) {
            $('.loading').hide();

            if (response.Success === true) {
                Usuarios.colUsuairo = new Backbone.Collection(response.data);
                var bolFilter = Usuarios.colUsuairo.length > 0 ? true : false;
                if (bolFilter === true) {

                    Usuarios.gridUsuarios = new bbGrid.View({
                        container: $('.bbGrid-Usuario'),
                        rows: 200,
                        rowList: [15, 50, 200, 1000],
                        enableSearch: false,
                        actionenable: true,
                        detalle: false,
                        collection: Usuarios.colUsuairo,
                        colModel: [{ title: 'Id', name: 'id', width: '8%', sorttype: 'number', filter: true, filterType: 'input' },
                                   { title: 'Nombre', name: 'Nombre', filter: true, filterType: 'input', index: true },
                                   { title: 'Direccion', name: 'Direccion', filter: true }
                        ]
                    });
                }

            } else {
                CHR.DespliegaError(response.Messages);
            }
        }).fail(function () {
            $('.loading').html("<p>No se pudo cargar la informacion de los Usuarios</p>");
        });
    }
};

$(function() {
    Usuarios.inicia();
});
