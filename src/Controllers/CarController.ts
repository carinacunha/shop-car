import { RequestHandler } from 'express';
import { isValidObjectId } from 'mongoose';
import CarService from '../Services/CarService';

export default class CarController {
  constructor(private _serviceCar = new CarService()) {}

  public create: RequestHandler = async (req, res) => {
    const newCar = await this._serviceCar.create(req.body);
    return res.status(201).json(newCar);
  };

  public getAll: RequestHandler = async (_req, res) => {
    const cars = await this._serviceCar.listAll();
    return res.status(200).json(cars);
  };

  public getById: RequestHandler = async (req, res) => {
    const { id } = req.params;
    const { status, message, car } = await this._serviceCar.findById(id);
    if (car) return res.status(status).json(car);
    return res.status(status).json({ message });
  };

  public updateById: RequestHandler = async (req, res) => {
    const { id } = req.params;
    const { body } = req;

    if (!isValidObjectId(id)) {
      return res.status(422).json({ message: 'Invalid mongo id' });
    }

    const carUpdated = await this._serviceCar.updateById(id, body);
    if (carUpdated) {
      return res.status(200).json(carUpdated);
    } return res.status(404).json({ message: 'Car not found' });
  };
}