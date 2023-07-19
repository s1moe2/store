import { findById } from './findById'

describe('findById', ()=> {
  it('returns undefined when ID does not exist', () => {
    const res = findById('id-not-found');
    expect(res).toEqual(-1);
  })

  it('returns index of item matched by ID', () => {
    // WARNING: id and expected index are bound to current implementation (see ../db)
    const res = findById('1');
    expect(res).toEqual(0);
  })
})