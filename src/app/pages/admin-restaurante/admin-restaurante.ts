import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Api } from '../../services/api';

@Component({
  selector: 'app-admin-restaurante',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-restaurante.html',
})
export class AdminRestaurante implements OnInit {
  tabActual: string = 'reservas'; // 'reservas' | 'mesas' | 'perfil'
  
  // Datos
  perfil: any = {};
  mesas: any[] = [];
  reservas: any[] = [];

  // Formulario Mesa Nueva
  nuevaMesa = { numeroMesa: '', capacidad: 2 };

  constructor(private api: Api) {}

  ngOnInit() {
    this.cargarTodo();
  }

  cargarTodo() {
    this.api.getMiPerfilRestaurante().subscribe(data => this.perfil = data);
    this.api.getMisMesas().subscribe(data => this.mesas = data);
    this.api.getReservasDelRestaurante().subscribe(data => this.reservas = data);
  }

  // --- Lógica de Perfil ---
  guardarPerfil() {
    this.api.actualizarPerfilRestaurante(this.perfil).subscribe({
      next: () => alert('Perfil actualizado correctamente'),
      error: () => alert('Error al actualizar')
    });
  }
// archivo temporal
test() {
  console.log("dummy1")
  console.log("dummy2")
  console.log("dummy3")
  console.log("dummy4")
  console.log("dummy5")
    console.log("dummy1")
  console.log("dummy2")
  console.log("dummy3")
  console.log("dummy4")
  console.log("dummy5")
    console.log("dummy1")
  console.log("dummy2")
  console.log("dummy3")
  console.log("dummy4")
  console.log("dummy5")
    console.log("dummy1")
  console.log("dummy2")
  console.log("dummy3")
  console.log("dummy4")
  console.log("dummy5")
    console.log("dummy1")
  console.log("dummy2")
  console.log("dummy3")
  console.log("dummy4")
  console.log("dummy5")
    console.log("dummy1")
  console.log("dummy2")
  console.log("dummy3")
  console.log("dummy4")
  console.log("dummy5")
    console.log("dummy1")
  console.log("dummy2")
  console.log("dummy3")
  console.log("dummy4")
  console.log("dummy5")
    console.log("dummy1")
  console.log("dummy2")
  console.log("dummy3")
  console.log("dummy4")
  console.log("dummy5")
    console.log("dummy1")
  console.log("dummy2")
  console.log("dummy3")
  console.log("dummy4")
  console.log("dummy5")
}
  // --- Lógica de Mesas ---
  agregarMesa() {
    if (!this.nuevaMesa.numeroMesa) return;
    
    this.api.crearMesa(this.nuevaMesa).subscribe({
      next: () => {
        this.cargarTodo(); // Recargar lista
        this.nuevaMesa = { numeroMesa: '', capacidad: 2 }; // Limpiar
      },
      error: () => alert('Error al crear mesa')
    });
  }

  borrarMesa(id: number) {
    if(!confirm('¿Eliminar mesa?')) return;
    this.api.eliminarMesa(id).subscribe(() => this.cargarTodo());
  }

  // --- Lógica de Reservas (Algoritmo) ---
  responderReserva(id: number, aprobar: boolean) {
    // Enviamos mesaId: null para que el Backend use su algoritmo "Best Fit"
    const payload = { reservaId: id, aprobada: aprobar, mesaId: null };

    this.api.gestionarReserva(payload).subscribe({
      next: (res: any) => {
        alert(res.mensaje); // Mostrará "Reserva confirmada en mesa X"
        this.cargarTodo();
      },
      error: (err) => alert('Error: ' + err.error)
    });
  }
}
