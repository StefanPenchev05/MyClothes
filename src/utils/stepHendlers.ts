import React from 'react';

interface Step {
    label: string;
    icon: JSX.Element;
    badgeContent: string;
    badgeSuccess: boolean;
}

export const updateStep = (
    setSteps: React.Dispatch<React.SetStateAction<Step[]>>,
    activeStep: number,
    iconColor: string,
    badgeContent: string,
    badgeSuccess: boolean
) => {
    setSteps((prevSteps: Step[]) => {
        return prevSteps.map((step: Step, index: number) => {
            if (index === activeStep) {
                return {
                    ...step,
                    icon: React.cloneElement(step.icon, { style: { color: iconColor } }),
                    badgeContent: badgeContent,
                    badgeSuccess: badgeSuccess,
                };
            }
            return step;
        });
    });
};