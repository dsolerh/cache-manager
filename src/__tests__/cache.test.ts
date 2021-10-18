import CacheManager from '../index';


test('Set size: ', () => {
  CacheManager.setSize(2);
  expect(CacheManager.getSize()).toEqual(2);
});

test('Get data: ', () => {
  const d1 = { a: 1, b: 1 };
  CacheManager.set('test', 'd1', d1);
  const expd1 = CacheManager.get('test', 'd1');
  expect(expd1.value).toEqual(d1);
});

test('Full data: ', async () => {
  CacheManager.setSize(2)
  const d1 = { a: 1, b: 1 };
  const d2 = { a: 2, b: 2 };
  const d3 = { a: 3, b: 3 };
  CacheManager.set('test', 'd1', d1);
  await new Promise((r) => setTimeout(r, 500));
  CacheManager.set('test', 'd2', d2);
  await new Promise((r) => setTimeout(r, 500));
  CacheManager.set('test', 'd3', d3);
  expect(CacheManager.getSize()).toEqual(2);
  expect(CacheManager.getCount('test')).toEqual(2);
  expect(CacheManager.get('test','d1')).toEqual(undefined);
});

test('Clear data: ', () => {
  CacheManager.setSize(3);
  const d1 = { a: 1, b: 1 };
  const d2 = { a: 2, b: 2 };
  const d3 = { a: 3, b: 3 };
  CacheManager.set('test', 'd1', d1);
  CacheManager.set('test', 'd2', d2);
  CacheManager.set('test', 'd3', d3);
  expect(CacheManager.getCount('test')).toEqual(3);
  CacheManager.clear('test');
  expect(CacheManager.getCount('test')).toEqual(0);
  expect(CacheManager.get('test','d1')).toEqual(undefined);
  expect(CacheManager.get('test','d2')).toEqual(undefined);
  expect(CacheManager.get('test','d3')).toEqual(undefined);
});