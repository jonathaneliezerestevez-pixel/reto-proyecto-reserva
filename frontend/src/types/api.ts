export type EstadoPedido = 'Disponible' | 'Cancelado'

export interface Administrador {
  Identificador: number
  Usuario: string
}

export interface LoginResponse {
  token: string
  administrador: Administrador
}

export interface Reserva {
  Identificador: number
  NombreCliente: string
  NumeroCliente: string
  EstadoPedido: EstadoPedido
  NumeroMesa: number
  FechaReserva: string
}

export interface ReservaInput {
  NombreCliente: string
  NumeroCliente: string
  EstadoPedido: EstadoPedido
  NumeroMesa: number
  FechaReserva?: string
}

export interface ApiErrorBody {
  error?: string
  details?: unknown
}

export interface Restaurante {
  Identificador: number
  Nombre: string
  Descripcion: string | null
  TipoComida: string | null
  Direccion: string | null
  Zona: string | null
  Telefono: string | null
  TelefonoReservas: string | null
  Correo: string | null
  HorarioAtencion: string | null
  RedesSociales: Record<string, string>
  SitioWeb: string | null
  LogoUrl: string | null
  FotografiasReferencia: string[]
  RangoPrecios: string | null
  PlatosPrincipales: string | null
  EsDemo: boolean
}
