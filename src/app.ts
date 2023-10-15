import express from "express";
import cors from "cors";
import "dotenv/config";
import { userRoutes } from "./user/infraestructure/userRoutes";
import { publicRoutes } from "./Publication/infraestructure/publicRoutes";
import { reactionRoutes } from "./Reactions/infraestructure/reactionRoutes";
import { commnetRoutes } from "./comment/infraestructure/commentsRoutes";

import * as admin from "firebase-admin";
import { Bucket } from "@google-cloud/storage";
import * as serviceAccount from "./Publication/movil-red-social-firebase-adminsdk-4g1rg-93651aacf0.json"
import fileUpload from 'express-fileupload';



const app = express();


// Ruta al archivo de credenciales

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  storageBucket: "gs://movil-red-social.appspot.com"
});


app.use(cors());
app.use(express.json());
app.use(fileUpload());
app.use(express.urlencoded({ extended: true }));


app.use('/api/v1/user', userRoutes);
app.use('/api/v1/public', publicRoutes);
app.use('/api/v1/reaction', reactionRoutes);
app.use('/api/v1/comment', commnetRoutes);

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Corriendo en el puerto ${port}`);
});
