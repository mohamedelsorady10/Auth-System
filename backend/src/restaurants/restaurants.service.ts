import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Restaurant, RestaurantDocument } from './schemas/restaurant.schema';

@Injectable()
export class RestaurantsService {
  constructor(
    @InjectModel(Restaurant.name) private restaurantModel: Model<RestaurantDocument>,
  ) {}

  async findAll(): Promise<Restaurant[]> {
    return this.restaurantModel.find().limit(100).exec();
  }

  async findById(id: string): Promise<Restaurant | null> {
    return this.restaurantModel.findById(id).exec();
  }

  async search(query: string): Promise<Restaurant[]> {
    const searchRegex = new RegExp(query, 'i');

    return this.restaurantModel
      .find({
        $or: [
          { name: searchRegex },
          { cuisine: searchRegex },
          { borough: searchRegex },
          { 'address.street': searchRegex },
        ],
      })
      .limit(20)
      .exec();
  }

  async findByCuisine(cuisine: string): Promise<Restaurant[]> {
    return this.restaurantModel.find({ cuisine: new RegExp(cuisine, 'i') }).limit(20).exec();
  }

  async findByBorough(borough: string): Promise<Restaurant[]> {
    return this.restaurantModel.find({ borough: new RegExp(borough, 'i') }).limit(20).exec();
  }
}
