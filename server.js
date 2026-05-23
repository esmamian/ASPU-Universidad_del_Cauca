const express = require("express");
const session = require("express-session");
const path = require("path");
const ExcelJS = require("exceljs");
const { Pool } = require("pg");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: "clave-secreta",
  resave: false,
  saveUninitialized: false
}));

app.use(express.static(path.join(__dirname, "public")));

// Conexión a PostgreSQL en Render
const pool = new Pool({
  connectionString: process.env.AFILIADOS,
  ssl: {
    rejectUnauthorized: false
  }
});

// Crear tabla si no existe
//Información General
pool.query(`
  CREATE TABLE IF NOT EXISTS respuestas_encabezado (
    id SERIAL PRIMARY KEY,
    usuario TEXT NOT NULL,
    seccion TEXT,

    fecha_nacimiento DATE,
    lugar_nacimiento TEXT,
    sexo TEXT,
    estado_civil TEXT,

    fecha_vinculacion DATE,
    vinculacion_continua TEXT,
    mismo_departamento TEXT,
    cual_mismodpto TEXT,

    periodos_otc INTEGER,
    periodos_omt INTEGER,
    periodos_catedra INTEGER,

    titulos_formacion TEXT,
    asignaturas TEXT,
    lineas_investigacion TEXT,

    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
`).then(() => {
  console.log("Tabla respuestas_encabezado lista");
}).catch(error => {
  console.error("Error creando tabla encabezado:", error);
});

//Formación Académica
pool.query(`
  CREATE TABLE IF NOT EXISTS respuestas (

    id SERIAL PRIMARY KEY,

    usuario TEXT NOT NULL,

    seccion TEXT,


    doctorado TEXT,
    cantidad_doctorado INTEGER,


    magister TEXT,
    cantidad_magister INTEGER,


    especialista TEXT,
    cantidad_especialista INTEGER,


    pedagogia TEXT,
    cantidad_pedagogia INTEGER,


    pregrado TEXT,
    cantidad_pregrado INTEGER,


    cursos_continuada TEXT,
    cantidad_cursos_continuada INTEGER,
    horas_cursos_continuada INTEGER,
    ano_cursos_continuada INTEGER,


    otros_cursos_educacion TEXT,
    cuales_otros_cursos_educacion TEXT,
    ano_otros_cursos_educacion INTEGER,


    ingles_c2 TEXT,
    cantidad_ingles_c2 INTEGER,
    ano_ingles_c2 INTEGER,


    ingles_c1 TEXT,
    cantidad_ingles_c1 INTEGER,
    ano_ingles_c1 INTEGER,


    ingles_b2 TEXT,
    cantidad_ingles_b2 INTEGER,
    ano_ingles_b2 INTEGER,


    exp_docente TEXT,
    cantidad_exp_docente INTEGER,


    exp_docente_otras TEXT,
    cantidad_exp_docente_otras INTEGER,
    ano_exp_docente_otras INTEGER,


    exp_profesional TEXT,
    cantidad_exp_profesional INTEGER,
    ano_exp_profesional INTEGER,


    exp_clinica TEXT,
    cantidad_exp_clinica INTEGER,
    ano_exp_clinica INTEGER,


    proy_investigacion TEXT,
    cantidad_proy_investigacion INTEGER,
    ano_proy_investigacion INTEGER,


    proy_social TEXT,
    cantidad_proy_social INTEGER,
    ano_proy_social INTEGER,


    exp_academico_admin TEXT,
    cantidad_exp_academico_admin INTEGER,
    ano_exp_academico_admin INTEGER,


    libro_editorial TEXT,
    cantidad_libro_editorial INTEGER,
    ano_libro_editorial INTEGER,


    patente TEXT,
    cantidad_patente INTEGER,
    ano_patente INTEGER,


    capitulo_libro TEXT,
    cantidad_capitulo_libro INTEGER,
    ano_capitulo_libro INTEGER,


    articulo_a1 TEXT,
    cantidad_articulo_a1 INTEGER,
    ano_articulo_a1 INTEGER,


    articulo_a2 TEXT,
    cantidad_articulo_a2 INTEGER,
    ano_articulo_a2 INTEGER,


    articulo_b TEXT,
    cantidad_articulo_b INTEGER,
    ano_articulo_b INTEGER,


    articulo_c TEXT,
    cantidad_articulo_c INTEGER,
    ano_articulo_c INTEGER,


    evento_internacional TEXT,
    cantidad_evento_internacional INTEGER,
    ano_evento_internacional INTEGER,


    evento_nacional TEXT,
    cantidad_evento_nacional INTEGER,
    ano_evento_nacional INTEGER,


    posgrado_laureado TEXT,
    cantidad_posgrado_laureado INTEGER,


    posgrado_meritorio TEXT,
    cantidad_posgrado_meritorio INTEGER,


    pregrado_laureado TEXT,
    cantidad_pregrado_laureado INTEGER,


    pregrado_meritorio TEXT,
    cantidad_pregrado_meritorio INTEGER,


    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP

  )

`).then(() => {

  console.log("Tabla respuestas lista");

}).catch(error => {

  console.error("Error creando tabla respuestas:", error);

});

//Tabla Artes

pool.query(`
  CREATE TABLE IF NOT EXISTS respuestas_artes (
    id SERIAL PRIMARY KEY,
    usuario TEXT NOT NULL,
    seccion TEXT,

    exposicion TEXT,
    cantidad_exposicion_individual INTEGER,
    ano_exposicion_individual INTEGER,
    cantidad_exposicion_colectiva INTEGER,
    ano_exposicion_colectiva INTEGER,
    

    curadurias TEXT,
    cantidad_curadurias_internacional INTEGER,
    ano_curadurias_internacional INTEGER,
    cantidad_curadurias_nacional INTEGER,
    ano_curadurias_nacional INTEGER,
    cantidad_curadurias_regional INTEGER,
    ano_curadurias_regional INTEGER,

    premios TEXT,
    cantidad_premios_internacional INTEGER,
    cantidad_premios_nacional INTEGER,

    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
`).then(() => {
  console.log("Tabla respuestas_artes lista");
}).catch(error => {
  console.error("Error creando tabla artes:", error);
});

//Tabla Diseño
pool.query(`
  CREATE TABLE IF NOT EXISTS respuestas_diseno (

    id SERIAL PRIMARY KEY,

    usuario TEXT NOT NULL,

    seccion TEXT,

    obra_diseno TEXT,

    cantidad_obra_diseno_inter INTEGER,
    ano_obra_diseno_inter INTEGER,

    cantidad_obra_diseno_nal INTEGER,
    ano_obra_diseno_nal INTEGER,

    cantidad_obra_diseno_reg INTEGER,
    ano_obra_diseno_reg INTEGER,


    obra_premiada TEXT,

    cantidad_obra_premiada_inter INTEGER,
    ano_obra_premiada_inter INTEGER,

    cantidad_obra_premiada_nal INTEGER,
    ano_obra_premiada_nal INTEGER,


    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP

  )

`).then(() => {

  console.log("Tabla respuestas_diseno lista");

}).catch(error => {

  console.error("Error creando tabla diseño:", error);

});

//Tabla música
pool.query(`
  CREATE TABLE IF NOT EXISTS respuestas_musica (

    id SERIAL PRIMARY KEY,

    usuario TEXT NOT NULL,

    seccion TEXT,


    obra_musical TEXT,

    cantidad_obra_musical_inter INTEGER,
    ano_obra_musical_inter INTEGER,

    cantidad_obra_musical_nal INTEGER,
    ano_obra_musical_nal INTEGER,


    obra_musical_premiada TEXT,

    cantidad_obra_musical_premiada_inter INTEGER,
    ano_obra_musical_premiada_inter INTEGER,

    cantidad_obra_musical_premiada_nal INTEGER,
    ano_obra_musical_premiada_nal INTEGER,


    premios_musica TEXT,

    cantidad_premios_musica_inter INTEGER,
    ano_premios_musica_inter INTEGER,

    cantidad_premios_musica_nal INTEGER,
    ano_premios_musica_nal INTEGER,


    interpretacion_musica TEXT,

    cantidad_interpretacion_musica_inter INTEGER,
    ano_interpretacion_musica_inter INTEGER,

    cantidad_interpretacion_musica_nal INTEGER,
    ano_interpretacion_musica_nal INTEGER,


    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP

  )

`).then(() => {

  console.log("Tabla respuestas_musica lista");

}).catch(error => {

  console.error("Error creando tabla música:", error);

});

//Tabla Comunicación Social

