import React, { useState } from 'react';

const Comentarios = () => {
    const [comentarios, setComentarios] = useState([]);
    const [nuevoComentario, setNuevoComentario] = useState('');
    const comentariosOrdenados = [...comentarios].sort((a, b) => b.votos - a.votos);

    const votarPositivo = (id) => {
        const comentariosActualizados = comentarios.map(comentario => {
          if (comentario.id === id) {
            return { ...comentario, votos: comentario.votos + 1 };
          }
          return comentario;
        });
        setComentarios(comentariosActualizados);
      };
      
      const votarNegativo = (id) => {
        const comentariosActualizados = comentarios.map(comentario => {
          if (comentario.id === id && comentario.votos > 0) { // Evita votos negativos menores que 0
            return { ...comentario, votos: comentario.votos - 1 };
          }
          return comentario;
        });
        setComentarios(comentariosActualizados);
      };
    
    const enviarComentario = () => {
        const nuevoComentarioObj = {
          id: Date.now(),
          texto: nuevoComentario,
          votos: 0,
        };
        setComentarios([...comentarios, nuevoComentarioObj]);
        setNuevoComentario('');
      };

      return (
        <div className="comentarios-container">
          <h2>Comentarios</h2>
          {comentariosOrdenados.map((comentario) => (
            <div key={comentario.id} className="comentario">
              <div className="texto-comentario">{comentario.texto}</div>
              <div className="votos">
                <button className="voto-btn" onClick={() => votarPositivo(comentario.id)}>↑</button>
                <span>{comentario.votos}</span>
                <button className="voto-btn" onClick={() => votarNegativo(comentario.id)}>↓</button>
              </div>
            </div>
          ))}
          <div className="nuevo-comentario-container">
            <textarea
              className="nuevo-comentario-textarea"
              value={nuevoComentario}
              onChange={(e) => setNuevoComentario(e.target.value)}
            />
            <button className="enviar-btn" onClick={enviarComentario}>Enviar</button>
          </div>
        </div>
      );
};

export default Comentarios;
