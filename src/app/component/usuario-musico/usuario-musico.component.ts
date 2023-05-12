import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-usuario-musico',
  templateUrl: './usuario-musico.component.html',
  styleUrls: ['./usuario-musico.component.css']
})
export class UsuarioMusicoComponent implements OnInit {

  constructor(public route:ActivatedRoute) {

  }
  ngOnInit(): void {

  }

}
