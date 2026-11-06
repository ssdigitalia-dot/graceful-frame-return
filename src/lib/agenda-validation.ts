export type AgendaInput = {
  nome: string;
  telefone: string;
  tipoProducao: string;
  localDesejado: string;
  horario: string;
  dataShow: string;
  mensagem: string;
};

export type AgendaRow = {
  nome: string;
  telefone: string;
  tipo_producao: string;
  local_desejado: string;
  horario: string;
  mensagem: string;
  data_show: string;
};

const MAX = {
  nome: 120,
  telefone: 40,
  tipoProducao: 120,
  localDesejado: 120,
  horario: 10,
  mensagem: 2000,
};

function clean(value: unknown, max: number, label: string): string {
  const text = typeof value === "string" ? value.trim() : "";
  if (!text) throw new Error(`Informe ${label}.`);
  if (text.length > max) throw new Error(`${label} excede ${max} caracteres.`);
  return text;
}

function cleanOptional(value: unknown, max: number): string {
  const text = typeof value === "string" ? value.trim() : "";
  if (text.length > max) throw new Error(`Mensagem excede ${max} caracteres.`);
  return text;
}

export function validateAgenda(input: AgendaInput): AgendaRow {
  const nome = clean(input.nome, MAX.nome, "seu nome");
  const telefone = clean(input.telefone, MAX.telefone, "seu telefone");
  const tipo_producao = clean(input.tipoProducao, MAX.tipoProducao, "o tipo de produção");
  const local_desejado = clean(input.localDesejado, MAX.localDesejado, "o local desejado");
  const horario = clean(input.horario, MAX.horario, "o horário");
  const mensagem = cleanOptional(input.mensagem, MAX.mensagem);

  const data = typeof input.dataShow === "string" ? input.dataShow.trim() : "";
  if (!/^\d{4}-\d{2}-\d{2}$/.test(data)) throw new Error("Escolha uma data no calendário.");
  const chosen = new Date(`${data}T00:00:00Z`);
  if (Number.isNaN(chosen.getTime())) throw new Error("Data inválida.");
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (chosen.getTime() < today.getTime()) throw new Error("A data escolhida já passou.");

  return { nome, telefone, tipo_producao, local_desejado, horario, mensagem, data_show: data };
}
