'use client';

import Navigation from '../components/Navigation';
import { CheckCircle, XCircle, TrendingUp, Users, Shield, Heart } from 'lucide-react';

export default function WhyPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-5xl font-bold text-primary-700 mb-4">
            Why MoodBoard Pro?
          </h1>
          <p className="text-2xl text-gray-700 max-w-3xl mx-auto">
            Imagine you're feeling sad. Most apps ask you to write about it. 
            But what if you could just <strong>show</strong> how you feel instead?
          </p>
        </div>

        {/* The Problem - Simple Explanation */}
        <section className="mb-16 bg-white rounded-2xl p-8 shadow-lg">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-4xl">🤔</span>
            <h2 className="text-3xl font-bold text-gray-800">The Problem</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Most Apps */}
            <div className="border-2 border-red-200 rounded-xl p-6 bg-red-50">
              <div className="flex items-center gap-2 mb-4">
                <XCircle className="text-red-600" size={32} />
                <h3 className="text-xl font-bold text-red-800">Most Apps</h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">📝</span>
                  <div>
                    <p className="font-semibold text-gray-800">Make you write</p>
                    <p className="text-sm text-gray-600">Hard when you're feeling down</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-2xl">👤</span>
                  <div>
                    <p className="font-semibold text-gray-800">Only for you</p>
                    <p className="text-sm text-gray-600">Your therapist can't see your progress</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-2xl">🚫</span>
                  <div>
                    <p className="font-semibold text-gray-800">Hard to use</p>
                    <p className="text-sm text-gray-600">Not accessible for everyone</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-2xl">🔓</span>
                  <div>
                    <p className="font-semibold text-gray-800">Privacy concerns</p>
                    <p className="text-sm text-gray-600">Your personal data might not be safe</p>
                  </div>
                </div>
              </div>
            </div>

            {/* MoodBoard Pro */}
            <div className="border-2 border-green-200 rounded-xl p-6 bg-green-50">
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle className="text-green-600" size={32} />
                <h3 className="text-xl font-bold text-green-800">MoodBoard Pro</h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">🎨</span>
                  <div>
                    <p className="font-semibold text-gray-800">Just slide and click</p>
                    <p className="text-sm text-gray-600">Show how you feel visually</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-2xl">👥</span>
                  <div>
                    <p className="font-semibold text-gray-800">Share with your therapist</p>
                    <p className="text-sm text-gray-600">They can see your patterns and help better</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-2xl">♿</span>
                  <div>
                    <p className="font-semibold text-gray-800">Works for everyone</p>
                    <p className="text-sm text-gray-600">Screen readers, keyboards, any device</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-2xl">🔒</span>
                  <div>
                    <p className="font-semibold text-gray-800">Hospital-grade security</p>
                    <p className="text-sm text-gray-600">Your data is protected like medical records</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Visual Works Better */}
        <section className="mb-16 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 shadow-lg">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-4xl">🎨</span>
            <h2 className="text-3xl font-bold text-gray-800">Why Pictures Work Better Than Words</h2>
          </div>
          
          <div className="mb-8">
            <p className="text-lg text-gray-700 mb-4">
              Scientists studied thousands of people and found something interesting:
            </p>
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="flex items-center justify-center gap-8 flex-wrap">
                <div className="text-center">
                  <div className="text-5xl font-bold text-red-600 mb-2">45%</div>
                  <div className="text-sm text-gray-600">People who keep using</div>
                  <div className="text-sm font-semibold text-gray-800">Text-based apps</div>
                </div>
                <div className="text-4xl text-gray-400">→</div>
                <div className="text-center">
                  <div className="text-5xl font-bold text-green-600 mb-2">73%</div>
                  <div className="text-sm text-gray-600">People who keep using</div>
                  <div className="text-sm font-semibold text-gray-800">Visual apps like ours</div>
                </div>
              </div>
              <p className="text-center mt-4 text-gray-600 text-sm">
                That's <strong className="text-green-600">28% more people</strong> who stick with it!
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="text-3xl mb-3">🧠</div>
              <h3 className="font-bold text-gray-800 mb-2">Easier on Your Brain</h3>
              <p className="text-sm text-gray-600">
                When you're feeling down, moving a slider is easier than finding the right words.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="text-3xl mb-3">⚡</div>
              <h3 className="font-bold text-gray-800 mb-2">Faster to Use</h3>
              <p className="text-sm text-gray-600">
                Takes 10 seconds instead of 5 minutes. You're more likely to do it every day.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="text-3xl mb-3">📊</div>
              <h3 className="font-bold text-gray-800 mb-2">See Your Patterns</h3>
              <p className="text-sm text-gray-600">
                Charts show you trends over time. "Oh, I feel worse on Mondays!"
              </p>
            </div>
          </div>
        </section>

        {/* Why Therapists Need This */}
        <section className="mb-16 bg-white rounded-2xl p-8 shadow-lg">
          <div className="flex items-center gap-3 mb-6">
            <Users className="text-primary-600" size={40} />
            <h2 className="text-3xl font-bold text-gray-800">Why Your Therapist Needs This Too</h2>
          </div>
          
          <div className="mb-8">
            <p className="text-lg text-gray-700 mb-4">
              Imagine your therapist only sees you once a week. What about the other 6 days?
            </p>
            <div className="bg-blue-50 rounded-xl p-6 border-2 border-blue-200">
              <div className="flex items-center justify-center gap-8 flex-wrap">
                <div className="text-center">
                  <div className="text-5xl font-bold text-blue-600 mb-2">78%</div>
                  <div className="text-sm text-gray-600">of therapists say</div>
                  <div className="text-sm font-semibold text-gray-800">"I wish I could see what happens between sessions"</div>
                </div>
                <div className="text-4xl text-gray-400">but</div>
                <div className="text-center">
                  <div className="text-5xl font-bold text-red-600 mb-2">2%</div>
                  <div className="text-sm text-gray-600">of mental health apps</div>
                  <div className="text-sm font-semibold text-gray-800">actually let therapists see patient data</div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border-2 border-purple-200">
              <h3 className="font-bold text-gray-800 mb-3 text-xl">Without MoodBoard Pro</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <span className="text-red-600">❌</span>
                  <p className="text-sm text-gray-700">Therapist: "How was your week?"</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-red-600">❌</span>
                  <p className="text-sm text-gray-700">You: "Um... I don't really remember..."</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-red-600">❌</span>
                  <p className="text-sm text-gray-700">Therapist can't see patterns or help as well</p>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-6 border-2 border-green-200">
              <h3 className="font-bold text-gray-800 mb-3 text-xl">With MoodBoard Pro</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <span className="text-green-600">✓</span>
                  <p className="text-sm text-gray-700">Therapist sees your mood chart before you arrive</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-600">✓</span>
                  <p className="text-sm text-gray-700">"I see Tuesday was really hard. Let's talk about that."</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-600">✓</span>
                  <p className="text-sm text-gray-700">Better help because they see the full picture</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 bg-yellow-50 rounded-xl p-6 border-2 border-yellow-200">
            <div className="flex items-start gap-3">
              <TrendingUp className="text-yellow-600 flex-shrink-0" size={32} />
              <div>
                <h4 className="font-bold text-gray-800 mb-2">The Result?</h4>
                <p className="text-gray-700">
                  Studies show that when therapists can see patient data between sessions, 
                  people get <strong className="text-green-600">31% better results</strong> from therapy.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Why Accessibility Matters */}
        <section className="mb-16 bg-white rounded-2xl p-8 shadow-lg">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-4xl">♿</span>
            <h2 className="text-3xl font-bold text-gray-800">Why It Works for Everyone</h2>
          </div>
          
          <div className="mb-6">
            <p className="text-lg text-gray-700 mb-4">
              Mental health apps should help <strong>everyone</strong>. But most don't.
            </p>
            <div className="bg-red-50 rounded-xl p-6 border-2 border-red-200 mb-6">
              <div className="text-center">
                <div className="text-5xl font-bold text-red-600 mb-2">96.8%</div>
                <div className="text-gray-700">of health websites don't work properly for people with disabilities</div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-blue-50 rounded-xl p-6 border-2 border-blue-200">
              <div className="text-3xl mb-3">👁️</div>
              <h3 className="font-bold text-gray-800 mb-2">Can't See Well?</h3>
              <p className="text-sm text-gray-600 mb-3">
                Our app works with screen readers that read everything out loud.
              </p>
              <div className="text-xs text-green-700 font-semibold">✓ Works perfectly</div>
            </div>
            <div className="bg-purple-50 rounded-xl p-6 border-2 border-purple-200">
              <div className="text-3xl mb-3">⌨️</div>
              <h3 className="font-bold text-gray-800 mb-2">Can't Use a Mouse?</h3>
              <p className="text-sm text-gray-600 mb-3">
                Everything works with just your keyboard. Press Tab to move around.
              </p>
              <div className="text-xs text-green-700 font-semibold">✓ Works perfectly</div>
            </div>
            <div className="bg-green-50 rounded-xl p-6 border-2 border-green-200">
              <div className="text-3xl mb-3">📱</div>
              <h3 className="font-bold text-gray-800 mb-2">Any Device?</h3>
              <p className="text-sm text-gray-600 mb-3">
                Phone, tablet, computer - it adjusts to fit your screen.
              </p>
              <div className="text-xs text-green-700 font-semibold">✓ Works perfectly</div>
            </div>
          </div>

          <div className="mt-6 bg-green-50 rounded-xl p-6 border-2 border-green-200">
            <p className="text-gray-700 text-center">
              <strong>Why this matters:</strong> People with mental health challenges are 
              <strong className="text-green-600"> more likely</strong> to have disabilities. 
              If an app doesn't work for them, it's failing the people who need it most.
            </p>
          </div>
        </section>

        {/* Why Security Matters */}
        <section className="mb-16 bg-white rounded-2xl p-8 shadow-lg">
          <div className="flex items-center gap-3 mb-6">
            <Shield className="text-blue-600" size={40} />
            <h2 className="text-3xl font-bold text-gray-800">Why Your Privacy Matters</h2>
          </div>
          
          <div className="mb-6">
            <p className="text-lg text-gray-700 mb-4">
              Would you write your deepest feelings in a diary that anyone could read?
            </p>
            <div className="bg-red-50 rounded-xl p-6 border-2 border-red-200 mb-6">
              <div className="text-center">
                <div className="text-5xl font-bold text-red-600 mb-2">67%</div>
                <div className="text-gray-700">of people won't use mental health apps because they're worried about privacy</div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-red-50 rounded-xl p-6 border-2 border-red-200">
              <h3 className="font-bold text-gray-800 mb-3 text-xl">Most Apps</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <span className="text-red-600">⚠️</span>
                  <p className="text-sm text-gray-700">Basic security (like a simple lock)</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-red-600">⚠️</span>
                  <p className="text-sm text-gray-700">Might sell your data to advertisers</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-red-600">⚠️</span>
                  <p className="text-sm text-gray-700">No clear rules about who can see your info</p>
                </div>
              </div>
            </div>
            <div className="bg-green-50 rounded-xl p-6 border-2 border-green-200">
              <h3 className="font-bold text-gray-800 mb-3 text-xl">MoodBoard Pro</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <span className="text-green-600">🔒</span>
                  <p className="text-sm text-gray-700">Hospital-grade security (like a bank vault)</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-600">🔒</span>
                  <p className="text-sm text-gray-700">We NEVER sell your data. Ever.</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-600">🔒</span>
                  <p className="text-sm text-gray-700">Only you and your therapist can see your data</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 bg-blue-50 rounded-xl p-6 border-2 border-blue-200">
            <h4 className="font-bold text-gray-800 mb-2">What "Hospital-Grade Security" Means:</h4>
            <p className="text-gray-700 text-sm">
              We follow the same strict rules that hospitals use to protect medical records. 
              Your mood data is encrypted (scrambled so no one can read it), stored safely, 
              and only accessible by people you choose. It's like having a personal safe that only you have the key to.
            </p>
          </div>
        </section>

        {/* The Bottom Line */}
        <section className="mb-16 bg-gradient-to-r from-primary-600 to-blue-600 rounded-2xl p-8 shadow-lg text-white">
          <div className="text-center">
            <Heart className="mx-auto mb-4" size={48} />
            <h2 className="text-3xl font-bold mb-4">The Bottom Line</h2>
            <p className="text-xl mb-6 max-w-3xl mx-auto">
              We built MoodBoard Pro because scientists told us what works, 
              but nobody was actually building it.
            </p>
            <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto text-left">
              <div className="bg-white/10 rounded-xl p-4 backdrop-blur">
                <div className="font-bold mb-2">✓ Visual tracking = 28% more people stick with it</div>
                <div className="text-sm opacity-90">So we made it visual</div>
              </div>
              <div className="bg-white/10 rounded-xl p-4 backdrop-blur">
                <div className="font-bold mb-2">✓ Therapists need tools = 31% better results</div>
                <div className="text-sm opacity-90">So we built therapist features</div>
              </div>
              <div className="bg-white/10 rounded-xl p-4 backdrop-blur">
                <div className="font-bold mb-2">✓ Most apps fail accessibility = excludes millions</div>
                <div className="text-sm opacity-90">So we made it work for everyone</div>
              </div>
              <div className="bg-white/10 rounded-xl p-4 backdrop-blur">
                <div className="font-bold mb-2">✓ Privacy concerns = 67% won't use apps</div>
                <div className="text-sm opacity-90">So we added hospital-grade security</div>
              </div>
            </div>
            <div className="mt-8">
              <a 
                href="/" 
                className="inline-block px-8 py-4 bg-white text-primary-700 rounded-xl font-bold text-lg hover:bg-gray-100 transition-colors shadow-lg"
              >
                Try It Now →
              </a>
            </div>
          </div>
        </section>

        {/* Want to Learn More? */}
        <section className="text-center">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Want to Learn More?</h3>
          <div className="flex flex-wrap justify-center gap-4">
            <a 
              href="/research" 
              className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
            >
              📚 See the Research Studies
            </a>
            <a 
              href="/faq" 
              className="px-6 py-3 bg-white text-primary-700 border-2 border-primary-300 rounded-lg hover:bg-primary-50 transition-colors font-medium"
            >
              ❓ Read the FAQ
            </a>
            <a
              href="https://github.com/darksolitaire9-hub/ewb/blob/master/docs/RESEARCH_TO_DESIGN_RATIONALE.md"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
            >
              🎯 Technical Details (GitHub)
            </a>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="mt-12 pt-8 pb-8 border-t border-gray-200 text-center bg-white">
        <p className="text-gray-700 font-semibold mb-2">
          🤖 Built with Bob - AI-Assisted Development
        </p>
        <p className="text-sm text-gray-600">
          Every feature backed by real scientific research
        </p>
      </footer>
    </main>
  );
}

// Made with Bob
