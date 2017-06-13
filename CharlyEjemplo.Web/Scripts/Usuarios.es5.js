/*global  bbGrid, Backbone */

'use strict';

var Usuarios = {
    colUsuairo: [],
    gridUsuarios: null,

    inicia: function inicia() {
        this.CargarGrid();
    },
    eventos: function eventos() {
        $('#nuevo').click(Usuario.onNuevo);
    },
    onNuevo: function onNuevo() {
        alert('Nuevo');
    },
    CargarGrid: function CargarGrid() {
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
                        colModel: [{ title: 'Id', name: 'id', width: '8%', sorttype: 'number', filter: true, filterType: 'input' }, { title: 'Nombre', name: 'Nombre', filter: true, filterType: 'input', index: true }, { title: 'Direccion', name: 'Direccion', filter: true }]
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

$(function () {
    Usuarios.inicia();
});

