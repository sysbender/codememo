import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";

const supabase = createClient(
  "https://xfompioqmogbaunxodwp.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhmb21waW9xbW9nYmF1bnhvZHdwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDY4Mzc5NzEsImV4cCI6MjAyMjQxMzk3MX0.4KfQCPoopyG6JrPxhY2WmkuthxCf7vHiKIfSqtrhw_I"
);

export default function AuthUI() {
  return (
    <Auth
      supabaseClient={supabase}
      appearance={{ theme: ThemeSupa }}
      providers={["google", "github"]}
    />
  );
}
