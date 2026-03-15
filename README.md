<div align="center">

# 🏪 Store Management System

### نظام إدارة المتاجر المتكامل

<p align="center">
  <strong>A modern, full-stack store management solution built with cutting-edge technologies</strong>
</p>

<br/>

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![.NET](https://img.shields.io/badge/.NET-10-512BD4?style=for-the-badge&logo=dotnet&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)

<br/>

![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)
![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen?style=flat-square)
![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg?style=flat-square)

---

[Features](#-features) •
[Tech Stack](#-tech-stack) •
[Architecture](#-architecture) •
[Getting Started](#-getting-started) •
[API Endpoints](#-api-endpoints) •
[Project Structure](#-project-structure)

</div>

<br/>

## ✨ Features

| Feature                    | Description                                         |
| -------------------------- | --------------------------------------------------- |
| 🔐 **Authentication**      | Secure JWT-based auth with refresh token rotation   |
| 📦 **Product Management**  | Full CRUD with category-based organization          |
| 🏷️ **Categories**          | Hierarchical product categorization                 |
| 👥 **Client Management**   | Track and manage customer information               |
| 🛒 **Order Processing**    | Complete order lifecycle with item management       |
| 💰 **Payment Tracking**    | Monitor and record payments                         |
| 📊 **Debt Management**     | Track client debts and balances                     |
| 🔄 **Returns & Refunds**   | Handle product returns with item-level tracking     |
| 🚚 **Supplier Management** | Manage suppliers and supplier-product relationships |
| 📋 **Audit Logging**       | Track all system changes for accountability         |

<br/>

## 🛠️ Tech Stack

### Frontend

<table>
  <tr>
    <td align="center" width="120">
      <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" width="40" height="40" alt="Next.js"/>
      <br/><strong>Next.js 16</strong>
      <br/><sub>App Router + Turbopack</sub>
    </td>
    <td align="center" width="120">
      <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" width="40" height="40" alt="React"/>
      <br/><strong>React 19</strong>
      <br/><sub>Server Components</sub>
    </td>
    <td align="center" width="120">
      <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" width="40" height="40" alt="TypeScript"/>
      <br/><strong>TypeScript 5</strong>
      <br/><sub>Type Safety</sub>
    </td>
    <td align="center" width="120">
      <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" width="40" height="40" alt="Tailwind"/>
      <br/><strong>Tailwind CSS 4</strong>
      <br/><sub>Utility-First</sub>
    </td>
  </tr>
</table>

| Library                                                                                                                    | Purpose                             |
| -------------------------------------------------------------------------------------------------------------------------- | ----------------------------------- |
| ![TanStack Query](https://img.shields.io/badge/TanStack_Query-v5-FF4154?style=flat-square&logo=reactquery&logoColor=white) | Server state management & caching   |
| ![Zustand](https://img.shields.io/badge/Zustand-v5-433E38?style=flat-square)                                               | Lightweight client state management |
| ![Jose](https://img.shields.io/badge/Jose-v6-000000?style=flat-square)                                                     | JWT token handling & validation     |
| ![Heroicons](https://img.shields.io/badge/Heroicons-v2-8B5CF6?style=flat-square)                                           | Beautiful SVG icon library          |

### Backend

<table>
  <tr>
    <td align="center" width="120">
      <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dotnetcore/dotnetcore-original.svg" width="40" height="40" alt=".NET"/>
      <br/><strong>.NET 10</strong>
      <br/><sub>Web API</sub>
    </td>
    <td align="center" width="120">
      <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg" width="40" height="40" alt="C#"/>
      <br/><strong>C#</strong>
      <br/><sub>Clean Code</sub>
    </td>
    <td align="center" width="120">
      <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" width="40" height="40" alt="PostgreSQL"/>
      <br/><strong>PostgreSQL</strong>
      <br/><sub>Database</sub>
    </td>
  </tr>
</table>

| Library                                                                                                    | Purpose                                        |
| ---------------------------------------------------------------------------------------------------------- | ---------------------------------------------- |
| ![EF Core](https://img.shields.io/badge/EF_Core-10-512BD4?style=flat-square&logo=dotnet)                   | ORM & database migrations                      |
| ![Dapper](https://img.shields.io/badge/Dapper-2.1-512BD4?style=flat-square)                                | High-performance micro-ORM for complex queries |
| ![MediatR](https://img.shields.io/badge/MediatR-11-239120?style=flat-square)                               | Implementing CQRS pattern in Application layer |
| ![JWT Bearer](https://img.shields.io/badge/JWT_Bearer-10-000000?style=flat-square)                         | Authentication middleware                      |
| ![Swagger](https://img.shields.io/badge/Swagger-8.1-85EA2D?style=flat-square&logo=swagger&logoColor=black) | API documentation & testing                    |
| ![ASP.NET Identity](https://img.shields.io/badge/ASP.NET_Identity-10-512BD4?style=flat-square)             | User & role management                         |

<br/>

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        Frontend                             │
│  ┌───────────┐  ┌──────────┐  ┌──────────┐  ┌───────────┐  │
│  │  Next.js   │  │  Zustand  │  │ TanStack │  │ Tailwind  │  │
│  │ App Router │  │  Store    │  │  Query   │  │   CSS 4   │  │
│  └─────┬─────┘  └────┬─────┘  └────┬─────┘  └───────────┘  │
│        │              │             │                        │
│        └──────────────┴─────────────┘                        │
│                       │                                      │
└───────────────────────┼──────────────────────────────────────┘
                        │  REST API (JWT Auth)
┌───────────────────────┼──────────────────────────────────────┐
│                       │           Backend                    │
│  ┌────────────────────▼────────────────────────────────────┐ │
│  │              StoreApi.Api (Presentation)                │ │
│  │         Controllers · Middleware · Authorization        │ │
│  └────────────────────┬────────────────────────────────────┘ │
│  ┌────────────────────▼────────────────────────────────────┐ │
│  │         StoreSystem.Application (Business Logic)        │ │
│  │              Services · DTOs · Validators               │ │
│  └────────────────────┬────────────────────────────────────┘ │
│  ┌────────────────────▼────────────────────────────────────┐ │
│  │              StoreSystem.Core (Domain)                  │ │
│  │        Entities · Interfaces · Enums · Models           │ │
│  └────────────────────┬────────────────────────────────────┘ │
│  ┌────────────────────▼────────────────────────────────────┐ │
│  │       StoreSystem.Infrastructure (Data Access)          │ │
│  │     EF Core · Dapper · Migrations · Repositories       │ │
│  └─────────────────────────────────────────────────────────┘ │
│                           │                                  │
└───────────────────────────┼──────────────────────────────────┘
                            │
                   ┌────────▼────────┐
                   │   PostgreSQL    │
                   │    Database     │
                   └─────────────────┘
```

<br/>

## 🚀 Getting Started

### Prerequisites

| Tool       | Version   |
| ---------- | --------- |
| Node.js    | `>= 18.x` |
| .NET SDK   | `10.0`    |
| PostgreSQL | `>= 14`   |

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/b2i0l0a3l/Store.git
cd Store
```

### 2️⃣ Backend Setup

```bash
# Navigate to backend
cd Backend

# Copy environment variables
cp .env.example .env
# Edit .env with your database connection string and JWT settings

# Restore dependencies
dotnet restore

# Apply database migrations
dotnet ef database update --project StoreSystem.Infrastructure --startup-project StoreApi.Api

# Run the API server
dotnet run --project StoreApi.Api
```

> [!TIP]
> The API will be available at `https://localhost:5001` with Swagger UI at `/swagger`

### 3️⃣ Frontend Setup

```bash
# Navigate to frontend
cd FrontEnd

# Install dependencies
npm install

# Configure environment
cp .env.local.example .env.local
# Set NEXT_PUBLIC_API_URL to your backend URL

# Start development server (with Turbopack ⚡)
npm run dev
```

> [!TIP]
> The app will be available at `http://localhost:3000`

<br/>

## 📡 API Endpoints

<details>
<summary><strong>🔐 Authentication</strong></summary>

| Method | Endpoint             | Description            |
| ------ | -------------------- | ---------------------- |
| `POST` | `/api/auth/register` | Register a new user    |
| `POST` | `/api/auth/login`    | Login & get JWT tokens |
| `POST` | `/api/auth/refresh`  | Refresh access token   |

</details>

<details>
<summary><strong>📦 Products</strong></summary>

| Method   | Endpoint             | Description          |
| -------- | -------------------- | -------------------- |
| `GET`    | `/api/products`      | Get all products     |
| `GET`    | `/api/products/{id}` | Get product by ID    |
| `POST`   | `/api/products`      | Create a new product |
| `PUT`    | `/api/products/{id}` | Update a product     |
| `DELETE` | `/api/products/{id}` | Delete a product     |

</details>

<details>
<summary><strong>🏷️ Categories</strong></summary>

| Method   | Endpoint               | Description           |
| -------- | ---------------------- | --------------------- |
| `GET`    | `/api/categories`      | Get all categories    |
| `GET`    | `/api/categories/{id}` | Get category by ID    |
| `POST`   | `/api/categories`      | Create a new category |
| `PUT`    | `/api/categories/{id}` | Update a category     |
| `DELETE` | `/api/categories/{id}` | Delete a category     |

</details>

<details>
<summary><strong>👥 Clients</strong></summary>

| Method   | Endpoint            | Description         |
| -------- | ------------------- | ------------------- |
| `GET`    | `/api/clients`      | Get all clients     |
| `GET`    | `/api/clients/{id}` | Get client by ID    |
| `POST`   | `/api/clients`      | Create a new client |
| `PUT`    | `/api/clients/{id}` | Update a client     |
| `DELETE` | `/api/clients/{id}` | Delete a client     |

</details>

<details>
<summary><strong>🛒 Orders · 💰 Payments · 📊 Debts · 🔄 Returns · 🚚 Suppliers</strong></summary>

> Full CRUD endpoints available for all resources. See Swagger UI for complete documentation.

</details>

<br/>

## 📁 Project Structure

```
store/
├── 📂 Backend/                          # .NET 10 Web API
│   ├── 📂 StoreApi.Api/                 # Presentation Layer
│   │   ├── 📂 Controllers/              # API Controllers (12)
│   │   ├── 📂 Authorization/            # Auth configuration
│   │   ├── 📂 Middleware/               # Custom middleware
│   │   └── 📄 Program.cs               # App entry point
│   ├── 📂 StoreSystem.Application/      # Business Logic Layer
│   ├── 📂 StoreSystem.Core/             # Domain Layer
│   │   ├── 📂 Entities/                 # Domain entities (14)
│   │   ├── 📂 Models/                   # DTOs & view models
│   │   ├── 📂 Interfaces/              # Repository contracts
│   │   └── 📂 Enums/                   # Enumerations
│   └── 📂 StoreSystem.Infrastructure/   # Data Access Layer
│       ├── 📂 Migrations/              # EF Core migrations
│       ├── 📂 Presistence/             # DbContext & configs
│       └── 📂 Shared/                  # Shared implementations
│
└── 📂 FrontEnd/                         # Next.js 16 App
    └── 📂 app/
        ├── 📂 (auth)/                   # Auth pages (Login/Register)
        ├── 📂 (marketing)/              # Public pages
        ├── 📂 Features/                 # Feature modules
        │   ├── 📂 Products/             # Product management
        │   ├── 📂 Categories/           # Category management
        │   ├── 📂 clients/              # Client management
        │   ├── 📂 Orders/               # Order management
        │   ├── 📂 Debts/                # Debt tracking
        │   └── 📂 Sells/               # Sales management
        ├── 📂 components/               # Shared UI components
        └── 📂 util/                     # Utilities & helpers
```

<br/>

## 🔑 Key Design Decisions

- **CQRS Pattern** — Clear separation of Commands (Writes) and Queries (Reads) using **MediatR** in the Application layer
- **Clean Architecture** — Backend follows layered architecture with dependency inversion
- **Feature-Based Architecture** — Frontend organized by business feature for scalability
- **Dual ORM Strategy** — EF Core for CRUD operations + Dapper for complex/performance-critical queries
- **Server Components** — Leverages React 19 Server Components for optimal performance
- **Turbopack** — Uses Next.js Turbopack for lightning-fast development builds

<br/>

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

<br/>

## 📝 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

<br/>

<div align="center">

---

<p>
  <sub>Built with ❤️ using modern web technologies</sub>
</p>

![Stars](https://img.shields.io/github/stars/your-username/store-management-system?style=social)
![Forks](https://img.shields.io/github/forks/your-username/store-management-system?style=social)

</div>
