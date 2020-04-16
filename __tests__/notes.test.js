const { getAgent, getUser, getNote } = require('../db/data-helpers');

describe('notes routes', () => {
  it('creates a note', async() => {
    const user = await getUser({ email: 'test@test.com' });

    return getAgent()
      .post('/api/v1/notes')
      .send({
        title: 'my title',
        body: 'my body'
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          title: 'my title',
          body: 'my body',
          author: user._id,
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
          __v: 0
        });
      });
  });

  it('updates a note', async() => {
    const user = await getUser({ email: 'test@test.com' });
    const note = await getNote({ author: user._id });

    return getAgent()
      .patch(`/api/v1/notes/${note._id}`)
      .send({ title: 'My cool note' })
      .then(res => {
        expect(res.body).toEqual({
          ...note,
          updatedAt: expect.any(String),
          title: 'My cool note'
        });
      });
  });

  it('deletes a note', async() => {
    const user = await getUser({ email: 'test@test.com' });
    const note = await getNote({ author: user._id });

    return getAgent()
      .delete(`/api/v1/notes/${note._id}`)
      .then(res => {
        expect(res.body).toEqual(note);
      });
  });
});