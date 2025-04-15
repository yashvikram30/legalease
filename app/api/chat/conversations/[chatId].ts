import { createServerClient } from "@/lib/supabase";
import { Session } from "@supabase/supabase-js";
import { NextApiRequest, NextApiResponse } from "next";

interface Message {
    id: string;
    chat_id: string;
    content: string;
    timestamp: string;
    sender_id: string;
}

interface ErrorResponse {
    error: string;
}

interface MessagesResponse {
    messages: Message[];
}

export async function handler(
    req: NextApiRequest,
    res: NextApiResponse<MessagesResponse | ErrorResponse>
) {
    const { chatId } = req.query as { chatId: string };

    const supabase = createServerClient();
    const {
        data: { session },
    }: { data: { session: Session | null } } = await supabase.auth.getSession();

    if (!session) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    // Fetch messages from the `messages` table
    const { data, error }: { data: Message[] | null; error: any } = await supabase
        .from("messages")
        .select("*")
        .eq("chat_id", chatId)
        .order("timestamp", { ascending: true });

    if (error) {
        return res.status(500).json({ error: error.message });
    }

    return res.status(200).json({ messages: data || [] });
}
