import { fakeDb } from '../db/fakeDb'
import { BadRequest } from '../utils/Errors'

class BurgersService {
  edit(body) {
    const old = this.getById(body.id)
    // old = { ...old, ...body }
    for (const key in body) {
      old[key] = body[key]
    }
    this.delete(old.id)
    fakeDb.burgers.push(old)
    return old
  }

  delete(id) {
    const index = fakeDb.burgers.findIndex(b => b.id.toString() === id)
    if (index === -1) {
      throw new BadRequest('Invalid ID')
    }
    fakeDb.burgers.splice(index, 1)
  }

  getById(id) {
    const burger = fakeDb.burgers.find(b => b.id.toString() === id)
    if (!burger) {
      throw new BadRequest('Invalid Burger ID')
    }
    return burger
  }

  create(body) {
    fakeDb.burgers.push(body)
    return body
  }

  getAll() {
    return fakeDb.burgers
  }
}

export const burgersService = new BurgersService()
