import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import {Http} from '@angular/http';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

    form = {};                  //Informacion del formulario
    answer:any = '';            //Respuesta de la peticion
    //dateValue:any ;           //Fecha
    eventValue:any = '';        //Evento
    soValue:any = '';           //SO
    ttValue:any = '';           //TT
    edsValue:any = '';          //EDS
    technicalValue:any = '';    //Tecnico
    observationsValue:any = ''; //Observacion

    private nav:NavController = null;
    private http: Http = null;

    constructor(http: Http, nav: NavController) {
      this.http = http;
      this.nav = nav;
    }

    /**
    * Registro de actividad
    **/
    registerActivity()
    {
        let link = "http://localhost:8100/helper/sendmail/";  //envio de correos IA
        //let link = "http://dominustest.iapropiada.com/helper/sendmail/";  //envio de correos IA
        //Cuerpo del correo
        let parameters = {
                             view: 'emails.notifications.mobilealerts',
                             email: 'desarrollador4@iapropiada.com',
                             name: this.technicalValue,
                             subject: 'Evento en campo: '+this.eventValue+' a EDS - '+this.technicalValue,
                             data: {
                               so: this.soValue,
                               tt: this.ttValue,
                               technical: this.technicalValue,
                               observations: this.observationsValue,
                               date: new Date(),
                               event: this.eventValue,
                               alert: 'Notificiación de Campo',
                               eds: this.edsValue
                             }
                           };

        console.log(JSON.stringify(parameters));

        this.http.post(link, JSON.stringify(parameters))
        .subscribe(data => {
            console.log(JSON.stringify(parameters));
            console.log("resultado"+data["_body"]);

            //Respuesta enviada al home
            this.answer = data["_body"];

        }, error => {
          console.log("Error!!");
            console.log(JSON.stringify(error.json()));
        });
    }
}
