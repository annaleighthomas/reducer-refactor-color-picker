import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

describe('App component', () => {
  it('renders App', () => {
    render (<App />);
    
    const display = screen.getByTestId('display');
    expect(display).toHaveStyle({ backgroundColor: '#FF0000' });

    const colorInput = screen.getByTestId('color-input');
    fireEvent.change(colorInput, { target: { value: '#0000FF' } });
    expect(display).toHaveStyle({ backgroundColor: '#0000FF' });

    const undoButton = screen.getByText('undo');
    fireEvent.click(undoButton);
    expect(display).toHaveStyle({ backgroundColor: '#FF0000' });

    const redoButton = screen.getByText('redo');
    fireEvent.click(redoButton);
    expect(display).toHaveStyle({ backgroundColor: '0000FF' });

  });
});
