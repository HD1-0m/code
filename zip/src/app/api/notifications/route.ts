import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import webpush from "web-push";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY! // needs service role key for server
);

// VAPID keys: generate once using web-push CLI
const publicVapidKey = process.env.NEXT_PUBLIC_VAPID_KEY!;
const privateVapidKey = process.env.VAPID_PRIVATE_KEY!;
webpush.setVapidDetails(
  "mailto:admin@erp.com",
  publicVapidKey,
  privateVapidKey
);

let subscriptions: any[] = []; // store browser push subscriptions

export async function POST(req: Request) {
  const data = await req.json();
  subscriptions.push(data); // store subscription (could store in Supabase)
  return NextResponse.json({ message: "Subscribed successfully" });
}

// Broadcast realtime events to push subscribers
supabase
  .channel("realtime:notifications")
  .on(
    "postgres_changes",
    {
      event: "INSERT",
      schema: "public",
      table: "assignments",
    },
    (payload) => {
      notifyAll("New assignment uploaded!", payload.new.title);
    }
  )
  .on(
    "postgres_changes",
    {
      event: "INSERT",
      schema: "public",
      table: "attendance",
    },
    (payload) => {
      notifyAll("Attendance updated!", `Class: ${payload.new.class_name}`);
    }
  )
  .subscribe();

async function notifyAll(title: string, body: string) {
  for (const sub of subscriptions) {
    try {
      await webpush.sendNotification(
        sub,
        JSON.stringify({
          title,
          body,
          icon: "/logo.png",
        })
      );
    } catch (err) {
      console.error("Push failed", err);
    }
  }
}
