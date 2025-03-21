// pages/api/chat.ts
import { NextResponse } from 'next/server';
import { env } from '../../env.mjs';
// import OpenAI from 'openai';

// const openai = new OpenAI({
//   apiKey: env.OPENAI_API_KEY,
// });

export async function POST(req: Request) {
  try {
    const { messages: userMessages } = await req.json();

    if (!userMessages || !Array.isArray(userMessages)) {
      return NextResponse.json(
        { message: 'No messages provided or messages is not an array' },
        { status: 400 }
      );
    }

    const chatMessages = userMessages.map(
      (msg: { role: string; content: string }) => ({
        role: msg.role as 'system' | 'user' | 'assistant',
        content: msg.content,
      })
    );

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: chatMessages,
      }),
    });

    const completion = await response.json();

    if (!response.ok) {
      console.error('OpenAI API error:', completion);
      if (completion.error && completion.error.code === 'insufficient_quota') {
        return NextResponse.json(
          { message: 'You have exceeded your quota. Please check your billing details.' },
          { status: 429 }
        );
      }
      return NextResponse.json(
        { message: completion.message || 'Error from OpenAI API' },
        { status: 500 }
      );
    }

    const assistantMessage = completion.choices[0].message?.content;
    return NextResponse.json({ reply: assistantMessage });

  } catch (error: unknown) {
    console.error('OpenAI API error:', error instanceof Error ? error.message : error);
    return NextResponse.json(
      { message: 'Error from OpenAI API' },
      { status: 500 }
    );
  }
}
