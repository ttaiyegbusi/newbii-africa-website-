import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ProgramCardDeck } from './ProgramCardDeck';

describe('ProgramCardDeck', () => {
  it('renders all three program cards', () => {
    render(<ProgramCardDeck />);
    expect(screen.getByRole('heading', { name: /webinars/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /outreaches/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /mentorship/i })).toBeInTheDocument();
  });
});
