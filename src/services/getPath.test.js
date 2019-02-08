import getPath from './getPath';

it('getPath()', async () => {
    const response = await getPath({ pick: 'location x', drop: 'location y' })
    expect(response).toMatchObject({ data: { path: [1, 2] } });
})