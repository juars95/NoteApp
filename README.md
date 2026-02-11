📝 Mis Notas: Un Proyecto Fullstack con Corazón

¡Hola! 👋 Bienvenido a mi proyecto de gestión de notas. Esta aplicación nació como un desafío técnico para una entrevista, ahora aprovecho como parte de mis practicas en  **React + NestJS**.

He diseñado esta SPA pensando en la limpieza visual y en una arquitectura de código que permita crecer sin dolores de cabeza. Aquí no solo guardas texto; organizas tus ideas.


## 🚀 Estado del Despliegue

Para que puedas probarla ahora mismo, he dividido el proyecto en dos partes:

* **🌍 Frontend (Live):** Puedes ver la interfaz funcionando en vivo a través de **Netlify**. Está lista para que navegues por sus menús y veas el diseño.
* **⚙️ Backend & DB (Local):** Por ahora, el back y la base de datos (PostgreSQL) están configurados para correr localmente. Esto asegura que los datos sean privados y que el rendimiento sea óptimo mientras preparo el despliegue final del servidor.

---

## 🛠️ ¿Qué hay bajo el capó?

Este proyecto utiliza tecnologías modernas y robustas:

* **Frontend:** React con **Vite** para una velocidad increíble y **Tailwind CSS** para un diseño responsivo y minimalista.
* **Backend:** **NestJS**, aprovechando su estructura de módulos, controladores y servicios para mantener el código organizado.
* **Base de Datos:** **PostgreSQL** gestionado a través de **TypeORM**, lo que me permitió manejar relaciones complejas de forma sencilla.
* **Contenedores:** **Docker** para que la base de datos se levante en segundos sin configurar nada en tu PC.

---
## 💻 Instrucciones para ejecución local

Si quieres ver el sistema completo (con el backend funcionando), solo necesitas tener **Docker** y **Node.js** instalados. Sigue estos pasos:

1.  Clona el repositorio.
2.  En la raíz, dale permisos a mi script de automatización:
    `chmod +x run.sh`
3.  Ejecuta el comando mágico:
    `./run.sh`

Este script se encarga de levantar el contenedor de la base de datos, instalar las dependencias de ambas carpetas e iniciar los servidores por ti.

---

## 🧠 ¿Por qué este proyecto?

Elegí este stack porque me apasiona la **arquitectura por capas** y las metodologías **Agile**. Me permitió aplicar conceptos de **Git** avanzado, manejo de tipos en **TypeScript** y diseño de APIs RESTful que son fáciles de entender para otros desarrolladores.

---

> **Nota:** Este proyecto está en constante evolución. Mi próximo paso es migrar el backend a la nube para que la experiencia sea 100% online. ¡Gracias por pasarte!
