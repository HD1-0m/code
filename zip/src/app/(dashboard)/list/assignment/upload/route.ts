import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function POST(req: Request) {
  try {
    const data = await req.formData();
    const file = data.get("file") as File;
    const subject = data.get("subject") as string;
    const className = data.get("className") as string;
    const dueDate = data.get("dueDate") as string;

    if (!file) {
      return NextResponse.json({ error: "File is required" }, { status: 400 });
    }

    const filePath = `assignments/${Date.now()}_${file.name}`;

    const { error: uploadError } = await supabase.storage
      .from("assignments")
      .upload(filePath, file);

    if (uploadError)
      return NextResponse.json({ error: uploadError.message }, { status: 500 });

    const { data: inserted, error: dbError } = await supabase
      .from("assignments")
      .insert([
        {
          subject,
          class_name: className,
          due_date: dueDate,
          file_path: filePath,
          uploaded_at: new Date().toISOString(),
        },
      ])
      .select();

    if (dbError)
      return NextResponse.json({ error: dbError.message }, { status: 500 });

    return NextResponse.json(inserted[0]);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function GET() {
  const { data, error } = await supabase
    .from("assignments")
    .select("*")
    .order("uploaded_at", { ascending: false });

  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json(data);
}
