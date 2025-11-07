import { NextResponse } from "next/server";
import Twilio from "twilio";

const client = Twilio(
  process.env.TWILIO_ACCOUNT_SID!,
  process.env.TWILIO_AUTH_TOKEN!
);

export async function POST(req: Request) {
  const data = await req.json();
  const message = `📅 Attendance updated: ${data.date} → ${data.status}`;
  const studentPhone = data.phone; // e.g. "+91xxxxxxxxxx"

  try {
    const msg = await client.messages.create({
      from: process.env.TWILIO_WHATSAPP_FROM!,
      to: `whatsapp:${studentPhone}`,
      body: message,
    });
    return NextResponse.json({ success: true, sid: msg.sid });
  } catch (err: any) {
    console.error(err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
