import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Usuario_Musico } from '../model/Usuario_Musico';
import { Subject } from 'rxjs';
const base_url = environment.base
@Injectable({
  providedIn: 'root'
})
export class Usuario_MusicoService {
  private url = `${base_url}/Usuario_Musico`
  private confirmarEliminacion = new Subject<Boolean>()
  private listaCambio = new Subject<Usuario_Musico[]>()

  constructor(private http: HttpClient) { }
  list() {
    return this.http.get<Usuario_Musico[]>(this.url);
  }
  insert(Usuario_Musico: Usuario_Musico) {
    return this.http.post(this.url, Usuario_Musico);
  }

  setList(listaNueva: Usuario_Musico[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable();
  }
  listId(id: number) {
    return this.http.get<Usuario_Musico>(`${this.url}/${id}`);
  }
  update(aut: Usuario_Musico) {
    return this.http.put(this.url + "/" + aut.id, aut);
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`)
  }

  getConfirmDelete(){
    return this.confirmarEliminacion.asObservable();
  }
  setConfirmDelete(estado:Boolean){
    this.confirmarEliminacion.next(estado);
  }
}
