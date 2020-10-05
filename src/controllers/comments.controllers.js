const path = require('path');
const { v4: uuid } = require('uuid');
const fse = require('fs-extra');

const commentsControllers = {}

const Comments = require('../models/Comment');
const User = require('../models/User');

commentsControllers.renderComments = async (req, res) => {
   const listComments = await Comments.find().lean().sort({createdAt: 'desc'});
   // res.send(listComments);

   res.render('comments/index', {
      listComments
   });
}

commentsControllers.renderCommentsNew = async (req, res) => {
   // console.log(req.body);
   const {
      user, username, comentario, profile
   } = req.body;
   
   const newComments = new Comments({
      usuario: user, username: username, comentario: comentario, profile: profile
   });
   // console.log(newComments);

   await newComments.save();

   req.flash('success_msg', 'Comentario enviado con éxito...');
   res.redirect('/user');
}

// Ruta Profile
commentsControllers.renderProfilePhoto = async (req, res) => {
   // console.log(req.file);
   // console.log(req.body);
   // Utilizaremos la recursión, una función que se llama así misma

   const updateIMG = async () => {

      const { userProfile } = req.body;
      const userDates = await User.findOne({ user: userProfile }).lean();
      // console.log(userDates.profile);
      // Extensión de la imagen
      const extProfileOri = path.extname(userDates.profile).toLowerCase();
      // console.log(extProfileOri);

      if (extProfileOri === '.svg') {
         const imgUrl = uuid();
         const extPhoto = path.extname(req.file.originalname).toLowerCase();
         const imgName = imgUrl + extPhoto;
         const verIMG = await User.find({ profile: imgName }).lean();

         if (verIMG.length > 0) {
            updateIMG();
         } else {
            const tempPathPhoto = req.file.path;
            const sizePhoto = req.file.size;
            const targetPhoto = path.resolve(`src/public/upload/${imgUrl}${extPhoto}`);
   
            if (extPhoto === '.jpg' || extPhoto === '.jpeg' || extPhoto === '.png') {
            // if (extPhoto === '.jpg') {
               if (sizePhoto < 2000000) {
                  await fse.copy(tempPathPhoto, targetPhoto);
   
                  const { userProfile } = req.body;
                  const photoProfile = await User.findOne({ user: userProfile });
                  photoProfile.profile = imgName;
                  photoProfile.save();

                  await Comments.update({usuario: userProfile}, { $set: { profile: imgName}}, {multi: true});
                  
                  req.flash('success_msg', 'Foto de perfil guardada con éxito...');
               } else {
                  await fse.unlink(tempPathPhoto);
                  req.flash('error_msg', 'Tamaño de archivo no válido. Debe de ser menor a 2MB...');
               }
            } else {
               await fse.unlink(tempPathPhoto);    // Eliminar el file *-*temp en caso de que no sea correcto...
               req.flash('error_msg', 'Extensión de archivos no válido. Selecciona el archivo válido y envialo de nuevo...');
            }
            res.redirect('/user');
         }
      } else {
         // Nombre de la imagen
         const nameProfileOri = path.basename(userDates.profile, extProfileOri);
         // console.log(nameProfileOri);
         const imgUrl = nameProfileOri;
         const extPhoto = path.extname(req.file.originalname).toLowerCase();
         const imgName = imgUrl + extPhoto;

         const tempPathPhoto = req.file.path;
         const sizePhoto = req.file.size;
         const targetPhoto = path.resolve(`src/public/upload/${imgUrl}${extPhoto}`);

         if (extPhoto === '.jpg' || extPhoto === '.jpeg' || extPhoto === '.png') {
         // if (extPhoto === '.jpg') {
            if (sizePhoto < 2000000) {
               await fse.copy(tempPathPhoto, targetPhoto);

               const { userProfile } = req.body;
               const photoProfile = await User.findOne({ user: userProfile });
               photoProfile.profile = imgName;
               photoProfile.save();

               await Comments.update({usuario: userProfile}, { $set: { profile: imgName}}, {multi: true});
               
               req.flash('success_msg', 'Foto de perfil guardada con éxito...');
            } else {
               await fse.unlink(tempPathPhoto);
               req.flash('error_msg', 'Tamaño de archivo no válido. Debe de ser menor a 2MB...');
            }
         } else {
            await fse.unlink(tempPathPhoto);
            req.flash('error_msg', 'Extensión de archivos no válido. Selecciona solo archivos .jpg...');
         }
         res.redirect('/user');
      }
   }

   updateIMG();
}

module.exports = commentsControllers;