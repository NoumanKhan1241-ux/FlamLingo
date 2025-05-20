import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    console.log('Processing message:', message);

    // Call Ollama API
    const response = await fetch('http://localhost:11434/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'mistral',
        prompt: `You are a helpful assistant for a language learning website. Your role is to help users with their language learning journey. 
        Keep your responses concise, friendly, and educational. 
        If the user asks about language learning, provide helpful tips and resources.
        If the user asks about the website, explain its features and benefits.
        If the user asks about something unrelated, politely guide them back to language learning topics.
        
        User: ${message}`,
        stream: false,
        options: {
          temperature: 0.7,
          top_p: 0.9,
          repeat_penalty: 1.1,
          stop: ["User:", "Assistant:"]
        }
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to get response from Ollama');
    }

    const data = await response.json();
    console.log('Received response:', data);

    // Ensure we have a valid response
    if (!data.response) {
      throw new Error('Invalid response format from Ollama');
    }

    return NextResponse.json({
      role: 'assistant',
      content: data.response.trim()
    });
  } catch (error: any) {
    console.error('Detailed Chat API error:', error);
    
    return NextResponse.json(
      { error: error.message || 'Failed to process chat message' },
      { status: 500 }
    );
  }
} 