import { test, expect } from '@playwright/test';

test.describe('JSONPlaceholder API Tests', () => {
  const BASE_URL = 'https://jsonplaceholder.typicode.com';

  test('GET - should fetch all posts', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/posts`);
    
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy();
    
    const posts = await response.json();
    expect(Array.isArray(posts)).toBeTruthy();
    expect(posts.length).toBeGreaterThan(0);
    
    // Validate structure of first post
    expect(posts[0]).toHaveProperty('userId');
    expect(posts[0]).toHaveProperty('id');
    expect(posts[0]).toHaveProperty('title');
    expect(posts[0]).toHaveProperty('body');
  });

  test('GET - should fetch a single post by ID', async ({ request }) => {
    const postId = 1;
    const response = await request.get(`${BASE_URL}/posts/${postId}`);
    
    expect(response.status()).toBe(200);
    
    const post = await response.json();
    expect(post.id).toBe(postId);
    expect(post.userId).toBeDefined();
    expect(post.title).toBeTruthy();
    expect(post.body).toBeTruthy();
  });

  test('POST - should create a new post', async ({ request }) => {
    const newPost = {
      title: 'Test Post',
      body: 'This is a test post created by Playwright',
      userId: 1
    };

    const response = await request.post(`${BASE_URL}/posts`, {
      data: newPost
    });
    
    expect(response.status()).toBe(201);
    
    const createdPost = await response.json();
    expect(createdPost.title).toBe(newPost.title);
    expect(createdPost.body).toBe(newPost.body);
    expect(createdPost.userId).toBe(newPost.userId);
    expect(createdPost.id).toBeDefined();
  });

  test('PUT - should update an existing post', async ({ request }) => {
    const postId = 1;
    const updatedData = {
      id: postId,
      title: 'Updated Title',
      body: 'Updated body content',
      userId: 1
    };

    const response = await request.put(`${BASE_URL}/posts/${postId}`, {
      data: updatedData
    });
    
    expect(response.status()).toBe(200);
    
    const updatedPost = await response.json();
    expect(updatedPost.title).toBe(updatedData.title);
    expect(updatedPost.body).toBe(updatedData.body);
  });

  test('PATCH - should partially update a post', async ({ request }) => {
    const postId = 1;
    const partialUpdate = {
      title: 'Partially Updated Title'
    };

    const response = await request.patch(`${BASE_URL}/posts/${postId}`, {
      data: partialUpdate
    });
    
    expect(response.status()).toBe(200);
    
    const updatedPost = await response.json();
    expect(updatedPost.title).toBe(partialUpdate.title);
    expect(updatedPost.id).toBe(postId);
  });

  test('DELETE - should delete a post', async ({ request }) => {
    const postId = 1;
    const response = await request.delete(`${BASE_URL}/posts/${postId}`);
    
    expect(response.status()).toBe(200);
  });

  test('GET - should return 404 for non-existent post', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/posts/99999`);
    
    expect(response.status()).toBe(404);
  });

  test('GET - should fetch posts for a specific user', async ({ request }) => {
    const userId = 1;
    const response = await request.get(`${BASE_URL}/posts?userId=${userId}`);
    
    expect(response.status()).toBe(200);
    
    const posts = await response.json();
    expect(Array.isArray(posts)).toBeTruthy();
    
    // Verify all posts belong to the specified user
    posts.forEach((post: any) => {
      expect(post.userId).toBe(userId);
    });
  });

  test('GET - should verify response headers', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/posts/1`);
    
    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toContain('application/json');
  });

  test('POST - should validate response time', async ({ request }) => {
    const startTime = Date.now();
    
    const response = await request.post(`${BASE_URL}/posts`, {
      data: {
        title: 'Performance Test',
        body: 'Testing response time',
        userId: 1
      }
    });
    
    const endTime = Date.now();
    const responseTime = endTime - startTime;
    
    expect(response.status()).toBe(201);
    expect(responseTime).toBeLessThan(5000); // Should respond within 5 seconds
  });
});
