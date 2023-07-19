import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Header from '../components/Header/Header'

describe('Header', () => {
    it('renders all Header elements', () => {
        render(<Header />)
        expect(screen.getByTestId('searchinput')).toBeInTheDocument();
        expect(screen.getByTestId('logo')).toBeInTheDocument();
        expect(screen.getByTestId('divider')).toBeInTheDocument();
        expect(screen.getByTestId('divider2')).toBeInTheDocument();
        expect(screen.getByTestId('favicon')).toBeInTheDocument();
        expect(screen.getByTestId('searchicon')).toBeInTheDocument();
    })
})