import { useEffect, useState } from 'react';

const useMode = (): [boolean, React.Dispatch<React.SetStateAction<boolean>>] => {
    const [isLightMode, setIsLightMode] = useState(localStorage.theme === 'light');

    useEffect(() => {
        if (isLightMode) {
            localStorage.theme = 'light';
            document.documentElement.classList.remove('dark');
        } else {
            localStorage.theme = 'dark';
            document.documentElement.classList.add('dark');
        }
    }, [isLightMode]);

    return [isLightMode, setIsLightMode];
};

export default useMode;
