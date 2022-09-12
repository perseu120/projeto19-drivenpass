import { Router } from "express";
import { createCredentialController, getCredentialIdController, getCredentialsController } from "../controllers/credentialsControllers";
import { validateTokenJWT } from "../middlewares/authToken";


const credentialsRouter = Router();

credentialsRouter.post("/credentials",validateTokenJWT, createCredentialController);
credentialsRouter.get("/credentials/:id",getCredentialIdController);
credentialsRouter.get("/credentials",getCredentialsController);
// credentialsRouter.delete("/credentials/:id",deleteCredential)
export default credentialsRouter;