// Crear tabla Comunicación Social y Periodismo
pool.query(`
  CREATE TABLE IF NOT EXISTS respuestas_comunicacion (

    id SERIAL PRIMARY KEY,

    usuario TEXT NOT NULL,

    seccion TEXT,


    producto_investigacion TEXT,

    cantidad_producto_investigacion_inter INTEGER,
    ano_producto_investigacion_inter INTEGER,

    cantidad_producto_investigacion_nal INTEGER,
    ano_producto_investigacion_nal INTEGER,

    cantidad_producto_investigacion_reg INTEGER,
    ano_producto_investigacion_reg INTEGER,


    producto_comunicacion TEXT,

    cantidad_producto_comunicacion_inter INTEGER,
    ano_producto_comunicacion_inter INTEGER,

    cantidad_producto_comunicacion_nal INTEGER,
    ano_producto_comunicacion_nal INTEGER,

    cantidad_producto_comunicacion_reg INTEGER,
    ano_producto_comunicacion_reg INTEGER,


    premio_periodismo TEXT,

    cantidad_premio_periodismo_inter INTEGER,
    ano_premio_periodismo_inter INTEGER,

    cantidad_premio_periodismo_nal INTEGER,
    ano_premio_periodismo_nal INTEGER,

    cantidad_premio_periodismo_reg INTEGER,
    ano_premio_periodismo_reg INTEGER,


    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP

  )

`).then(() => {

  console.log("Tabla respuestas_comunicacion lista");

}).catch(error => {

  console.error("Error creando tabla comunicación:", error);

});


// Usuarios del sistema
const usuarios = [
  { usuario: "ana", password: "1234", rol: "estudiante" },
  { usuario: "luis", password: "1234", rol: "estudiante" },
  { usuario: "admin", password: "admin123", rol: "admin" },
  { usuario: "acevedo", password: "4376955", rol: "estudiante" },
  { usuario: "acosta", password: "10547808", rol: "estudiante" },
  { usuario: "agredo", password: "1061755513", rol: "estudiante" },
  { usuario: "ahumada", password: "34569033", rol: "estudiante" },
  { usuario: "aldaban", password: "65745876", rol: "estudiante" },
  { usuario: "alegria", password: "10292641", rol: "estudiante" },
  { usuario: "alvarado", password: "1130661300", rol: "estudiante" },
  { usuario: "alvarez", password: "25292542", rol: "estudiante" },
  { usuario: "angel", password: "1059911088", rol: "estudiante" },
  { usuario: "arango", password: "29105012", rol: "estudiante" },
  { usuario: "arcos", password: "1061686107", rol: "estudiante" },
  { usuario: "arrechea", password: "1061716987", rol: "estudiante" },
  { usuario: "arroyo", password: "34328411", rol: "estudiante" },
  { usuario: "audivert", password: "79968066", rol: "estudiante" },
  { usuario: "bahos", password: "76335868", rol: "estudiante" },
  { usuario: "bambague", password: "1061704258", rol: "estudiante" },
  { usuario: "barrera", password: "80505706", rol: "estudiante" },
  { usuario: "bastidas", password: "1061720750", rol: "estudiante" },
  { usuario: "bautista", password: "34317180", rol: "estudiante" },
  { usuario: "becoche", password: "1061730996", rol: "estudiante" },

  { usuario: "belalcazar", password: "1061740306", rol: "estudiante" },
  { usuario: "bermudez", password: "38755608", rol: "estudiante" },
  { usuario: "betancour", password: "94073716", rol: "estudiante" },
  { usuario: "bolaños", password: "1088973637", rol: "estudiante" },
  { usuario: "burbano", password: "10297491", rol: "estudiante" },
  { usuario: "cabrera", password: "34565520", rol: "estudiante" },
  { usuario: "caicedo", password: "76304127", rol: "estudiante" },
  { usuario: "caldon", password: "1061714476", rol: "estudiante" },
  { usuario: "camacho", password: "79291837", rol: "estudiante" },
  { usuario: "campo", password: "76323330", rol: "estudiante" },

  { usuario: "campos", password: "34331407", rol: "estudiante" },
  { usuario: "cardona", password: "1061741386", rol: "estudiante" },
  { usuario: "carmona", password: "34564191", rol: "estudiante" },
  { usuario: "castillo", password: "1061724261", rol: "estudiante" },
  { usuario: "castro", password: "34571572", rol: "estudiante" },
  { usuario: "celis", password: "1061750476", rol: "estudiante" },
  { usuario: "ceron", password: "29180326", rol: "estudiante" },
  { usuario: "chacon", password: "10538987", rol: "estudiante" },
  { usuario: "chalapud", password: "1085273403", rol: "estudiante" },
  { usuario: "chamorro", password: "1061778189", rol: "estudiante" },

  { usuario: "chantre", password: "10296626", rol: "estudiante" },
  { usuario: "chaves", password: "25287914", rol: "estudiante" },
  { usuario: "chavez", password: "1061746702", rol: "estudiante" },
  { usuario: "claros", password: "34569880", rol: "estudiante" },
  { usuario: "cobo", password: "1061747901", rol: "estudiante" },
  { usuario: "coral", password: "36758323", rol: "estudiante" },
  { usuario: "coronell", password: "16536890", rol: "estudiante" },
  { usuario: "correa", password: "14700203", rol: "estudiante" },
  { usuario: "cortes", password: "1087121139", rol: "estudiante" },
  { usuario: "cruz", password: "34540781", rol: "estudiante" },

  { usuario: "daza", password: "1061733896", rol: "estudiante" },
  { usuario: "delgado", password: "10698926", rol: "estudiante" },
  { usuario: "diaz", password: "76323634", rol: "estudiante" },
  { usuario: "dorado", password: "10291231", rol: "estudiante" },
  { usuario: "erazo", password: "1061773932", rol: "estudiante" },
  { usuario: "fernandez", password: "1061713891", rol: "estudiante" },
  { usuario: "flor", password: "4616466", rol: "estudiante" },
  { usuario: "florez", password: "34326303", rol: "estudiante" },
  { usuario: "fuentes", password: "34553693", rol: "estudiante" },
  { usuario: "galindez", password: "1061753315", rol: "estudiante" },

  { usuario: "galvis", password: "1061807594", rol: "estudiante" },
  { usuario: "gil", password: "79368026", rol: "estudiante" },
  { usuario: "gilon", password: "25517745", rol: "estudiante" },
  { usuario: "giraldo", password: "38870756", rol: "estudiante" },
  { usuario: "gomez", password: "34571468", rol: "estudiante" },
  { usuario: "gonzales", password: "30238110", rol: "estudiante" },
  { usuario: "gonzalez", password: "10296783", rol: "estudiante" },
  { usuario: "guerrero", password: "27250778", rol: "estudiante" },
  { usuario: "gutierrez", password: "65784022", rol: "estudiante" },
  { usuario: "guzman", password: "76326426", rol: "estudiante" },

  { usuario: "henao", password: "25278592", rol: "estudiante" },
  { usuario: "hernandez", password: "92511255", rol: "estudiante" },
  { usuario: "herrera", password: "1061780052", rol: "estudiante" },
  { usuario: "hoyos", password: "1061728066", rol: "estudiante" },
  { usuario: "huertas", password: "76328121", rol: "estudiante" },
  { usuario: "hurtado", password: "34562628", rol: "estudiante" },
  { usuario: "idrobo", password: "25274197", rol: "estudiante" },
  { usuario: "illera", password: "1061726739", rol: "estudiante" },
  { usuario: "ipia", password: "1061714887", rol: "estudiante" },
  { usuario: "jaramillo", password: "1061688234", rol: "estudiante" },

  { usuario: "jimenez", password: "31579224", rol: "estudiante" },
  { usuario: "ledezma", password: "25292048", rol: "estudiante" },
  { usuario: "lopez", password: "76305878", rol: "estudiante" },
  { usuario: "lozada", password: "10292741", rol: "estudiante" },
  { usuario: "lucero", password: "94533532", rol: "estudiante" },
  { usuario: "luna", password: "1061713635", rol: "estudiante" },
  { usuario: "mamian", password: "34329405", rol: "estudiante" },
  { usuario: "marquez", password: "94475443", rol: "estudiante" },
  { usuario: "martinez", password: "16918837", rol: "estudiante" },
  { usuario: "maya", password: "34318506", rol: "estudiante" },
    { usuario: "mendez", password: "76318072", rol: "estudiante" },
  { usuario: "mendez", password: "31577990", rol: "estudiante" },
  { usuario: "meneses", password: "14251340", rol: "estudiante" },
  { usuario: "mera", password: "10296785", rol: "estudiante" },
  { usuario: "miranda", password: "30720867", rol: "estudiante" },
  { usuario: "montenegro", password: "34327979", rol: "estudiante" },
  { usuario: "moreno", password: "387049", rol: "estudiante" },
  { usuario: "moreno", password: "25286633", rol: "estudiante" },
  { usuario: "mosquera", password: "10484572", rol: "estudiante" },
  { usuario: "mosquera", password: "76313291", rol: "estudiante" },
  { usuario: "mosquera", password: "1061709930", rol: "estudiante" },
  { usuario: "mosquera", password: "34315253", rol: "estudiante" },

  { usuario: "muñoz", password: "76323259", rol: "estudiante" },
  { usuario: "muñoz", password: "34324842", rol: "estudiante" },
  { usuario: "muñoz", password: "4617653", rol: "estudiante" },
  { usuario: "muñoz", password: "76327294", rol: "estudiante" },
  { usuario: "muñoz", password: "1061685846", rol: "estudiante" },
  { usuario: "muñoz", password: "34570633", rol: "estudiante" },
  { usuario: "muñoz", password: "34317037", rol: "estudiante" },

  { usuario: "murcia", password: "1084250543", rol: "estudiante" },
  { usuario: "murillo", password: "34553254", rol: "estudiante" },
  { usuario: "murillo", password: "13742651", rol: "estudiante" },

  { usuario: "narvaez", password: "87102325", rol: "estudiante" },
  { usuario: "narvaez", password: "1061735786", rol: "estudiante" },

  { usuario: "nathalie", password: "1061688308", rol: "estudiante" },

  { usuario: "navia", password: "34322664", rol: "estudiante" },

  { usuario: "niño", password: "1098609488", rol: "estudiante" },
  { usuario: "niño", password: "25283057", rol: "estudiante" },

  { usuario: "obando", password: "1061717946", rol: "estudiante" },
  { usuario: "obando", password: "59819113", rol: "estudiante" },

  { usuario: "ojeda", password: "1061757891", rol: "estudiante" },

  { usuario: "ordoñez", password: "1061699361", rol: "estudiante" },
  { usuario: "ordoñez", password: "1061714282", rol: "estudiante" },
  { usuario: "ordoñez", password: "79261468", rol: "estudiante" },

  { usuario: "orjuela", password: "25283965", rol: "estudiante" },
  { usuario: "orozco", password: "34555465", rol: "estudiante" },

  { usuario: "ortega", password: "1061699251", rol: "estudiante" },
  { usuario: "ortega", password: "79790366", rol: "estudiante" },

  { usuario: "osorio", password: "76150539", rol: "estudiante" },

  { usuario: "otero", password: "1061725350", rol: "estudiante" },

  { usuario: "paredes", password: "34326458", rol: "estudiante" },
  { usuario: "paredes", password: "1064428888", rol: "estudiante" },

  { usuario: "paz", password: "34330775", rol: "estudiante" },

  { usuario: "pedraza", password: "34546494", rol: "estudiante" },
  { usuario: "pedroza", password: "10521998", rol: "estudiante" },

  { usuario: "perez", password: "25283669", rol: "estudiante" },
  { usuario: "perez", password: "76306781", rol: "estudiante" },
  { usuario: "perez", password: "1061705167", rol: "estudiante" },

  { usuario: "pismag", password: "10298502", rol: "estudiante" },

  { usuario: "pito", password: "34326024", rol: "estudiante" },

  { usuario: "plaza", password: "34570325", rol: "estudiante" },

  { usuario: "potosi", password: "25396777", rol: "estudiante" },

  { usuario: "prado", password: "1061751898", rol: "estudiante" },

  { usuario: "quiroga", password: "79989040", rol: "estudiante" },

  { usuario: "ramirez", password: "34571575", rol: "estudiante" },

  { usuario: "realpe", password: "1061726834", rol: "estudiante" },

  { usuario: "rengifo", password: "10544217", rol: "estudiante" },
  { usuario: "rengifo", password: "34331927", rol: "estudiante" },
  { usuario: "rengifo", password: "1061688207", rol: "estudiante" },

  { usuario: "restrepo", password: "25292426", rol: "estudiante" },

  { usuario: "rivera", password: "34315699", rol: "estudiante" },

  { usuario: "roa", password: "1061693126", rol: "estudiante" },

  { usuario: "rodriguez", password: "10293679", rol: "estudiante" },

  { usuario: "rojas", password: "1061721855", rol: "estudiante" },
  { usuario: "rojas", password: "41941659", rol: "estudiante" },

  { usuario: "romero", password: "50931271", rol: "estudiante" },

  { usuario: "rosas", password: "1061721951", rol: "estudiante" },

  { usuario: "rosero", password: "1061701811", rol: "estudiante" },

  { usuario: "rozo", password: "79532990", rol: "estudiante" },

  { usuario: "samboni", password: "1061778461", rol: "estudiante" },

  { usuario: "sanchez", password: "1063812620", rol: "estudiante" },
  { usuario: "sanchez", password: "1061690715", rol: "estudiante" },

  { usuario: "sarmiento", password: "94063101", rol: "estudiante" },

  { usuario: "sarria", password: "25283800", rol: "estudiante" },
  { usuario: "sarria", password: "76330349", rol: "estudiante" },

  { usuario: "soto", password: "1089718646", rol: "estudiante" },

  { usuario: "terrios", password: "34551362", rol: "estudiante" },

  { usuario: "toro", password: "34567510", rol: "estudiante" },

  { usuario: "torres", password: "4415410", rol: "estudiante" },
  { usuario: "torres", password: "34321576", rol: "estudiante" },

  { usuario: "tovar", password: "1061687219", rol: "estudiante" },

  { usuario: "trujillo", password: "1061738519", rol: "estudiante" },

  { usuario: "urbano", password: "106477232", rol: "estudiante" },
  { usuario: "urbano", password: "10304083", rol: "estudiante" },
  { usuario: "urbano", password: "1061704795", rol: "estudiante" },

  { usuario: "valencia", password: "1061721904", rol: "estudiante" },
  { usuario: "valencia", password: "76313761", rol: "estudiante" },

  { usuario: "valera", password: "2000022127", rol: "estudiante" },

  { usuario: "vargas", password: "10697021", rol: "estudiante" },

  { usuario: "varon", password: "1061708024", rol: "estudiante" },

  { usuario: "vasquez", password: "1110452139", rol: "estudiante" },

  { usuario: "vela", password: "10293365", rol: "estudiante" },

  { usuario: "velásquez", password: "1061777102", rol: "estudiante" },

  { usuario: "velez", password: "1061704317", rol: "estudiante" },

  { usuario: "vidal", password: "25272839", rol: "estudiante" },

  { usuario: "villaquiran", password: "34327296", rol: "estudiante" },

  { usuario: "zarama", password: "27081937", rol: "estudiante" },

  { usuario: "zuñiga", password: "34561007", rol: "estudiante" }
];

