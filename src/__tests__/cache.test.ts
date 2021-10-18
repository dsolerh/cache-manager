import CacheManager from '../index';


test('Set size: ', () => {
  CacheManager.setSize(2);
  expect(CacheManager.getSize()).toEqual(2);
});

test('Get data: ', () => {
  let manager = new CacheManager();
  const d1 = { a: 1, b: 1 };
  manager.set('test', 'd1', d1);
  const expd1 = manager.get('test', 'd1');
  expect(expd1.value).toEqual(d1);
});

test('Full data: ', async () => {
  CacheManager.setSize(2)
  let manager = new CacheManager();
  const d1 = { a: 1, b: 1 };
  const d2 = { a: 2, b: 2 };
  const d3 = { a: 3, b: 3 };
  manager.set('test', 'd1', d1);
  await new Promise((r) => setTimeout(r, 500));
  manager.set('test', 'd2', d2);
  await new Promise((r) => setTimeout(r, 500));
  manager.set('test', 'd3', d3);
  expect(CacheManager.getSize()).toEqual(2);
  expect(manager.getCount('test')).toEqual(2);
  expect(manager.get('test','d1')).toEqual(undefined);
});

test('Clear data: ', () => {
  CacheManager.setSize(3);
  let manager = new CacheManager();
  const d1 = { a: 1, b: 1 };
  const d2 = { a: 2, b: 2 };
  const d3 = { a: 3, b: 3 };
  manager.set('test', 'd1', d1);
  manager.set('test', 'd2', d2);
  manager.set('test', 'd3', d3);
  expect(manager.getCount('test')).toEqual(3);
  manager.clear('test');
  expect(manager.getCount('test')).toEqual(0);
  expect(manager.get('test','d1')).toEqual(undefined);
  expect(manager.get('test','d2')).toEqual(undefined);
  expect(manager.get('test','d3')).toEqual(undefined);
});