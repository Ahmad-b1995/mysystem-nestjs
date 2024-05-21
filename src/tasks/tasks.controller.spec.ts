import { Test, TestingModule } from '@nestjs/testing';
import { TasksController } from './tasks.controller'; // Update import
import { TasksService } from './tasks.service'; // Update import

describe('TaskController', () => {
  // Update describe block
  let controller: TasksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController], // Update controller
      providers: [TasksService], // Update provider
    }).compile();

    controller = module.get<TasksController>(TasksController); // Update controller
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
