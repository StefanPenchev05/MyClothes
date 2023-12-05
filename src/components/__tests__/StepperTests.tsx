import { render, act } from '@testing-library/react';
import React from 'react';
import ThemeProvider ,{ useTheme, useThemeUpdate } from '../Signup/ThemeContext';

describe('ThemeProvider', () => {
    it('increments activeStep when handleNext is called', () => {
        const TestComponent = () => {
            const { activeStep } = useTheme();
            const { handleNext } = useThemeUpdate();

            React.useEffect(() => {
                handleNext();
            }, []);

            return <div>{activeStep}</div>;
        };

        const { getByText } = render(
            <ThemeProvider>
                <TestComponent />
            </ThemeProvider>
        );

        expect(getByText('1')).toBeInTheDocument();
    });

    it('decrements activeStep when handleBack is called', () => {
        const TestComponent = () => {
            const { activeStep } = useTheme();
            const { handleNext, handleBack } = useThemeUpdate();

            React.useEffect(() => {
                handleNext();
                handleBack();
            }, []);

            return <div>{activeStep}</div>;
        };

        const { getByText } = render(
            <ThemeProvider>
                <TestComponent />
            </ThemeProvider>
        );

        expect(getByText('0')).toBeInTheDocument();
    });

    it('resets activeStep when handleReset is called', () => {
        const TestComponent = () => {
            const { activeStep } = useTheme();
            const { handleNext, handleReset } = useThemeUpdate();

            React.useEffect(() => {
                handleNext();
                handleReset();
            }, []);

            return <div>{activeStep}</div>;
        };

        const { getByText } = render(
            <ThemeProvider>
                <TestComponent />
            </ThemeProvider>
        );

        expect(getByText('0')).toBeInTheDocument();
    });
});