-- Crear previamente la base de datos con: CREATE DATABASE reservadb;

CREATE TABLE Restaurante (
    Identificador INTEGER,
    Nombre VARCHAR(150),
    Descripcion TEXT,
    TipoComida VARCHAR(255),
    Direccion VARCHAR(255),
    Zona VARCHAR(150),
    Telefono VARCHAR(25),
    TelefonoReservas VARCHAR(25),
    Correo VARCHAR(150),
    HorarioAtencion VARCHAR(255),
    RedesSociales JSONB,
    SitioWeb VARCHAR(500),
    LogoUrl VARCHAR(500),
    FotografiasReferencia JSONB,
    RangoPrecios VARCHAR(100),
    PlatosPrincipales TEXT,
    EsDemo BOOLEAN
);

CREATE TABLE Administrador (
    Identificador INTEGER,
    Usuario VARCHAR(255),
    Contrasena VARCHAR(255)
);

CREATE TABLE Reserva (
    Identificador INTEGER,
    RestauranteId INTEGER,
    NombreCliente VARCHAR(255),
    NumeroCliente VARCHAR(50),
    EstadoPedido VARCHAR(50),
    NumeroMesa INTEGER,
    FechaReserva TIMESTAMP
);
