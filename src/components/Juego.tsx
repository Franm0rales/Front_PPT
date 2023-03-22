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
  const [partidas, setPartidas] = useState([
    {
      nombreJugador: '',
      eleccionJugador: '',
      eleccionOponente: '',
      resultado: ''
    }
  ]);

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
    let resultadoRonda: string;
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


    
    //llamada a la api y Actualiza el estado y reinicia la eleccion

    const data = {
      nombreJugador: nombreJugador,
      eleccionJugador: eleccionPendiente,
      eleccionOponente: eleccionMaquina,
      resultado: resultadoRonda,
    };
    
    const apiUrl = 'http://localhost:3030/partidas';
    
    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Error en la llamada Fetch');
    })
    .then(data => {
      // Actualiza el estado y reinicia la eleccion
      setResultado(
        `${nombreJugador}, elegiste ${eleccionPendiente}. El oponente eligió ${eleccionMaquina}.${resultadoRonda}.`
      );
      setEleccionJugador(eleccionPendiente);
      setEleccionPendiente("");
    
      console.log(data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }    
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

  //Llamada a la api para el historico
  useEffect(() => {
    const intervalId = setInterval(() => {
      fetch('http://localhost:3030/historico')
        .then(response => response.json())
        .then(data => setPartidas(data));
    }, 3000); // Realiza la solicitud cada 5 segundos
  
    return () => clearInterval(intervalId); // Limpia el intervalo al desmontar el componente
  }, []);
 

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
     
      
      <div className="historico-container">
      <h1>Historico 10 últimas partidas:</h1>
      <ul className="historico-list">
        {partidas.map(partida => (
          <li className="historico-item" >
            <div className="historico-item-header">
              <div><b>Jugador:</b> {partida.nombreJugador}</div>
              <div><b>Elección jugador:</b> {partida.eleccionJugador}</div>
              <div><b>Elección oponente:</b> {partida.eleccionOponente}</div>
              <div><b>Resultado:</b> {partida.resultado}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
    </div>
   
  );
  
  
};

export default Juego;