// Middleware
function auth(req, res, next) {
  if (!req.session.usuario) {
    return res.status(401).json({
      mensaje: "No autorizado"
    });
  }

  next();
}

// Login
app.post("/login", (req, res) => {
  const { usuario, password } = req.body;

  const user = usuarios.find(
    u => u.usuario === usuario && u.password === password
  );

  if (!user) {
    return res.status(401).json({
      mensaje: "Usuario o contraseña incorrectos"
    });
  }

  req.session.usuario = {
    usuario: user.usuario,
    rol: user.rol
  };

  res.json({
    mensaje: "Login correcto",
    usuario: user.usuario,
    rol: user.rol
  });
});

// Usuario activo
app.get("/usuario", auth, (req, res) => {
  res.json(req.session.usuario);
});

// Función para convertir valores vacíos a null
function numeroONull(valor) {
  if (valor === "" || valor === undefined || valor === null) {
    return null;
  }

  return Number(valor);
}

//Guarda encabezado

app.post("/guardar-encabezado", auth, async (req, res) => {
  try {
    const {
      seccion,
      fechaNacimiento,
      lugarNacimiento,
      sexo,
      estadoCivil,
      fechaVinculacion,
      vinculacionContinua,
      mismoDepartamento,
      cualmismoDpto,
      periodosOTC,
      periodosOMT,
      periodosCatedra,
      titulosFormacion,
      asignaturas,
      lineasInvestigacion
    } = req.body;

    const usuario = req.session.usuario.usuario;

    await pool.query(
      `INSERT INTO respuestas_encabezado (
        usuario,
        seccion,
        fecha_nacimiento,
        lugar_nacimiento,
        sexo,
        estado_civil,
        fecha_vinculacion,
        vinculacion_continua,
        mismo_departamento,
        cual_mismodpto,
        periodos_otc,
        periodos_omt,
        periodos_catedra,
        titulos_formacion,
        asignaturas,
        lineas_investigacion
      )
      VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16
      )`,
      [
        usuario,
        seccion,
        fechaNacimiento,
        lugarNacimiento,
        sexo,
        estadoCivil,
        fechaVinculacion || null,
        vinculacionContinua,
        mismoDepartamento,
        cualmismoDpto,
        numeroONull(periodosOTC),
        numeroONull(periodosOMT),
        numeroONull(periodosCatedra),
        titulosFormacion,
        asignaturas,
        lineasInvestigacion
      ]
    );

    res.json({
      mensaje: `Información general guardada correctamente para ${usuario}`
    });

  } catch (error) {
    console.error("Error guardando encabezado:", error);

    res.status(500).json({
      mensaje: "Error guardando información general",
      detalle: error.message
    });
  }
});

