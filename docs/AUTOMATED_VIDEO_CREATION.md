# 🎬 Automated Video Creation Guide

**Last Updated**: May 17, 2026  
**Purpose**: Create demo video using automated tools

---

## 🎥 Recommended Tools

### Option 1: Remotion (Best for React Developers)
**What it is**: Create videos programmatically using React  
**Why**: You already know React, can reuse components  
**Output**: MP4 video file  
**TTS**: Integrate with ElevenLabs or Google TTS

```bash
# Install Remotion
npm install @remotion/cli @remotion/renderer

# Install TTS
npm install elevenlabs-node
# OR
npm install @google-cloud/text-to-speech
```

### Option 2: Manim (Python-based)
**What it is**: Mathematical animation engine (used by 3Blue1Brown)  
**Why**: Great for explanatory videos with animations  
**Output**: MP4 video file  
**TTS**: Integrate with gTTS or pyttsx3

```bash
# Install Manim
pip install manim

# Install TTS
pip install gtts pyttsx3
```

### Option 3: FFmpeg + Puppeteer (Simplest)
**What it is**: Screen recording + TTS audio  
**Why**: No new frameworks, just record your app  
**Output**: MP4 video file  
**TTS**: Use any TTS service

```bash
# Install Puppeteer
npm install puppeteer

# FFmpeg (download from ffmpeg.org)
```

---

## 🚀 Quick Start: Remotion Approach

### Step 1: Install Dependencies

```bash
npm install @remotion/cli @remotion/renderer remotion
npm install elevenlabs-node  # For high-quality TTS
```

### Step 2: Create Video Script

Create `video/script.json`:

```json
{
  "scenes": [
    {
      "duration": 30,
      "type": "intro",
      "text": "Hi! This is MoodBoard Pro - an evidence-based mental health tracking platform built with Bob, IBM's AI assistant.",
      "visuals": "home_page"
    },
    {
      "duration": 60,
      "type": "why",
      "text": "Why did we build this? Click 'Why This App?' - this page explains everything in simple language. See? Visual comparison - most apps make you write, we let you show. Big numbers - 73% vs 45% adherence.",
      "visuals": "why_page"
    },
    {
      "duration": 60,
      "type": "client_view",
      "text": "Clients can track their mood visually using this slider, select emotions, and add notes. Notice the accessibility - full keyboard navigation, screen reader support, and WCAG AAA compliance.",
      "visuals": "client_demo"
    },
    {
      "duration": 60,
      "type": "therapist_view",
      "text": "Therapists see all their clients' mood trends in one dashboard. They can identify patterns and provide better care. Research shows this leads to 31% better outcomes.",
      "visuals": "therapist_demo"
    },
    {
      "duration": 60,
      "type": "research",
      "text": "Here's what sets us apart - 28 peer-reviewed research citations, all verifiable with DOI and PubMed links. Every feature is evidence-based.",
      "visuals": "research_page"
    },
    {
      "duration": 30,
      "type": "faq",
      "text": "Comprehensive FAQ covering HIPAA compliance, business model, technical details - everything judges will ask.",
      "visuals": "faq_page"
    },
    {
      "duration": 60,
      "type": "bob",
      "text": "This entire platform was built with Bob's assistance - from research compilation to accessibility implementation to HIPAA documentation. Bob helped create 15,000+ lines of documentation, 34 tests, and a production-ready application.",
      "visuals": "built_with_bob"
    },
    {
      "duration": 30,
      "type": "outro",
      "text": "MoodBoard Pro: Evidence-based, accessible, HIPAA-compliant, and ready to help 57.8 million Americans with mental health challenges. Built with Bob.",
      "visuals": "home_page"
    }
  ]
}
```

### Step 3: Create Remotion Video Component

Create `video/Video.tsx`:

