const org = await supabase
  .from("memberships")
  .select("org_id")
  .eq("user_id", user.id)
  .single();

if (!org) {
  const { data: newOrg } = await supabase
    .from("organizations")
    .insert({ name: `${user.user_metadata.full_name}'s Org` })
    .select()
    .single();

  await supabase.from("memberships").insert({
    org_id: newOrg.id,
    user_id: user.id,
    role: "owner",
  });
}
