# Sistema de Trazabilidad Inmutable para la Cadena de Frío

Este repositorio contiene el desarrollo de una Aplicación Descentralizada (DApp) diseñada para optimizar la trazabilidad y el control térmico en la exportación de productos perecederos. El proyecto ha sido desarrollado como parte de la Evaluación Final Transversal (EFT) para la asignatura Fundamentos de Blockchain (BCY0010) en Duoc UC.

La solución aborda la crisis de confianza institucional en la logística tradicional, eliminando la posibilidad de manipulación de registros históricos mediante el uso de contratos inteligentes y la arquitectura distribuida de Blockchain.

## Estructura del Proyecto

El repositorio está organizado en dos componentes principales:

* **backend/**: Contiene el contrato inteligente desarrollado en Solidity (`TrazabilidadFruta.sol`) que implementa la lógica de negocio, el control de acceso y la máquina de estados del lote de carga.
* **frontend/**: Contiene la interfaz gráfica de usuario desarrollada con estándares web nativos (`index.html`, `style.css`, `app.js`) para interactuar con la lógica del contrato de forma asíncrona y simular el comportamiento de un Oráculo de temperatura.

## Características Principales

1.  **Registro Inmutable de Estados**: El contrato inteligente rastrea el ciclo de vida del cargamento a través de estados estrictos (Creado, En Tránsito, Completado, Rechazado), impidiendo alteraciones fraudulentas en el historial.
2.  **Validación de Identidad por Criptografía Asimétrica**: Simulación del flujo de firmas digitales donde cada operario debe autorizar sus acciones mediante una clave pública (billetera digital).
3.  **Puente de Datos mediante Oráculo**: Implementación de un Oráculo intermedio para conectar la telemetría del mundo físico (sensores IoT de temperatura) con el entorno cerrado y determinista de la blockchain.
4.  **Resolución Autónoma de Disputas**: El contrato evalúa de forma automática los quiebres de la cadena de frío; si la temperatura supera los límites tolerables, el sistema cambia el estado a "Rechazado" y bloquea el flujo comercial de forma irreversible.

## Tecnologías Utilizadas

* **Solidity**: Lenguaje de programación orientado a contratos para el desarrollo del Backend.
* **Remix IDE**: Entorno de desarrollo integrado utilizado para la compilación, pruebas unitarias y despliegue en la Remix VM.
* **JavaScript (ES6+)**: Lógica asíncrona del lado del cliente para simular la arquitectura Web3 y la inyección de datos del Oráculo.
* **HTML5 y CSS3**: Diseño de la interfaz gráfica responsiva y cuadros de control visual.

## Instrucciones de Uso y Despliegue

### 1. Backend (Contrato Inteligente)
1. Copiar el contenido de `backend/TrazabilidadFruta.sol`.
2. Acceder a [Remix IDE](https://remix-ethereum.org).
3. Crear un nuevo archivo llamado `TrazabilidadFruta.sol` y pegar el código.
4. En el panel "Solidity Compiler", compilar el archivo usando la versión correspondiente de Solidity.
5. En el panel "Deploy & Run Transactions", seleccionar el entorno "Remix VM" y presionar "Deploy" para instanciar el contrato.

### 2. Frontend (Interfaz de Usuario)
1. Asegurarse de mantener la estructura de la carpeta `frontend/`.
2. Abrir la carpeta del proyecto en Visual Studio Code.
3. Iniciar el archivo `index.html` utilizando la extensión **Live Server** o el visor de **Live Preview** para levantar el servidor local (usualmente en `http://127.0.0.1:5500`).
4. Interactuar con los controles de la interfaz para simular el ciclo de vida del lote y activar el flujo de alerta del Oráculo ante contingencias térmicas.

## Información Académica

* **Institución**: Duoc UC
* **Escuela**: Informática y Telecomunicaciones
* **Asignatura**: Fundamentos de Blockchain (BCY0010)
* **Integrantes**:
  * Benjamín Díaz
  * Benjamín Ramírez
  * César Faundez
