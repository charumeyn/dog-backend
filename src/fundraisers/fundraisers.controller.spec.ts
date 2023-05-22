import { Test, TestingModule } from '@nestjs/testing';
import { FundraisersController } from './fundraisers.controller';
import { FundraisersService } from './fundraisers.service';

describe('FundraisersController', () => {
  let controller: FundraisersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FundraisersController],
      providers: [FundraisersService],
    }).compile();

    controller = module.get<FundraisersController>(FundraisersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
