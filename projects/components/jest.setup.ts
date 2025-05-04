class MockResizeObserver {
    observe = jest.fn();
    unobserve = jest.fn();
    disconnect = jest.fn();
}

(globalThis as any).ResizeObserver = MockResizeObserver;
