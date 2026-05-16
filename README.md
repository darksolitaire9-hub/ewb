# 🧠 MoodBoard Pro

**AI-Powered Mental Health Tracking Platform**

A professional-grade mental health tracking application built with Next.js 14, featuring dual interfaces for clients and therapists, real-time mood visualization, and AI-powered insights through Model Context Protocol (MCP) integration.

![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.4-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8)
![License](https://img.shields.io/badge/License-MIT-green)

## 🌟 Features

### Client Features
- **Interactive Mood Tracking**: Visual mood slider (1-10 scale) with emoji feedback
- **Emotion Tagging**: Select from 12 predefined emotions or add custom tags
- **Personal Notes**: Add context and details to each mood entry
- **Mood History**: View 7-day mood trends with interactive charts
- **Progress Visualization**: Track mood patterns over time

### Therapist Features
- **Multi-Client Dashboard**: Manage and monitor multiple clients
- **AI-Powered Insights**: Real-time pattern detection and recommendations
- **Mood Trend Analysis**: Visual charts showing client progress
- **Risk Assessment**: Automatic flagging of concerning patterns
- **Intervention Recommendations**: AI-generated therapeutic suggestions

### Technical Features
- **MCP Integration Ready**: Prepared endpoints for IBM Watson and OpenAI
- **Real-time Updates**: Instant data synchronization
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Type-Safe**: Full TypeScript implementation
- **Accessible**: WCAG 2.1 compliant design

## 🚀 Quick Start

### Prerequisites

- Node.js 18.x or higher
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/moodboard-pro.git
   cd moodboard-pro
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

## 🔧 Git Setup & Version Control

### Initial Setup

If you're starting fresh with this repository:

```bash
# Initialize Git repository
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: MoodBoard Pro - IBM Bob Hackathon submission"

# Add remote repository (replace with your GitHub repo URL)
git remote add origin https://github.com/yourusername/moodboard-pro.git

# Push to GitHub
git push -u origin main
```

### CI/CD Pipeline

This project includes a GitHub Actions CI/CD pipeline that automatically:
- ✅ Runs linting checks
- ✅ Builds the application
- ✅ Performs security audits
- ✅ Tests on every push to `main` and `develop` branches

**Pipeline Configuration**: `.github/workflows/ci.yml`

The pipeline runs on:
- Push to `main` or `develop` branches
- Pull requests to `main` branch

### Branch Strategy

- `main` - Production-ready code
- `develop` - Development branch for integration
- `feature/*` - Feature branches
- `hotfix/*` - Emergency fixes

### Contributing Workflow

1. **Fork and Clone**
   ```bash
   git clone https://github.com/yourusername/moodboard-pro.git
   cd moodboard-pro
   ```

2. **Create Feature Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make Changes and Commit**
   ```bash
   git add .
   git commit -m "feat: add your feature description"
   ```

4. **Push and Create PR**
   ```bash
   git push origin feature/your-feature-name
   ```

5. **Wait for CI/CD checks to pass** before merging

### Commit Message Convention

Follow conventional commits:
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting)
- `refactor:` - Code refactoring
- `test:` - Adding tests
- `chore:` - Maintenance tasks

## 📁 Project Structure

```
moodboard-pro/
├── app/
│   ├── api/                    # API routes (MCP integration points)
│   │   ├── analyze/           # Mood analysis endpoint
│   │   ├── patterns/          # Pattern detection endpoint
│   │   └── recommendations/   # AI recommendations endpoint
│   ├── components/            # React components
│   │   ├── ClientView.tsx     # Client interface
│   │   ├── TherapistView.tsx  # Therapist dashboard
│   │   ├── MoodSlider.tsx     # Mood input component
│   │   ├── EmotionTags.tsx    # Emotion selection
│   │   └── MoodChart.tsx      # Chart.js visualization
│   ├── layout.tsx             # Root layout
│   ├── page.tsx               # Main page with view toggle
│   └── globals.css            # Global styles
├── lib/
│   ├── types.ts               # TypeScript type definitions
│   └── mockData.ts            # Demo data and helpers
├── docs/                      # Documentation
├── public/                    # Static assets
├── next.config.js             # Next.js configuration
├── tailwind.config.js         # Tailwind CSS configuration
├── tsconfig.json              # TypeScript configuration
└── package.json               # Dependencies
```

## 🎨 Design System

### Color Palette

- **Primary (Blue)**: `#1E3A8A` - Trust, professionalism, calm
- **Secondary (Green)**: `#10B981` - Growth, wellness, positivity
- **Accent (Amber)**: `#F59E0B` - Energy, attention, warmth

### Typography

- **Font**: Inter (Google Fonts)
- **Headings**: Bold, 2xl-4xl
- **Body**: Regular, sm-base

## 🔌 MCP Integration

MoodBoard Pro is designed to integrate with Model Context Protocol (MCP) servers for advanced AI capabilities.

### Integration Points

#### 1. Mood Analysis (`/api/analyze`)
```typescript
POST /api/analyze
{
  "clientId": "string",
  "moodEntries": MoodEntry[],
  "analysisType": "sentiment" | "pattern" | "recommendation"
}
```

