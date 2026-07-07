// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TrazabilidadFruta {
    address public productor;
    address public transportista;
    address public aduana;

    enum EstadoFruta { Cosechada, En_Transito, En_Aduana, Aprobada_Exportacion, Rechazada }
    EstadoFruta public estadoActual;
    uint256 public temperaturaActual;
    
    event EstadoActualizado(EstadoFruta nuevoEstado, address responsable);
    event AlertaTemperatura(uint256 temperatura, string mensaje);

    constructor(address _transportista, address _aduana) {
        productor = msg.sender;
        transportista = _transportista;
        aduana = _aduana;
        estadoActual = EstadoFruta.Cosechada;
    }

    modifier soloTransportista() {
        require(msg.sender == transportista, "Solo el transportista autorizado");
        _;
    }

    modifier soloAduana() {
        require(msg.sender == aduana, "Solo la aduana autorizada");
        _;
    }

    function registrarTransito() public soloTransportista {
        require(estadoActual == EstadoFruta.Cosechada, "Estado invalido");
        estadoActual = EstadoFruta.En_Transito;
        emit EstadoActualizado(estadoActual, msg.sender);
    }

    // Ahora solo el transportista puede actualizar la temperatura
    function actualizarTemperatura(uint256 _nuevaTemperatura) public soloTransportista {
        temperaturaActual = _nuevaTemperatura;
        if (temperaturaActual > 5) {
            estadoActual = EstadoFruta.Rechazada;
            emit AlertaTemperatura(temperaturaActual, "Cadena de frio rota.");
        }
    }

    function entrarEnAduana() public soloTransportista {
        require(estadoActual == EstadoFruta.En_Transito, "No esta en transito");
        estadoActual = EstadoFruta.En_Aduana;
        emit EstadoActualizado(estadoActual, msg.sender);
    }

    function certificarAduana() public soloAduana {
        require(estadoActual == EstadoFruta.En_Aduana, "La fruta debe estar en aduana primero");
        require(temperaturaActual <= 5, "Problemas de temperatura");
        estadoActual = EstadoFruta.Aprobada_Exportacion;
        emit EstadoActualizado(estadoActual, msg.sender);
    }
}