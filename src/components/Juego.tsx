import React, { useState, useEffect } from "react";
import Swal from 'sweetalert2';
import "./Juego.css";

const elecciones = ["piedra", "papel", "tijera"];


const Juego = () => {
  const [nombreJugador, setNombreJugador] = useState("");
  const [eleccionJugador, setEleccionJugador] = useState("");
  const [eleccionPendiente, setEleccionPendiente] = useState("");
  const [eleccionOponente, setEleccionOponente] = useState("");
  const [resultado, setResultado] = useState("");
  const [iniciado, setIniciado] = useState(false);
  const [contador, setContador] = useState(3);

  const elegirNombreJugador = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNombreJugador(e.currentTarget.value);
  };

  const clickEleccion = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!nombreJugador) {
      Swal.fire({
        title: 'Error',
        text: 'Ingresa tu nombre antes de elegir una opción.',
        icon: 'error',
        confirmButtonText: 'OK',
        confirmButtonColor: '#5cb85c',
        backdrop: false,
      });
      return;
    }
    
    setEleccionPendiente(e.currentTarget.value);
    Swal.fire({
      title: `Has elegido ${e.currentTarget.value}`,
      text: 'Pulsa "Jugar" para continuar.',
      icon: 'success',
      confirmButtonText: 'Jugar',
      confirmButtonColor: '#5cb85c',
      backdrop: false,
    });
  };

  const jugar = () => {
    // Introducir el nombre y verificarlo junto a la eleccion
    if (!nombreJugador || !eleccionPendiente) {
      Swal.fire({
        title: 'Error',
        text: 'Ingresa tu nombre y elige una opción antes de jugar.',
        icon: 'error',
        confirmButtonText: 'OK',
        confirmButtonColor: '#5cb85c',
        backdrop: false,
      });
      return;
    }

    setIniciado(true);
    setContador(3); // establecer el contador en 3 segundos

    //Eleccion random del oponente
    const eleccionMaquina = elecciones[Math.floor(Math.random() * 3)];
    setEleccionOponente(eleccionMaquina);

    // Resultado
    let resultadoRonda;
    if (eleccionPendiente === eleccionMaquina) {
      resultadoRonda = "Empate";
    } else if (
      (eleccionPendiente === "piedra" && eleccionMaquina === "tijera") ||
      (eleccionPendiente === "papel" && eleccionMaquina === "piedra") ||
      (eleccionPendiente === "tijera" && eleccionMaquina === "papel")
    ) {
      resultadoRonda = "Ganaste";
    } else {
      resultadoRonda = "Perdiste";
    }

    // Actualiza el estado y reinicia la eleccion
    setResultado(
      `${nombreJugador}, elegiste ${eleccionPendiente}. El oponente eligió ${eleccionMaquina}.${resultadoRonda}.`
    );
    setEleccionJugador(eleccionPendiente);
    setEleccionPendiente("");
  };
  //Contador de 3 para conocer resultado
  useEffect(() => {
    if (contador === 0) {
      // Si el contador llega a cero, detener la cuenta
      return;
    }
  
    const intervalId = setInterval(() => {
      setContador((prevContador) => prevContador - 1);
    }, 1000);
  
    return () => clearInterval(intervalId);
  }, [contador]);

  return (
    <div className="container">
  
      <p className="mensaje">
        {nombreJugador
          ? eleccionJugador
            ? `${nombreJugador}, elegiste ${eleccionJugador}.`
            : `${nombreJugador}, elige una opción para empezar.`
          : "Ingresa tu nombre y elige una opción para empezar."}
      </p>
      <div className="opciones">
        <input type="text" placeholder="Ingresa tu nombre" onChange={elegirNombreJugador} className="nombre-input" />
        <div className="botones-container">
          <button value="piedra" onClick={clickEleccion} className="boton-piedra">Piedra</button>
          <button value="papel" onClick={clickEleccion} className="boton-papel">Papel</button>
          <button value="tijera" onClick={clickEleccion} className="boton-tijera">Tijera</button>
        </div>
        {iniciado && <div className="contador">{contador}</div>}
        <br />
        <button onClick={jugar} className="boton-jugar">Jugar</button>
      </div>
      <div className={`resultado ${contador > 0 ? "oculto" : ""}`}>
        {resultado && (
          <table>
            <thead>
              <tr>
                <th>{nombreJugador}</th>
                <th>Oponente</th>
                <th>Resultado</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{eleccionJugador}</td>
                <td>{eleccionOponente}</td>
                <td>{resultado}</td>
              </tr>
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
  
  
};

export default Juego;