//Descarga encabezado

app.get("/descargar-encabezado", auth, async (req, res) => {
  try {
    if (req.session.usuario.rol !== "admin") {
      return res.status(403).send("Solo el administrador puede descargar");
    }

    const resultado = await pool.query(`
      SELECT *
      FROM respuestas_encabezado
      ORDER BY fecha ASC
    `);

    const workbook = new ExcelJS.Workbook();
    const hoja = workbook.addWorksheet("Información General");

    hoja.columns = [
      { header: "Usuario", key: "usuario", width: 20 },
      { header: "Sección", key: "seccion", width: 25 },

      { header: "Fecha nacimiento", key: "fecha_nacimiento", width: 20 },
      { header: "Lugar nacimiento", key: "lugar_nacimiento", width: 25 },
      { header: "Sexo ", key: "sexo", width: 25 },
      { header: "Estado Civil ", key: "estado_civil", width: 25 },

      { header: "Fecha vinculación", key: "fecha_vinculacion", width: 20 },
      { header: "Vinculación continua", key: "vinculacion_continua", width: 25 },
      { header: "Mismo Departamento", key: "mismo_departamento", width: 25 },
      { header: "Cuál mismo Departamento", key: "cual_mismodpto", width: 25 },

      { header: "Periodos OTC", key: "periodos_otc", width: 18 },
      { header: "Periodos OMT", key: "periodos_omt", width: 18 },
      { header: "Periodos hora cátedra", key: "periodos_catedra", width: 24 },

      { header: "Títulos formación", key: "titulos_formacion", width: 45 },
      { header: "Asignaturas", key: "asignaturas", width: 45 },
      { header: "Líneas investigación", key: "lineas_investigacion", width: 45 },

      { header: "Fecha registro", key: "fecha", width: 25 }
    ];

    resultado.rows.forEach(row => {
      hoja.addRow(row);
    });

    hoja.getRow(1).font = { bold: true };

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );

    res.setHeader(
      "Content-Disposition",
      "attachment; filename=informacion_general.xlsx"
    );

    await workbook.xlsx.write(res);
    res.end();

  } catch (error) {
    console.error("Error generando Excel de información general:", error);
    res.status(500).send("Error generando Excel de información general");
  }
});

// Guardar respuestas
app.post("/guardar-respuestas", auth, async (req, res) => {

  try {

    const {

      seccion,


      doctorado,
      cantidadDoctorado,


      magister,
      cantidadMagister,


      especialista,
      cantidadEspecialista,


      pedagogia,
      cantidadPedagogia,


      pregrado,
      cantidadPregrado,


      cursosContinuada,
      cantidadCursosContinuada,
      horasCursosContinuada,
      anoCursosContinuada,


      otrosCursosEducacion,
      cualesOtrosCursosEducacion,
      anoOtrosCursosEducacion,


      inglesC2,
      cantidadInglesC2,
      anoInglesC2,


      inglesC1,
      cantidadInglesC1,
      anoInglesC1,


      inglesB2,
      cantidadInglesB2,
      anoInglesB2,


      expDocente,
      cantidadExpDocente,


      expDocenteOtras,
      cantidadExpDocenteOtras,
      anoExpDocenteOtras,


      expProfesional,
      cantidadExpProfesional,
      anoExpProfesional,


      expClinica,
      cantidadExpClinica,
      anoExpClinica,


      proyInvestigacion,
      cantidadProyInvestigacion,
      anoProyInvestigacion,


      proySocial,
      cantidadProySocial,
      anoProySocial,


      expAcademicoAdmin,
      cantidadExpAcademicoAdmin,
      anoExpAcademicoAdmin,


      libroEditorial,
      cantidadLibroEditorial,
      anoLibroEditorial,


      patente,
      cantidadPatente,
      anoPatente,


      capituloLibro,
      cantidadCapituloLibro,
      anoCapituloLibro,


      articuloA1,
      cantidadArticuloA1,
      anoArticuloA1,


      articuloA2,
      cantidadArticuloA2,
      anoArticuloA2,


      articuloB,
      cantidadArticuloB,
      anoArticuloB,


      articuloC,
      cantidadArticuloC,
      anoArticuloC,


      eventoInternacional,
      cantidadEventoInternacional,
      anoEventoInternacional,


      eventoNacional,
      cantidadEventoNacional,
      anoEventoNacional,


      posgradoLaureado,
      cantidadPosgradoLaureado,


      posgradoMeritorio,
      cantidadPosgradoMeritorio,


      pregradoLaureado,
      cantidadPregradoLaureado,


      pregradoMeritorio,
      cantidadPregradoMeritorio

    } = req.body;

    const usuario = req.session.usuario.usuario;

    await pool.query(

      `INSERT INTO respuestas (

        usuario,
        seccion,


        doctorado,
        cantidad_doctorado,


        magister,
        cantidad_magister,


        especialista,
        cantidad_especialista,


        pedagogia,
        cantidad_pedagogia,


        pregrado,
        cantidad_pregrado,


        cursos_continuada,
        cantidad_cursos_continuada,
        horas_cursos_continuada,
        ano_cursos_continuada,


        otros_cursos_educacion,
        cuales_otros_cursos_educacion,
        ano_otros_cursos_educacion,


        ingles_c2,
        cantidad_ingles_c2,
        ano_ingles_c2,


        ingles_c1,
        cantidad_ingles_c1,
        ano_ingles_c1,


        ingles_b2,
        cantidad_ingles_b2,
        ano_ingles_b2,


        exp_docente,
        cantidad_exp_docente,


        exp_docente_otras,
        cantidad_exp_docente_otras,
        ano_exp_docente_otras,


        exp_profesional,
        cantidad_exp_profesional,
        ano_exp_profesional,


        exp_clinica,
        cantidad_exp_clinica,
        ano_exp_clinica,


        proy_investigacion,
        cantidad_proy_investigacion,
        ano_proy_investigacion,


        proy_social,
        cantidad_proy_social,
        ano_proy_social,


        exp_academico_admin,
        cantidad_exp_academico_admin,
        ano_exp_academico_admin,


        libro_editorial,
        cantidad_libro_editorial,
        ano_libro_editorial,


        patente,
        cantidad_patente,
        ano_patente,


        capitulo_libro,
        cantidad_capitulo_libro,
        ano_capitulo_libro,


        articulo_a1,
        cantidad_articulo_a1,
        ano_articulo_a1,


        articulo_a2,
        cantidad_articulo_a2,
        ano_articulo_a2,


        articulo_b,
        cantidad_articulo_b,
        ano_articulo_b,


        articulo_c,
        cantidad_articulo_c,
        ano_articulo_c,


        evento_internacional,
        cantidad_evento_internacional,
        ano_evento_internacional,


        evento_nacional,
        cantidad_evento_nacional,
        ano_evento_nacional,


        posgrado_laureado,
        cantidad_posgrado_laureado,


        posgrado_meritorio,
        cantidad_posgrado_meritorio,


        pregrado_laureado,
        cantidad_pregrado_laureado,


        pregrado_meritorio,
        cantidad_pregrado_meritorio

      )

      VALUES (
  $1, $2,
  $3, $4,
  $5, $6,
  $7, $8,
  $9, $10,
  $11, $12,
  $13, $14, $15, $16,
  $17, $18, $19,
  $20, $21, $22,
  $23, $24, $25,
  $26, $27, $28,
  $29, $30,
  $31, $32, $33,
  $34, $35, $36,
  $37, $38, $39,
  $40, $41, $42,
  $43, $44, $45,
  $46, $47, $48,
  $49, $50, $51,
  $52, $53, $54,
  $55, $56, $57,
  $58, $59, $60,
  $61, $62, $63,
  $64, $65, $66,
  $67, $68, $69,
  $70, $71, $72,
  $73, $74, $75,
  $76, $77,
  $78, $79,
  $80, $81,
  $82, $83
)`,

      [

        usuario,
        seccion,


        doctorado,
        numeroONull(cantidadDoctorado),


        magister,
        numeroONull(cantidadMagister),


        especialista,
        numeroONull(cantidadEspecialista),


        pedagogia,
        numeroONull(cantidadPedagogia),


        pregrado,
        numeroONull(cantidadPregrado),


        cursosContinuada,
        numeroONull(cantidadCursosContinuada),
        numeroONull(horasCursosContinuada),
        numeroONull(anoCursosContinuada),


        otrosCursosEducacion,
        cualesOtrosCursosEducacion,
        numeroONull(anoOtrosCursosEducacion),


        inglesC2,
        numeroONull(cantidadInglesC2),
        numeroONull(anoInglesC2),


        inglesC1,
        numeroONull(cantidadInglesC1),
        numeroONull(anoInglesC1),


        inglesB2,
        numeroONull(cantidadInglesB2),
        numeroONull(anoInglesB2),


        expDocente,
        numeroONull(cantidadExpDocente),


        expDocenteOtras,
        numeroONull(cantidadExpDocenteOtras),
        numeroONull(anoExpDocenteOtras),


        expProfesional,
        numeroONull(cantidadExpProfesional),
        numeroONull(anoExpProfesional),


        expClinica,
        numeroONull(cantidadExpClinica),
        numeroONull(anoExpClinica),


        proyInvestigacion,
        numeroONull(cantidadProyInvestigacion),
        numeroONull(anoProyInvestigacion),


        proySocial,
        numeroONull(cantidadProySocial),
        numeroONull(anoProySocial),


        expAcademicoAdmin,
        numeroONull(cantidadExpAcademicoAdmin),
        numeroONull(anoExpAcademicoAdmin),


        libroEditorial,
        numeroONull(cantidadLibroEditorial),
        numeroONull(anoLibroEditorial),


        patente,
        numeroONull(cantidadPatente),
        numeroONull(anoPatente),


        capituloLibro,
        numeroONull(cantidadCapituloLibro),
        numeroONull(anoCapituloLibro),


        articuloA1,
        numeroONull(cantidadArticuloA1),
        numeroONull(anoArticuloA1),


        articuloA2,
        numeroONull(cantidadArticuloA2),
        numeroONull(anoArticuloA2),


        articuloB,
        numeroONull(cantidadArticuloB),
        numeroONull(anoArticuloB),


        articuloC,
        numeroONull(cantidadArticuloC),
        numeroONull(anoArticuloC),


        eventoInternacional,
        numeroONull(cantidadEventoInternacional),
        numeroONull(anoEventoInternacional),


        eventoNacional,
        numeroONull(cantidadEventoNacional),
        numeroONull(anoEventoNacional),


        posgradoLaureado,
        numeroONull(cantidadPosgradoLaureado),


        posgradoMeritorio,
        numeroONull(cantidadPosgradoMeritorio),


        pregradoLaureado,
        numeroONull(cantidadPregradoLaureado),


        pregradoMeritorio,
        numeroONull(cantidadPregradoMeritorio)

      ]

    );

    res.json({
      mensaje: `Respuestas guardadas correctamente para ${usuario}`
    });

  } catch (error) {

    console.error("Error guardando respuestas:", error);

    res.status(500).json({
      mensaje: "Error guardando respuestas",
      detalle: error.message
    });

  }

});

