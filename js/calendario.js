 /**
  * FUNCION QUE GENERA EL CALENDARIO
  * @param {String} tipo [Si es editable o no]]
  */
 function cargar_calendario(tipo) {     
     $('#calendar').fullCalendar({
         dayClick: function (date, jsEvent, view) {
             if(tipo == 'editar'){
               abrir_popup_guardar_programacion(date.format());  
             }             
             //$(this).css('background-color', 'red');
         },
         eventClick: function (calEvent, jsEvent, view) {
             if(tipo == 'editar'){
             abrir_popup_guardar_programacion('', calEvent);
             }
         },
         eventMouseover: function (calEvent, jsEvent, view) {
             $("#programacion_informacion_evento").text("Descripción: " + calEvent.descripcion);
             $("#programacion_informacion_start").text("Fecha de incio: " + new Date(calEvent.start));
             var anual;
             var allDay;
             if(calEvent.anual){
                 anual = "Si";
             } else{
                 $("#programacion_informacion_end").text("Fecha fin: " + new Date(calEvent.end));
                 anual = "No";
             }
             if(calEvent.allDay){
                 allDay = "Si";
             } else{
                 $("#programacion_informacion_hora_inicio").text("Hora de incio del evento: " + calEvent.hora_inicio);
                 $("#programacion_informacion_hora_final").text("Hora fin del evento: " + calEvent.hora_final);
                 allDay = "No";
             }
             
             $("#programacion_informacion_anual").text("Evento todo el año: " + anual);
             $("#programacion_informacion_allDay").text("Evento todo el día: " + allDay);
         },
         eventMouseout: function (calEvent, jsEvent, view) {
             //document.elementFromPoint(0, 0).click();
             $("#programacion_informacion_evento").text('');
             $("#programacion_informacion_start").text('');
             $("#programacion_informacion_end").text('');
             $("#programacion_informacion_hora_inicio").text('');
             $("#programacion_informacion_hora_final").text('');
             $("#programacion_informacion_anual").text('');
             $("#programacion_informacion_allDay").text('');
         },
         header: {
             left: 'prev,next today',
             center: 'title',
             right: 'month,agendaWeek,agendaDay'
         },
         defaultDate: '2015-02-12',
         editable: false,
         eventLimit: false, // allow "more" link when too many events
         lang: 'es',
         events: calendarData,
         loading: function (bool) {
                 $('#loading').toggle(bool);
             }
             /*
				url: 'php/get-events.php',
				error: function() {
					$('#script-warning').show();
				}
                */
     });
     $('#calendar').fullCalendar('today');

 }

 /**
  * ABRE EL POPUP PARA GUARDAR LA NUEVA PROGRAMACIÓN
  * @param {[[Type]]} data   [[Description]]
  * @param {Object}   evento [[Description]]
  */
 function abrir_popup_guardar_programacion(data, evento) {
     var id_evento = '';
     var boton = 'Publicar!';
     if (evento != undefined) {
         var id_evento = evento.id_externo;
         nueva_programacion.id_externo = evento.id_externo;
         boton = 'Modificar!';
     } else{
         nueva_programacion.id_externo = '';
     }
     var html =
         /*'<div class="alert alert-info" role="alert">Programación del evento</div>' +*/
         '<div class="panel panel-success">' +
         '<div class="panel-heading">' +
         '<h3 class="panel-title">Selecciona un rango de fechas</h3>' +
         '</div>' +
         '<div class="panel-body">' +
         '<div class="row">' +
         '<div class="col-lg-5">' +
         '<label style="padding-right:45px">Día de inicio: </label>' +
         '<div class="input-group date" id="datetimepicker1">' +
         '<input type="text" class="form-control"/>' +
         '<span class="input-group-addon">' +
         '<span class="glyphicon glyphicon-calendar"></span>' +
         '</span>' +
         '</div>' +
         '</div>' +
         '<div class="col-lg-5">' +
         '<label style="padding-right:80px">Dia de fin: </label>' +
         '<div style="padding-right:5px" class="input-group date" id="datetimepicker2">' +
         '<input type="text" class="form-control" />' +
         '<span class="input-group-addon">' +
         '<span class="glyphicon glyphicon-calendar"></span>' +
         '</span>' +
         '</div>' +
         '</div>' +
         '<div class="col-lg-2">' +
         '<span>Sin limite</span>' +
         '<input id="check_popup_programacion_fecha" type="checkbox">' +
         '</div>' +
         '</div>' +
         '</div>' +
         '</div>' +
         '<div class="panel panel-success">' +
         '<div class="panel-heading">' +
         '<h3 class="panel-title">Seleccionar un horario de emisión</h3>' +
         '</div>' +
         '<div class="panel-body">' +
         '<div class="row">' +
         '<div class="col-lg-5">' +
         '<label style="padding-right:40px">Hora de inicio: </label>' +
         '<div style="padding-right:20px" class="input-group date" id="datetimepicker3">' +
         '<input type="text" class="form-control" />' +
         '<span class="input-group-addon">' +
         '<span class="glyphicon glyphicon-calendar"></span>' +
         '</span>' +
         '</div>' +
         '</div>' +
         '<div class="col-lg-5">' +
         '<label style="padding-right:70px">Hora de fin: </label>' +
         '<div style="padding-right:5px" class="input-group date" id="datetimepicker4">' +
         '<input type="text" class="form-control" />' +
         '<span class="input-group-addon">' +
         '<span class="glyphicon glyphicon-calendar"></span>' +
         '</span>' +
         '</div>' +
         '</div>' +
         '<div class="col-lg-2">' +
         '<span>Todo el día</span>' +
         '<input id="check_popup_programacion_horario" type="checkbox" value="remember-me">' +
         '</div>' +
         '</div>' +
         '</div>' +
         '</div>' +
         '</div>' +
         '<div class="row">'+
         '<div class="col-lg-4">'+
         '<label style="float:left; margin:5px">Nombre:</label><br>'+
         '<label style="float:left; margin:5px">Descripción:</label>'+
         '</div>' +
         '<div class="col-lg-7">'+
         '<input style="float:left; margin:5px" type="text" id="in_popup_programacion" placeholder="Nombre del evento"/><br>' +
         '<textarea style="float:left; margin:5px" type="text" id="txt_popup_programacion" placeholder="Descripción del evento"></textarea>' +     
         '</div>' +
         '<div class="col-lg-1">'+
         '<a style="float:right" id="btn_popup_programacion" onclick="deleteProgramacion(' + id_evento + ')" type="button" class="btn btn-danger btn-md">' +
         '<i class="glyphicon glyphicon-trash"></i>' +
         '</a>' +    
         '</div>' +         
         '</div>' +
         '<label style="display:none; color:red; margin-top:10px" id="sp_popup_programacion">Compruebe los datos!</label>';
     swal({
         html: html,
         showCancelButton: true,
         confirmButtonColor: '#3085d6',
         cancelButtonColor: '#d33',
         cancelButtonText: 'Cancelar',
         confirmButtonText: boton,
         closeOnConfirm: false,
         allowOutsideClick: false
     }, function () {
         if ($('#datetimepicker1').data("date") != undefined &&
             ($('#datetimepicker2').data("date") != undefined || $('#check_popup_programacion_fecha').is(":checked")) && (($('#datetimepicker3').data("date") != undefined && $('#datetimepicker4').data("date") != undefined) || $('#check_popup_programacion_horario').is(":checked")) && $("#in_popup_programacion").val() != "" && $("#txt_popup_programacion").val() != "") {

             var dinicio = $('#datetimepicker1').data("date");
             var dfinal = $('#datetimepicker2').data("date");
             var hinicio = $('#datetimepicker3').data("date");
             var hfinal = $('#datetimepicker4').data("date");
             var titulo = $("#in_popup_programacion").val();
             var descripcion = $("#txt_popup_programacion").val();
             nueva_programacion.title = titulo;
             nueva_programacion.descripcion = descripcion;
             nueva_programacion.start = dinicio;
             nueva_programacion.id = calendarData.length;
             $('#check_popup_programacion_fecha').is(":checked")
             if ($('#check_popup_programacion_fecha').is(":checked")) {
                 nueva_programacion.end = '2099-12-31';
                 nueva_programacion.anual = true;
             } else {
                 nueva_programacion.end = dfinal;
                 nueva_programacion.anual = false;
             }
             if ($('#check_popup_programacion_horario').is(":checked")) {
                 nueva_programacion.hora_inicio = '00:00:00';
                 nueva_programacion.hora_final = '00:00:00';
                 nueva_programacion.allDay = true;
             } else {
                 nueva_programacion.hora_inicio = hinicio;
                 nueva_programacion.hora_final = hfinal;
                 nueva_programacion.allDay = false;
             }
             //calendarData.push(nueva_programacion);
             postProgramacion(nueva_programacion.id_externo);
             swal("Guardado!",
                 "Se ha guardado su programación.",
                 "success");
             console.log(JSON.stringify(nueva_programacion));
             
             //calendarData.push(nueva_programacion);
             
             console.log("Plantilla " + titulo + " De " + dinicio + " a " + dfinal + " con horario de " + hinicio + " a " + hfinal);

             //postPlantilla($("#in_popup_guardar").val(), $("#txt_popup_guardar").val(), multimedia_seleccionada);
         } else {
             $("#sp_popup_programacion").show();
         }
        
     });
     
     // CARGAMOS FUNCIONALIDADES DEL POPUP DE GUARDAR PROGRAMACION
     $(function () {
         $('#datetimepicker1').datetimepicker({
             format: 'YYYY-MM-DD'
         });
         $('#datetimepicker2').datetimepicker({
             format: 'YYYY-MM-DD',
         });
         $('#datetimepicker3').datetimepicker({
             //format: 'LT'
             format: 'h:mm:ss'
         });
         $('#datetimepicker4').datetimepicker({
             //format: 'LT'
             format: 'h:mm:ss'
         });

         if (evento != undefined) {
             console.log(evento);
             $('#datetimepicker1').data("DateTimePicker").date(evento.start);
             $('#datetimepicker2').data("DateTimePicker").date(evento.end);
             $('#datetimepicker3').data("DateTimePicker").date(evento.hora_inicio);
             $('#datetimepicker4').data("DateTimePicker").date(evento.hora_final);
             $("#in_popup_programacion").val(evento.title);
             $("#btn_popup_programacion").show();
             if (evento.anual) {
                 setTimeout(function () {
                     $("#check_popup_programacion_fecha").click();
                 }, 100);
             }
             if (evento.allDay) {
                 setTimeout(function () {
                     $("#check_popup_programacion_horario").click();
                 }, 100);
             }

         } else {
             $('#datetimepicker1').data("DateTimePicker").date(data);
             $('#datetimepicker2').data("DateTimePicker").minDate(data);
             $("#btn_popup_programacion").hide();
         }

         $('#check_popup_programacion_fecha').change(function () {
             if ($(this).is(":checked")) {
                 $('#datetimepicker2 input').prop("disabled", true);
             } else {
                 $('#datetimepicker2 input').prop("disabled", false);
             }
         });
         $('#check_popup_programacion_horario').change(function () {
             if ($(this).is(":checked")) {
                 $('#datetimepicker3 input').prop("disabled", true);
                 $('#datetimepicker4 input').prop("disabled", true);
             } else {
                 $('#datetimepicker3 input').prop("disabled", false);
                 $('#datetimepicker4 input').prop("disabled", false);
             }
         });
     });
 }

 /**
  * BORRA LA PROGRAMACIÓN SELECCIONADA
  * @param {Number} id [Id de la programación que se va a eliminar]
  */
 function borrar_programacion(id) {
     console.log("borra");
     var alert = document.querySelector(".sweet-alert"),
         okButton = alert.getElementsByTagName("button")[1];
     $(okButton).trigger("click");
     setTimeout(function () {

         swal("borra esta " + id)
     }, 500);
 }

 // Asi se accede a la info $('#calendar').fullCalendar('clientEvents');