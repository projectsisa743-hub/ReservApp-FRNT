import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // <--- Necesario para el HTML
import { Api } from '../../services/api';

@Component({
  selector: 'app-mis-reservas',
  standalone: true,
  imports: [CommonModule], // <--- Importante agregarlo aquí
  templateUrl: './mis-reservas.html',
  styleUrl: './mis-reservas.css' // Asegúrate que este archivo exista, si no bórralo de aquí
})
export class MisReservas implements OnInit { // <--- Agrega "implements OnInit"
  reservas: any[] = [];
  cargando: boolean = true; // <--- ¡AQUÍ ESTABA EL ERROR! Faltaba declararla

  constructor(private api: Api) {}

  ngOnInit() {
    this.api.getMisReservasCliente().subscribe({
      next: (data: any) => {
        this.reservas = data;
        this.cargando = false; // Ahora sí funcionará
      },
      error: (err) => {
        console.error(err);
        this.cargando = false;
      }
    });
  }

  // Método auxiliar para los colores de las etiquetas
  getEstadoClass(estado: string) {
    switch (estado) {
      case 'Confirmada': return 'badge-success text-white';
      case 'Rechazada': return 'badge-error text-white';
      default: return 'badge-warning';
    }
  }
}