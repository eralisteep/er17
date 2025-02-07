const {Device, DeviceInfo} = require('../models/models')
const ApiError = require('../error/ApiError');

class DeviceController {
    async create(req, res, next) {
        try {
            let {name, brandId, info} = req.body
            const device = await Device.create({name, brandId});

            if (info) {
                info = JSON.parse(info)
                info.forEach(i =>
                    DeviceInfo.create({
                        title: i.title,
                        count: i.count,
                        description1: i.description1,
                        description2: i.description2,
                        description3: i.description3,
                        description4: i.description4,
                        deviceId: device.id
                    })
                )
            }

            return res.json(device)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }

    }

    async getAll(req, res) {
        let {brandId} = req.query
        let devices;
        if (!brandId) {
            devices = await Device.findAndCountAll()
        }
        if (brandId) {
            devices = await Device.findAndCountAll({where:{brandId}})
        }
        return res.json(devices)
    }

    async getOne(req, res) {
        const {id} = req.params
        const device = await Device.findOne(
            {
                where: {id},
                include: [{model: DeviceInfo, as: 'info'}]
            },
        )
        return res.json(device)
    }

}

module.exports = new DeviceController()
