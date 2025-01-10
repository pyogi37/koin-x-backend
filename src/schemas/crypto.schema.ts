import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CryptoDocument = HydratedDocument<Crypto>;

@Schema({ timestamps: true }) 
export class Crypto {
  @Prop({ required: true })
  coin: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  marketCap: number;

  @Prop({ required: true })
  change24h: number;
}

export const CryptoSchema = SchemaFactory.createForClass(Crypto);
