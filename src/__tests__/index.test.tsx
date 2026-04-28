import { render, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import Marquee from '../index';

describe('Marquee', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('renders children', () => {
    render(<Marquee>Hello World</Marquee>);
    expect(screen.getAllByText('Hello World').length).toBeGreaterThanOrEqual(1);
  });

  it('renders with overflow hidden on container', () => {
    const { container } = render(<Marquee>Test</Marquee>);
    const outerDiv = container.firstElementChild as HTMLElement;
    expect(outerDiv.style.overflowX).toBe('hidden');
  });

  it('accepts direction prop without error', () => {
    expect(() => render(<Marquee direction="left">Test</Marquee>)).not.toThrow();
  });

  it('accepts speed prop without error', () => {
    expect(() => render(<Marquee speed={0.1}>Test</Marquee>)).not.toThrow();
  });

  it('accepts scrollWhen prop without error', () => {
    expect(() => render(<Marquee scrollWhen="overflow">Test</Marquee>)).not.toThrow();
  });

  it('accepts pauseOnHover prop without error', () => {
    expect(() => render(<Marquee pauseOnHover>Test</Marquee>)).not.toThrow();
  });

  it('accepts loop prop without error', () => {
    expect(() => render(<Marquee loop={3}>Test</Marquee>)).not.toThrow();
  });

  it('cleans up animation frame on unmount', () => {
    const cancelSpy = jest.spyOn(window, 'cancelAnimationFrame');
    const { unmount } = render(<Marquee>Test</Marquee>);
    act(() => {
      jest.advanceTimersByTime(3500);
    });
    unmount();
    expect(cancelSpy).toHaveBeenCalled();
    cancelSpy.mockRestore();
  });

  it('cleans up timeout on unmount before delay fires', () => {
    const { unmount } = render(<Marquee delay={5000}>Test</Marquee>);
    // Unmount before delay fires — should not throw
    unmount();
  });

  it('re-renders when children change', () => {
    const { rerender } = render(<Marquee>First</Marquee>);
    rerender(<Marquee>Second</Marquee>);
    expect(screen.getByText('Second')).toBeInTheDocument();
  });

  it('renders multiple copies of children to enable scrolling', () => {
    render(<Marquee>Repeat me</Marquee>);
    // Default behavior renders at least two tiles so the marquee can loop.
    expect(screen.getAllByText('Repeat me').length).toBeGreaterThanOrEqual(2);
  });
});
