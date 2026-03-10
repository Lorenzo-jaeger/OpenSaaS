#!/bin/bash

# Cores para o output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}🚀 Iniciando OpenSaaS Services...${NC}"

# Limpeza de portas agressiva
echo -e "${BLUE}🧹 Limpando processos antigos e portas 3000 e 3001...${NC}"
pkill -f "next-dev" || true
pkill -f "nest start" || true
fuser -k 3000/tcp 2>/dev/null || true
fuser -k 3001/tcp 2>/dev/null || true
sleep 1

# Subir Docker
echo -e "${BLUE}🐳 Subindo Banco de Dados e Mailpit...${NC}"
docker compose up -d

# Aguardar DB
echo -e "${BLUE}⏳ Aguardando banco de dados estabilizar...${NC}"
sleep 5

# Rodar Migrations (se houver node_modules)
if [ -d "node_modules" ]; then
  echo -e "${BLUE}🔄 Sincronizando Prisma...${NC}"
  cd apps/api && npx prisma generate && cd ../..
fi

# Iniciar aplicações em modo dev via Turbo
echo -e "${GREEN}✨ Tudo pronto! Iniciando Monorepo...${NC}"
npm run dev
