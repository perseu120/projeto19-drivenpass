import { Router } from "express";
import { createCredentialController } from "../controllers/credentialsControllers";
import { validateTokenJWT } from "../middlewares/authToken";


const credentialsRouter = Router();

credentialsRouter.post("/credentials",validateTokenJWT, createCredentialController);
credentialsRouter.get("/credentials/:id",getCredentialIdController);
// credentialsRouter.get("/credentials",getCredentials)
// credentialsRouter.delete("/credentials/:id",deleteCredential)
export default credentialsRouter;
