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
