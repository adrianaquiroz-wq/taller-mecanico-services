import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Appointment } from './entities/appointment.entity';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectRepository(Appointment)
    private readonly appointmentRepository: Repository<Appointment>,
  ) {}

  async create(createDto: CreateAppointmentDto): Promise<Appointment> {
    const appointment = this.appointmentRepository.create({
      ...createDto,
      appointmentDate: new Date(createDto.appointmentDate),
    });
    return await this.appointmentRepository.save(appointment);
  }

  async findAll(): Promise<Appointment[]> {
    return await this.appointmentRepository.find({
      order: { appointmentDate: 'ASC' },
    });
  }

  async findOne(id: string): Promise<Appointment> {
    const appointment = await this.appointmentRepository.findOneBy({ id });
    if (!appointment) {
      throw new NotFoundException(`Cita con ID "${id}" no encontrada`);
    }
    return appointment;
  }

  async update(id: string, updateDto: UpdateAppointmentDto): Promise<Appointment> {
    const appointment = await this.findOne(id);
    Object.assign(appointment, updateDto);
    if (updateDto.appointmentDate) {
      appointment.appointmentDate = new Date(updateDto.appointmentDate);
    }
    return await this.appointmentRepository.save(appointment);
  }

  async remove(id: string): Promise<{ message: string }> {
    const appointment = await this.findOne(id);
    await this.appointmentRepository.remove(appointment);
    return { message: `Cita con ID "${id}" eliminada exitosamente` };
  }
}