import { orders } from "../db";
import { findById } from './findById'

const stubs: Record<string, jest.SpyInstance | jest.Mock> = {}
beforeAll(() => {
  stubs['findIndex'] = jest.spyOn(orders, 'findIndex')
})

beforeEach(() => {
  stubs['findIndex'].mockImplementation(() => {throw new Error('TEST NOT IMPLEMENTED')})
})

afterEach(() => { jest.resetAllMocks() })
afterAll(() => { jest.restoreAllMocks() })

describe('findById', ()=> {

  it('returns the result of findIndex', () => {
    const fakeFindIndex = Math.random()
    stubs['findIndex'].mockReturnValue(fakeFindIndex);

    const res = findById('id-not-found');
    expect(res).toEqual(fakeFindIndex);
  })

  it.skip('returns undefined when ID does not exist', () => {
    const res = findById('id-not-found');
    expect(res).toEqual(-1);
  })

  it.skip('returns index of item matched by ID', () => {
    // WARNING: id and expected index are bound to current implementation (see ../db)
    const res = findById('1');
    expect(res).toEqual(0);
  })
})