import { Test, TestingModule } from '@nestjs/testing';
import { CategoryService } from './category.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TreeRepository, Repository } from 'typeorm';
import { Category } from '../entity/category.entity';
import { CategoryDto } from '../dto';

describe('CategoryService', () => {
  let service: CategoryService;
  let repository: Repository<Category>;
  const testCategory1 = 'Test Category 1';

  const categoryArray = [
    new CategoryDto(1, testCategory1),
    new CategoryDto(2, 'Test Category 2'),
    new CategoryDto(3, 'Test Category 3'),
  ];

  const oneCategory = new CategoryDto(4, testCategory1);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoryService,
        {
          provide: getRepositoryToken(Category),

          useValue: {
            find: jest.fn().mockResolvedValue(categoryArray),
            findOneOrFail: jest.fn().mockResolvedValue(oneCategory),
            create: jest.fn().mockReturnValue(oneCategory),
            save: jest.fn(),
            delete: jest.fn().mockResolvedValue(true),
          },
        },
      ],
    }).compile();

    service = module.get<CategoryService>(CategoryService);
    repository = module.get<Repository<Category>>(getRepositoryToken(Category));
  });


  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAll', () => {
    it('should return an array of categories', async () => {
      const categories = await service.getList();
      expect(categories).toEqual(categoryArray);
    });
  });

  describe('insertOne', () => {
    it('should successfully insert a category', () => {
      expect(
        service.insertOne({
          name: testCategory1,
        }),
      ).resolves.toEqual(oneCategory);
      expect(repository.create).toBeCalledTimes(1);
      expect(repository.save).toBeCalledTimes(1);
    });
  });

  describe('deleteOne', () => {
    it('should return {deleted: true}', () => {
      expect(service.deleteOne(1)).resolves.toEqual({ deleted: true });
    });
    it('should return {deleted: false, message: err.message}', () => {
      const repositorySpy = jest
        .spyOn(repository, 'delete')
        .mockRejectedValueOnce(new Error('Bad Delete Method.'));
      expect(service.deleteOne(0)).resolves.toEqual({
        deleted: false,
        message: 'Bad Delete Method.',
      });
      expect(repositorySpy).toBeCalledWith({ id: 0 });
      expect(repositorySpy).toBeCalledTimes(1);
    });
  });
});
