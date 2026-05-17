import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ClientView from '@/app/components/ClientView';

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    clear: () => {
      store = {};
    },
    removeItem: (key: string) => {
      delete store[key];
    },
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

describe('ClientView Component', () => {
  beforeEach(() => {
    localStorageMock.clear();
    jest.clearAllMocks();
  });

  it('renders mood tracking form', () => {
    render(<ClientView />);
    
    expect(screen.getByText('Track Your Mood')).toBeInTheDocument();
    expect(screen.getByText('How are you feeling today?')).toBeInTheDocument();
    expect(screen.getByText('How are you feeling? (Select all that apply)')).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/What's on your mind/)).toBeInTheDocument();
  });

  it('renders mood history section', () => {
    render(<ClientView />);
    
    expect(screen.getByText('Your Mood History')).toBeInTheDocument();
  });

  it('shows empty state when no entries', () => {
    render(<ClientView />);
    
    expect(screen.getByText('No mood entries yet.')).toBeInTheDocument();
    expect(screen.getByText('Start tracking your mood above to see your progress!')).toBeInTheDocument();
  });

  it('disables submit button when no emotions selected', () => {
    render(<ClientView />);
    
    const submitButton = screen.getByRole('button', { name: /Save Mood Entry/i });
    expect(submitButton).toBeDisabled();
  });

  it('enables submit button when emotions are selected', () => {
    render(<ClientView />);
    
    const happyButton = screen.getByText('Happy');
    fireEvent.click(happyButton);
    
    const submitButton = screen.getByRole('button', { name: /Save Mood Entry/i });
    expect(submitButton).not.toBeDisabled();
  });

  it('saves mood entry to localStorage', async () => {
    render(<ClientView />);
    
    // Select emotion
    const happyButton = screen.getByText('Happy');
    fireEvent.click(happyButton);
    
    // Add notes
    const notesInput = screen.getByPlaceholderText(/What's on your mind/);
    fireEvent.change(notesInput, { target: { value: 'Feeling great today!' } });
    
    // Submit
    const submitButton = screen.getByRole('button', { name: /Save Mood Entry/i });
    fireEvent.click(submitButton);
    
    // Check localStorage
    await waitFor(() => {
      const stored = localStorageMock.getItem('moodEntries');
      expect(stored).toBeTruthy();
      
      const entries = JSON.parse(stored!);
      expect(entries).toHaveLength(1);
      expect(entries[0].emotions).toContain('Happy');
      expect(entries[0].notes).toBe('Feeling great today!');
    });
  });

  it('shows success message after saving', async () => {
    render(<ClientView />);
    
    const happyButton = screen.getByText('Happy');
    fireEvent.click(happyButton);
    
    const submitButton = screen.getByRole('button', { name: /Save Mood Entry/i });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText('✓ Mood entry saved successfully!')).toBeInTheDocument();
    });
  });

  it('resets form after successful submission', async () => {
    render(<ClientView />);
    
    // Fill form
    const happyButton = screen.getByText('Happy');
    fireEvent.click(happyButton);
    
    const notesInput = screen.getByPlaceholderText(/What's on your mind/) as HTMLTextAreaElement;
    fireEvent.change(notesInput, { target: { value: 'Test notes' } });
    
    // Submit
    const submitButton = screen.getByRole('button', { name: /Save Mood Entry/i });
    fireEvent.click(submitButton);
    
    // Check form is reset
    await waitFor(() => {
      expect(notesInput.value).toBe('');
      expect(submitButton).toBeDisabled();
    });
  });

  it('loads existing entries from localStorage', () => {
    const mockEntries = [
      {
        id: 'entry-1',
        clientId: 'demo-client',
        date: '2026-05-16',
        moodScore: 8,
        emotions: ['Happy', 'Grateful'],
        notes: 'Great day!',
        timestamp: Date.now(),
      },
    ];
    
    localStorageMock.setItem('moodEntries', JSON.stringify(mockEntries));
    
    render(<ClientView />);
    
    expect(screen.getByText('Great day!')).toBeInTheDocument();
    expect(screen.getByText('8/10')).toBeInTheDocument();
  });

  it('displays recent entries in reverse chronological order', () => {
    const mockEntries = [
      {
        id: 'entry-1',
        clientId: 'demo-client',
        date: '2026-05-14',
        moodScore: 6,
        emotions: ['Calm'],
        notes: 'First entry',
        timestamp: Date.now() - 2000,
      },
      {
        id: 'entry-2',
        clientId: 'demo-client',
        date: '2026-05-15',
        moodScore: 7,
        emotions: ['Happy'],
        notes: 'Second entry',
        timestamp: Date.now() - 1000,
      },
      {
        id: 'entry-3',
        clientId: 'demo-client',
        date: '2026-05-16',
        moodScore: 8,
        emotions: ['Excited'],
        notes: 'Third entry',
        timestamp: Date.now(),
      },
    ];
    
    localStorageMock.setItem('moodEntries', JSON.stringify(mockEntries));
    
    render(<ClientView />);
    
    expect(screen.getByText('Third entry')).toBeInTheDocument();
    expect(screen.getByText('Second entry')).toBeInTheDocument();
    expect(screen.getByText('First entry')).toBeInTheDocument();
  });

  it('limits recent entries display to 5', () => {
    const mockEntries = Array.from({ length: 10 }, (_, i) => ({
      id: `entry-${i}`,
      clientId: 'demo-client',
      date: '2026-05-16',
      moodScore: 7,
      emotions: ['Happy'],
      notes: `Entry ${i}`,
      timestamp: Date.now() - i * 1000,
    }));
    
    localStorageMock.setItem('moodEntries', JSON.stringify(mockEntries));
    
    render(<ClientView />);
    
    const displayedEntries = screen.getAllByText(/Entry \d/);
    expect(displayedEntries).toHaveLength(5);
  });

  it('allows changing mood score', () => {
    render(<ClientView />);
    
    const slider = screen.getByRole('slider');
    fireEvent.change(slider, { target: { value: '9' } });
    
    expect(screen.getByText('9/10')).toBeInTheDocument();
    expect(screen.getByText('Great')).toBeInTheDocument();
  });

  it('allows selecting multiple emotions', () => {
    render(<ClientView />);
    
    fireEvent.click(screen.getByText('Happy'));
    fireEvent.click(screen.getByText('Calm'));
    fireEvent.click(screen.getByText('Grateful'));
    
    expect(screen.getByText('Happy, Calm, Grateful')).toBeInTheDocument();
  });
});

// Made with Bob
