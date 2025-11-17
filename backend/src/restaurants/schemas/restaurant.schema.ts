import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type RestaurantDocument = HydratedDocument<Restaurant>;

@Schema({ collection: 'restaurants' })
export class Restaurant {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  restaurant_id: string;

  @Prop({ required: true })
  borough: string;

  @Prop({ required: true })
  cuisine: string;

  @Prop({
    type: {
      building: { type: String, required: true },
      coord: { type: [Number], required: true },
      street: { type: String, required: true },
      zipcode: { type: String, required: true },
    },
    required: true,
  })
  address: {
    building: string;
    coord: [number, number];
    street: string;
    zipcode: string;
  };

  @Prop({
    type: [
      {
        date: { type: Date },
        grade: { type: String },
        score: { type: Number },
      },
    ],
    default: [],
  })
  grades: Array<{
    date: Date;
    grade: string;
    score: number;
  }>;
}

export const RestaurantSchema = SchemaFactory.createForClass(Restaurant);
