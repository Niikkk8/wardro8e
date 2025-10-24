import { NextRequest, NextResponse } from "next/server";

interface TestResult {
  name: string;
  status: string;
  data?: Record<string, unknown>;
  statusCode?: number;
  error?: string;
  stack?: string;
}

interface TestResults {
  pythonServiceUrl: string;
  tests: TestResult[];
}

/**
 * Test endpoint to verify embedding service connectivity
 * Visit: /api/test-embedding
 */
export async function GET(req: NextRequest) {
  const pythonServiceUrl = process.env.PYTHON_SERVICE_URL;
  
  if (!pythonServiceUrl) {
    return NextResponse.json({
      success: false,
      error: "PYTHON_SERVICE_URL environment variable not configured",
      help: "Add PYTHON_SERVICE_URL to your .env.local file"
    }, { status: 500 });
  }

  const results: TestResults = {
    pythonServiceUrl,
    tests: []
  };

  // Test 1: Check if service is reachable
  try {
    console.log(`Testing connection to: ${pythonServiceUrl}`);
    const healthResponse = await fetch(`${pythonServiceUrl}/health`, {
      method: 'GET',
      headers: { 'Accept': 'application/json' }
    });
    
    if (healthResponse.ok) {
      const healthData = await healthResponse.json();
      results.tests.push({
        name: "Health Check",
        status: "✅ PASS",
        data: healthData
      });
    } else {
      results.tests.push({
        name: "Health Check",
        status: "❌ FAIL",
        statusCode: healthResponse.status,
        error: await healthResponse.text()
      });
    }
  } catch (error) {
    results.tests.push({
      name: "Health Check",
      status: "❌ FAIL",
      error: error instanceof Error ? error.message : String(error)
    });
  }

  // Test 2: Check root endpoint
  try {
    const rootResponse = await fetch(`${pythonServiceUrl}/`, {
      method: 'GET',
      headers: { 'Accept': 'application/json' }
    });
    
    if (rootResponse.ok) {
      const rootData = await rootResponse.json();
      results.tests.push({
        name: "Root Endpoint",
        status: "✅ PASS",
        data: rootData
      });
    } else {
      results.tests.push({
        name: "Root Endpoint",
        status: "❌ FAIL",
        statusCode: rootResponse.status
      });
    }
  } catch (error) {
    results.tests.push({
      name: "Root Endpoint",
      status: "❌ FAIL",
      error: error instanceof Error ? error.message : String(error)
    });
  }

  // Test 3: Test with a sample public image
  const testImageUrl = "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=400";
  try {
    console.log(`Testing embedding generation with: ${testImageUrl}`);
    const embeddingResponse = await fetch(`${pythonServiceUrl}/generate-embedding`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ image_url: testImageUrl })
    });
    
    if (embeddingResponse.ok) {
      const embeddingData = await embeddingResponse.json();
      results.tests.push({
        name: "Embedding Generation (Test Image)",
        status: "✅ PASS",
        data: {
          dimensions: embeddingData.dimensions,
          model: embeddingData.model,
          embeddingLength: embeddingData.embedding?.length,
          sampleEmbedding: embeddingData.embedding?.slice(0, 5) // Show first 5 values
        }
      });
    } else {
      const errorText = await embeddingResponse.text();
      results.tests.push({
        name: "Embedding Generation (Test Image)",
        status: "❌ FAIL",
        statusCode: embeddingResponse.status,
        error: errorText
      });
    }
  } catch (error) {
    results.tests.push({
      name: "Embedding Generation (Test Image)",
      status: "❌ FAIL",
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined
    });
  }

  const allPassed = results.tests.every((test) => test.status.includes("✅"));

  return NextResponse.json({
    success: allPassed,
    summary: allPassed 
      ? "✅ All tests passed! Embedding service is working correctly."
      : "❌ Some tests failed. See details below.",
    ...results
  }, { status: allPassed ? 200 : 500 });
}

