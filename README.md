---

# 🍔 Hamburgueria SaaS

Esse projeto é um sistema completo de hamburgueria no estilo SaaS, dividido em três aplicações separadas pra manter tudo escalável e organizado como um setup de produção real:

* ⚙️ **API (Laravel)** — coração do sistema
* 🧑‍💼 **Admin Panel (React)** — painel de gerenciamento
* 🍔 **Burger Front (React)** — vitrine do cliente

---

## 🧠 Arquitetura do projeto

<p align="center">
  <img src="./docs/mermaid-diagram.png" width="850"/>
</p>

A ideia aqui foi separar tudo no estilo “micro front + backend API”, pra deixar o sistema pronto pra escalar depois (multi-tenant, várias lojas, etc).

---

## 🧱 Stack utilizada

### ⚙️ Backend (API)

* Laravel 10+
* Sanctum pra autenticação
* PostgreSQL
* Storage local (já preparado pra S3 se quiser evoluir depois)

### 🧑‍💼 Admin Front

* React + Vite
* TypeScript
* Zustand pra state management (leve e direto ao ponto)
* TailwindCSS pra estilização rápida
* Axios pra consumir API

### 🍔 Burger Front (cliente)

* React + Vite
* TailwindCSS
* Zustand (carrinho simples e eficiente)

---

## 📁 Estrutura do projeto

```bash
Hamburgueria/
│
├── api/               # Laravel (backend)
├── admin-front/       # painel administrativo
├── burger-front/      # front do cliente
└── docs/              # diagramas e documentação
```

---

## ⚙️ O que esse projeto entrega

### 🧑‍💼 Admin (modo “gestão raiz”)

* Login com Sanctum
* CRUD completo de burgers
* Upload de imagens
* Painel protegido (auth middleware)

### 🍔 Cliente (modo vitrine)

* Listagem de produtos
* Página de detalhes
* Carrinho funcional
* UX clean estilo food delivery

### 🔐 API

* Autenticação segura
* CRUD de produtos
* Upload de imagens
* Middleware protegendo rotas privadas

---

# 🖼️ Architecture Diagram

Arquivo base:

```
docs/mermaid-diagram.png
```

---

# 🚀 Como rodar o projeto (modo FRESH START via fork)

Aqui é o fluxo padrão pra quem vai clonar e subir o projeto do zero.

---

## 1. 🍴 Fork no GitHub

Primeiro passo padrão de dev:

* clica em **Fork**
* escolhe teu repositório
* pronto, cópia independente do projeto

---

## 2. 📥 Clonar o projeto

```bash
git clone https://github.com/SEU-USUARIO/Hamburgueria.git
cd Hamburgueria
```

---

## 3. ⚙️ Subindo a API (Laravel)

```bash
cd api
composer install
cp .env.example .env
php artisan key:generate
```

Configura o banco no `.env`:

```env
DB_DATABASE=hamburgueria
DB_USERNAME=postgres
DB_PASSWORD=senha
```

Agora roda tudo:

```bash
php artisan migrate
php artisan serve
```

👉 API vai subir em:

```
http://localhost:8000
```

---

## 4. 🧑‍💼 Subindo o Admin

```bash
cd admin-front
npm install
npm run dev
```

👉 roda em:

```
http://localhost:5173
```

---

## 5. 🍔 Subindo o Front do Cliente

```bash
cd burger-front
npm install
npm run dev
```

👉 roda em:

```
http://localhost:5174
```

---

## 6. 🔗 Configuração da API

Nos dois fronts (admin e cliente), cria um `.env`:

```env
VITE_API_URL=http://localhost:8000
```

---

# 🔐 Autenticação (modo seguro)

* Login via `/api/login`
* Sanctum token-based auth
* Rotas protegidas no admin

---

# 🖼️ Upload de imagens

As imagens vão pra:

```
storage/app/public/burgers
```

E precisa rodar:

```bash
php artisan storage:link
```

---

# 📌 Roadmap (ideias pra evolução)

Aqui já entra nível SaaS mesmo:

* checkout real (Stripe / Mercado Pago)
* multi-loja (SaaS raiz mesmo)
* dashboard com analytics
* pedidos em tempo real
* deploy full (Vercel + Render)
* websocket pra pedidos ao vivo

---

# 🧠 visão geral do projeto

Esse sistema foi pensado como base de SaaS modular:

👉 API independente
👉 front cliente leve
👉 admin escalável

Ou seja: pronto pra virar produto real.

---

# 🚀 Resultado final

No fim das contas você tem:

✔ Backend sólido
✔ Front cliente funcional
✔ Admin completo
✔ Arquitetura escalável
✔ Base pra SaaS de verdade

---
