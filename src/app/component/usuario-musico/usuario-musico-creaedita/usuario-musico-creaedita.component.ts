import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Usuario_Musico } from 'src/app/model/Usuario_Musico';

import { Usuario_MusicoService } from 'src/app/service/Usuario_Musico.service';
import { ActivatedRoute, Params, Router } from '@angular/router'
@Component({
  selector: 'app-usuario-musico-creaedita',
  templateUrl: './usuario-musico-creaedita.component.html',
  styleUrls: ['./usuario-musico-creaedita.component.css']
})
export class UsuarioMusicoCreaeditaComponent implements OnInit {

  form: FormGroup = new FormGroup({});
  Usuario_Musico: Usuario_Musico = new Usuario_Musico();
  mensaje: string = "";
  id: number = 0;
  edicion: boolean = false;
  hide = true;

  constructor(private aS: Usuario_MusicoService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    })
    this.form = new FormGroup({
      id: new FormControl(),
      nombreCompleto: new FormControl(),
      correo: new FormControl(),
      contrasena: new FormControl(),
      telefono: new FormControl()
    });
  }
  aceptar(): void {
    this.Usuario_Musico.id = this.form.value['id'];
    this.Usuario_Musico.nombreCompleto = this.form.value['nombreCompleto'];
    this.Usuario_Musico.correo = this.form.value['correo'];
    this.Usuario_Musico.contrasena = this.form.value['contrasena'];
    this.Usuario_Musico.telefono = this.form.value['telefono'];
    if (this.form.value['nombreCompleto'].length > 0 &&
      this.form.value['correo'].length > 0) {

      if (this.edicion) {
        this.aS.update(this.Usuario_Musico).subscribe((data) => {
          this.aS.list().subscribe(data => {
            this.aS.setList(data);
          })
        })
      } else {
        this.aS.insert(this.Usuario_Musico).subscribe((data)=> {
          this.aS.list().subscribe(data => {
            this.aS.setList(data);
          })
        })
      }
      this.router.navigate(['Usuario_Musico']);
    } else {
      this.mensaje = "Complete los campos requeridos!!!";
    }
  }

  init() {
    if (this.edicion) {
      this.aS.listId(this.id).subscribe(data => {
        this.form = new FormGroup({
          id: new FormControl(data.id),
          nombreCompleto: new FormControl(data.nombreCompleto),
          correo: new FormControl(data.correo),
          contrasena: new FormControl(data.contrasena),
          telefono: new FormControl(data.telefono)
        })
      })
    }
  }
}
