import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const configurations = [
  {
    code: 'BR_SP',
    name: 'Brasil - São Paulo',
    currency: 'BRL',
    locale: 'pt-BR',
    timezone: 'America/Sao_Paulo',
  },
  {
    code: 'BR_RJ',
    name: 'Brasil - Rio de Janeiro',
    currency: 'BRL',
    locale: 'pt-BR',
    timezone: 'America/Sao_Paulo',
  },
  {
    code: 'BR_MG',
    name: 'Brasil - Minas Gerais',
    currency: 'BRL',
    locale: 'pt-BR',
    timezone: 'America/Sao_Paulo',
  },
  {
    code: 'BR_ES',
    name: 'Brasil - Espírito Santo',
    currency: 'BRL',
    locale: 'pt-BR',
    timezone: 'America/Sao_Paulo',
  },

  // --- Sul
  {
    code: 'BR_PR',
    name: 'Brasil - Paraná',
    currency: 'BRL',
    locale: 'pt-BR',
    timezone: 'America/Sao_Paulo',
  },
  {
    code: 'BR_SC',
    name: 'Brasil - Santa Catarina',
    currency: 'BRL',
    locale: 'pt-BR',
    timezone: 'America/Sao_Paulo',
  },
  {
    code: 'BR_RS',
    name: 'Brasil - Rio Grande do Sul',
    currency: 'BRL',
    locale: 'pt-BR',
    timezone: 'America/Sao_Paulo',
  },

  // --- Centro-Oeste
  {
    code: 'BR_DF',
    name: 'Brasil - Distrito Federal',
    currency: 'BRL',
    locale: 'pt-BR',
    timezone: 'America/Sao_Paulo',
  },
  {
    code: 'BR_GO',
    name: 'Brasil - Goiás',
    currency: 'BRL',
    locale: 'pt-BR',
    timezone: 'America/Sao_Paulo',
  },
  {
    code: 'BR_MT',
    name: 'Brasil - Mato Grosso',
    currency: 'BRL',
    locale: 'pt-BR',
    timezone: 'America/Cuiaba',
  },
  {
    code: 'BR_MS',
    name: 'Brasil - Mato Grosso do Sul',
    currency: 'BRL',
    locale: 'pt-BR',
    timezone: 'America/Campo_Grande',
  },

  // --- Nordeste
  {
    code: 'BR_AL',
    name: 'Brasil - Alagoas',
    currency: 'BRL',
    locale: 'pt-BR',
    timezone: 'America/Maceio',
  },
  {
    code: 'BR_BA',
    name: 'Brasil - Bahia',
    currency: 'BRL',
    locale: 'pt-BR',
    timezone: 'America/Bahia',
  },
  {
    code: 'BR_CE',
    name: 'Brasil - Ceará',
    currency: 'BRL',
    locale: 'pt-BR',
    timezone: 'America/Fortaleza',
  },
  {
    code: 'BR_MA',
    name: 'Brasil - Maranhão',
    currency: 'BRL',
    locale: 'pt-BR',
    timezone: 'America/Fortaleza',
  },
  {
    code: 'BR_PB',
    name: 'Brasil - Paraíba',
    currency: 'BRL',
    locale: 'pt-BR',
    timezone: 'America/Fortaleza',
  },
  {
    code: 'BR_PE',
    name: 'Brasil - Pernambuco',
    currency: 'BRL',
    locale: 'pt-BR',
    timezone: 'America/Recife',
  },
  {
    code: 'BR_PI',
    name: 'Brasil - Piauí',
    currency: 'BRL',
    locale: 'pt-BR',
    timezone: 'America/Fortaleza',
  },
  {
    code: 'BR_RN',
    name: 'Brasil - Rio Grande do Norte',
    currency: 'BRL',
    locale: 'pt-BR',
    timezone: 'America/Fortaleza',
  },
  {
    code: 'BR_SE',
    name: 'Brasil - Sergipe',
    currency: 'BRL',
    locale: 'pt-BR',
    timezone: 'America/Maceio',
  },

  // --- Norte
  {
    code: 'BR_AC',
    name: 'Brasil - Acre',
    currency: 'BRL',
    locale: 'pt-BR',
    timezone: 'America/Rio_Branco',
  },
  {
    code: 'BR_AM',
    name: 'Brasil - Amazonas',
    currency: 'BRL',
    locale: 'pt-BR',
    timezone: 'America/Manaus',
  },
  {
    code: 'BR_AP',
    name: 'Brasil - Amapá',
    currency: 'BRL',
    locale: 'pt-BR',
    timezone: 'America/Belem',
  },
  {
    code: 'BR_PA',
    name: 'Brasil - Pará',
    currency: 'BRL',
    locale: 'pt-BR',
    timezone: 'America/Belem',
  },
  {
    code: 'BR_RO',
    name: 'Brasil - Rondônia',
    currency: 'BRL',
    locale: 'pt-BR',
    timezone: 'America/Porto_Velho',
  },
  {
    code: 'BR_RR',
    name: 'Brasil - Roraima',
    currency: 'BRL',
    locale: 'pt-BR',
    timezone: 'America/Boa_Vista',
  },
  {
    code: 'BR_TO',
    name: 'Brasil - Tocantins',
    currency: 'BRL',
    locale: 'pt-BR',
    timezone: 'America/Araguaina',
  },
];

async function main() {
  for (const config of configurations) {
    await prisma.regionalConfiguration.upsert({
      where: { code: config.code },
      update: config, //se ja existir ele atualiza os dados
      create: config, //se nao existir ele insere os dados
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
