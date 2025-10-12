import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ModuleEntity } from '@shared/shared/Domain/entities/module.domain';
import { ModuleDocument, ModuleSchema } from '../schemas/module.schema';
import { IModuleRepository } from '@shared/shared/DomainServices/repositories/module.repository.interface';

@Injectable()
export class ModuleRepository implements IModuleRepository {
  constructor(
    @InjectModel('Module') private readonly model: Model<ModuleDocument>,
  ) {}

  async findAll(): Promise<ModuleEntity[]> {
    const modules = await this.model.find().lean().exec();
    return modules as ModuleEntity[];
  }

  async findById(id: string): Promise<ModuleEntity | null> {
    const module = await this.model.findById(id).lean().exec();
    return module as ModuleEntity | null;
  }

  async create(data: Partial<ModuleEntity>): Promise<ModuleEntity> {
    const created = await this.model.create(data);
    return created.toObject() as ModuleEntity;
  }

  async update(
    id: string,
    data: Partial<ModuleEntity>,
  ): Promise<ModuleEntity | null> {
    const updated = await this.model
      .findByIdAndUpdate(id, data, { new: true })
      .lean()
      .exec();
    return updated as ModuleEntity | null;
  }

  async delete(id: string): Promise<ModuleEntity | null> {
    const deleted = await this.model.findByIdAndDelete(id).lean().exec();
    return deleted as ModuleEntity | null;
  }
}
