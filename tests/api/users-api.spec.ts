import { test, expect } from '@playwright/test';

test.describe('Users API Tests', () => {
  const BASE_URL = 'https://jsonplaceholder.typicode.com';

  test('GET - should fetch all users', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/users`);
    
    expect(response.status()).toBe(200);
    
    const users = await response.json();
    expect(users.length).toBe(10);
    
    // Validate structure of first user
    const firstUser = users[0];
    expect(firstUser).toHaveProperty('id');
    expect(firstUser).toHaveProperty('name');
    expect(firstUser).toHaveProperty('username');
    expect(firstUser).toHaveProperty('email');
    expect(firstUser).toHaveProperty('address');
    expect(firstUser).toHaveProperty('phone');
    expect(firstUser).toHaveProperty('website');
    expect(firstUser).toHaveProperty('company');
  });

  test('GET - should fetch user with nested address data', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/users/1`);
    
    expect(response.status()).toBe(200);
    
    const user = await response.json();
    expect(user.address).toBeDefined();
    expect(user.address.street).toBeDefined();
    expect(user.address.city).toBeDefined();
    expect(user.address.zipcode).toBeDefined();
    expect(user.address.geo).toBeDefined();
    expect(user.address.geo.lat).toBeDefined();
    expect(user.address.geo.lng).toBeDefined();
  });

  test('GET - should fetch todos for a specific user', async ({ request }) => {
    const userId = 1;
    const response = await request.get(`${BASE_URL}/users/${userId}/todos`);
    
    expect(response.status()).toBe(200);
    
    const todos = await response.json();
    expect(Array.isArray(todos)).toBeTruthy();
    
    // Verify all todos belong to the user
    todos.forEach((todo: any) => {
      expect(todo.userId).toBe(userId);
      expect(todo).toHaveProperty('id');
      expect(todo).toHaveProperty('title');
      expect(todo).toHaveProperty('completed');
      expect(typeof todo.completed).toBe('boolean');
    });
  });

  test('GET - should fetch albums for a specific user', async ({ request }) => {
    const userId = 1;
    const response = await request.get(`${BASE_URL}/users/${userId}/albums`);
    
    expect(response.status()).toBe(200);
    
    const albums = await response.json();
    expect(Array.isArray(albums)).toBeTruthy();
    expect(albums.length).toBeGreaterThan(0);
    
    albums.forEach((album: any) => {
      expect(album.userId).toBe(userId);
    });
  });

  test('GET - should validate email format for all users', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/users`);
    const users = await response.json();
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    users.forEach((user: any) => {
      expect(user.email).toMatch(emailRegex);
    });
  });
});
