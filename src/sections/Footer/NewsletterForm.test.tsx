import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { NewsletterForm } from './NewsletterForm';

describe('NewsletterForm', () => {
  it('rejects an invalid email and accepts a valid one', async () => {
    const user = userEvent.setup();
    render(<NewsletterForm />);

    const input = screen.getByLabelText(/email address/i);
    const submit = screen.getByRole('button', { name: /subscribe/i });

    await user.type(input, 'not-an-email');
    await user.click(submit);
    expect(screen.getByText(/valid email/i)).toBeInTheDocument();

    await user.clear(input);
    await user.type(input, 'ada@newbii.africa');
    await user.click(submit);
    expect(screen.getByText(/on the list/i)).toBeInTheDocument();
  });
});
