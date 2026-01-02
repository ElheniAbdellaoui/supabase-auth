import { createClient } from "@/utils/supabase/server";

export async function getUserOrganization(userId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("memberships")
    .select("org_id")
    .eq("user_id", userId)
    .single();

  if (error) return null;
  return data.org_id;
}
