import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum AppointmentStatus {
  PENDING = 'PENDIENTE',
  IN_PROGRESS = 'EN_PROCESO',
  COMPLETED = 'COMPLETADO',
  CANCELLED = 'CANCELADO',
}

@Entity('appointments')
export class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'client_name', length: 100 })
  clientName: string;

  @Column({ name: 'client_phone', length: 20 })
  clientPhone: string;

  @Column({ name: 'vehicle_plate', length: 10 })
  vehiclePlate: string;

  @Column({ name: 'vehicle_model', length: 50 })
  vehicleModel: string;

  @Column({ name: 'service_type', length: 100 })
  serviceType: string;

  @Column({ type: 'timestamp' })
  appointmentDate: Date;

  @Column({
    type: 'enum',
    enum: AppointmentStatus,
    default: AppointmentStatus.PENDING,
  })
  status: AppointmentStatus;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}