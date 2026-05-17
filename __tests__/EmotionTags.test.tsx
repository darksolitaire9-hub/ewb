import { render, screen, fireEvent } from '@testing-library/react';
import EmotionTags from '@/app/components/EmotionTags';

describe('EmotionTags Component', () => {
  const mockOnChange = jest.fn();

  beforeEach(() => {
    mockOnChange.mockClear();
  });

  it('renders all emotion options', () => {
    render(<EmotionTags selectedEmotions={[]} onChange={mockOnChange} />);
    
    const emotions = ['Happy', 'Sad', 'Anxious', 'Calm', 'Excited', 'Frustrated', 
                      'Content', 'Worried', 'Hopeful', 'Stressed', 'Grateful', 'Lonely'];
    
    emotions.forEach(emotion => {
      expect(screen.getByText(emotion)).toBeInTheDocument();
    });
  });

  it('renders label text', () => {
    render(<EmotionTags selectedEmotions={[]} onChange={mockOnChange} />);
    
    expect(screen.getByText('How are you feeling? (Select all that apply)')).toBeInTheDocument();
  });

  it('adds emotion when clicked', () => {
    render(<EmotionTags selectedEmotions={[]} onChange={mockOnChange} />);
    
    const happyButton = screen.getByText('Happy');
    fireEvent.click(happyButton);
    
    expect(mockOnChange).toHaveBeenCalledWith(['Happy']);
  });

  it('removes emotion when clicked again', () => {
    render(<EmotionTags selectedEmotions={['Happy']} onChange={mockOnChange} />);
    
    const buttons = screen.getAllByRole('button');
    const happyButton = buttons.find(btn => btn.textContent?.includes('Happy') && btn.textContent?.includes('✓'));
    fireEvent.click(happyButton!);
    
    expect(mockOnChange).toHaveBeenCalledWith([]);
  });

  it('allows multiple emotions to be selected', () => {
    const { rerender } = render(<EmotionTags selectedEmotions={[]} onChange={mockOnChange} />);
    
    const happyButton = screen.getByText('Happy');
    fireEvent.click(happyButton);
    expect(mockOnChange).toHaveBeenCalledWith(['Happy']);
    
    rerender(<EmotionTags selectedEmotions={['Happy']} onChange={mockOnChange} />);
    
    const calmButton = screen.getByText('Calm');
    fireEvent.click(calmButton);
    expect(mockOnChange).toHaveBeenCalledWith(['Happy', 'Calm']);
  });

  it('displays checkmark for selected emotions', () => {
    render(<EmotionTags selectedEmotions={['Happy', 'Calm']} onChange={mockOnChange} />);
    
    const checkmarks = screen.getAllByText('✓');
    expect(checkmarks).toHaveLength(2);
  });

  it('shows selected emotions summary', () => {
    render(<EmotionTags selectedEmotions={['Happy', 'Calm', 'Grateful']} onChange={mockOnChange} />);
    
    expect(screen.getByText('Selected:')).toBeInTheDocument();
    expect(screen.getByText('Happy, Calm, Grateful')).toBeInTheDocument();
  });

  it('does not show summary when no emotions selected', () => {
    render(<EmotionTags selectedEmotions={[]} onChange={mockOnChange} />);
    
    expect(screen.queryByText('Selected:')).not.toBeInTheDocument();
  });

  it('disables interaction when disabled prop is true', () => {
    render(<EmotionTags selectedEmotions={[]} onChange={mockOnChange} disabled={true} />);
    
    const buttons = screen.getAllByRole('button');
    buttons.forEach(button => {
      expect(button).toBeDisabled();
    });
  });

  it('does not call onChange when disabled', () => {
    render(<EmotionTags selectedEmotions={[]} onChange={mockOnChange} disabled={true} />);
    
    const happyButton = screen.getByText('Happy');
    fireEvent.click(happyButton);
    
    expect(mockOnChange).not.toHaveBeenCalled();
  });

  it('applies correct styling to selected emotions', () => {
    render(<EmotionTags selectedEmotions={['Happy']} onChange={mockOnChange} />);
    
    const buttons = screen.getAllByRole('button');
    const happyButton = buttons.find(btn => btn.textContent?.includes('Happy') && btn.textContent?.includes('✓'));
    expect(happyButton?.className).toContain('scale-105');
  });

  it('handles rapid clicks correctly', () => {
    render(<EmotionTags selectedEmotions={[]} onChange={mockOnChange} />);
    
    const happyButton = screen.getByText('Happy');
    
    fireEvent.click(happyButton);
    fireEvent.click(happyButton);
    fireEvent.click(happyButton);
    
    expect(mockOnChange).toHaveBeenCalledTimes(3);
  });
});

// Made with Bob