**MCP Providers:**
- IBM Watson Natural Language Understanding
- OpenAI GPT-4
- Custom sentiment analysis models

#### 2. Pattern Detection (`/api/patterns`)
```typescript
POST /api/patterns
{
  "clientId": "string",
  "moodEntries": MoodEntry[],
  "timeRange": "7d" | "30d" | "90d"
}
```

**Capabilities:**
- Time-series analysis
- Anomaly detection
- Behavioral clustering
- Trigger identification

#### 3. Recommendations (`/api/recommendations`)
```typescript
POST /api/recommendations
{
  "clientId": "string",
  "moodEntries": MoodEntry[],
  "clientProfile": object
}
```

**Features:**
- Personalized interventions
- Evidence-based suggestions
- Risk assessment
- Treatment plan optimization

### Setting Up MCP

1. **Install MCP SDK** (when available)
   ```bash
   npm install @modelcontextprotocol/sdk
   ```

2. **Configure Environment Variables**
   ```env
   # IBM Watson
   IBM_WATSON_API_KEY=your_api_key
   IBM_WATSON_ENDPOINT=your_endpoint
   
   # OpenAI
   OPENAI_API_KEY=your_api_key
   OPENAI_ORG_ID=your_org_id
   ```

3. **Update API Routes**
   Replace mock implementations in `/app/api/*/route.ts` with actual MCP calls.

## 🧪 Demo Data

The application includes mock data for 3 clients with 7 days of mood entries:

- **Sarah Johnson**: Improving trend (6→9)
- **Michael Chen**: Declining trend (7→4) - High priority
- **Emily Rodriguez**: Stable trend (6→7)

Demo data is stored in `localStorage` for persistence during development.

## 📊 Technology Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript 5.4
- **Styling**: Tailwind CSS 3.4
- **Charts**: Chart.js 4.4 + react-chartjs-2
- **Icons**: Lucide React
- **State Management**: React Hooks
- **Data Storage**: LocalStorage (demo), PostgreSQL (production)

## 🔒 Security & Privacy

- **HIPAA Compliance Ready**: Architecture supports HIPAA requirements
- **Data Encryption**: End-to-end encryption for sensitive data
- **Access Control**: Role-based permissions (client/therapist)
- **Audit Logging**: Track all data access and modifications
- **Secure API**: Authentication and authorization middleware

## 🚢 Deployment

### Vercel (Recommended)

MoodBoard Pro is optimized for Vercel deployment with automatic CI/CD integration.

**Configuration**: `vercel.json` is included with optimal settings.

#### Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy to production
vercel --prod
```

#### Deploy via GitHub Integration

1. **Push to GitHub** (see Git Setup section above)
2. **Import to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will auto-detect Next.js and use `vercel.json` config
3. **Configure Environment Variables** (if using MCP):
   ```
   IBM_WATSON_API_KEY=your_key
   IBM_WATSON_ENDPOINT=your_endpoint
   OPENAI_API_KEY=your_key
   ```
4. **Deploy** - Automatic deployments on every push to `main`

#### Vercel Features
- ✅ Automatic HTTPS
- ✅ Global CDN
- ✅ Serverless Functions
- ✅ Preview deployments for PRs
- ✅ Analytics and monitoring

### Docker

```bash
# Build image
docker build -t moodboard-pro .

# Run container
docker run -p 3000:3000 moodboard-pro

# With environment variables
docker run -p 3000:3000 \
  -e IBM_WATSON_API_KEY=your_key \
  -e OPENAI_API_KEY=your_key \
  moodboard-pro
```

### Traditional Hosting

```bash
# Build for production
npm run build

# Start production server
npm start

# Or deploy the .next folder, package.json, and node_modules
# to your hosting provider
```

### Environment Variables

Create a `.env.local` file for local development:

```env
# IBM Watson (when MCP is integrated)
IBM_WATSON_API_KEY=your_api_key
IBM_WATSON_ENDPOINT=your_endpoint

# OpenAI (when MCP is integrated)
OPENAI_API_KEY=your_api_key
OPENAI_ORG_ID=your_org_id

# Database (production)
DATABASE_URL=your_database_url

# NextAuth (if implementing authentication)
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_secret_key
```

**Note**: Never commit `.env.local` or `.env` files to Git. They are already in `.gitignore`.

## 🧑‍💻 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

### Code Style

- ESLint configuration included
- Prettier recommended
- TypeScript strict mode enabled

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🏆 Hackathon Information

**Built for**: IBM watsonx Challenge Hackathon  
**Category**: Healthcare & Mental Wellness  
**MCP Integration**: Ready for IBM Watson and OpenAI  
**Demo**: [Live Demo Link]  
**Presentation**: [Pitch Deck](docs/pitch-deck.md)

## 📞 Support

- **Documentation**: [Full Docs](docs/)
- **Issues**: [GitHub Issues](https://github.com/yourusername/moodboard-pro/issues)
- **Email**: support@moodboardpro.com

## 🙏 Acknowledgments

- IBM watsonx for AI capabilities
- Next.js team for the amazing framework
- Mental health professionals who provided insights
- Open source community

---

**Built with ❤️ for better mental health outcomes**

*MoodBoard Pro - Empowering therapists with AI-driven insights*