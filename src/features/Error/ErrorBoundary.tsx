import { Component, ErrorInfo } from 'react';

import Error from 'features/Error/ErrorMessage';

import type { Props, State } from 'features/Error/ErrorBoundary.types';

const INITIAL_STATE = { hasError: false, error: null };

class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = INITIAL_STATE;
    }

    static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        // eslint-disable-next-line no-console
        console.error('Uncaught error:', error, errorInfo);
    }

    render() {
        const { hasError, error } = this.state;
        const { children } = this.props;

        if (hasError) {
            return <Error error={error} />;
        }

        return children;
    }
}

export default ErrorBoundary;
