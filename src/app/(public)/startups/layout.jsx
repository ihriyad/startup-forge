import { Navbar } from '@/components/shared/Navbar';
import React from 'react';

const StartupsPageLayout = ({children}) => {
    return (
        <div>
            <Navbar></Navbar>
            {children}
        </div>
    );
};

export default StartupsPageLayout;