import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppointmentsModule } from './appointments/appointments.module';
import { Appointment } from './appointments/entities/appointment.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST || 'postgres_db',
      port: parseInt(process.env.DATABASE_PORT || '5432', 10),
      username: process.env.DATABASE_USER || 'taller_user',
      password: process.env.DATABASE_PASSWORD || 'taller_pass',
      database: process.env.DATABASE_NAME || 'taller_db',
      entities: [Appointment],
      synchronize: true,
    }),
    AppointmentsModule,
  ],
})
export class AppModule {}