import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Api {
  // Asegúrate de que este puerto coincida con tu Backend (dotnet run)
  readonly baseUrl = 'http://localhost:5160/api';

  constructor(private http: HttpClient) { }

  // ==========================================
  // 1. AUTENTICACIÓN
  // ==========================================
  login(loginData: any) {
    return this.http.post(`${this.baseUrl}/auth/login`, loginData);
  }

  registroUsuario(data: any) {
    return this.http.post(`${this.baseUrl}/auth/registro-usuario`, data);
  }

  registroRestaurante(data: any) {
    return this.http.post(`${this.baseUrl}/auth/registro-restaurante`, data);
  }

  // ==========================================
  // 2. SUPER ADMIN
  // ==========================================
  getSolicitudesRegistro() {
    return this.http.get<any[]>(`${this.baseUrl}/admin/solicitudes`);
  }

  aprobarRestaurante(id: number) {
    return this.http.put(`${this.baseUrl}/admin/aprobar/${id}`, {});
  }

  getRestaurantesActivos() {
    return this.http.get<any[]>(`${this.baseUrl}/admin/activos`);
  }

  pausarRestaurante(id: number) {
    return this.http.put(`${this.baseUrl}/admin/pausar/${id}`, {});
  }

  eliminarRestaurante(id: number) {
    return this.http.delete(`${this.baseUrl}/admin/eliminar/${id}`);
  }

  // ==========================================
  // 3. PANEL RESTAURANTE (DUEÑO)
  // ==========================================
  
  // Perfil
  getMiPerfilRestaurante() {
    return this.http.get<any>(`${this.baseUrl}/restaurant/mi-perfil`);
  }

  actualizarPerfilRestaurante(data: any) {
    return this.http.put(`${this.baseUrl}/restaurant/actualizar-perfil`, data);
  }

  // Mesas
  getMisMesas() {
    return this.http.get<any[]>(`${this.baseUrl}/restaurant/mesas`);
  }

  crearMesa(data: any) {
    return this.http.post(`${this.baseUrl}/restaurant/mesas`, data);
  }

  eliminarMesa(id: number) {
    return this.http.delete(`${this.baseUrl}/restaurant/mesas/${id}`);
  }

  // Reservas Recibidas
  getReservasDelRestaurante() {
    return this.http.get<any[]>(`${this.baseUrl}/restaurant/mis-reservas`);
  }

  gestionarReserva(data: { reservaId: number, aprobada: boolean, mesaId?: number | null }) {
    return this.http.put(`${this.baseUrl}/restaurant/gestionar-reserva`, data);
  }

  // ==========================================
  // 4. CLIENTE (USUARIO)
  // ==========================================
  
  // Listado público para elegir dónde comer
  getRestaurantesPublicos() {
    return this.http.get<any[]>(`${this.baseUrl}/restaurant/publicos`);
  }

  crearReserva(data: { restauranteId: number, fechaHora: string, numeroPersonas: number }) {
    return this.http.post(`${this.baseUrl}/user/reservar`, data);
  }

  getMisReservasCliente() {
    return this.http.get<any[]>(`${this.baseUrl}/user/mis-reservas`);
  }
}