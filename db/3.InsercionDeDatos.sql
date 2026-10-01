INSERT INTO Administrador (Identificador, Usuario, Contrasena)
VALUES (1, 'sabinofc', '$2b$08$gzEXerJjAQjb9qUnlTItAOdH63HaYmGLSDXHuL5n1jAEC1fFeyo9W');

INSERT INTO Restaurante
    (Identificador, Nombre, Descripcion, TipoComida, Direccion, Zona,
     Telefono, TelefonoReservas, Correo, HorarioAtencion, RedesSociales,
     SitioWeb, LogoUrl, FotografiasReferencia, RangoPrecios, PlatosPrincipales, EsDemo)
VALUES
    (1,
     'La Casa del Camba',
     'Restaurante especializado en sabores cambas y culinaria criolla. Atiende desde 1986.',
     'Comida típica camba, comida criolla oriental y carnes a la parrilla',
     'Avenida Cristóbal de Mendoza #1365',
     '2do Anillo Norte, entre calles Beni y Alemana',
     '3 342-7864',
     '760-03875',
     'eventos@casadelcamba.com',
     'Lunes a domingo, de 11:00 a 23:00',
     '{"facebook": "https://www.facebook.com/CasaDelCamba/", "instagram": "https://www.instagram.com/casadelcamba/"}'::jsonb,
     'https://www.casadelcamba.com/',
     NULL,
     '[]'::jsonb,
     NULL,
     'Picadas; Carnes silvestres; Comidas típicas; Buffet de comidas criollas; Carnes a la parrilla; Carne de cerdo; Parrilladas; Ensaladas; Postres',
     TRUE);

INSERT INTO Reserva
    (Identificador, RestauranteId, NombreCliente, NumeroCliente, EstadoPedido, NumeroMesa, FechaReserva)
VALUES
    (1, 1, 'Ana Martinez', '5512345678', 'Disponible', 1, '2026-10-01 12:00:00'),
    (2, 1, 'Carlos Hernandez', '5587654321', 'Cancelado', 2, '2026-10-01 13:30:00'),
    (3, 1, 'Laura Gonzalez', '5545678901', 'Disponible', 3, '2026-10-02 14:00:00'),
    (4, 1, 'Miguel Ramirez', '5523456789', 'Disponible', 4, '2026-10-02 15:30:00'),
    (5, 1, 'Sofia Torres', '5598765432', 'Cancelado', 5, '2026-10-03 16:00:00'),
    (6, 1, 'Diego Flores', '5534567890', 'Disponible', 6, '2026-10-03 18:30:00'),
    (7, 1, 'Valeria Cruz', '5576543210', 'Cancelado', 7, '2026-10-04 19:00:00'),
    (8, 1, 'Jorge Morales', '5511223344', 'Disponible', 8, '2026-10-04 20:30:00'),
    (9, 1, 'Elena Vargas', '5566778899', 'Disponible', 9, '2026-10-05 21:00:00'),
    (10, 1, 'Roberto Sanchez', '5599887766', 'Cancelado', 10, '2026-10-05 21:30:00');
