const Publicacion = require('../models/Publicacion');
const Usuario = require('../models/Usuario');
const Seguimiento = require('../models/Seguimiento'); 
const { Op } = require('sequelize');
const Valoracion = require('../models/Valoracion');
const Etiqueta = require('../models/Etiqueta');
const usuarioController = require('./usuario.controller');
const Comentario = require('../models/Comentario');
const Coleccion = require('../models/Coleccion');

const procesarPublicaciones = (publicaciones, req) => {
  publicaciones.forEach(p => {
    p.listaImagenes = p.imagen ? p.imagen.split(',') : [];
    if (!req.session.usuario && p.licencia === 'copyright') {
      p.listaImagenes = []; p.mensajeInvitado = 'Debes registrarte para ver esta imagen';
    }
    const valoraciones = p.Valoracions || [], cantidadVotos = valoraciones.length;
    const suma = valoraciones.reduce((acc, v) => acc + v.puntaje, 0);
    const promedio = cantidadVotos ? (suma / cantidadVotos).toFixed(1) : 0;
    p.promedio = promedio; p.cantidadVotos = cantidadVotos; p.score = Number(promedio) + (cantidadVotos * 0.2);
  });
};

exports.feed = async (req, res) => {
  const busqueda = req.query.q || '';
  const whereClause = busqueda ? { [Op.or]: [
    { titulo: { [Op.iLike]: `%${busqueda}%` } },
    { descripcion: { [Op.iLike]: `%${busqueda}%` } },
    { '$Usuario.nombre$': { [Op.iLike]: `%${busqueda}%` } },
    { '$Etiquetas.nombre$': { [Op.iLike]: `%${busqueda}%` } }
  ]} : {};
  let publicaciones = await Publicacion.findAll({
    include: [Usuario, { model: Comentario, include: [Usuario] }, Valoracion, Etiqueta],
    where: whereClause, order: [['id','DESC']]
  });
  procesarPublicaciones(publicaciones, req);
  const destacadas = publicaciones.filter(p=>p.cantidadVotos>=3&&p.promedio>=3.5).sort((a,b)=>b.score-a.score);
  let normales = publicaciones.filter(p=>!(p.cantidadVotos>=3&&p.promedio>=3.5)).sort(()=>Math.random()-0.5);
  if (req.session.lastPubId && !normales.find(p=>p.id==req.session.lastPubId)) {
    const pub = await Publicacion.findByPk(req.session.lastPubId,{include:[Usuario,{model:Comentario,include:[Usuario]},Valoracion,Etiqueta]});
    if (pub) normales.unshift(pub);
  }
  const publicacionesHome = [...destacadas,...normales];
  const colecciones = req.session.usuario ? await Coleccion.findAll({where:{usuarioId:req.session.usuario.id}}) : [];
  res.render('feed/index',{publicaciones:publicacionesHome,usuario:req.session.usuario||null,colecciones});
};

exports.formCrear = (req,res)=>!req.session.usuario?res.redirect('/auth/login'):res.render('feed/crear');

exports.crear = async (req,res)=>{
  try {
    const imagenes = req.files?req.files.map(a=>a.filename):[];
    const publicacion = await Publicacion.create({
      titulo:req.body.titulo, descripcion:req.body.descripcion, imagen:imagenes.join(','),
      licencia:req.body.licencia, marcaAgua:!!req.body.marcaAgua, textoMarcaAgua:req.body.textoMarcaAgua,
      usuarioId:req.session.usuario.id
    });
    if (req.body.etiquetas) {
      for (const nombre of req.body.etiquetas.split(',').map(e=>e.trim())) {
        let etiqueta = await Etiqueta.findOne({where:{nombre}}) || await Etiqueta.create({nombre});
        await publicacion.addEtiqueta(etiqueta);
      }
    }
    req.session.lastPubId = publicacion.id; res.redirect('/feed');
  } catch(e){console.log(e);res.send('Error al publicar');}
};

exports.toggleComentarios = async (req,res)=>{
  try {
    const p = await Publicacion.findByPk(req.params.id);
    if (!p) return res.send('Publicacion no encontrada');
    if (p.usuarioId!==req.session.usuario.id) return res.send('No autorizado');
    p.comentariosCerrados=!p.comentariosCerrados; await p.save();
    req.session.lastPubId=p.id; res.redirect('/feed');
  } catch(e){console.log(e);res.send('Error al cambiar estado de comentarios');}
};

exports.feedSiguiendo = async (req,res)=>{
  try {
    const idsSeguidos = (await Seguimiento.findAll({where:{seguidorId:req.session.usuario.id}})).map(s=>s.seguidoId);
    const publicaciones = await Publicacion.findAll({
      include:[Usuario,{model:Comentario,include:[Usuario]},Valoracion,Etiqueta],
      where:{usuarioId:idsSeguidos}, order:[['id','DESC']]
    });
    procesarPublicaciones(publicaciones,req);
    res.render('feed/siguiendo',{publicaciones,usuario:req.session.usuario});
  } catch(e){console.log(e);res.send('Error al cargar feed de siguiendo');}
};

exports.eliminar = async (req,res)=>{
  try {
    const p = await Publicacion.findByPk(req.params.id);
    if (!p) return res.send('Publicación no encontrada');
    if (p.usuarioId!==req.session.usuario.id) return res.send('No autorizado');
    await Publicacion.destroy({where:{id:req.params.id}});
    req.session.lastPubId=null; res.redirect('/feed');
  } catch(e){console.log(e);res.send('Error al eliminar publicación');}
};
