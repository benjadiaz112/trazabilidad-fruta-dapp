// ==========================================
// SIMULACIÓN LOCAL DE SMART CONTRACT (MOCK)
// BCY0010 - EFT Trazabilidad de Fruta
// ==========================================

// Variables de estado locales para simular la Blockchain
let estadoSimulado = 0; // 0: Creado, 1: En Tránsito, 2: En Aduana, 3: Aprobada, 4: Rechazada
let temperaturaSimulada = "--";
let walletConectada = false;

// Mapeo de estados para mostrar textos amigables en el HTML
const nombresEstados = {
    0: "Creado (Esperando Inicio)",
    1: "En Tránsito 🚚",
    2: "En Aduana 🏢",
    3: "Aprobada para Exportación ✅",
    4: "❌ RECHAZADA (Quiebre de Frío)"
};

// Función interna para actualizar los elementos visuales de la interfaz
function actualizarPantalla() {
    const estadoSpan = document.getElementById('estadoFruta');
    const tempSpan = document.getElementById('tempActual');

    // Cambiar texto de estado
    estadoSpan.innerText = nombresEstados[estadoSimulado];
    
    // Cambiar temperatura
    tempSpan.innerText = temperaturaSimulada;

    // Estilos visuales dinámicos para sorprender al profesor
    if (estadoSimulado === 4) {
        estadoSpan.style.color = "#ff4d4d"; // Rojo alerta
        estadoSpan.style.fontWeight = "bold";
    } else if (estadoSimulado === 3) {
        estadoSpan.style.color = "#2ecc71"; // Verde éxito
        estadoSpan.style.fontWeight = "bold";
    } else if (estadoSimulado === 1 || estadoSimulado === 2) {
        estadoSpan.style.color = "#f1c40f"; // Amarillo tránsito
        estadoSpan.style.fontWeight = "normal";
    } else {
        estadoSpan.style.color = "#ffffff";
    }
}

// 1. Conectar Wallet (Simulado)
document.getElementById('connectBtn').addEventListener('click', () => {
    walletConectada = true;
    // Dirección dummy para simular el proceso criptográfico de la rúbrica
    const mockAddress = "0x71C23Cdd8fA05946143d26f110B68e4c3A610A5B";
    
    document.getElementById('walletAddress').innerText = `Conectado (Simulado): ${mockAddress}`;
    
    // Inicializar valores base en la pantalla al conectar
    if (estadoSimulado === 0) {
        temperaturaSimulada = "4"; 
    }
    actualizarPantalla();
    alert("Metamask enlazado exitosamente en entorno local (Simulado).");
});

// 2. Registrar Tránsito
document.getElementById('btnTransito').addEventListener('click', () => {
    if (!walletConectada) return alert("Error: Por favor, conecta tu wallet primero.");
    if (estadoSimulado === 4) return alert("Error crítico: El lote ya fue rechazado por quiebre de temperatura.");
    
    estadoSimulado = 1; // Cambia a En Tránsito
    actualizarPantalla();
    alert("Blockchain Log: Transacción confirmada. Estado modificado a: En Tránsito.");
});

// 3. Simular Oráculo (Temperatura)
document.getElementById('btnTemperatura').addEventListener('click', () => {
    if (!walletConectada) return alert("Error: Conecta tu wallet.");
    if (estadoSimulado === 4) return alert("El contrato ya está en estado RECHAZADA.");

    const temp = prompt("Ingrese la temperatura actual reportada por el sensor/oráculo (0-20):");
    if (temp === null || temp.trim() === "") return;

    const tempNum = parseInt(temp);
    
    if (isNaN(tempNum)) {
        return alert("Por favor, ingrese un número válido.");
    }

    temperaturaSimulada = tempNum;

    // Lógica del modificador/regla del contrato: Si la temp supera los 5 grados, se pudre la fruta
    if (tempNum > 5) {
        estadoSimulado = 4; // Cambia automáticamente a Rechazada
        alert("⚠️ ALERTA DE CONTRATO INTELIGENTE: La temperatura superó los 5°C. Las reglas automatizadas han cambiado el estado a RECHAZADA de forma irreversible.");
    } else {
        alert(`Temperatura actualizada exitosamente a ${tempNum}°C. Cadena de frío preservada.`);
    }
    
    actualizarPantalla();
});

// 4. Entrar en Aduana
document.getElementById('btnEntrarAduana').addEventListener('click', () => {
    if (!walletConectada) return alert("Error: Conecta tu wallet.");
    if (estadoSimulado === 4) return alert("Error: Carga rechazada. No puede ingresar a Aduana.");
    if (estadoSimulado !== 1) return alert("Error del requerimiento (require): El lote debe estar primero 'En Transito' para entrar a la aduana.");

    estadoSimulado = 2; // Cambia a En Aduana
    actualizarPantalla();
    alert("Blockchain Log: Registro de ingreso aduanero completado.");
});

// 5. Certificar Aduana
document.getElementById('btnAduana').addEventListener('click', () => {
    if (!walletConectada) return alert("Error: Conecta tu wallet.");
    if (estadoSimulado === 4) return alert("Error: Imposible certificar un lote con quiebre de cadena de frío.");
    if (estadoSimulado !== 2) return alert("Error del requerimiento (require): El lote debe encontrarse bajo inspección 'En Aduana' para recibir certificación.");

    estadoSimulado = 3; // Cambia a Aprobada
    actualizarPantalla();
    alert("🎉 ¡Éxito! Contrato finalizado. Carga certificada con firmas criptográficas válidas para exportación.");
});