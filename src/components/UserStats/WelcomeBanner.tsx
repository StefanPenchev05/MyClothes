import React from 'react';

interface WelcomeBannerProps {
    firstName: string | undefined;
}

const WelcomeBanner: React.FC<WelcomeBannerProps> = ({ firstName }) => {
    return (
        <React.Fragment>
            <p className="font-bold text-2xl mb-2">Welcome, {firstName}</p>
            <p className="font-thin text-base mb-2">
                Explore and discover amazing designs from talented <br />
                designers. Open the panel to view your progress and growth in
            </p>
        </React.Fragment>
    );
};

export default WelcomeBanner;