//Descarga respuestas
app.get("/descargar-excel", auth, async (req, res) => {

  try {

    if (req.session.usuario.rol !== "admin") {

      return res.status(403).send(
        "Solo el administrador puede descargar"
      );

    }

    const resultado = await pool.query(`
      SELECT *
      FROM respuestas
      ORDER BY fecha ASC
    `);

    const workbook = new ExcelJS.Workbook();

    const hoja = workbook.addWorksheet("Formulario Completo");

    hoja.columns = [

      { header: "Usuario", key: "usuario", width: 20 },
      { header: "Sección", key: "seccion", width: 25 },


      { header: "Doctorado", key: "doctorado", width: 18 },
      { header: "Cantidad Doctorado", key: "cantidad_doctorado", width: 22 },


      { header: "Magíster", key: "magister", width: 18 },
      { header: "Cantidad Magíster", key: "cantidad_magister", width: 22 },


      { header: "Especialista", key: "especialista", width: 18 },
      { header: "Cantidad Especialista", key: "cantidad_especialista", width: 24 },


      { header: "Pedagogía", key: "pedagogia", width: 18 },
      { header: "Cantidad Pedagogía", key: "cantidad_pedagogia", width: 24 },


      { header: "Pregrado", key: "pregrado", width: 18 },
      { header: "Cantidad Pregrado", key: "cantidad_pregrado", width: 22 },


      { header: "Cursos continuada", key: "cursos_continuada", width: 24 },
      { header: "Cantidad cursos", key: "cantidad_cursos_continuada", width: 22 },
      { header: "Horas cursos", key: "horas_cursos_continuada", width: 20 },
      { header: "Año más antiguo", key: "ano_cursos_continuada", width: 22 },


      { header: "Otros cursos educación", key: "otros_cursos_educacion", width: 28 },
      { header: "¿Cuáles?", key: "cuales_otros_cursos_educacion", width: 35 },
      { header: "Año más antiguo", key: "ano_otros_cursos_educacion", width: 22 },


      { header: "Inglés C2", key: "ingles_c2", width: 18 },
      { header: "Cantidad C2", key: "cantidad_ingles_c2", width: 18 },
      { header: "Año C2", key: "ano_ingles_c2", width: 18 },


      { header: "Inglés C1", key: "ingles_c1", width: 18 },
      { header: "Cantidad C1", key: "cantidad_ingles_c1", width: 18 },
      { header: "Año C1", key: "ano_ingles_c1", width: 18 },


      { header: "Inglés B2", key: "ingles_b2", width: 18 },
      { header: "Cantidad B2", key: "cantidad_ingles_b2", width: 18 },
      { header: "Año B2", key: "ano_ingles_b2", width: 18 },


      { header: "Experiencia docente", key: "exp_docente", width: 24 },
      { header: "Cantidad experiencia docente", key: "cantidad_exp_docente", width: 28 },


      { header: "Experiencia docente antigua", key: "exp_docente_otras", width: 28 },
      { header: "Cantidad experiencia antigua", key: "cantidad_exp_docente_otras", width: 30 },
      { header: "Año experiencia antigua", key: "ano_exp_docente_otras", width: 28 },


      { header: "Experiencia profesional", key: "exp_profesional", width: 26 },
      { header: "Cantidad experiencia profesional", key: "cantidad_exp_profesional", width: 30 },
      { header: "Año experiencia profesional", key: "ano_exp_profesional", width: 28 },


      { header: "Experiencia clínica", key: "exp_clinica", width: 24 },
      { header: "Cantidad experiencia clínica", key: "cantidad_exp_clinica", width: 28 },
      { header: "Año experiencia clínica", key: "ano_exp_clinica", width: 26 },


      { header: "Proyecto investigación", key: "proy_investigacion", width: 26 },
      { header: "Cantidad proyectos investigación", key: "cantidad_proy_investigacion", width: 30 },
      { header: "Año proyecto investigación", key: "ano_proy_investigacion", width: 28 },


      { header: "Proyecto social", key: "proy_social", width: 24 },
      { header: "Cantidad proyectos sociales", key: "cantidad_proy_social", width: 28 },
      { header: "Año proyecto social", key: "ano_proy_social", width: 26 },


      { header: "Experiencia académico-admin", key: "exp_academico_admin", width: 30 },
      { header: "Cantidad experiencia académico-admin", key: "cantidad_exp_academico_admin", width: 34 },
      { header: "Año experiencia académico-admin", key: "ano_exp_academico_admin", width: 32 },


      { header: "Libro editorial", key: "libro_editorial", width: 22 },
      { header: "Cantidad libro editorial", key: "cantidad_libro_editorial", width: 26 },
      { header: "Año libro editorial", key: "ano_libro_editorial", width: 24 },


      { header: "Patente", key: "patente", width: 18 },
      { header: "Cantidad patente", key: "cantidad_patente", width: 22 },
      { header: "Año patente", key: "ano_patente", width: 20 },


      { header: "Capítulo libro", key: "capitulo_libro", width: 22 },
      { header: "Cantidad capítulo libro", key: "cantidad_capitulo_libro", width: 28 },
      { header: "Año capítulo libro", key: "ano_capitulo_libro", width: 26 },


      { header: "Artículo A1", key: "articulo_a1", width: 20 },
      { header: "Cantidad A1", key: "cantidad_articulo_a1", width: 20 },
      { header: "Año A1", key: "ano_articulo_a1", width: 18 },


      { header: "Artículo A2", key: "articulo_a2", width: 20 },
      { header: "Cantidad A2", key: "cantidad_articulo_a2", width: 20 },
      { header: "Año A2", key: "ano_articulo_a2", width: 18 },


      { header: "Artículo B", key: "articulo_b", width: 20 },
      { header: "Cantidad B", key: "cantidad_articulo_b", width: 20 },
      { header: "Año B", key: "ano_articulo_b", width: 18 },


      { header: "Artículo C", key: "articulo_c", width: 20 },
      { header: "Cantidad C", key: "cantidad_articulo_c", width: 20 },
      { header: "Año C", key: "ano_articulo_c", width: 18 },


      { header: "Evento internacional", key: "evento_internacional", width: 24 },
      { header: "Cantidad evento internacional", key: "cantidad_evento_internacional", width: 28 },
      { header: "Año evento internacional", key: "ano_evento_internacional", width: 26 },


      { header: "Evento nacional", key: "evento_nacional", width: 22 },
      { header: "Cantidad evento nacional", key: "cantidad_evento_nacional", width: 26 },
      { header: "Año evento nacional", key: "ano_evento_nacional", width: 24 },


      { header: "Posgrado laureado", key: "posgrado_laureado", width: 24 },
      { header: "Cantidad posgrado laureado", key: "cantidad_posgrado_laureado", width: 28 },


      { header: "Posgrado meritorio", key: "posgrado_meritorio", width: 24 },
      { header: "Cantidad posgrado meritorio", key: "cantidad_posgrado_meritorio", width: 28 },


      { header: "Pregrado laureado", key: "pregrado_laureado", width: 24 },
      { header: "Cantidad pregrado laureado", key: "cantidad_pregrado_laureado", width: 28 },


      { header: "Pregrado meritorio", key: "pregrado_meritorio", width: 24 },
      { header: "Cantidad pregrado meritorio", key: "cantidad_pregrado_meritorio", width: 28 },


      { header: "Fecha", key: "fecha", width: 25 }

    ];

    resultado.rows.forEach(row => {
      hoja.addRow(row);
    });

    hoja.getRow(1).font = { bold: true };

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );

    res.setHeader(
      "Content-Disposition",
      "attachment; filename=formulario_completo.xlsx"
    );

    await workbook.xlsx.write(res);

    res.end();

  } catch (error) {

    console.error("Error generando Excel:", error);

    res.status(500).send("Error generando Excel");

  }

});