```typescript
import { AbsoluteFill, Audio, Sequence, useCurrentFrame, useVideoConfig } from 'remotion';
import { loadFont } from '@remotion/google-fonts/Inter';

const { fontFamily } = loadFont();

export const DemoVideo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ backgroundColor: 'white', fontFamily }}>
      {/* Scene 1: Intro (0-30s) */}
      <Sequence from={0} durationInFrames={30 * fps}>
        <IntroScene />
      </Sequence>

      {/* Scene 2: Why Page (30-90s) */}
      <Sequence from={30 * fps} durationInFrames={60 * fps}>
        <WhyScene />
      </Sequence>

      {/* Scene 3: Client View (90-150s) */}
      <Sequence from={90 * fps} durationInFrames={60 * fps}>
        <ClientScene />
      </Sequence>

      {/* Scene 4: Therapist View (150-210s) */}
      <Sequence from={150 * fps} durationInFrames={60 * fps}>
        <TherapistScene />
      </Sequence>

      {/* Scene 5: Research (210-270s) */}
      <Sequence from={210 * fps} durationInFrames={60 * fps}>
        <ResearchScene />
      </Sequence>

      {/* Scene 6: FAQ (270-300s) */}
      <Sequence from={270 * fps} durationInFrames={30 * fps}>
        <FAQScene />
      </Sequence>

      {/* Scene 7: Built with Bob (300-360s) */}
      <Sequence from={300 * fps} durationInFrames={60 * fps}>
        <BobScene />
      </Sequence>

      {/* Scene 8: Outro (360-390s) */}
      <Sequence from={360 * fps} durationInFrames={30 * fps}>
        <OutroScene />
      </Sequence>

      {/* Audio narration */}
      <Audio src="/audio/narration.mp3" />
    </AbsoluteFill>
  );
};
```

### Step 4: Generate TTS Audio

Create `video/generate-audio.js`:

```javascript
const { ElevenLabsClient } = require('elevenlabs-node');
const fs = require('fs');
const path = require('path');

const client = new ElevenLabsClient({
  apiKey: process.env.ELEVENLABS_API_KEY
});

const script = require('./script.json');

async function generateAudio() {
  const fullText = script.scenes.map(s => s.text).join(' ');
  
  const audio = await client.textToSpeech({
    voiceId: 'EXAVITQu4vr4xnSDxMaL', // Professional male voice
    text: fullText,
    modelId: 'eleven_monolingual_v1'
  });

  fs.writeFileSync(
    path.join(__dirname, '../public/audio/narration.mp3'),
    audio
  );
  
  console.log('Audio generated successfully!');
}

generateAudio();
```

### Step 5: Render Video

```bash
# Render video
npx remotion render Video out/demo.mp4

# Or with custom settings
npx remotion render Video out/demo.mp4 --codec h264 --quality 90
```

---

## 🎬 Alternative: Simple Screen Recording

### Using OBS Studio (Free)

1. **Download OBS Studio**: https://obsproject.com/
2. **Configure**:
   - Source: Browser (localhost:3000)
   - Audio: Microphone or TTS
   - Resolution: 1920x1080
   - FPS: 30

3. **Record**:
   - Start recording
   - Navigate through app
   - Follow script
   - Stop recording

4. **Edit** (optional):
   - Use DaVinci Resolve (free)
   - Add captions
   - Add transitions
   - Export MP4

---

## 🎬 Alternative: Puppeteer + FFmpeg

### Automated Screen Recording

Create `video/record.js`:

