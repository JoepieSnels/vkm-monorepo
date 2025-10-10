import { Test, TestingModule } from '@nestjs/testing';
import { ModulesController } from './modules.controller';
// Ensure Jest is used for assertions
import { expect } from '@jest/globals';

describe('ModulesController', () => {
  let controller: ModulesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ModulesController],
    }).compile();

    controller = module.get<ModulesController>(ModulesController);
    it('should be defined', () => {
      // Use Jest's expect function for assertion
      expect(controller).toBeDefined();
    });
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
