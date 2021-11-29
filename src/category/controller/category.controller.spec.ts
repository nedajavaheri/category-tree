import { Test, TestingModule } from '@nestjs/testing';
import { CategoryDto } from '../dto';
import { CategoryService } from '../service';
import { CategoryController } from './category.controller';


describe('CategoryController', () => {
  let controller: CategoryController;
  let service: CategoryService;
  const testCategory1 = 'Test Category 1';


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({

      controllers: [CategoryController],
      providers: [
        {
          provide: CategoryService,
          useValue: {
            getAll: jest.fn().mockResolvedValue([
              { name: testCategory1, id: 1 },
              { name: 'Test Category 2', id: 2 },
              { name: 'Test Category 3', id: 3 },
            ]),
            getOne: jest.fn().mockImplementation((id: number) =>
              Promise.resolve({
                name: testCategory1,
                id,
              }),
            ),
            insertOne: jest
              .fn()
              .mockImplementation((category: CategoryDto) =>
                Promise.resolve({ id: 1, ...category }),
              ),
            deleteOne: jest.fn().mockResolvedValue({ deleted: true }),
          },
        },
      ],
    }).compile();

    controller = module.get<CategoryController>(CategoryController);
    service = module.get<CategoryService>(CategoryService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });


  // describe('getCategories', () => {
  //   it('should get an array of categories', async () => {
  //     await expect(controller.find()).resolves.toEqual([
  //       {
  //         name: testCategory1,
  //         id: 1
  //       },
  //       {
  //         name: 'Test Category 2',
  //         id: 2
  //       },
  //       {
  //         name: 'Test Category 3',
  //         id: 3
  //       },
  //     ]);
  //   });
  // });
  // describe('getByParentId', () => {
  //   it('should get an array of categories start with parent id', async () => {
  //     await expect(controller.find(1)).resolves.toEqual({
  //       name: testCategory1,
  //       id: 1,
  //     });
  //     await expect(controller.find(2)).resolves.toEqual({
  //       name: testCategory1,
  //       id: 2,
  //     });
  //   });
  // });

  // describe('newCategory', () => {
  //   it('should create a new category', async () => {
  //     const newCatDTO: CategoryDto = {
  //       name: 'New Category 1',
  //     };
  //     await expect(controller.create(newCatDTO)).resolves.toEqual({
  //       id: 1,
  //       ...newCatDTO,
  //     });
  //   });
  // });

  // describe('deleteCategory', () => {
  //   it('should return that it deleted a category', async () => {
  //     await expect(controller.delete(1)).resolves.toEqual(
  //       {
  //         deleted: true,
  //       },
  //     );
  //   });
  //   it('should return that it did not delete a category', async () => {
  //     const deleteSpy = jest
  //       .spyOn(service, 'delete')
  //       .mockResolvedValueOnce({ deleted: false });
  //     await expect(
  //       controller.delete(5),
  //     ).resolves.toEqual({ deleted: false });
  //     expect(deleteSpy).toBeCalledWith(5);
  //   });
  // });
});