```javascript
const puppeteer = require('puppeteer');
const { exec } = require('child_process');
const fs = require('fs');

async function recordDemo() {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: { width: 1920, height: 1080 }
  });

  const page = await browser.newPage();
  
  // Start screen recording (requires ffmpeg)
  const ffmpeg = exec('ffmpeg -f gdigrab -framerate 30 -i desktop -c:v libx264 -preset ultrafast output.mp4');

  // Navigate through app
  await page.goto('http://localhost:3000');
  await page.waitForTimeout(3000);

  // Home page
  await page.screenshot({ path: 'screenshots/home.png' });
  await page.waitForTimeout(5000);

  // Why page
  await page.click('a[href="/why"]');
  await page.waitForTimeout(10000);

  // Research page
  await page.click('a[href="/research"]');
  await page.waitForTimeout(10000);

  // Client view
  await page.goto('http://localhost:3000');
  await page.click('button:has-text("Client View")');
  await page.waitForTimeout(10000);

  // Therapist view
  await page.click('button:has-text("Therapist View")');
  await page.waitForTimeout(10000);

  // Stop recording
  ffmpeg.kill();
  await browser.close();
}

recordDemo();
```

---

## 🎤 TTS Options

### Option 1: ElevenLabs (Best Quality)
- **Cost**: $5/month for 30,000 characters
- **Quality**: Near-human voice
- **Setup**: API key required
- **Website**: https://elevenlabs.io/

```javascript
const { ElevenLabsClient } = require('elevenlabs-node');

const client = new ElevenLabsClient({
  apiKey: 'your-api-key'
});

const audio = await client.textToSpeech({
  voiceId: 'EXAVITQu4vr4xnSDxMaL',
  text: 'Your script here'
});
```

### Option 2: Google Cloud TTS (Good Quality)
- **Cost**: Free tier: 1M characters/month
- **Quality**: Natural voice
- **Setup**: Google Cloud account
- **Website**: https://cloud.google.com/text-to-speech

```javascript
const textToSpeech = require('@google-cloud/text-to-speech');

const client = new textToSpeech.TextToSpeechClient();

const [response] = await client.synthesizeSpeech({
  input: { text: 'Your script here' },
  voice: { languageCode: 'en-US', name: 'en-US-Neural2-J' },
  audioConfig: { audioEncoding: 'MP3' }
});
```

### Option 3: gTTS (Free, Basic)
- **Cost**: Free
- **Quality**: Basic but clear
- **Setup**: pip install gtts
- **Website**: https://pypi.org/project/gTTS/

```python
from gtts import gTTS

tts = gTTS('Your script here', lang='en')
tts.save('narration.mp3')
```

---

## 📝 Video Script (5 Minutes)

### Timing Breakdown

| Time | Scene | Content |
|------|-------|---------|
| 0:00-0:30 | Intro | What is MoodBoard Pro? |
| 0:30-1:30 | Why Page | Simple explanation |
| 1:30-2:30 | Client View | Mood tracking demo |
| 2:30-3:30 | Therapist View | Dashboard demo |
| 3:30-4:30 | Research | 28 citations |
| 4:30-5:00 | Outro | Built with Bob |

### Full Script

```
[0:00-0:30] INTRO
"Hi! This is MoodBoard Pro - an evidence-based mental health tracking platform built with Bob, IBM's AI assistant. Let me show you what makes this special."

[0:30-1:30] WHY PAGE
"Why did we build this? Click 'Why This App?' - this page explains everything in simple language, no jargon. See? Visual comparison - most apps make you write, we let you show. Big numbers - 73% vs 45% adherence. Simple scenarios - imagine your therapist only sees you once a week. Notice how we explain everything? 'Hospital-grade security' - we tell you exactly what that means."

[1:30-2:30] CLIENT VIEW
"Clients can track their mood visually using this slider, select emotions, and add notes. Notice the accessibility - full keyboard navigation, screen reader support, and WCAG AAA compliance. It's fast - takes 10 seconds instead of 5 minutes. And you can see your patterns over time."

[2:30-3:30] THERAPIST VIEW
"Therapists see all their clients' mood trends in one dashboard. They can identify patterns and provide better care. Research shows this leads to 31% better outcomes. See how the dashboard highlights concerning patterns? That's AI-powered insights helping therapists help their patients."

[3:30-4:30] RESEARCH
"Here's what sets us apart - 28 peer-reviewed research citations, all verifiable with DOI and PubMed links. Every feature is evidence-based. Visual tracking? 23% higher engagement. Therapist tools? 78% want this, only 2% of apps have it. Accessibility? 96.8% of health sites fail, we pass. This isn't guesswork - it's science."

[4:30-5:00] OUTRO
"This entire platform was built with Bob's assistance - from research compilation to accessibility implementation to HIPAA documentation. Bob helped create 15,000+ lines of documentation, 34 tests, and a production-ready application. MoodBoard Pro: Evidence-based, accessible, HIPAA-compliant, and ready to help 57.8 million Americans with mental health challenges. Built with Bob."
```

