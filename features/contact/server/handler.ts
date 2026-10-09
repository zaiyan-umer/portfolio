import 'server-only';
import { NextResponse, type NextRequest } from 'next/server';
import { contactSchema } from '@/features/contact/server/schema';
import { allowContactRequest } from '@/features/contact/server/rate-limit';
import { createMessage } from '@/features/contact/server/messages';

export async function handleContactPost(request: NextRequest) {
  try {
    const body = await request.json();
    const key = request.headers.get('x-forwarded-for') || 'unknown';

    if (!allowContactRequest(key)) {
      return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 });
    }

    const result = contactSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json({ error: result.error.issues[0].message }, { status: 400 });
    }

    const message = await createMessage(result.data);
    return NextResponse.json({ success: true, id: message._id }, { status: 200 });
  } catch (error) {
    console.error('Error creating message:', error);
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
  }
}
