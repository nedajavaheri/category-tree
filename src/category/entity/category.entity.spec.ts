import { Category } from './category.entity';


describe('Category class', () => {

  it('should make a category with name only', () => {
    const category = new Category('Test');
    expect(category).toBeTruthy();
    expect(category.name).toBe('Test');
    expect(category.parent).toBe(undefined);
  });
  // it('should make a category with name and parent', () => {
  //   const rootCategory = new Category("Parent");
  //   const category = new Category('Test', rootCategory);
  //   expect(category).toBeTruthy();
  //   expect(category.name).toBe('Test');
  //   expect(category.parent).toBe(rootCategory);
  // });
});
