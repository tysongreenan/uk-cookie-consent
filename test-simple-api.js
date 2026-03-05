// Test script to check if the simple API is working
const fetch = require('node-fetch');

async function testSimpleAPI() {
  try {
    console.log('🧪 Testing simple API...');
    
    const response = await fetch('http://localhost:3001/api/banners/simple', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    
    console.log('Response status:', response.status);
    console.log('Response headers:', Object.fromEntries(response.headers.entries()));
    
    const text = await response.text();
    console.log('Response body (first 200 chars):', text.substring(0, 200));
    
    if (text.includes('<!DOCTYPE')) {
      console.log('❌ API is returning HTML instead of JSON - likely a 404 or 500 error');
    } else {
      console.log('✅ API is returning JSON');
    }
    
  } catch (error) {
    console.error('❌ Error testing API:', error.message);
  }
}

testSimpleAPI();
