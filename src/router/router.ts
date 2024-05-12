import { Hono } from 'hono';
import { 
    deleteAllLinks, 
    getLinkInfo, 
    redirect, 
    shorten 
} from '../handlers/shortener.controller';
import { authMiddleware } from '../middleware/auth';
import { logger } from 'hono/logger'

export const routerSetup = async (app: Hono) => {
    
    app.use(logger())
    app.use("/all", authMiddleware)
    app.use("/info/*", authMiddleware)

    app.get("/:alias", redirect)
    app.get("/info/:alias", getLinkInfo)
    
    app.post("/shorten", shorten)

    app.delete("/all", deleteAllLinks)

}