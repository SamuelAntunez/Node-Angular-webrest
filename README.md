# Guía de Autenticación y Arquitectura del Proyecto

Este README sirve como una guía detallada sobre cómo está construida la lógica de autenticación en este proyecto, explicando cada componente y el flujo de los datos.

## Arquitectura del Proyecto

El proyecto sigue una arquitectura por capas para mantener el código organizado y escalable:

1.  **Presentation (Presentación):** Capa encargada de recibir las peticiones HTTP (Express). Aquí se encuentran las Rutas, Controladores y Middlewares.
2.  **Domain (Dominio):** Contiene las reglas de negocio, DTOs (Data Transfer Objects) para validación y Entidades que representan los datos dentro de nuestra lógica.
3.  **Data (Datos):** Capa que interactúa directamente con la base de datos (MongoDB en este caso a través de Mongoose).
4.  **Infrastructure/Config (Infraestructura):** Adaptadores para herramientas de terceros como Bcrypt para encriptar y JWT para tokens.

---

## Flujo de Autenticación (Login)

Cuando un usuario intenta hacer login, el proceso sigue estos pasos:

1.  **Petición HTTP:** El cliente envía una petición POST a `/api/auth/login` con el email y password.
2.  **Rutas (`routes.ts`):** Recibe la petición y la deriva al método correspondiente del controlador.
3.  **Controlador (`controller.ts`):** 
    *   Toma la información del `body`.
    *   Utiliza un **DTO** para validar que los datos sean correctos (que el email sea válido, que el password exista).
    *   Si todo está bien, llama al **Service**.
4.  **Service (`auth.services.ts`):**
    *   Busca al usuario en la base de datos usando el **Model**.
    *   Compara la contraseña recibida con la encriptada en la DB usando un adaptador de **Bcrypt**.
    *   Si coinciden, genera un **JWT (JSON Web Token)**.
    *   Retorna la información del usuario (limpia, sin password) y el token.
5.  **Respuesta:** El controlador envía la respuesta final al cliente.

---

## Explicación Detallada de Archivos (Carpeta `auth`)

### 1. `routes.ts` - El mapa de entrada
Aquí definimos los "endpoints". Lo más importante es la **Inyección de Dependencias**:
- Creamos una instancia del `EmailService`.
- Se la pasamos al `AuthService`.
- El `AuthService` se le pasa al `AuthController`.
Esto permite que cada clase tenga lo que necesita para funcionar.

### 2. `controller.ts` - El director de orquesta
Su trabajo es recibir la petición (`req`) y enviar la respuesta (`res`). 
- **Validation:** Usa el DTO para asegurar que no falten datos.
- **Delegation:** No sabe *cómo* se valida un usuario, solo le pide al servicio que lo haga.
- **Handling Errors:** Tiene un método `handleError` centralizado para responder con el código de estado correcto (400, 401, 500, etc.) basándose en errores personalizados (`CustomError`).

### 3. `auth.services.ts` - El cerebro (Lógica de Negocio)
Aquí es donde ocurre la magia real:
- **`registerUser`:** Verifica si el email ya existe, encripta el password, guarda en DB y envía email de validación.
- **`loginUser`:** Verifica credenciales y genera el token de acceso.
- **`validateEmail`:** Cambia el estado del usuario cuando hace clic en el enlace de su correo.

### 4. `login-user.dto.ts` (en `src/domain/dtos/auth`)
DTO significa **Data Transfer Object**. Su única misión es validar que la información que llega del cliente (del mundo exterior) cumpla con nuestros requisitos antes de que toque nuestra lógica de base de datos.
- Si falta el email, lanza un error inmediatamente.
- Si el formato es incorrecto, lo detiene ahí mismo.

### 5. `user.entity.ts` (en `src/domain/entities`)
La Entidad es nuestra representación ideal de un usuario. Mientras que el Modelo de Mongoose tiene muchas propiedades internas de la base de datos (como `_id`, `__v`), la Entidad solo tiene lo que nosotros queremos usar en nuestra aplicación. 
- Tiene un método `fromObject` que convierte un objeto de la DB a una Entidad limpia.

---

## Herramientas Clave

-   **Bcrypt (`bcrypt.adapter.ts`):** Nunca guardamos contraseñas en texto plano. Las "hasheamos" para que, aunque la base de datos sea comprometida, las contraseñas no se puedan leer.
-   **JWT (`jwt.adapter.ts`):** Generamos un "badge" o ficha digital que el usuario nos enviará en cada petición futura para demostrar quién es sin tener que enviarnos su login cada vez.
-   **Email Service (`email.service.ts`):** Se encarga de la conexión con servidores de correo (como Gmail) para enviar verificaciones.

---

Este esquema se repite para otras funcionalidades como **Categories** o **Products**, manteniendo siempre la misma coherencia y orden.