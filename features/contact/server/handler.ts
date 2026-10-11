import 'server-only';
import { NextResponse, type NextRequest } from 'next/server';
import { contactSchema } from '@/features/contact/server/schema';
import { allowContactRequest, contactRequestKey } from '@/features/contact/server/rate-limit';
import { createMessage } from '@/features/contact/server/messages';
import { ContactRequestError, readContactBody } from '@/features/contact/server/request-body';

export async function handleContactPost(request: NextRequest) {
  try {
    if (!allowContactRequest(contactRequestKey(request.headers))) {
      return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 });
    }

    const body = await readContactBody(request);
    const result = contactSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json({ error: result.error.issues[0].message }, { status: 400 });
    }

    const message = await createMessage(result.data);
    return NextResponse.json({ success: true, id: message._id }, { status: 200 });
  } catch (error) {
    if (error instanceof ContactRequestError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }
    // SDK exceptions may contain request/response bodies and credentials.
    console.error('Contact message write failed.');
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
  }
}
