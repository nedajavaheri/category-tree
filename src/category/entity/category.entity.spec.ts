import { Category } from './category.entity';

describe('Category', () => {
  it('should be defined', () => {
    expect(new Category("Test Category 1")).toBeDefined();
  });
});
