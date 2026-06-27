import { Navbar } from '@/components/shared/Navbar';
import React from 'react';

const PricingLayoutPage = ({children}) => {
    return (
        <div>
            <Navbar></Navbar>
            {children}
        </div>
    );
};

export default PricingLayoutPage;