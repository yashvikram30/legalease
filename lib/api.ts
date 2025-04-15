import { getSupabaseBrowserClient } from "./supabase";

const supabase = getSupabaseBrowserClient();

type ChatHistoryItem = {
  id: string;
  title: string;
  preview: string;
  created_at: string;  // Assuming created_at is a string or a valid date format
};

async function getChatHistory(userId: string): Promise<ChatHistoryItem[]> {
  // Fetch basic chat info from 'chats' table
  const { data, error } = await supabase
    .from("chats")
    .select("id, title, created_at")
    .eq("user_id", userId);

  if (error) {
    console.error("Error fetching chat history:", error);
    return [];
  }

  // Fetch the latest message (preview) for each chat
  const chatsWithPreview = await Promise.all(
    data.map(async (chat) => {
      const { data: messages, error: messageError } = await supabase
        .from("messages")
        .select("content")
        .eq("chat_id", chat.id)
        .order("timestamp", { ascending: false })
        .limit(1); // Only get the most recent message

      if (messageError) {
        console.error("Error fetching messages:", messageError);
        return { ...chat, preview: "" };  // Return the chat with empty preview if error occurs
      }

      const preview = messages && messages.length > 0 ? messages[0].content : "";
      
      // Return the chat with preview
      return { ...chat, preview };
    })
  );

  return chatsWithPreview;
}

export async function createChat(userId: string) {
  const { data, error } = await supabase
    .from("chats")
    .insert([{ user_id: userId, title: "Untitled Chat" }])
    .select();

  if (error) throw error;
  return data?.[0];
}

export { getChatHistory };
