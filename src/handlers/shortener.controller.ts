import { Context } from "hono"
import Link from "../models/Link"
import { isValidHttpUrl } from "../helpers/validator"

export const shorten = async (c: Context) => {
    try {
        const { link, alias } = await c.req.json()

        if (!link) {
            c.status(400)
            return c.json({ "message": "Ссылка отсутствует" })
        }

        if (!alias) {
            c.status(400)
            return c.json({ "message": "Название отсутствует. Добавим генерацию" })
        }

        if (link.length <= 4) {
            c.status(400)
            return c.json({ "message": "Слишком короткая ссылка" })
        }

        const isValidUrl = isValidHttpUrl(link)
        if (!isValidUrl) {
            c.status(400)
            return c.json({ "message": "Ссылка невалидна" })
        }

        const duplicate = await Link.findOne({ alias: alias })
        if (!!duplicate) {
            return c.json({ "message": "Ссылка с таким названием уже существует" })
        }

        // authorID === sender.IP maybe???
        const doc = await Link.create({ alias: alias, link: link, authorID: "admin" })
        c.status(201)
        return c.json({ doc })
    } catch (error) {
        console.error(error)
        c.status(500)

        // logging

        c.json({ "message": "Внутренняя ошибка сервера" })
    }
}

export const getLinkInfo = async (c: Context) => {
    try {
        const alias = c.req.param("alias")

        const link = await Link.findOne({ alias: alias })
        if (!link) {
            c.status(404)
            return c.json({ "message": "Ссылка не существует" })
        }

        c.status(200)
        return c.json({ link })
    } catch (error) {
        console.error(error)
        c.status(500)

        // logging

        c.json({ "message": "Внутренняя ошибка сервера" })
    }

}

export const redirect = async (c: Context) => {

    const alias = c.req.param("alias")

    const link = await Link.findOne({ alias: alias })
    if (!link) {
        c.status(404);
        return c.json({ "message": "Ссылка не найдена" })
    }

    return c.redirect(link.link)

    // return c.json({ alias, "link": link.link })
}

export const deleteAllLinks = async (c: Context) => {
    try {
        const deletedLinks = await Link.deleteMany()

        return c.json({ "message": "Удалено", deletedLinks })
    } catch (error) {
        console.error(error)
        c.status(500)

        // logging

        c.json({ "message": "Внутренняя ошибка сервера" })
    }
}