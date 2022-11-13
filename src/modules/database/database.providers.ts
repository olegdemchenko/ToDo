import * as mongoose from 'mongoose';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.connect(
        'mongodb+srv://OlehDemchenko:df204!KDIHD_+__SD12@cluster0.9fwn6bm.mongodb.net/?retryWrites=true&w=majority',
      ),
  },
];
