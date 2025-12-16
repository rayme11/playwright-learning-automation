import { test, expect } from '@playwright/test';

test.describe('API Tests with Authentication Examples', () => {
  const BASE_URL = 'https://jsonplaceholder.typicode.com';

  test('Example: API request with custom headers', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/posts/1`, {
      headers: {
        'Authorization': 'Bearer fake-token-example',
        'Custom-Header': 'custom-value'
      }
    });
    
    expect(response.status()).toBe(200);
  });

  test('Example: API request with query parameters', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/comments`, {
      params: {
        postId: 1,
        _limit: 5
      }
    });
    
    expect(response.status()).toBe(200);
    
    const comments = await response.json();
    expect(comments.length).toBeLessThanOrEqual(5);
    comments.forEach((comment: any) => {
      expect(comment.postId).toBe(1);
    });
  });

  test('Example: Chain multiple API calls', async ({ request }) => {
    // First, get a user
    const userResponse = await request.get(`${BASE_URL}/users/1`);
    expect(userResponse.status()).toBe(200);
    const user = await userResponse.json();
    
    // Then, get posts by that user
    const postsResponse = await request.get(`${BASE_URL}/posts?userId=${user.id}`);
    expect(postsResponse.status()).toBe(200);
    const posts = await postsResponse.json();
    
    // Verify the posts belong to the user
    posts.forEach((post: any) => {
      expect(post.userId).toBe(user.id);
    });
    
    // Finally, get comments for the first post
    if (posts.length > 0) {
      const commentsResponse = await request.get(`${BASE_URL}/posts/${posts[0].id}/comments`);
      expect(commentsResponse.status()).toBe(200);
      const comments = await commentsResponse.json();
      expect(comments.length).toBeGreaterThan(0);
    }
  });

  test('Example: Retry failed requests', async ({ request }) => {
    let attempts = 0;
    const maxAttempts = 3;
    let response;
    
    while (attempts < maxAttempts) {
      try {
        response = await request.get(`${BASE_URL}/posts/1`);
        if (response.status() === 200) {
          break;
        }
      } catch (error) {
        attempts++;
        if (attempts === maxAttempts) throw error;
      }
    }
    
    expect(response?.status()).toBe(200);
  });

  test('Example: Validate JSON schema', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/users/1`);
    const user = await response.json();
    
    // Manual schema validation
    const requiredFields = ['id', 'name', 'username', 'email', 'address', 'phone', 'website', 'company'];
    requiredFields.forEach(field => {
      expect(user).toHaveProperty(field);
    });
    
    // Type validation
    expect(typeof user.id).toBe('number');
    expect(typeof user.name).toBe('string');
    expect(typeof user.email).toBe('string');
    expect(typeof user.address).toBe('object');
  });
});
