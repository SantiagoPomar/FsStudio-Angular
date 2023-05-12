import { Component, OnInit } from '@angular/core';
import { Usuario_MusicoService } from 'src/app/service/Usuario_Musico.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-usuario-musico-dialogo',
  templateUrl: './usuario-musico-dialogo.component.html',
  styleUrls: ['./usuario-musico-dialogo.component.css']
})
export class UsuarioMusicoDialogoComponent implements OnInit {

  constructor(private aS: Usuario_MusicoService,
    private dialogRef: MatDialogRef<UsuarioMusicoDialogoComponent>) { }
  ngOnInit(): void {}
    confirmar(estado: boolean){
      this.aS.setConfirmDelete(estado);
      this.dialogRef.close();
    }

}