//Guardar artes

app.post("/guardar-artes", auth, async (req, res) => {
  try {
    const {
  seccion,

  exposicion,
  cantidadExposicionIndividual,
  anoExposicionIndividual,
  cantidadExposicionColectiva,
  anoExposicionColectiva,

  curadurias,
  cantidadCuraduriasInternacional,
  anoCuraduriasInternacional,
  cantidadCuraduriasNacional,
  anoCuraduriasNacional,
  cantidadCuraduriasRegional,
  anoCuraduriasRegional,

  premios,
  cantidadPremiosInternacional,
  cantidadPremiosNacional
} = req.body;

    const usuario = req.session.usuario.usuario;

    await pool.query(
  `INSERT INTO respuestas_artes (
    usuario,
    seccion,

    exposicion,
    cantidad_exposicion_individual,
    ano_exposicion_individual,
    cantidad_exposicion_colectiva,
    ano_exposicion_colectiva,

    curadurias,
    cantidad_curadurias_internacional,
    ano_curadurias_internacional,
    cantidad_curadurias_nacional,
    ano_curadurias_nacional,
    cantidad_curadurias_regional,
    ano_curadurias_regional,

    premios,
    cantidad_premios_internacional,
    cantidad_premios_nacional
  )
  VALUES (
    $1, $2,
    $3, $4, $5, $6, $7,
    $8, $9, $10, $11, $12, $13, $14,
    $15, $16, $17
  )`,
  [
    usuario,
    seccion,

    exposicion,
    numeroONull(cantidadExposicionIndividual),
    numeroONull(anoExposicionIndividual),
    numeroONull(cantidadExposicionColectiva),
    numeroONull(anoExposicionColectiva),

    curadurias,
    numeroONull(cantidadCuraduriasInternacional),
    numeroONull(anoCuraduriasInternacional),
    numeroONull(cantidadCuraduriasNacional),
    numeroONull(anoCuraduriasNacional),
    numeroONull(cantidadCuraduriasRegional),
    numeroONull(anoCuraduriasRegional),

    premios,
    numeroONull(cantidadPremiosInternacional),
    numeroONull(cantidadPremiosNacional)
  ]
);
    res.json({
      mensaje: `Respuestas de Artes guardadas correctamente para ${usuario}`
    });

  } catch (error) {
    console.error("Error guardando respuestas de Artes:", error);

    res.status(500).json({
      mensaje: "Error guardando respuestas de Artes",
      detalle: error.message
    });
  }
});

//Descarga Artes

app.get("/descargar-artes", auth, async (req, res) => {
  try {
    if (req.session.usuario.rol !== "admin") {
      return res.status(403).send("Solo el administrador puede descargar");
    }

    const resultado = await pool.query(`
      SELECT *
      FROM respuestas_artes
      ORDER BY fecha ASC
    `);

    const workbook = new ExcelJS.Workbook();
    const hoja = workbook.addWorksheet("Artes Plásticas");

    hoja.columns = [
  { header: "Usuario", key: "usuario", width: 20 },
  { header: "Sección", key: "seccion", width: 25 },

  { header: "Exposición", key: "exposicion", width: 18 },

  { header: "Cant. Individual", key: "cantidad_exposicion_individual", width: 20 },
  { header: "Año Individual", key: "ano_exposicion_individual", width: 18 },

  { header: "Cant. Colectiva", key: "cantidad_exposicion_colectiva", width: 20 },
  { header: "Año Colectiva", key: "ano_exposicion_colectiva", width: 18 },

  { header: "Curadurías", key: "curadurias", width: 18 },

  { header: "Curaduría Internacional", key: "cantidad_curadurias_internacional", width: 25 },
  { header: "Año Curaduría Internacional", key: "ano_curadurias_internacional", width: 28 },

  { header: "Curaduría Nacional", key: "cantidad_curadurias_nacional", width: 25 },
  { header: "Año Curaduría Nacional", key: "ano_curadurias_nacional", width: 25 },

  { header: "Curaduría Regional", key: "cantidad_curadurias_regional", width: 25 },
  { header: "Año Curaduría Regional", key: "ano_curadurias_regional", width: 25 },

  { header: "Premios", key: "premios", width: 18 },
  { header: "Premios Internacional", key: "cantidad_premios_internacional", width: 25 },
  { header: "Premios Nacional", key: "cantidad_premios_nacional", width: 25 },

  { header: "Fecha", key: "fecha", width: 25 }
];

    resultado.rows.forEach(row => {
      hoja.addRow(row);
    });

    hoja.getRow(1).font = { bold: true };

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );

    res.setHeader(
      "Content-Disposition",
      "attachment; filename=artes_plasticas.xlsx"
    );

    await workbook.xlsx.write(res);
    res.end();

  } catch (error) {
    console.error("Error generando Excel de Artes:", error);
    res.status(500).send("Error generando Excel de Artes");
  }
});

 
// Guarda Diseño
app.post("/guardar-diseno", auth, async (req, res) => {
  try {
    const {
      seccion,

      obraDiseno,
      cantidadObraDisenoInter,
      anoObraDisenoInter,
      cantidadObraDisenoNal,
      anoObraDisenoNal,
      cantidadObraDisenoReg,
      anoObraDisenoReg,

      obraPremiada,
      cantidadObraPremiadaInter,
      anoObraPremiadaInter,
      cantidadObraPremiadaNal,
      anoObraPremiadaNal
    } = req.body;

    const usuario = req.session.usuario.usuario;

    await pool.query(
      `INSERT INTO respuestas_diseno (
        usuario,
        seccion,

        obra_diseno,
        cantidad_obra_diseno_inter,
        ano_obra_diseno_inter,
        cantidad_obra_diseno_nal,
        ano_obra_diseno_nal,
        cantidad_obra_diseno_reg,
        ano_obra_diseno_reg,

        obra_premiada,
        cantidad_obra_premiada_inter,
        ano_obra_premiada_inter,
        cantidad_obra_premiada_nal,
        ano_obra_premiada_nal
      )
      VALUES (
        $1, $2,
        $3, $4, $5, $6, $7, $8, $9,
        $10, $11, $12, $13, $14
      )`,
      [
        usuario,
        seccion,

        obraDiseno,
        numeroONull(cantidadObraDisenoInter),
        numeroONull(anoObraDisenoInter),
        numeroONull(cantidadObraDisenoNal),
        numeroONull(anoObraDisenoNal),
        numeroONull(cantidadObraDisenoReg),
        numeroONull(anoObraDisenoReg),

        obraPremiada,
        numeroONull(cantidadObraPremiadaInter),
        numeroONull(anoObraPremiadaInter),
        numeroONull(cantidadObraPremiadaNal),
        numeroONull(anoObraPremiadaNal)
      ]
    );

    res.json({
      mensaje: `Respuestas de Diseño guardadas correctamente para ${usuario}`
    });

  } catch (error) {
    console.error("Error guardando respuestas de Diseño:", error);

    res.status(500).json({
      mensaje: "Error guardando respuestas de Diseño",
      detalle: error.message
    });
  }
});

