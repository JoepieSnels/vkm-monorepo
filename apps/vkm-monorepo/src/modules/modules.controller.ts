import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ModulesService } from './modules.service';
import { ModuleEntity } from '@shared/shared/Domain/entities/module.domain';

@Controller('modules')
export class ModulesController {
  constructor(private readonly modulesService: ModulesService) {} // concrete class

  @Get()
  async findAll(): Promise<ModuleEntity[]> {
    const modules = await this.modulesService.getAllModules();
    const sorted = modules.sort((a, b) => a.name.localeCompare(b.name));
    return sorted;
  }

  @Post()
  async create(@Body() data: Partial<ModuleEntity>): Promise<ModuleEntity> {
    return this.modulesService.createModule(data);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() data: Partial<ModuleEntity>,
  ): Promise<ModuleEntity | null> {
    return this.modulesService.updateModule(id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<ModuleEntity | null> {
    return this.modulesService.deleteModule(id);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ModuleEntity | null> {
    return this.modulesService.getModuleById(id);
  }
}
