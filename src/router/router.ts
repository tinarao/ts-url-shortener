import { Hono } from 'hono';
import { 
    deleteAllLinks, 
    getLinkInfo, 
    redirect, 
    shorten 
} from '../handlers/shortener.controller';

export const routerSetup = async (app: Hono) => {

    app.get("/:alias", redirect)
    app.get("/info/:alias", getLinkInfo)
    
    app.post("/shorten", shorten)

    app.delete("/all", deleteAllLinks)

}