//Descarga diseño

app.get("/descargar-diseno", auth, async (req, res) => {
  try {
    if (req.session.usuario.rol !== "admin") {
      return res.status(403).send("Solo el administrador puede descargar");
    }

    const resultado = await pool.query(`
      SELECT *
      FROM respuestas_diseno
      ORDER BY fecha ASC
    `);

    const workbook = new ExcelJS.Workbook();
    const hoja = workbook.addWorksheet("Diseño");

    hoja.columns = [
      { header: "Usuario", key: "usuario", width: 20 },
      { header: "Sección", key: "seccion", width: 25 },

      { header: "Obra diseño", key: "obra_diseno", width: 22 },

      { header: "Obra diseño internacional", key: "cantidad_obra_diseno_inter", width: 28 },
      { header: "Año obra diseño internacional", key: "ano_obra_diseno_inter", width: 28 },

      { header: "Obra diseño nacional", key: "cantidad_obra_diseno_nal", width: 24 },
      { header: "Año obra diseño nacional", key: "ano_obra_diseno_nal", width: 26 },

      { header: "Obra diseño regional-local", key: "cantidad_obra_diseno_reg", width: 28 },
      { header: "Año obra diseño regional-local", key: "ano_obra_diseno_reg", width: 30 },

      { header: "Obra premiada", key: "obra_premiada", width: 24 },

      { header: "Premiada internacional", key: "cantidad_obra_premiada_inter", width: 28 },
      { header: "Año premiada internacional", key: "ano_obra_premiada_inter", width: 28 },

      { header: "Premiada nacional", key: "cantidad_obra_premiada_nal", width: 24 },
      { header: "Año premiada nacional", key: "ano_obra_premiada_nal", width: 26 },

      { header: "Fecha", key: "fecha", width: 25 }
    ];

    resultado.rows.forEach(row => {
      hoja.addRow(row);
    });

    hoja.getRow(1).font = { bold: true };

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );

    res.setHeader(
      "Content-Disposition",
      "attachment; filename=diseno.xlsx"
    );

    await workbook.xlsx.write(res);
    res.end();

  } catch (error) {
    console.error("Error generando Excel de Diseño:", error);
    res.status(500).send("Error generando Excel de Diseño");
  }
});

//Guarda Música
app.post("/guardar-musica", auth, async (req, res) => {
  try {
    const {
      seccion,

      obraMusical,
      cantidadObraMusicalInter,
      anoObraMusicalInter,
      cantidadObraMusicalNal,
      anoObraMusicalNal,

      obraMusicalPremiada,
      cantidadObraMusicalPremiadaInter,
      anoObraMusicalPremiadaInter,
      cantidadObraMusicalPremiadaNal,
      anoObraMusicalPremiadaNal,

      premiosMusica,
      cantidadPremiosMusicaInter,
      anoPremiosMusicaInter,
      cantidadPremiosMusicaNal,
      anoPremiosMusicaNal,

      interpretacionMusica,
      cantidadInterpretacionMusicaInter,
      anoInterpretacionMusicaInter,
      cantidadInterpretacionMusicaNal,
      anoInterpretacionMusicaNal
    } = req.body;

    const usuario = req.session.usuario.usuario;

    await pool.query(
      `INSERT INTO respuestas_musica (
        usuario,
        seccion,

        obra_musical,
        cantidad_obra_musical_inter,
        ano_obra_musical_inter,
        cantidad_obra_musical_nal,
        ano_obra_musical_nal,

        obra_musical_premiada,
        cantidad_obra_musical_premiada_inter,
        ano_obra_musical_premiada_inter,
        cantidad_obra_musical_premiada_nal,
        ano_obra_musical_premiada_nal,

        premios_musica,
        cantidad_premios_musica_inter,
        ano_premios_musica_inter,
        cantidad_premios_musica_nal,
        ano_premios_musica_nal,

        interpretacion_musica,
        cantidad_interpretacion_musica_inter,
        ano_interpretacion_musica_inter,
        cantidad_interpretacion_musica_nal,
        ano_interpretacion_musica_nal
      )
      VALUES (
        $1, $2,
        $3, $4, $5, $6, $7, $8,
        $9, $10, $11, $12, $13,
        $14, $15, $16, $17, $18,
        $19, $20, $21, $22
      )`,
      [
        usuario,
        seccion,

        obraMusical,
        numeroONull(cantidadObraMusicalInter),
        numeroONull(anoObraMusicalInter),
        numeroONull(cantidadObraMusicalNal),
        numeroONull(anoObraMusicalNal),

        obraMusicalPremiada,
        numeroONull(cantidadObraMusicalPremiadaInter),
        numeroONull(anoObraMusicalPremiadaInter),
        numeroONull(cantidadObraMusicalPremiadaNal),
        numeroONull(anoObraMusicalPremiadaNal),

        premiosMusica,
        numeroONull(cantidadPremiosMusicaInter),
        numeroONull(anoPremiosMusicaInter),
        numeroONull(cantidadPremiosMusicaNal),
        numeroONull(anoPremiosMusicaNal),

        interpretacionMusica,
        numeroONull(cantidadInterpretacionMusicaInter),
        numeroONull(anoInterpretacionMusicaInter),
        numeroONull(cantidadInterpretacionMusicaNal),
        numeroONull(anoInterpretacionMusicaNal)
      ]
    );

    res.json({
      mensaje: `Respuestas de Música guardadas correctamente para ${usuario}`
    });

  } catch (error) {
    console.error("Error guardando respuestas de Música:", error);

    res.status(500).json({
      mensaje: "Error guardando respuestas de Música",
      detalle: error.message
    });
  }
});
//Descarga Musica
app.get("/descargar-musica", auth, async (req, res) => {
  try {
    if (req.session.usuario.rol !== "admin") {
      return res.status(403).send("Solo el administrador puede descargar");
    }

    const resultado = await pool.query(`
      SELECT *
      FROM respuestas_musica
      ORDER BY fecha ASC
    `);

    const workbook = new ExcelJS.Workbook();
    const hoja = workbook.addWorksheet("Música");

    hoja.columns = [
      { header: "Usuario", key: "usuario", width: 20 },
      { header: "Sección", key: "seccion", width: 25 },

      { header: "Obra musical", key: "obra_musical", width: 22 },

      { header: "Obra musical internacional", key: "cantidad_obra_musical_inter", width: 28 },
      { header: "Año obra musical internacional", key: "ano_obra_musical_inter", width: 30 },

      { header: "Obra musical nacional", key: "cantidad_obra_musical_nal", width: 24 },
      { header: "Año obra musical nacional", key: "ano_obra_musical_nal", width: 28 },


      { header: "Arreglos musicales", key: "obra_musical_premiada", width: 26 },

      { header: "Arreglos internacional", key: "cantidad_obra_musical_premiada_inter", width: 28 },
      { header: "Año arreglos internacional", key: "ano_obra_musical_premiada_inter", width: 30 },

      { header: "Arreglos nacional", key: "cantidad_obra_musical_premiada_nal", width: 24 },
      { header: "Año arreglos nacional", key: "ano_obra_musical_premiada_nal", width: 28 },

      { header: "Premios música", key: "premios_musica", width: 24 },

      { header: "Premios internacional", key: "cantidad_premios_musica_inter", width: 26 },
      { header: "Año premios internacional", key: "ano_premios_musica_inter", width: 28 },

      { header: "Premios nacional", key: "cantidad_premios_musica_nal", width: 24 },
      { header: "Año premios nacional", key: "ano_premios_musica_nal", width: 26 },

      { header: "Interpretación música", key: "interpretacion_musica", width: 30 },

      { header: "Interpretación internacional", key: "cantidad_interpretacion_musica_inter", width: 30 },
      { header: "Año interpretación internacional", key: "ano_interpretacion_musica_inter", width: 32 },

      { header: "Interpretación nacional", key: "cantidad_interpretacion_musica_nal", width: 28 },
      { header: "Año interpretación nacional", key: "ano_interpretacion_musica_nal", width: 30 },

      { header: "Fecha", key: "fecha", width: 25 }
    ];

    resultado.rows.forEach(row => {
      hoja.addRow(row);
    });

    hoja.getRow(1).font = { bold: true };

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );

    res.setHeader(
      "Content-Disposition",
      "attachment; filename=musica.xlsx"
    );

    await workbook.xlsx.write(res);
    res.end();

  } catch (error) {
    console.error("Error generando Excel de Música:", error);
    res.status(500).send("Error generando Excel de Música");
  }
});


