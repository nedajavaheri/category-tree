import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { CategoryModule } from 'src/category/category.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Repository, TreeRepository } from 'typeorm';
import { Category } from 'src/category/entity/category.entity';
import { CategoryService } from 'src/category/service';

describe('CategoryController (e2e)', () => {
  let app: INestApplication;
  let repository: Repository<Category>;
  let treeRepository: TreeRepository<Category>;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [
        CategoryModule,
        TypeOrmModule.forRoot({
          type: 'mysql',
          host: 'localhost',
          port: 3306,
          username: 'admin',
          password: '123456',
          database: 'e2e_test',
          entities: [__dirname + '/**/*.entity.{ts,js}'],
          synchronize: true,
          autoLoadEntities: true,
          keepConnectionAlive: true,
          logging: true,
          connectTimeout: 30000
        }),
      ], providers: [CategoryService]
    }).compile();
    app = module.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  afterEach(async () => {
    await repository.query(`DELETE FROM categories;`);
  })

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('GET /categories', () => {
    it('should return an array of categories', async () => {

      await repository.save([
        { name: 'test-category-0' },
        { name: 'test-category-1' },
      ]);

      // Run your end-to-end test
      const { body } = await request(app.getHttpServer())
        .get('/categories')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(body).toEqual([
        { id: expect.any(Number), name: 'test-category-0' },
        { id: expect.any(Number), name: 'test-category-1' },
      ]);
    });
  });
});


