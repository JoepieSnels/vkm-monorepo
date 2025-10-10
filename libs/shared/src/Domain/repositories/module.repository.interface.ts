import { ModuleEntity } from '../entities/module.domain';

export interface IModuleRepository {
  findById(id: string): Promise<ModuleEntity | null>;
  findAll(): Promise<ModuleEntity[]>;
  create(module: ModuleEntity): Promise<ModuleEntity>;
  update(
    id: string,
    module: Partial<ModuleEntity>,
  ): Promise<ModuleEntity | null>;
  delete(id: string): Promise<ModuleEntity | null>;
}