// Guardar Comunicación Social y Periodismo
app.post("/guardar-comunicacion", auth, async (req, res) => {

  try {

    const {

      seccion,

      productoInvestigacion,
      cantidadProductoInvestigacionInter,
      anoProductoInvestigacionInter,
      cantidadProductoInvestigacionNal,
      anoProductoInvestigacionNal,
      cantidadProductoInvestigacionReg,
      anoProductoInvestigacionReg,

      productoComunicacion,
      cantidadProductoComunicacionInter,
      anoProductoComunicacionInter,
      cantidadProductoComunicacionNal,
      anoProductoComunicacionNal,
      cantidadProductoComunicacionReg,
      anoProductoComunicacionReg,

      premioPeriodismo,
      cantidadPremioPeriodismoInter,
      anoPremioPeriodismoInter,
      cantidadPremioPeriodismoNal,
      anoPremioPeriodismoNal,
      cantidadPremioPeriodismoReg,
      anoPremioPeriodismoReg

    } = req.body;

    const usuario = req.session.usuario.usuario;

    await pool.query(

      `INSERT INTO respuestas_comunicacion (

        usuario,
        seccion,

        producto_investigacion,
        cantidad_producto_investigacion_inter,
        ano_producto_investigacion_inter,
        cantidad_producto_investigacion_nal,
        ano_producto_investigacion_nal,
        cantidad_producto_investigacion_reg,
        ano_producto_investigacion_reg,

        producto_comunicacion,
        cantidad_producto_comunicacion_inter,
        ano_producto_comunicacion_inter,
        cantidad_producto_comunicacion_nal,
        ano_producto_comunicacion_nal,
        cantidad_producto_comunicacion_reg,
        ano_producto_comunicacion_reg,

        premio_periodismo,
        cantidad_premio_periodismo_inter,
        ano_premio_periodismo_inter,
        cantidad_premio_periodismo_nal,
        ano_premio_periodismo_nal,
        cantidad_premio_periodismo_reg,
        ano_premio_periodismo_reg

      )

      VALUES (

        $1, $2,

        $3, $4, $5, $6, $7, $8, $9,

        $10, $11, $12, $13, $14, $15, $16,

        $17, $18, $19, $20, $21, $22, $23

      )`,

      [

        usuario,
        seccion,

        productoInvestigacion,
        numeroONull(cantidadProductoInvestigacionInter),
        numeroONull(anoProductoInvestigacionInter),
        numeroONull(cantidadProductoInvestigacionNal),
        numeroONull(anoProductoInvestigacionNal),
        numeroONull(cantidadProductoInvestigacionReg),
        numeroONull(anoProductoInvestigacionReg),

        productoComunicacion,
        numeroONull(cantidadProductoComunicacionInter),
        numeroONull(anoProductoComunicacionInter),
        numeroONull(cantidadProductoComunicacionNal),
        numeroONull(anoProductoComunicacionNal),
        numeroONull(cantidadProductoComunicacionReg),
        numeroONull(anoProductoComunicacionReg),

        premioPeriodismo,
        numeroONull(cantidadPremioPeriodismoInter),
        numeroONull(anoPremioPeriodismoInter),
        numeroONull(cantidadPremioPeriodismoNal),
        numeroONull(anoPremioPeriodismoNal),
        numeroONull(cantidadPremioPeriodismoReg),
        numeroONull(anoPremioPeriodismoReg)

      ]

    );

    res.json({
      mensaje: `Respuestas de Comunicación guardadas correctamente para ${usuario}`
    });

  } catch (error) {

    console.error("Error guardando respuestas de Comunicación:", error);

    res.status(500).json({
      mensaje: "Error guardando respuestas de Comunicación",
      detalle: error.message
    });

  }

});

// Descargar Comunicación
app.get("/descargar-comunicacion", auth, async (req, res) => {

  try {

    if (req.session.usuario.rol !== "admin") {
      return res.status(403).send("Solo el administrador puede descargar");
    }

    const resultado = await pool.query(`
      SELECT *
      FROM respuestas_comunicacion
      ORDER BY fecha ASC
    `);

    const workbook = new ExcelJS.Workbook();

    const hoja = workbook.addWorksheet("Comunicación");

    hoja.columns = [

      { header: "Usuario", key: "usuario", width: 20 },
      { header: "Sección", key: "seccion", width: 25 },

      { header: "Producto investigación", key: "producto_investigacion", width: 30 },

      { header: "Investigación internacional", key: "cantidad_producto_investigacion_inter", width: 30 },
      { header: "Año investigación internacional", key: "ano_producto_investigacion_inter", width: 32 },

      { header: "Investigación nacional", key: "cantidad_producto_investigacion_nal", width: 28 },
      { header: "Año investigación nacional", key: "ano_producto_investigacion_nal", width: 30 },

      { header: "Investigación regional", key: "cantidad_producto_investigacion_reg", width: 28 },
      { header: "Año investigación regional", key: "ano_producto_investigacion_reg", width: 30 },


      { header: "Producto comunicación", key: "producto_comunicacion", width: 30 },

      { header: "Comunicación internacional", key: "cantidad_producto_comunicacion_inter", width: 30 },
      { header: "Año comunicación internacional", key: "ano_producto_comunicacion_inter", width: 32 },

      { header: "Comunicación nacional", key: "cantidad_producto_comunicacion_nal", width: 28 },
      { header: "Año comunicación nacional", key: "ano_producto_comunicacion_nal", width: 30 },

      { header: "Comunicación regional", key: "cantidad_producto_comunicacion_reg", width: 28 },
      { header: "Año comunicación regional", key: "ano_producto_comunicacion_reg", width: 30 },


      { header: "Premio periodismo", key: "premio_periodismo", width: 28 },

      { header: "Premio internacional", key: "cantidad_premio_periodismo_inter", width: 28 },
      { header: "Año premio internacional", key: "ano_premio_periodismo_inter", width: 30 },

      { header: "Premio nacional", key: "cantidad_premio_periodismo_nal", width: 26 },
      { header: "Año premio nacional", key: "ano_premio_periodismo_nal", width: 28 },

      { header: "Premio regional", key: "cantidad_premio_periodismo_reg", width: 26 },
      { header: "Año premio regional", key: "ano_premio_periodismo_reg", width: 28 },

      { header: "Fecha", key: "fecha", width: 25 }

    ];

    resultado.rows.forEach(row => {
      hoja.addRow(row);
    });

    hoja.getRow(1).font = { bold: true };

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );

    res.setHeader(
      "Content-Disposition",
      "attachment; filename=comunicacion.xlsx"
    );

    await workbook.xlsx.write(res);

    res.end();

  } catch (error) {

    console.error("Error generando Excel de Comunicación:", error);

    res.status(500).send("Error generando Excel de Comunicación");

  }

});


// Cerrar sesión
app.post("/logout", auth, (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({
        mensaje: "Error cerrando sesión"
      });
    }

    res.clearCookie("connect.sid");

    res.json({
      mensaje: "Sesión cerrada"
    });
  });
});

// Puerto para local y Render
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor funcionando en puerto ${PORT}`);
});
