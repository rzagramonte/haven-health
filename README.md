# 🏥 Community Health Clinic

A full-stack demo application for a fictional community health clinic, built with [Next.js](https://nextjs.org), [Supabase](https://supabase.com), [Tailwind CSS](https://tailwindcss.com), and [shadcn/ui](https://ui.shadcn.com). This project showcases developer skills across frontend, backend, and infrastructure, and is designed as a polished portfolio piece for hiring teams.

---

## 🚀 Features

- **Patient Intake & Form Capture**  
  Collect demographic, medical history, and contact information.

- **Appointment Scheduling & Reminders**  
  Book visits, send reminders, and support follow-up logic.

- **Insurance Eligibility Check**  
  Flag basic eligibility (yes/no) based on minimal criteria.

- **Provider Dashboard**  
  Track wait times, no-show rates, and appointment flow.

### ⚡ Stretch Goals (Planned)

- Claims tracking integration
- Point-of-care inventory
- Clinical decision alerts
- Mobile outreach module for on-site services (sync-capable)

---

## 🛠️ Tech Stack

<table>
  <tr>
    <td align="center" width="96">
      <a href="https://nextjs.org">
        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" width="48" height="48" alt="Next.js" />
      </a>
      <br>Next.js
    </td>
    <td align="center" width="96">
      <a href="https://www.typescriptlang.org">
        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" width="48" height="48" alt="TypeScript" />
      </a>
      <br>TypeScript
    </td>
    <td align="center" width="96">
      <a href="https://tailwindcss.com">
        <img src="https://raw.githubusercontent.com/devicons/devicon/6910f0503efdd315c8f9b858234310c06e04d9c0/icons/tailwindcss/tailwindcss-original.svg" width="48" height="48" alt="TailwindCSS" />
      </a>
      <br>Tailwind
    </td>
    <td align="center" width="96">
      <a href="https://ui.shadcn.com">
        <img src="https://avatars.githubusercontent.com/u/139895814?s=200&v=4" width="48" height="48" alt="shadcn/ui" />
      </a>
      <br>shadcn/ui
    </td>
  </tr>
  <tr>
    <td align="center" width="96"> 
      <a href="https://supabase.com">
        <img src="https://avatars.githubusercontent.com/u/54469796?s=200&v=4" width="48" height="48" alt="Supabase" />
      </a>
      <br>Supabase
    </td>
    <td align="center" width="96">
      <a href="https://www.postgresql.org">
        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" width="48" height="48" alt="PostgreSQL" />
      </a>
      <br>PostgreSQL
    </td>
    <td align="center" width="96">
      <a href="https://www.docker.com">
        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" width="48" height="48" alt="Docker" />
      </a>
      <br>Docker
    </td>
    <td align="center" width="96">
      <a href="https://vercel.com">
        <img src="https://cdn.worldvectorlogo.com/logos/vercel.svg" width="48" height="48" alt="Vercel" />
      </a>
      <br>Vercel
    </td>
  </tr>
  <tr>
    <td align="center" width="96">
      <a href="https://eslint.org">
        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/eslint/eslint-original.svg" width="48" height="48" alt="ESLint" />
      </a>
      <br>ESLint
    </td>
    <td align="center" width="96">
      <a href="https://prettier.io">
        <img src="https://prettier.io/icon.png" width="48" height="48" alt="Prettier" />
      </a>
      <br>Prettier
    </td>
    <td align="center" width="96">
      <a href="https://vitest.dev">
        <img src="https://vitest.dev/logo.svg" width="48" height="48" alt="Vitest" />
      </a>
      <br>Vitest
    </td>
    <td align="center" width="96">
      <a href="https://github.com/features/actions">
        <img src="https://avatars.githubusercontent.com/u/44036562?s=200&v=4" width="48" height="48" alt="GitHub Actions" />
      </a>
      <br>GitHub Actions
    </td>
  </tr>
</table>

---

## 🖥️ Local Development

### Prerequisites

- Node.js >= 20
- Docker Desktop

### Getting Started

```bash
# 1. Clone the repo
git clone https://github.com/your-org/community-health-clinic.git
cd community-health-clinic

# 2. Start Supabase (ensure docker desktop is running first!)
npm run sb:start

# 3. Run the app
npm install
npm run dev
```

### Environment Variables

Copy `.env.example` to `.env.local` and update values as needed.  
Note: Supabase secrets will be available via local Docker if using `supabase start`.

---

## 🌐 Live Demo

👉 [Live Site on Vercel](https://dsd-east-coast-goats.vercel.app/)

---

## 👥 Contributing

We welcome clean, well-documented contributions.

### Steps

1. clone this repo
2. Create a branch: `git checkout -b feature/your-feature-name`
3. Make your changes and commit
4. Push: `git push -u origin head`
5. Open a pull request

See [`CONTRIBUTING.md`](./CONTRIBUTING.md) for code style and review guidelines.

---

## 📸 Screenshots

> Add Loom demo or UI screenshots here.

---

## 📌 Project Status

✅ MVP complete  
🛠️ Stretch goals in progress  
📨 [Meet the devs](./TEAM.md)

---

## 🎯 Why This Project?

This project demonstrates:

- Full-stack system design
- Component-based frontend architecture
- Scalable developer tooling and deployment

# Our Team

## Core Contributors

<table>
  <tr>
    <th>Avatar</th>
    <th>Name</th>
    <th>Role</th>
    <th>GitHub</th>
    <th>LinkedIn</th>
  </tr>
  <tr>
    <td><img src="https://github.com/dgorik.png" width="50" height="50" alt="Daniel's profile image" style="border-radius: 50%"/></td>
    <td>Daniel Gorbachev</td>
    <td>Full Stack Developer</td>
    <td><a href="https://github.com/dgorik">@dgorik</a></td>
    <td><a href="https://linkedin.com/in/johndoe">LinkedIn Profile</a></td>
  </tr>
  <tr>
    <td><img src="https://github.com/Dillon-Goetz.png" width="50" height="50" alt="Dillon's profile image" style="border-radius: 50%"/></td>
    <td>Dillon Gotez</td>
    <td>Full Stack Developer</td>
    <td><a href="https://github.com/Dillon-Goetz">@Dillon-Goetz</a></td>
    <td><a href="https://linkedin.com/in/janesmith">LinkedIn Profile</a></td>
  </tr>
  <tr>
    <td><img src="https://github.com/elvisEspinozaN.png" width="50" height="50" alt="Elvis's profile image" style="border-radius: 50%"/></td>
    <td>Elvis Espinoza</td>
    <td>Full Stack Developer</td>
    <td><a href="https://github.com/elvisEspinozaN">@elvisEspinozaN</a></td>
    <td><a href="https://linkedin.com/in/janesmith">LinkedIn Profile</a></td>
  </tr>
  <tr>
    <td><img src="https://github.com/tascapeter514.png" width="50" height="50" alt="Peter's profile image" style="border-radius: 50%"/></td>
    <td>Peter Tasca</td>
    <td>Full Stack Developer</td>
    <td><a href="https://github.com/tascapeter514">@tascapeter514</a></td>
    <td><a href="https://linkedin.com/in/janesmith">LinkedIn Profile</a></td>
  </tr>
  <tr>
    <td><img src="https://github.com/rzagramonte.png" width="50" height="50" alt="Roosiel's profile image" style="border-radius: 50%"/></td>
    <td>Roosiel Agramonte</td>
    <td>Full Stack Developer</td>
    <td><a href="https://github.com/rzagramonte">@rzagramonte</a></td>
    <td><a href="https://linkedin.com/in/janesmith">LinkedIn Profile</a></td>
  </tr>
  <tr>
    <td><img src="https://github.com/walterfurrer.png" width="50" height="50" alt="Walter's profile image" style="border-radius: 50%"/></td>
    <td>Walter Furrer</td>
    <td>Full Stack Developer</td>
    <td><a href="https://github.com/watlerfurrer">@watlerfurrer</a></td>
    <td><a href="https://linkedin.com/in/janesmith">LinkedIn Profile</a></td>
  </tr>
  <tr>
    <td colspan="5"><hr/></td>
  </tr>
  <tr>
    <td><img src="https://github.com/destocot.png" width="50" height="50" alt="Khurram's profile image" style="border-radius: 50%"/></td>
    <td>Khurram</td>
    <td>Cohort Lead</td>
    <td><a href="https://github.com/destocot">@destocot</a></td>
    <td>
    <div style="flex-direction: column; align-items: center; display: flex; justify-content: center; height: 50px;">
    <a href="https://www.linkedin.com/in/khurram-ali1">LinkedIn Profile</a>
    <a href="https://www.youtube.com/@GiraffeReactor">YouTube Channel</a>
    </td>
    </div>
  </tr>
  <tr>
    <td><img src="https://github.com/ncharris93.png" width="50" height="50" alt="Noah's profile image" style="border-radius: 50%"/></td>
    <td>Noah Harris</td>
    <td>Cohort Lead</td>
    <td><a href="https://github.com/ncharris93">@ncharris93</a></td>
    <td><a href="https://www.linkedin.com/in/nharris31/">LinkedIn Profile</a></td>
  </tr>
</table>

# CI/CD Pipeline

- Blue: Developer actions
- Purple: CI Pipeline (testing & validation)
- Green: CD Pipeline (migrations, releases & deployment)
- Orange: Vercel deployment steps
- Red: Critical migration step
- Light Blue: Release process

```mermaid
graph TD
      A[Push to main branch] --> B[GitHub Actions Triggered]

      B --> C[CI Pipeline]
      B --> D[CD Pipeline]

      C --> C1[Lint & Test Job]
      C1 --> C2[Setup Node.js 22]
      C2 --> C3[Install Dependencies]
      C3 --> C4[Run ESLint]
      C4 --> C5[TypeScript Check]
      C5 --> C6[Run Vitest Tests]
      C6 --> C7[Build Check]

      C --> C8[Test Migrations Job<br/>PR only]
      C8 --> C9[Start PostgreSQL Container]
      C9 --> C10[Apply Migrations to Test DB]
      C10 --> C11[Validate Migration Success]

      D --> D1[Setup Node.js & Dependencies]
      D1 --> D2{Migration Files<br/>Exist?}

      D2 -->|No| D8[Semantic Release]
      D2 -->|Yes| D3[Install Supabase CLI<br/>cached]
      D3 --> D4[Check Migration Status]
      D4 --> D5{New Migrations<br/>Pending?}

      D5 -->|No| D8
      D5 -->|Yes| D6[Apply Migrations to Production]
      D6 --> D8

      D8 --> D9[Analyze Commits]
      D9 --> D10[Bump Version]
      D10 --> D11[Update CHANGELOG.md]
      D11 --> D12[Create Git Tag]
      D12 --> D13[Create GitHub Release]

      D13 --> E1[Build Application<br/>with env vars]
      E1 --> E2[Install Vercel CLI]
      E2 --> E3[Pull Vercel Config]
      E3 --> E4[Build for Production]
      E4 --> E5[Deploy to Vercel]
      E5 --> E6[Live Site Updated]

      style A fill:#e1f5fe
      style C fill:#f3e5f5
      style D fill:#e8f5e8
      style D6 fill:#ffebee
      style D8 fill:#e3f2fd
      style E1 fill:#fff3e0
      style E2 fill:#fff3e0
      style E3 fill:#fff3e0
      style E4 fill:#fff3e0
      style E5 fill:#fff3e0
      style E6 fill:#fff3e0
```
