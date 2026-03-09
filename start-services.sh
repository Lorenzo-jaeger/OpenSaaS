#!/bin/bash

# Cores para o output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}🚀 Iniciando OpenSaaS Services...${NC}"

# Limpeza de portas (opcional mas útil)
echo -e "${BLUE}🧹 Limpando portas 3000 e 3001...${NC}"
fuser -k 3000/tcp 2>/dev/null
fuser -k 3001/tcp 2>/dev/null

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
