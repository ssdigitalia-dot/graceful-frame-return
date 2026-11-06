import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";
import { validateAgenda, type AgendaInput } from "@/lib/agenda-validation";

export const enviarSolicitacaoAgenda = createServerFn({ method: "POST" })
  .validator((input: AgendaInput) => input)
  .handler(async ({ data }) => {
    const row = validateAgenda(data);

    const key = process.env["SUPABASE_PUBLISHABLE_KEY"]!;
    const supabasePublic = createClient<Database>(process.env["SUPABASE_URL"]!, key, {
      auth: { persistSession: false },
      // Opaque sb_ keys aren't JWTs; send only apikey, not the default Authorization bearer.
      global: {
        fetch: (input, init) => {
          const h = new Headers(init?.headers);
          if (key.startsWith("sb_") && h.get("Authorization") === `Bearer ${key}`) h.delete("Authorization");
          h.set("apikey", key);
          return fetch(input, { ...init, headers: h });
        },
      },
    });

    const { error } = await supabasePublic.from("agenda_requests").insert(row);
    if (error) throw new Error("Não foi possível enviar sua solicitação. Tente novamente.");

    return { ok: true };
  });
