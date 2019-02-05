module.exports = {
    get: jest.fn(() => Promise.resolve({ data: { path: [1, 2] } })),
    post: jest.fn(() => Promise.resolve({ data: { token: 'token' } }))
}