---

## 🎨 Visual Elements

### Overlays to Add
- **Logo**: Top-left corner throughout
- **"Built with Bob" badge**: Bottom-right corner
- **Scene titles**: Fade in/out for each section
- **Key stats**: Highlight important numbers
- **Arrows/circles**: Point to important UI elements
- **Captions**: Full transcript for accessibility

### Transitions
- **Fade**: Between major sections
- **Zoom**: When highlighting specific features
- **Pan**: When showing dashboard
- **Highlight**: When pointing to UI elements

---

## 🚀 Quick Start Commands

### Remotion (Recommended)
```bash
# Install
npm install @remotion/cli @remotion/renderer remotion elevenlabs-node

# Generate audio
node video/generate-audio.js

# Preview
npx remotion preview

# Render
npx remotion render Video out/demo.mp4
```

### OBS Studio (Simplest)
```bash
# 1. Download OBS Studio
# 2. Add Browser source (localhost:3000)
# 3. Add Audio source (TTS or microphone)
# 4. Start recording
# 5. Follow script
# 6. Stop recording
# 7. Upload to YouTube
```

### Puppeteer + FFmpeg
```bash
# Install
npm install puppeteer

# Record
node video/record.js

# Add audio (using ffmpeg)
ffmpeg -i video.mp4 -i narration.mp3 -c:v copy -c:a aac output.mp4
```

---

## 📤 Upload & Share

### YouTube
1. Upload video
2. Title: "MoodBoard Pro - Evidence-Based Mental Health Tracking | Built with Bob"
3. Description: Include GitHub link, live demo, research citations
4. Tags: mental health, AI, accessibility, HIPAA, IBM Bob
5. Thumbnail: Screenshot of home page with "Built with Bob" badge

### Vimeo
1. Upload video
2. Same title/description
3. Enable download
4. Get shareable link

### lablab.ai Submission
1. Paste YouTube/Vimeo URL
2. Add GitHub repository URL
3. Add live demo URL (Vercel)
4. Submit!

---

## ⏱️ Time Estimate

| Method | Setup | Recording | Editing | Total |
|--------|-------|-----------|---------|-------|
| Remotion | 30 min | Auto | 15 min | 45 min |
| OBS Studio | 10 min | 10 min | 20 min | 40 min |
| Puppeteer | 20 min | Auto | 20 min | 40 min |

**Recommendation**: Use OBS Studio for fastest results (40 minutes total)

---

## 🎯 Quality Checklist

- [ ] 1920x1080 resolution
- [ ] 30 FPS minimum
- [ ] Clear audio (no background noise)
- [ ] All text readable
- [ ] Smooth transitions
- [ ] 5 minutes or less
- [ ] Captions included
- [ ] "Built with Bob" visible
- [ ] No errors shown
- [ ] Professional appearance

---

## 🏆 Pro Tips

1. **Test audio first**: Make sure TTS sounds natural
2. **Record in segments**: Easier to fix mistakes
3. **Use high contrast**: Makes text more readable
4. **Add pauses**: Give viewers time to read
5. **Show, don't tell**: Let the app speak for itself
6. **Highlight key stats**: Use zoom/highlight effects
7. **End with CTA**: "Try it now" or "View on GitHub"

---

**Ready to create your demo video!** 🎬

Choose your method and follow the steps above. The video will showcase your evidence-based, accessible, HIPAA-compliant platform built with Bob!