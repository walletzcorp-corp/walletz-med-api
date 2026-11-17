#!/bin/sh
# Executado apenas na primeira inicialização do volume.
# Cria o schema usado no DATABASE_URL (?schema=walletzmed).
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
  CREATE SCHEMA IF NOT EXISTS "${POSTGRES_SCHEMA}" AUTHORIZATION "${POSTGRES_USER}";
  ALTER DATABASE "${POSTGRES_DB}" SET search_path TO "${POSTGRES_SCHEMA}", public;
EOSQL
