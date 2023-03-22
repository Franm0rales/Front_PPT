import React, { useState } from "react";
import { IonIcon } from "@ionic/react";
import {document} from "ionicons/icons"
import "./Juego.css";

const elecciones = ["piedra", "papel", "tijeras"];

const Juego = () => {
  const [nombreJugador, setNombreJugador] = useState("");
  const [eleccionJugador, setEleccionJugador] = useState("");
  const [eleccionOponente, setEleccionOponente] = useState("");
  const [resultado, setResultado] = useState("");

  const manejarNombreJugador = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNombreJugador(e.currentTarget.value);
  };

  const manejarClicEleccion = (e: React.MouseEvent<HTMLButtonElement>) => {
    setEleccionJugador(e.currentTarget.value);
  };

  const jugar = () => {
    // Verificar si el jugador ingresó su nombre y eligió una opción antes de jugar
    if (!nombreJugador || !eleccionJugador) {
      alert("Ingresa tu nombre y elige una opción antes de jugar.");
      return;
    }
  
    // Generar la elección aleatoria del oponente
    const eleccionMaquina = elecciones[Math.floor(Math.random() * 3)];
    setEleccionOponente(eleccionMaquina);
  
    // Determinar el resultado de la ronda
    let resultadoRonda;
    if (eleccionJugador === eleccionMaquina) {
      resultadoRonda = "Empate";
    } else if (
      (eleccionJugador === "piedra" && eleccionMaquina === "tijeras") ||
      (eleccionJugador === "papel" && eleccionMaquina === "piedra") ||
      (eleccionJugador === "tijeras" && eleccionMaquina === "papel")
    ) {
      resultadoRonda = "Ganaste";
    } else {
      resultadoRonda = "Perdiste";
    }
  
    // Actualizar el estado del resultado y reiniciar la elección del jugador
    setResultado(
      `Elegiste ${eleccionJugador}. El oponente eligió ${eleccionMaquina}. ${resultadoRonda}.`
    );
   
  };

  return (
    <div className="juego-container">
      <p>Ingresa tu nombre:</p>
      <input type="text" value={nombreJugador} onChange={manejarNombreJugador} />
      <p>Elige tu jugada:</p>
      <div className="elecciones-container">
        <button className="btn-eleccion" onClick={manejarClicEleccion} value="piedra">
          Piedra
        </button>
        <button className="btn-eleccion" onClick={manejarClicEleccion} value="papel">
          Papel
        </button>
        <button className="btn-eleccion" onClick={manejarClicEleccion} value="tijeras">
          Tijeras
        </button>
      </div>

      <button className="btn-jugar" onClick={jugar}>Jugar</button>
      {eleccionOponente && (
        <div className="resultado-container">
          <p>Tu elegiste: {eleccionJugador}</p>
          <p>El oponente eligió: {eleccionOponente}</p>
          <p>{resultado}</p>
        </div>
      )}
    </div>
  );
};

export default Juego;
