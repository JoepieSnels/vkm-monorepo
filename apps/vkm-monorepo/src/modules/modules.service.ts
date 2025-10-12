import { Injectable } from '@nestjs/common';
import { ModuleEntity } from '@shared/shared/Domain/entities/module.domain';
import { ModuleRepository } from '@shared/shared/Infrastructure/repositories/module.repository';
import { IModuleService } from '@shared/shared/DomainServices/services/module.service.interface';

@Injectable()
export class ModulesService implements IModuleService {
  constructor(private readonly repository: ModuleRepository) {}

  async getAllModules(): Promise<ModuleEntity[]> {
    return this.repository.findAll();
  }

  async getModuleById(id: string): Promise<ModuleEntity | null> {
    return this.repository.findById(id);
  }

  async createModule(data: Partial<ModuleEntity>): Promise<ModuleEntity> {
    return this.repository.create(data);
  }

  async updateModule(
    id: string,
    data: Partial<ModuleEntity>,
  ): Promise<ModuleEntity | null> {
    return this.repository.update(id, data);
  }

  async deleteModule(id: string): Promise<ModuleEntity | null> {
    return this.repository.delete(id);
  }
}
