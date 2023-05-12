import { Component, OnInit } from '@angular/core';
import { Usuario_Musico } from 'src/app/model/Usuario_Musico';
import { MatTableDataSource } from '@angular/material/table'
import { Usuario_MusicoService } from 'src/app/service/Usuario_Musico.service';
import { MatDialog } from '@angular/material/dialog'
import { UsuarioMusicoDialogoComponent } from './usuario-musico-dialogo/usuario-musico-dialogo.component';
import {MatPaginator} from '@angular/material/paginator';
import {AfterViewInit, ViewChild} from '@angular/core';
import { MatSort} from '@angular/material/sort';
import { Router} from '@angular/router';
@Component({
  selector: 'app-usuario-musico-listar',
  templateUrl: './usuario-musico-listar.component.html',
  styleUrls: ['./usuario-musico-listar.component.css']
})

export class UsuarioMusicoListarComponent implements OnInit {

  lista: Usuario_Musico[] = [];
  dataSource: MatTableDataSource<Usuario_Musico> = new MatTableDataSource();
  idMayor: number = 0;
  displayedColumns: string[] = ['codigo', 'nombre', 'correo', 'contrasena', 'telefono','acciones1','acciones2'];

  constructor(private aS: Usuario_MusicoService, private router:Router, private dialog: MatDialog) { }
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit(): void {
    if(this.paginator){
      this.dataSource.paginator = this.paginator;
      this.dataSource.paginator.length = this.lista.length;
    }
  }

  ngOnInit(): void {

    this.aS.list().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.lista = data;
      this.dataSource.paginator = this.paginator;
      this.dataSource.paginator.length = this.lista.length;
    })

    this.aS.getList().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.lista = data;
    })

    this.aS.getConfirmDelete().subscribe(data => {
      data == true ? this.eliminar(this.idMayor) : false;
    })

  }
  confirm(id: number) {
    this.idMayor = id;
    this.dialog.open(UsuarioMusicoDialogoComponent);
  }
  eliminar(id: number) {
    this.aS.delete(id).subscribe(() => {
      this.aS.list().subscribe(data => {
        this.aS.setList(data);
      })
    })
  }
  filter(e: any) {
    this.dataSource.filter = e.target.value.trim();
  }

}
