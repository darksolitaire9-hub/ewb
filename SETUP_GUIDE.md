# 🚀 MoodBoard Pro - Quick Setup Guide

## Prerequisites Check

Before starting, ensure you have:
- ✅ Node.js 18.x or higher (`node --version`)
- ✅ npm or yarn (`npm --version`)
- ✅ Git (optional, for version control)

## 5-Minute Setup

### Step 1: Install Dependencies

```bash
npm install
```

This will install all required packages:
- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Chart.js
- Lucide React (icons)

### Step 2: Start Development Server

```bash
npm run dev
```

The application will start at: **http://localhost:3000**

### Step 3: Explore the Application

1. **Client View** (Default)
   - Use the mood slider to set your mood (1-10)
   - Select emotions that describe how you feel
   - Add optional notes
   - Click "Save Mood Entry"
   - View your mood history and trends

2. **Therapist View** (Toggle at top)
   - See all 3 demo clients
   - Click on a client to view their dashboard
   - Review AI-powered insights
   - Analyze mood trends and patterns
   - View recommendations

## Project Structure Overview

```
moodboard-pro/
├── app/
│   ├── api/                    # API endpoints (MCP ready)
│   │   ├── analyze/           # Mood analysis
│   │   ├── patterns/          # Pattern detection
│   │   └── recommendations/   # AI recommendations
│   ├── components/            # React components
│   │   ├── ClientView.tsx     # Client interface
│   │   ├── TherapistView.tsx  # Therapist dashboard
│   │   ├── MoodSlider.tsx     # Interactive slider
│   │   ├── EmotionTags.tsx    # Emotion selector
│   │   └── MoodChart.tsx      # Chart visualization
│   ├── layout.tsx             # Root layout
│   ├── page.tsx               # Main page
│   └── globals.css            # Styles
├── lib/
│   ├── types.ts               # TypeScript types
│   └── mockData.ts            # Demo data
└── Configuration files
```

## Demo Data

The app includes 3 mock clients:

1. **Sarah Johnson** - Improving trend (6→9)
2. **Michael Chen** - Declining trend (7→4) ⚠️ High priority
3. **Emily Rodriguez** - Stable trend (6→7)

Each has 7 days of mood entries with emotions and notes.

## Key Features to Test

### Client Features
- ✅ Mood slider with emoji feedback
- ✅ 12 emotion tags to choose from
- ✅ Personal notes field
- ✅ Mood history with chart
- ✅ Statistics (average, highest, lowest)

### Therapist Features
- ✅ Multi-client dashboard
- ✅ Client selection cards
- ✅ Mood trend visualization
- ✅ AI insights panel (mock data)
- ✅ Pattern detection
- ✅ Risk assessment
- ✅ Recommendations

## Common Commands

```bash
# Development
npm run dev          # Start dev server

# Production
npm run build        # Build for production
npm start            # Start production server

# Code Quality
npm run lint         # Run ESLint
```

## Troubleshooting

### Port Already in Use
```bash
# Kill process on port 3000
npx kill-port 3000

# Or use a different port
npm run dev -- -p 3001
```

### TypeScript Errors
The TypeScript errors you see are expected before running `npm install`. They will resolve after installing dependencies.

### Clear Cache
```bash
rm -rf .next
rm -rf node_modules
npm install
```

## Next Steps

### 1. Customize the Application
- Update colors in `tailwind.config.js`
- Modify emotion tags in `app/components/EmotionTags.tsx`
- Add more mock clients in `lib/mockData.ts`

### 2. MCP Integration (Production)
- Set up IBM Watson credentials
- Configure OpenAI API keys
- Update API routes in `app/api/*/route.ts`
- Replace mock data with real AI calls

### 3. Database Integration
- Set up PostgreSQL or MongoDB
- Replace localStorage with database calls
- Implement user authentication
- Add data persistence

### 4. Deploy
```bash
# Vercel (Recommended)
npm install -g vercel
vercel

# Or use Docker
docker build -t moodboard-pro .
docker run -p 3000:3000 moodboard-pro
```

## Environment Variables (Production)

Create a `.env.local` file:

```env
# IBM Watson
IBM_WATSON_API_KEY=your_api_key
IBM_WATSON_ENDPOINT=your_endpoint

# OpenAI
OPENAI_API_KEY=your_api_key
OPENAI_ORG_ID=your_org_id

# Database
DATABASE_URL=postgresql://...

# Authentication
NEXTAUTH_SECRET=your_secret
NEXTAUTH_URL=http://localhost:3000
```

## Testing the API Routes

### Analyze Endpoint
```bash
curl -X POST http://localhost:3000/api/analyze \
  -H "Content-Type: application/json" \
  -d '{
    "clientId": "client-1",
    "moodEntries": [...],
    "analysisType": "sentiment"
  }'
```

### Patterns Endpoint
```bash
curl -X POST http://localhost:3000/api/patterns \
  -H "Content-Type: application/json" \
  -d '{
    "clientId": "client-1",
    "moodEntries": [...]
  }'
```

### Recommendations Endpoint
```bash
curl -X POST http://localhost:3000/api/recommendations \
  -H "Content-Type: application/json" \
  -d '{
    "clientId": "client-1",
    "moodEntries": [...]
  }'
```

## Browser Compatibility

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

## Mobile Testing

The app is fully responsive. Test on:
- iOS Safari
- Android Chrome
- Tablet devices

## Performance Tips

1. **Production Build**: Always use `npm run build` for production
2. **Image Optimization**: Use Next.js Image component for images
3. **Code Splitting**: Components are automatically code-split
4. **Caching**: API routes support caching headers

## Support

- 📖 Full Documentation: [README.md](README.md)
- 🐛 Report Issues: GitHub Issues
- 💬 Questions: Open a discussion
- 📧 Email: support@moodboardpro.com

## Hackathon Demo Tips

1. **Start with Client View**: Show mood tracking workflow
2. **Switch to Therapist View**: Demonstrate AI insights
3. **Highlight MCP Integration**: Explain API endpoints
4. **Show Responsive Design**: Resize browser window
5. **Discuss Scalability**: Mention production architecture

## Quick Demo Script

1. "This is MoodBoard Pro, an AI-powered mental health platform"
2. "Clients can track their mood daily with an intuitive interface"
3. "Therapists get AI-powered insights and recommendations"
4. "The system detects patterns and flags concerning trends"
5. "It's ready for MCP integration with IBM Watson"
6. "Built with Next.js 14, TypeScript, and Tailwind CSS"

---

**Ready to impress! 🎉**

For detailed information, see [README.md](README.md)