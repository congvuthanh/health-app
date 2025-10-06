import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { throttle } from './throttle';

describe('throttle', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should call the function immediately on first invocation', () => {
    const func = vi.fn();
    const throttled = throttle(func, 100);

    throttled();

    expect(func).toHaveBeenCalledTimes(1);
  });

  it('should not call the function again within the wait period', () => {
    const func = vi.fn();
    const throttled = throttle(func, 100);

    throttled();
    throttled();
    throttled();

    expect(func).toHaveBeenCalledTimes(1);
  });

  it('should call the function again after the wait period', () => {
    const func = vi.fn();
    const throttled = throttle(func, 100);

    throttled();
    expect(func).toHaveBeenCalledTimes(1);

    vi.advanceTimersByTime(100);
    throttled();

    expect(func).toHaveBeenCalledTimes(2);
  });

  it('should pass arguments to the throttled function', () => {
    const func = vi.fn();
    const throttled = throttle(func, 100);

    throttled('arg1', 'arg2');

    expect(func).toHaveBeenCalledWith('arg1', 'arg2');
  });

  it('should preserve the context (this)', () => {
    const context = { value: 42 };
    const func = vi.fn(function (this: typeof context) {
      return this.value;
    });
    const throttled = throttle(func, 100);

    throttled.call(context);

    expect(func).toHaveBeenCalledTimes(1);
    expect(func.mock.instances[0]).toBe(context);
  });

  it('should execute the last call after wait period if called multiple times', () => {
    const func = vi.fn();
    const throttled = throttle(func, 100);

    throttled('first');
    throttled('second');
    throttled('third');

    expect(func).toHaveBeenCalledTimes(1);
    expect(func).toHaveBeenCalledWith('first');

    vi.advanceTimersByTime(100);

    expect(func).toHaveBeenCalledTimes(2);
    expect(func).toHaveBeenCalledWith('third');
  });

  it('should handle rapid consecutive calls correctly', () => {
    const func = vi.fn();
    const throttled = throttle(func, 200);

    // First call executes immediately
    throttled();
    expect(func).toHaveBeenCalledTimes(1);

    // Calls within throttle period
    throttled();
    throttled();
    throttled();
    expect(func).toHaveBeenCalledTimes(1);

    // Advance time partially
    vi.advanceTimersByTime(100);
    throttled();
    expect(func).toHaveBeenCalledTimes(1);

    // Complete the throttle period
    vi.advanceTimersByTime(100);
    expect(func).toHaveBeenCalledTimes(2);
  });

  it('should work with different wait times', () => {
    const func = vi.fn();
    const throttled50 = throttle(func, 50);
    const throttled200 = throttle(func, 200);

    throttled50();
    throttled200();
    expect(func).toHaveBeenCalledTimes(2);

    vi.advanceTimersByTime(50);
    throttled50();
    expect(func).toHaveBeenCalledTimes(3);

    throttled200();
    expect(func).toHaveBeenCalledTimes(3); // Still throttled

    vi.advanceTimersByTime(150);
    expect(func).toHaveBeenCalledTimes(4); // Now executed
  });

  it('should handle functions with return values', () => {
    const func = vi.fn(() => 'result');
    const throttled = throttle(func, 100);

    // Note: throttled functions don't return values in this implementation
    // This is expected behavior for throttled functions used with events
    throttled();

    expect(func).toHaveBeenCalled();
  });

  it('should handle functions that throw errors', () => {
    const func = vi.fn(() => {
      throw new Error('Test error');
    });
    const throttled = throttle(func, 100);

    expect(() => throttled()).toThrow('Test error');
  });
});
