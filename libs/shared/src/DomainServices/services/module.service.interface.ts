import { ModuleEntity } from '../../Domain/entities/module.domain';

export interface IModuleService {
  getAllModules(): Promise<ModuleEntity[]>;
  createModule(data: any): Promise<ModuleEntity>;
  updateModule(id: string, data: any): Promise<ModuleEntity | null>;
  deleteModule(id: string): Promise<ModuleEntity | null>;
  getModuleById(id: string): Promise<ModuleEntity | null>;
}
