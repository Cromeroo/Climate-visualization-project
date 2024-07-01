function dedent(text) {
  const lines = text.split('\n');
  const trimmedLines = lines.map(line => line.trimStart());
  return trimmedLines.join('\n');
}


const sectionsData = [
  {
    title: "Transformando los sistemas alimentarios para mejorar los medios de vida y la sostenibilidad ambiental en dos territorios indígenas de Colombia",
    content: dedent(`
Ocho de cada diez hogares indígenas se encuentran en inseguridad alimentaria en Colombia. Los programas nacionales de asistencia alimentaria desconocen la naturaleza del problema y profundizan desigualdades históricas contribuyendo a reproducir paternalismo y dependencia. Por tanto, estudiar y fortalecer con las comunidades sus sistemas agroalimentarios, tiene el potencial de generar capacidades, reducir problemáticas alimentarias y de equidad, mitigar efectos del cambio climático y ofrecer insumos para políticas públicas.

Territorio, Comida y Vida surge ante esa necesidad. El proyecto busca comprender los mecanismos a través de los cuales las comunidades pueden transformar los sistemas agroalimentarios territoriales y sus relaciones de poder para que sean más equitativos, especialmente en género, sustentables y saludables, para fortalecer el buen vivir de comunidades indígenas colombianas a través de la co-creación.

Co-creación para la transición hacia sistemas agroalimentarios más sostenibles, inclusivos, saludables y autónomos, promoviendo el bienestar e incorporando enfoques territoriales y transdisciplinarios junto con las comunidades de Pastos (Nariño), Misak y Ampiuile (Cauca).
    `),
  },
  {
    title: "Líneas de acción del proyecto",
    content: dedent(`
a) Derecho a la alimentación

b) Sistemas agroalimentarios y soberanía

c) Cuidados, ejes de inclusión, interseccionalidad, medio ambiente y tejido social

d) Gestión del conocimiento individual y colectivo para la autonomía y la gobernanza

e) Variabilidad y Cambio Climático

La Universidad del Cauca, la Universidad Nacional de Colombia y las comunidades colaboran como iguales para entender los desafíos y cambios, tanto de las regiones y comunidades, como de la sociedad del conocimiento, para que a los hacedores de política pública cuenten con herramientas y metodologías robustas para la toma de decisiones, aportando así desde lo local a lo territorial, a lo nacional y al Sur Global (bajo evidencia científica). Asimismo, para comprender la complejidad de los sistemas agroalimentarios territoriales articulando Dimensiones, Funciones y Atributos de Sostenibilidad.
    `),
  },
];

export default sectionsData;

