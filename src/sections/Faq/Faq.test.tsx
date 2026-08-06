import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Faq } from './Faq';
import { faqs } from '@/data/faqs';

describe('Faq', () => {
  it('marks the first question active by default and switches on click', async () => {
    const user = userEvent.setup();
    render(<Faq />);

    const first = screen.getByRole('button', { name: faqs[0].question });
    expect(first).toHaveAttribute('aria-expanded', 'true');

    const third = screen.getByRole('button', { name: faqs[2].question });
    await user.click(third);

    expect(third).toHaveAttribute('aria-expanded', 'true');
    expect(first).toHaveAttribute('aria-expanded', 'false');
    // the selected answer is rendered somewhere in the panel
    expect(screen.getAllByText(faqs[2].answer).length).toBeGreaterThan(0);
  });
});
