import { Component, OnInit } from '@angular/core';
import { Api } from '../../services/api';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard-home',
  standalone: true, // <--- Importante en Angular moderno
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard-home.html',
  styleUrl: './dashboard-home.css', // O .scss si usas sass
})
export class DashboardHome implements OnInit {
  restaurantes: any[] = [];
  restaurantesFiltrados: any[] = []; // Para la búsqueda

  // Variables para la Búsqueda
  searchQuery: string = '';
  mensajeIA: string = '';
  estaBuscando: boolean = false;

  // Variables para controlar el formulario
  restauranteSeleccionado: any = null;
  reservaData = {
    numeroPersonas: 2, // <--- Faltaba esto
    fecha: '',
    hora: ''
  };

  constructor(private api: Api) {}

  ngOnInit() {
    this.cargarTodos();
  }

  cargarTodos() {
    // CORRECCIÓN 1: Usar el nombre correcto del servicio
    this.api.getRestaurantesPublicos().subscribe((data: any) => {
      this.restaurantes = data;
      this.restaurantesFiltrados = data;
    });
  }

  realizarBusqueda() {
    if (!this.searchQuery.trim()) {
      this.mensajeIA = '';
      this.restaurantesFiltrados = this.restaurantes;
      return;
    }

    this.estaBuscando = true;
    
    // CORRECCIÓN 2: Simular búsqueda localmente (porque no hay endpoint de IA)
    setTimeout(() => {
      const query = this.searchQuery.toLowerCase();
      this.restaurantesFiltrados = this.restaurantes.filter(r => 
        r.nombre.toLowerCase().includes(query) || 
        r.direccion?.toLowerCase().includes(query)
      );
      
      this.estaBuscando = false;

      if (this.restaurantesFiltrados.length > 0) {
        this.mensajeIA = `¡Entendido! Aquí tienes opciones para "${this.searchQuery}" 🤖`;
      } else {
        this.mensajeIA = `Ups, no encontré nada específico para "${this.searchQuery}".`;
      }
    }, 800); 
  }

  abrirModal(restaurante: any) {
    this.restauranteSeleccionado = restaurante;
    this.reservaData = { numeroPersonas: 2, fecha: '', hora: '' };
    
    const modal = document.getElementById('modal_reserva') as HTMLDialogElement;
    if (modal) modal.showModal();
  }

  confirmarReserva() {
    if (!this.reservaData.fecha || !this.reservaData.hora) {
      alert('Por favor completa fecha y hora');
      return;
    }

    // CORRECCIÓN 3: Ajustar el payload a lo que pide el Backend (.NET)
    // Backend espera: { restauranteId, fechaHora, numeroPersonas }
    // No enviamos nombreCliente porque el Backend lo saca del Token
    const payload = {
      restauranteId: this.restauranteSeleccionado.id,
      fechaHora: `${this.reservaData.fecha}T${this.reservaData.hora}:00`,
      numeroPersonas: this.reservaData.numeroPersonas
    };

    this.api.crearReserva(payload).subscribe({
      next: () => {
        alert(`¡Solicitud enviada a ${this.restauranteSeleccionado.nombre}!`);
        const modal = document.getElementById('modal_reserva') as HTMLDialogElement;
        if (modal) modal.close();
      },
      error: (err: any) => alert('Error: ' + (err.error?.mensaje || 'Error al reservar'))
    });
  }
}