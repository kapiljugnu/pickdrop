module.exports = {
    get: jest.fn(async () => ({ data: { path: [1, 2] } })),
    post: jest.fn(async () => ({ data: { token: 'token' } }))
}