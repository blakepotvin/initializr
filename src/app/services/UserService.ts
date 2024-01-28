import { SupabaseClient } from "@supabase/supabase-js";

export class UserService {
  supabase: SupabaseClient;
  constructor(supabase: SupabaseClient) {
    this.supabase = supabase;
  }
  async getUserByEmail(email: string) {
    const { data, error } = await this.supabase
      .from("next_auth.users")
      .select("*")
      .eq("email", email);
    if (error) {
      throw error;
    }
    return data;
  }
  async getUserById(id: number) {
    const { data, error } = await this.supabase
      .from("next_auth.users")
      .select("*")
      .eq("id", id);
    if (error) {
      throw error;
    }
    return data;
  }
}
