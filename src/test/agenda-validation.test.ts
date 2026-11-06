import { describe, expect, it } from "vitest";

import { validateAgenda, type AgendaInput } from "@/lib/agenda-validation";

function futureDate(): string {
  const d = new Date();
  d.setDate(d.getDate() + 10);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function valid(overrides: Partial<AgendaInput> = {}): AgendaInput {
  return {
    nome: "Sergio Souza",
    telefone: "(11) 95303-8954",
    tipoProducao: "Produção de shows",
    localDesejado: "Sesc Pompeia",
    horario: "19:00",
    dataShow: futureDate(),
    mensagem: "Show de 2 horas com banda completa.",
    ...overrides,
  };
}

describe("Agenda request rules", () => {
  it("accepts a request with a future date and keeps every field", () => {
    const row = validateAgenda(valid());

    expect(row.nome).toBe("Sergio Souza");
    expect(row.telefone).toBe("(11) 95303-8954");
    expect(row.local_desejado).toBe("Sesc Pompeia");
    expect(row.horario).toBe("19:00");
    expect(row.data_show).toBe(futureDate());
  });

  it("rejects a date that has already passed", () => {
    expect(() => validateAgenda(valid({ dataShow: "2020-01-01" }))).toThrow("já passou");
  });

  it("rejects a request with no date picked in the calendar", () => {
    expect(() => validateAgenda(valid({ dataShow: "" }))).toThrow("Escolha uma data");
  });

  it("rejects a missing name or phone", () => {
    expect(() => validateAgenda(valid({ nome: "   " }))).toThrow("Informe seu nome");
    expect(() => validateAgenda(valid({ telefone: "" }))).toThrow("Informe seu telefone");
  });

  it("trims the message and allows it to be empty", () => {
    expect(validateAgenda(valid({ mensagem: "  " })).mensagem).toBe("");
  });
});
