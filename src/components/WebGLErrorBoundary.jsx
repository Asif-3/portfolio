import { Component } from 'react';

/**
 * Error boundary that catches WebGL / shader crashes gracefully.
 * Instead of tearing down the entire React tree, it renders nothing
 * (or an optional fallback) so the rest of the page stays alive.
 */
class WebGLErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error, info) {
        // Log but don't crash — WebGL failures are non-critical
        console.warn('[WebGLErrorBoundary] Caught error in WebGL component:', error?.message);
    }

    render() {
        if (this.state.hasError) {
            // Render fallback or nothing — the rest of the page stays intact
            return this.props.fallback ?? null;
        }
        return this.props.children;
    }
}

export default WebGLErrorBoundary;
