import { render, screen, fireEvent } from '@testing-library/react';
import MoodSlider from '@/app/components/MoodSlider';

describe('MoodSlider Component', () => {
  const mockOnChange = jest.fn();

  beforeEach(() => {
    mockOnChange.mockClear();
  });

  it('renders with initial value', () => {
    render(<MoodSlider value={7} onChange={mockOnChange} />);
    
    expect(screen.getByText('Good')).toBeInTheDocument();
    expect(screen.getByText('7/10')).toBeInTheDocument();
    expect(screen.getByText('😊')).toBeInTheDocument();
  });

  it('displays correct mood label and emoji for each value', () => {
    const { rerender } = render(<MoodSlider value={1} onChange={mockOnChange} />);
    expect(screen.getByText('Very Low')).toBeInTheDocument();
    expect(screen.getByText('😢')).toBeInTheDocument();

    rerender(<MoodSlider value={5} onChange={mockOnChange} />);
    expect(screen.getByText('Neutral')).toBeInTheDocument();
    expect(screen.getByText('😶')).toBeInTheDocument();

    rerender(<MoodSlider value={10} onChange={mockOnChange} />);
    expect(screen.getByText('Excellent')).toBeInTheDocument();
    expect(screen.getByText('🤩')).toBeInTheDocument();
  });

  it('calls onChange when slider is moved', () => {
    render(<MoodSlider value={5} onChange={mockOnChange} />);
    
    const slider = screen.getByRole('slider');
    fireEvent.change(slider, { target: { value: '8' } });
    
    expect(mockOnChange).toHaveBeenCalledWith(8);
  });

  it('calls onChange when tick mark button is clicked', () => {
    render(<MoodSlider value={5} onChange={mockOnChange} />);
    
    const button = screen.getByRole('button', { name: '9' });
    fireEvent.click(button);
    
    expect(mockOnChange).toHaveBeenCalledWith(9);
  });

  it('disables interaction when disabled prop is true', () => {
    render(<MoodSlider value={5} onChange={mockOnChange} disabled={true} />);
    
    const slider = screen.getByRole('slider');
    expect(slider).toBeDisabled();
    
    const buttons = screen.getAllByRole('button');
    buttons.forEach(button => {
      expect(button).toBeDisabled();
    });
  });

  it('does not call onChange when disabled', () => {
    render(<MoodSlider value={5} onChange={mockOnChange} disabled={true} />);
    
    const button = screen.getByRole('button', { name: '7' });
    fireEvent.click(button);
    
    expect(mockOnChange).not.toHaveBeenCalled();
  });

  it('highlights current value tick mark', () => {
    render(<MoodSlider value={7} onChange={mockOnChange} />);
    
    const currentButton = screen.getByRole('button', { name: '7' });
    expect(currentButton).toHaveClass('text-primary-600');
  });

  it('renders all 10 tick marks', () => {
    render(<MoodSlider value={5} onChange={mockOnChange} />);
    
    for (let i = 1; i <= 10; i++) {
      expect(screen.getByRole('button', { name: i.toString() })).toBeInTheDocument();
    }
  });

  it('applies correct color classes based on mood value', () => {
    const { rerender } = render(<MoodSlider value={1} onChange={mockOnChange} />);
    expect(screen.getByText('😢')).toHaveClass('text-red-600');

    rerender(<MoodSlider value={5} onChange={mockOnChange} />);
    expect(screen.getByText('😶')).toHaveClass('text-yellow-600');

    rerender(<MoodSlider value={10} onChange={mockOnChange} />);
    expect(screen.getByText('🤩')).toHaveClass('text-green-800');
  });
});

// Made with Bob
