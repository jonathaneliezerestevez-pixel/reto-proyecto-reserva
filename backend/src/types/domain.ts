export type EstadoPedido = 'Disponible' | 'Cancelado'

export interface Administrador {
  Identificador: number
  Usuario: string
  Contrasena: string
}

export interface Reserva {
  Identificador: number
  RestauranteId?: number | null
  NombreCliente: string
  NumeroCliente: string
  EstadoPedido: EstadoPedido
  NumeroMesa: number
  FechaReserva: Date | string
}
