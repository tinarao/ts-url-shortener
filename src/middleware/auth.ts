import { verify } from "hono/jwt";
import { Context, Next } from "hono";

export const authMiddleware = async (c: Context, next: Next) => {
  try {
    const t = c.req.header("Authorization");
    if (!t) {
      c.status(401);
      return c.json({ message: "Unauthorized" });
    }

    const token = t.split("").splice(7).join("");

    try {
      const decoded = await verify(token, process.env.SECRET!);

      /*
                const user = database.find({ where: { id: decoded.id }})
                if (!user) return err
                
                await next()
            */

      await next();
    } catch (error) {
      // wrong token scenario
      c.status(401);
      return c.json({ message: "Unauthorized" });
    }
  } catch (error) {
    console.error(error);
    c.status(500);
    return c.json({ message: "Internal server error" });
  }
};
